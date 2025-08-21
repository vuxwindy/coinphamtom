// Game Integration System - Tích hợp hoàn chỉnh với NFT Card System
// Kết nối game với dữ liệu thực tế từ Firebase và NFT Card Manager

console.log('🎮 Game Integration System loaded');

const GameIntegration = {
    // Game state
    gameState: {
        isPlaying: false,
        currentScore: 0,
        currentShots: 0,
        currentHits: 0,
        startTime: null,
        endTime: null,
        selectedCard: null,
        cardBonus: 0
    },
    
    // User data
    userData: {
        uid: null,
        walletAddress: null,
        ppoBalance: 0,
        nftCards: [],
        gameStats: {
            totalGames: 0,
            totalScore: 0,
            bestScore: 0,
            totalPPOEarned: 0,
            cardsUsed: 0
        }
    },
    
    // NFT Card Manager instance
    nftManager: null,
    
    // Initialize game integration
    async init() {
        console.log('🔄 Initializing Game Integration...');
        
        try {
            // Initialize NFT Card Manager
            await this.initNFTManager();
            
            // Load user data
            await this.loadUserData();
        
        // Setup game event listeners
        this.setupGameEventListeners();
        
        // Setup keyboard shortcuts for testing
        this.setupKeyboardShortcuts();
            
            // Update UI with real data
            this.updateGameUI();
        
        console.log('✅ Game Integration initialized');
        } catch (error) {
            console.error('❌ Error initializing Game Integration:', error);
        }
    },
    
    // Initialize NFT Card Manager
    async initNFTManager() {
        try {
            // Wait for NFT Card Manager to be available
            let attempts = 0;
            const maxAttempts = 50;
            
            while (attempts < maxAttempts) {
                if (window.NFTCardManager) {
                    this.nftManager = new window.NFTCardManager();
                    console.log('✅ NFT Card Manager initialized');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            throw new Error('NFT Card Manager not available');
        } catch (error) {
            console.error('❌ Error initializing NFT Card Manager:', error);
            throw error;
        }
    },
    
    // Load user data from Firebase
    async loadUserData() {
        try {
            // Get current user
            const user = this.getCurrentUser();
            if (!user) {
                console.log('⚠️ No user logged in');
                return;
            }
            
            this.userData.uid = user.uid;
            this.userData.walletAddress = user.walletAddress || user.email;
            
            // Load PPO balance
            if (window.FirebaseService) {
                const balanceResult = await window.FirebaseService.getTokenBalance(user.uid);
                if (balanceResult.success) {
                    this.userData.ppoBalance = balanceResult.data.ppoBalance || 0;
                    this.userData.gameStats.totalPPOEarned = balanceResult.data.totalEarned || 0;
                }
            }
            
            // Load user's NFT cards
            if (this.nftManager) {
                const cardsResult = await this.nftManager.getUserCards(user.uid);
                if (cardsResult.success) {
                    this.userData.nftCards = cardsResult.cards;
                    console.log(`📊 Loaded ${this.userData.nftCards.length} NFT cards for user`);
                }
            }
            
            // Load game statistics
            await this.loadGameStatistics();
            
            console.log('✅ User data loaded:', this.userData);
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    },
    
    // Load game statistics
    async loadGameStatistics() {
        try {
            // Update player counts on game cards
            await this.updatePlayerCounts();
            
            // Update user's game stats
            await this.updateUserGameStats();
            
        } catch (error) {
            console.error('❌ Error loading game statistics:', error);
        }
    },
    
    // Update player counts for each game
    async updatePlayerCounts() {
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
            console.error('❌ Error updating player counts:', error);
        }
    },
    
    // Update user's game statistics
    async updateUserGameStats() {
        try {
            if (!this.userData.uid) return;
            
            // Get user profile from Firebase
            if (window.FirebaseService) {
                const profileResult = await window.FirebaseService.getUserProfile(this.userData.uid);
                if (profileResult.success) {
                    const profile = profileResult.data;
                    this.userData.gameStats = {
                        totalGames: profile.gameStats?.totalGames || 0,
                        totalScore: profile.gameStats?.totalScore || 0,
                        bestScore: profile.gameStats?.bestScore || 0,
                        totalPPOEarned: this.userData.gameStats.totalPPOEarned,
                        cardsUsed: profile.gameStats?.cardsUsed || 0
                    };
                }
            }
        } catch (error) {
            console.error('❌ Error updating user game stats:', error);
        }
    },
    
    // Setup game event listeners
    setupGameEventListeners() {
        // Listen for game start
        window.addEventListener('gameStart', (event) => {
            this.handleGameStart(event.detail);
        });
        
        // Listen for game end
        window.addEventListener('gameEnd', (event) => {
            this.handleGameEnd(event.detail);
        });
        
        // Listen for arrow shot
        window.addEventListener('arrowShot', (event) => {
            this.handleArrowShot(event.detail);
        });
        
        // Listen for target hit
        window.addEventListener('targetHit', (event) => {
            this.handleTargetHit(event.detail);
        });
        
        // Listen for score update
        window.addEventListener('scoreUpdate', (event) => {
            this.handleScoreUpdate(event.detail);
        });
        
        // Listen for card selection
        window.addEventListener('cardSelected', (event) => {
            this.handleCardSelection(event.detail);
        });
    },
    
    // Setup keyboard shortcuts for testing
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl + Shift + G: Start game
            if (event.ctrlKey && event.shiftKey && event.key === 'G') {
                this.startGame();
            }
            
            // Ctrl + Shift + E: End game
            if (event.ctrlKey && event.shiftKey && event.key === 'E') {
                this.endGame();
            }
            
            // Ctrl + Shift + S: Simulate shot
            if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                this.simulateShot();
            }
            
            // Ctrl + Shift + H: Simulate hit
            if (event.ctrlKey && event.shiftKey && event.key === 'H') {
                this.simulateHit();
            }
            
            // Ctrl + Shift + P: Add PPO
            if (event.ctrlKey && event.shiftKey && event.key === 'P') {
                this.addPPO();
            }
            
            // Ctrl + Shift + C: Show card selection
            if (event.ctrlKey && event.shiftKey && event.key === 'C') {
                this.showCardSelection();
            }
        });
    },
    
    // Handle game start
    handleGameStart(gameData) {
        console.log('🎮 Game started:', gameData);
        
        this.gameState.isPlaying = true;
        this.gameState.currentScore = 0;
        this.gameState.currentShots = 0;
        this.gameState.currentHits = 0;
        this.gameState.startTime = new Date();
        this.gameState.endTime = null;
        
        // Apply card bonus if card is selected
        if (this.gameState.selectedCard) {
            this.applyCardBonus();
        }
        
        // Trigger game start event for stats
        this.createGameEvent('gameStarted', {
            gameType: 'arrow',
            cardUsed: this.gameState.selectedCard?.id || null,
            timestamp: new Date().toISOString()
        });
    },
    
    // Handle game end
    handleGameEnd(gameData) {
        console.log('🎮 Game ended:', gameData);
        
        this.gameState.isPlaying = false;
        this.gameState.endTime = new Date();
        
        // Calculate final score with card bonus
        const finalScore = this.gameState.currentScore + this.gameState.cardBonus;
        
        // Save game results
        this.saveGameResults(finalScore);
        
        // Award PPO tokens
        this.awardPPOTokens(finalScore);
        
        // Update statistics
        this.updateGameStatistics(finalScore);
        
        // Reset card selection
        this.gameState.selectedCard = null;
        this.gameState.cardBonus = 0;
        
        // Trigger game end event
        this.createGameEvent('gameEnded', {
            gameType: 'arrow',
            finalScore: finalScore,
            shots: this.gameState.currentShots,
            hits: this.gameState.currentHits,
            cardUsed: this.gameState.selectedCard?.id || null,
            timestamp: new Date().toISOString()
        });
    },
    
    // Handle arrow shot
    handleArrowShot(shotData) {
        this.gameState.currentShots++;
        console.log('🎯 Arrow shot:', shotData);
        
        this.createGameEvent('arrowShot', {
            position: shotData.position,
            timestamp: new Date().toISOString()
        });
    },
    
    // Handle target hit
    handleTargetHit(hitData) {
        this.gameState.currentHits++;
        this.gameState.currentScore += hitData.points;
        
        console.log('🎯 Target hit:', hitData);
        
        this.createGameEvent('targetHit', {
            targetType: hitData.targetType,
            points: hitData.points,
            timestamp: new Date().toISOString()
        });
    },
    
    // Handle score update
    handleScoreUpdate(scoreData) {
        this.gameState.currentScore = scoreData.score;
        console.log('📊 Score updated:', scoreData.score);
    },
    
    // Handle card selection
    handleCardSelection(cardData) {
        this.gameState.selectedCard = cardData.card;
        console.log('🃏 Card selected:', cardData.card);
        
        // Apply card effects
        this.applyCardEffects(cardData.card);
    },
    
    // Apply card bonus
    applyCardBonus() {
        if (this.gameState.selectedCard) {
            const card = this.gameState.selectedCard;
            
            // Calculate bonus based on card rarity and attributes
            let bonus = 0;
            
            switch (card.metadata.rarity) {
                case 'Common':
                    bonus = 5;
                    break;
                case 'Rare':
                    bonus = 15;
                    break;
                case 'Epic':
                    bonus = 30;
                    break;
                case 'Legendary':
                    bonus = 50;
                    break;
            }
            
            // Add attribute bonuses
            if (card.metadata.attributes) {
                if (card.metadata.attributes.attack) {
                    bonus += card.metadata.attributes.attack * 0.1;
                }
                if (card.metadata.attributes.accuracy) {
                    bonus += card.metadata.attributes.accuracy * 0.2;
                }
            }
            
            this.gameState.cardBonus = Math.floor(bonus);
            console.log(`🎯 Applied card bonus: +${this.gameState.cardBonus} points`);
        }
    },
    
    // Apply card effects
    applyCardEffects(card) {
        // Apply visual effects based on card rarity
        const rarityClass = `rarity-${card.metadata.rarity.toLowerCase()}`;
        
        // Add visual indicator to game UI
        this.showCardEffect(card, rarityClass);
    },
    
    // Show card effect
    showCardEffect(card, rarityClass) {
        // Create card effect overlay
        const effectOverlay = document.createElement('div');
        effectOverlay.className = `card-effect-overlay ${rarityClass}`;
        effectOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        effectOverlay.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🃏</div>
                <div style="font-size: 1.5rem; font-weight: bold; color: white;">${card.metadata.name}</div>
                <div style="font-size: 1rem; color: rgba(255,255,255,0.8);">${card.metadata.rarity}</div>
            </div>
        `;
        
        document.body.appendChild(effectOverlay);
        
        // Animate in
        setTimeout(() => {
            effectOverlay.style.opacity = '0.3';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            effectOverlay.style.opacity = '0';
            setTimeout(() => {
                if (effectOverlay.parentNode) {
                    effectOverlay.remove();
                }
            }, 500);
        }, 2000);
    },
    
    // Save game results to Firebase
    async saveGameResults(finalScore) {
        try {
            if (!this.userData.uid) return;
            
            const gameResult = {
                userId: this.userData.uid,
                gameType: 'arrow',
                score: finalScore,
                shots: this.gameState.currentShots,
                hits: this.gameState.currentHits,
                accuracy: this.gameState.currentShots > 0 ? (this.gameState.currentHits / this.gameState.currentShots * 100).toFixed(2) : 0,
                cardUsed: this.gameState.selectedCard?.id || null,
                cardBonus: this.gameState.cardBonus,
                playTime: this.gameState.startTime && this.gameState.endTime ? 
                    Math.round((this.gameState.endTime - this.gameState.startTime) / 1000) : 0,
                timestamp: new Date()
            };
            
            if (window.FirebaseService) {
                const result = await window.FirebaseService.saveGameResult(gameResult);
                if (result.success) {
                    console.log('✅ Game results saved');
                }
            }
        } catch (error) {
            console.error('❌ Error saving game results:', error);
        }
    },
    
    // Award PPO tokens
    async awardPPOTokens(finalScore) {
        try {
            if (!this.userData.uid) return;
            
            // Calculate PPO reward (1 PPO per point)
            const ppoReward = finalScore;
            
            if (window.FirebaseService) {
                const result = await window.FirebaseService.addTokenBalance(this.userData.uid, ppoReward, 'game_reward');
                if (result.success) {
                    this.userData.ppoBalance += ppoReward;
                    this.userData.gameStats.totalPPOEarned += ppoReward;
                    
                    console.log(`💰 Awarded ${ppoReward} PPO tokens`);
                    
                    // Show reward notification
                    this.showRewardNotification(ppoReward);
                }
            }
        } catch (error) {
            console.error('❌ Error awarding PPO tokens:', error);
        }
    },
    
    // Update game statistics
    async updateGameStatistics(finalScore) {
        try {
            if (!this.userData.uid) return;
            
            // Update user's game stats
            this.userData.gameStats.totalGames++;
            this.userData.gameStats.totalScore += finalScore;
            
            if (finalScore > this.userData.gameStats.bestScore) {
                this.userData.gameStats.bestScore = finalScore;
            }
            
            if (this.gameState.selectedCard) {
                this.userData.gameStats.cardsUsed++;
            }
            
            // Save updated stats to Firebase
            if (window.FirebaseService) {
                const updateData = {
                    gameStats: this.userData.gameStats
                };
                
                const result = await window.FirebaseService.updateUserProfile(this.userData.uid, updateData);
                if (result.success) {
                    console.log('✅ Game statistics updated');
                }
            }
        } catch (error) {
            console.error('❌ Error updating game statistics:', error);
        }
    },
    
    // Show reward notification
    showRewardNotification(ppoAmount) {
        const notification = document.createElement('div');
        notification.className = 'reward-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: rewardPop 0.5s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
            <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Congratulations!</div>
            <div style="font-size: 1.2rem;">You earned ${ppoAmount} PPO tokens!</div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },
    
    // Update game UI with real data
    updateGameUI() {
        // Update PPO balance display
        this.updatePPOBalanceDisplay();
        
        // Update game statistics display
        this.updateGameStatsDisplay();
        
        // Update NFT cards display
        this.updateNFTCardsDisplay();
    },
    
    // Update PPO balance display
    updatePPOBalanceDisplay() {
        const balanceElements = document.querySelectorAll('.ppo-balance');
        balanceElements.forEach(element => {
            element.textContent = this.userData.ppoBalance.toLocaleString();
        });
    },
    
    // Update game statistics display
    updateGameStatsDisplay() {
        const statsElements = document.querySelectorAll('.game-stats');
        statsElements.forEach(element => {
            element.innerHTML = `
                <div class="row text-center">
                    <div class="col-3">
                        <div class="stat-number">${this.userData.gameStats.totalGames}</div>
                        <div class="stat-label">Games Played</div>
                    </div>
                    <div class="col-3">
                        <div class="stat-number">${this.userData.gameStats.bestScore}</div>
                        <div class="stat-label">Best Score</div>
                    </div>
                    <div class="col-3">
                        <div class="stat-number">${this.userData.gameStats.totalPPOEarned}</div>
                        <div class="stat-label">PPO Earned</div>
                    </div>
                    <div class="col-3">
                        <div class="stat-number">${this.userData.nftCards.length}</div>
                        <div class="stat-label">NFT Cards</div>
                    </div>
                </div>
            `;
        });
    },
    
    // Update NFT cards display
    updateNFTCardsDisplay() {
        const cardsContainer = document.getElementById('nftCardsContainer');
        if (!cardsContainer) return;
        
        if (this.userData.nftCards.length === 0) {
            cardsContainer.innerHTML = `
                <div class="text-center text-white-50">
                    <i class="fas fa-cards-blank fa-3x mb-3"></i>
                    <h5>No NFT Cards</h5>
                    <p>You don't have any NFT cards yet. Visit the marketplace to get some!</p>
                    <a href="marketplace.html" class="btn btn-outline-info">Get NFT Cards</a>
                </div>
            `;
            return;
        }
        
        const cardsHTML = this.userData.nftCards.slice(0, 6).map(card => `
            <div class="col-md-4 col-sm-6 mb-3">
                <div class="nft-card" onclick="GameIntegration.selectCard('${card.id}')">
                    <img src="${card.metadata.image}" alt="${card.metadata.name}" class="card-image">
                    <div class="card-body">
                        <h6 class="card-title">${card.metadata.name}</h6>
                        <span class="rarity-${card.metadata.rarity.toLowerCase()}">${card.metadata.rarity}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        cardsContainer.innerHTML = cardsHTML;
    },
    
    // Select card for game
    selectCard(cardId) {
        const card = this.userData.nftCards.find(c => c.id === cardId);
        if (card) {
            this.gameState.selectedCard = card;
            this.applyCardEffects(card);
            
            // Show selection notification
            this.showCardSelectionNotification(card);
        }
    },
    
    // Show card selection notification
    showCardSelectionNotification(card) {
        const notification = document.createElement('div');
        notification.className = 'card-selection-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${card.metadata.image}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 1rem;">
                <div>
                    <div style="font-weight: bold;">${card.metadata.name}</div>
                    <div style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">${card.metadata.rarity}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },
    
    // Show card selection modal
    showCardSelection() {
        if (this.userData.nftCards.length === 0) {
            this.showNotification('You don\'t have any NFT cards yet!', 'warning');
            return;
        }
        
        // Create modal for card selection
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'cardSelectionModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-white">Select NFT Card for Game</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="cardSelectionGrid">
                            ${this.userData.nftCards.map(card => `
                                <div class="col-md-4 col-sm-6 mb-3">
                                    <div class="nft-card" onclick="GameIntegration.selectCardForGame('${card.id}')">
                                        <img src="${card.metadata.image}" alt="${card.metadata.name}" class="card-image">
                                        <div class="card-body">
                                            <h6 class="card-title">${card.metadata.name}</h6>
                                            <span class="rarity-${card.metadata.rarity.toLowerCase()}">${card.metadata.rarity}</span>
                                            <div class="card-stats mt-2">
                                                <small>Attack: ${card.metadata.attributes?.attack || 0}</small><br>
                                                <small>Accuracy: ${card.metadata.attributes?.accuracy || 0}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        // Remove modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    },
    
    // Select card for game from modal
    selectCardForGame(cardId) {
        const card = this.userData.nftCards.find(c => c.id === cardId);
        if (card) {
            this.gameState.selectedCard = card;
            this.applyCardEffects(card);
            
            // Close modal
            const modal = document.getElementById('cardSelectionModal');
            if (modal) {
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
            }
            
            // Show selection notification
            this.showCardSelectionNotification(card);
        }
    },
    
    // Get current user
    getCurrentUser() {
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
                try {
                    const firebaseUser = window.firebase.auth.currentUser;
                    if (firebaseUser) {
                        return {
                            ...firebaseUser,
                            isWalletUser: false
                        };
                    }
                } catch (error) {
                    console.warn('⚠️ Firebase auth not available:', error);
                }
            }
            
            return null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },
    
    // Create game event
    createGameEvent(eventType, eventData) {
        const event = new CustomEvent(eventType, {
            detail: eventData
        });
        window.dispatchEvent(event);
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    },
    
    // Manual game control functions
    startGame() {
        if (!this.gameState.isPlaying) {
            this.handleGameStart({ gameType: 'arrow' });
            console.log('🎮 Game started manually');
        } else {
            console.log('⚠️ Game already in progress');
        }
    },
    
    endGame() {
        if (this.gameState.isPlaying) {
            this.handleGameEnd({ gameType: 'arrow' });
            console.log('🎮 Game ended manually');
        } else {
            console.log('⚠️ No game in progress');
        }
    },
    
    simulateShot() {
        if (this.gameState.isPlaying) {
            this.handleArrowShot({
                position: { x: Math.random() * 100, y: Math.random() * 100 }
            });
            console.log('🎯 Shot simulated');
        } else {
            console.log('⚠️ Start a game first');
        }
    },
    
    simulateHit() {
        if (this.gameState.isPlaying) {
            this.handleTargetHit({
                targetType: 'standard',
                points: Math.floor(Math.random() * 50) + 10
            });
            console.log('🎯 Hit simulated');
        } else {
            console.log('⚠️ Start a game first');
        }
    },
    
    addPPO() {
        const amount = Math.floor(Math.random() * 100) + 1;
        this.awardPPOTokens(amount);
        console.log(`💰 Added ${amount} PPO manually`);
    },
    
    // Get current game state
    getGameState() {
        return { ...this.gameState };
    },
    
    // Show current game state
    showGameState() {
        console.log('🎮 Current Game State:');
        console.log('- Is Playing:', this.gameState.isPlaying);
        console.log('- Current Score:', this.gameState.currentScore);
        console.log('- Current Shots:', this.gameState.currentShots);
        console.log('- Current Hits:', this.gameState.currentHits);
        console.log('- Card Bonus:', this.gameState.cardBonus);
        console.log('- Selected Card:', this.gameState.selectedCard?.metadata.name || 'None');
        console.log('- Start Time:', this.gameState.startTime);
        console.log('- End Time:', this.gameState.endTime);
        
        if (this.gameState.isPlaying && this.gameState.startTime) {
            const playTime = new Date() - this.gameState.startTime;
            console.log('- Current Play Time:', Math.round(playTime / 1000) + 's');
        }
    }
};

// Export to global scope
window.GameIntegration = GameIntegration;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Game Integration...');
    GameIntegration.init();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rewardPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    .card-effect-overlay.rarity-common {
        background: linear-gradient(135deg, rgba(108, 117, 125, 0.3), rgba(73, 80, 87, 0.3));
    }
    
    .card-effect-overlay.rarity-rare {
        background: linear-gradient(135deg, rgba(0, 123, 255, 0.3), rgba(0, 86, 179, 0.3));
    }
    
    .card-effect-overlay.rarity-epic {
        background: linear-gradient(135deg, rgba(111, 66, 193, 0.3), rgba(90, 45, 145, 0.3));
    }
    
    .card-effect-overlay.rarity-legendary {
        background: linear-gradient(135deg, rgba(253, 126, 20, 0.3), rgba(229, 90, 0, 0.3));
        animation: legendaryGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes legendaryGlow {
        from { box-shadow: 0 0 20px rgba(253, 126, 20, 0.5); }
        to { box-shadow: 0 0 40px rgba(253, 126, 20, 0.8); }
    }
`;
document.head.appendChild(style);

console.log('✅ Game Integration System ready');

// Keyboard shortcuts info
console.log('⌨️ Keyboard Shortcuts:');
console.log('- Ctrl + Shift + G: Start game');
console.log('- Ctrl + Shift + E: End game');
console.log('- Ctrl + Shift + S: Simulate shot');
console.log('- Ctrl + Shift + H: Simulate hit');
console.log('- Ctrl + Shift + P: Add PPO');
console.log('- Ctrl + Shift + C: Show card selection');
