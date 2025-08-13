// UI module for handling all display and interaction logic

import { heroNames, getHeroIcon, getItemIcon, gameModes, getRankInfo } from './data-mappings.js';
import { initCharts, destroyAllCharts } from './charts.js';

// Helper functions
function isWin(match) {
    return (match.player_slot < 128 && match.radiant_win) || 
           (match.player_slot >= 128 && !match.radiant_win);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
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

// UI State
let currentAccountId = null;
let chartsInitialized = false;

// Loading states
export function showLoading(show) {
    document.querySelector('.loading').classList.toggle('active', show);
}

export function showError(msg) {
    const error = document.getElementById('error');
    error.textContent = msg;
    error.classList.add('active');
}

export function hideError() {
    document.getElementById('error').classList.remove('active');
}

// Profile display
export function displayProfile(playerData) {
    if (!playerData.profile) return;
    
    const profileHeader = document.getElementById('profileHeader');
    profileHeader.style.display = 'flex';
    
    document.getElementById('profileName').textContent = 
        playerData.profile.personaname || 'Anonymous Hero';
    
    if (playerData.profile.avatarfull) {
        const avatar = document.getElementById('profileAvatar');
        avatar.style.backgroundImage = `url(${playerData.profile.avatarfull})`;
        avatar.style.backgroundSize = 'cover';
        avatar.textContent = '';
    }
}

// Stats display
export function displayStats(wl, recentMatches, playerData) {
    const total = wl.win + wl.lose;
    const winRate = total > 0 ? ((wl.win / total) * 100).toFixed(1) : 0;
    
    // Update main stats
    document.getElementById('totalMatches').textContent = total.toLocaleString();
    document.getElementById('winRate').textContent = winRate + '%';
    document.getElementById('winrateFill').style.width = winRate + '%';
    
    // Update profile stats
    if (playerData.profile) {
        document.getElementById('profileMatches').textContent = total.toLocaleString();
        document.getElementById('profileWinrate').textContent = winRate + '%';
    }
    
    if (recentMatches.length > 0) {
        // Calculate KDA
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
        
        // Recent form
        const last10 = recentMatches.slice(0, 10);
        const recentWins = last10.filter(m => isWin(m)).length;
        document.getElementById('recentForm').textContent = `${recentWins}W - ${10 - recentWins}L`;
        
        // Win streak
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
        
        const profileStreak = document.getElementById('profileStreak');
        if (profileStreak) {
            profileStreak.textContent = maxStreak;
        }
    }
}

// Rank display
export function displayRank(playerData) {
    let mmr = null;
    let rankTier = null;
    
    if (playerData.mmr_estimate?.estimate) {
        mmr = playerData.mmr_estimate.estimate;
    } else if (playerData.rank_tier) {
        rankTier = playerData.rank_tier;
    } else if (playerData.solo_competitive_rank) {
        mmr = playerData.solo_competitive_rank * 50;
    }
    
    const rankInfo = getRankInfo(mmr, rankTier);
    
    if (rankInfo) {
        document.getElementById('rankDisplay').style.display = 'block';
        document.getElementById('rankMedal').textContent = rankInfo.medal;
        document.getElementById('rankTitle').textContent = rankInfo.name;
        document.getElementById('mmrValue').textContent = 
            rankInfo.mmr ? `MMR: ~${Math.round(rankInfo.mmr)}` : 'Calibrating...';
    }
}

// Heroes display
export function displayHeroes(heroStats) {
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

// Matches display with lazy loading
export function displayMatches(recentMatches, accountId) {
    const matchList = document.getElementById('matchList');
    matchList.innerHTML = '';
    
    // Create intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.style.backgroundImage = `url(${img.dataset.src})`;
                    img.classList.add('loaded');
                    delete img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    recentMatches.slice(0, 20).forEach((match, index) => {
        const won = isWin(match);
        const card = document.createElement('div');
        card.className = `match-card ${won ? 'win' : 'loss'}`;
        card.style.animationDelay = `${Math.min(index * 0.03, 0.5)}s`;
        
        const duration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
        const heroIcon = getHeroIcon(match.hero_id);
        
        // Build items HTML
        let itemsHtml = '<div class="match-items-container"><div class="match-items-main">';
        for (let i = 0; i < 6; i++) {
            const itemId = match[`item_${i}`];
            if (itemId && itemId !== 0) {
                const itemIcon = getItemIcon(itemId);
                if (itemIcon) {
                    itemsHtml += `<div class="item-slot lazy-load" data-src="${itemIcon}" title="Item ${itemId}"></div>`;
                } else {
                    itemsHtml += '<div class="item-slot empty"></div>';
                }
            } else {
                itemsHtml += '<div class="item-slot empty"></div>';
            }
        }
        itemsHtml += '</div>';
        
        // Neutral item
        if (match.item_neutral && match.item_neutral !== 0) {
            const neutralIcon = getItemIcon(match.item_neutral);
            if (neutralIcon) {
                itemsHtml += `<div class="item-slot neutral lazy-load" data-src="${neutralIcon}"></div>`;
            }
        }
        itemsHtml += '</div>';
        
        // Calculate additional stats
        const kdaRatio = match.deaths > 0 ? ((match.kills + match.assists) / match.deaths).toFixed(1) : '∞';
        
        // Build team composition if available
        let teamsHtml = '';
        if (match.details?.players) {
            const players = match.details.players;
            const radiantPlayers = players.filter(p => p.player_slot < 128).sort((a, b) => a.player_slot - b.player_slot);
            const direPlayers = players.filter(p => p.player_slot >= 128).sort((a, b) => a.player_slot - b.player_slot);
            
            teamsHtml = '<div class="match-teams">';
            
            // Radiant team
            teamsHtml += '<div class="team-row radiant"><span class="team-label">RAD</span>';
            radiantPlayers.forEach(p => {
                const pHeroIcon = getHeroIcon(p.hero_id);
                const isPlayer = p.account_id == accountId;
                teamsHtml += `<div class="team-hero ${isPlayer ? 'player' : ''} lazy-load" 
                    data-src="${pHeroIcon}" 
                    title="${heroNames[p.hero_id] || 'Hero ' + p.hero_id}"></div>`;
            });
            teamsHtml += '</div>';
            
            // Dire team
            teamsHtml += '<div class="team-row dire"><span class="team-label">DIRE</span>';
            direPlayers.forEach(p => {
                const pHeroIcon = getHeroIcon(p.hero_id);
                const isPlayer = p.account_id == accountId;
                teamsHtml += `<div class="team-hero ${isPlayer ? 'player' : ''} lazy-load" 
                    data-src="${pHeroIcon}" 
                    title="${heroNames[p.hero_id] || 'Hero ' + p.hero_id}"></div>`;
            });
            teamsHtml += '</div>';
            
            teamsHtml += '</div>';
        }
        
        card.innerHTML = `
            <div class="match-hero">
                <div class="match-hero-icon lazy-load" data-src="${heroIcon}"></div>
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
                    <div class="match-stat">
                        <span class="match-stat-label">DMG</span>
                        <span class="match-stat-value">${formatNumber(match.hero_damage || 0)}</span>
                    </div>
                    <div class="match-stat">
                        <span class="match-stat-label">TWR</span>
                        <span class="match-stat-value">${formatNumber(match.tower_damage || 0)}</span>
                    </div>
                </div>
                ${itemsHtml}
            </div>
            ${teamsHtml}
            <div class="match-meta">
                <div>
                    <div class="match-duration">${duration}</div>
                    <div class="match-mode">${gameModes[match.game_mode] || 'Custom'}</div>
                    <div class="match-time">${getTimeAgo(match.start_time)}</div>
                </div>
                <div>
                    <div class="match-team-score">
                        <span class="radiant-score">${match.radiant_score || match.details?.radiant_score || '--'}</span>
                        <span class="score-separator">:</span>
                        <span class="dire-score">${match.dire_score || match.details?.dire_score || '--'}</span>
                    </div>
                    <a href="https://www.opendota.com/matches/${match.match_id}" target="_blank" class="match-link">Details →</a>
                </div>
            </div>
        `;
        
        matchList.appendChild(card);
        
        // Observe lazy-load images
        card.querySelectorAll('.lazy-load').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// Tab switching
export function switchTab(event, tabName) {
    // Update tab states
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Lazy load charts when Analytics tab is opened
    if (tabName === 'charts' && !chartsInitialized) {
        const matches = window.appData?.recentMatches;
        const heroStats = window.appData?.heroStats;
        
        if (matches && heroStats) {
            setTimeout(() => {
                initCharts(matches, heroStats);
                chartsInitialized = true;
            }, 100);
        }
    }
}

// Initialize UI
export function initUI() {
    // Make tab switching function global
    window.switchTab = switchTab;
    
    // Add enter key support for input
    const steamIdInput = document.getElementById('steamId');
    if (steamIdInput) {
        steamIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.fetchData?.();
            }
        });
    }
    
    // Reset charts flag when loading new data
    window.addEventListener('dataLoading', () => {
        chartsInitialized = false;
        destroyAllCharts();
    });
}

// Display all data
export function displayAllData(data, accountId) {
    const { profile, wl, recentMatches, heroStats } = data;
    
    // Store data globally for chart lazy loading
    window.appData = data;
    
    // Display all sections
    displayProfile({ profile });
    displayStats(wl, recentMatches, { profile });
    displayRank(profile);
    displayHeroes(heroStats);
    displayMatches(recentMatches, accountId);
    
    // Show content
    document.getElementById('content').style.display = 'block';
    document.getElementById('refreshBtn').style.display = 'inline-block';
}