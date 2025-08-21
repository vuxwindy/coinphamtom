// Your Statistics Integration System
// Liên kết Your Statistics với tất cả các hệ thống

console.log('📊 Your Statistics Integration System loaded');

const YourStatisticsIntegration = {
    // Initialize statistics integration
    init() {
        console.log('🔄 Initializing Your Statistics Integration...');
        
        // Update all statistics immediately
        this.updateAllStatistics();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
        
        // Listen for all events
        this.setupEventListeners();
        
        // Setup referral system
        this.setupReferralSystem();
        
        console.log('✅ Your Statistics Integration initialized');
    },
    
    // Update all statistics display
    updateAllStatistics() {
        this.updateTokenBalance();
        this.updateNFTBalance();
        this.updateTotalEarnings();
        this.updateReferralEarnings();
        this.updateReferralStats();
        console.log('📊 All Your Statistics updated');
    },
    
    // Update Token Balance (PPO Balance)
    updateTokenBalance() {
        try {
            // Get PPO balance from localStorage
            const savedStats = localStorage.getItem('userStats');
            let ppoBalance = 0;
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                ppoBalance = parsedStats.ppoBalance || 0;
            }
            
            // Update Token Balance display
            const tokenBalanceElement = document.querySelector('.token-balance');
            if (tokenBalanceElement) {
                tokenBalanceElement.textContent = ppoBalance.toLocaleString();
            }
            
            console.log(`💰 Token Balance: ${ppoBalance.toLocaleString()} PPO`);
            
        } catch (error) {
            console.error('❌ Error updating Token Balance:', error);
        }
    },
    
    // Update NFT Balance
    updateNFTBalance() {
        try {
            // Get NFT balance from localStorage
            const savedStats = localStorage.getItem('userStats');
            let nftBalance = 0;
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                nftBalance = parsedStats.nftBalance || 0;
            }
            
            // Update NFT Balance display
            const nftBalanceElement = document.querySelector('.nft-balance');
            if (nftBalanceElement) {
                nftBalanceElement.textContent = nftBalance;
            }
            
            console.log(`🖼️ NFT Balance: ${nftBalance}`);
            
        } catch (error) {
            console.error('❌ Error updating NFT Balance:', error);
        }
    },
    
    // Update Total Earnings
    updateTotalEarnings() {
        try {
            // Get total earnings from localStorage
            const savedStats = localStorage.getItem('userStats');
            let totalEarnings = 0;
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                totalEarnings = parsedStats.totalEarnings || 0;
            }
            
            // Update Total Earnings display
            const totalEarningsElement = document.querySelector('.total-earned');
            if (totalEarningsElement) {
                totalEarningsElement.textContent = totalEarnings.toLocaleString();
            }
            
            console.log(`💎 Total Earnings: ${totalEarnings.toLocaleString()} PPO`);
            
        } catch (error) {
            console.error('❌ Error updating Total Earnings:', error);
        }
    },
    
    // Update Referral Earnings
    updateReferralEarnings() {
        try {
            // Get referral earnings from localStorage
            const savedStats = localStorage.getItem('userStats');
            let referralEarnings = 0;
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                referralEarnings = parsedStats.referralEarnings || 0;
            }
            
            // Update Referral Earnings display
            const referralEarningsElement = document.querySelector('.referral-earnings');
            if (referralEarningsElement) {
                referralEarningsElement.textContent = referralEarnings.toLocaleString();
            }
            
            console.log(`👥 Referral Earnings: ${referralEarnings.toLocaleString()} PPO`);
            
        } catch (error) {
            console.error('❌ Error updating Referral Earnings:', error);
        }
    },
    
    // Update Referral Stats
    updateReferralStats() {
        try {
            // Get referral stats from localStorage
            const savedStats = localStorage.getItem('userStats');
            let referralStats = {
                totalReferrals: 0,
                level: 'F0',
                referralsNeeded: 15
            };
            
            if (savedStats) {
                const parsedStats = JSON.parse(savedStats);
                referralStats = {
                    totalReferrals: parsedStats.totalReferrals || 0,
                    level: parsedStats.referralLevel || 'F0',
                    referralsNeeded: parsedStats.referralsNeeded || 15
                };
            }
            
            // Update referral level
            const refLevelElement = document.querySelector('.ref-level');
            if (refLevelElement) {
                refLevelElement.textContent = referralStats.level;
            }
            
            // Update referrals needed
            const refsNeededElement = document.querySelector('.refs-needed');
            if (refsNeededElement) {
                refsNeededElement.textContent = referralStats.referralsNeeded;
            }
            
            // Update total referrals
            const totalRefsElement = document.querySelector('.total-refs');
            if (totalRefsElement) {
                totalRefsElement.textContent = referralStats.totalReferrals;
            }
            
            console.log(`👥 Referral Stats: Level ${referralStats.level}, ${referralStats.totalReferrals} referrals`);
            
        } catch (error) {
            console.error('❌ Error updating Referral Stats:', error);
        }
    },
    
    // Setup periodic updates
    setupPeriodicUpdates() {
        // Update statistics every 10 seconds
        setInterval(() => {
            this.updateAllStatistics();
        }, 10000);
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Listen for PPO balance changes
        window.addEventListener('rewardsClaimed', (event) => {
            console.log('🎁 Rewards claimed, updating statistics...');
            this.updateTokenBalance();
            this.updateTotalEarnings();
        });
        
        // Listen for NFT changes
        window.addEventListener('nftAcquired', (event) => {
            console.log('🖼️ NFT acquired, updating statistics...');
            this.updateNFTBalance();
        });
        
        // Listen for referral changes
        window.addEventListener('referralCompleted', (event) => {
            console.log('👥 Referral completed, updating statistics...');
            this.updateReferralEarnings();
            this.updateReferralStats();
        });
        
        // Listen for storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'userStats') {
                console.log('📦 User stats changed, updating all statistics...');
                this.updateAllStatistics();
            }
        });
    },
    
    // Setup referral system
    setupReferralSystem() {
        // Generate referral link
        this.generateReferralLink();
        
        // Setup copy button
        this.setupCopyButton();
    },
    
    // Generate referral link
    generateReferralLink() {
        const walletAddress = localStorage.getItem('walletAddress') || 'invite';
        const referralLink = `${window.location.origin}?ref=${walletAddress}`;
        
        const referralLinkElement = document.getElementById('referralLink');
        if (referralLinkElement) {
            referralLinkElement.value = referralLink;
        }
        
        console.log('🔗 Referral link generated:', referralLink);
    },
    
    // Setup copy button
    setupCopyButton() {
        const copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const referralLink = document.getElementById('referralLink');
                if (referralLink) {
                    referralLink.select();
                    document.execCommand('copy');
                    
                    // Show success message
                    this.showNotification('Referral link copied to clipboard!', false);
                    console.log('📋 Referral link copied');
                }
            });
        }
    },
    
    // Show notification
    showNotification(message, isError = false) {
        const existingNotifications = document.querySelectorAll('.alert');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `alert alert-${isError ? 'danger' : 'success'} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-${isError ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },
    
    // Manual functions for testing
    
    // Add PPO to balance
    addPPO(amount) {
        const savedStats = localStorage.getItem('userStats');
        let userStats = savedStats ? JSON.parse(savedStats) : {};
        
        userStats.ppoBalance = (userStats.ppoBalance || 0) + amount;
        userStats.totalEarnings = (userStats.totalEarnings || 0) + amount;
        
        localStorage.setItem('userStats', JSON.stringify(userStats));
        this.updateTokenBalance();
        this.updateTotalEarnings();
        
        console.log(`💰 Added ${amount} PPO to balance`);
    },
    
    // Add NFT
    addNFT(count = 1) {
        const savedStats = localStorage.getItem('userStats');
        let userStats = savedStats ? JSON.parse(savedStats) : {};
        
        userStats.nftBalance = (userStats.nftBalance || 0) + count;
        
        localStorage.setItem('userStats', JSON.stringify(userStats));
        this.updateNFTBalance();
        
        console.log(`🖼️ Added ${count} NFT`);
    },
    
    // Add referral
    addReferral() {
        const savedStats = localStorage.getItem('userStats');
        let userStats = savedStats ? JSON.parse(savedStats) : {};
        
        userStats.totalReferrals = (userStats.totalReferrals || 0) + 1;
        userStats.referralEarnings = (userStats.referralEarnings || 0) + 5; // 5 PPO per referral
        
        // Calculate level
        const totalRefs = userStats.totalReferrals;
        if (totalRefs >= 50) userStats.referralLevel = 'F5';
        else if (totalRefs >= 30) userStats.referralLevel = 'F4';
        else if (totalRefs >= 15) userStats.referralLevel = 'F3';
        else if (totalRefs >= 5) userStats.referralLevel = 'F2';
        else if (totalRefs >= 1) userStats.referralLevel = 'F1';
        else userStats.referralLevel = 'F0';
        
        // Calculate referrals needed for next level
        const levelRequirements = { F0: 1, F1: 5, F2: 15, F3: 30, F4: 50, F5: 100 };
        const currentLevel = userStats.referralLevel;
        const nextLevel = Object.keys(levelRequirements).find(level => levelRequirements[level] > totalRefs) || 'F5';
        userStats.referralsNeeded = levelRequirements[nextLevel] - totalRefs;
        
        localStorage.setItem('userStats', JSON.stringify(userStats));
        this.updateReferralEarnings();
        this.updateReferralStats();
        
        console.log(`👥 Added referral, new total: ${userStats.totalReferrals}`);
    },
    
    // Show current statistics
    showCurrentStatistics() {
        console.log('📊 Current Your Statistics:');
        
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            console.log('- Token Balance:', stats.ppoBalance || 0);
            console.log('- NFT Balance:', stats.nftBalance || 0);
            console.log('- Total Earnings:', stats.totalEarnings || 0);
            console.log('- Referral Earnings:', stats.referralEarnings || 0);
            console.log('- Total Referrals:', stats.totalReferrals || 0);
            console.log('- Referral Level:', stats.referralLevel || 'F0');
        }
    },
    
    // Force update all statistics
    forceUpdateAll() {
        console.log('🔄 Force updating all Your Statistics...');
        this.updateAllStatistics();
    }
};

// Export to global scope
window.YourStatisticsIntegration = YourStatisticsIntegration;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Your Statistics Integration...');
    YourStatisticsIntegration.init();
});

console.log('✅ Your Statistics Integration System ready');
