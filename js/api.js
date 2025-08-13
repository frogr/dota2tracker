// API module with caching implementation

const API_BASE = 'https://api.opendota.com/api';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Cache implementation
class APICache {
    constructor() {
        this.cache = new Map();
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
        // Save to localStorage for persistence
        try {
            localStorage.setItem(`cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    }

    get(key) {
        // Check memory cache first
        const memoryCache = this.cache.get(key);
        if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
            return memoryCache.data;
        }

        // Check localStorage
        try {
            const stored = localStorage.getItem(`cache_${key}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                    // Restore to memory cache
                    this.cache.set(key, parsed);
                    return parsed.data;
                } else {
                    // Clean up expired cache
                    localStorage.removeItem(`cache_${key}`);
                }
            }
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
        }

        return null;
    }

    clear() {
        this.cache.clear();
        // Clear localStorage cache
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('cache_')) {
                localStorage.removeItem(key);
            }
        });
    }
}

const cache = new APICache();

// API request wrapper with caching
async function fetchWithCache(url, cacheKey) {
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`Using cached data for ${cacheKey}`);
        return cached;
    }

    // Fetch fresh data
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Cache the result
        cache.set(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        throw error;
    }
}

// Convert Steam ID formats
export function convertTo32BitId(steamId) {
    steamId = steamId.toString().trim();
    if (steamId.length < 17) return steamId;
    try {
        const id64 = BigInt(steamId);
        return Number(id64 - 76561197960265728n).toString();
    } catch (e) {
        return steamId;
    }
}

// API methods
export const API = {
    // Get player profile
    async getPlayerProfile(accountId) {
        const cacheKey = `profile_${accountId}`;
        return fetchWithCache(`${API_BASE}/players/${accountId}`, cacheKey);
    },

    // Get win/loss stats
    async getWinLoss(accountId) {
        const cacheKey = `wl_${accountId}`;
        return fetchWithCache(`${API_BASE}/players/${accountId}/wl`, cacheKey);
    },

    // Get recent matches
    async getRecentMatches(accountId) {
        const cacheKey = `recent_${accountId}`;
        return fetchWithCache(`${API_BASE}/players/${accountId}/recentMatches`, cacheKey);
    },

    // Get hero stats
    async getHeroStats(accountId) {
        const cacheKey = `heroes_${accountId}`;
        return fetchWithCache(`${API_BASE}/players/${accountId}/heroes`, cacheKey);
    },

    // Get match details
    async getMatchDetails(matchId) {
        const cacheKey = `match_${matchId}`;
        return fetchWithCache(`${API_BASE}/matches/${matchId}`, cacheKey);
    },

    // Get multiple match details with parallel requests
    async getMatchDetailsMultiple(matchIds, limit = 15) {
        const promises = matchIds.slice(0, limit).map(matchId => 
            this.getMatchDetails(matchId).catch(err => {
                console.error(`Failed to fetch match ${matchId}:`, err);
                return null;
            })
        );
        
        return Promise.all(promises);
    },

    // Load all player data
    async loadPlayerData(accountId) {
        try {
            // Fetch core data in parallel
            const [profile, wl, recentMatches, heroStats] = await Promise.all([
                this.getPlayerProfile(accountId),
                this.getWinLoss(accountId),
                this.getRecentMatches(accountId),
                this.getHeroStats(accountId)
            ]);

            // Validate data
            if (!recentMatches || recentMatches.length === 0) {
                throw new Error('No match data available. Make sure your profile is public.');
            }

            // Fetch detailed match data for items and team compositions
            const matchIds = recentMatches.map(m => m.match_id);
            const detailedMatches = await this.getMatchDetailsMultiple(matchIds);

            // Merge detailed data with recent matches
            const enrichedMatches = recentMatches.map((match, index) => {
                if (index < detailedMatches.length && detailedMatches[index]) {
                    const details = detailedMatches[index];
                    // Find the player's data in the match
                    const playerData = details.players?.find(p => 
                        p.account_id == accountId || 
                        p.player_slot === match.player_slot
                    );
                    
                    if (playerData) {
                        // Add item and additional stats data from the detailed match
                        return {
                            ...match,
                            item_0: playerData.item_0,
                            item_1: playerData.item_1,
                            item_2: playerData.item_2,
                            item_3: playerData.item_3,
                            item_4: playerData.item_4,
                            item_5: playerData.item_5,
                            item_neutral: playerData.item_neutral,
                            backpack_0: playerData.backpack_0,
                            backpack_1: playerData.backpack_1,
                            backpack_2: playerData.backpack_2,
                            hero_damage: playerData.hero_damage,
                            hero_healing: playerData.hero_healing,
                            tower_damage: playerData.tower_damage,
                            details: details
                        };
                    }
                }
                return match;
            });

            return {
                profile,
                wl,
                recentMatches: enrichedMatches,
                heroStats
            };
        } catch (error) {
            console.error('Failed to load player data:', error);
            throw error;
        }
    },

    // Clear cache
    clearCache() {
        cache.clear();
    }
};

// Auto-clear old cache on page load
window.addEventListener('load', () => {
    // Clean up old cache entries
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith('cache_')) {
            try {
                const stored = JSON.parse(localStorage.getItem(key));
                if (Date.now() - stored.timestamp > CACHE_DURATION * 2) {
                    localStorage.removeItem(key);
                }
            } catch (e) {
                // Invalid cache entry, remove it
                localStorage.removeItem(key);
            }
        }
    });
});