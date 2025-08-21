// Web3Modal instance
let web3Modal;
let provider;
let web3;
let selectedAccount;
let initialized = false;
let isConnected = false;
let accounts = [];

let userTasks = {
    dailyCheckIn: false,
    telegramGroup: false,
    telegramChannel: false,
    facebookPage: false,
    twitterFollow: false,
    socialShare: false
};
let userStats = {
    tokenBalance: 0,
    nftBalance: 0,
    totalEarned: 0,
    referralEarnings: 0,
    referralCount: 0,
    level: 0 // 0: F0, 1: F1, 2: F2, 3: F3
};

// Initialize functions
async function init() {
    if (initialized) return;
    console.log("Initializing Web3Modal");

    // Check if Web3Modal is loaded
    if (typeof window.Web3Modal === 'undefined') {
        console.error('Web3Modal not found. Make sure to include the script.');
        showNotification('Error loading Web3Modal. Please refresh the page.');
        return;
    }

    // Check WalletConnect Provider
    console.log("WalletConnectProvider is", typeof WalletConnectProvider);
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider.default,
            options: {
                rpc: {
                    56: "https://bsc-dataseed1.binance.org/",
                    1: "https://mainnet.infura.io/v3/a9e4655e20484f12870d6c468bc176d5",
                    137: "https://polygon-rpc.com/"
                },
                chainId: 56 // BSC Mainnet as default
            }
        },
    };

    try {
        web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
            theme: "dark",
        });

        console.log("Web3Modal instance is", web3Modal);
        initialized = true;
    } catch (error) {
        console.error("Error initializing Web3Modal:", error);
        showNotification('Failed to initialize Web3Modal. Please refresh the page.');
    }
}

// Create popup overlay
const popupOverlay = document.createElement('div');
popupOverlay.className = 'wallet-popup-overlay';
popupOverlay.style.display = 'none';

const popupContent = document.createElement('div');
popupContent.className = 'wallet-popup-content';
popupContent.innerHTML = `
    <div class="wallet-popup-header">
        <h3>Connect Wallet</h3>
        <button class="wallet-popup-close">&times;</button>
    </div>
    <div class="wallet-popup-body">
        <button class="wallet-option metamask">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask">
            <span>MetaMask</span>
        </button>
        <button class="wallet-option walletconnect">
            <img src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png" alt="WalletConnect">
            <span>WalletConnect</span>
        </button>
    </div>
`;

popupOverlay.appendChild(popupContent);
document.body.appendChild(popupOverlay);

// Add popup styles
const styles = document.createElement('style');
styles.textContent = `
    .wallet-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }
    .wallet-popup-content {
        background: #1a1a1a;
        border-radius: 20px;
        padding: 20px;
        width: 90%;
        max-width: 400px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .wallet-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .wallet-popup-header h3 {
        color: white;
        margin: 0;
    }
    .wallet-popup-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    .wallet-option {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 15px;
        margin: 10px 0;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .wallet-option:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
    .wallet-option img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }
    .wallet-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: rgba(46, 204, 113, 0.9);
        color: white;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
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
    .wallet-status {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 10px;
        display: none;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(5px);
        z-index: 999;
    }
    .wallet-status .status-dot {
        width: 8px;
        height: 8px;
        background: #2ecc71;
        border-radius: 50%;
    }
    .wallet-status .disconnect-btn {
        margin-left: 10px;
        padding: 5px 10px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
    .wallet-status .disconnect-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(styles);

// Create wallet status element
const walletStatus = document.createElement('div');
walletStatus.className = 'wallet-status';
walletStatus.innerHTML = `
    <div class="status-dot"></div>
    <span class="status-text">Connected: </span>
    <span class="status-address"></span>
    <button class="disconnect-btn">Disconnect</button>
`;
document.body.appendChild(walletStatus);

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wallet-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Task and Referral functions
async function completeTask(taskName) {
    if (!selectedAccount) {
        showNotification('Please connect your wallet first!');
        return;
    }

    // Check if task is already completed today
    const lastCompletionTime = localStorage.getItem(`${taskName}_${selectedAccount}`);
    const now = new Date().getTime();
    if (lastCompletionTime && now - parseInt(lastCompletionTime) < 24 * 60 * 60 * 1000) {
        showNotification('You have already completed this task today!');
        return;
    }

    const taskButton = document.querySelector(`[data-task="${taskName}"]`);
    const taskItem = taskButton.closest('.task-item');
    
    // Handle specific task requirements
    switch(taskName) {
        case 'dailyCheckIn':
            // Simple daily check-in
            break;
        case 'telegramGroup':
            window.open('https://t.me/YourTelegramGroup', '_blank');
            break;
        case 'telegramChannel':
            window.open('https://t.me/YourTelegramChannel', '_blank');
            break;
        case 'facebookPage':
            window.open('https://facebook.com/YourPage', '_blank');
            break;
        case 'twitterFollow':
            window.open('https://twitter.com/YourTwitter', '_blank');
            break;
        case 'socialShare':
            // Open share dialog with pre-filled content
            const shareText = `Exciting news! Join me on PPO NFT Challenge! 🎯\n\nEarn rewards by completing daily tasks and collecting legendary bow parts! 🏹\n\nJoin now: ${window.location.origin}/?ref=${selectedAccount}\n\n#ArcherNFT #NFTGame #PlayToEarn`;
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
            break;
    }

    // Mark task as completed
    userTasks[taskName] = true;
    localStorage.setItem(`${taskName}_${selectedAccount}`, now.toString());
    taskItem.classList.add('completed');
    taskButton.disabled = true;
    taskButton.textContent = 'Completed';
    
    // Update rewards
    showNotification(`Task ${taskName} completed successfully!`);
    updateAvailableRewards();
}

function updateAvailableRewards() {
    let rewards = 0;
    // Check each task's completion status and time
    for (const task in userTasks) {
        const lastCompletionTime = localStorage.getItem(`${task}_${selectedAccount}`);
        const now = new Date().getTime();
        // Task is considered complete if done within last 24 hours
        if (lastCompletionTime && now - parseInt(lastCompletionTime) < 24 * 60 * 60 * 1000) {
            rewards += task === 'dailyCheckIn' ? 1 : 2;
            userTasks[task] = true;
        } else {
            userTasks[task] = false;
        }
    }
    document.querySelector('.available-rewards').textContent = rewards;
    document.querySelector('.claim-btn').disabled = rewards === 0;
}

async function claimRewards() {
    if (!selectedAccount) {
        showNotification('Please connect your wallet first!');
        return;
    }

    let totalRewards = 0;
    for (const task in userTasks) {
        if (userTasks[task]) {
            totalRewards += task === 'dailyCheckIn' ? 1 : 2;
            userTasks[task] = false;
        }
    }

    if (totalRewards > 0) {
        userStats.tokenBalance += totalRewards;
        userStats.totalEarned += totalRewards;
        updateStats();
        showNotification(`Claimed ${totalRewards} $PPO tokens!`);
        
        // Reset task UI
        document.querySelectorAll('.task-item').forEach(item => {
            item.classList.remove('completed');
            const btn = item.querySelector('.task-btn');
            btn.disabled = false;
            btn.textContent = btn.textContent.replace('Completed', 'Complete');
        });
        
        updateAvailableRewards();
    }
}

function updateStats() {
    document.querySelector('.token-balance').textContent = userStats.tokenBalance;
    document.querySelector('.nft-balance').textContent = userStats.nftBalance;
    document.querySelector('.total-earned').textContent = userStats.totalEarned;
    document.querySelector('.referral-earnings').textContent = userStats.referralEarnings;
    document.querySelector('.total-refs').textContent = userStats.referralCount;
    
    const refLevel = ['F0', 'F1', 'F2', 'F3'][userStats.level];
    document.querySelector('.ref-level').textContent = refLevel;
    
    const refsNeeded = userStats.level === 0 ? 15 : 
                       userStats.level === 1 ? 35 : 
                       userStats.level === 2 ? 45 : '-';
    document.querySelector('.refs-needed').textContent = refsNeeded;
}

function generateReferralLink() {
    if (!selectedAccount) return '';
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?ref=${selectedAccount}`;
}

function copyReferralLink() {
    const link = generateReferralLink();
    if (!link) {
        showNotification('Please connect your wallet first!');
        return;
    }
    navigator.clipboard.writeText(link)
        .then(() => showNotification('Referral link copied!'))
        .catch(() => showNotification('Failed to copy link'));
}

async function connectWallet() {
    console.log("Connect wallet function called");
    
    if (!initialized) {
        console.log("Initializing first...");
        await init();
    }
    
    console.log("Opening a dialog", web3Modal);
    try {
        if (!web3Modal) {
            showNotification('Web3Modal not initialized properly');
            return;
        }
        
        // Show tasks section when connecting
        const dailyTasksSection = document.getElementById('daily-tasks');
        if (dailyTasksSection) {
            dailyTasksSection.style.display = 'block';
        }
        
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        console.log("Provider:", provider);

        const accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];
        console.log("Selected Account:", selectedAccount);

        // Update global state
        isConnected = true;
        window.accounts = accounts;
        window.selectedAccount = selectedAccount;

        const connectButton = document.querySelector('.connect-wallet-btn');
        if (connectButton) {
            connectButton.textContent = `${selectedAccount.substring(0, 6)}...${selectedAccount.substring(38)}`;
            connectButton.classList.add('connected');
        }

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            if(accounts.length > 0) {
                selectedAccount = accounts[0];
                window.selectedAccount = selectedAccount;
                const shortAddress = `${selectedAccount.substring(0, 6)}...${selectedAccount.substring(38)}`;
                const connectButton = document.querySelector('.connect-wallet-btn');
                if (connectButton) {
                    connectButton.textContent = shortAddress;
                }
            } else {
                disconnectWallet();
            }
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            console.log("Chain changed:", chainId);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
            console.log("Provider disconnected:", error);
            disconnectWallet();
        });

        showNotification('Wallet connected successfully!');
        return selectedAccount;

    } catch (error) {
        console.error("Could not connect to wallet", error);
        if (error.code === 4001) {
            // User rejected the connection
            showNotification('User rejected wallet connection');
        } else {
            showNotification('Failed to connect wallet. Please try again.');
        }
    }
}

async function disconnectWallet() {
    console.log("Disconnecting wallet");
    try {
        if(provider && provider.close) {
            await provider.close();
        }
        if(web3Modal) {
            await web3Modal.clearCachedProvider();
        }
        provider = null;
        selectedAccount = null;
        isConnected = false;
        accounts = [];
        
        const connectButton = document.querySelector('.connect-wallet-btn');
        if (connectButton) {
            connectButton.textContent = 'Connect Wallet';
            connectButton.classList.remove('connected');
        }
        
        showNotification('Wallet disconnected');
    } catch (error) {
        console.error("Error disconnecting wallet:", error);
        showNotification('Error disconnecting wallet');
    }
}

function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
        handleDisconnect();
    } else {
        accounts = newAccounts;
        isConnected = true;
        updateConnectButton();
        updateWalletStatus();
    }
}

function handleDisconnect() {
    isConnected = false;
    accounts = [];
    updateConnectButton();
    updateWalletStatus();
    showNotification('Wallet disconnected');
}

function updateConnectButton() {
    const connectBtns = document.querySelectorAll('.connect-wallet-btn');
    connectBtns.forEach(btn => {
        if (isConnected) {
            const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
            btn.innerHTML = shortAddress;
            btn.classList.add('connected');
        } else {
            btn.innerHTML = 'Connect Wallet';
            btn.classList.remove('connected');
        }
    });
    updateWalletStatus();
}

function updateWalletStatus() {
    const walletStatus = document.querySelector('.wallet-status');
    const statusAddress = walletStatus.querySelector('.status-address');
    
    if (isConnected && accounts.length > 0) {
        const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        statusAddress.textContent = shortAddress;
        walletStatus.style.display = 'flex';
    } else {
        walletStatus.style.display = 'none';
    }
}

// Handle Place Bid functionality
async function placeBid(itemId, price) {
    if (!isConnected) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        // Here you would typically interact with your smart contract
        alert('Bidding functionality will be implemented with smart contracts');
    } catch (error) {
        console.error("Error placing bid:", error);
        alert('Failed to place bid. Please try again.');
    }
}

// Initialize buttons
document.addEventListener('DOMContentLoaded', async function() {
    console.log("DOM Content Loaded - Setting up wallet connection");
    
    // Load tasks section only if container exists on the page
    const tasksContainer = document.getElementById('tasks-container');
    if (tasksContainer) {
        fetch('tasks-section.html')
            .then(response => response.text())
            .then(html => {
                tasksContainer.innerHTML = html;
            })
            .catch(error => console.error('Error loading tasks section:', error));
    }

    // Initialize Web3Modal first
    await init();
    
    // Create UI elements if they don't exist
    if (!document.querySelector('.wallet-popup-overlay')) {
        document.body.appendChild(popupOverlay);
    }
    if (!document.querySelector('.wallet-status')) {
        document.body.appendChild(walletStatus);
    }
    
    // Setup task buttons
    document.querySelectorAll('.task-btn').forEach(btn => {
        btn.addEventListener('click', () => completeTask(btn.dataset.task));
    });

    // Setup claim button
    const claimBtn = document.querySelector('.claim-btn');
    if (claimBtn) {
        claimBtn.addEventListener('click', claimRewards);
    }

    // Setup copy referral button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyReferralLink);
    }

    // Show daily tasks section when wallet is connected
    const dailyTasksSection = document.getElementById('daily-tasks');
    if (dailyTasksSection) {
        // Initial check for wallet connection
        const isInitiallyConnected = document.querySelector('.connect-wallet-btn.connected');
        if (isInitiallyConnected) {
            dailyTasksSection.style.display = 'block';
            updateStats();
            if (document.getElementById('referralLink')) {
                document.getElementById('referralLink').value = generateReferralLink();
            }
        }

        // Watch for future connection changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isConnected = document.querySelector('.connect-wallet-btn').classList.contains('connected');
                    dailyTasksSection.style.display = isConnected ? 'block' : 'none';
                    if (isConnected) {
                        updateStats();
                        if (document.getElementById('referralLink')) {
                            document.getElementById('referralLink').value = generateReferralLink();
                        }
                    }
                }
            });
        });

        const connectBtn = document.querySelector('.connect-wallet-btn');
        if (connectBtn) {
            observer.observe(connectBtn, {
                attributes: true
            });
        }
    }

    // Setup popup events
    const closeBtn = document.querySelector('.wallet-popup-close');
    const metamaskBtn = document.querySelector('.wallet-option.metamask');
    const walletconnectBtn = document.querySelector('.wallet-option.walletconnect');
    const disconnectBtn = document.querySelector('.wallet-status .disconnect-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });
    }

    if (metamaskBtn) {
        metamaskBtn.addEventListener('click', handleMetaMaskConnect);
    }

    if (walletconnectBtn) {
        walletconnectBtn.addEventListener('click', async () => {
            try {
                await connectWallet();
                popupOverlay.style.display = 'none';
            } catch (error) {
                console.error('WalletConnect connection error:', error);
                showNotification('Failed to connect to WalletConnect. Please try again.');
            }
        });
    }

    if (disconnectBtn) {
        disconnectBtn.addEventListener('click', disconnectWallet);
    }

    // Close popup when clicking outside
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    // Connect wallet buttons - IMPORTANT: This is the main fix
    console.log("Setting up connect wallet buttons...");
    const connectBtns = document.querySelectorAll('.connect-wallet-btn');
    console.log("Found connect buttons:", connectBtns.length);
    
    connectBtns.forEach(btn => {
        console.log("Adding click listener to button:", btn);
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Connect wallet button clicked!");
            await connectWallet();
        });
    });

    // Place bid buttons
    const bidBtns = document.querySelectorAll('.place-bid-btn');
    bidBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            const price = this.getAttribute('data-price');
            placeBid(itemId, price);
        });
    });

    // Add handleMetaMaskConnect function
    async function handleMetaMaskConnect() {
        if (typeof window.ethereum === 'undefined') {
            showNotification('Please install MetaMask first!');
            window.open('https://metamask.io', '_blank');
            return;
        }
        try {
            await connectWallet();
            popupOverlay.style.display = 'none';
        } catch (error) {
            console.error('MetaMask connection error:', error);
            showNotification('Failed to connect to MetaMask. Please try again.');
        }
    }

    // Check if already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        handleMetaMaskConnect();
    }
    
    console.log("Wallet connection setup complete");
});

// Also add event listeners when the page is fully loaded
window.addEventListener('load', function() {
    console.log("Window loaded - Double-checking connect wallet buttons");
    
    // Re-setup connect wallet buttons in case they were added dynamically
    const connectBtns = document.querySelectorAll('.connect-wallet-btn');
    connectBtns.forEach(btn => {
        // Remove existing listeners to avoid duplicates
        btn.removeEventListener('click', connectWallet);
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Connect wallet button clicked (from load event)!");
            await connectWallet();
        });
    });
});
