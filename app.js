// Bundled application file (non-module version for better compatibility)

// ============= Data Mappings =============
const heroNames = {
    1: "Anti-Mage", 2: "Axe", 3: "Bane", 4: "Bloodseeker", 5: "Crystal Maiden",
    6: "Drow Ranger", 7: "Earthshaker", 8: "Juggernaut", 9: "Mirana", 10: "Morphling",
    11: "Shadow Fiend", 12: "Phantom Lancer", 13: "Puck", 14: "Pudge", 15: "Razor",
    16: "Sand King", 17: "Storm Spirit", 18: "Sven", 19: "Tiny", 20: "Vengeful Spirit",
    21: "Windranger", 22: "Zeus", 23: "Kunkka", 25: "Lina", 26: "Lion",
    27: "Shadow Shaman", 28: "Slardar", 29: "Tidehunter", 30: "Witch Doctor", 31: "Lich",
    32: "Riki", 33: "Enigma", 34: "Tinker", 35: "Sniper", 36: "Necrophos",
    37: "Warlock", 38: "Beastmaster", 39: "Queen of Pain", 40: "Venomancer", 41: "Faceless Void",
    42: "Wraith King", 43: "Death Prophet", 44: "Phantom Assassin", 45: "Pugna", 46: "Templar Assassin",
    47: "Viper", 48: "Luna", 49: "Dragon Knight", 50: "Dazzle", 51: "Clockwerk",
    52: "Leshrac", 53: "Nature's Prophet", 54: "Lifestealer", 55: "Dark Seer", 56: "Clinkz",
    57: "Omniknight", 58: "Enchantress", 59: "Huskar", 60: "Night Stalker", 61: "Broodmother",
    62: "Bounty Hunter", 63: "Weaver", 64: "Jakiro", 65: "Batrider", 66: "Chen",
    67: "Spectre", 68: "Ancient Apparition", 69: "Doom", 70: "Ursa", 71: "Spirit Breaker",
    72: "Gyrocopter", 73: "Alchemist", 74: "Invoker", 75: "Silencer", 76: "Outworld Destroyer",
    77: "Lycan", 78: "Brewmaster", 79: "Shadow Demon", 80: "Lone Druid", 81: "Chaos Knight",
    82: "Meepo", 83: "Treant Protector", 84: "Ogre Magi", 85: "Undying", 86: "Rubick",
    87: "Disruptor", 88: "Nyx Assassin", 89: "Naga Siren", 90: "Keeper of the Light", 91: "Io",
    92: "Visage", 93: "Slark", 94: "Medusa", 95: "Troll Warlord", 96: "Centaur Warrunner",
    97: "Magnus", 98: "Timbersaw", 99: "Bristleback", 100: "Tusk", 101: "Skywrath Mage",
    102: "Abaddon", 103: "Elder Titan", 104: "Legion Commander", 105: "Techies", 106: "Ember Spirit",
    107: "Earth Spirit", 108: "Underlord", 109: "Terrorblade", 110: "Phoenix", 111: "Oracle",
    112: "Winter Wyvern", 113: "Arc Warden", 114: "Monkey King", 119: "Dark Willow", 120: "Pangolier",
    121: "Grimstroke", 123: "Hoodwink", 126: "Void Spirit", 128: "Snapfire", 129: "Mars",
    135: "Dawnbreaker", 136: "Marci", 137: "Primal Beast", 138: "Muerta"
};

const heroImageMap = {
    1: 'antimage', 2: 'axe', 3: 'bane', 4: 'bloodseeker', 5: 'crystal_maiden',
    6: 'drow_ranger', 7: 'earthshaker', 8: 'juggernaut', 9: 'mirana', 10: 'morphling',
    11: 'nevermore', 12: 'phantom_lancer', 13: 'puck', 14: 'pudge', 15: 'razor',
    16: 'sand_king', 17: 'storm_spirit', 18: 'sven', 19: 'tiny', 20: 'vengefulspirit',
    21: 'windrunner', 22: 'zuus', 23: 'kunkka', 25: 'lina', 26: 'lion',
    27: 'shadow_shaman', 28: 'slardar', 29: 'tidehunter', 30: 'witch_doctor', 31: 'lich',
    32: 'riki', 33: 'enigma', 34: 'tinker', 35: 'sniper', 36: 'necrolyte',
    37: 'warlock', 38: 'beastmaster', 39: 'queenofpain', 40: 'venomancer', 41: 'faceless_void',
    42: 'skeleton_king', 43: 'death_prophet', 44: 'phantom_assassin', 45: 'pugna', 46: 'templar_assassin',
    47: 'viper', 48: 'luna', 49: 'dragon_knight', 50: 'dazzle', 51: 'rattletrap',
    52: 'leshrac', 53: 'furion', 54: 'life_stealer', 55: 'dark_seer', 56: 'clinkz',
    57: 'omniknight', 58: 'enchantress', 59: 'huskar', 60: 'night_stalker', 61: 'broodmother',
    62: 'bounty_hunter', 63: 'weaver', 64: 'jakiro', 65: 'batrider', 66: 'chen',
    67: 'spectre', 68: 'ancient_apparition', 69: 'doom_bringer', 70: 'ursa', 71: 'spirit_breaker',
    72: 'gyrocopter', 73: 'alchemist', 74: 'invoker', 75: 'silencer', 76: 'obsidian_destroyer',
    77: 'lycan', 78: 'brewmaster', 79: 'shadow_demon', 80: 'lone_druid', 81: 'chaos_knight',
    82: 'meepo', 83: 'treant', 84: 'ogre_magi', 85: 'undying', 86: 'rubick',
    87: 'disruptor', 88: 'nyx_assassin', 89: 'naga_siren', 90: 'keeper_of_the_light', 91: 'wisp',
    92: 'visage', 93: 'slark', 94: 'medusa', 95: 'troll_warlord', 96: 'centaur',
    97: 'magnataur', 98: 'shredder', 99: 'bristleback', 100: 'tusk', 101: 'skywrath_mage',
    102: 'abaddon', 103: 'elder_titan', 104: 'legion_commander', 105: 'techies', 106: 'ember_spirit',
    107: 'earth_spirit', 108: 'abyssal_underlord', 109: 'terrorblade', 110: 'phoenix', 111: 'oracle',
    112: 'winter_wyvern', 113: 'arc_warden', 114: 'monkey_king', 119: 'dark_willow', 120: 'pangolier',
    121: 'grimstroke', 123: 'hoodwink', 126: 'void_spirit', 128: 'snapfire', 129: 'mars',
    135: 'dawnbreaker', 136: 'marci', 137: 'primal_beast', 138: 'muerta'
};

function getHeroIcon(heroId) {
    const imageName = heroImageMap[heroId];
    if (!imageName) return '';
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${imageName}.png`;
}

function getItemIcon(itemId) {
    if (!itemId || itemId === 0) return '';
    
    const itemMap = {
        1: 'blink', 29: 'boots', 36: 'magic_wand', 41: 'bottle', 46: 'tpscroll',
        48: 'travel_boots', 50: 'phase_boots', 63: 'power_treads', 108: 'ultimate_scepter',
        // Add more common items here
    };
    
    const imageName = itemMap[itemId];
    if (!imageName) return '';
    
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${imageName}.png`;
}

// ============= API Module =============
const API_BASE = 'https://api.opendota.com/api';
const CACHE_DURATION = 5 * 60 * 1000;

class APICache {
    constructor() {
        this.cache = new Map();
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
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
        const memoryCache = this.cache.get(key);
        if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_DURATION) {
            return memoryCache.data;
        }

        try {
            const stored = localStorage.getItem(`cache_${key}`);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Date.now() - parsed.timestamp < CACHE_DURATION) {
                    this.cache.set(key, parsed);
                    return parsed.data;
                } else {
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
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('cache_')) {
                localStorage.removeItem(key);
            }
        });
    }
}

const cache = new APICache();

async function fetchWithCache(url, cacheKey) {
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log(`Using cached data for ${cacheKey}`);
        return cached;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        throw error;
    }
}

function convertTo32BitId(steamId) {
    steamId = steamId.toString().trim();
    if (steamId.length < 17) return steamId;
    try {
        const id64 = BigInt(steamId);
        return Number(id64 - 76561197960265728n).toString();
    } catch (e) {
        return steamId;
    }
}

// ============= Main Application =============
let currentAccountId = null;
let playerData = null;
let recentMatches = [];
let heroStats = [];
let chartsInitialized = false;
let chartInstances = {};

function showLoading(show) {
    document.querySelector('.loading').classList.toggle('active', show);
}

function showError(msg) {
    const error = document.getElementById('error');
    error.textContent = msg;
    error.classList.add('active');
}

function hideError() {
    document.getElementById('error').classList.remove('active');
}

function isWin(match) {
    return (match.player_slot < 128 && match.radiant_win) || 
           (match.player_slot >= 128 && !match.radiant_win);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getTimeAgo(timestamp) {
    const diff = Date.now() / 1000 - timestamp;
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return `${Math.floor(diff / 604800)} weeks ago`;
}

async function fetchData() {
    const input = document.getElementById('steamId').value.trim();
    if (!input) {
        showError('Please enter your Steam ID or OpenDota player ID');
        return;
    }

    currentAccountId = convertTo32BitId(input);
    await loadData();
}

async function refreshData() {
    if (currentAccountId) {
        await loadData();
    }
}

async function loadData() {
    showLoading(true);
    hideError();

    try {
        // Fetch all data in parallel
        const [profileRes, wlRes, matchesRes, heroesRes] = await Promise.all([
            fetchWithCache(`${API_BASE}/players/${currentAccountId}`, `profile_${currentAccountId}`),
            fetchWithCache(`${API_BASE}/players/${currentAccountId}/wl`, `wl_${currentAccountId}`),
            fetchWithCache(`${API_BASE}/players/${currentAccountId}/recentMatches`, `recent_${currentAccountId}`),
            fetchWithCache(`${API_BASE}/players/${currentAccountId}/heroes`, `heroes_${currentAccountId}`)
        ]);

        playerData = profileRes;
        const wl = wlRes;
        recentMatches = matchesRes;
        heroStats = heroesRes;

        if (!recentMatches || recentMatches.length === 0) {
            throw new Error('No match data available. Make sure your profile is public.');
        }

        // Fetch match details for items
        const matchDetailsPromises = recentMatches.slice(0, 10).map(match => 
            fetchWithCache(`${API_BASE}/matches/${match.match_id}`, `match_${match.match_id}`)
                .catch(err => {
                    console.error(`Failed to fetch match ${match.match_id}:`, err);
                    return null;
                })
        );
        
        const detailedMatches = await Promise.all(matchDetailsPromises);
        
        // Merge detailed data
        recentMatches = recentMatches.map((match, index) => {
            if (index < 10 && detailedMatches[index]) {
                const details = detailedMatches[index];
                const playerData = details.players?.find(p => 
                    p.account_id == currentAccountId || 
                    p.player_slot === match.player_slot
                );
                
                if (playerData) {
                    return {
                        ...match,
                        item_0: playerData.item_0,
                        item_1: playerData.item_1,
                        item_2: playerData.item_2,
                        item_3: playerData.item_3,
                        item_4: playerData.item_4,
                        item_5: playerData.item_5,
                        item_neutral: playerData.item_neutral,
                        hero_damage: playerData.hero_damage,
                        tower_damage: playerData.tower_damage,
                        details: details
                    };
                }
            }
            return match;
        });

        displayProfile();
        displayStats(wl);
        displayRank();
        displayHeroes();
        displayMatches();

        document.getElementById('content').style.display = 'block';
        document.getElementById('refreshBtn').style.display = 'inline-block';
    } catch (error) {
        showError(error.message || 'Failed to load data. Please check your Steam ID.');
    } finally {
        showLoading(false);
    }
}

function displayProfile() {
    if (playerData.profile) {
        document.getElementById('profileHeader').style.display = 'flex';
        document.getElementById('profileName').textContent = playerData.profile.personaname || 'Anonymous Hero';
        if (playerData.profile.avatarfull) {
            document.getElementById('profileAvatar').style.backgroundImage = `url(${playerData.profile.avatarfull})`;
            document.getElementById('profileAvatar').style.backgroundSize = 'cover';
            document.getElementById('profileAvatar').textContent = '';
        }
    }
}

function displayStats(wl) {
    const total = wl.win + wl.lose;
    const winRate = total > 0 ? ((wl.win / total) * 100).toFixed(1) : 0;
    
    document.getElementById('totalMatches').textContent = total.toLocaleString();
    document.getElementById('winRate').textContent = winRate + '%';
    document.getElementById('winrateFill').style.width = winRate + '%';
    
    if (playerData.profile) {
        document.getElementById('profileMatches').textContent = total.toLocaleString();
        document.getElementById('profileWinrate').textContent = winRate + '%';
    }

    if (recentMatches.length > 0) {
        const avgK = recentMatches.reduce((s, m) => s + m.kills, 0) / recentMatches.length;
        const avgD = recentMatches.reduce((s, m) => s + m.deaths, 0) / recentMatches.length || 1;
        const avgA = recentMatches.reduce((s, m) => s + m.assists, 0) / recentMatches.length;
        const kda = ((avgK + avgA) / avgD).toFixed(2);
        
        document.getElementById('avgKDA').textContent = kda;
        document.getElementById('avgGPM').textContent = Math.round(
            recentMatches.reduce((s, m) => s + m.gold_per_min, 0) / recentMatches.length
        );
        document.getElementById('avgXPM').textContent = Math.round(
            recentMatches.reduce((s, m) => s + m.xp_per_min, 0) / recentMatches.length
        );

        const last10 = recentMatches.slice(0, 10);
        const recentWins = last10.filter(m => isWin(m)).length;
        document.getElementById('recentForm').textContent = `${recentWins}W - ${10 - recentWins}L`;
        
        let currentStreak = 0;
        let maxStreak = 0;
        for (const match of recentMatches) {
            if (isWin(match)) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        document.getElementById('profileStreak').textContent = maxStreak;
    }
}

function displayRank() {
    let mmr = null;
    let rankTier = null;
    
    if (playerData.mmr_estimate && playerData.mmr_estimate.estimate) {
        mmr = playerData.mmr_estimate.estimate;
    } else if (playerData.rank_tier) {
        rankTier = playerData.rank_tier;
        const medal = Math.floor(rankTier / 10);
        const stars = rankTier % 10;
        mmr = (medal * 700) + (stars * 100);
    } else if (playerData.solo_competitive_rank) {
        mmr = playerData.solo_competitive_rank * 50;
    }

    if (mmr || rankTier) {
        document.getElementById('rankDisplay').style.display = 'block';
        
        let rank = 'Herald';
        let medal = '🥉';
        
        if (mmr >= 5420 || rankTier >= 70) { rank = 'Immortal'; medal = '🔥'; }
        else if (mmr >= 4620 || rankTier >= 60) { rank = 'Divine'; medal = '💎'; }
        else if (mmr >= 3850 || rankTier >= 50) { rank = 'Ancient'; medal = '⚔️'; }
        else if (mmr >= 3080 || rankTier >= 40) { rank = 'Legend'; medal = '⭐'; }
        else if (mmr >= 2310 || rankTier >= 30) { rank = 'Archon'; medal = '🏅'; }
        else if (mmr >= 1540 || rankTier >= 20) { rank = 'Crusader'; medal = '🗡️'; }
        else if (mmr >= 770 || rankTier >= 10) { rank = 'Guardian'; medal = '🛡️'; }

        document.getElementById('rankMedal').textContent = medal;
        document.getElementById('rankTitle').textContent = rank;
        document.getElementById('mmrValue').textContent = mmr ? `MMR: ~${Math.round(mmr)}` : 'Rank Tier: ' + rankTier;
    }
}

function displayHeroes() {
    const heroGrid = document.getElementById('heroGrid');
    heroGrid.innerHTML = '';

    const topHeroes = heroStats
        .filter(h => h.games > 0)
        .sort((a, b) => b.games - a.games)
        .slice(0, 20);

    topHeroes.forEach((hero, index) => {
        const winRate = ((hero.win / hero.games) * 100).toFixed(1);
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        const heroIcon = getHeroIcon(hero.hero_id);
        const iconStyle = heroIcon ? `background-image: url(${heroIcon});` : '';
        
        card.innerHTML = `
            <div class="hero-icon" style="${iconStyle}"></div>
            <div class="hero-name">${heroNames[hero.hero_id] || 'Hero ' + hero.hero_id}</div>
            <div class="hero-stats">${hero.games} games</div>
            <div class="hero-winrate ${winRate >= 50 ? 'good' : 'bad'}">
                ${winRate}% WR
            </div>
        `;
        
        heroGrid.appendChild(card);
    });
}

function displayMatches() {
    const matchList = document.getElementById('matchList');
    matchList.innerHTML = '';

    recentMatches.slice(0, 20).forEach((match, index) => {
        const won = isWin(match);
        const card = document.createElement('div');
        card.className = `match-card ${won ? 'win' : 'loss'}`;
        card.style.animationDelay = `${index * 0.03}s`;
        
        const duration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
        const heroIcon = getHeroIcon(match.hero_id);
        const iconStyle = heroIcon ? `background-image: url(${heroIcon});` : '';
        
        const kdaRatio = match.deaths > 0 ? ((match.kills + match.assists) / match.deaths).toFixed(1) : '∞';
        
        card.innerHTML = `
            <div class="match-hero">
                <div class="match-hero-icon" style="${iconStyle}"></div>
                <div class="match-hero-name">${heroNames[match.hero_id] || 'Hero'}</div>
            </div>
            <div class="match-details">
                <div class="match-top-row">
                    <span class="match-result ${won ? 'win' : 'loss'}">${won ? 'WIN' : 'LOSS'}</span>
                    <div class="match-kda">
                        ${match.kills}<span>/</span>${match.deaths}<span>/</span>${match.assists}
                        <span class="kda-ratio">${kdaRatio}</span>
                    </div>
                </div>
                <div class="match-stats">
                    <div class="match-stat">
                        <span class="match-stat-label">GPM</span>
                        <span class="match-stat-value">${match.gold_per_min}</span>
                    </div>
                    <div class="match-stat">
                        <span class="match-stat-label">XPM</span>
                        <span class="match-stat-value">${match.xp_per_min}</span>
                    </div>
                    <div class="match-stat">
                        <span class="match-stat-label">CS</span>
                        <span class="match-stat-value">${match.last_hits || 0}/${match.denies || 0}</span>
                    </div>
                </div>
            </div>
            <div class="match-meta">
                <div>
                    <div class="match-duration">${duration}</div>
                    <div class="match-time">${getTimeAgo(match.start_time)}</div>
                </div>
                <div>
                    <a href="https://www.opendota.com/matches/${match.match_id}" target="_blank" class="match-link">Details →</a>
                </div>
            </div>
        `;
        
        matchList.appendChild(card);
    });
}

function switchTab(event, tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Initialize charts when Analytics tab is opened
    if (tabName === 'charts' && !chartsInitialized && recentMatches.length > 0) {
        setTimeout(createCharts, 100);
        chartsInitialized = true;
    }
}

function destroyCharts() {
    Object.keys(chartInstances).forEach(key => {
        if (chartInstances[key]) {
            chartInstances[key].destroy();
            delete chartInstances[key];
        }
    });
}

function createCharts() {
    if (!recentMatches || recentMatches.length === 0) {
        console.error('No matches data available for charts');
        return;
    }

    // Destroy existing charts first
    destroyCharts();

    // Win Streak Chart
    const ctx1 = document.getElementById('winStreakChart');
    if (!ctx1) {
        console.error('winStreakChart canvas not found');
        return;
    }
    
    const last20 = recentMatches.slice(0, 20).reverse();
    
    const streakData = [];
    let currentStreak = 0;
    
    last20.forEach((match, index) => {
        const won = isWin(match);
        if (index === 0) {
            currentStreak = won ? 1 : -1;
        } else {
            const prevWon = streakData[index - 1] > 0;
            if (won === prevWon) {
                currentStreak = won ? Math.abs(currentStreak) + 1 : -(Math.abs(currentStreak) + 1);
            } else {
                currentStreak = won ? 1 : -1;
            }
        }
        streakData.push(currentStreak);
    });

    chartInstances.winStreak = new Chart(ctx1.getContext('2d'), {
        type: 'bar',
        data: {
            labels: last20.map((_, i) => `Game ${i + 1}`),
            datasets: [{
                label: 'Win/Loss Streak',
                data: streakData,
                backgroundColor: streakData.map(val => 
                    val > 0 ? 'rgba(146, 165, 37, 0.7)' : 'rgba(194, 60, 42, 0.7)'
                ),
                borderColor: streakData.map(val => 
                    val > 0 ? '#92a525' : '#c23c2a'
                ),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#7c8184' }
                }
            },
            scales: {
                y: {
                    ticks: { 
                        color: '#7c8184',
                        callback: function(value) {
                            return Math.abs(value);
                        }
                    },
                    grid: { color: '#2e3338' }
                },
                x: {
                    ticks: { color: '#7c8184' },
                    grid: { color: '#2e3338' }
                }
            }
        }
    });

    // Performance Radar
    const ctx2 = document.getElementById('performanceRadar');
    if (!ctx2) {
        console.error('performanceRadar canvas not found');
        return;
    }
    const avgGPM = recentMatches.reduce((s, m) => s + m.gold_per_min, 0) / recentMatches.length;
    const avgXPM = recentMatches.reduce((s, m) => s + m.xp_per_min, 0) / recentMatches.length;
    const avgKills = recentMatches.reduce((s, m) => s + m.kills, 0) / recentMatches.length;
    const avgDeaths = recentMatches.reduce((s, m) => s + m.deaths, 0) / recentMatches.length;
    const avgAssists = recentMatches.reduce((s, m) => s + m.assists, 0) / recentMatches.length;

    chartInstances.performanceRadar = new Chart(ctx2.getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['GPM', 'XPM', 'Kills', 'Survival', 'Assists'],
            datasets: [{
                label: 'Average Performance',
                data: [
                    Math.min((avgGPM / 500) * 100, 100),
                    Math.min((avgXPM / 600) * 100, 100),
                    Math.min((avgKills / 15) * 100, 100),
                    Math.max(0, 100 - (avgDeaths / 10) * 100),
                    Math.min((avgAssists / 20) * 100, 100)
                ],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#7c8184' }
                }
            },
            scales: {
                r: {
                    ticks: { color: '#7c8184', backdropColor: 'transparent' },
                    grid: { color: '#2e3338' },
                    angleLines: { color: '#2e3338' },
                    pointLabels: { color: '#7c8184' }
                }
            }
        }
    });

    // GPM/XPM Trends Chart
    const ctx3 = document.getElementById('gpmXpmChart');
    if (!ctx3) {
        console.error('gpmXpmChart canvas not found');
        return;
    }

    const gpmData = [];
    const xpmData = [];
    
    last20.forEach((match) => {
        gpmData.push(match.gold_per_min);
        xpmData.push(match.xp_per_min);
    });

    chartInstances.gpmXpm = new Chart(ctx3.getContext('2d'), {
        type: 'line',
        data: {
            labels: last20.map((_, i) => `Game ${i + 1}`),
            datasets: [
                {
                    label: 'GPM',
                    data: gpmData,
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'XPM',
                    data: xpmData,
                    borderColor: '#0596ff',
                    backgroundColor: 'rgba(5, 150, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#7c8184' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#7c8184' },
                    grid: { color: '#2e3338' }
                },
                x: {
                    ticks: { color: '#7c8184' },
                    grid: { color: '#2e3338' }
                }
            }
        }
    });

    // Hero Performance Matrix
    const ctx4 = document.getElementById('heroMatrix');
    if (!ctx4 || !heroStats || heroStats.length === 0) {
        console.error('heroMatrix canvas not found or no hero stats');
        return;
    }

    const relevantHeroes = heroStats
        .filter(h => h.games >= 2)
        .slice(0, 10)
        .map(h => ({
            x: h.games,
            y: (h.win / h.games) * 100,
            r: 8,
            label: heroNames[h.hero_id] || `Hero ${h.hero_id}`
        }));

    chartInstances.heroMatrix = new Chart(ctx4.getContext('2d'), {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Hero Performance',
                data: relevantHeroes,
                backgroundColor: relevantHeroes.map(h => 
                    h.y >= 50 ? 'rgba(146, 165, 37, 0.6)' : 'rgba(194, 60, 42, 0.6)'
                ),
                borderColor: relevantHeroes.map(h => 
                    h.y >= 50 ? '#92a525' : '#c23c2a'
                ),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#7c8184' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Hero: ${point.label}`,
                                `Games: ${point.x}`,
                                `Win Rate: ${point.y.toFixed(1)}%`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Games Played',
                        color: '#7c8184'
                    },
                    ticks: { color: '#7c8184' },
                    grid: { color: '#2e3338' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Win Rate %',
                        color: '#7c8184'
                    },
                    min: 0,
                    max: 100,
                    ticks: { color: '#7c8184' },
                    grid: { color: '#2e3338' }
                }
            }
        }
    });
}

// Initialize app
window.fetchData = fetchData;
window.refreshData = refreshData;
window.switchTab = switchTab;
window.heroNames = heroNames;

// Add enter key support
document.getElementById('steamId').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchData();
});