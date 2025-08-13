// Main application module

import { API, convertTo32BitId } from './api.js';
import { 
    showLoading, 
    showError, 
    hideError, 
    displayAllData,
    initUI 
} from './ui.js';
import { heroNames } from './data-mappings.js';

// Global state
let currentAccountId = null;
let isLoading = false;

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Main data fetching function
async function fetchData() {
    const input = document.getElementById('steamId').value.trim();
    if (!input) {
        showError('Please enter your Steam ID or OpenDota player ID');
        return;
    }
    
    // Prevent multiple simultaneous requests
    if (isLoading) return;
    
    currentAccountId = convertTo32BitId(input);
    await loadData();
}

// Refresh data function
async function refreshData() {
    if (currentAccountId && !isLoading) {
        await loadData();
    }
}

// Load all data
async function loadData() {
    isLoading = true;
    
    // Dispatch loading event for UI cleanup
    window.dispatchEvent(new CustomEvent('dataLoading'));
    
    showLoading(true);
    hideError();
    
    try {
        // Load all player data with caching
        const data = await API.loadPlayerData(currentAccountId);
        
        // Display all data
        displayAllData(data, currentAccountId);
        
        // Store current account ID for refresh
        sessionStorage.setItem('lastAccountId', currentAccountId);
        
    } catch (error) {
        console.error('Failed to load data:', error);
        showError(error.message || 'Failed to load data. Please check your Steam ID and ensure your profile is public.');
    } finally {
        showLoading(false);
        isLoading = false;
    }
}

// Initialize application
function initApp() {
    // Initialize UI
    initUI();
    
    // Make functions globally available
    window.fetchData = fetchData;
    window.refreshData = refreshData;
    window.heroNames = heroNames;
    
    // Set up event listeners
    const fetchButton = document.querySelector('button[onclick="fetchData()"]');
    if (fetchButton) {
        fetchButton.onclick = fetchData;
    }
    
    const refreshButton = document.querySelector('button[onclick="refreshData()"]');
    if (refreshButton) {
        refreshButton.onclick = refreshData;
    }
    
    // Add debounced search on input
    const steamIdInput = document.getElementById('steamId');
    if (steamIdInput) {
        // Auto-load if we have a saved account ID
        const savedId = sessionStorage.getItem('lastAccountId');
        if (savedId) {
            steamIdInput.value = savedId;
        }
        
        // Add input validation
        steamIdInput.addEventListener('input', debounce((e) => {
            const value = e.target.value.trim();
            if (value.length > 0 && value.length < 6) {
                steamIdInput.setCustomValidity('Steam ID must be at least 6 characters');
            } else {
                steamIdInput.setCustomValidity('');
            }
        }, 300));
    }
    
    // Handle visibility change to pause/resume animations
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause expensive operations when tab is hidden
            document.querySelectorAll('.loading-spinner').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Resume when tab is visible
            document.querySelectorAll('.loading-spinner').forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + R to refresh data
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && currentAccountId) {
            e.preventDefault();
            refreshData();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            steamIdInput?.focus();
            steamIdInput?.select();
        }
    });
    
    // Performance monitoring
    if (window.performance && performance.mark) {
        performance.mark('app-init-complete');
        
        // Log performance metrics in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                    domInteractive: perfData.domInteractive,
                    domComplete: perfData.domComplete
                });
            });
        }
    }
    
    // Service Worker registration for offline caching (optional)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for debugging
window.DotaTrackerAPI = API;