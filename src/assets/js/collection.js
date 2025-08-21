// Collection JavaScript - COINPAYOT NFT
// Cấu trúc được thiết kế để dễ dàng tích hợp API

// ========================================
// CONFIGURATION
// ========================================
const COLLECTION_CONFIG = {
    // API Configuration (sẽ thay đổi khi tích hợp API thực)
    API_BASE_URL: 'https://api.phantom-nft.com',
    API_ENDPOINTS: {
        collection: '/api/collections',
        items: '/api/collections/items',
        stats: '/api/collections/stats',
        history: '/api/collections/history',
        follow: '/api/collections/follow'
    },
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    
    // Demo data (sẽ được thay thế bằng API calls)
    USE_DEMO_DATA: true,
    
    // Loading states
    LOADING_DELAY: 1000,
};

// ========================================
// DEMO DATA (Sẽ được thay thế bằng API)
// ========================================
const DEMO_COLLECTION = {
    id: 1,
    name: "Ancient Bows Collection",
    description: "Legendary bows from ancient civilizations with mystical powers and unique enchantments",
    banner: "images/banner-lg1.jpg",
    creator: {
        name: "Mutin Cap",
        avatar: "images/clients-item2.jpg",
        walletAddress: "0x1234...5678"
    },
    stats: {
        totalItems: 12,
        floorPrice: 2.5,
        totalVolume: 45.6,
        owners: 8,
        currency: "PPO"
    },
    isFollowing: false
};

const DEMO_COLLECTION_ITEMS = [
    {
        id: 1,
        name: "Ancient Skeleton Bow",
        image: "images/nft1.jpg",
        price: 3.29,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        description: "Legendary skeleton bow with dark magic powers",
        likes: 234,
        views: 1234,
        listedAt: "2024-01-15T10:30:00Z",
        owner: "0xabcd...efgh"
    },
    {
        id: 2,
        name: "Volcanic Breath Bow",
        image: "images/nft3.jpg",
        price: 1.22,
        currency: "PPO",
        rarity: "basic",
        rarityBadge: "★★★",
        description: "Bow forged from volcanic rock with fire enchantment",
        likes: 123,
        views: 890,
        listedAt: "2024-01-13T09:15:00Z",
        owner: "0x1234...5678"
    },
    {
        id: 3,
        name: "Frost Breath Bow",
        image: "images/nft5.jpg",
        price: 9.82,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        description: "Ice-cold bow that freezes enemies",
        likes: 789,
        views: 3456,
        listedAt: "2024-01-11T11:30:00Z",
        owner: "0x9876...5432"
    },
    {
        id: 4,
        name: "Thunder Strike Bow",
        image: "images/collection-item1.jpg",
        price: 4.15,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★",
        description: "Bow that channels lightning power",
        likes: 234,
        views: 1234,
        listedAt: "2024-01-09T13:10:00Z",
        owner: "0x5678...1234"
    },
    {
        id: 5,
        name: "Shadow Bow",
        image: "images/collection-item2.jpg",
        price: 2.75,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★★",
        description: "Bow that moves silently through shadows",
        likes: 312,
        views: 1456,
        listedAt: "2024-01-07T12:30:00Z",
        owner: "0xabcd...efgh"
    },
    {
        id: 6,
        name: "Golden Bow",
        image: "images/collection-item3.jpg",
        price: 6.50,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        description: "Golden bow with divine powers",
        likes: 567,
        views: 2345,
        listedAt: "2024-01-05T09:15:00Z",
        owner: "0x1234...5678"
    }
];

const DEMO_RECENT_SALES = [
    {
        id: 1,
        itemName: "Ancient Skeleton Bow",
        itemImage: "images/nft1.jpg",
        price: 3.29,
        currency: "PPO",
        buyer: "0xabcd...efgh",
        seller: "0x1234...5678",
        timestamp: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        itemName: "Volcanic Breath Bow",
        itemImage: "images/nft3.jpg",
        price: 1.22,
        currency: "PPO",
        buyer: "0x1234...5678",
        seller: "0x9876...5432",
        timestamp: "2024-01-13T09:15:00Z"
    },
    {
        id: 3,
        itemName: "Thunder Strike Bow",
        itemImage: "images/collection-item1.jpg",
        price: 4.15,
        currency: "PPO",
        buyer: "0x5678...1234",
        seller: "0xabcd...efgh",
        timestamp: "2024-01-09T13:10:00Z"
    },
    {
        id: 4,
        itemName: "Shadow Bow",
        itemImage: "images/collection-item2.jpg",
        price: 2.75,
        currency: "PPO",
        buyer: "0xabcd...efgh",
        seller: "0x1234...5678",
        timestamp: "2024-01-07T12:30:00Z"
    }
];

// ========================================
// STATE MANAGEMENT
// ========================================
let collectionState = {
    currentPage: 1,
    totalPages: 1,
    filters: {
        rarity: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'recent',
        searchQuery: ''
    },
    items: [],
    loading: false,
    collection: DEMO_COLLECTION
};

// ========================================
// API FUNCTIONS (Sẽ thay thế demo data)
// ========================================

// Fetch collection details
async function fetchCollectionDetails(collectionId) {
    if (COLLECTION_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return DEMO_COLLECTION;
    } else {
        try {
            const response = await fetch(`${COLLECTION_CONFIG.API_BASE_URL}${COLLECTION_CONFIG.API_ENDPOINTS.collection}/${collectionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch collection details');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching collection details:', error);
            throw error;
        }
    }
}

// Fetch collection items
async function fetchCollectionItems(collectionId, page = 1, filters = {}) {
    if (COLLECTION_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, COLLECTION_CONFIG.LOADING_DELAY));
        
        let filteredItems = [...DEMO_COLLECTION_ITEMS];
        
        // Apply filters
        if (filters.rarity) {
            filteredItems = filteredItems.filter(item => item.rarity === filters.rarity);
        }
        
        if (filters.minPrice) {
            filteredItems = filteredItems.filter(item => item.price >= parseFloat(filters.minPrice));
        }
        
        if (filters.maxPrice) {
            filteredItems = filteredItems.filter(item => item.price <= parseFloat(filters.maxPrice));
        }
        
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }
        
        // Apply sorting
        switch (filters.sortBy) {
            case 'price-low':
                filteredItems.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredItems.sort((a, b) => b.price - a.price);
                break;
            case 'rarity':
                const rarityOrder = { 'mega': 3, 'premium': 2, 'basic': 1 };
                filteredItems.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
                break;
            case 'popular':
                filteredItems.sort((a, b) => b.likes - a.likes);
                break;
            default: // recent
                filteredItems.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
        }
        
        // Pagination
        const startIndex = (page - 1) * COLLECTION_CONFIG.ITEMS_PER_PAGE;
        const endIndex = startIndex + COLLECTION_CONFIG.ITEMS_PER_PAGE;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);
        
        return {
            items: paginatedItems,
            total: filteredItems.length,
            page: page,
            totalPages: Math.ceil(filteredItems.length / COLLECTION_CONFIG.ITEMS_PER_PAGE)
        };
    } else {
        try {
            const response = await fetch(`${COLLECTION_CONFIG.API_BASE_URL}${COLLECTION_CONFIG.API_ENDPOINTS.items}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionId,
                    page,
                    limit: COLLECTION_CONFIG.ITEMS_PER_PAGE,
                    filters
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch collection items');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching collection items:', error);
            throw error;
        }
    }
}

// Fetch recent sales
async function fetchRecentSales(collectionId) {
    if (COLLECTION_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return DEMO_RECENT_SALES;
    } else {
        try {
            const response = await fetch(`${COLLECTION_CONFIG.API_BASE_URL}${COLLECTION_CONFIG.API_ENDPOINTS.history}/${collectionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recent sales');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching recent sales:', error);
            throw error;
        }
    }
}

// ========================================
// UI FUNCTIONS
// ========================================

// Render collection item card
function renderCollectionItemCard(item) {
    const rarityClass = {
        'basic': 'bg-secondary',
        'premium': 'bg-primary',
        'mega': 'bg-warning'
    }[item.rarity] || 'bg-secondary';
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="collection-item-card">
                <div class="position-relative">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <span class="badge ${rarityClass} rarity-badge">${item.rarityBadge}</span>
                </div>
                <div class="item-info">
                    <h5 class="item-name">${item.name}</h5>
                    <div class="item-price mb-3">
                        ${item.price} ${item.currency}
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-buy btn-sm" onclick="buyItem(${item.id})">
                            <i class="fas fa-shopping-cart me-1"></i>Buy Now
                        </button>
                        <button class="btn btn-bid btn-sm" onclick="placeBid(${item.id})">
                            <i class="fas fa-gavel me-1"></i>Place Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render items grid
function renderItemsGrid(items) {
    const itemsGrid = document.getElementById('itemsGrid');
    if (!itemsGrid) return;
    
    if (items.length === 0) {
        itemsGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-white">No items found</h4>
                    <p class="text-white-50">Try adjusting your filters or search terms</p>
                </div>
            </div>
        `;
        return;
    }
    
    itemsGrid.innerHTML = items.map(item => renderCollectionItemCard(item)).join('');
}

// Render pagination
function renderPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination || totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Render recent sales
function renderRecentSales(sales) {
    const recentSales = document.getElementById('recentSales');
    if (!recentSales) return;
    
    if (sales.length === 0) {
        recentSales.innerHTML = `
            <div class="text-center py-3">
                <p class="text-white-50">No recent sales</p>
            </div>
        `;
        return;
    }
    
    recentSales.innerHTML = sales.map(sale => `
        <div class="recent-sale-item">
            <img src="${sale.itemImage}" alt="${sale.itemName}" class="sale-item-image">
            <div class="sale-item-info">
                <div class="sale-item-name">${sale.itemName}</div>
                <div class="sale-item-price">${sale.price} ${sale.currency}</div>
            </div>
            <div class="sale-item-time">
                ${formatTimeAgo(sale.timestamp)}
            </div>
        </div>
    `).join('');
}

// Update collection info
function updateCollectionInfo(collection) {
    document.getElementById('collectionName').textContent = collection.name;
    document.getElementById('collectionDescription').textContent = collection.description;
    document.getElementById('creatorName').textContent = collection.creator.name;
    
    // Update stats
    document.getElementById('totalItems').textContent = collection.stats.totalItems;
    document.getElementById('floorPrice').textContent = `${collection.stats.floorPrice} ${collection.stats.currency}`;
    document.getElementById('totalVolume').textContent = `${collection.stats.totalVolume} ${collection.stats.currency}`;
    document.getElementById('owners').textContent = collection.stats.owners;
    
    // Update follow button
    const followBtn = document.getElementById('followBtn');
    if (collection.isFollowing) {
        followBtn.innerHTML = '<i class="fas fa-check me-2"></i>Following';
        followBtn.classList.add('btn-success');
        followBtn.classList.remove('btn-primary');
    } else {
        followBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Follow';
        followBtn.classList.add('btn-primary');
        followBtn.classList.remove('btn-success');
    }
}

// Show/hide loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const itemsGrid = document.getElementById('itemsGrid');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        itemsGrid.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        itemsGrid.style.opacity = '1';
    }
}

// Initialize price chart
function initPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Floor Price (PPO)',
                data: [2.1, 2.3, 2.8, 2.5, 2.7, 2.5],
                borderColor: '#cc00ff',
                backgroundColor: 'rgba(204, 0, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// ========================================
// EVENT HANDLERS
// ========================================

// Load collection items
async function loadCollectionItems(page = 1) {
    try {
        setLoadingState(true);
        collectionState.loading = true;
        
        const result = await fetchCollectionItems(collectionState.collection.id, page, collectionState.filters);
        
        collectionState.items = result.items;
        collectionState.currentPage = result.page;
        collectionState.totalPages = result.totalPages;
        
        renderItemsGrid(result.items);
        renderPagination(result.page, result.totalPages);
        
    } catch (error) {
        console.error('Error loading collection items:', error);
        showNotification('Failed to load collection items', true);
    } finally {
        setLoadingState(false);
        collectionState.loading = false;
    }
}

// Change page
function changePage(page) {
    if (page < 1 || page > collectionState.totalPages || collectionState.loading) {
        return;
    }
    
    loadCollectionItems(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Apply filters
function applyFilters() {
    collectionState.filters = {
        rarity: document.getElementById('rarityFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        sortBy: document.getElementById('sortBy').value,
        searchQuery: document.getElementById('searchInput').value
    };
    
    loadCollectionItems(1);
}

// Clear filters
function clearFilters() {
    document.getElementById('rarityFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortBy').value = 'recent';
    document.getElementById('searchInput').value = '';
    
    collectionState.filters = {
        rarity: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'recent',
        searchQuery: ''
    };
    
    loadCollectionItems(1);
}

// Search functionality
function performSearch() {
    collectionState.filters.searchQuery = document.getElementById('searchInput').value;
    loadCollectionItems(1);
}

// Toggle follow collection
function toggleFollowCollection() {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    collectionState.collection.isFollowing = !collectionState.collection.isFollowing;
    updateCollectionInfo(collectionState.collection);
    
    if (collectionState.collection.isFollowing) {
        showNotification(`Now following ${collectionState.collection.name}`);
    } else {
        showNotification(`Unfollowed ${collectionState.collection.name}`);
    }
    
    // TODO: Implement API call to follow/unfollow
    console.log('Toggle follow collection:', collectionState.collection.id);
}

// Buy item
function buyItem(itemId) {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    // TODO: Implement buy functionality
    showNotification(`Buying item #${itemId}... (Feature coming soon)`);
    console.log('Buy item:', itemId);
}

// Place bid
function placeBid(itemId) {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    // TODO: Implement bid functionality
    showNotification(`Placing bid on item #${itemId}... (Feature coming soon)`);
    console.log('Place bid on item:', itemId);
}

// Check if wallet is connected
function isWalletConnected() {
    return localStorage.getItem('walletConnected') === 'true';
}

// Show notification
function showNotification(message, isError = false) {
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

// Format time ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Just now';
    } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize collection page
async function initCollection() {
    try {
        // Get collection ID from URL (for demo, use ID 1)
        const collectionId = 1; // In real app, get from URL params
        
        // Load collection details
        const collection = await fetchCollectionDetails(collectionId);
        collectionState.collection = collection;
        updateCollectionInfo(collection);
        
        // Load collection items
        await loadCollectionItems(1);
        
        // Load recent sales
        const sales = await fetchRecentSales(collectionId);
        renderRecentSales(sales);
        
        // Initialize price chart
        initPriceChart();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing collection:', error);
        showNotification('Failed to initialize collection page', true);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
    document.getElementById('clearFilters')?.addEventListener('click', clearFilters);
    
    // Search
    document.getElementById('searchBtn')?.addEventListener('click', performSearch);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filter changes
    document.getElementById('rarityFilter')?.addEventListener('change', applyFilters);
    document.getElementById('sortBy')?.addEventListener('change', applyFilters);
    
    // Price range changes
    document.getElementById('minPrice')?.addEventListener('change', applyFilters);
    document.getElementById('maxPrice')?.addEventListener('change', applyFilters);
    
    // Follow button
    document.getElementById('followBtn')?.addEventListener('click', toggleFollowCollection);
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCollection);

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
`;
document.head.appendChild(style); 