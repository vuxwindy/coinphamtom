// Investment Integration System
const InvestmentIntegration = {
    investmentData: {
        investments: [],
        userInvestments: [],
        totalInvestments: 0,
        totalProfit: 0,
        dailyProfit: 0,
        packages: {
            bronze: {
                name: 'Bronze Package',
                minAmount: 1000,
                maxAmount: 19999,
                dailyProfit: 0.4,
                contractPeriod: 36,
                color: 'warning',
                icon: 'fas fa-coins'
            },
            silver: {
                name: 'Silver Package',
                minAmount: 20000,
                maxAmount: 99999,
                dailyProfit: 0.5,
                contractPeriod: 36,
                color: 'secondary',
                icon: 'fas fa-medal'
            },
            gold: {
                name: 'Gold Package',
                minAmount: 100000,
                maxAmount: 999999,
                dailyProfit: 0.6,
                contractPeriod: 36,
                color: 'warning',
                icon: 'fas fa-crown'
            },
            platinum: {
                name: 'Platinum Package',
                minAmount: 1000000,
                maxAmount: 9999999,
                dailyProfit: 0.7,
                contractPeriod: 36,
                color: 'info',
                icon: 'fas fa-gem'
            },
            diamond: {
                name: 'Diamond Package',
                minAmount: 10000000,
                maxAmount: 99999999,
                dailyProfit: 0.8,
                contractPeriod: 36,
                color: 'primary',
                icon: 'fas fa-diamond'
            }
        }
    },

    // Initialize the system
    init() {
        this.loadInvestmentData();
        this.setupEventListeners();
        this.updateInvestmentDisplay();
        this.setupPeriodicUpdates();
        this.startProfitCalculation();
        console.log('💰 Investment Integration initialized');
    },

    // Load investment data from localStorage
    loadInvestmentData() {
        const saved = localStorage.getItem('investmentData');
        if (saved) {
            this.investmentData = JSON.parse(saved);
        } else {
            this.investmentData = {
                investments: [],
                userInvestments: [],
                totalInvestments: 0,
                totalProfit: 0,
                dailyProfit: 0,
                packages: {
                    bronze: {
                        name: 'Bronze Package',
                        minAmount: 1000,
                        maxAmount: 19999,
                        dailyProfit: 0.4,
                        contractPeriod: 36,
                        color: 'warning',
                        icon: 'fas fa-coins'
                    },
                    silver: {
                        name: 'Silver Package',
                        minAmount: 20000,
                        maxAmount: 99999,
                        dailyProfit: 0.5,
                        contractPeriod: 36,
                        color: 'secondary',
                        icon: 'fas fa-medal'
                    },
                    gold: {
                        name: 'Gold Package',
                        minAmount: 100000,
                        maxAmount: 999999,
                        dailyProfit: 0.6,
                        contractPeriod: 36,
                        color: 'warning',
                        icon: 'fas fa-crown'
                    },
                    platinum: {
                        name: 'Platinum Package',
                        minAmount: 1000000,
                        maxAmount: 9999999,
                        dailyProfit: 0.7,
                        contractPeriod: 36,
                        color: 'info',
                        icon: 'fas fa-gem'
                    },
                    diamond: {
                        name: 'Diamond Package',
                        minAmount: 10000000,
                        maxAmount: 99999999,
                        dailyProfit: 0.8,
                        contractPeriod: 36,
                        color: 'primary',
                        icon: 'fas fa-diamond'
                    }
                }
            };
            this.addSampleInvestments();
        }
        console.log('💰 Loaded investment data:', this.investmentData);
    },

    // Save investment data to localStorage
    saveInvestmentData() {
        localStorage.setItem('investmentData', JSON.stringify(this.investmentData));
        // Dispatch storage event for cross-tab synchronization
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'investmentData',
            newValue: localStorage.getItem('investmentData')
        }));
    },

    // Add sample investments for demonstration
    addSampleInvestments() {
        const sampleInvestments = [
            {
                id: '1',
                packageType: 'bronze',
                amount: 5000,
                startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days from now
                dailyProfit: 20,
                totalProfit: 140,
                status: 'active',
                user: 'demo',
                walletAddress: '0x1234...5678'
            },
            {
                id: '2',
                packageType: 'silver',
                amount: 25000,
                startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                endDate: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000).toISOString(), // 33 days from now
                dailyProfit: 125,
                totalProfit: 375,
                status: 'active',
                user: 'demo',
                walletAddress: '0x1234...5678'
            }
        ];

        this.investmentData.investments = sampleInvestments;
        this.investmentData.userInvestments = sampleInvestments;
        this.calculateStats();
        this.saveInvestmentData();
        console.log('✅ Added sample investments');
    },

    // Calculate investment statistics
    calculateStats() {
        const investments = this.investmentData.investments.filter(inv => inv.status === 'active');
        this.investmentData.totalInvestments = investments.length;
        this.investmentData.totalProfit = investments.reduce((sum, inv) => sum + inv.totalProfit, 0);
        this.investmentData.dailyProfit = investments.reduce((sum, inv) => sum + inv.dailyProfit, 0);
    },

    // Create a new investment
    createInvestment(packageType, amount) {
        const packageInfo = this.investmentData.packages[packageType];
        if (!packageInfo) {
            console.error('❌ Invalid package type:', packageType);
            return null;
        }

        // Validate amount
        if (amount < packageInfo.minAmount || amount > packageInfo.maxAmount) {
            this.showNotification(`Amount must be between ${packageInfo.minAmount.toLocaleString()} and ${packageInfo.maxAmount.toLocaleString()} PPO`, true);
            return null;
        }

        // Check if user has enough PPO
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        if (userStats.ppoBalance < amount) {
            this.showNotification('Insufficient PPO balance!', true);
            return null;
        }

        // Deduct PPO
        userStats.ppoBalance -= amount;
        localStorage.setItem('userStats', JSON.stringify(userStats));

        // Calculate daily profit
        const dailyProfit = (amount * packageInfo.dailyProfit) / 100;

        // Create investment
        const newInvestment = {
            id: Date.now().toString(),
            packageType: packageType,
            amount: amount,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + packageInfo.contractPeriod * 30 * 24 * 60 * 60 * 1000).toISOString(),
            dailyProfit: dailyProfit,
            totalProfit: 0,
            status: 'active',
            user: localStorage.getItem('walletAddress') || 'demo',
            walletAddress: localStorage.getItem('walletAddress') || 'demo'
        };

        this.investmentData.investments.push(newInvestment);
        this.investmentData.userInvestments.push(newInvestment);
        this.calculateStats();
        this.saveInvestmentData();
        this.updateInvestmentDisplay();
        
        // Dispatch event for other systems
        const event = new CustomEvent('investmentCreated', {
            detail: { investment: newInvestment }
        });
        window.dispatchEvent(event);

        console.log('✅ Created new investment:', newInvestment);
        return newInvestment;
    },

    // Calculate daily profits for all active investments
    calculateDailyProfits() {
        const activeInvestments = this.investmentData.investments.filter(inv => inv.status === 'active');
        
        activeInvestments.forEach(investment => {
            // Add daily profit to total profit
            investment.totalProfit += investment.dailyProfit;
            
            // Check if investment period has ended
            const endDate = new Date(investment.endDate);
            if (new Date() >= endDate) {
                investment.status = 'completed';
                // Add final profit to user's PPO balance
                this.addProfitToUser(investment.totalProfit);
            }
        });

        this.calculateStats();
        this.saveInvestmentData();
        this.updateInvestmentDisplay();
        
        console.log('💰 Calculated daily profits for', activeInvestments.length, 'investments');
    },

    // Add profit to user's PPO balance
    addProfitToUser(profit) {
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        userStats.ppoBalance = (userStats.ppoBalance || 0) + profit;
        userStats.totalEarnings = (userStats.totalEarnings || 0) + profit;
        localStorage.setItem('userStats', JSON.stringify(userStats));
        
        console.log('💰 Added profit to user balance:', profit);
    },

    // Withdraw investment (early withdrawal with penalty)
    withdrawInvestment(investmentId) {
        const investment = this.investmentData.investments.find(inv => inv.id === investmentId);
        if (!investment || investment.status !== 'active') {
            console.error('❌ Investment not found or not active:', investmentId);
            return null;
        }

        // Calculate penalty (50% of remaining profit)
        const penalty = investment.totalProfit * 0.5;
        const withdrawalAmount = investment.amount + (investment.totalProfit - penalty);

        // Add withdrawal amount to user's PPO balance
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        userStats.ppoBalance = (userStats.ppoBalance || 0) + withdrawalAmount;
        localStorage.setItem('userStats', JSON.stringify(userStats));

        // Mark investment as withdrawn
        investment.status = 'withdrawn';
        investment.withdrawalAmount = withdrawalAmount;
        investment.penalty = penalty;

        this.calculateStats();
        this.saveInvestmentData();
        this.updateInvestmentDisplay();

        // Dispatch event
        const event = new CustomEvent('investmentWithdrawn', {
            detail: { investment, withdrawalAmount, penalty }
        });
        window.dispatchEvent(event);

        console.log('✅ Withdrew investment:', investment, 'Amount:', withdrawalAmount, 'Penalty:', penalty);
        return { investment, withdrawalAmount, penalty };
    },

    // Update investment display
    updateInvestmentDisplay() {
        this.updateInvestmentStats();
        this.updateInvestmentGrid();
        this.updateUserInvestments();
    },

    // Update investment statistics
    updateInvestmentStats() {
        const totalInvestmentsEl = document.getElementById('totalInvestments');
        const totalProfitEl = document.getElementById('totalProfit');
        const dailyProfitEl = document.getElementById('dailyProfit');

        if (totalInvestmentsEl) totalInvestmentsEl.textContent = this.investmentData.totalInvestments.toLocaleString();
        if (totalProfitEl) totalProfitEl.textContent = this.investmentData.totalProfit.toLocaleString() + ' PPO';
        if (dailyProfitEl) dailyProfitEl.textContent = this.investmentData.dailyProfit.toLocaleString() + ' PPO';
    },

    // Update investment grid
    updateInvestmentGrid() {
        const grid = document.getElementById('investmentGrid');
        if (!grid) return;

        const packages = Object.keys(this.investmentData.packages);
        grid.innerHTML = '';

        packages.forEach(packageType => {
            const packageInfo = this.investmentData.packages[packageType];
            const packageCard = this.createPackageCard(packageType, packageInfo);
            grid.appendChild(packageCard);
        });
    },

    // Create package card element
    createPackageCard(packageType, packageInfo) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="package-card bg-dark border border-${packageInfo.color} rounded p-4 text-center">
                <div class="package-icon mb-3">
                    <i class="${packageInfo.icon} fa-3x text-${packageInfo.color}"></i>
                </div>
                <h4 class="text-white mb-3">${packageInfo.name}</h4>
                <h2 class="text-${packageInfo.color} mb-3">$${packageInfo.minAmount.toLocaleString()} - $${packageInfo.maxAmount.toLocaleString()}</h2>
                <div class="package-details mb-4">
                    <div class="detail-item d-flex justify-content-between mb-2">
                        <span class="text-white-50">Daily Profit:</span>
                        <span class="text-success">${packageInfo.dailyProfit}%</span>
                    </div>
                    <div class="detail-item d-flex justify-content-between mb-2">
                        <span class="text-white-50">Contract Period:</span>
                        <span class="text-info">${packageInfo.contractPeriod} months</span>
                    </div>
                    <div class="detail-item d-flex justify-content-between mb-2">
                        <span class="text-white-50">Min Investment:</span>
                        <span class="text-${packageInfo.color}">$${packageInfo.minAmount.toLocaleString()}</span>
                    </div>
                    <div class="detail-item d-flex justify-content-between">
                        <span class="text-white-50">Max Investment:</span>
                        <span class="text-${packageInfo.color}">$${packageInfo.maxAmount.toLocaleString()}</span>
                    </div>
                </div>
                <button class="btn btn-${packageInfo.color} btn-lg w-100 invest-btn" onclick="InvestmentIntegration.showInvestmentModal('${packageType}')">
                    <i class="fas fa-coins me-2"></i>Invest Now
                </button>
            </div>
        `;
        
        return col;
    },

    // Update user investments
    updateUserInvestments() {
        const userInvestmentsEl = document.getElementById('userInvestments');
        if (!userInvestmentsEl) return;

        const userInvestments = this.investmentData.userInvestments;
        userInvestmentsEl.innerHTML = '';

        if (userInvestments.length === 0) {
            userInvestmentsEl.innerHTML = '<p class="text-white-50 text-center">No investments yet. Start investing to see your portfolio here.</p>';
            return;
        }

        userInvestments.forEach(investment => {
            const investmentCard = this.createUserInvestmentCard(investment);
            userInvestmentsEl.appendChild(investmentCard);
        });
    },

    // Create user investment card
    createUserInvestmentCard(investment) {
        const packageInfo = this.investmentData.packages[investment.packageType];
        const col = document.createElement('div');
        col.className = 'col-lg-6 mb-4';
        
        const statusBadge = investment.status === 'active' ? 
            '<span class="badge bg-success">Active</span>' : 
            investment.status === 'completed' ? 
            '<span class="badge bg-primary">Completed</span>' : 
            '<span class="badge bg-warning">Withdrawn</span>';

        col.innerHTML = `
            <div class="investment-card bg-dark border border-primary rounded p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="text-white mb-0">${packageInfo.name}</h5>
                    ${statusBadge}
                </div>
                <div class="investment-details">
                    <div class="row text-center">
                        <div class="col-4">
                            <div class="text-primary fw-bold">${investment.amount.toLocaleString()}</div>
                            <small class="text-white-50">Invested</small>
                        </div>
                        <div class="col-4">
                            <div class="text-success fw-bold">${investment.dailyProfit.toFixed(2)}</div>
                            <small class="text-white-50">Daily Profit</small>
                        </div>
                        <div class="col-4">
                            <div class="text-warning fw-bold">${investment.totalProfit.toFixed(2)}</div>
                            <small class="text-white-50">Total Profit</small>
                        </div>
                    </div>
                    <div class="mt-3">
                        <small class="text-white-50">Started: ${new Date(investment.startDate).toLocaleDateString()}</small><br>
                        <small class="text-white-50">Ends: ${new Date(investment.endDate).toLocaleDateString()}</small>
                    </div>
                    ${investment.status === 'active' ? `
                        <div class="mt-3">
                            <button class="btn btn-outline-warning btn-sm" onclick="InvestmentIntegration.withdrawInvestment('${investment.id}')">
                                <i class="fas fa-arrow-down me-2"></i>Withdraw (50% Penalty)
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        return col;
    },

    // Show investment modal
    showInvestmentModal(packageType) {
        const packageInfo = this.investmentData.packages[packageType];
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'investmentModal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-white">Invest in ${packageInfo.name}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="investmentForm">
                            <div class="mb-3">
                                <label class="form-label text-white">Investment Amount (PPO)</label>
                                <input type="number" class="form-control" name="amount" min="${packageInfo.minAmount}" max="${packageInfo.maxAmount}" required>
                                <small class="text-white-50">Min: ${packageInfo.minAmount.toLocaleString()} PPO, Max: ${packageInfo.maxAmount.toLocaleString()} PPO</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Daily Profit Rate</label>
                                <input type="text" class="form-control" value="${packageInfo.dailyProfit}%" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Contract Period</label>
                                <input type="text" class="form-control" value="${packageInfo.contractPeriod} months" readonly>
                            </div>
                            <div class="alert alert-info">
                                <small class="text-white-50">
                                    <strong>Note:</strong> Early withdrawal incurs a 50% penalty on accumulated profits.
                                </small>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="InvestmentIntegration.handleInvestment('${packageType}')">Invest</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    // Handle investment form submission
    handleInvestment(packageType) {
        const form = document.getElementById('investmentForm');
        const formData = new FormData(form);
        const amount = parseFloat(formData.get('amount'));

        const investment = this.createInvestment(packageType, amount);
        if (investment) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('investmentModal'));
            modal.hide();
            this.showNotification('Investment created successfully!', false);
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Listen for storage events (cross-tab synchronization)
        window.addEventListener('storage', (e) => {
            if (e.key === 'investmentData') {
                this.loadInvestmentData();
                this.updateInvestmentDisplay();
            }
        });

        // Listen for investment-related events
        window.addEventListener('investmentCreated', (e) => {
            console.log('💰 Investment created event received:', e.detail);
        });

        window.addEventListener('investmentWithdrawn', (e) => {
            console.log('💰 Investment withdrawn event received:', e.detail);
        });
    },

    // Start profit calculation timer
    startProfitCalculation() {
        // Calculate profits every hour
        setInterval(() => {
            this.calculateDailyProfits();
        }, 60 * 60 * 1000); // Every hour

        // Also calculate on page load
        this.calculateDailyProfits();
    },

    // Setup periodic updates
    setupPeriodicUpdates() {
        setInterval(() => {
            this.updateInvestmentDisplay();
        }, 30000); // Update every 30 seconds
    },

    // Show notification
    showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${isError ? 'danger' : 'success'} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    },


};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    InvestmentIntegration.init();
});

// Make available globally
window.InvestmentIntegration = InvestmentIntegration;
