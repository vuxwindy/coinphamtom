// Simple MetaMask Wallet Connection
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple wallet script loaded');
    
    // Find all connect wallet buttons
    const connectButtons = document.querySelectorAll('.connect-wallet-btn');
    console.log('Found connect buttons:', connectButtons.length);
    
    // Add click event to each button
    connectButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Connect wallet button clicked');
            
            try {
                await connectWallet();
            } catch (error) {
                console.error('Wallet connection error:', error);
                showNotification('Failed to connect wallet: ' + error.message, true);
            }
        });
    });
    
    // Check if already connected on page load
    checkExistingConnection();
    
    // Add copy referral link functionality
    setupCopyReferralLink();
    
    // Check for referral code in URL
    checkReferralFromURL();
    
    // Setup daily check-in functionality (legacy - now handled by daily-tasks system)
    setupDailyCheckIn();
});

// Setup copy referral link button
function setupCopyReferralLink() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const referralInput = document.getElementById('referralLink');
            if (referralInput && referralInput.value) {
                // Copy to clipboard
                referralInput.select();
                referralInput.setSelectionRange(0, 99999); // For mobile devices
                
                try {
                    document.execCommand('copy');
                    showNotification('Referral link copied to clipboard!');
                } catch (err) {
                    // Fallback for modern browsers
                    navigator.clipboard.writeText(referralInput.value).then(function() {
                        showNotification('Referral link copied to clipboard!');
                    }).catch(function() {
                        showNotification('Failed to copy referral link', true);
                    });
                }
            } else {
                showNotification('No referral link available', true);
            }
        });
    }
}

// Check for referral code in URL
function checkReferralFromURL() {
    const path = window.location.pathname;
    const referralCode = path.substring(1); // Remove leading slash
    
    // Check if it's a 6-character referral code
    if (referralCode && referralCode.length === 6 && /^[a-zA-Z0-9]{6}$/.test(referralCode)) {
        console.log('Referral code detected in URL:', referralCode);
        
        // Store the referral code
        localStorage.setItem('referrerCode', referralCode);
        
        // Show notification
        showNotification(`Welcome! You were referred by code: ${referralCode}`);
        
        // You can add logic here to track the referral
        // For example, send to backend API
        trackReferral(referralCode);
    }
}

// Track referral (placeholder for backend integration)
function trackReferral(referralCode) {
    console.log('Tracking referral:', referralCode);
    // Here you would typically send the referral code to your backend
    // Example:
    // fetch('/api/track-referral', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ referralCode: referralCode })
    // });
}

// Connect wallet function - Simple approach
async function connectWallet() {
    console.log('Starting wallet connection...');
    
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        showNotification('MetaMask is not installed! Please install MetaMask first.', true);
        window.open('https://metamask.io/download/', '_blank');
        return;
    }
    
    console.log('MetaMask detected:', window.ethereum.isMetaMask);
    
    try {
        // Simple approach - just request accounts
        console.log('Requesting accounts...');
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log('✅ Accounts request successful');
        
        // Initialize Web3
        if (typeof Web3 !== 'undefined') {
            window.web3 = new Web3(window.ethereum);
            console.log('✅ Web3 initialized');
            
            const account = web3.eth.accounts;
            const walletAddress = account.givenProvider.selectedAddress;
            console.log('Connected to account:', walletAddress);
            
            // Update button text
            updateButtonText(walletAddress);
            
                    // Save connection state
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletType', 'metamask');
        localStorage.setItem('walletAddress', walletAddress);
        
        // Generate referral link for new connection
        generateReferralLink(walletAddress);
        
        // Set up event listeners
        setupEventListeners();
        
        // Notify daily tasks about wallet connection
        if (window.DailyTasks && window.DailyTasks.wallet) {
            window.DailyTasks.wallet.handleWalletConnection(walletAddress);
        }
        
        showNotification('Successfully connected to MetaMask!');
            
        } else {
            // Fallback without Web3
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                const account = accounts[0];
                console.log('Connected to account:', account);
                
                // Update button text
                updateButtonText(account);
                
                // Save connection state
                localStorage.setItem('walletConnected', 'true');
                localStorage.setItem('walletType', 'metamask');
                localStorage.setItem('walletAddress', account);
                
                // Set up event listeners
                setupEventListeners();
                
                // Notify daily tasks about wallet connection
                if (window.DailyTasks && window.DailyTasks.wallet) {
                    window.DailyTasks.wallet.handleWalletConnection(account);
                }
                
                showNotification('Successfully connected to MetaMask!');
            } else {
                showNotification('No accounts found! Please unlock MetaMask and create/import an account.', true);
            }
        }
        
    } catch (error) {
        console.error('MetaMask connection error:', error);
        
        if (error.code === 4001) {
            showNotification('User rejected the connection request.', true);
        } else if (error.code === -32002) {
            showNotification('Please check MetaMask popup and approve the connection.', true);
        } else if (error.code === -32603) {
            showNotification('MetaMask is locked! Please unlock MetaMask and try again.', true);
        } else {
            showNotification('Failed to connect to MetaMask: ' + error.message, true);
        }
    }
}

// Check if already connected
async function checkExistingConnection() {
    if (typeof window.ethereum === 'undefined') {
        return;
    }
    
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        
        if (accounts.length > 0) {
            console.log('Already connected to account:', accounts[0]);
            updateButtonText(accounts[0]);
            setupEventListeners();
            
            // Generate referral link for connected user
            generateReferralLink(accounts[0]);
            
            // Notify daily tasks about existing wallet connection
            if (window.DailyTasks && window.DailyTasks.handleWalletConnection) {
                window.DailyTasks.handleWalletConnection(accounts[0]);
            }
        }
    } catch (error) {
        console.log('Error checking existing connection:', error.message);
    }
}

// Generate referral link
function generateReferralLink(walletAddress) {
    // Get existing referral code from localStorage or generate new one
    let referralCode = localStorage.getItem('referralCode');
    
    if (!referralCode) {
        // Generate new 6-character referral code
        referralCode = generateRandomCode();
        localStorage.setItem('referralCode', referralCode);
        localStorage.setItem('referralWallet', walletAddress);
    }
    
    // Create referral link
    const currentUrl = window.location.origin;
    const referralLink = `${currentUrl}/${referralCode}`;
    
    // Update referral link input
    const referralInput = document.getElementById('referralLink');
    if (referralInput) {
        referralInput.value = referralLink;
    }
    
    console.log('Generated referral link:', referralLink);
}

// Generate random 6-character code (a-z, A-Z, 0-9)
function generateRandomCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Update button text
function updateButtonText(account) {
    const shortAddress = account.substring(0, 6) + '...' + account.substring(account.length - 4);
    const connectButtons = document.querySelectorAll('.connect-wallet-btn');
    
    connectButtons.forEach(button => {
        button.textContent = shortAddress;
        button.style.background = '#4CAF50';
    });
}

// Set up event listeners
function setupEventListeners() {
    // Account change
    window.ethereum.on('accountsChanged', function (accounts) {
        console.log('Account changed event triggered');
        if (accounts.length === 0) {
            console.log('MetaMask locked or no accounts');
            resetWalletConnection();
            showNotification('MetaMask disconnected', true);
            
            // Notify daily tasks about wallet disconnection
                    if (window.DailyTasks && window.DailyTasks.wallet) {
            window.DailyTasks.wallet.handleWalletDisconnection();
        }
        } else {
            console.log('Account changed to:', accounts[0]);
            updateButtonText(accounts[0]);
            showNotification('Account changed to: ' + accounts[0].substring(0, 6) + '...' + accounts[0].substring(accounts[0].length - 4));
            
            // Notify daily tasks about new wallet connection
            if (window.DailyTasks && window.DailyTasks.handleWalletConnection) {
                window.DailyTasks.handleWalletConnection(accounts[0]);
            }
        }
    });
    
    // Chain change
    window.ethereum.on('chainChanged', function (chainId) {
        console.log('Chain changed to:', chainId);
        showNotification('Network changed to: ' + chainId);
    });
    
    // Disconnect
    window.ethereum.on('disconnect', function (error) {
        console.log('MetaMask disconnected:', error.message);
        resetWalletConnection();
        showNotification('MetaMask disconnected', true);
        
        // Notify daily tasks about wallet disconnection
        if (window.DailyTasks && window.DailyTasks.wallet) {
            window.DailyTasks.wallet.handleWalletDisconnection();
        }
    });
    
    console.log('Event listeners set up');
}

// Reset wallet connection
function resetWalletConnection() {
    const connectButtons = document.querySelectorAll('.connect-wallet-btn');
    
    connectButtons.forEach(button => {
        button.textContent = 'Connect Wallet';
        button.style.background = '';
    });
    
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletType');
    localStorage.removeItem('walletAddress');
}

// Show notification
function showNotification(message, isError = false) {
    // Remove existing notification
    const existingNotification = document.querySelector('.wallet-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'wallet-notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ${isError ? 'background: #f44336;' : 'background: #4CAF50;'}
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Setup daily check-in functionality (legacy - now handled by daily-tasks system)
function setupDailyCheckIn() {
    console.log('Daily check-in setup - now handled by daily-tasks system');
    // This function is kept for compatibility but daily tasks are now handled by the new system
} 