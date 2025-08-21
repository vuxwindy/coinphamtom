// Referral JavaScript - COINPAYOT NFT
// Xử lý hệ thống referral hoàn chỉnh

// ========================================
// STATE MANAGEMENT
// ========================================
let referralState = {
    currentUser: null,
    referralData: null,
    referrals: [],
    commissionHistory: [],
    loading: false
};

// ========================================
// INITIALIZATION
// ========================================

// Initialize referral page
async function initReferral() {
    try {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            showNotification('Please connect your wallet or sign in to access referral program', true);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            return;
        }
        
        referralState.currentUser = currentUser;
        
        // Load referral data
        await loadReferralData();
        
        // Load referrals list
        await loadReferralsList();
        
        // Load commission history
        await loadCommissionHistory();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing referral:', error);
        showNotification('Failed to initialize referral program', true);
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
// REFERRAL DATA LOADING
// ========================================

// Load referral data
async function loadReferralData() {
    try {
        setLoadingState(true);
        
        const result = await window.FirebaseService.getReferralData(referralState.currentUser.uid);
        
        if (result.success) {
            referralState.referralData = result.data;
            updateReferralUI(result.data);
        } else {
            // Generate new referral data if not exists
            const generateResult = await window.FirebaseService.generateReferralCode(referralState.currentUser.uid);
            if (generateResult.success) {
                referralState.referralData = generateResult.data;
                updateReferralUI(generateResult.data);
            }
        }
        
    } catch (error) {
        console.error('Error loading referral data:', error);
        showNotification('Failed to load referral data', true);
    } finally {
        setLoadingState(false);
    }
}

// Update referral UI
function updateReferralUI(referralData) {
    // Update referral link
    const referralLink = `${window.location.origin}/signup.html?ref=${referralData.referralCode}`;
    document.getElementById('referralLink').value = referralLink;
    
    // Update stats
    document.getElementById('totalReferrals').textContent = referralData.totalReferrals || 0;
    
    // Update earnings (will be calculated from commission history)
    updateEarningsDisplay();
}

// Update earnings display
async function updateEarningsDisplay() {
    try {
        const tokenResult = await window.FirebaseService.getTokenBalance(referralState.currentUser.uid);
        
        if (tokenResult.success) {
            const tokenData = tokenResult.data;
            document.getElementById('totalEarnings').textContent = `${tokenData.referralEarnings || 0} $PPO`;
            document.getElementById('availableRewards').textContent = `${tokenData.ppoBalance || 0} $PPO`;
        }
    } catch (error) {
        console.error('Error updating earnings display:', error);
    }
}

// ========================================
// REFERRALS LIST
// ========================================

// Load referrals list
async function loadReferralsList() {
    try {
        setLoadingState(true);
        
        // Get referrals from referral data
        if (referralState.referralData && referralState.referralData.referrals) {
            referralState.referrals = referralState.referralData.referrals;
            renderReferralsTable(referralState.referrals);
        } else {
            renderReferralsTable([]);
        }
        
    } catch (error) {
        console.error('Error loading referrals list:', error);
        showNotification('Failed to load referrals list', true);
    } finally {
        setLoadingState(false);
    }
}

// Render referrals table
function renderReferralsTable(referrals) {
    const tableBody = document.getElementById('referralsTableBody');
    const emptyState = document.getElementById('emptyState');
    const referralsTable = document.getElementById('referralsTable');
    
    if (referrals.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.remove('d-none');
        referralsTable.classList.add('d-none');
        return;
    }
    
    emptyState.classList.add('d-none');
    referralsTable.classList.remove('d-none');
    
    tableBody.innerHTML = referrals.map(referral => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-sm me-3">
                        <i class="fas fa-user-circle fa-2x text-primary"></i>
                    </div>
                    <div>
                        <div class="text-white">User ${referral.uid.slice(-6)}</div>
                        <small class="text-white-50">${referral.uid}</small>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge bg-primary">F${referral.level}</span>
            </td>
            <td class="text-white-50">${formatDate(referral.joinedAt)}</td>
            <td class="text-success">$0.00</td>
                                <td class="text-warning">0 $PPO</td>
            <td>
                <span class="badge bg-success">Active</span>
            </td>
        </tr>
    `).join('');
}

// Filter referrals
function filterReferrals(level) {
    let filteredReferrals = [];
    
    if (level === 'all') {
        filteredReferrals = referralState.referrals;
    } else {
        const levelNumber = parseInt(level.replace('f', ''));
        filteredReferrals = referralState.referrals.filter(ref => ref.level === levelNumber);
    }
    
    renderReferralsTable(filteredReferrals);
}

// ========================================
// COMMISSION HISTORY
// ========================================

// Load commission history
async function loadCommissionHistory() {
    try {
        setLoadingState(true);
        
        // Get transaction history for referral commissions
        const result = await window.FirebaseService.getTransactionHistory(referralState.currentUser.uid, 100);
        
        if (result.success) {
            const referralTransactions = result.data.filter(tx => tx.type === 'referral');
            referralState.commissionHistory = referralTransactions;
            renderCommissionHistory(referralTransactions);
            updateCommissionStats(referralTransactions);
        }
        
    } catch (error) {
        console.error('Error loading commission history:', error);
        showNotification('Failed to load commission history', true);
    } finally {
        setLoadingState(false);
    }
}

// Render commission history
function renderCommissionHistory(commissions) {
    const tableBody = document.getElementById('commissionHistoryTableBody');
    
    if (commissions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-white-50 py-4">
                    <i class="fas fa-chart-line fa-2x mb-3"></i>
                    <p>No commission history yet</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = commissions.map(commission => `
        <tr>
            <td class="text-white-50">${formatDate(commission.timestamp)}</td>
            <td>
                <div class="text-white">User ${commission.referralUid ? commission.referralUid.slice(-6) : 'N/A'}</div>
                <small class="text-white-50">F${commission.level || 1}</small>
            </td>
            <td>
                <span class="badge bg-primary">F${commission.level || 1}</span>
            </td>
            <td class="text-success">$${commission.investmentAmount || 0}</td>
            <td class="text-warning">${commission.percentage || 15}%</td>
                            <td class="text-primary">${commission.amount} $PPO</td>
            <td>
                <span class="badge bg-success">Paid</span>
            </td>
        </tr>
    `).join('');
}

// Update commission stats
function updateCommissionStats(commissions) {
    const totalCommissions = commissions.length;
    const pendingCommissions = commissions.filter(c => c.status === 'pending').length;
    const paidCommissions = commissions.filter(c => c.status === 'paid').length;
    
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const thisMonthCommissions = commissions.filter(c => {
        const txDate = new Date(c.timestamp.toDate ? c.timestamp.toDate() : c.timestamp);
        return txDate.getMonth() === thisMonth && txDate.getFullYear() === thisYear;
    }).length;
    
    document.getElementById('totalCommissions').textContent = totalCommissions;
    document.getElementById('pendingCommissions').textContent = pendingCommissions;
    document.getElementById('paidCommissions').textContent = paidCommissions;
    document.getElementById('thisMonthCommissions').textContent = thisMonthCommissions;
}

// ========================================
// SHARING FUNCTIONS
// ========================================

// Copy referral link
async function copyReferralLink() {
    const referralLink = document.getElementById('referralLink');
    
    try {
        await navigator.clipboard.writeText(referralLink.value);
        showNotification('Referral link copied to clipboard!');
        
        // Update button text temporarily
        const copyBtn = document.getElementById('copyLinkBtn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Error copying link:', error);
        showNotification('Failed to copy link', true);
    }
}

// Share on Telegram
function shareOnTelegram() {
    const referralLink = document.getElementById('referralLink').value;
    const text = encodeURIComponent(`Join COINPAYOT NFT and earn $PPO tokens! Use my referral link: ${referralLink}`);
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`;
    window.open(url, '_blank');
}

// Share on Twitter
function shareOnTwitter() {
    const referralLink = document.getElementById('referralLink').value;
    const text = encodeURIComponent(`Join COINPAYOT NFT and earn $PPO tokens! Use my referral link: ${referralLink}`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
}

// Share on Facebook
function shareOnFacebook() {
    const referralLink = document.getElementById('referralLink').value;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format date
function formatDate(date) {
    if (!date) return 'N/A';
    
    const d = new Date(date.toDate ? date.toDate() : date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const referralsTable = document.getElementById('referralsTable');
    const emptyState = document.getElementById('emptyState');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        referralsTable.style.opacity = '0.5';
        emptyState.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        referralsTable.style.opacity = '1';
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

// ========================================
// EVENT LISTENERS
// ========================================

// Setup event listeners
function setupEventListeners() {
    // Copy referral link
    document.getElementById('copyLinkBtn').addEventListener('click', copyReferralLink);
    
    // Share buttons
    document.getElementById('shareTelegramBtn').addEventListener('click', shareOnTelegram);
    document.getElementById('shareTwitterBtn').addEventListener('click', shareOnTwitter);
    document.getElementById('shareFacebookBtn').addEventListener('click', shareOnFacebook);
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Filter referrals
            filterReferrals(e.target.dataset.filter);
        });
    });
}

// ========================================
// COMMISSION CALCULATION
// ========================================

// Calculate commission for investment
async function calculateCommissionForInvestment(investorUid, investmentAmount) {
    try {
        const result = await window.FirebaseService.calculateReferralCommission(investorUid, investmentAmount);
        
        if (result.success) {
            const commissions = result.data;
            
            // Process each commission
            for (const commission of commissions) {
                // Check if referrer meets requirements
                const canReceiveCommission = await checkCommissionRequirements(commission.referrerUid, commission.level);
                
                if (canReceiveCommission) {
                    // Add commission to referrer's balance
                    await window.FirebaseService.updateTokenBalance(
                        commission.referrerUid, 
                        commission.commission, 
                        'referral'
                    );
                    
                    // Log commission transaction
                    await window.FirebaseService.logTransaction(commission.referrerUid, {
                        type: 'referral',
                        amount: commission.commission,
                        level: commission.level,
                        percentage: commission.percentage,
                        referralUid: investorUid,
                        investmentAmount: investmentAmount,
                        status: 'paid',
                        description: `F${commission.level} referral commission from ${investmentAmount} investment`
                    });
                }
            }
        }
        
        return result;
    } catch (error) {
        console.error('Error calculating commission:', error);
        return { success: false, error: error.message };
    }
}

// Check commission requirements
async function checkCommissionRequirements(uid, level) {
    try {
        const referralResult = await window.FirebaseService.getReferralData(uid);
        
        if (!referralResult.success) {
            return false;
        }
        
        const referralData = referralResult.data;
        const totalReferrals = referralData.totalReferrals || 0;
        
        // Check requirements based on level
        switch (level) {
            case 1: // F1 - 15% commission
                return totalReferrals >= 15;
            case 2: // F2 - 10% commission
                return totalReferrals >= 35;
            case 3: // F3 - 5% commission
                return totalReferrals >= 45;
            default:
                return false;
        }
    } catch (error) {
        console.error('Error checking commission requirements:', error);
        return false;
    }
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initReferral);

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
    
    .avatar-sm {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style); 