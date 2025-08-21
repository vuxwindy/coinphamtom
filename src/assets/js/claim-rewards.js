// Claim Rewards System
// Quản lý nút Claim Rewards và logic claim

console.log('🎁 Claim Rewards System loaded');

const ClaimRewards = {
    // Available rewards to claim
    availableRewards: 0,
    
    // Initialize claim rewards system
    init() {
        console.log('🔄 Initializing Claim Rewards System...');
        
        // Setup claim button
        this.setupClaimButton();
        
        // Update available rewards display
        this.updateAvailableRewards();
        
        // Listen for task completion events
        this.setupEventListeners();
        
        // Check StatsIntegration availability
        this.checkStatsIntegration();
        
        console.log('✅ Claim Rewards System initialized');
    },
    
    // Check if StatsIntegration is available
    checkStatsIntegration() {
        setTimeout(() => {
            if (window.StatsIntegration) {
                console.log('✅ StatsIntegration is available');
            } else {
                console.log('⚠️ StatsIntegration not available, will use fallback method');
            }
        }, 1000);
    },
    
    // Setup claim button
    setupClaimButton() {
        const claimBtn = document.querySelector('.claim-btn');
        if (claimBtn) {
            claimBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleClaimRewards();
            });
            
            console.log('🎯 Claim button setup complete');
        } else {
            console.log('⚠️ Claim button not found');
        }
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Listen for task completion
        window.addEventListener('taskCompleted', (event) => {
            const taskData = event.detail;
            this.addReward(taskData.reward || 0);
        });
        
        // Listen for daily check-in
        window.addEventListener('dailyCheckIn', (event) => {
            this.addReward(1); // Daily check-in reward
        });
        
        // Listen for game completion
        window.addEventListener('gameCompleted', (event) => {
            const gameData = event.detail;
            const gameReward = Math.floor(gameData.score / 100);
            if (gameReward > 0) {
                this.addReward(gameReward);
            }
        });
    },
    
    // Add reward to available rewards
    addReward(amount) {
        if (amount > 0) {
            this.availableRewards += amount;
            this.updateAvailableRewards();
            console.log(`💰 Added ${amount} PPO to available rewards. Total: ${this.availableRewards}`);
        }
    },
    
    // Update available rewards display
    updateAvailableRewards() {
        // Update the available rewards counter
        const rewardsElement = document.querySelector('.available-rewards');
        if (rewardsElement) {
            rewardsElement.textContent = this.availableRewards;
        }
        
        // Update claim button state
        const claimBtn = document.querySelector('.claim-btn');
        if (claimBtn) {
            if (this.availableRewards > 0) {
                // Enable button and add glow effect
                claimBtn.disabled = false;
                claimBtn.classList.remove('btn-success');
                claimBtn.classList.add('btn-warning', 'pulse-glow');
                claimBtn.innerHTML = '<i class="fas fa-gift me-2"></i>Claim Rewards!';
            } else {
                // Disable button
                claimBtn.disabled = true;
                claimBtn.classList.remove('btn-warning', 'pulse-glow');
                claimBtn.classList.add('btn-success');
                claimBtn.innerHTML = '<i class="fas fa-gift me-2"></i>Claim Rewards';
            }
        }
        
        console.log(`📊 Available rewards updated: ${this.availableRewards} PPO`);
    },
    
    // Handle claim rewards
    async handleClaimRewards() {
        if (this.availableRewards <= 0) {
            this.showNotification('No rewards available to claim!', true);
            return;
        }
        
        const claimBtn = document.querySelector('.claim-btn');
        if (claimBtn) {
            // Show processing state
            claimBtn.disabled = true;
            claimBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Claiming...';
        }
        
        try {
            // Simulate claim process (replace with actual blockchain transaction)
            await this.simulateClaimProcess();
            
            // Save amount before resetting
            const claimedAmount = this.availableRewards;
            
            // Add to PPO balance
            if (window.StatsIntegration && window.StatsIntegration.addPPO) {
                window.StatsIntegration.addPPO(claimedAmount);
                console.log(`💰 Added ${claimedAmount} PPO to balance via StatsIntegration`);
            } else {
                // Fallback: directly update PPO balance element
                const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
                if (ppoBalanceElement) {
                    const currentBalance = parseInt(ppoBalanceElement.textContent.replace(/,/g, '')) || 0;
                    const newBalance = currentBalance + claimedAmount;
                    ppoBalanceElement.textContent = newBalance.toLocaleString();
                    console.log(`💰 Added ${claimedAmount} PPO to balance via direct update`);
                }
            }
            
            // Show success message
            this.showNotification(`Successfully claimed ${claimedAmount} $PPO!`, false);
            
            // Reset available rewards
            this.availableRewards = 0;
            this.updateAvailableRewards();
            
            // Trigger claim event
            window.createGameEvent('rewardsClaimed', {
                amount: claimedAmount,
                timestamp: new Date().toISOString()
            });
            
            console.log(`✅ Successfully claimed ${claimedAmount} PPO`);
            
        } catch (error) {
            console.error('❌ Error claiming rewards:', error);
            this.showNotification('Failed to claim rewards. Please try again.', true);
            
            // Reset button if error
            if (claimBtn) {
                claimBtn.disabled = false;
                claimBtn.innerHTML = '<i class="fas fa-gift me-2"></i>Claim Rewards!';
            }
        }
    },
    
    // Simulate claim process (replace with actual blockchain transaction)
    async simulateClaimProcess() {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                resolve();
            }, 2000);
        });
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
    
    // Add rewards manually
    addRewardsManually(amount) {
        this.addReward(amount);
        console.log(`🎁 Manually added ${amount} PPO to available rewards`);
    },
    
    // Reset available rewards
    resetRewards() {
        this.availableRewards = 0;
        this.updateAvailableRewards();
        console.log('🔄 Available rewards reset');
    },
    
    // Get current available rewards
    getAvailableRewards() {
        return this.availableRewards;
    },
    
    // Show current status
    showStatus() {
        console.log('🎁 Claim Rewards Status:');
        console.log('- Available Rewards:', this.availableRewards);
        console.log('- Claim Button Enabled:', this.availableRewards > 0);
        console.log('- StatsIntegration Available:', !!(window.StatsIntegration));
        console.log('- StatsIntegration.addPPO Available:', !!(window.StatsIntegration && window.StatsIntegration.addPPO));
        
        // Check current PPO balance
        const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
        if (ppoBalanceElement) {
            console.log('- Current PPO Balance Display:', ppoBalanceElement.textContent);
        }
    },
    
    // Test claim rewards (for debugging)
    testClaimRewards() {
        console.log('🧪 Testing claim rewards...');
        
        if (this.availableRewards <= 0) {
            console.log('❌ No rewards available to test');
            return;
        }
        
        // Simulate claim without UI changes
        const claimedAmount = this.availableRewards;
        
        // Add to PPO balance
        if (window.StatsIntegration && window.StatsIntegration.addPPO) {
            window.StatsIntegration.addPPO(claimedAmount);
            console.log(`✅ Added ${claimedAmount} PPO via StatsIntegration`);
        } else {
            // Fallback: directly update PPO balance element
            const ppoBalanceElement = document.querySelector('.stat-item:nth-child(3) h4');
            if (ppoBalanceElement) {
                const currentBalance = parseInt(ppoBalanceElement.textContent.replace(/,/g, '')) || 0;
                const newBalance = currentBalance + claimedAmount;
                ppoBalanceElement.textContent = newBalance.toLocaleString();
                console.log(`✅ Added ${claimedAmount} PPO via direct update`);
            }
        }
        
        // Reset available rewards
        this.availableRewards = 0;
        this.updateAvailableRewards();
        
        console.log('✅ Test claim completed');
    }
};

// Export to global scope
window.ClaimRewards = ClaimRewards;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Claim Rewards...');
    ClaimRewards.init();
});

// Add CSS for pulse glow effect
const claimRewardsStyle = document.createElement('style');
claimRewardsStyle.textContent = `
    .pulse-glow {
        animation: pulse-glow 2s infinite;
        box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
    }
    
    @keyframes pulse-glow {
        0% {
            box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
        }
        50% {
            box-shadow: 0 0 30px rgba(255, 193, 7, 0.8);
        }
        100% {
            box-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
        }
    }
    
    .slideIn {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(claimRewardsStyle);

console.log('✅ Claim Rewards System ready');
