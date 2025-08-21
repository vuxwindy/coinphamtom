// Investment JavaScript - COINPAYOT NFT
// Xử lý hệ thống đầu tư NFT hoàn chỉnh

// ========================================
// STATE MANAGEMENT
// ========================================
let investmentState = {
    currentUser: null,
    investments: [],
    profitHistory: [],
    selectedPackage: null,
    loading: false
};

// Package configurations
const PACKAGE_CONFIGS = {
    bronze: {
        name: 'Bronze',
        minAmount: 1000,
        maxAmount: 19999,
        dailyRate: 0.004, // 0.4%
        color: 'warning'
    },
    silver: {
        name: 'Silver',
        minAmount: 20000,
        maxAmount: 99999,
        dailyRate: 0.005, // 0.5%
        color: 'secondary'
    },
    gold: {
        name: 'Gold',
        minAmount: 100000,
        maxAmount: Infinity,
        dailyRate: 0.006, // 0.6%
        color: 'warning'
    }
};

// ========================================
// INITIALIZATION
// ========================================

// Initialize investment page
async function initInvestment() {
    try {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            showNotification('Please connect your wallet or sign in to access investment features', true);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            return;
        }
        
        investmentState.currentUser = currentUser;
        
        // Load user investments
        await loadUserInvestments();
        
        // Load profit history
        await loadProfitHistory();
        
        // Update investment stats
        updateInvestmentStats();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing investment:', error);
        showNotification('Failed to initialize investment system', true);
    }
}

// Get current user
function getCurrentUser() {
    const userUid = localStorage.getItem('userUid');
    const walletAddress = localStorage.getItem('walletAddress');
    
    if (userUid) {
        return { uid: userUid, type: 'email' };
    } else if (walletAddress) {
        return { uid: `wallet_${walletAddress.toLowerCase()}`, type: 'wallet', walletAddress };
    }
    
    return null;
}

// ========================================
// INVESTMENT LOADING
// ========================================

// Load user investments
async function loadUserInvestments() {
    try {
        setLoadingState(true);
        
        const result = await window.FirebaseService.getUserInvestments(investmentState.currentUser.uid);
        
        if (result.success) {
            investmentState.investments = result.data;
            renderInvestmentsTable(result.data);
        } else {
            renderInvestmentsTable([]);
        }
        
    } catch (error) {
        console.error('Error loading investments:', error);
        showNotification('Failed to load investments', true);
        renderInvestmentsTable([]);
    } finally {
        setLoadingState(false);
    }
}

// Render investments table
function renderInvestmentsTable(investments) {
    const tableBody = document.getElementById('investmentsTableBody');
    const emptyState = document.getElementById('emptyState');
    const investmentsTable = document.getElementById('investmentsTable');
    
    if (investments.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.remove('d-none');
        investmentsTable.classList.add('d-none');
        return;
    }
    
    emptyState.classList.add('d-none');
    investmentsTable.classList.remove('d-none');
    
    tableBody.innerHTML = investments.map(investment => {
        const packageConfig = PACKAGE_CONFIGS[investment.package];
        const dailyProfit = investment.amount * packageConfig.dailyRate;
        const totalProfit = investment.totalProfit || 0;
        const startDate = new Date(investment.createdAt.toDate ? investment.createdAt.toDate() : investment.createdAt);
        
        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="package-badge me-3 bg-${packageConfig.color} text-white px-2 py-1 rounded">
                            ${packageConfig.name}
                        </div>
                        <div>
                            <div class="text-white">${packageConfig.name} Package</div>
                            <small class="text-white-50">${(packageConfig.dailyRate * 100).toFixed(1)}% daily</small>
                        </div>
                    </div>
                </td>
                <td class="text-success">$${investment.amount.toLocaleString()}</td>
                <td class="text-info">${(packageConfig.dailyRate * 100).toFixed(1)}%</td>
                <td class="text-warning">${dailyProfit.toFixed(2)} $PPO</td>
                <td class="text-primary">${totalProfit.toFixed(2)} $PPO</td>
                <td class="text-white-50">${formatDate(startDate)}</td>
                <td>
                    <span class="badge bg-success">Active</span>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary" onclick="withdrawProfit('${investment.id}')">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-info" onclick="viewDetails('${investment.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ========================================
// PROFIT HISTORY
// ========================================

// Load profit history
async function loadProfitHistory() {
    try {
        setLoadingState(true);
        
        // Get transaction history for investment profits
        const result = await window.FirebaseService.getTransactionHistory(investmentState.currentUser.uid, 100);
        
        if (result.success) {
            const investmentTransactions = result.data.filter(tx => tx.type === 'investment');
            investmentState.profitHistory = investmentTransactions;
            renderProfitHistory(investmentTransactions);
            updateProfitStats(investmentTransactions);
        }
        
    } catch (error) {
        console.error('Error loading profit history:', error);
        showNotification('Failed to load profit history', true);
    } finally {
        setLoadingState(false);
    }
}

// Render profit history
function renderProfitHistory(profits) {
    const tableBody = document.getElementById('profitHistoryTableBody');
    
    if (profits.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-white-50 py-4">
                    <i class="fas fa-chart-line fa-2x mb-3"></i>
                    <p>No profit history yet</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = profits.map(profit => {
        const profitDate = new Date(profit.timestamp.toDate ? profit.timestamp.toDate() : profit.timestamp);
        const packageConfig = PACKAGE_CONFIGS[profit.package] || { dailyRate: 0 };
        
        return `
            <tr>
                <td class="text-white-50">${formatDate(profitDate)}</td>
                <td>
                    <div class="text-white">$${profit.investmentAmount?.toLocaleString() || 'N/A'}</div>
                    <small class="text-white-50">${profit.package || 'Unknown'} Package</small>
                </td>
                <td class="text-info">${(packageConfig.dailyRate * 100).toFixed(1)}%</td>
                <td class="text-success">${profit.amount} $PPO</td>
                <td>
                    <span class="badge bg-success">Paid</span>
                </td>
            </tr>
        `;
    }).join('');
}

// Update profit stats
function updateProfitStats(profits) {
    const totalEarned = profits.reduce((sum, profit) => sum + profit.amount, 0);
    
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthProfits = profits.filter(profit => {
        const profitDate = new Date(profit.timestamp.toDate ? profit.timestamp.toDate() : profit.timestamp);
        return profitDate.getMonth() === thisMonth && profitDate.getFullYear() === thisYear;
    });
    const thisMonthTotal = thisMonthProfits.reduce((sum, profit) => sum + profit.amount, 0);
    
    document.getElementById('totalEarned').textContent = totalEarned.toFixed(2);
    document.getElementById('thisMonthProfit').textContent = thisMonthTotal.toFixed(2);
    document.getElementById('pendingWithdrawal').textContent = '0.00';
    document.getElementById('totalWithdrawn').textContent = '0.00';
}

// ========================================
// INVESTMENT CREATION
// ========================================

// Open investment modal
function openInvestmentModal(packageType) {
    const packageConfig = PACKAGE_CONFIGS[packageType];
    if (!packageConfig) {
        showNotification('Invalid package type', true);
        return;
    }
    
    investmentState.selectedPackage = packageType;
    
    // Update modal content
    document.getElementById('packageName').textContent = packageConfig.name;
    document.getElementById('minAmount').textContent = packageConfig.minAmount.toLocaleString();
    document.getElementById('maxAmount').textContent = packageConfig.maxAmount === Infinity ? 'Unlimited' : packageConfig.maxAmount.toLocaleString();
    document.getElementById('dailyProfit').value = `${(packageConfig.dailyRate * 100).toFixed(1)}%`;
    
    // Reset form
    document.getElementById('investmentAmount').value = '';
    document.getElementById('estimatedDailyProfit').value = '';
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('investmentModal'));
    modal.show();
}

// Calculate estimated daily profit
async function calculateEstimatedProfit() {
    const amount = parseFloat(document.getElementById('investmentAmount').value) || 0;
    const packageType = investmentState.selectedPackage;
    
    if (packageType && amount > 0) {
        const packageConfig = PACKAGE_CONFIGS[packageType];
        const dailyProfit = amount * packageConfig.dailyRate;
        const requiredPPO = Math.ceil(amount * 0.1); // 10% of investment amount
        
        document.getElementById('estimatedDailyProfit').value = `${dailyProfit.toFixed(2)} $PPO`;
        
        // Update PPO requirement display
        const ppoRequirementElement = document.getElementById('ppoRequirement');
        if (ppoRequirementElement) {
            ppoRequirementElement.textContent = `${requiredPPO} PPO`;
            
            // Check if user has enough PPO
            try {
                const balanceResult = await window.FirebaseService.getTokenBalance(investmentState.currentUser.uid);
                if (balanceResult.success) {
                    const currentBalance = balanceResult.data.ppoBalance || 0;
                    const hasEnoughPPO = currentBalance >= requiredPPO;
                    
                    ppoRequirementElement.className = hasEnoughPPO ? 'text-success' : 'text-danger';
                    ppoRequirementElement.innerHTML = `${requiredPPO} PPO <small>(${hasEnoughPPO ? 'Sufficient' : 'Insufficient'} - Balance: ${currentBalance})</small>`;
                }
            } catch (error) {
                console.error('Error checking PPO balance:', error);
            }
        }
    } else {
        document.getElementById('estimatedDailyProfit').value = '';
        const ppoRequirementElement = document.getElementById('ppoRequirement');
        if (ppoRequirementElement) {
            ppoRequirementElement.textContent = '0 PPO';
            ppoRequirementElement.className = 'text-white-50';
        }
    }
}

// Confirm investment
async function confirmInvestment() {
    try {
        const amount = parseFloat(document.getElementById('investmentAmount').value);
        const packageType = investmentState.selectedPackage;
        
        if (!amount || amount <= 0) {
            showNotification('Please enter a valid investment amount', true);
            return;
        }
        
        const packageConfig = PACKAGE_CONFIGS[packageType];
        if (amount < packageConfig.minAmount) {
            showNotification(`Minimum investment for ${packageConfig.name} package is $${packageConfig.minAmount.toLocaleString()}`, true);
            return;
        }
        
        if (packageConfig.maxAmount !== Infinity && amount > packageConfig.maxAmount) {
            showNotification(`Maximum investment for ${packageConfig.name} package is $${packageConfig.maxAmount.toLocaleString()}`, true);
            return;
        }
        
        // Check PPO balance before creating investment
        const balanceResult = await window.FirebaseService.getTokenBalance(investmentState.currentUser.uid);
        if (!balanceResult.success) {
            showNotification('Failed to check PPO balance', true);
            return;
        }
        
        const currentBalance = balanceResult.data.ppoBalance || 0;
        const requiredPPO = Math.ceil(amount * 0.1); // 10% of investment amount in PPO
        
        if (currentBalance < requiredPPO) {
            showNotification(`Insufficient PPO balance! You need ${requiredPPO} PPO to invest $${amount.toLocaleString()}. Current balance: ${currentBalance} PPO`, true);
            
            // Show earn PPO modal
            setTimeout(() => {
                showEarnPPOModal();
            }, 2000);
            return;
        }
        
        // Confirm investment with user
        const confirmMessage = `Are you sure you want to invest $${amount.toLocaleString()}?\n\nThis will deduct ${requiredPPO} PPO from your balance.\n\nCurrent PPO Balance: ${currentBalance}\nRequired PPO: ${requiredPPO}\nRemaining PPO: ${currentBalance - requiredPPO}`;
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // Deduct PPO from balance first
        const deductResult = await window.FirebaseService.updateTokenBalance(
            investmentState.currentUser.uid, 
            requiredPPO, 
            'subtract'
        );
        
        if (!deductResult.success) {
            showNotification('Failed to deduct PPO from balance', true);
            return;
        }
        
        // Create investment
        const investmentData = {
            package: packageType,
            amount: amount,
            dailyRate: packageConfig.dailyRate,
            status: 'active',
            totalProfit: 0,
            ppoUsed: requiredPPO,
            createdAt: new Date()
        };
        
        const result = await window.FirebaseService.createInvestment(investmentState.currentUser.uid, investmentData);
        
        if (result.success) {
            showNotification(`Investment created successfully! ${requiredPPO} PPO deducted from your balance.`);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('investmentModal'));
            modal.hide();
            
            // Reload investments
            await loadUserInvestments();
            await loadProfitHistory();
            updateInvestmentStats();
            
            // Process referral commission if applicable
            await processReferralCommission(amount);
            
        } else {
            // Refund PPO if investment creation failed
            await window.FirebaseService.updateTokenBalance(
                investmentState.currentUser.uid, 
                requiredPPO, 
                'add'
            );
            showNotification('Failed to create investment: ' + result.error, true);
        }
        
    } catch (error) {
        console.error('Error creating investment:', error);
        showNotification('An error occurred while creating investment', true);
    }
}

// Process referral commission
async function processReferralCommission(investmentAmount) {
    try {
        const result = await window.calculateCommissionForInvestment(investmentState.currentUser.uid, investmentAmount);
        if (result.success) {
            console.log('Referral commission processed:', result.data);
        }
    } catch (error) {
        console.error('Error processing referral commission:', error);
    }
}

// ========================================
// INVESTMENT ACTIONS
// ========================================

// Withdraw profit
async function withdrawProfit(investmentId) {
    try {
        const investment = investmentState.investments.find(inv => inv.id === investmentId);
        if (!investment) {
            showNotification('Investment not found', true);
            return;
        }
        
        const totalProfit = investment.totalProfit || 0;
        if (totalProfit <= 0) {
            showNotification('No profit available for withdrawal', true);
            return;
        }
        
        // Update investment profit to 0
        await window.FirebaseService.updateTokenBalance(investmentState.currentUser.uid, totalProfit, 'investment');
        
        // Log withdrawal transaction
        await window.FirebaseService.logTransaction(investmentState.currentUser.uid, {
            type: 'withdrawal',
            amount: totalProfit,
            investmentId: investmentId,
            description: `Withdrew ${totalProfit} $PPO profit from ${investment.package} investment`
        });
        
        showNotification(`Successfully withdrew ${totalProfit.toFixed(2)} $PPO`);
        
        // Reload data
        await loadUserInvestments();
        await loadProfitHistory();
        updateInvestmentStats();
        
    } catch (error) {
        console.error('Error withdrawing profit:', error);
        showNotification('Failed to withdraw profit', true);
    }
}

// View investment details
function viewDetails(investmentId) {
    const investment = investmentState.investments.find(inv => inv.id === investmentId);
    if (investment) {
        const packageConfig = PACKAGE_CONFIGS[investment.package];
        const details = `
Investment Details:
- Package: ${packageConfig.name}
- Amount: $${investment.amount.toLocaleString()}
- Daily Rate: ${(packageConfig.dailyRate * 100).toFixed(1)}%
- Daily Profit: ${(investment.amount * packageConfig.dailyRate).toFixed(2)} $PPO
- Total Profit: ${(investment.totalProfit || 0).toFixed(2)} $PPO
- Start Date: ${formatDate(new Date(investment.createdAt.toDate ? investment.createdAt.toDate() : investment.createdAt))}
        `;
        alert(details);
    }
}

// ========================================
// STATS UPDATES
// ========================================

// Update investment stats
function updateInvestmentStats() {
    const investments = investmentState.investments;
    const totalInvestments = investments.length;
    
    const totalProfit = investments.reduce((sum, inv) => sum + (inv.totalProfit || 0), 0);
    const dailyProfit = investments.reduce((sum, inv) => {
        const packageConfig = PACKAGE_CONFIGS[inv.package];
        return sum + (inv.amount * packageConfig.dailyRate);
    }, 0);
    
    document.getElementById('totalInvestments').textContent = totalInvestments;
    document.getElementById('totalProfit').textContent = `${totalProfit.toFixed(2)} $PPO`;
    document.getElementById('dailyProfit').textContent = `${dailyProfit.toFixed(2)} $PPO`;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format date
function formatDate(date) {
    if (!date) return 'N/A';
    
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const investmentsTable = document.getElementById('investmentsTable');
    const emptyState = document.getElementById('emptyState');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        investmentsTable.style.opacity = '0.5';
        emptyState.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        investmentsTable.style.opacity = '1';
        emptyState.style.opacity = '1';
    }
}

// Show notification
function showNotification(message, isError = false) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.alert');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
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
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Show earn PPO modal
function showEarnPPOModal() {
    const modalHtml = `
        <div class="modal fade" id="earnPPOModal" tabindex="-1" aria-labelledby="earnPPOModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark border border-primary">
                    <div class="modal-header border-primary">
                        <h5 class="modal-title text-white" id="earnPPOModalLabel">
                            <i class="fas fa-coins me-2"></i>How to Earn PPO
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info">
                            <h6 class="text-white"><i class="fas fa-info-circle me-2"></i>Investment Requirements</h6>
                            <p class="text-white-50 mb-0">To create an investment package, you need PPO tokens equal to 10% of your investment amount.</p>
                        </div>
                        
                        <h6 class="text-white mb-3">Ways to Earn PPO:</h6>
                        <div class="task-list">
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-calendar-check text-success me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Daily Check-in</strong>
                                    <div class="text-white-50">Complete daily check-in to earn 1 PPO per day</div>
                                </div>
                                <span class="badge bg-success">1 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-telegram text-info me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Join Telegram Group</strong>
                                    <div class="text-white-50">Join our official Telegram group</div>
                                </div>
                                <span class="badge bg-info">2 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-broadcast-tower text-primary me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Follow Telegram Channel</strong>
                                    <div class="text-white-50">Follow our official Telegram channel</div>
                                </div>
                                <span class="badge bg-primary">2 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-facebook text-primary me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Like Facebook Page</strong>
                                    <div class="text-white-50">Like and follow our Facebook page</div>
                                </div>
                                <span class="badge bg-primary">2 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-twitter text-info me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Follow Twitter</strong>
                                    <div class="text-white-50">Follow our official Twitter account</div>
                                </div>
                                <span class="badge bg-info">2 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-share-alt text-warning me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Share on Social Media</strong>
                                    <div class="text-white-50">Share our platform on your social media</div>
                                </div>
                                <span class="badge bg-warning">3 PPO</span>
                            </div>
                            
                            <div class="task-item d-flex align-items-center mb-3 p-3 bg-light bg-opacity-10 rounded">
                                <i class="fas fa-star text-warning me-3 fa-lg"></i>
                                <div class="flex-grow-1">
                                    <strong class="text-white">Level Up in Games</strong>
                                    <div class="text-white-50">Earn PPO by playing games and leveling up</div>
                                </div>
                                <span class="badge bg-warning">2 PPO/level</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-primary">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a href="tasks-section.html" class="btn btn-primary">
                            <i class="fas fa-tasks me-2"></i>Go to Daily Tasks
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('earnPPOModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('earnPPOModal'));
    modal.show();
    
    // Remove modal from DOM when hidden
    document.getElementById('earnPPOModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Scroll to packages
function scrollToPackages() {
    document.getElementById('investment-packages').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// ========================================
// EVENT LISTENERS
// ========================================

// Setup event listeners
function setupEventListeners() {
    // Investment buttons
    const investButtons = document.querySelectorAll('.invest-btn');
    investButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const packageType = e.target.dataset.package;
            openInvestmentModal(packageType);
        });
    });
    
    // Investment amount input
    const investmentAmount = document.getElementById('investmentAmount');
    investmentAmount.addEventListener('input', calculateEstimatedProfit);
    
    // Confirm investment button
    document.getElementById('confirmInvestment').addEventListener('click', confirmInvestment);
    
    // Refresh investments button
    document.getElementById('refreshInvestments').addEventListener('click', async () => {
        await loadUserInvestments();
        await loadProfitHistory();
        updateInvestmentStats();
    });
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initInvestment);

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    .package-badge {
        font-size: 0.75rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(style); 