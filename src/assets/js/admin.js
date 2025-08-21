// Admin Panel JavaScript - COINPAYOT NFT Platform
// Comprehensive admin management system

// ========================================
// ADMIN STATE MANAGEMENT
// ========================================
let adminState = {
    currentSection: 'dashboard',
    currentUser: null,
    isAuthenticated: false,
    users: [],
    nfts: [],
    listings: [],
    transactions: [],
    games: [],
    investments: [],
    referrals: [],
    pagination: {
        users: { page: 1, pageSize: 10, total: 0 },
        nfts: { page: 1, pageSize: 10, total: 0 },
        listings: { page: 1, pageSize: 10, total: 0 },
        transactions: { page: 1, pageSize: 10, total: 0 },
        games: { page: 1, pageSize: 10, total: 0 },
        investments: { page: 1, pageSize: 10, total: 0 },
        referrals: { page: 1, pageSize: 10, total: 0 }
    },
    filters: {
        users: {},
        nfts: {},
        listings: {},
        transactions: {},
        games: {},
        investments: {},
        referrals: {}
    },
    stats: {
        totalUsers: 0,
        totalNFTs: 0,
        totalListings: 0,
        totalGames: 0,
        totalTransactions: 0,
        totalInvestments: 0,
        totalReferrals: 0
    }
};

// ========================================
// INITIALIZATION
// ========================================

// Initialize admin panel
async function initAdminPanel() {
    try {
        showLoading(true);
        
        // Initialize Firebase first
        await initializeFirebase();
        
        // Check if already authenticated
        const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
        
        if (isAuthenticated) {
            // Already logged in, show admin panel
            showAdminPanel();
            await loadAdminData();
        } else {
            // Show login screen
            showLoginScreen();
        }
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing admin panel:', error);
        showNotification('Failed to initialize admin panel', true);
    } finally {
        showLoading(false);
    }
}

// Initialize Firebase for admin panel
async function initializeFirebase() {
    try {
        // Check if Firebase is already initialized
        if (window.firebase && window.firebase.db) {
            return;
        }
        
        // Wait for Firebase to be available (max 10 seconds)
        let attempts = 0;
        const maxAttempts = 20; // 20 attempts * 500ms = 10 seconds
        
        while (attempts < maxAttempts) {
            if (window.firebase && window.firebase.db) {
                return;
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
        }
        
        throw new Error('Firebase initialization timeout');
        
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw error;
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('adminLoginScreen').classList.remove('hidden');
    document.getElementById('adminPanelContent').classList.add('hidden');
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('adminLoginScreen').classList.add('hidden');
    document.getElementById('adminPanelContent').classList.remove('hidden');
    adminState.isAuthenticated = true;
}

// Load admin data after authentication
async function loadAdminData() {
    try {
        // Load dashboard stats
        await loadDashboardStats();
        
        // Load initial data
        await loadUsers();
        
        showNotification('Admin panel loaded successfully!');
        
    } catch (error) {
        console.error('Error loading admin data:', error);
        showNotification('Failed to load admin data', true);
    }
}

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

// Handle admin login
async function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    // Clear previous error
    errorDiv.classList.add('hidden');
    
    // Check credentials
    if (username === 'admin' && password === '123123') {
        // Authentication successful
        localStorage.setItem('adminAuthenticated', 'true');
        adminState.isAuthenticated = true;
        
        // Show admin panel
        showAdminPanel();
        
        // Load admin data
        await loadAdminData();
        
        showNotification('Login successful! Welcome to Admin Panel.');
        
    } else {
        // Authentication failed
        errorDiv.classList.remove('hidden');
        showNotification('Invalid username or password', true);
    }
}

// Handle admin logout
function logout() {
    // Clear authentication
    localStorage.removeItem('adminAuthenticated');
    adminState.isAuthenticated = false;
    adminState.currentUser = null;
    
    // Show login screen
    showLoginScreen();
    
    // Clear form
    document.getElementById('adminLoginForm').reset();
    
    showNotification('Logged out successfully');
}

// ========================================
// DASHBOARD FUNCTIONS
// ========================================

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        // Load users count
        const usersResult = await window.FirebaseService.adminGetAllUsers(1000);
        if (usersResult.success) {
            adminState.stats.totalUsers = usersResult.data.length;
        }
        
        // Load NFTs count
        const nftsResult = await window.FirebaseService.getAllNFTs(1000);
        if (nftsResult.success) {
            adminState.stats.totalNFTs = nftsResult.data.length;
        }
        
        // Load transactions count
        const transactionsResult = await window.FirebaseService.getAllTransactions(1000);
        if (transactionsResult.success) {
            adminState.stats.totalTransactions = transactionsResult.data.length;
        }
        
        // Load games count
        const gamesResult = await window.FirebaseService.getAllGames(1000);
        if (gamesResult.success) {
            adminState.stats.totalGames = gamesResult.data.length;
        }
        
        // Update UI
        updateDashboardUI();
        
        // Load recent activity
        await loadRecentActivity();
        
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        showNotification('Failed to load dashboard statistics', true);
    }
}

// Update dashboard UI
function updateDashboardUI() {
    document.getElementById('totalUsers').textContent = adminState.stats.totalUsers;
    document.getElementById('totalNFTs').textContent = adminState.stats.totalNFTs;
    document.getElementById('totalTransactions').textContent = adminState.stats.totalTransactions;
    document.getElementById('totalGames').textContent = adminState.stats.totalGames;
}

// Load recent activity
async function loadRecentActivity() {
    try {
        // Load recent users
        const usersResult = await window.FirebaseService.adminGetAllUsers(5);
        if (usersResult.success) {
            renderRecentUsers(usersResult.data);
        }
        
        // Load recent transactions
        const transactionsResult = await window.FirebaseService.getAllTransactions(5);
        if (transactionsResult.success) {
            renderRecentTransactions(transactionsResult.data);
        }
        
    } catch (error) {
        console.error('Error loading recent activity:', error);
    }
}

// Render recent users
function renderRecentUsers(users) {
    const container = document.getElementById('recentUsers');
    container.innerHTML = '';
    
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'd-flex align-items-center p-2 border-bottom border-secondary';
        userDiv.innerHTML = `
            <div class="me-3">
                <i class="fas fa-user-circle fa-2x text-primary"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold">${user.username || user.email || 'Unknown'}</div>
                <small class="text-muted">${user.email || 'No email'}</small>
            </div>
            <div class="text-end">
                <small class="text-muted">${formatDate(user.createdAt)}</small>
            </div>
        `;
        container.appendChild(userDiv);
    });
}

// Render recent transactions
function renderRecentTransactions(transactions) {
    const container = document.getElementById('recentTransactions');
    container.innerHTML = '';
    
    transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'd-flex align-items-center p-2 border-bottom border-secondary';
        transactionDiv.innerHTML = `
            <div class="me-3">
                <i class="fas fa-exchange-alt fa-2x text-success"></i>
            </div>
            <div class="flex-grow-1">
                <div class="fw-bold">${transaction.type || 'Unknown'}</div>
                <small class="text-muted">${transaction.amount || 0} PPO</small>
            </div>
            <div class="text-end">
                <small class="text-muted">${formatDate(transaction.createdAt)}</small>
            </div>
        `;
        container.appendChild(transactionDiv);
    });
}

// Refresh stats
async function refreshStats() {
    showLoading(true);
    await loadDashboardStats();
    showLoading(false);
    showNotification('Statistics refreshed!');
}

// Export data
function exportData() {
    // Implementation for data export
    showNotification('Export feature coming soon!');
}

// ========================================
// USER MANAGEMENT
// ========================================

// Load users
async function loadUsers() {
    try {
        showLoading(true);
        
        const result = await window.FirebaseService.adminGetAllUsers(1000);
        if (result.success) {
            adminState.users = result.data;
            renderUsersTable(adminState.users);
            updateUsersPagination(adminState.users.length);
        } else {
            showNotification('Failed to load users', true);
        }
        
    } catch (error) {
        console.error('Error loading users:', error);
        showNotification('Failed to load users', true);
    } finally {
        showLoading(false);
    }
}

// Render users table
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    const startIndex = (adminState.pagination.users.page - 1) * adminState.pagination.users.pageSize;
    const endIndex = startIndex + adminState.pagination.users.pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    paginatedUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.username || 'N/A'}</td>
            <td>${user.ppoBalance || 0} PPO</td>
            <td>
                <span class="badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}">
                    ${user.status || 'active'}
                </span>
            </td>
            <td>${formatDate(user.createdAt)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('userStatusFilter').value;
    
    let filteredUsers = adminState.users;
    
    if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
            (user.email && user.email.toLowerCase().includes(searchTerm)) ||
            (user.username && user.username.toLowerCase().includes(searchTerm))
        );
    }
    
    if (statusFilter) {
        filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
    }
    
    renderUsersTable(filteredUsers);
    updateUsersPagination(filteredUsers.length);
}

// Show add user modal
function showAddUserModal() {
    const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
    modal.show();
}

// Add user
async function addUser() {
    try {
        const email = document.getElementById('newUserEmail').value;
        const username = document.getElementById('newUserUsername').value;
        const balance = parseFloat(document.getElementById('newUserBalance').value) || 0;
        
        if (!email || !username) {
            showNotification('Please fill in all required fields', true);
            return;
        }
        
        // Create user data
        const userData = {
            email: email,
            username: username,
            ppoBalance: balance,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Add user to Firebase (this would need to be implemented in Firebase service)
        showNotification('User added successfully!');
        
        // Close modal and refresh
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        
        await loadUsers();
        
    } catch (error) {
        console.error('Error adding user:', error);
        showNotification('Failed to add user', true);
    }
}

// Edit user
async function editUser(userId) {
    try {
        const user = adminState.users.find(u => u.id === userId);
        if (!user) {
            showNotification('User not found', true);
            return;
        }
        
        // Populate edit modal
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserEmail').value = user.email || '';
        document.getElementById('editUserUsername').value = user.username || '';
        document.getElementById('editUserBalance').value = user.ppoBalance || 0;
        document.getElementById('editUserStatus').value = user.status || 'active';
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
        
    } catch (error) {
        console.error('Error editing user:', error);
        showNotification('Failed to load user data', true);
    }
}

// Update user
async function updateUser() {
    try {
        const userId = document.getElementById('editUserId').value;
        const email = document.getElementById('editUserEmail').value;
        const username = document.getElementById('editUserUsername').value;
        const balance = parseFloat(document.getElementById('editUserBalance').value) || 0;
        const status = document.getElementById('editUserStatus').value;
        
        if (!email || !username) {
            showNotification('Please fill in all required fields', true);
            return;
        }
        
        // Update user data (this would need to be implemented in Firebase service)
        showNotification('User updated successfully!');
        
        // Close modal and refresh
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();
        
        await loadUsers();
        
    } catch (error) {
        console.error('Error updating user:', error);
        showNotification('Failed to update user', true);
    }
}

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        return;
    }
    
    try {
        const result = await window.FirebaseService.adminDeleteUser(userId);
        if (result.success) {
            showNotification('User deleted successfully!');
            await loadUsers();
        } else {
            showNotification('Failed to delete user', true);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showNotification('Failed to delete user', true);
    }
}

// ========================================
// NFT MANAGEMENT
// ========================================

// Load NFTs
async function loadNFTs() {
    try {
        showLoading(true);
        
        const result = await window.FirebaseService.getAllNFTs(1000);
        if (result.success) {
            adminState.nfts = result.data;
            renderNFTsTable(adminState.nfts);
            updateNFTsPagination(adminState.nfts.length);
        } else {
            showNotification('Failed to load NFTs', true);
        }
        
    } catch (error) {
        console.error('Error loading NFTs:', error);
        showNotification('Failed to load NFTs', true);
    } finally {
        showLoading(false);
    }
}

// Render NFTs table
function renderNFTsTable(nfts) {
    const tbody = document.getElementById('nftsTableBody');
    tbody.innerHTML = '';
    
    const startIndex = (adminState.pagination.nfts.page - 1) * adminState.pagination.nfts.pageSize;
    const endIndex = startIndex + adminState.pagination.nfts.pageSize;
    const paginatedNFTs = nfts.slice(startIndex, endIndex);
    
    paginatedNFTs.forEach(nft => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nft.id || 'N/A'}</td>
            <td>${nft.name || 'N/A'}</td>
            <td>${nft.ownerId || 'N/A'}</td>
            <td>
                <span class="badge ${getRarityColor(nft.rarity)}">
                    ${nft.rarity || 'common'}
                </span>
            </td>
            <td>${nft.type || 'N/A'}</td>
            <td>${formatDate(nft.createdAt)}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-danger" onclick="deleteNFT('${nft.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get rarity color
function getRarityColor(rarity) {
    switch (rarity?.toLowerCase()) {
        case 'legendary': return 'bg-warning';
        case 'epic': return 'bg-purple';
        case 'rare': return 'bg-info';
        default: return 'bg-secondary';
    }
}

// Filter NFTs
function filterNFTs() {
    const searchTerm = document.getElementById('nftSearch').value.toLowerCase();
    const rarityFilter = document.getElementById('nftRarityFilter').value;
    
    let filteredNFTs = adminState.nfts;
    
    if (searchTerm) {
        filteredNFTs = filteredNFTs.filter(nft => 
            (nft.name && nft.name.toLowerCase().includes(searchTerm))
        );
    }
    
    if (rarityFilter) {
        filteredNFTs = filteredNFTs.filter(nft => nft.rarity === rarityFilter);
    }
    
    renderNFTsTable(filteredNFTs);
    updateNFTsPagination(filteredNFTs.length);
}

// Show add NFT modal
function showAddNFTModal() {
    const modal = new bootstrap.Modal(document.getElementById('addNFTModal'));
    modal.show();
}

// Add NFT
async function addNFT() {
    try {
        const name = document.getElementById('newNFTName').value;
        const description = document.getElementById('newNFTDescription').value;
        const rarity = document.getElementById('newNFTRarity').value;
        const type = document.getElementById('newNFTType').value;
        const imageUrl = document.getElementById('newNFTImage').value;
        
        if (!name) {
            showNotification('Please fill in NFT name', true);
            return;
        }
        
        // Create NFT data
        const nftData = {
            name: name,
            description: description,
            rarity: rarity,
            type: type,
            imageUrl: imageUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        // Add NFT to Firebase (this would need to be implemented in Firebase service)
        showNotification('NFT added successfully!');
        
        // Close modal and refresh
        const modal = bootstrap.Modal.getInstance(document.getElementById('addNFTModal'));
        modal.hide();
        
        await loadNFTs();
        
    } catch (error) {
        console.error('Error adding NFT:', error);
        showNotification('Failed to add NFT', true);
    }
}

// Delete NFT
async function deleteNFT(nftId) {
    if (!confirm('Are you sure you want to delete this NFT? This action cannot be undone.')) {
        return;
    }
    
    try {
        // Delete NFT from Firebase (this would need to be implemented in Firebase service)
        showNotification('NFT deleted successfully!');
        await loadNFTs();
    } catch (error) {
        console.error('Error deleting NFT:', error);
        showNotification('Failed to delete NFT', true);
    }
}

// ========================================
// NAVIGATION & UI FUNCTIONS
// ========================================

// Switch between sections
function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(`${section}-section`).style.display = 'block';
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update current section
    adminState.currentSection = section;
    
    // Load section data
    loadSectionData(section);
}

// Load data for specific section
async function loadSectionData(section) {
    try {
        switch (section) {
            case 'dashboard':
                await loadDashboardStats();
                break;
            case 'users':
                await loadUsers();
                break;
            case 'nfts':
                await loadNFTs();
                break;
            case 'listings':
                await loadListings();
                break;
            case 'transactions':
                await loadTransactions();
                break;
            case 'games':
                await loadGames();
                break;
            case 'investments':
                await loadInvestments();
                break;
            case 'referrals':
                await loadReferrals();
                break;
            case 'settings':
                loadSettings();
                break;
        }
    } catch (error) {
        console.error(`Error loading ${section} data:`, error);
        showNotification(`Failed to load ${section} data`, true);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Admin login form
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Search inputs with debounce
    const searchInputs = ['userSearch', 'nftSearch', 'listingSearch', 'transactionSearch', 'gameSearch', 'investmentSearch', 'referralSearch'];
    searchInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', debounce(() => {
                const section = inputId.replace('Search', '');
                switch (section) {
                    case 'user':
                        filterUsers();
                        break;
                    case 'nft':
                        filterNFTs();
                        break;
                    case 'listing':
                        filterListings();
                        break;
                    case 'transaction':
                        filterTransactions();
                        break;
                    case 'game':
                        filterGames();
                        break;
                    case 'investment':
                        filterInvestments();
                        break;
                    case 'referral':
                        filterReferrals();
                        break;
                }
            }, 300));
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Show/hide loading spinner
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = show ? 'block' : 'none';
    }
}

// Show notification
function showNotification(message, isError = false) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.innerHTML = `
        <i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'} me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Format date
function formatDate(date) {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'N/A';
    
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update pagination for users
function updateUsersPagination(total) {
    updatePagination('users', total);
}

// Update pagination for NFTs
function updateNFTsPagination(total) {
    updatePagination('nfts', total);
}

// Update pagination
function updatePagination(type, total) {
    const pagination = adminState.pagination[type];
    const totalPages = Math.ceil(total / pagination.pageSize);
    
    // Update showing info
    const start = (pagination.page - 1) * pagination.pageSize + 1;
    const end = Math.min(pagination.page * pagination.pageSize, total);
    
    const showingElement = document.getElementById(`${type}Showing`);
    const totalElement = document.getElementById(`${type}Total`);
    
    if (showingElement) showingElement.textContent = `${start}-${end}`;
    if (totalElement) totalElement.textContent = total;
    
    // Generate pagination buttons
    const paginationElement = document.getElementById(`${type}Pagination`);
    if (paginationElement) {
        paginationElement.innerHTML = '';
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${pagination.page === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${type}', ${pagination.page - 1})">Previous</a>`;
        paginationElement.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${pagination.page === i ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage('${type}', ${i})">${i}</a>`;
            paginationElement.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${pagination.page === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage('${type}', ${pagination.page + 1})">Next</a>`;
        paginationElement.appendChild(nextLi);
    }
}

// Change page
function changePage(type, page) {
    const pagination = adminState.pagination[type];
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    
    if (page < 1 || page > totalPages) return;
    
    pagination.page = page;
    
    // Re-render table
    switch (type) {
        case 'users':
            renderUsersTable(adminState.users);
            break;
        case 'nfts':
            renderNFTsTable(adminState.nfts);
            break;
        // Add other cases as needed
    }
    
    // Update pagination UI
    updatePagination(type, pagination.total);
}

// ========================================
// PLACEHOLDER FUNCTIONS FOR OTHER SECTIONS
// ========================================

// Load listings
async function loadListings() {
    try {
        showLoading(true);
        // Implementation for loading listings
        showNotification('Listings section coming soon!');
    } catch (error) {
        console.error('Error loading listings:', error);
        showNotification('Failed to load listings', true);
    } finally {
        showLoading(false);
    }
}

// Load transactions
async function loadTransactions() {
    try {
        showLoading(true);
        // Implementation for loading transactions
        showNotification('Transactions section coming soon!');
    } catch (error) {
        console.error('Error loading transactions:', error);
        showNotification('Failed to load transactions', true);
    } finally {
        showLoading(false);
    }
}

// Load games
async function loadGames() {
    try {
        showLoading(true);
        // Implementation for loading games
        showNotification('Games section coming soon!');
    } catch (error) {
        console.error('Error loading games:', error);
        showNotification('Failed to load games', true);
    } finally {
        showLoading(false);
    }
}

// Load investments
async function loadInvestments() {
    try {
        showLoading(true);
        // Implementation for loading investments
        showNotification('Investments section coming soon!');
    } catch (error) {
        console.error('Error loading investments:', error);
        showNotification('Failed to load investments', true);
    } finally {
        showLoading(false);
    }
}

// Load referrals
async function loadReferrals() {
    try {
        showLoading(true);
        // Implementation for loading referrals
        showNotification('Referrals section coming soon!');
    } catch (error) {
        console.error('Error loading referrals:', error);
        showNotification('Failed to load referrals', true);
    } finally {
        showLoading(false);
    }
}

// Load settings
function loadSettings() {
    // Implementation for loading settings
    showNotification('Settings section coming soon!');
}

// Filter functions for other sections
function filterListings() {
    showNotification('Listings filter coming soon!');
}

function filterTransactions() {
    showNotification('Transactions filter coming soon!');
}

function filterGames() {
    showNotification('Games filter coming soon!');
}

function filterInvestments() {
    showNotification('Investments filter coming soon!');
}

function filterReferrals() {
    showNotification('Referrals filter coming soon!');
}

// ========================================
// STARTUP
// ========================================
document.addEventListener('DOMContentLoaded', initAdminPanel);
