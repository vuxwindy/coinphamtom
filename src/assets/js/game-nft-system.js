// Game NFT System - Hệ thống NFT trong game
// Xử lý rương xuất hiện ngẫu nhiên và minting NFT bows

console.log('🎮 Game NFT System loaded');

class GameNFTSystem {
    constructor() {
        this.nftManager = null;
        this.chestSettings = {
            spawnRate: 50,        // Mỗi X lần bắn
            spawnChance: 5.0,     // Xác suất xuất hiện (%)
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
            // Initialize NFT Manager
            await this.initNFTManager();
            
            // Load chest settings
            await this.loadChestSettings();
            
            // Load available bows
            await this.loadAvailableBows();
            
            console.log('✅ Game NFT System initialized');
        } catch (error) {
            console.error('❌ Error initializing Game NFT System:', error);
        }
    }
    
    async initNFTManager() {
        try {
            let attempts = 0;
            const maxAttempts = 50;
            
            while (attempts < maxAttempts) {
                if (window.NFTCardManager) {
                    this.nftManager = new window.NFTCardManager();
                    console.log('✅ NFT Manager initialized for game');
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            throw new Error('NFT Manager not available');
        } catch (error) {
            console.error('❌ Error initializing NFT Manager:', error);
            throw error;
        }
    }
    
    async loadChestSettings() {
        try {
            if (!this.nftManager) return;
            
            const settingsDoc = await this.nftManager.firestore
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
                console.log('📦 Chest settings loaded:', this.chestSettings);
            }
        } catch (error) {
            console.error('❌ Error loading chest settings:', error);
        }
    }
    
    async loadAvailableBows() {
        try {
            if (!this.nftManager) return;
            
            const bowsSnapshot = await this.nftManager.firestore
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
            
            console.log(`🏹 Loaded ${this.availableBows.length} available bows`);
        } catch (error) {
            console.error('❌ Error loading available bows:', error);
        }
    }
    
    // Xử lý khi player bắn
    handleShot() {
        this.shotCount++;
        
        // Kiểm tra xem có nên spawn rương không
        if (this.shotCount >= this.chestSettings.spawnRate && !this.chestSpawned) {
            this.checkChestSpawn();
        }
    }
    
    // Kiểm tra spawn rương
    checkChestSpawn() {
        const random = Math.random() * 100;
        
        if (random <= this.chestSettings.spawnChance) {
            this.spawnChest();
        }
    }
    
    // Spawn rương
    spawnChest() {
        this.chestSpawned = true;
        this.currentChest = {
            id: 'chest_' + Date.now(),
            position: this.getRandomChestPosition(),
            imageUrl: this.chestSettings.imageUrl,
            timestamp: new Date()
        };
        
        console.log('🎁 Treasure chest spawned!');
        
        // Trigger chest spawn event
        this.createGameEvent('chestSpawned', {
            chestId: this.currentChest.id,
            position: this.currentChest.position,
            timestamp: this.currentChest.timestamp
        });
        
        // Show chest on screen
        this.showChestOnScreen();
    }
    
    // Lấy vị trí ngẫu nhiên cho rương
    getRandomChestPosition() {
        // Random position trên màn hình game
        return {
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100)
        };
    }
    
    // Hiển thị rương trên màn hình
    showChestOnScreen() {
        // Tạo element rương
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
        
        // Thêm click event
        chestElement.addEventListener('click', () => {
            this.openChest();
        });
        
        // Thêm vào DOM
        document.body.appendChild(chestElement);
        
        // Auto remove sau 10 giây nếu không click
        setTimeout(() => {
            if (chestElement.parentNode) {
                chestElement.remove();
                this.resetChest();
            }
        }, 10000);
    }
    
    // Mở rương
    async openChest() {
        try {
            console.log('🎁 Opening treasure chest...');
            
            // Remove chest element
            const chestElement = document.getElementById('treasure-chest');
            if (chestElement) {
                chestElement.remove();
            }
            
            // Determine reward
            const reward = this.determineReward();
            
            // Show reward animation
            this.showRewardAnimation(reward);
            
            // Mint NFT if it's a bow
            if (reward.type === 'nft_bow') {
                await this.mintNFTBow(reward.bow);
            }
            
            // Reset chest state
            this.resetChest();
            
            // Trigger chest opened event
            this.createGameEvent('chestOpened', {
                chestId: this.currentChest.id,
                reward: reward,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('❌ Error opening chest:', error);
        }
    }
    
    // Xác định phần thưởng từ rương
    determineReward() {
        const random = Math.random() * 100;
        
        // 60% chance: PPO tokens
        if (random < 60) {
            const ppoAmount = Math.floor(Math.random() * 50) + 10; // 10-60 PPO
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
    
    // Hiển thị animation phần thưởng
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
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (rewardElement.parentNode) {
                rewardElement.remove();
            }
        }, 3000);
    }
    
    // Mint NFT Bow cho user
    async mintNFTBow(bow) {
        try {
            const user = this.getCurrentUser();
            if (!user) {
                console.log('⚠️ No user logged in, cannot mint bow');
                return;
            }
            
            // Check if bow is still available
            if (bow.available <= 0) {
                console.log('⚠️ Bow supply exhausted');
                return;
            }
            
            // Create NFT instance
            const nftId = `${bow.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const nftInstance = {
                id: nftId,
                cardId: bow.id,
                owner: user.uid,
                mintedAt: new Date(),
                tokenId: `${bow.id}_${bow.minted + 1}`,
                metadata: {
                    name: bow.name,
                    description: bow.description,
                    image: bow.image,
                    rarity: bow.rarity,
                    type: bow.type,
                    series: bow.series,
                    category: 'bow',
                    attributes: bow.attributes
                },
                status: 'owned',
                source: 'treasure_chest'
            };
            
            // Save NFT instance
            await this.nftManager.firestore
                .collection('user-nfts')
                .doc(nftId)
                .set(nftInstance);
            
            // Update bow supply
            await this.nftManager.firestore
                .collection('nft-bows')
                .doc(bow.id)
                .update({
                    minted: bow.minted + 1,
                    available: bow.available - 1
                });
            
            console.log(`🏹 Minted NFT bow: ${bow.name} to user ${user.uid}`);
            
            // Show success notification
            this.showNotification(`🎉 You received ${bow.name}!`, 'success');
            
        } catch (error) {
            console.error('❌ Error minting NFT bow:', error);
        }
    }
    
    // Reset chest state
    resetChest() {
        this.chestSpawned = false;
        this.currentChest = null;
        this.shotCount = 0;
    }
    
    // Get current user
    getCurrentUser() {
        try {
            const connectedWallet = localStorage.getItem('connectedWallet');
            const userUid = localStorage.getItem('userUid');
            
            if (connectedWallet && userUid) {
                return {
                    uid: userUid,
                    walletAddress: connectedWallet,
                    isWalletUser: true
                };
            }
            
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
    
    // Create game event
    createGameEvent(eventType, eventData) {
        const event = new CustomEvent(eventType, {
            detail: eventData
        });
        window.dispatchEvent(event);
    }
    
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
    }
    
    // Get current state
    getState() {
        return {
            shotCount: this.shotCount,
            chestSpawned: this.chestSpawned,
            currentChest: this.currentChest,
            chestSettings: this.chestSettings,
            availableBows: this.availableBows.length
        };
    }
    
    // Manual functions for testing
    forceSpawnChest() {
        this.spawnChest();
        console.log('🎁 Chest spawned manually');
    }
    
    forceOpenChest() {
        if (this.currentChest) {
            this.openChest();
        } else {
            console.log('⚠️ No chest to open');
        }
    }
    
    resetGame() {
        this.resetChest();
        console.log('🔄 Game reset');
    }
}

// Export to global scope
window.GameNFTSystem = GameNFTSystem;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Game NFT System...');
    window.gameNFTSystem = new GameNFTSystem();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

console.log('✅ Game NFT System ready');


