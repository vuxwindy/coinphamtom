// Dashboard JavaScript - COINPAYOT NFT
// Xử lý dashboard hoàn chỉnh với nạp/rút/transfer và lịch sử giao dịch

// ========================================
// STATE MANAGEMENT
// ========================================
let dashboardState = {
    currentUser: null,
    userProfile: null,
    balances: {
        ppo: 0,
        usd: 0,
        totalProfit: 0
    },
    transactions: [],
    visibleTransactions: [],
    pagination: { page: 1, pageSize: 10, total: 0 },
    stats: {
        totalPurchases: 0,
        totalInvestments: 0,
        totalReferrals: 0,
        checkinStreak: 0
    },
    loading: false,
    currentFilter: 'all',
    web3: null,
    connectedWallet: null,
    ppoContract: null
};

// BSC Configuration
const BSC_CONFIG = {
    chainId: '0x38', // BSC Mainnet
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/']
};

// PPO Token Configuration (BEP20)
const PPO_TOKEN_CONFIG = {
    address: '0x83e3d4dA4d0e52Df27a166100b09Fa81A23F5b80', // PPO Token Contract Address
    decimals: 18,
    symbol: 'PPO',
    name: 'PPO Token'
};

// Platform Wallet Address
const PLATFORM_WALLET = '0x83e3d4dA4d0e52Df27a166100b09Fa81A23F5b80'; // Platform wallet for deposits

// ========================================
// INITIALIZATION
// ========================================

// Initialize dashboard
async function initDashboard() {
    try {
        // Check if user is logged in (Firebase Auth first)
        const currentUser = await resolveAuthUser();
        if (!currentUser) {
            showNotification('Please connect your wallet or sign in to access dashboard', true);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            return;
        }
        
        dashboardState.currentUser = currentUser;
        
        // Load user profile
        await loadUserProfile();
        
        // Load balances
        await loadBalances();
        
        // Load transaction history
        await loadTransactionHistory();
        
        // Load user stats
        await loadUserStats();
        
        // Update UI
        updateDashboardUI();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to initialize dashboard', true);
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

// Resolve Firebase Auth user (fallback to localStorage)
async function resolveAuthUser() {
    try {
        if (!window.firebase || !window.firebase.auth) {
            return getCurrentUser();
        }
        const { onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js');
        const auth = window.firebase.auth;
        return new Promise((resolve) => {
            let resolved = false;
            onAuthStateChanged(auth, (user) => {
                if (!resolved) {
                    resolved = true;
                    if (user) {
                        resolve({ uid: user.uid, type: 'email' });
                    } else {
                        resolve(getCurrentUser());
                    }
                }
            });
            // Safety timeout
            setTimeout(() => { if (!resolved) resolve(getCurrentUser()); }, 1500);
        });
    } catch (e) {
        return getCurrentUser();
    }
}

// ========================================
// USER PROFILE LOADING
// ========================================

// Load user profile
async function loadUserProfile() {
    try {
        const result = await window.FirebaseService.getUserProfile(dashboardState.currentUser.uid);
        
        if (result.success) {
            dashboardState.userProfile = result.data;
        } else {
            // Create default profile if not exists
            dashboardState.userProfile = {
                name: 'User',
                email: dashboardState.currentUser.type === 'email' ? 'user@example.com' : 'wallet@example.com',
                memberSince: new Date(),
                accountLevel: 'Bronze',
                referralCode: generateReferralCode()
            };
        }
        
    } catch (error) {
        console.error('Error loading user profile:', error);
        // Set default profile
        dashboardState.userProfile = {
            name: 'User',
            email: 'user@example.com',
            memberSince: new Date(),
            accountLevel: 'Bronze',
            referralCode: 'ABC123'
        };
    }
}

// Generate referral code
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ========================================
// BALANCE LOADING
// ========================================

// Load balances
async function loadBalances() {
    try {
        // Load PPO balance
        const ppoResult = await window.FirebaseService.getTokenBalance(dashboardState.currentUser.uid);
        if (ppoResult.success) {
            dashboardState.balances.ppo = ppoResult.data.ppoBalance || 0;
        }
        
        // Load USD balance (from user profile or default)
        const usdResult = await window.FirebaseService.getUserBalance(dashboardState.currentUser.uid);
        if (usdResult.success) {
            dashboardState.balances.usd = usdResult.data.usdBalance || 0;
        }
        
        // Calculate total profit from transactions
        const profitResult = await window.FirebaseService.getTransactionHistory(dashboardState.currentUser.uid, 1000);
        if (profitResult.success) {
            const profitTransactions = profitResult.data.filter(tx => tx.type === 'profit' || tx.type === 'investment');
            dashboardState.balances.totalProfit = profitTransactions.reduce((sum, tx) => sum + tx.amount, 0);
        }
        
    } catch (error) {
        console.error('Error loading balances:', error);
    }
}

// ========================================
// TRANSACTION HISTORY
// ========================================

// Load transaction history
async function loadTransactionHistory() {
    try {
        setLoadingState(true);
        
        const result = await window.FirebaseService.getTransactionHistory(dashboardState.currentUser.uid, 100);
        
        if (result.success) {
            dashboardState.transactions = result.data;
            renderTransactionsTable(result.data);
        } else {
            renderTransactionsTable([]);
        }
        
    } catch (error) {
        console.error('Error loading transactions:', error);
        showNotification('Failed to load transaction history', true);
        renderTransactionsTable([]);
    } finally {
        setLoadingState(false);
    }
}

// Render transactions table with pagination (10 per page)
function renderTransactionsTable(transactions) {
    const tableBody = document.getElementById('transactionsTableBody');
    const emptyState = document.getElementById('emptyState');
    const transactionsTable = document.getElementById('transactionsTable');
    
    if (!transactions || transactions.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.remove('d-none');
        transactionsTable.classList.add('d-none');
        renderTransactionsPagination(0, 1, 10);
        return;
    }
    
    emptyState.classList.add('d-none');
    transactionsTable.classList.remove('d-none');
    // Save visible transactions set
    dashboardState.visibleTransactions = transactions.slice();
    const pageSize = dashboardState.pagination.pageSize;
    const page = dashboardState.pagination.page;
    const total = transactions.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    dashboardState.pagination = { page: safePage, pageSize, total };

    const start = (safePage - 1) * pageSize;
    const end = Math.min(start + pageSize, total);
    const pageItems = transactions.slice(start, end);

    tableBody.innerHTML = pageItems.map(transaction => {
        const transactionDate = new Date(transaction.timestamp.toDate ? transaction.timestamp.toDate() : transaction.timestamp);
        const statusClass = getStatusClass(transaction.status);
        const typeIcon = getTransactionTypeIcon(transaction.type);
        const typeClass = getTransactionTypeClass(transaction.type);
        
        return `
            <tr>
                <td class="text-white-50">${formatDate(transactionDate)}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <i class="fas ${typeIcon} ${typeClass} me-2"></i>
                        <span class="text-white">${formatTransactionType(transaction.type)}</span>
                    </div>
                </td>
                <td class="${transaction.amount >= 0 ? 'text-success' : 'text-danger'}">
                    ${transaction.amount >= 0 ? '+' : ''}${transaction.amount.toFixed(2)} ${transaction.currency || 'USD'}
                </td>
                <td>
                    <span class="badge ${statusClass}">${formatStatus(transaction.status)}</span>
                </td>
                <td class="text-white-50">${transaction.description || 'No description'}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-info" onclick="viewTransactionDetails('${transaction.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${transaction.status === 'pending' ? `
                        <button class="btn btn-sm btn-outline-warning" onclick="cancelTransaction('${transaction.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    renderTransactionsPagination(totalPages, safePage, pageSize);
}

function renderTransactionsPagination(totalPages, currentPage, pageSize) {
    let container = document.getElementById('transactionsPagination');
    const table = document.getElementById('transactionsTable');
    if (!container) {
        container = document.createElement('div');
        container.id = 'transactionsPagination';
        container.className = 'd-flex justify-content-between align-items-center mt-3';
        if (table && table.parentElement) {
            table.parentElement.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }
    if (!totalPages || totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = `
        <div class="text-white-50">Page ${currentPage} of ${totalPages} (10 per page)</div>
        <div class="btn-group">
            <button class="btn btn-sm btn-outline-light" ${currentPage<=1?'disabled':''} id="txPrev">Prev</button>
            <button class="btn btn-sm btn-outline-light" ${currentPage>=totalPages?'disabled':''} id="txNext">Next</button>
        </div>
    `;
    const prev = document.getElementById('txPrev');
    const next = document.getElementById('txNext');
    if (prev) prev.onclick = () => { changeTransactionsPage(currentPage - 1); };
    if (next) next.onclick = () => { changeTransactionsPage(currentPage + 1); };
}

function changeTransactionsPage(newPage) {
    dashboardState.pagination.page = newPage;
    // Re-render using the latest filtered set
    const data = dashboardState.currentFilter === 'all' ? dashboardState.transactions : dashboardState.transactions.filter(tx => tx.type === dashboardState.currentFilter);
    renderTransactionsTable(data);
}

// Get status class
function getStatusClass(status) {
    switch (status) {
        case 'completed': return 'bg-success';
        case 'pending': return 'bg-warning';
        case 'failed': return 'bg-danger';
        case 'cancelled': return 'bg-secondary';
        default: return 'bg-info';
    }
}

// Get transaction type icon
function getTransactionTypeIcon(type) {
    switch (type) {
        case 'deposit': return 'fa-plus';
        case 'withdraw': return 'fa-minus';
        case 'transfer': return 'fa-exchange-alt';
        case 'investment': return 'fa-chart-line';
        case 'profit': return 'fa-coins';
        case 'referral': return 'fa-users';
        default: return 'fa-receipt';
    }
}

// Get transaction type class
function getTransactionTypeClass(type) {
    switch (type) {
        case 'deposit': return 'text-success';
        case 'withdraw': return 'text-warning';
        case 'transfer': return 'text-info';
        case 'investment': return 'text-primary';
        case 'profit': return 'text-success';
        case 'referral': return 'text-info';
        default: return 'text-white';
    }
}

// Format transaction type
function formatTransactionType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// Format status
function formatStatus(status) {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1);
}

// ========================================
// USER STATS
// ========================================

// Load user stats
async function loadUserStats() {
    try {
        // Load NFT purchases
        const purchasesResult = await window.FirebaseService.getUserPurchases(dashboardState.currentUser.uid);
        if (purchasesResult.success) {
            dashboardState.stats.totalPurchases = purchasesResult.data.length;
        }
        
        // Load investments
        const investmentsResult = await window.FirebaseService.getUserInvestments(dashboardState.currentUser.uid);
        if (investmentsResult.success) {
            dashboardState.stats.totalInvestments = investmentsResult.data.length;
        }
        
        // Load referrals
        const referralsResult = await window.FirebaseService.getUserReferrals(dashboardState.currentUser.uid);
        if (referralsResult.success) {
            dashboardState.stats.totalReferrals = referralsResult.data.length;
        }
        
        // Load check-in streak
        const checkinResult = await window.FirebaseService.getUserCheckins(dashboardState.currentUser.uid);
        if (checkinResult.success) {
            dashboardState.stats.checkinStreak = checkinResult.data.streak || 0;
        }
        
    } catch (error) {
        console.error('Error loading user stats:', error);
    }
}

// ========================================
// WEB3 & WALLET FUNCTIONS
// ========================================

// Initialize Web3
async function initializeWeb3() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            dashboardState.web3 = new Web3(window.ethereum);
            console.log('Web3 initialized with MetaMask');
        } else {
            console.error('MetaMask not found');
            showNotification('Please install MetaMask to use PPO features', true);
        }
    } catch (error) {
        console.error('Error initializing Web3:', error);
        showNotification('Failed to initialize Web3', true);
    }
}

// Connect to BSC Network
async function connectToBSC() {
    try {
        if (!dashboardState.web3) {
            await initializeWeb3();
        }

        // Request to switch to BSC
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BSC_CONFIG.chainId }],
        });
        
        console.log('Connected to BSC');
        return true;
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [BSC_CONFIG],
                });
                console.log('BSC network added to MetaMask');
                return true;
            } catch (addError) {
                console.error('Error adding BSC network:', addError);
                showNotification('Failed to add BSC network to MetaMask', true);
                return false;
            }
        } else {
            console.error('Error switching to BSC:', switchError);
            showNotification('Failed to switch to BSC network', true);
            return false;
        }
    }
}

// Connect Wallet
async function connectWallet() {
    try {
        if (!dashboardState.web3) {
            await initializeWeb3();
        }

        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length > 0) {
            dashboardState.connectedWallet = accounts[0];
            
            // Switch to BSC
            const bscConnected = await connectToBSC();
            if (!bscConnected) {
                return false;
            }

            // Initialize PPO contract
            await initializePPOContract();
            
            console.log('Wallet connected:', dashboardState.connectedWallet);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showNotification('Failed to connect wallet', true);
        return false;
    }
}

// Initialize PPO Contract
async function initializePPOContract() {
    try {
        if (!dashboardState.web3) {
            console.log('Web3 not initialized, skipping PPO contract initialization');
            return;
        }

        // ERC20 ABI for PPO token
        const erc20ABI = [
            {
                "constant": true,
                "inputs": [{"name": "_owner", "type": "address"}],
                "name": "balanceOf",
                "outputs": [{"name": "balance", "type": "uint256"}],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{"name": "", "type": "uint8"}],
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{"name": "", "type": "string"}],
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {"name": "_to", "type": "address"},
                    {"name": "_value", "type": "uint256"}
                ],
                "name": "transfer",
                "outputs": [{"name": "", "type": "bool"}],
                "type": "function"
            }
        ];

        // Validate contract address
        if (!dashboardState.web3.utils.isAddress(PPO_TOKEN_CONFIG.address)) {
            console.log('Invalid PPO contract address, using mock contract');
            dashboardState.ppoContract = null;
            return;
        }

        dashboardState.ppoContract = new dashboardState.web3.eth.Contract(
            erc20ABI,
            PPO_TOKEN_CONFIG.address
        );
        
        console.log('PPO contract initialized');
    } catch (error) {
        console.error('Error initializing PPO contract:', error);
        dashboardState.ppoContract = null;
        // Don't show notification for contract initialization errors to avoid spam
    }
}

// Get PPO Balance from Wallet
async function getWalletPPOBalance() {
    try {
        if (!dashboardState.ppoContract || !dashboardState.connectedWallet) {
            console.log('PPO contract or wallet not initialized');
            return 0;
        }

        // Check if contract has balanceOf method
        if (!dashboardState.ppoContract.methods || !dashboardState.ppoContract.methods.balanceOf) {
            console.log('PPO contract does not have balanceOf method');
            return 0;
        }

        const balance = await dashboardState.ppoContract.methods
            .balanceOf(dashboardState.connectedWallet)
            .call({ from: dashboardState.connectedWallet });

        if (balance) {
            return dashboardState.web3.utils.fromWei(balance, 'ether');
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error getting wallet PPO balance:', error);
        // Return 0 instead of throwing error to prevent UI crashes
        return 0;
    }
}

// Generate QR Code (Canvas only)
function generateQRCode(elementId, data) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'qr-code-wrapper';
    container.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;';

    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 180;
    canvas.style.cssText = 'border-radius: 8px;';
    container.appendChild(canvas);

    // Use QRCode.toCanvas from qrcode npm
    if (typeof QRCode !== 'undefined' && typeof QRCode.toCanvas === 'function') {
        QRCode.toCanvas(canvas, data, { 
            width: 180, 
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function (error) {
            if (error) {
                console.error('QR toCanvas error:', error);
                // Fallback to Google Charts API
                generateGoogleChartsQR(container, data);
            }
        });
    } else {
        // Fallback to Google Charts API
        generateGoogleChartsQR(container, data);
    }

    element.appendChild(container);
}

// Fallback QR generation using Google Charts API
function generateGoogleChartsQR(container, data) {
    try {
        const googleChartsUrl = `https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(data)}&chld=L|0`;
        const img = document.createElement('img');
        img.src = googleChartsUrl;
        img.alt = 'QR Code';
        img.style.cssText = 'border-radius: 8px; max-width: 180px; height: auto;';
        img.onerror = () => {
            // Final fallback: text display
            const fallback = document.createElement('div');
            fallback.textContent = data;
            fallback.style.cssText = 'font-size:10px;word-break:break-all;background:#fff;padding:8px;border:1px solid #ccc;border-radius:6px;text-align:center;';
            container.appendChild(fallback);
        };
        container.appendChild(img);
    } catch (error) {
        console.error('Google Charts QR error:', error);
        // Final fallback: text display
        const fallback = document.createElement('div');
        fallback.textContent = data;
        fallback.style.cssText = 'font-size:10px;word-break:break-all;background:#fff;padding:8px;border:1px solid #ccc;border-radius:6px;text-align:center;';
        container.appendChild(fallback);
    }
}

// Download QR Code
function downloadQRCodeFromCanvas(canvas) {
    try {
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'ppo-deposit-qr.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading QR canvas:', error);
        showNotification('Failed to download QR code', true);
    }
}

// Copy Platform Address
function copyPlatformAddress() {
    const addressInput = document.getElementById('platformWalletAddress');
    addressInput.select();
    document.execCommand('copy');
    showNotification('Platform address copied to clipboard!');
}

// ========================================
// MODAL FUNCTIONS
// ========================================

// Open PPO deposit modal
function openPPODepositModal() {
    const modal = new bootstrap.Modal(document.getElementById('ppoDepositModal'));
    modal.show();
    
    // Reset modal state - with defensive checks
    const walletSection = document.getElementById('walletConnectionSection');
    const depositSection = document.getElementById('depositSection');
    const qrSection = document.getElementById('qrCodeSection');
    
    if (walletSection) walletSection.classList.remove('d-none');
    if (depositSection) depositSection.classList.add('d-none');
    if (qrSection) qrSection.classList.add('d-none');
}

// Open PPO withdraw modal
function openPPOWithdrawModal() {
    const modal = new bootstrap.Modal(document.getElementById('ppoWithdrawModal'));
    modal.show();
    
    // Reset modal state
    document.getElementById('withdrawWalletConnectionSection').classList.remove('d-none');
    document.getElementById('withdrawSection').classList.add('d-none');
    document.getElementById('withdrawQRSection').classList.add('d-none');
}

// Open transfer modal
function openTransferModal() {
    const modal = new bootstrap.Modal(document.getElementById('transferModal'));
    modal.show();
}

// ========================================
// PPO TRANSACTION ACTIONS
// ========================================

// Handle Deposit Wallet Connection
async function handleDepositWalletConnection() {
    try {
        const connected = await connectWallet();
        if (connected) {
            // Update UI
            document.getElementById('walletConnectionSection').classList.add('d-none');
            document.getElementById('depositSection').classList.remove('d-none');
            
            // Update PPO balance display
            const walletBalance = await getWalletPPOBalance();
            document.getElementById('ppoBalanceDisplay').textContent = parseFloat(walletBalance).toFixed(3);
            
            // Set platform address
            document.getElementById('platformWalletAddress').value = PLATFORM_WALLET;
            
            // Auto generate QR code
            await generateDepositQR();
            
            showNotification('Wallet connected successfully! QR Code generated.');
        }
    } catch (error) {
        console.error('Error connecting wallet for deposit:', error);
        showNotification('Failed to connect wallet', true);
    }
}

// Handle Withdraw Wallet Connection
async function handleWithdrawWalletConnection() {
    try {
        const connected = await connectWallet();
        if (connected) {
            // Update UI
            document.getElementById('withdrawWalletConnectionSection').classList.add('d-none');
            document.getElementById('withdrawSection').classList.remove('d-none');
            
            // Update wallet info
            document.getElementById('withdrawWalletAddress').textContent = 
                `${dashboardState.connectedWallet.substring(0, 6)}...${dashboardState.connectedWallet.substring(38)}`;
            
            // Set available balance
            document.getElementById('availablePPOBalance').textContent = dashboardState.balances.ppo.toFixed(3);
            
            // Set withdraw address
            document.getElementById('withdrawToAddress').value = dashboardState.connectedWallet;
            
            showNotification('Wallet connected successfully!');
        }
    } catch (error) {
        console.error('Error connecting wallet for withdraw:', error);
        showNotification('Failed to connect wallet', true);
    }
}

// Generate Deposit QR Code
async function generateDepositQR() {
    try {
        // Always generate QR of platform address only (BSC BEP20)
        generateQRCode('depositQRCode', PLATFORM_WALLET);
        
        // Update instructions
        const instructionsElement = document.querySelector('.deposit-instructions ol');
        if (instructionsElement) {
            instructionsElement.innerHTML = `
                <li>Scan QR code với ví BSC (MetaMask, Trust Wallet, etc.)</li>
                <li>Hoặc copy địa chỉ ví platform bên dưới</li>
                <li>Gửi PPO tokens đến địa chỉ platform</li>
                <li>Đảm bảo bạn đang ở mạng BSC BEP20</li>
                <li>Chờ xác nhận blockchain (3-5 phút)</li>
            `;
        }
        showNotification('QR Code đã được tạo!');
        
    } catch (error) {
        console.error('Error generating deposit QR:', error);
        showNotification('Failed to generate QR code', true);
    }
}

// Confirm PPO Withdrawal
async function confirmPPOWithdrawal() {
    try {
        const amount = parseFloat(document.getElementById('ppoWithdrawAmount').value);
        
        if (!amount || amount < 0.001) {
            showNotification('Minimum withdrawal amount is 0.001 PPO', true);
            return;
        }
        
        if (amount > dashboardState.balances.ppo) {
            showNotification('Insufficient PPO balance for withdrawal', true);
            return;
        }
        
        // Check if user has enough BNB for gas
        const bnbBalance = await dashboardState.web3.eth.getBalance(dashboardState.connectedWallet);
        const bnbBalanceEth = dashboardState.web3.utils.fromWei(bnbBalance, 'ether');
        
        if (parseFloat(bnbBalanceEth) < 0.01) {
            showNotification('Insufficient BNB for gas fees. Please ensure you have at least 0.01 BNB', true);
            return;
        }
        
        // Show withdrawal QR section
        document.getElementById('withdrawQRSection').classList.remove('d-none');
        
        // Generate withdrawal QR
        const withdrawData = {
            from: dashboardState.connectedWallet,
            amount: amount,
            token: PPO_TOKEN_CONFIG.address,
            network: 'BSC'
        };
        
        generateQRCode('withdrawQRCode', JSON.stringify(withdrawData));
        
        // Show withdrawal status
        document.getElementById('withdrawStatus').innerHTML = `
            <div class="alert alert-info">
                <h6 class="text-white">Ready to Withdraw</h6>
                <p class="text-white-50 mb-2">Amount: ${amount} PPO</p>
                <p class="text-white-50 mb-2">To: ${dashboardState.connectedWallet.substring(0, 6)}...${dashboardState.connectedWallet.substring(38)}</p>
                <p class="text-white-50 mb-0">Network Fee: 0.001 PPO</p>
            </div>
        `;
        
        showNotification('Withdrawal prepared! Please confirm in your wallet.');
        
    } catch (error) {
        console.error('Error confirming PPO withdrawal:', error);
        showNotification('Failed to prepare withdrawal', true);
    }
}

// Test QR Code
function testQRCode() {
    console.log('Testing QR code generation...');
    
    // Test with simple text
    generateQRCode('depositQRCode', 'Test QR Code Data');
    
    // Test with wallet address
    setTimeout(() => {
        generateQRCode('depositQRCode', PLATFORM_WALLET);
    }, 2000);
    
    // Test with JSON data
    setTimeout(() => {
        const testData = {
            address: PLATFORM_WALLET,
            network: 'BSC BEP20',
            test: true
        };
        generateQRCode('depositQRCode', JSON.stringify(testData));
    }, 4000);
    
    showNotification('QR Code test started - check console for details');
}

// Refresh PPO Balance
async function refreshPPOBalance() {
    try {
        if (dashboardState.connectedWallet) {
            const walletBalance = await getWalletPPOBalance();
            document.getElementById('walletPPOBalance').textContent = parseFloat(walletBalance).toFixed(3);
            showNotification('Balance refreshed!');
        }
    } catch (error) {
        console.error('Error refreshing balance:', error);
        showNotification('Failed to refresh balance', true);
    }
}

// ========================================
// TRANSACTION ACTIONS
// ========================================

// Confirm deposit
async function confirmDeposit() {
    try {
        const amount = parseFloat(document.getElementById('depositAmount').value);
        const method = document.getElementById('depositMethod').value;
        const currency = document.getElementById('depositCurrency').value;
        const reference = document.getElementById('depositReference').value;
        
        if (!amount || amount < 10) {
            showNotification('Minimum deposit amount is $10', true);
            return;
        }
        
        if (!method) {
            showNotification('Please select a payment method', true);
            return;
        }
        
        // Create deposit transaction
        const transactionData = {
            type: 'deposit',
            amount: amount,
            currency: currency,
            method: method,
            reference: reference,
            status: 'pending',
            description: `Deposit via ${method}`,
            timestamp: new Date()
        };
        
        const result = await window.FirebaseService.createTransaction(dashboardState.currentUser.uid, transactionData);
        
        if (result.success) {
            showNotification('Deposit request submitted successfully! Processing time: 24 hours');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('depositModal'));
            modal.hide();
            
            // Reload data
            await loadTransactionHistory();
            
        } else {
            showNotification('Failed to submit deposit request: ' + result.error, true);
        }
        
    } catch (error) {
        console.error('Error confirming deposit:', error);
        showNotification('An error occurred while processing deposit', true);
    }
}

// Confirm withdrawal
async function confirmWithdraw() {
    try {
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        const method = document.getElementById('withdrawMethod').value;
        const currency = document.getElementById('withdrawCurrency').value;
        const address = document.getElementById('withdrawAddress').value;
        
        if (!amount || amount < 50) {
            showNotification('Minimum withdrawal amount is $50', true);
            return;
        }
        
        if (amount > dashboardState.balances.usd) {
            showNotification('Insufficient balance for withdrawal', true);
            return;
        }
        
        if (!method || !address) {
            showNotification('Please fill in all required fields', true);
            return;
        }
        
        // Create withdrawal transaction
        const transactionData = {
            type: 'withdraw',
            amount: -amount, // Negative for withdrawal
            currency: currency,
            method: method,
            address: address,
            status: 'pending',
            description: `Withdrawal to ${method}`,
            timestamp: new Date()
        };
        
        const result = await window.FirebaseService.createTransaction(dashboardState.currentUser.uid, transactionData);
        
        if (result.success) {
            showNotification('Withdrawal request submitted successfully! Processing time: 1-3 business days');
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('withdrawModal'));
            modal.hide();
            
            // Reload data
            await loadTransactionHistory();
            
        } else {
            showNotification('Failed to submit withdrawal request: ' + result.error, true);
        }
        
    } catch (error) {
        console.error('Error confirming withdrawal:', error);
        showNotification('An error occurred while processing withdrawal', true);
    }
}

// Confirm transfer
async function confirmTransfer() {
    try {
        const amount = parseFloat(document.getElementById('transferAmount').value);
        const type = document.getElementById('transferType').value;
        
        if (!amount || amount < 1) {
            showNotification('Minimum transfer amount is 1', true);
            return;
        }
        
        if (!type) {
            showNotification('Please select transfer type', true);
            return;
        }
        
        let fromBalance, toBalance, fromCurrency, toCurrency;
        
        if (type === 'usd-to-ppo') {
            if (amount > dashboardState.balances.usd) {
                showNotification('Insufficient USD balance', true);
                return;
            }
            fromBalance = dashboardState.balances.usd;
            toBalance = dashboardState.balances.ppo;
            fromCurrency = 'USD';
            toCurrency = 'PPO';
        } else {
            if (amount > dashboardState.balances.ppo) {
                showNotification('Insufficient PPO balance', true);
                return;
            }
            fromBalance = dashboardState.balances.ppo;
            toBalance = dashboardState.balances.usd;
            fromCurrency = 'PPO';
            toCurrency = 'USD';
        }
        
        const fee = amount * 0.005; // 0.5% fee
        const netAmount = amount - fee;
        
        // Create transfer transaction
        const transactionData = {
            type: 'transfer',
            amount: netAmount,
            currency: toCurrency,
            fromCurrency: fromCurrency,
            fee: fee,
            status: 'completed',
            description: `Transfer ${amount} ${fromCurrency} to ${netAmount} ${toCurrency}`,
            timestamp: new Date()
        };
        
        const result = await window.FirebaseService.createTransaction(dashboardState.currentUser.uid, transactionData);
        
        if (result.success) {
            // Update balances
            if (type === 'usd-to-ppo') {
                await window.FirebaseService.updateUserBalance(dashboardState.currentUser.uid, -amount, 'subtract');
                await window.FirebaseService.updateTokenBalance(dashboardState.currentUser.uid, netAmount, 'add');
            } else {
                await window.FirebaseService.updateTokenBalance(dashboardState.currentUser.uid, -amount, 'subtract');
                await window.FirebaseService.updateUserBalance(dashboardState.currentUser.uid, netAmount, 'add');
            }
            
            showNotification(`Transfer completed! ${netAmount} ${toCurrency} credited to your account`);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('transferModal'));
            modal.hide();
            
            // Reload data
            await loadBalances();
            await loadTransactionHistory();
            updateDashboardUI();
            
        } else {
            showNotification('Failed to process transfer: ' + result.error, true);
        }
        
    } catch (error) {
        console.error('Error confirming transfer:', error);
        showNotification('An error occurred while processing transfer', true);
    }
}

// ========================================
// TRANSACTION ACTIONS
// ========================================

// View transaction details
function viewTransactionDetails(transactionId) {
    const transaction = dashboardState.transactions.find(tx => tx.id === transactionId);
    if (transaction) {
        const details = `
Transaction Details:
- Type: ${formatTransactionType(transaction.type)}
- Amount: ${transaction.amount} ${transaction.currency || 'USD'}
- Status: ${formatStatus(transaction.status)}
- Date: ${formatDate(new Date(transaction.timestamp.toDate ? transaction.timestamp.toDate() : transaction.timestamp))}
- Description: ${transaction.description || 'No description'}
${transaction.method ? `- Method: ${transaction.method}` : ''}
${transaction.reference ? `- Reference: ${transaction.reference}` : ''}
        `;
        alert(details);
    }
}

// Cancel transaction
async function cancelTransaction(transactionId) {
    if (!confirm('Are you sure you want to cancel this transaction?')) {
        return;
    }
    
    try {
        const result = await window.FirebaseService.updateTransaction(dashboardState.currentUser.uid, transactionId, {
            status: 'cancelled'
        });
        
        if (result.success) {
            showNotification('Transaction cancelled successfully');
            await loadTransactionHistory();
        } else {
            showNotification('Failed to cancel transaction', true);
        }
        
    } catch (error) {
        console.error('Error cancelling transaction:', error);
        showNotification('An error occurred while cancelling transaction', true);
    }
}

// ========================================
// FILTER FUNCTIONS
// ========================================

// Filter transactions
function filterTransactions(filter) {
    dashboardState.currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-buttons .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    const filteredTransactions = filter === 'all' ? dashboardState.transactions : dashboardState.transactions.filter(tx => tx.type === filter);
    // Reset to first page when filter changes
    dashboardState.pagination.page = 1;
    renderTransactionsTable(filteredTransactions);
}

// ========================================
// UI UPDATES
// ========================================

// Update dashboard UI
function updateDashboardUI() {
    // Update user profile
    if (dashboardState.userProfile) {
        document.getElementById('userName').textContent = dashboardState.userProfile.name;
        document.getElementById('userEmail').textContent = dashboardState.userProfile.email;
        document.getElementById('memberSince').textContent = formatDate(dashboardState.userProfile.memberSince);
        document.getElementById('accountLevel').textContent = dashboardState.userProfile.accountLevel;
        document.getElementById('referralCode').textContent = dashboardState.userProfile.referralCode;
    }
    
    // Update balances
    document.getElementById('ppoBalance').textContent = dashboardState.balances.ppo.toFixed(2);
    document.getElementById('usdBalance').textContent = `$${dashboardState.balances.usd.toFixed(2)}`;
    document.getElementById('totalProfit').textContent = dashboardState.balances.totalProfit.toFixed(2);
    
    // Update stats
    document.getElementById('totalPurchases').textContent = dashboardState.stats.totalPurchases;
    document.getElementById('totalInvestments').textContent = dashboardState.stats.totalInvestments;
    document.getElementById('totalReferrals').textContent = dashboardState.stats.totalReferrals;
    document.getElementById('checkinStreak').textContent = dashboardState.stats.checkinStreak;
}

// Show loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const transactionsTable = document.getElementById('transactionsTable');
    const emptyState = document.getElementById('emptyState');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        transactionsTable.style.opacity = '0.5';
        emptyState.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        transactionsTable.style.opacity = '1';
        emptyState.style.opacity = '1';
    }
}

// ========================================
// ADMIN ACCESS FUNCTIONS
// ========================================

// Handle admin button click (hidden button) - GLOBAL FUNCTION
let adminClickCount = 0;
let adminClickTimer = null;

window.handleAdminButtonClick = function() {
    console.log('Admin button clicked! Count:', adminClickCount + 1);
    adminClickCount++;
    
    // Clear existing timer
    if (adminClickTimer) {
        clearTimeout(adminClickTimer);
    }
    
    // Set timer to reset click count
    adminClickTimer = setTimeout(() => {
        console.log('Timer reset - click count reset to 0');
        adminClickCount = 0;
    }, 2000);
    
    // Check if triple click
    if (adminClickCount >= 3) {
        console.log('Triple click detected! Redirecting to admin panel...');
        adminClickCount = 0;
        if (adminClickTimer) {
            clearTimeout(adminClickTimer);
        }
        
        // Redirect to admin panel
        window.location.href = 'admin/123123.html';
    }
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
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterTransactions(filter);
        });
    });
    
    // Modal confirm buttons
    document.getElementById('confirmDeposit').addEventListener('click', confirmDeposit);
    document.getElementById('confirmWithdraw').addEventListener('click', confirmWithdraw);
    document.getElementById('confirmTransfer').addEventListener('click', confirmTransfer);
    
    // PPO Wallet Connection buttons
    document.getElementById('connectWalletBtn').addEventListener('click', handleDepositWalletConnection);
    document.getElementById('connectWithdrawWalletBtn').addEventListener('click', handleWithdrawWalletConnection);
    
         // PPO Transaction buttons
     document.getElementById('confirmWithdrawBtn').addEventListener('click', confirmPPOWithdrawal);
     document.getElementById('refreshBalanceBtn').addEventListener('click', refreshPPOBalance);
    
    // Form validation
    document.getElementById('depositAmount').addEventListener('input', validateDepositAmount);
    document.getElementById('withdrawAmount').addEventListener('input', validateWithdrawAmount);
    document.getElementById('transferAmount').addEventListener('input', validateTransferAmount);
    
         // PPO amount validation
     document.getElementById('ppoWithdrawAmount').addEventListener('input', validatePPOWithdrawAmount);
}

// Form validation functions
function validateDepositAmount() {
    const amount = parseFloat(this.value);
    const minAmount = 10;
    
    if (amount < minAmount) {
        this.setCustomValidity(`Minimum deposit amount is $${minAmount}`);
    } else {
        this.setCustomValidity('');
    }
}

function validateWithdrawAmount() {
    const amount = parseFloat(this.value);
    const minAmount = 50;
    const maxAmount = dashboardState.balances.usd;
    
    if (amount < minAmount) {
        this.setCustomValidity(`Minimum withdrawal amount is $${minAmount}`);
    } else if (amount > maxAmount) {
        this.setCustomValidity(`Maximum withdrawal amount is $${maxAmount.toFixed(2)}`);
    } else {
        this.setCustomValidity('');
    }
}

function validateTransferAmount() {
    const amount = parseFloat(this.value);
    const minAmount = 1;
    
    if (amount < minAmount) {
        this.setCustomValidity(`Minimum transfer amount is ${minAmount}`);
    } else {
        this.setCustomValidity('');
    }
}

function validatePPOWithdrawAmount() {
    const amount = parseFloat(this.value);
    const minAmount = 0.001;
    const maxAmount = dashboardState.balances.ppo;
    
    if (amount < minAmount) {
        this.setCustomValidity(`Minimum withdrawal amount is ${minAmount} PPO`);
    } else if (amount > maxAmount) {
        this.setCustomValidity(`Maximum withdrawal amount is ${maxAmount.toFixed(3)} PPO`);
    } else {
        this.setCustomValidity('');
    }
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await initDashboard();
    await initializeWeb3();
});

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
    
    .balance-card {
        transition: all 0.3s ease;
    }
    
    .balance-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    
    .stat-card {
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);
