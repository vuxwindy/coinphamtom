// Referral System - COINPAYOT NFT
// Hệ thống referral code cố định cho mỗi wallet

console.log('🎯 Referral System loaded');

class ReferralSystem {
    constructor() {
        this.currentUser = null;
        this.referralCode = null;
        this.referrerCode = null;
        this.referralStats = {
            totalReferrals: 0,
            totalEarnings: 0,
            activeReferrals: 0
        };
        
        this.init();
    }
    
    async init() {
        console.log('🔄 Initializing Referral System...');
        
        // Load user data
        await this.loadUserData();
        
        // Setup referral code display
        this.setupReferralDisplay();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('✅ Referral System initialized');
    }
    
    async loadUserData() {
        try {
            // Get current user from localStorage or session
            const walletAddress = localStorage.getItem('walletAddress');
            if (walletAddress) {
                this.currentUser = { walletAddress };
                
                // Generate or load referral code
                await this.generateOrLoadReferralCode(walletAddress);
                
                // Load referral stats
                await this.loadReferralStats();
                
                console.log('✅ User data loaded for referral system');
            }
        } catch (error) {
            console.error('❌ Error loading user data:', error);
        }
    }
    
    async generateOrLoadReferralCode(walletAddress) {
        try {
            // Check if referral code already exists
            let existingCode = localStorage.getItem(`referralCode_${walletAddress}`);
            
            if (!existingCode) {
                // Generate new referral code based on wallet address
                existingCode = this.generateReferralCode(walletAddress);
                localStorage.setItem(`referralCode_${walletAddress}`, existingCode);
                console.log(`🎯 Generated new referral code: ${existingCode}`);
            }
            
            this.referralCode = existingCode;
            
            // Check if user was referred by someone
            const referrerCode = localStorage.getItem(`referrerCode_${walletAddress}`);
            if (referrerCode) {
                this.referrerCode = referrerCode;
                console.log(`🎯 User was referred by: ${referrerCode}`);
            }
            
        } catch (error) {
            console.error('❌ Error generating/loading referral code:', error);
        }
    }
    
    generateReferralCode(walletAddress) {
        // Create a unique referral code based on wallet address
        const hash = this.simpleHash(walletAddress);
        const code = hash.substring(0, 8).toUpperCase();
        return `PPO${code}`;
    }
    
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }
    
    async loadReferralStats() {
        try {
            if (!this.currentUser) return;
            
            // Load stats from localStorage
            const stats = localStorage.getItem(`referralStats_${this.currentUser.walletAddress}`);
            if (stats) {
                this.referralStats = JSON.parse(stats);
            }
            
            // Load from database if available
            if (window.DatabaseCore) {
                const userStats = await window.DatabaseCore.getUserReferralStats(this.currentUser.walletAddress);
                if (userStats) {
                    this.referralStats = { ...this.referralStats, ...userStats };
                }
            }
            
        } catch (error) {
            console.error('❌ Error loading referral stats:', error);
        }
    }
    
    setupReferralDisplay() {
        // Update referral code display
        const referralCodeElement = document.getElementById('referralCode');
        if (referralCodeElement && this.referralCode) {
            referralCodeElement.textContent = this.referralCode;
        }
        
        // Update referral stats display
        this.updateReferralStatsDisplay();
    }
    
    updateReferralStatsDisplay() {
        const statsElements = {
            totalReferrals: document.getElementById('totalReferrals'),
            totalEarnings: document.getElementById('totalEarnings'),
            activeReferrals: document.getElementById('activeReferrals')
        };
        
        if (statsElements.totalReferrals) {
            statsElements.totalReferrals.textContent = this.referralStats.totalReferrals;
        }
        if (statsElements.totalEarnings) {
            statsElements.totalEarnings.textContent = `${this.referralStats.totalEarnings} PPO`;
        }
        if (statsElements.activeReferrals) {
            statsElements.activeReferrals.textContent = this.referralStats.activeReferrals;
        }
    }
    
    setupEventListeners() {
        // Copy referral code button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#copyReferralCode') || e.target.closest('#copyReferralCode')) {
                e.preventDefault();
                this.copyReferralCode();
            }
        });
        
        // Share referral link button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#shareReferralLink') || e.target.closest('#shareReferralLink')) {
                e.preventDefault();
                this.shareReferralLink();
            }
        });
    }
    
    copyReferralCode() {
        if (!this.referralCode) {
            this.showNotification('Referral code not available', 'error');
            return;
        }
        
        navigator.clipboard.writeText(this.referralCode).then(() => {
            this.showNotification('Referral code copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Failed to copy referral code', 'error');
        });
    }
    
    shareReferralLink() {
        if (!this.referralCode) {
            this.showNotification('Referral code not available', 'error');
            return;
        }
        
        const referralLink = `${window.location.origin}/signup.html?ref=${this.referralCode}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Join COINPAYOT NFT',
                text: 'Use my referral code to get bonus rewards!',
                url: referralLink
            });
        } else {
            navigator.clipboard.writeText(referralLink).then(() => {
                this.showNotification('Referral link copied to clipboard!', 'success');
            }).catch(() => {
                this.showNotification('Failed to copy referral link', 'error');
            });
        }
    }
    
    // Process new referral
    async processReferral(referrerCode, newUserWallet) {
        try {
            if (!referrerCode || !newUserWallet) {
                throw new Error('Invalid referral data');
            }
            
            // Find referrer by code
            const referrerWallet = this.findWalletByReferralCode(referrerCode);
            if (!referrerWallet) {
                throw new Error('Invalid referral code');
            }
            
            // Save referral relationship
            localStorage.setItem(`referrerCode_${newUserWallet}`, referrerCode);
            
            // Update referrer stats
            await this.updateReferrerStats(referrerWallet, newUserWallet);
            
            // Give referral bonus
            await this.giveReferralBonus(referrerWallet, newUserWallet);
            
            console.log(`✅ Referral processed: ${newUserWallet} referred by ${referrerWallet}`);
            
            return { success: true };
            
        } catch (error) {
            console.error('❌ Error processing referral:', error);
            return { success: false, error: error.message };
        }
    }
    
    findWalletByReferralCode(referralCode) {
        // Search through localStorage for matching referral code
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('referralCode_')) {
                const code = localStorage.getItem(key);
                if (code === referralCode) {
                    return key.replace('referralCode_', '');
                }
            }
        }
        return null;
    }
    
    async updateReferrerStats(referrerWallet, newUserWallet) {
        try {
            // Load current stats
            const statsKey = `referralStats_${referrerWallet}`;
            let stats = localStorage.getItem(statsKey);
            stats = stats ? JSON.parse(stats) : { totalReferrals: 0, totalEarnings: 0, activeReferrals: 0 };
            
            // Update stats
            stats.totalReferrals += 1;
            stats.activeReferrals += 1;
            
            // Save updated stats
            localStorage.setItem(statsKey, JSON.stringify(stats));
            
            // Update database if available
            if (window.DatabaseCore) {
                await window.DatabaseCore.updateUserReferralStats(referrerWallet, stats);
            }
            
        } catch (error) {
            console.error('❌ Error updating referrer stats:', error);
        }
    }
    
    async giveReferralBonus(referrerWallet, newUserWallet) {
        try {
            const bonusAmount = 10; // 10 PPO bonus for each referral
            
            // Add bonus to referrer's balance
            if (window.DatabaseCore) {
                await window.DatabaseCore.addReferralBonus(referrerWallet, bonusAmount);
            }
            
            // Log referral transaction
            const transaction = {
                type: 'referral_bonus',
                amount: bonusAmount,
                referrer: referrerWallet,
                referred: newUserWallet,
                timestamp: new Date().toISOString()
            };
            
            if (window.DatabaseCore) {
                await window.DatabaseCore.logReferralTransaction(transaction);
            }
            
            console.log(`💰 Referral bonus of ${bonusAmount} PPO given to ${referrerWallet}`);
            
        } catch (error) {
            console.error('❌ Error giving referral bonus:', error);
        }
    }
    
    // Get referral link
    getReferralLink() {
        if (!this.referralCode) return null;
        return `${window.location.origin}/signup.html?ref=${this.referralCode}`;
    }
    
    // Get current referral code
    getReferralCode() {
        return this.referralCode;
    }
    
    // Get referral stats
    getReferralStats() {
        return this.referralStats;
    }
    
    // Check if user was referred
    wasReferred() {
        return !!this.referrerCode;
    }
    
    // Get referrer code
    getReferrerCode() {
        return this.referrerCode;
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
}

// Create global instance
let referralSystem;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing Referral System...');
    referralSystem = new ReferralSystem();
    window.ReferralSystem = referralSystem;
});

// Export for global use
window.ReferralSystem = ReferralSystem;

console.log('✅ Referral System ready');
