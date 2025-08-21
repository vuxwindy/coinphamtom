// Game Center JavaScript - COINPAYOT NFT
// Manages game statistics and user data display with NFT Card integration

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentUser = null;
let userStats = {
    ppoBalance: 0,
    totalGames: 0,
    totalEarned: 0,
    bestScore: 0,
    nftCardsCount: 0
};

let nftManager = null;

// ========================================
// INITIALIZATION
// ========================================

// Initialize the game page
async function initGamePage() {
    try {
        console.log('🎮 Initializing Game Center...');
        
        // Initialize NFT Card Manager
        await initNFTManager();
        
        // Check if user is logged in
        const user = getCurrentUser();
        if (!user) {
            console.log('No user logged in, showing public game center');
            loadPublicGameStats();
            showLoginPrompt();
            return;
        }

        currentUser = user;
        console.log('User logged in:', user.uid);
        
        // Load user data
        await loadUserGameData();
        
        // Load game statistics
        await loadGameStatistics();
        
        // Update UI with real data
        updateGameUI();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing game page:', error);
        showNotification('Error loading game data', 'error');
    }
}

// Initialize NFT Card Manager
async function initNFTManager() {
    try {
        // Wait for NFT Card Manager to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            if (window.NFTCardManager) {
                nftManager = new window.NFTCardManager();
                console.log('✅ NFT Card Manager initialized');
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        console.warn('⚠️ NFT Card Manager not available');
    } catch (error) {
        console.error('❌ Error initializing NFT Card Manager:', error);
    }
}

// ========================================
// USER DATA MANAGEMENT
// ========================================

// Load user game data from Firebase
async function loadUserGameData() {
    try {
        if (!currentUser) return;

        // Wait for Firebase service to be available
        let attempts = 0;
        const maxAttempts = 20;
        
        while (attempts < maxAttempts) {
            if (window.FirebaseService) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.FirebaseService) {
            console.error('FirebaseService not available');
            showNotification('Failed to load user data - service unavailable', 'error');
            return;
        }

        // Load token balance
        const tokenResult = await window.FirebaseService.getTokenBalance(currentUser.uid);
        if (tokenResult.success) {
            userStats.ppoBalance = tokenResult.data.ppoBalance || 0;
            userStats.totalEarned = tokenResult.data.totalEarned || 0;
        } else {
            console.error('Failed to load balance:', tokenResult.error);
            userStats.ppoBalance = 0;
            userStats.totalEarned = 0;
        }

        // Load user's NFT cards
        if (nftManager) {
            const cardsResult = await nftManager.getUserCards(currentUser.uid);
            if (cardsResult.success) {
                userStats.nftCardsCount = cardsResult.cards.length;
                console.log(`📊 Loaded ${userStats.nftCardsCount} NFT cards for user`);
            }
        }

        // Load user profile for additional stats
        try {
            const profileResult = await window.FirebaseService.getUserProfile(currentUser.uid);
            if (profileResult.success) {
                const profile = profileResult.data;
                userStats.totalGames = profile.gameStats?.totalGames || 0;
                userStats.bestScore = profile.gameStats?.bestScore || 0;
            } else {
                // Create user profile if it doesn't exist
                await createUserProfile();
            }
        } catch (error) {
            console.log('No user profile found, creating new one');
            await createUserProfile();
        }

        console.log('✅ User data loaded:', userStats);
        
    } catch (error) {
        console.error('Error loading user game data:', error);
        showNotification('Error loading user data', 'error');
    }
}

// Load game statistics
async function loadGameStatistics() {
    try {
        // Update player counts on game cards
        await updatePlayerCounts();
        
        // Update user's game stats
        await updateUserGameStats();
        
    } catch (error) {
        console.error('Error loading game statistics:', error);
    }
}

// Update player counts for each game
async function updatePlayerCounts() {
    try {
        // Get game statistics from Firebase
        if (window.FirebaseService) {
            const statsResult = await window.FirebaseService.getGameStatistics();
            if (statsResult.success) {
                const stats = statsResult.data;
                
                // Update classic players count
                const classicPlayersElement = document.getElementById('classicPlayers');
                if (classicPlayersElement) {
                    classicPlayersElement.textContent = stats.classicPlayers || 0;
                }
                
                // Update modern players count
                const modernPlayersElement = document.getElementById('modernPlayers');
                if (modernPlayersElement) {
                    modernPlayersElement.textContent = stats.modernPlayers || 0;
                }
            }
        }
    } catch (error) {
        console.error('Error updating player counts:', error);
    }
}

// Update user's game statistics
async function updateUserGameStats() {
    try {
        if (!currentUser) return;
        
        // Get user profile from Firebase
        if (window.FirebaseService) {
            const profileResult = await window.FirebaseService.getUserProfile(currentUser.uid);
            if (profileResult.success) {
                const profile = profileResult.data;
                userStats.totalGames = profile.gameStats?.totalGames || 0;
                userStats.bestScore = profile.gameStats?.bestScore || 0;
            }
        }
    } catch (error) {
        console.error('Error updating user game stats:', error);
    }
}

// Update game UI with real data
function updateGameUI() {
    // Update PPO balance
    const ppoBalanceElement = document.getElementById('ppoBalance');
    if (ppoBalanceElement) {
        ppoBalanceElement.textContent = userStats.ppoBalance.toLocaleString();
    }
    
    // Update total games
    const totalGamesElement = document.getElementById('totalGames');
    if (totalGamesElement) {
        totalGamesElement.textContent = userStats.totalGames;
    }
    
    // Update best score
    const bestScoreElement = document.getElementById('bestScore');
    if (bestScoreElement) {
        bestScoreElement.textContent = userStats.bestScore;
    }
    
    // Update NFT cards count
    const nftCardsCountElement = document.getElementById('nftCardsCount');
    if (nftCardsCountElement) {
        nftCardsCountElement.textContent = userStats.nftCardsCount;
    }
    
    // Update NFT cards display
    updateNFTCardsDisplay();
}

// Update NFT cards display
async function updateNFTCardsDisplay() {
    const cardsContainer = document.getElementById('nftCardsContainer');
    if (!cardsContainer) return;
    
    if (!currentUser) {
        cardsContainer.innerHTML = `
            <div class="col-12 text-center text-white-50">
                <i class="fas fa-user-lock fa-2x mb-3"></i>
                <p>Login to view your NFT cards</p>
            </div>
        `;
        return;
    }
    
    if (userStats.nftCardsCount === 0) {
        cardsContainer.innerHTML = `
            <div class="col-12 text-center text-white-50">
                <i class="fas fa-cards-blank fa-2x mb-3"></i>
                <h6>No NFT Cards</h6>
                <p class="small">Visit the marketplace to get some!</p>
                <a href="marketplace.html" class="btn btn-sm btn-outline-info">Get NFT Cards</a>
            </div>
        `;
        return;
    }
    
    try {
        // Load user's NFT cards
        if (nftManager) {
            const cardsResult = await nftManager.getUserCards(currentUser.uid);
            if (cardsResult.success) {
                const cards = cardsResult.cards.slice(0, 6); // Show first 6 cards
                
                const cardsHTML = cards.map(card => `
                    <div class="col-md-4 col-sm-6 mb-2">
                        <div class="nft-card-small" onclick="selectCardForGame('${card.id}')">
                            <img src="${card.metadata.image}" alt="${card.metadata.name}" 
                                 class="card-image-small" style="width: 100%; height: 80px; object-fit: cover; border-radius: 8px;">
                            <div class="card-info-small mt-2">
                                <div class="card-name-small text-white small">${card.metadata.name}</div>
                                <span class="rarity-${card.metadata.rarity.toLowerCase()} small">${card.metadata.rarity}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                cardsContainer.innerHTML = cardsHTML;
            }
        }
    } catch (error) {
        console.error('Error loading NFT cards:', error);
        cardsContainer.innerHTML = `
            <div class="col-12 text-center text-white-50">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <p>Error loading NFT cards</p>
            </div>
        `;
    }
}

// Select card for game
function selectCardForGame(cardId) {
    if (window.GameIntegration) {
        window.GameIntegration.selectCard(cardId);
    } else {
        console.log('Game Integration not available');
        showNotification('Card selection feature not available', 'warning');
    }
}

// Load public game statistics (for non-logged in users)
async function loadPublicGameStats() {
    try {
        // Load general game statistics
        await updatePlayerCounts();
        
        // Show public stats
        const userStatsContainer = document.getElementById('userStatsContainer');
        if (userStatsContainer) {
            userStatsContainer.innerHTML = `
                <div class="row text-center">
                    <div class="col-6">
                        <div class="stat-number text-info" id="totalPlayers">0</div>
                        <div class="stat-label text-white-50">Total Players</div>
                    </div>
                    <div class="col-6">
                        <div class="stat-number text-success" id="totalGamesPlayed">0</div>
                        <div class="stat-label text-white-50">Games Played</div>
                    </div>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading public game stats:', error);
    }
}

// Show login prompt for non-logged in users
function showLoginPrompt() {
    const nftCardsContainer = document.getElementById('nftCardsContainer');
    if (nftCardsContainer) {
        nftCardsContainer.innerHTML = `
            <div class="col-12 text-center text-white-50">
                <i class="fas fa-user-lock fa-2x mb-3"></i>
                <h6>Login Required</h6>
                <p class="small">Connect your wallet to view your NFT cards and earn PPO tokens!</p>
                <div class="mt-2">
                    <a href="signup.html" class="btn btn-sm btn-outline-info me-2">Sign Up</a>
                    <a href="metamask.html" class="btn btn-sm btn-info">Connect Wallet</a>
                </div>
            </div>
        `;
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Set up event listeners
function setupEventListeners() {
    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', handleGameCardHover);
        card.addEventListener('mouseleave', handleGameCardLeave);
    });

    // Refresh button (if added)
    const refreshBtn = document.getElementById('refreshStatsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshGameStats);
    }
    
    // NFT card selection
    const selectCardBtns = document.querySelectorAll('[onclick*="selectCard"]');
    selectCardBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cardId = btn.getAttribute('data-card-id');
            if (cardId) {
                selectCardForGame(cardId);
            }
        });
    });
}

// Handle game card hover
function handleGameCardHover(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(-5px)';
    card.style.transition = 'transform 0.3s ease';
}

// Handle game card leave
function handleGameCardLeave(event) {
    const card = event.currentTarget;
    card.style.transform = 'translateY(0)';
}

// Refresh game statistics
async function refreshGameStats() {
    try {
        showNotification('Refreshing game statistics...', 'info');
        await loadUserGameData();
        await loadGameStatistics();
        updateGameUI();
        showNotification('Game statistics updated!', 'success');
    } catch (error) {
        console.error('Error refreshing game stats:', error);
        showNotification('Error refreshing statistics', 'error');
    }
}

// ========================================
// USER PROFILE MANAGEMENT
// ========================================

// Create user profile if it doesn't exist
async function createUserProfile() {
    try {
        if (!currentUser) return;
        
        const userData = {
            uid: currentUser.uid,
            walletAddress: currentUser.walletAddress || currentUser.email,
            username: `Player_${currentUser.uid.slice(0, 8)}`,
            email: currentUser.email || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            gameStats: {
                totalGames: 0,
                totalScore: 0,
                bestScore: 0,
                totalPPOEarned: 0,
                cardsUsed: 0
            }
        };
        
        const result = await window.FirebaseService.createOrUpdateUser(userData);
        if (result.success) {
            console.log('Created new user profile:', userData);
            // Update local stats
            userStats.totalGames = userData.gameStats.totalGames;
            userStats.bestScore = userData.gameStats.bestScore;
        }
    } catch (error) {
        console.error('Error creating user profile:', error);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get current user from Firebase Auth or wallet connection
function getCurrentUser() {
    try {
        // Check if user is connected via wallet
        const connectedWallet = localStorage.getItem('connectedWallet');
        const userUid = localStorage.getItem('userUid');
        
        if (connectedWallet && userUid) {
            return {
                uid: userUid,
                walletAddress: connectedWallet,
                isWalletUser: true
            };
        }
        
        // Check Firebase Auth as fallback
        if (window.firebase && window.firebase.auth) {
            const firebaseUser = window.firebase.auth().currentUser;
            if (firebaseUser) {
                return {
                    ...firebaseUser,
                    isWalletUser: false
                };
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ========================================
// FIREBASE INITIALIZATION
// ========================================

// Initialize Firebase when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if Firebase is already initialized
    if (window.firebase) {
        initGamePage();
    } else {
        // Wait for Firebase to be loaded
        const checkFirebase = setInterval(() => {
            if (window.firebase) {
                clearInterval(checkFirebase);
                initGamePage();
            }
        }, 100);
    }
});

// ========================================
// EXPORT FUNCTIONS
// ========================================

// Export functions for use in other scripts
window.GameCenter = {
    initGamePage,
    loadUserGameData,
    refreshGameStats,
    getCurrentUser,
    updateGameUI,
    selectCardForGame
};
