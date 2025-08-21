// Marketplace JavaScript - COINPAYOT NFT
// Cấu trúc được thiết kế để dễ dàng tích hợp API

// ========================================
// CONFIGURATION
// ========================================
const MARKETPLACE_CONFIG = {
    // API Configuration (sẽ thay đổi khi tích hợp API thực)
    API_BASE_URL: 'https://api.phantom-nft.com', // Thay đổi URL API thực
    API_ENDPOINTS: {
        nfts: '/api/nfts',
        search: '/api/nfts/search',
        filters: '/api/nfts/filters',
        stats: '/api/marketplace/stats'
    },
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    
    // Demo data (sẽ được thay thế bằng API calls)
    USE_DEMO_DATA: true,
    
    // Loading states
    LOADING_DELAY: 1000, // Simulate API delay
};

// ========================================
// DEMO DATA (Sẽ được thay thế bằng API)
// ========================================
const DEMO_NFTS = [
    {
        id: 1,
        name: "Ancient Skeleton Bow",
        creator: "Mutin Cap",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/nft1.jpg",
        price: 3.29,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        category: "bows",
        description: "Legendary skeleton bow with dark magic powers",
        likes: 234,
        views: 1234,
        listedAt: "2024-01-15T10:30:00Z"
    },
    {
        id: 2,
        name: "Cyber Beam Arrow",
        creator: "Kelvin Glan",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/nft2.jpg",
        price: 5.40,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        category: "arrows",
        description: "Futuristic arrow with laser guidance system",
        likes: 456,
        views: 2345,
        listedAt: "2024-01-14T15:20:00Z"
    },
    {
        id: 3,
        name: "Volcanic Breath Bow",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item3.jpg",
        image: "images/nft3.jpg",
        price: 1.22,
        currency: "PPO",
        rarity: "basic",
        rarityBadge: "★★★",
        category: "bows",
        description: "Bow forged from volcanic rock with fire enchantment",
        likes: 123,
        views: 890,
        listedAt: "2024-01-13T09:15:00Z"
    },
    {
        id: 4,
        name: "Inferno Wrath Arrow",
        creator: "Kelvin Glan",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/nft4.jpg",
        price: 2.47,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★★",
        category: "arrows",
        description: "Arrow that burns through any target",
        likes: 345,
        views: 1567,
        listedAt: "2024-01-12T14:45:00Z"
    },
    {
        id: 5,
        name: "Frost Breath Bow",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item1.jpg",
        image: "images/nft5.jpg",
        price: 9.82,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        category: "bows",
        description: "Ice-cold bow that freezes enemies",
        likes: 789,
        views: 3456,
        listedAt: "2024-01-11T11:30:00Z"
    },
    {
        id: 6,
        name: "Hard Breath Arrow",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item3.jpg",
        image: "images/collection-item3.jpg",
        price: 0.22,
        currency: "PPO",
        rarity: "basic",
        rarityBadge: "★",
        category: "arrows",
        description: "Simple but effective arrow",
        likes: 67,
        views: 456,
        listedAt: "2024-01-10T16:20:00Z"
    },
    {
        id: 7,
        name: "Thunder Strike Bow",
        creator: "Mutin Cap",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item1.jpg",
        price: 4.15,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★",
        category: "bows",
        description: "Bow that channels lightning power",
        likes: 234,
        views: 1234,
        listedAt: "2024-01-09T13:10:00Z"
    },
    {
        id: 8,
        name: "Shadow Arrow",
        creator: "Kelvin Glan",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item2.jpg",
        price: 1.89,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★",
        category: "arrows",
        description: "Arrow that moves silently through shadows",
        likes: 189,
        views: 987,
        listedAt: "2024-01-08T10:45:00Z"
    },
    {
        id: 9,
        name: "Golden Quiver",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item1.jpg",
        image: "images/collection-item4.jpg",
        price: 2.75,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★★",
        category: "accessories",
        description: "Magical quiver that never runs out of arrows",
        likes: 312,
        views: 1456,
        listedAt: "2024-01-07T12:30:00Z"
    },
    {
        id: 10,
        name: "Archer's Gloves",
        creator: "Mutin Cap",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item5.jpg",
        price: 0.95,
        currency: "PPO",
        rarity: "basic",
        rarityBadge: "★★",
        category: "accessories",
        description: "Enhanced grip gloves for better accuracy",
        likes: 145,
        views: 678,
        listedAt: "2024-01-06T15:20:00Z"
    },
    {
        id: 11,
        name: "Forest Guardian",
        creator: "Kelvin Glan",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item6.jpg",
        price: 6.50,
        currency: "PPO",
        rarity: "mega",
        rarityBadge: "SSS",
        category: "characters",
        description: "Legendary archer character with nature powers",
        likes: 567,
        views: 2345,
        listedAt: "2024-01-05T09:15:00Z"
    },
    {
        id: 12,
        name: "Desert Hunter",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item3.jpg",
        image: "images/collection-item7.jpg",
        price: 3.80,
        currency: "PPO",
        rarity: "premium",
        rarityBadge: "★★★★★",
        category: "characters",
        description: "Expert archer specialized in desert warfare",
        likes: 298,
        views: 1345,
        listedAt: "2024-01-04T14:40:00Z"
    }
];

const DEMO_STATS = {
    totalItems: 1234,
    totalSales: 567,
    floorPrice: 0.5,
    currency: "PPO"
};

// ========================================
// STATE MANAGEMENT
// ========================================
let marketplaceState = {
    currentPage: 1,
    totalPages: 1,
    filters: {
        category: '',
        rarity: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'recent',
        searchQuery: ''
    },
    nfts: [],
    loading: false,
    stats: DEMO_STATS
};

// ========================================
// API FUNCTIONS (Sẽ thay thế demo data)
// ========================================

// Fetch NFTs from API
async function fetchNFTs(page = 1, filters = {}) {
    if (MARKETPLACE_CONFIG.USE_DEMO_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, MARKETPLACE_CONFIG.LOADING_DELAY));
        
        // Filter demo data
        let filteredNFTs = [...DEMO_NFTS];
        
        // Apply filters
        if (filters.category) {
            filteredNFTs = filteredNFTs.filter(nft => nft.category === filters.category);
        }
        
        if (filters.rarity) {
            filteredNFTs = filteredNFTs.filter(nft => nft.rarity === filters.rarity);
        }
        
        if (filters.minPrice) {
            filteredNFTs = filteredNFTs.filter(nft => nft.price >= parseFloat(filters.minPrice));
        }
        
        if (filters.maxPrice) {
            filteredNFTs = filteredNFTs.filter(nft => nft.price <= parseFloat(filters.maxPrice));
        }
        
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filteredNFTs = filteredNFTs.filter(nft => 
                nft.name.toLowerCase().includes(query) ||
                nft.creator.toLowerCase().includes(query) ||
                nft.description.toLowerCase().includes(query)
            );
        }
        
        // Apply sorting
        switch (filters.sortBy) {
            case 'price-low':
                filteredNFTs.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredNFTs.sort((a, b) => b.price - a.price);
                break;
            case 'rarity':
                const rarityOrder = { 'mega': 3, 'premium': 2, 'basic': 1 };
                filteredNFTs.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
                break;
            case 'popular':
                filteredNFTs.sort((a, b) => b.likes - a.likes);
                break;
            default: // recent
                filteredNFTs.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
        }
        
        // Pagination
        const startIndex = (page - 1) * MARKETPLACE_CONFIG.ITEMS_PER_PAGE;
        const endIndex = startIndex + MARKETPLACE_CONFIG.ITEMS_PER_PAGE;
        const paginatedNFTs = filteredNFTs.slice(startIndex, endIndex);
        
        return {
            nfts: paginatedNFTs,
            total: filteredNFTs.length,
            page: page,
            totalPages: Math.ceil(filteredNFTs.length / MARKETPLACE_CONFIG.ITEMS_PER_PAGE)
        };
    } else {
        // Real API call (implement when ready)
        try {
            const response = await fetch(`${MARKETPLACE_CONFIG.API_BASE_URL}${MARKETPLACE_CONFIG.API_ENDPOINTS.nfts}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page,
                    limit: MARKETPLACE_CONFIG.ITEMS_PER_PAGE,
                    filters
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch NFTs');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            throw error;
        }
    }
}

// Fetch marketplace stats
async function fetchMarketplaceStats() {
    if (MARKETPLACE_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return DEMO_STATS;
    } else {
        try {
            const response = await fetch(`${MARKETPLACE_CONFIG.API_BASE_URL}${MARKETPLACE_CONFIG.API_ENDPOINTS.stats}`);
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }
}

// ========================================
// UI FUNCTIONS
// ========================================

// Render NFT card
function renderNFTCard(nft) {
    const rarityClass = {
        'basic': 'bg-secondary',
        'premium': 'bg-primary',
        'mega': 'bg-warning'
    }[nft.rarity] || 'bg-secondary';
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="nft-card">
                <div class="position-relative">
                    <img src="${nft.image}" alt="${nft.name}" class="nft-image">
                    <span class="badge ${rarityClass} rarity-badge">${nft.rarityBadge}</span>
                </div>
                <div class="nft-info">
                    <h5 class="nft-title">${nft.name}</h5>
                    <div class="nft-creator d-flex align-items-center mb-2">
                        <img src="${nft.creatorAvatar}" alt="${nft.creator}" class="rounded-circle me-2" style="width: 20px; height: 20px;">
                        <span>${nft.creator}</span>
                    </div>
                    <div class="nft-price mb-3">
                        ${nft.price} ${nft.currency}
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-buy btn-sm" onclick="buyNFT(${nft.id})">
                            <i class="fas fa-shopping-cart me-1"></i>Buy Now
                        </button>
                        <button class="btn btn-bid btn-sm" onclick="placeBid(${nft.id})">
                            <i class="fas fa-gavel me-1"></i>Place Bid
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render NFT grid
function renderNFTGrid(nfts) {
    const nftGrid = document.getElementById('nftGrid');
    if (!nftGrid) return;
    
    if (nfts.length === 0) {
        nftGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-white">No NFTs found</h4>
                    <p class="text-white-50">Try adjusting your filters or search terms</p>
                </div>
            </div>
        `;
        return;
    }
    
    nftGrid.innerHTML = nfts.map(nft => renderNFTCard(nft)).join('');
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

// Update stats display
function updateStats(stats) {
    document.getElementById('totalItems').textContent = stats.totalItems.toLocaleString();
    document.getElementById('totalSales').textContent = stats.totalSales.toLocaleString();
    document.getElementById('floorPrice').textContent = `${stats.floorPrice} ${stats.currency}`;
}

// Show/hide loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const nftGrid = document.getElementById('nftGrid');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        nftGrid.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        nftGrid.style.opacity = '1';
    }
}

// ========================================
// EVENT HANDLERS
// ========================================

// Load NFTs
async function loadNFTs(page = 1) {
    try {
        setLoadingState(true);
        marketplaceState.loading = true;
        
        const result = await fetchNFTs(page, marketplaceState.filters);
        
        marketplaceState.nfts = result.nfts;
        marketplaceState.currentPage = result.page;
        marketplaceState.totalPages = result.totalPages;
        
        renderNFTGrid(result.nfts);
        renderPagination(result.page, result.totalPages);
        
    } catch (error) {
        console.error('Error loading NFTs:', error);
        showNotification('Failed to load NFTs', true);
    } finally {
        setLoadingState(false);
        marketplaceState.loading = false;
    }
}

// Change page
function changePage(page) {
    if (page < 1 || page > marketplaceState.totalPages || marketplaceState.loading) {
        return;
    }
    
    loadNFTs(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Apply filters
function applyFilters() {
    marketplaceState.filters = {
        category: document.getElementById('categoryFilter').value,
        rarity: document.getElementById('rarityFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        sortBy: document.getElementById('sortBy').value,
        searchQuery: document.getElementById('searchInput').value
    };
    
    loadNFTs(1);
}

// Clear filters
function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('rarityFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortBy').value = 'recent';
    document.getElementById('searchInput').value = '';
    
    marketplaceState.filters = {
        category: '',
        rarity: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'recent',
        searchQuery: ''
    };
    
    loadNFTs(1);
}

// Search functionality
function performSearch() {
    marketplaceState.filters.searchQuery = document.getElementById('searchInput').value;
    loadNFTs(1);
}

// Buy NFT (placeholder for future implementation)
function buyNFT(nftId) {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    // TODO: Implement buy functionality
    showNotification(`Buying NFT #${nftId}... (Feature coming soon)`);
    console.log('Buy NFT:', nftId);
}

// Place bid (placeholder for future implementation)
function placeBid(nftId) {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    // TODO: Implement bid functionality
    showNotification(`Placing bid on NFT #${nftId}... (Feature coming soon)`);
    console.log('Place bid on NFT:', nftId);
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

// ========================================
// INITIALIZATION
// ========================================

// Initialize marketplace
async function initMarketplace() {
    try {
        // Load initial stats
        const stats = await fetchMarketplaceStats();
        updateStats(stats);
        
        // Load initial NFTs
        await loadNFTs(1);
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing marketplace:', error);
        showNotification('Failed to initialize marketplace', true);
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
    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    document.getElementById('rarityFilter')?.addEventListener('change', applyFilters);
    document.getElementById('sortBy')?.addEventListener('change', applyFilters);
    
    // Price range changes
    document.getElementById('minPrice')?.addEventListener('change', applyFilters);
    document.getElementById('maxPrice')?.addEventListener('change', applyFilters);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format price
function formatPrice(price, currency = 'PPO') {
    return `${price} ${currency}`;
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
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

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMarketplace);

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