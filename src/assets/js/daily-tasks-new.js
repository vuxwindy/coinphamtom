// Daily Tasks - New Design
// Quản lý tất cả daily tasks trong một file duy nhất

console.log('=== DAILY TASKS NEW ===');

// ========================================
// ERROR HANDLING & LOGGING
// ========================================

const DailyTasksLogger = {
    log(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;
        
        switch (level) {
            case 'INFO':
                console.log(logMessage, data || '');
                break;
            case 'WARN':
                console.warn(logMessage, data || '');
                break;
            case 'ERROR':
                console.error(logMessage, data || '');
                break;
            case 'DEBUG':
                console.debug(logMessage, data || '');
                break;
        }
    },
    
    info(message, data) { this.log('INFO', message, data); },
    warn(message, data) { this.log('WARN', message, data); },
    error(message, data) { this.log('ERROR', message, data); },
    debug(message, data) { this.log('DEBUG', message, data); }
};

// ========================================
// STATE MANAGEMENT
// ========================================

const DailyTasksState = {
    // Task status
    taskStatus: {
        dailyCheckIn: false,
        telegramGroup: false,
        telegramChannel: false,
        facebookPage: false,
        twitterFollow: false,
        socialShare: false
    },
    
    // User info
    user: null,
    walletConnected: false,
    
    // Initialize state
    init() {
        console.log('🔄 Initializing Daily Tasks State...');
        
        // Load from localStorage
        const savedStatus = localStorage.getItem('dailyTasksStatus');
        if (savedStatus) {
            try {
                this.taskStatus = { ...this.taskStatus, ...JSON.parse(savedStatus) };
                console.log('📦 Loaded task status from localStorage:', this.taskStatus);
            } catch (error) {
                console.error('❌ Error loading task status:', error);
            }
        }
        
        // Check and reset daily check-in if needed
        this.checkDailyReset();
        
        // Check wallet connection
        this.checkWalletConnection();
        
        // Setup UI
        DailyTasksUI.setupUI();
        
        console.log('✅ Daily Tasks State initialized');
    },
    
    // Check wallet connection
    checkWalletConnection() {
        const walletAddress = localStorage.getItem('walletAddress');
        const userUid = localStorage.getItem('userUid');
        
        if (walletAddress || userUid) {
            this.user = {
                uid: userUid || `wallet_${walletAddress.toLowerCase()}`,
                walletAddress: walletAddress
            };
            this.walletConnected = true;
            console.log('🔗 Wallet connected:', this.user);
            
            // Load task status from Firebase
            DailyTasksFirebase.loadTaskStatusFromFirebase();
        } else {
            this.walletConnected = false;
            this.user = null;
            console.log('🔒 Wallet not connected');
        }
    },
    
    // Check and reset daily check-in if needed
    checkDailyReset() {
        const lastCheckInDate = localStorage.getItem('lastCheckInDate');
        const currentDate = new Date().toDateString();
        
        console.log('📅 Checking daily reset...');
        console.log('- Last check-in date:', lastCheckInDate);
        console.log('- Current date:', currentDate);
        
        if (lastCheckInDate && lastCheckInDate !== currentDate) {
            console.log('🔄 New day detected, resetting daily check-in...');
            
            // Reset daily check-in
            this.taskStatus.dailyCheckIn = false;
            
            // Save updated status
            localStorage.setItem('dailyTasksStatus', JSON.stringify(this.taskStatus));
            
            // Update UI
            DailyTasksUI.updateTaskButton('dailyCheckIn', false);
            DailyTasksUI.updateDailyMissionCounter();
            
            console.log('✅ Daily check-in reset for new day');
        }
    },
    
    // Update task status
    updateTaskStatus(taskType, completed) {
        this.taskStatus[taskType] = completed;
        
        // If completing daily check-in, save the date
        if (taskType === 'dailyCheckIn' && completed) {
            const currentDate = new Date().toDateString();
            localStorage.setItem('lastCheckInDate', currentDate);
            console.log(`📅 Daily check-in completed on: ${currentDate}`);
        }
        
        // Save to localStorage
        localStorage.setItem('dailyTasksStatus', JSON.stringify(this.taskStatus));
        
        // Trigger storage event for other pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'dailyTasksStatus',
            newValue: JSON.stringify(this.taskStatus),
            oldValue: localStorage.getItem('dailyTasksStatus')
        }));
        
        // Update UI
        DailyTasksUI.updateTaskButton(taskType, completed);
        DailyTasksUI.updateAvailableRewards();
        
        console.log(`✅ Task ${taskType} updated: ${completed}`);
    },
    
    // Get task status
    getTaskStatus(taskType) {
        return this.taskStatus[taskType] || false;
    },
    
    // Calculate available rewards
    calculateAvailableRewards() {
        let total = 0;
        const rewards = {
            dailyCheckIn: 1,
            telegramGroup: 2,
            telegramChannel: 2,
            facebookPage: 2,
            twitterFollow: 2,
            socialShare: 3
        };
        
        Object.keys(this.taskStatus).forEach(taskType => {
            if (this.taskStatus[taskType]) {
                total += rewards[taskType] || 0;
            }
        });
        
        return total;
    },
    
    // Calculate completed tasks count
    calculateCompletedTasks() {
        let completed = 0;
        Object.keys(this.taskStatus).forEach(taskType => {
            if (this.taskStatus[taskType]) {
                completed++;
            }
        });
        return completed;
    }
};

// ========================================
// UI MANAGEMENT
// ========================================

const DailyTasksUI = {
    // Setup UI
    setupUI() {
        console.log('🎨 Setting up Daily Tasks UI...');
        
        // Setup task buttons
        this.setupTaskButtons();
        
        // Update all buttons
        this.updateAllTaskButtons();
        
        // Update available rewards
        this.updateAvailableRewards();
        
        // Update daily mission counter
        this.updateDailyMissionCounter();
        
        console.log('✅ Daily Tasks UI setup complete');
    },
    
    // Setup task buttons
    setupTaskButtons() {
        const taskButtons = document.querySelectorAll('.task-btn');
        
        taskButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (!DailyTasksState.walletConnected) {
                    this.showNotification('Please connect your wallet first!', true);
                    return;
                }
                
                const taskType = button.getAttribute('data-task');
                this.handleTaskClick(taskType, button);
            });
        });
        
        console.log(`🎯 Setup ${taskButtons.length} task buttons`);
    },
    
    // Handle task click
    async handleTaskClick(taskType, button) {
        try {
            // Check if already completed
            if (DailyTasksState.getTaskStatus(taskType)) {
                this.showNotification('Task already completed!', true);
                return;
            }
            
            // Show processing state
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
            
            // Perform task
            let result;
            if (taskType === 'dailyCheckIn') {
                result = await DailyTasksFirebase.performDailyCheckIn();
            } else {
                result = await DailyTasksFirebase.completeTask(taskType);
            }
            
            if (result.success) {
                // Update state
                DailyTasksState.updateTaskStatus(taskType, true);
                
                // Show success message
                const reward = DailyTasksUtils.getTaskReward(taskType);
                this.showNotification(`Task completed! You earned ${reward} $PPO`, false);
                
                // Trigger task completion event for stats integration
                const taskEvent = new CustomEvent('taskCompleted', {
                    detail: {
                        taskType: taskType,
                        reward: reward,
                        timestamp: new Date().toISOString()
                    }
                });
                window.dispatchEvent(taskEvent);
                
                // Trigger daily check-in event if it's a daily check-in
                if (taskType === 'dailyCheckIn') {
                    const checkInEvent = new CustomEvent('dailyCheckIn', {
                        detail: {
                            timestamp: new Date().toISOString()
                        }
                    });
                    window.dispatchEvent(checkInEvent);
                }
                
                console.log(`✅ Task ${taskType} completed successfully`);
                
            } else {
                throw new Error(result.error || 'Task failed');
            }
            
        } catch (error) {
            console.error('Task error:', error);
            this.showNotification(error.message || 'Task failed', true);
            
            // Reset button if error
            if (DailyTasksState.walletConnected) {
                this.updateTaskButton(taskType, false);
            }
        }
    },
    
    // Update task button
    updateTaskButton(taskType, completed) {
        const button = document.querySelector(`[data-task="${taskType}"]`);
        if (!button) return;
        
        if (completed) {
            // Task completed
            button.disabled = true;
            button.classList.remove('btn-outline-info', 'btn-outline-success', 'btn-outline-secondary');
            button.classList.add('btn-success');
            
            const completedText = DailyTasksUtils.getCompletedButtonText(taskType);
            button.innerHTML = `<i class="fas fa-check me-2"></i>${completedText}`;
            
        } else {
            // Task not completed
            if (DailyTasksState.walletConnected) {
                button.disabled = false;
                button.classList.remove('btn-success', 'btn-outline-secondary');
                
                if (taskType === 'socialShare') {
                    button.classList.add('btn-outline-success');
                } else {
                    button.classList.add('btn-outline-info');
                }
                
                const defaultText = DailyTasksUtils.getDefaultButtonText(taskType);
                button.innerHTML = `<i class="fas ${DailyTasksUtils.getTaskIcon(taskType)} me-2"></i>${defaultText}`;
                
            } else {
                button.disabled = true;
                button.classList.remove('btn-outline-info', 'btn-outline-success', 'btn-success');
                button.classList.add('btn-outline-secondary');
                button.innerHTML = '<i class="fas fa-lock me-2"></i>Connect Wallet';
            }
        }
        
        // Update daily mission counter when task status changes
        this.updateDailyMissionCounter();
    },
    
    // Update all task buttons
    updateAllTaskButtons() {
        Object.keys(DailyTasksState.taskStatus).forEach(taskType => {
            this.updateTaskButton(taskType, DailyTasksState.taskStatus[taskType]);
        });
        
        // Update daily mission counter
        this.updateDailyMissionCounter();
    },
    
    // Update available rewards
    updateAvailableRewards() {
        const totalRewards = DailyTasksState.calculateAvailableRewards();
        
        const rewardsElement = document.querySelector('.available-rewards');
        if (rewardsElement) {
            rewardsElement.textContent = totalRewards;
        }
        
        console.log(`💰 Available rewards: ${totalRewards} $PPO`);
    },
    
    // Update daily mission counter on homepage
    updateDailyMissionCounter() {
        const completedTasks = DailyTasksState.calculateCompletedTasks();
        const totalTasks = Object.keys(DailyTasksState.taskStatus).length;
        
        console.log(`📊 Calculating Daily Mission Progress: ${completedTasks}/${totalTasks}`);
        
        // Update the mission counter on homepage
        const missionCounter = document.querySelector('.hits');
        if (missionCounter) {
            missionCounter.textContent = `${completedTasks}/${totalTasks} Daily Mission`;
            console.log(`✅ Updated mission counter: ${completedTasks}/${totalTasks}`);
        } else {
            console.log('⚠️ Mission counter element not found');
        }
        
        // Update the progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            progressBar.style.width = `${progressPercentage}%`;
            console.log(`✅ Updated progress bar: ${progressPercentage}%`);
        } else {
            console.log('⚠️ Progress bar element not found');
        }
        
        // Update the mission left counter (first stat item)
        const statItems = document.querySelectorAll('.stat-item h4');
        if (statItems.length > 0) {
            const remainingTasks = totalTasks - completedTasks;
            statItems[0].textContent = `${String(remainingTasks).padStart(2, '0')}/${String(totalTasks).padStart(2, '0')}`;
            console.log(`✅ Updated mission left counter: ${remainingTasks}/${totalTasks}`);
        } else {
            console.log('⚠️ Stat items not found');
        }
        
        console.log(`📊 Daily Mission Progress: ${completedTasks}/${totalTasks} (${Math.round((completedTasks / totalTasks) * 100)}%)`);
    },
    
    // Disable all buttons
    disableAllTaskButtons() {
        const taskButtons = document.querySelectorAll('.task-btn');
        
        taskButtons.forEach(button => {
            button.disabled = true;
            button.classList.remove('btn-outline-info', 'btn-outline-success', 'btn-success');
            button.classList.add('btn-outline-secondary');
            button.innerHTML = '<i class="fas fa-lock me-2"></i>Connect Wallet';
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
    }
};

// ========================================
// FIREBASE INTEGRATION
// ========================================

const DailyTasksFirebase = {
    // Load task status from Firebase
    async loadTaskStatusFromFirebase() {
        if (!window.FirebaseService || !DailyTasksState.user) {
            console.log('❌ Firebase service or user not available');
            return;
        }
        
        try {
            console.log('🔄 Loading task status from Firebase...');
            const result = await window.FirebaseService.checkDailyCheckInStatus(DailyTasksState.user.uid);
            
            if (result.success) {
                const taskData = result.data;
                console.log('📊 Task data from Firebase:', taskData);
                
                // Update daily check-in
                const dailyCheckInCompleted = !taskData.canCheckIn;
                DailyTasksState.taskStatus.dailyCheckIn = dailyCheckInCompleted;
                
                // Update other tasks
                if (taskData.completedTasks) {
                    Object.keys(taskData.completedTasks).forEach(taskType => {
                        const taskInfo = taskData.completedTasks[taskType];
                        if (taskInfo && taskInfo.completed) {
                            DailyTasksState.taskStatus[taskType] = true;
                        }
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('dailyTasksStatus', JSON.stringify(DailyTasksState.taskStatus));
                
                // Update UI
                DailyTasksUI.updateAllTaskButtons();
                DailyTasksUI.updateAvailableRewards();
                DailyTasksUI.updateDailyMissionCounter();
                
                console.log('✅ Task status loaded from Firebase');
                
            } else {
                console.error('❌ Failed to load task status:', result.error);
            }
        } catch (error) {
            console.error('❌ Error loading task status:', error);
        }
    },
    
    // Perform daily check-in
    async performDailyCheckIn() {
        if (!window.FirebaseService) {
            throw new Error('Firebase service not available');
        }
        
        return await window.FirebaseService.performDailyCheckIn(DailyTasksState.user.uid);
    },
    
    // Complete task
    async completeTask(taskType) {
        if (!window.FirebaseService) {
            throw new Error('Firebase service not available');
        }
        
        return await window.FirebaseService.completeTask(DailyTasksState.user.uid, taskType);
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

const DailyTasksUtils = {
    // Get task reward
    getTaskReward(taskType) {
        const rewards = {
            dailyCheckIn: 1,
            telegramGroup: 2,
            telegramChannel: 2,
            facebookPage: 2,
            twitterFollow: 2,
            socialShare: 3
        };
        return rewards[taskType] || 0;
    },
    
    // Get default button text
    getDefaultButtonText(taskType) {
        const texts = {
            dailyCheckIn: 'Check-in',
            telegramGroup: 'Join',
            telegramChannel: 'Subscribe',
            facebookPage: 'Like',
            twitterFollow: 'Follow',
            socialShare: 'Share'
        };
        return texts[taskType] || 'Complete';
    },
    
    // Get completed button text
    getCompletedButtonText(taskType) {
        const texts = {
            dailyCheckIn: 'Checked-in',
            telegramGroup: 'Joined',
            telegramChannel: 'Subscribed',
            facebookPage: 'Liked',
            twitterFollow: 'Followed',
            socialShare: 'Shared'
        };
        return texts[taskType] || 'Completed';
    },
    
    // Get task icon
    getTaskIcon(taskType) {
        const icons = {
            dailyCheckIn: 'fa-calendar-check',
            telegramGroup: 'fa-users',
            telegramChannel: 'fa-bullhorn',
            facebookPage: 'fa-thumbs-up',
            twitterFollow: 'fa-user-plus',
            socialShare: 'fa-share'
        };
        return icons[taskType] || 'fa-check';
    }
};

// ========================================
// WALLET INTEGRATION
// ========================================

const DailyTasksWallet = {
    // Handle wallet connection
    handleWalletConnection(walletAddress) {
        console.log('🔗 Wallet connected:', walletAddress);
        
        DailyTasksState.user = {
            uid: `wallet_${walletAddress.toLowerCase()}`,
            walletAddress: walletAddress
        };
        DailyTasksState.walletConnected = true;
        
        // Load task status from Firebase
        DailyTasksFirebase.loadTaskStatusFromFirebase();
        
        // Update UI
        DailyTasksUI.updateAllTaskButtons();
        DailyTasksUI.updateAvailableRewards();
        DailyTasksUI.updateDailyMissionCounter();
    },
    
    // Handle wallet disconnection
    handleWalletDisconnection() {
        console.log('🔒 Wallet disconnected');
        
        DailyTasksState.walletConnected = false;
        DailyTasksState.user = null;
        
        // Disable all buttons
        DailyTasksUI.disableAllTaskButtons();
        DailyTasksUI.updateAvailableRewards();
        DailyTasksUI.updateDailyMissionCounter();
    }
};

// ========================================
// INITIALIZATION
// ========================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Daily Tasks...');
    DailyTasksState.init();
    DailyTasksUI.setupUI();
    
    // Initialize daily mission counter on homepage
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        console.log('🏠 Initializing daily mission counter on homepage...');
        // Wait a bit for other scripts to load
        setTimeout(() => {
            DailyTasksUI.updateDailyMissionCounter();
        }, 1000);
        
        // Set up periodic updates for homepage
        setInterval(() => {
            DailyTasksUI.updateDailyMissionCounter();
        }, 5000); // Update every 5 seconds
    }
    
    // Set up daily reset check (check every hour)
    setInterval(() => {
        DailyTasksState.checkDailyReset();
    }, 60 * 60 * 1000); // Check every hour
    
    // Also check when page becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('👁️ Page became visible, checking daily reset...');
            DailyTasksState.checkDailyReset();
        }
    });
});

// Export to global scope
window.DailyTasks = {
    state: DailyTasksState,
    ui: DailyTasksUI,
    firebase: DailyTasksFirebase,
    utils: DailyTasksUtils,
    wallet: DailyTasksWallet
};

// Also export updateDailyMissionCounter function globally for easy access
window.updateDailyMissionCounter = () => {
    if (window.DailyTasks && window.DailyTasks.ui) {
        window.DailyTasks.ui.updateDailyMissionCounter();
    }
};

console.log('✅ Daily Tasks New loaded'); 