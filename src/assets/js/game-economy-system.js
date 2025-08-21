// Game Economy System - Hệ thống kinh tế game
// Quản lý PPO, NFT, và tương tác giữa game và blockchain

console.log('💰 Game Economy System loaded');

class GameEconomySystem {
    constructor() {
        this.currentUser = null;
        this.ppoBalance = 0;
        this.gameStats = {
            totalGames: 0,
            totalScore: 0,
            bestScore: 0,
            totalPPOEarned: 0,
            totalPPOSpent: 0,
            arrowsBought: 0,
            nftsOwned: 0
        };
        this.nftManager = null;
        this.bowCustomization = null;
        this.chestSystem = null;
        
        // PPO Token Configuration
        this.ppoConfig = {
            address: '0x83e3d4dA4d0e52Df27a166100b09Fa81A23F5b80',
            decimals: 18,
            symbol: 'PPO',
            name: 'PPO Token'
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Game Economy System...');
            
            // Initialize components
            await this.initComponents();
            
            // Load user data
            await this.loadUserData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('✅ Game Economy System initialized');
        } catch (error) {
            console.error('❌ Error initializing Game Economy System:', error);
        }
    }
    
    async initComponents() {
        // Initialize NFT Manager
        if (window.NFTCardManager) {
            this.nftManager = new window.NFTCardManager();
        }
        
        // Initialize Bow Customization
        if (window.BowCustomization) {
            this.bowCustomization = new window.BowCustomization();
        }
        
        // Initialize Chest System
        this.chestSystem = new ChestSystem(this);
    }
    
    async loadUserData() {
        try {
            // Get current user
            this.currentUser = this.getCurrentUser();
            if (!this.currentUser) {
                console.log('⚠️ No user logged in');
                return;
            }
            
            // Load PPO balance
            await this.loadPPOBalance();
            
            // Load game stats
            await this.loadGameStats();
            
            // Load user NFTs
            await this.loadUserNFTs();
            
            console.log(`👤 User data loaded for: ${this.currentUser.uid}`);
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    }
    
    getCurrentUser() {
        try {
            // Check for connected wallet
            const connectedWallet = localStorage.getItem('connectedWallet');
            const userUid = localStorage.getItem('userUid');
            
            if (connectedWallet && userUid) {
                return {
                    uid: userUid,
                    walletAddress: connectedWallet,
                    isWalletUser: true
                };
            }
            
            // Check for Firebase user
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
    
    async loadPPOBalance() {
        try {
            if (!this.currentUser) return;
            
            // Try to get from Firebase first
            if (window.FirebaseService) {
                const result = await window.FirebaseService.getTokenBalance(this.currentUser.uid);
                if (result.success) {
                    this.ppoBalance = result.data.ppoBalance || 0;
                }
            }
            
            // Fallback to localStorage
            if (this.ppoBalance === 0) {
                const storedBalance = localStorage.getItem(`ppoBalance_${this.currentUser.uid}`);
                this.ppoBalance = storedBalance ? parseFloat(storedBalance) : 0;
            }
            
            this.updatePPODisplay();
            console.log(`💰 PPO Balance loaded: ${this.ppoBalance}`);
        } catch (error) {
            console.error('❌ Error loading PPO balance:', error);
        }
    }
    
    async loadGameStats() {
        try {
            if (!this.currentUser) return;
            
            // Try to get from Firebase
            if (window.FirebaseService) {
                const result = await window.FirebaseService.getUserProfile(this.currentUser.uid);
                if (result.success && result.data.gameStats) {
                    this.gameStats = { ...this.gameStats, ...result.data.gameStats };
                }
            }
            
            // Fallback to localStorage
            const storedStats = localStorage.getItem(`gameStats_${this.currentUser.uid}`);
            if (storedStats) {
                const parsedStats = JSON.parse(storedStats);
                this.gameStats = { ...this.gameStats, ...parsedStats };
            }
            
            this.updateGameStatsDisplay();
            console.log('📊 Game stats loaded:', this.gameStats);
        } catch (error) {
            console.error('❌ Error loading game stats:', error);
        }
    }
    
    async loadUserNFTs() {
        try {
            if (!this.currentUser || !this.nftManager) return;
            
            const result = await this.nftManager.getUserCards(this.currentUser.uid);
            if (result.success) {
                this.gameStats.nftsOwned = result.cards.length;
                this.updateGameStatsDisplay();
                console.log(`🏹 Loaded ${result.cards.length} user NFTs`);
            }
        } catch (error) {
            console.error('❌ Error loading user NFTs:', error);
        }
    }
    
    // PPO Management
    async addPPO(amount, source = 'game') {
        try {
            if (!this.currentUser || amount <= 0) return false;
            
            const oldBalance = this.ppoBalance;
            this.ppoBalance += amount;
            
            // Update Firebase
            if (window.FirebaseService) {
                await window.FirebaseService.updateTokenBalance(this.currentUser.uid, this.ppoBalance);
            }
            
            // Update localStorage
            localStorage.setItem(`ppoBalance_${this.currentUser.uid}`, this.ppoBalance.toString());
            
            // Update game stats
            this.gameStats.totalPPOEarned += amount;
            await this.saveGameStats();
            
            // Update display
            this.updatePPODisplay();
            
            // Log transaction
            this.logPPOTransaction(amount, 'earn', source);
            
            console.log(`💰 Added ${amount} PPO (${source}). New balance: ${this.ppoBalance}`);
            return true;
        } catch (error) {
            console.error('❌ Error adding PPO:', error);
            return false;
        }
    }
    
    async spendPPO(amount, purpose = 'purchase') {
        try {
            if (!this.currentUser || amount <= 0) return false;
            
            if (this.ppoBalance < amount) {
                console.log('❌ Insufficient PPO balance');
                return false;
            }
            
            const oldBalance = this.ppoBalance;
            this.ppoBalance -= amount;
            
            // Update Firebase
            if (window.FirebaseService) {
                await window.FirebaseService.updateTokenBalance(this.currentUser.uid, this.ppoBalance);
            }
            
            // Update localStorage
            localStorage.setItem(`ppoBalance_${this.currentUser.uid}`, this.ppoBalance.toString());
            
            // Update game stats
            this.gameStats.totalPPOSpent += amount;
            await this.saveGameStats();
            
            // Update display
            this.updatePPODisplay();
            
            // Log transaction
            this.logPPOTransaction(amount, 'spend', purpose);
            
            console.log(`💸 Spent ${amount} PPO (${purpose}). New balance: ${this.ppoBalance}`);
            return true;
        } catch (error) {
            console.error('❌ Error spending PPO:', error);
            return false;
        }
    }
    
    async buyArrows(quantity = 5, pricePerArrow = 10) {
        try {
            const totalCost = quantity * pricePerArrow;
            
            if (await this.spendPPO(totalCost, 'buy_arrows')) {
                this.gameStats.arrowsBought += quantity;
                await this.saveGameStats();
                
                // Trigger arrow purchase event
                this.createGameEvent('arrowsPurchased', {
                    quantity: quantity,
                    totalCost: totalCost,
                    newBalance: this.ppoBalance
                });
                
                console.log(`🏹 Bought ${quantity} arrows for ${totalCost} PPO`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Error buying arrows:', error);
            return false;
        }
    }
    
    // Game Stats Management
    async updateGameStats(stats) {
        try {
            this.gameStats = { ...this.gameStats, ...stats };
            await this.saveGameStats();
            this.updateGameStatsDisplay();
        } catch (error) {
            console.error('❌ Error updating game stats:', error);
        }
    }
    
    async saveGameStats() {
        try {
            if (!this.currentUser) return;
            
            // Save to Firebase
            if (window.FirebaseService) {
                await window.FirebaseService.updateUserProfile(this.currentUser.uid, {
                    gameStats: this.gameStats
                });
            }
            
            // Save to localStorage
            localStorage.setItem(`gameStats_${this.currentUser.uid}`, JSON.stringify(this.gameStats));
        } catch (error) {
            console.error('❌ Error saving game stats:', error);
        }
    }
    
    // NFT Management
    async addNFT(nftData) {
        try {
            if (!this.currentUser || !this.nftManager) return false;
            
            // Add NFT to user collection
            const result = await this.nftManager.mintCard(nftData.cardId, this.currentUser.uid, 1);
            if (result.success) {
                this.gameStats.nftsOwned += 1;
                await this.saveGameStats();
                
                // Update bow customization if it's a bow
                if (nftData.metadata.category === 'bow' && this.bowCustomization) {
                    const bow = this.bowCustomization.createBowFromNFT(nftData);
                    this.bowCustomization.addUserBow(bow);
                }
                
                console.log(`🏹 Added NFT: ${nftData.metadata.name}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Error adding NFT:', error);
            return false;
        }
    }
    
    // Display Updates
    updatePPODisplay() {
        const ppoElements = document.querySelectorAll('.ppo-balance, .ppo-amount, [data-ppo-balance]');
        ppoElements.forEach(element => {
            element.textContent = this.ppoBalance.toLocaleString();
        });
    }
    
    updateGameStatsDisplay() {
        // Update total games
        const totalGamesElements = document.querySelectorAll('[data-total-games]');
        totalGamesElements.forEach(element => {
            element.textContent = this.gameStats.totalGames.toLocaleString();
        });
        
        // Update best score
        const bestScoreElements = document.querySelectorAll('[data-best-score]');
        bestScoreElements.forEach(element => {
            element.textContent = this.gameStats.bestScore.toLocaleString();
        });
        
        // Update total PPO earned
        const totalPPOEarnedElements = document.querySelectorAll('[data-total-ppo-earned]');
        totalPPOEarnedElements.forEach(element => {
            element.textContent = this.gameStats.totalPPOEarned.toLocaleString();
        });
        
        // Update NFTs owned
        const nftsOwnedElements = document.querySelectorAll('[data-nfts-owned]');
        nftsOwnedElements.forEach(element => {
            element.textContent = this.gameStats.nftsOwned.toLocaleString();
        });
    }
    
    // Event System
    setupEventListeners() {
        // Listen for game events
        window.addEventListener('gameStarted', (event) => {
            this.handleGameStarted(event.detail);
        });
        
        window.addEventListener('gameEnded', (event) => {
            this.handleGameEnded(event.detail);
        });
        
        window.addEventListener('arrowShot', (event) => {
            this.handleArrowShot(event.detail);
        });
        
        window.addEventListener('targetHit', (event) => {
            this.handleTargetHit(event.detail);
        });
        
        window.addEventListener('chestOpened', (event) => {
            this.handleChestOpened(event.detail);
        });
    }
    
    handleGameStarted(gameData) {
        console.log('🎮 Game started:', gameData);
    }
    
    async handleGameEnded(gameData) {
        try {
            const { score, arrowsUsed, hits } = gameData;
            
            // Update game stats
            const newStats = {
                totalGames: this.gameStats.totalGames + 1,
                totalScore: this.gameStats.totalScore + score,
                bestScore: Math.max(this.gameStats.bestScore, score)
            };
            
            await this.updateGameStats(newStats);
            
            // Calculate PPO reward based on performance
            const ppoReward = this.calculatePPOReward(score, hits, arrowsUsed);
            if (ppoReward > 0) {
                await this.addPPO(ppoReward, 'game_completion');
            }
            
            console.log(`🎮 Game ended. Score: ${score}, PPO earned: ${ppoReward}`);
        } catch (error) {
            console.error('❌ Error handling game end:', error);
        }
    }
    
    handleArrowShot(shotData) {
        // Trigger chest system
        if (this.chestSystem) {
            this.chestSystem.handleShot();
        }
    }
    
    handleTargetHit(hitData) {
        // Add small PPO reward for each hit
        const hitReward = 1; // 1 PPO per hit
        this.addPPO(hitReward, 'target_hit');
    }
    
    async handleChestOpened(chestData) {
        try {
            const { reward } = chestData;
            
            if (reward.type === 'ppo') {
                await this.addPPO(reward.amount, 'treasure_chest');
            } else if (reward.type === 'nft_bow') {
                await this.addNFT(reward.bow);
            }
        } catch (error) {
            console.error('❌ Error handling chest opened:', error);
        }
    }
    
    // PPO Reward Calculation
    calculatePPOReward(score, hits, arrowsUsed) {
        let baseReward = 0;
        
        // Base reward for completing game
        baseReward += 5;
        
        // Bonus for high score
        if (score >= 1000) baseReward += 10;
        if (score >= 2000) baseReward += 20;
        if (score >= 5000) baseReward += 50;
        
        // Bonus for accuracy
        const accuracy = arrowsUsed > 0 ? (hits / arrowsUsed) * 100 : 0;
        if (accuracy >= 80) baseReward += 15;
        if (accuracy >= 90) baseReward += 25;
        
        // Bonus for efficiency
        if (hits >= 10) baseReward += 10;
        if (hits >= 20) baseReward += 20;
        
        return Math.floor(baseReward);
    }
    
    // Transaction Logging
    logPPOTransaction(amount, type, source) {
        const transaction = {
            id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: this.currentUser?.uid,
            amount: amount,
            type: type, // 'earn' or 'spend'
            source: source,
            timestamp: new Date(),
            balanceAfter: this.ppoBalance
        };
        
        // Save to localStorage for now (can be moved to Firebase later)
        const transactions = JSON.parse(localStorage.getItem(`ppoTransactions_${this.currentUser?.uid}`) || '[]');
        transactions.push(transaction);
        localStorage.setItem(`ppoTransactions_${this.currentUser?.uid}`, JSON.stringify(transactions));
        
        console.log(`📝 PPO Transaction logged: ${type} ${amount} PPO (${source})`);
    }
    
    // Utility Functions
    createGameEvent(eventType, eventData) {
        const event = new CustomEvent(eventType, {
            detail: eventData
        });
        window.dispatchEvent(event);
    }
    
    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`📢 ${message}`);
        }
    }
    
    // Get current state
    getState() {
        return {
            currentUser: this.currentUser,
            ppoBalance: this.ppoBalance,
            gameStats: this.gameStats,
            components: {
                nftManager: !!this.nftManager,
                bowCustomization: !!this.bowCustomization,
                chestSystem: !!this.chestSystem
            }
        };
    }
}

// Chest System Class
class ChestSystem {
    constructor(economySystem) {
        this.economySystem = economySystem;
        this.chestSettings = {
            spawnRate: 50,
            spawnChance: 5.0,
            imageUrl: ''
        };
        this.availableBows = [];
        this.shotCount = 0;
        this.chestSpawned = false;
        this.currentChest = null;
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadChestSettings();
            await this.loadAvailableBows();
            console.log('📦 Chest System initialized');
        } catch (error) {
            console.error('❌ Error initializing Chest System:', error);
        }
    }
    
    async loadChestSettings() {
        try {
            if (!this.economySystem.nftManager) return;
            
            const settingsDoc = await this.economySystem.nftManager.firestore
                .collection('game-settings')
                .doc('treasure-chest')
                .get();
            
            if (settingsDoc.exists) {
                const settings = settingsDoc.data();
                this.chestSettings = {
                    spawnRate: settings.spawnRate || 50,
                    spawnChance: settings.spawnChance || 5.0,
                    imageUrl: settings.imageUrl || ''
                };
            }
        } catch (error) {
            console.error('❌ Error loading chest settings:', error);
        }
    }
    
    async loadAvailableBows() {
        try {
            if (!this.economySystem.nftManager) return;
            
            const bowsSnapshot = await this.economySystem.nftManager.firestore
                .collection('nft-bows')
                .where('status', '==', 'active')
                .get();
            
            this.availableBows = [];
            bowsSnapshot.forEach(doc => {
                this.availableBows.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        } catch (error) {
            console.error('❌ Error loading available bows:', error);
        }
    }
    
    handleShot() {
        this.shotCount++;
        
        if (this.shotCount >= this.chestSettings.spawnRate && !this.chestSpawned) {
            this.checkChestSpawn();
        }
    }
    
    checkChestSpawn() {
        const random = Math.random() * 100;
        
        if (random <= this.chestSettings.spawnChance) {
            this.spawnChest();
        }
    }
    
    spawnChest() {
        this.chestSpawned = true;
        this.currentChest = {
            id: 'chest_' + Date.now(),
            position: this.getRandomChestPosition(),
            imageUrl: this.chestSettings.imageUrl,
            timestamp: new Date()
        };
        
        this.showChestOnScreen();
        this.economySystem.createGameEvent('chestSpawned', {
            chestId: this.currentChest.id,
            position: this.currentChest.position
        });
    }
    
    getRandomChestPosition() {
        return {
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100)
        };
    }
    
    showChestOnScreen() {
        const chestElement = document.createElement('div');
        chestElement.id = 'treasure-chest';
        chestElement.className = 'treasure-chest';
        chestElement.style.cssText = `
            position: fixed;
            left: ${this.currentChest.position.x}px;
            top: ${this.currentChest.position.y}px;
            width: 80px;
            height: 80px;
            background-image: url('${this.currentChest.imageUrl || 'images/treasure-chest.png'}');
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer;
            z-index: 1000;
            animation: chestGlow 2s ease-in-out infinite alternate;
        `;
        
        chestElement.addEventListener('click', () => {
            this.openChest();
        });
        
        document.body.appendChild(chestElement);
        
        setTimeout(() => {
            if (chestElement.parentNode) {
                chestElement.remove();
                this.resetChest();
            }
        }, 10000);
    }
    
    async openChest() {
        try {
            const chestElement = document.getElementById('treasure-chest');
            if (chestElement) {
                chestElement.remove();
            }
            
            const reward = this.determineReward();
            this.showRewardAnimation(reward);
            
            this.economySystem.createGameEvent('chestOpened', {
                chestId: this.currentChest.id,
                reward: reward
            });
            
            this.resetChest();
        } catch (error) {
            console.error('❌ Error opening chest:', error);
        }
    }
    
    determineReward() {
        const random = Math.random() * 100;
        
        // 60% chance: PPO tokens
        if (random < 60) {
            const ppoAmount = Math.floor(Math.random() * 50) + 10;
            return {
                type: 'ppo',
                amount: ppoAmount,
                message: `You found ${ppoAmount} PPO tokens!`
            };
        }
        // 30% chance: Common bow
        else if (random < 90) {
            const commonBows = this.availableBows.filter(bow => bow.rarity === 'Common');
            if (commonBows.length > 0) {
                const randomBow = commonBows[Math.floor(Math.random() * commonBows.length)];
                return {
                    type: 'nft_bow',
                    bow: randomBow,
                    message: `You found a Common ${randomBow.name}!`
                };
            }
        }
        // 8% chance: Rare bow
        else if (random < 98) {
            const rareBows = this.availableBows.filter(bow => bow.rarity === 'Rare');
            if (rareBows.length > 0) {
                const randomBow = rareBows[Math.floor(Math.random() * rareBows.length)];
                return {
                    type: 'nft_bow',
                    bow: randomBow,
                    message: `You found a Rare ${randomBow.name}!`
                };
            }
        }
        // 2% chance: Epic/Legendary bow
        else {
            const epicBows = this.availableBows.filter(bow => 
                bow.rarity === 'Epic' || bow.rarity === 'Legendary'
            );
            if (epicBows.length > 0) {
                const randomBow = epicBows[Math.floor(Math.random() * epicBows.length)];
                return {
                    type: 'nft_bow',
                    bow: randomBow,
                    message: `You found a ${randomBow.rarity} ${randomBow.name}!`
                };
            }
        }
        
        // Fallback: PPO tokens
        const ppoAmount = Math.floor(Math.random() * 20) + 5;
        return {
            type: 'ppo',
            amount: ppoAmount,
            message: `You found ${ppoAmount} PPO tokens!`
        };
    }
    
    showRewardAnimation(reward) {
        const rewardElement = document.createElement('div');
        rewardElement.className = 'reward-popup';
        rewardElement.style.cssText = `
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
            max-width: 400px;
        `;
        
        if (reward.type === 'nft_bow') {
            rewardElement.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏹</div>
                <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">${reward.message}</div>
                <div style="margin: 1rem 0;">
                    <img src="${reward.bow.image}" style="width: 100px; height: 100px; border-radius: 10px; margin: 0.5rem;">
                </div>
                <div style="font-size: 0.9rem; opacity: 0.8;">
                    Damage: ${reward.bow.attributes.damage} | 
                    Accuracy: ${reward.bow.attributes.accuracy}%
                </div>
            `;
        } else {
            rewardElement.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
                <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">${reward.message}</div>
            `;
        }
        
        document.body.appendChild(rewardElement);
        
        setTimeout(() => {
            if (rewardElement.parentNode) {
                rewardElement.remove();
            }
        }, 3000);
    }
    
    resetChest() {
        this.chestSpawned = false;
        this.currentChest = null;
        this.shotCount = 0;
    }
}

// Export to global scope
window.GameEconomySystem = GameEconomySystem;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Game Economy System...');
    window.gameEconomy = new GameEconomySystem();
});

// Add CSS for animations
const economyStyles = document.createElement('style');
economyStyles.textContent = `
    @keyframes chestGlow {
        from { 
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            transform: scale(1);
        }
        to { 
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            transform: scale(1.05);
        }
    }
    
    @keyframes rewardPop {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    .treasure-chest:hover {
        transform: scale(1.1) !important;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(economyStyles);

console.log('✅ Game Economy System ready');


