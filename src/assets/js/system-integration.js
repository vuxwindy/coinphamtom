// System Integration - COINPAYOT NFT
// Hệ thống tích hợp toàn bộ các button và function với core systems

console.log('🔗 System Integration loaded');

// ========================================
// INTEGRATION CONFIGURATION
// ========================================
const INTEGRATION_CONFIG = {
    // Button selectors
    BUTTONS: {
        // Wallet & Connection
        CONNECT_WALLET: '.connect-wallet-btn',
        DISCONNECT_WALLET: '.disconnect-btn',
        ADD_TO_WALLET: '.add-to-wallet-btn',
        SWITCH_NETWORK: '.switch-network-btn',
        
        // Dashboard & Transactions
        DEPOSIT: '[onclick*="openPPODepositModal"], [onclick*="showDepositModal"]',
        WITHDRAW: '[onclick*="openPPOWithdrawModal"], [onclick*="showWithdrawModal"]',
        TRANSFER: '[onclick*="openTransferModal"]',
        SWAP: '[onclick*="executeSwap"]',
        
        // Game & Rewards
        GAME_START: '[onclick*="startGame"]',
        GAME_RESTART: '[onclick*="restartGame"]',
        BUY_ARROWS: '[onclick*="buyArrows"]',
        CLAIM_REWARDS: '[onclick*="claimRewards"]',
        DAILY_CHECKIN: '[onclick*="dailyCheckIn"]',
        
        // NFT & Marketplace
        CREATE_NFT: '[onclick*="createNFT"]',
        LIST_NFT: '[onclick*="listNFT"]',
        BUY_NFT: '[onclick*="buyNFT"]',
        OPEN_BLINDBOX: '[onclick*="openBlindBox"]',
        
        // Investment & Packages
        BUY_PACKAGE: '[onclick*="buyPackage"]',
        START_STAKING: '[onclick*="startStaking"]',
        START_MINING: '[onclick*="startLiquidityMining"]',
        
        // Admin Functions
        ADMIN_LOGIN: '[onclick*="adminLogin"]',
        ADMIN_LOGOUT: '[onclick*="logout"]',
        ADD_USER: '[onclick*="addUser"]',
        UPDATE_USER: '[onclick*="updateUser"]',
        
        // Profile & Settings
        EDIT_PROFILE: '[onclick*="editProfile"]',
        SAVE_PROFILE: '[onclick*="saveProfile"]',
        SHARE_PROFILE: '[onclick*="shareProfile"]',
        
        // Utility Functions
        COPY_ADDRESS: '[onclick*="copyPlatformAddress"]',
        COPY_REFERRAL: '[onclick*="copyReferralLink"]',
        FILTER_DATA: '[onclick*="filter"]',
        SEARCH_DATA: '[onclick*="search"]'
    },
    
    // Function mappings
    FUNCTIONS: {
        // Core system functions
        'connectWallet': 'PPOBlockchain.connectWallet',
        'disconnectWallet': 'PPOBlockchain.disconnectWallet',
        'addToWallet': 'PPOBlockchain.addToWallet',
        'switchNetwork': 'PPOBlockchain.switchToBSC',
        
        // Database operations
        'createUser': 'DatabaseCore.createUser',
        'getUser': 'DatabaseCore.getUser',
        'updateUser': 'DatabaseCore.updateUser',
        'getTokenBalance': 'DatabaseCore.getTokenBalance',
        'updateTokenBalance': 'DatabaseCore.updateTokenBalance',
        
        // System logic
        'processGameReward': 'SystemLogicCore.processGameReward',
        'processInvestment': 'SystemLogicCore.processInvestment',
        'processReferral': 'SystemLogicCore.processReferral',
        'processDailyTask': 'SystemLogicCore.processDailyTask',
        'mintNFT': 'SystemLogicCore.mintNFT'
    }
};

// ========================================
// SYSTEM INTEGRATION CLASS
// ========================================
class SystemIntegration {
    constructor() {
        this.database = null;
        this.systemLogic = null;
        this.blockchain = null;
        this.isInitialized = false;
        this.eventListeners = new Map();
        this.buttonMappings = new Map();
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🚀 Initializing System Integration...');
            
            // Wait for dependencies to be available
            await this.waitForDependencies();
            
            // Initialize core systems
            await this.initializeCoreSystems();
            
            // Setup global function mappings
            this.setupGlobalFunctions();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Override global functions
            this.overrideGlobalFunctions();
            
            this.isInitialized = true;
            console.log('✅ System Integration initialized successfully');
            
            // Dispatch initialization event
            this.dispatchEvent('system:initialized', { success: true });
            
        } catch (error) {
            console.error('❌ System Integration initialization failed:', error);
            this.dispatchEvent('system:error', { error: error.message });
        }
    }
    
    async waitForDependencies() {
        console.log('⏳ Waiting for dependencies...');
        
        // Wait for core systems to be available
        let attempts = 0;
        const maxAttempts = 50; // 10 seconds max wait
        
        while (attempts < maxAttempts) {
            if (window.DatabaseCore && window.SystemLogicCore && window.PPOBlockchainIntegration) {
                console.log('✅ All dependencies found');
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
        }
        
        console.warn('⚠️ Core systems not available after timeout, continuing with available systems');
        // Continue with available systems instead of throwing error
        return;
    }
    
    async initializeCoreSystems() {
        console.log('🔧 Initializing core systems...');
        
        // Use existing instances instead of creating new ones
        if (window.DatabaseCore && window.DatabaseCore.instance) {
            this.database = window.DatabaseCore.instance;
        } else if (window.DatabaseCore) {
            this.database = window.DatabaseCore;
        }
        
        if (window.SystemLogicCore && window.SystemLogicCore.instance) {
            this.systemLogic = window.SystemLogicCore.instance;
        } else if (window.SystemLogicCore) {
            this.systemLogic = window.SystemLogicCore;
        }
        
        if (window.PPOBlockchain) {
            this.blockchain = window.PPOBlockchain;
        } else if (window.PPOBlockchainIntegration) {
            this.blockchain = window.PPOBlockchainIntegration;
        }
        
        console.log('✅ Core systems initialized');
    }
    
    async waitForSystemReady(system) {
        let attempts = 0;
        const maxAttempts = 25; // 5 seconds max wait
        
        while (attempts < maxAttempts) {
            if (system && system.isInitialized) {
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 200));
            attempts++;
        }
        
        console.warn('⚠️ System not fully initialized, continuing anyway');
    }
    
    setupGlobalFunctions() {
        console.log('🔗 Setting up global functions...');
        
        // Wallet Functions - Use RealBlockchain if available, otherwise fallback
        window.connectWallet = async () => {
            if (window.RealBlockchain) {
                return await window.RealBlockchain.connectWallet();
            } else if (this.blockchain) {
                return await this.blockchain.connectWallet();
            }
            throw new Error('Blockchain system not available');
        };
        
        window.disconnectWallet = async () => {
            if (window.RealBlockchain) {
                return await window.RealBlockchain.disconnectWallet();
            } else if (this.blockchain) {
                return await this.blockchain.disconnectWallet();
            }
            throw new Error('Blockchain system not available');
        };
        
        window.addToWallet = async () => {
            if (window.RealBlockchain) {
                return await window.RealBlockchain.addToWallet();
            } else if (this.blockchain) {
                return await this.blockchain.addToWallet();
            }
            throw new Error('Blockchain system not available');
        };
        
        // Logout function
        window.logout = async () => {
            try {
                console.log('🔌 Logging out...');
                
                // Disconnect wallet
                if (window.disconnectWallet) {
                    await window.disconnectWallet();
                }
                
                // Clear all storage
                localStorage.clear();
                sessionStorage.clear();
                
                // Show notification
                if (this.showNotification) {
                    this.showNotification('✅ Đã đăng xuất thành công!', 'success');
                }
                
                // Redirect to home
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                
                return true;
            } catch (error) {
                console.error('❌ Error during logout:', error);
                return false;
            }
        };
        
        // Deposit/Withdraw Functions
        window.openPPODepositModal = () => {
            this.showModal('deposit-modal', 'PPO Deposit');
        };
        
        window.openPPOWithdrawModal = () => {
            this.showModal('withdraw-modal', 'PPO Withdraw');
        };
        
        // Swap Function
        window.executeSwap = async (fromToken, toToken, amount) => {
            if (this.systemLogic) {
                return await this.systemLogic.processSwap(fromToken, toToken, amount);
            }
            throw new Error('System logic not available');
        };
        
        // Game Functions
        window.restartGame = () => {
            this.dispatchEvent('game:restart', {});
        };
        
        window.buyArrows = async (amount) => {
            if (this.systemLogic) {
                return await this.systemLogic.processArrowPurchase(amount);
            }
            throw new Error('System logic not available');
        };
        
        window.claimRewards = async () => {
            if (this.systemLogic) {
                return await this.systemLogic.processRewardClaim();
            }
            throw new Error('System logic not available');
        };
        
        // NFT Functions
        window.openBlindBox = async () => {
            if (this.systemLogic) {
                return await this.systemLogic.processBlindBox();
            }
            throw new Error('System logic not available');
        };
        
        // Investment Functions
        window.buyPackage = async (packageType, amount) => {
            if (this.systemLogic) {
                return await this.systemLogic.processPackagePurchase(packageType, amount);
            }
            throw new Error('System logic not available');
        };
        
        window.startStaking = async (amount, duration) => {
            if (this.systemLogic) {
                return await this.systemLogic.processStaking(amount, duration);
            }
            throw new Error('System logic not available');
        };
        
        // Profile Functions
        window.editProfile = () => {
            this.showModal('profile-modal', 'Edit Profile');
        };
        
        // Utility Functions
        window.copyPlatformAddress = () => {
            const address = '0xD962765700AC0F62dd627c2da0D6947Ed230dBB6';
            navigator.clipboard.writeText(address).then(() => {
                this.showNotification('Platform address copied to clipboard!', 'success');
            });
        };
        
        window.copyReferralLink = () => {
            const userId = this.getCurrentUserId();
            const referralLink = `${window.location.origin}/signup.html?ref=${userId}`;
            navigator.clipboard.writeText(referralLink).then(() => {
                this.showNotification('Referral link copied to clipboard!', 'success');
            });
        };
        
        // Admin Functions
        window.handleAdminButtonClick = () => {
            // Triple click detection
            if (!this.adminClickCount) this.adminClickCount = 0;
            if (!this.adminClickTimer) this.adminClickTimer = null;
            
            this.adminClickCount++;
            
            if (this.adminClickTimer) {
                clearTimeout(this.adminClickTimer);
            }
            
            this.adminClickTimer = setTimeout(() => {
                if (this.adminClickCount === 3) {
                    this.showAdminPanel();
                }
                this.adminClickCount = 0;
            }, 500);
        };
        
        console.log('✅ Global functions setup complete');
    }
    
    setupEventListeners() {
        console.log('🎧 Setting up event listeners...');
        
        // Connect wallet button
        document.addEventListener('click', (e) => {
            if (e.target.matches('.connect-wallet-btn') || e.target.closest('.connect-wallet-btn')) {
                e.preventDefault();
                window.connectWallet();
            }
        });
        
        // Add to Wallet button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#addToWalletBtn') || e.target.closest('#addToWalletBtn')) {
                e.preventDefault();
                if (this.blockchain) {
                    this.blockchain.addToWallet();
                } else {
                    this.showNotification('Blockchain system not available', 'error');
                }
            }
        });
        
        // Deposit button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="openPPODepositModal"]') || e.target.closest('[onclick*="openPPODepositModal"]')) {
                e.preventDefault();
                window.openPPODepositModal();
            }
        });
        
        // Withdraw button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="openPPOWithdrawModal"]') || e.target.closest('[onclick*="openPPOWithdrawModal"]')) {
                e.preventDefault();
                window.openPPOWithdrawModal();
            }
        });
        
        // Swap button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="executeSwap"]') || e.target.closest('[onclick*="executeSwap"]')) {
                e.preventDefault();
                const form = e.target.closest('form');
                if (form) {
                    const formData = new FormData(form);
                    window.executeSwap(formData.get('fromToken'), formData.get('toToken'), formData.get('amount'));
                }
            }
        });
        
        // Game restart button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="restartGame"]') || e.target.closest('[onclick*="restartGame"]')) {
                e.preventDefault();
                window.restartGame();
            }
        });
        
        // Buy arrows button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="buyArrows"]') || e.target.closest('[onclick*="buyArrows"]')) {
                e.preventDefault();
                const amount = e.target.dataset.amount || 1;
                window.buyArrows(parseInt(amount));
            }
        });
        
        // Claim rewards button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="claimRewards"]') || e.target.closest('[onclick*="claimRewards"]')) {
                e.preventDefault();
                window.claimRewards();
            }
        });
        
        // Open blindbox button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="openBlindBox"]') || e.target.closest('[onclick*="openBlindBox"]')) {
                e.preventDefault();
                window.openBlindBox();
            }
        });
        
        // Buy package button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="buyPackage"]') || e.target.closest('[onclick*="buyPackage"]')) {
                e.preventDefault();
                const packageType = e.target.dataset.package || 'bronze';
                const amount = e.target.dataset.amount || 100;
                window.buyPackage(packageType, parseFloat(amount));
            }
        });
        
        // Start staking button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="startStaking"]') || e.target.closest('[onclick*="startStaking"]')) {
                e.preventDefault();
                const amount = e.target.dataset.amount || 100;
                const duration = e.target.dataset.duration || 30;
                window.startStaking(parseFloat(amount), parseInt(duration));
            }
        });
        
        // Edit profile button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="editProfile"]') || e.target.closest('[onclick*="editProfile"]')) {
                e.preventDefault();
                window.editProfile();
            }
        });
        
        // Copy platform address button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="copyPlatformAddress"]') || e.target.closest('[onclick*="copyPlatformAddress"]')) {
                e.preventDefault();
                window.copyPlatformAddress();
            }
        });
        
        // Copy referral link button
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="copyReferralLink"]') || e.target.closest('[onclick*="copyReferralLink"]')) {
                e.preventDefault();
                window.copyReferralLink();
            }
        });
        
        console.log('✅ Event listeners setup complete');
    }
    
    overrideGlobalFunctions() {
        console.log('🔄 Overriding global functions...');
        
        // Override any existing functions to ensure they go through our system
        const functionsToOverride = [
            'connectWallet', 'disconnectWallet', 'openPPODepositModal', 
            'openPPOWithdrawModal', 'executeSwap', 'restartGame', 'buyArrows',
            'claimRewards', 'openBlindBox', 'buyPackage', 'startStaking',
            'editProfile', 'copyPlatformAddress', 'copyReferralLink'
        ];
        
        functionsToOverride.forEach(funcName => {
            if (window[funcName] && typeof window[funcName] === 'function') {
                const originalFunc = window[funcName];
                window[funcName] = (...args) => {
                    console.log(`🔄 Function ${funcName} called through SystemIntegration`);
                    return originalFunc.apply(this, args);
                };
            }
        });
        
        console.log('✅ Global functions overridden');
    }
    
    // Utility methods
    showModal(modalId, title) {
        console.log(`📋 Showing modal: ${modalId} - ${title}`);
        // Implementation would create/show modal
        this.showNotification(`${title} modal opened`, 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    getCurrentUserId() {
        // Get current user ID from localStorage or session
        return localStorage.getItem('userId') || 'anonymous';
    }
    
    showAdminPanel() {
        console.log('🔐 Admin panel accessed');
        window.location.href = 'admin/123123.html';
    }
    
    dispatchEvent(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }
    
    // Public API methods
    getDatabase() {
        return this.database;
    }
    
    getSystemLogic() {
        return this.systemLogic;
    }
    
    getBlockchain() {
        return this.blockchain;
    }
    
    isReady() {
        return this.isInitialized;
    }
}

// ========================================
// GLOBAL EXPOSURE
// ========================================

// Expose core systems globally
window.DatabaseCore = DatabaseCore;
window.SystemLogicCore = SystemLogicCore;
window.SystemIntegration = SystemIntegration;

// Initialize system integration
let systemIntegration;
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing System Integration on DOM ready...');
    systemIntegration = new SystemIntegration();
    window.systemIntegration = systemIntegration;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SystemIntegration;
}

