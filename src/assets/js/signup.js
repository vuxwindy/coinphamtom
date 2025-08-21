// Sign Up JavaScript - COINPAYOT NFT
// Xử lý đăng ký tài khoản với Firebase Auth

// ========================================
// FORM VALIDATION
// ========================================

// Validate password strength
function validatePassword(password) {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    const errors = [];
    
    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters`);
    }
    if (!hasUpperCase) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
        errors.push('Password must contain at least one number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate username
function validateUsername(username) {
    const minLength = 3;
    const maxLength = 20;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    
    const errors = [];
    
    if (username.length < minLength) {
        errors.push(`Username must be at least ${minLength} characters`);
    }
    if (username.length > maxLength) {
        errors.push(`Username must be less than ${maxLength} characters`);
    }
    if (!usernameRegex.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ========================================
// UI FUNCTIONS
// ========================================

// Show loading state
function setLoadingState(loading) {
    const signupBtn = document.getElementById('signupBtn');
    const btnText = signupBtn.querySelector('.btn-text');
    const btnLoading = signupBtn.querySelector('.btn-loading');
    
    if (loading) {
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        signupBtn.disabled = true;
    } else {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        signupBtn.disabled = false;
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

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ========================================
// FIREBASE AUTH FUNCTIONS
// ========================================

// Create user with email and password
async function createUserAccount(userData) {
    try {
        const { auth } = window.firebase;
        const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js');
        
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        );
        
        const user = userCredential.user;
        
        // Update user profile with username
        await updateProfile(user, {
            displayName: userData.username
        });
        
        return { success: true, data: user };
    } catch (error) {
        console.error('Error creating user account:', error);
        return { success: false, error: error.message };
    }
}

// Create user profile in Firestore
async function createUserProfile(user, userData) {
    try {
        const userProfile = {
            uid: user.uid,
            username: userData.username,
            email: userData.email,
            displayName: userData.username,
            walletAddress: null, // Will be set when wallet is connected
            referralCode: userData.referralCode || null,
            createdAt: new Date(),
            updatedAt: new Date(),
            isEmailVerified: user.emailVerified,
            lastLoginAt: new Date()
        };
        
        const result = await window.FirebaseService.createOrUpdateUser(userProfile);
        
        if (result.success) {
            // Process referral if provided
            if (userData.referralCode) {
                await window.FirebaseService.processReferral(user.uid, userData.referralCode);
            }
            
            // Generate referral code for new user
            await window.FirebaseService.generateReferralCode(user.uid);
            
            // Create initial token balance
            await window.FirebaseService.getTokenBalance(user.uid);
        }
        
        return result;
    } catch (error) {
        console.error('Error creating user profile:', error);
        return { success: false, error: error.message };
    }
}

// ========================================
// WALLET CONNECTION
// ========================================

// Connect wallet and create account
async function connectWalletAndSignup() {
    try {
        if (!window.ethereum) {
            showNotification('Please install MetaMask to connect your wallet', true);
            return;
        }
        
        setLoadingState(true);
        
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        if (accounts.length === 0) {
            showNotification('No accounts found. Please unlock MetaMask.', true);
            return;
        }
        
        const walletAddress = accounts[0];
        
        // Check if user already exists with this wallet
        const existingUser = await window.FirebaseService.getUserByWallet(walletAddress);
        
        if (existingUser.success) {
            showNotification('Wallet already registered. Please sign in instead.', true);
            return;
        }
        
        // Create user profile with wallet
        const userProfile = {
            uid: `wallet_${walletAddress.toLowerCase()}`,
            username: `user_${walletAddress.slice(2, 8)}`,
            email: `${walletAddress.slice(2, 8)}@phantom-nft.com`,
            displayName: `User ${walletAddress.slice(2, 8)}`,
            walletAddress: walletAddress,
            referralCode: getReferralCodeFromURL(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isEmailVerified: false,
            lastLoginAt: new Date()
        };
        
        const result = await window.FirebaseService.createOrUpdateUser(userProfile);
        
        if (result.success) {
            // Process referral if provided
            if (userProfile.referralCode) {
                await window.FirebaseService.processReferral(userProfile.uid, userProfile.referralCode);
            }
            
            // Generate referral code for new user
            await window.FirebaseService.generateReferralCode(userProfile.uid);
            
            // Create initial token balance
            await window.FirebaseService.getTokenBalance(userProfile.uid);
            
            // Save to localStorage
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', walletAddress);
            localStorage.setItem('userUid', userProfile.uid);
            
            showNotification('Account created successfully with wallet!');
            
            // Redirect to dashboard or home
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showNotification('Failed to create account: ' + result.error, true);
        }
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showNotification('Failed to connect wallet: ' + error.message, true);
    } finally {
        setLoadingState(false);
    }
}

// Get referral code from URL
function getReferralCodeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref') || null;
}

// ========================================
// FORM SUBMISSION
// ========================================

// Handle form submission
async function handleSignupForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const userData = {
        username: formData.get('username').trim(),
        email: formData.get('email').trim().toLowerCase(),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        referralCode: formData.get('referralCode').trim().toUpperCase() || null
    };
    
    // Validate form data
    const validation = validateFormData(userData);
    if (!validation.isValid) {
        showNotification(validation.errors.join('\n'), true);
        return;
    }
    
    try {
        setLoadingState(true);
        
        // Create user account with Firebase Auth
        const authResult = await createUserAccount(userData);
        
        if (!authResult.success) {
            showNotification('Failed to create account: ' + authResult.error, true);
            return;
        }
        
        const user = authResult.data;
        
        // Create user profile in Firestore
        const profileResult = await createUserProfile(user, userData);
        
        if (!profileResult.success) {
            showNotification('Failed to create profile: ' + profileResult.error, true);
            return;
        }
        
        // Save user data to localStorage
        localStorage.setItem('userUid', user.uid);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userDisplayName', userData.username);
        
        showNotification('Account created successfully! Welcome to COINPAYOT NFT!');
        
        // Redirect to dashboard or home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error during signup:', error);
        showNotification('An error occurred during signup. Please try again.', true);
    } finally {
        setLoadingState(false);
    }
}

// Validate form data
function validateFormData(userData) {
    const errors = [];
    
    // Validate username
    const usernameValidation = validateUsername(userData.username);
    if (!usernameValidation.isValid) {
        errors.push(...usernameValidation.errors);
    }
    
    // Validate email
    if (!validateEmail(userData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate password
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
        errors.push(...passwordValidation.errors);
    }
    
    // Validate password confirmation
    if (userData.password !== userData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    // Validate referral code (if provided)
    if (userData.referralCode && userData.referralCode.length !== 6) {
        errors.push('Referral code must be 6 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize signup page
function initSignup() {
    // Set up event listeners
    const signupForm = document.getElementById('signupForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    
    // Form submission
    signupForm.addEventListener('submit', handleSignupForm);
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Connect wallet button
    connectWalletBtn.addEventListener('click', connectWalletAndSignup);
    
    // Pre-fill referral code from URL if available
    const referralCode = getReferralCodeFromURL();
    if (referralCode) {
        document.getElementById('referralCode').value = referralCode;
    }
    
    // Real-time validation
    setupRealTimeValidation();
}

// Setup real-time form validation
function setupRealTimeValidation() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Username validation
    usernameInput.addEventListener('blur', () => {
        const validation = validateUsername(usernameInput.value.trim());
        if (!validation.isValid) {
            usernameInput.classList.add('is-invalid');
            showFieldError(usernameInput, validation.errors[0]);
        } else {
            usernameInput.classList.remove('is-invalid');
            hideFieldError(usernameInput);
        }
    });
    
    // Email validation
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            showFieldError(emailInput, 'Please enter a valid email address');
        } else {
            emailInput.classList.remove('is-invalid');
            hideFieldError(emailInput);
        }
    });
    
    // Password validation
    passwordInput.addEventListener('blur', () => {
        const validation = validatePassword(passwordInput.value);
        if (!validation.isValid) {
            passwordInput.classList.add('is-invalid');
            showFieldError(passwordInput, validation.errors[0]);
        } else {
            passwordInput.classList.remove('is-invalid');
            hideFieldError(passwordInput);
        }
    });
    
    // Confirm password validation
    confirmPasswordInput.addEventListener('blur', () => {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('is-invalid');
            showFieldError(confirmPasswordInput, 'Passwords do not match');
        } else {
            confirmPasswordInput.classList.remove('is-invalid');
            hideFieldError(confirmPasswordInput);
        }
    });
}

// Show field error
function showFieldError(input, message) {
    // Remove existing error
    hideFieldError(input);
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Hide field error
function hideFieldError(input) {
    const existingError = input.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSignup);

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
    
    .is-invalid {
        border-color: #dc3545 !important;
    }
    
    .invalid-feedback {
        display: block;
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style); 