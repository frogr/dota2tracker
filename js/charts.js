// Charts module with improved visualizations

let chartInstances = {};

// Chart configuration defaults
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { 
                color: '#7c8184',
                font: {
                    family: 'Rajdhani',
                    weight: 600
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(26, 29, 33, 0.95)',
            borderColor: '#d4af37',
            borderWidth: 1,
            titleColor: '#d4af37',
            bodyColor: '#e6e6e6',
            cornerRadius: 0,
            displayColors: true,
            callbacks: {}
        }
    },
    scales: {
        y: {
            ticks: { 
                color: '#7c8184',
                font: {
                    family: 'Rajdhani'
                }
            },
            grid: { 
                color: '#2e3338',
                drawBorder: false
            }
        },
        x: {
            ticks: { 
                color: '#7c8184',
                font: {
                    family: 'Rajdhani'
                }
            },
            grid: { 
                color: '#2e3338',
                drawBorder: false
            }
        }
    }
};

// Helper function to check if match is won
function isWin(match) {
    return (match.player_slot < 128 && match.radiant_win) || 
           (match.player_slot >= 128 && !match.radiant_win);
}

// Destroy existing chart if it exists
function destroyChart(chartId) {
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
        delete chartInstances[chartId];
    }
}

// Create Win/Loss Streak Chart
export function createWinStreakChart(canvasId, matches) {
    destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    const last20 = matches.slice(0, 20).reverse();
    
    // Calculate streak data
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

    chartInstances[canvasId] = new Chart(ctx, {
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
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    ...chartDefaults.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const absValue = Math.abs(value);
                            const type = value > 0 ? 'Win' : 'Loss';
                            return `${absValue} game ${type} streak`;
                        }
                    }
                }
            },
            scales: {
                ...chartDefaults.scales,
                y: {
                    ...chartDefaults.scales.y,
                    ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: function(value) {
                            return Math.abs(value);
                        }
                    }
                }
            }
        }
    });
}

// Create Performance Radar Chart
export function createPerformanceRadar(canvasId, matches, globalAverages = null) {
    destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Calculate averages
    const avgGPM = matches.reduce((s, m) => s + m.gold_per_min, 0) / matches.length;
    const avgXPM = matches.reduce((s, m) => s + m.xp_per_min, 0) / matches.length;
    const avgKills = matches.reduce((s, m) => s + m.kills, 0) / matches.length;
    const avgDeaths = matches.reduce((s, m) => s + m.deaths, 0) / matches.length;
    const avgAssists = matches.reduce((s, m) => s + m.assists, 0) / matches.length;
    const avgLastHits = matches.reduce((s, m) => s + (m.last_hits || 0), 0) / matches.length;
    const avgDenies = matches.reduce((s, m) => s + (m.denies || 0), 0) / matches.length;
    const avgHeroDamage = matches.reduce((s, m) => s + (m.hero_damage || 0), 0) / matches.length;
    
    // Normalize against percentiles (these are approximate Archon-Legend level values)
    const percentiles = globalAverages || {
        gpm: 450,
        xpm: 550,
        kills: 8,
        deaths: 6,
        assists: 12,
        lastHits: 150,
        denies: 15,
        heroDamage: 15000
    };
    
    const datasets = [{
        label: 'Your Performance',
        data: [
            Math.min((avgGPM / percentiles.gpm) * 100, 150),
            Math.min((avgXPM / percentiles.xpm) * 100, 150),
            Math.min((avgKills / percentiles.kills) * 100, 150),
            Math.max(0, 150 - (avgDeaths / percentiles.deaths) * 100),
            Math.min((avgAssists / percentiles.assists) * 100, 150),
            Math.min((avgLastHits / percentiles.lastHits) * 100, 150),
            Math.min((avgDenies / percentiles.denies) * 100, 150),
            Math.min((avgHeroDamage / percentiles.heroDamage) * 100, 150)
        ],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#d4af37',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#d4af37'
    }];
    
    // Add average line for reference
    datasets.push({
        label: 'Average Player',
        data: [100, 100, 100, 100, 100, 100, 100, 100],
        borderColor: '#7c8184',
        backgroundColor: 'rgba(124, 129, 132, 0.1)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0
    });

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['GPM', 'XPM', 'Kills', 'Survival', 'Assists', 'Last Hits', 'Denies', 'Hero Damage'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    ...chartDefaults.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label;
                            const value = context.raw;
                            const metric = context.label;
                            
                            if (label === 'Average Player') {
                                return `${label}: 100%`;
                            }
                            
                            // Get actual values
                            const actualValues = {
                                'GPM': avgGPM.toFixed(0),
                                'XPM': avgXPM.toFixed(0),
                                'Kills': avgKills.toFixed(1),
                                'Survival': avgDeaths.toFixed(1) + ' deaths',
                                'Assists': avgAssists.toFixed(1),
                                'Last Hits': avgLastHits.toFixed(0),
                                'Denies': avgDenies.toFixed(0),
                                'Hero Damage': (avgHeroDamage / 1000).toFixed(1) + 'k'
                            };
                            
                            return `${label}: ${actualValues[metric]} (${value.toFixed(0)}% of average)`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    ticks: { 
                        color: '#7c8184', 
                        backdropColor: 'transparent',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: { 
                        color: '#2e3338' 
                    },
                    angleLines: { 
                        color: '#2e3338' 
                    },
                    pointLabels: { 
                        color: '#7c8184',
                        font: {
                            family: 'Rajdhani',
                            weight: 600
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 150
                }
            }
        }
    });
}

// Create GPM/XPM Trend Chart
export function createGPMXPMTrend(canvasId, matches) {
    destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    const last20 = matches.slice(0, 20).reverse();
    
    // Calculate moving averages (3-game window)
    const gpmData = [];
    const xpmData = [];
    const gpmMovingAvg = [];
    const xpmMovingAvg = [];
    
    last20.forEach((match, index) => {
        gpmData.push(match.gold_per_min);
        xpmData.push(match.xp_per_min);
        
        // Calculate moving average
        if (index >= 2) {
            const gpmAvg = (gpmData[index] + gpmData[index-1] + gpmData[index-2]) / 3;
            const xpmAvg = (xpmData[index] + xpmData[index-1] + xpmData[index-2]) / 3;
            gpmMovingAvg.push(gpmAvg);
            xpmMovingAvg.push(xpmAvg);
        } else {
            gpmMovingAvg.push(null);
            xpmMovingAvg.push(null);
        }
    });

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last20.map((_, i) => `Game ${i + 1}`),
            datasets: [
                {
                    label: 'GPM',
                    data: gpmData,
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: '#d4af37',
                    tension: 0.1
                },
                {
                    label: 'GPM (3-game avg)',
                    data: gpmMovingAvg,
                    borderColor: '#ffd700',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'XPM',
                    data: xpmData,
                    borderColor: '#0596ff',
                    backgroundColor: 'rgba(5, 150, 255, 0.1)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: '#0596ff',
                    tension: 0.1
                },
                {
                    label: 'XPM (3-game avg)',
                    data: xpmMovingAvg,
                    borderColor: '#108dc7',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    ...chartDefaults.plugins.tooltip,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label;
                            const value = context.raw;
                            if (value === null) return null;
                            return `${label}: ${Math.round(value)}`;
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Create Hero Performance Matrix
export function createHeroMatrix(canvasId, heroStats) {
    destroyChart(canvasId);
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Filter heroes with at least 3 games
    const relevantHeroes = heroStats
        .filter(h => h.games >= 3)
        .map(h => ({
            ...h,
            winRate: (h.win / h.games) * 100,
            kda: h.games > 0 ? ((h.kills + h.assists) / Math.max(h.deaths, 1)) : 0
        }))
        .sort((a, b) => b.games - a.games)
        .slice(0, 15);
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Hero Performance',
                data: relevantHeroes.map(hero => ({
                    x: hero.games,
                    y: hero.winRate,
                    r: Math.sqrt(hero.kda) * 5, // Bubble size based on KDA
                    heroId: hero.hero_id,
                    kda: hero.kda
                })),
                backgroundColor: relevantHeroes.map(h => 
                    h.winRate >= 50 
                        ? `rgba(146, 165, 37, ${0.3 + (h.winRate - 50) / 100})`
                        : `rgba(194, 60, 42, ${0.3 + (50 - h.winRate) / 100})`
                ),
                borderColor: relevantHeroes.map(h => 
                    h.winRate >= 50 ? '#92a525' : '#c23c2a'
                ),
                borderWidth: 2
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    ...chartDefaults.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const data = context.raw;
                            const heroName = window.heroNames?.[data.heroId] || `Hero ${data.heroId}`;
                            return [
                                `Hero: ${heroName}`,
                                `Games: ${data.x}`,
                                `Win Rate: ${data.y.toFixed(1)}%`,
                                `KDA: ${data.kda.toFixed(2)}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    ...chartDefaults.scales.x,
                    title: {
                        display: true,
                        text: 'Games Played',
                        color: '#7c8184'
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    title: {
                        display: true,
                        text: 'Win Rate %',
                        color: '#7c8184'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// Initialize all charts
export function initCharts(matches, heroStats) {
    // Only initialize if we have data
    if (!matches || matches.length === 0) return;
    
    // Check if chart containers exist before creating
    if (document.getElementById('winStreakChart')) {
        createWinStreakChart('winStreakChart', matches);
    }
    
    if (document.getElementById('performanceRadar')) {
        createPerformanceRadar('performanceRadar', matches);
    }
    
    if (document.getElementById('gpmXpmChart')) {
        createGPMXPMTrend('gpmXpmChart', matches);
    }
    
    if (document.getElementById('heroMatrix') && heroStats) {
        createHeroMatrix('heroMatrix', heroStats);
    }
}

// Cleanup function
export function destroyAllCharts() {
    Object.keys(chartInstances).forEach(chartId => {
        destroyChart(chartId);
    });
}

// Export chart instances for debugging
export function getChartInstances() {
    return chartInstances;
}