// Creators JavaScript - COINPAYOT NFT
// Cấu trúc được thiết kế để dễ dàng tích hợp API

// ========================================
// CONFIGURATION
// ========================================
const CREATORS_CONFIG = {
    // API Configuration (sẽ thay đổi khi tích hợp API thực)
    API_BASE_URL: 'https://api.phantom-nft.com',
    API_ENDPOINTS: {
        creators: '/api/creators',
        stats: '/api/creators/stats',
        collections: '/api/creators/collections',
        follow: '/api/creators/follow'
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
const DEMO_CREATORS = [
    {
        id: 1,
        name: "Mutin Cap",
        avatar: "images/clients-item2.jpg",
        banner: "images/banner-lg1.jpg",
        category: "bows",
        categoryLabel: "Bow Specialist",
        totalVolume: 245.6,
        totalSales: 89,
        followers: 1234,
        items: 23,
        description: "Legendary bow craftsman with 10+ years of experience",
        socialLinks: {
            twitter: "https://twitter.com/mutincap",
            instagram: "https://instagram.com/mutincap",
            website: "https://mutincap.com"
        },
        rank: 1,
        isFollowing: false
    },
    {
        id: 2,
        name: "Kelvin Glan",
        avatar: "images/clients-item2.jpg",
        banner: "images/banner-lg2.jpg",
        category: "arrows",
        categoryLabel: "Arrow Master",
        totalVolume: 189.3,
        totalSales: 67,
        followers: 987,
        items: 18,
        description: "Master of precision arrow crafting and enchantment",
        socialLinks: {
            twitter: "https://twitter.com/kelvinglan",
            instagram: "https://instagram.com/kelvinglan"
        },
        rank: 2,
        isFollowing: true
    },
    {
        id: 3,
        name: "Glam Lee",
        avatar: "images/clients-item3.jpg",
        banner: "images/banner-lg1.jpg",
        category: "accessories",
        categoryLabel: "Accessory Artist",
        totalVolume: 156.7,
        totalSales: 45,
        followers: 756,
        items: 31,
        description: "Creative accessory designer with unique magical touches",
        socialLinks: {
            twitter: "https://twitter.com/glamlee",
            instagram: "https://instagram.com/glamlee",
            website: "https://glamlee.art"
        },
        rank: 3,
        isFollowing: false
    },
    {
        id: 4,
        name: "Archer Pro",
        avatar: "images/clients-item1.jpg",
        banner: "images/banner-lg2.jpg",
        category: "characters",
        categoryLabel: "Character Designer",
        totalVolume: 134.2,
        totalSales: 38,
        followers: 654,
        items: 15,
        description: "Character artist specializing in legendary archers",
        socialLinks: {
            twitter: "https://twitter.com/archerpro",
            instagram: "https://instagram.com/archerpro"
        },
        rank: 4,
        isFollowing: false
    },
    {
        id: 5,
        name: "Bow Master",
        avatar: "images/clients-item2.jpg",
        banner: "images/banner-lg1.jpg",
        category: "bows",
        categoryLabel: "Bow Specialist",
        totalVolume: 98.5,
        totalSales: 29,
        followers: 432,
        items: 12,
        description: "Traditional bow maker with modern innovations",
        socialLinks: {
            twitter: "https://twitter.com/bowmaster",
            website: "https://bowmaster.com"
        },
        rank: 5,
        isFollowing: true
    },
    {
        id: 6,
        name: "Arrow Queen",
        avatar: "images/clients-item3.jpg",
        banner: "images/banner-lg2.jpg",
        category: "arrows",
        categoryLabel: "Arrow Master",
        totalVolume: 87.3,
        totalSales: 25,
        followers: 389,
        items: 19,
        description: "Queen of enchanted arrows and magical projectiles",
        socialLinks: {
            twitter: "https://twitter.com/arrowqueen",
            instagram: "https://instagram.com/arrowqueen"
        },
        rank: 6,
        isFollowing: false
    },
    {
        id: 7,
        name: "Accessory King",
        avatar: "images/clients-item1.jpg",
        banner: "images/banner-lg1.jpg",
        category: "accessories",
        categoryLabel: "Accessory Artist",
        totalVolume: 76.8,
        totalSales: 22,
        followers: 321,
        items: 27,
        description: "King of magical accessories and enchanted gear",
        socialLinks: {
            twitter: "https://twitter.com/accessoryking",
            instagram: "https://instagram.com/accessoryking",
            website: "https://accessoryking.com"
        },
        rank: 7,
        isFollowing: false
    },
    {
        id: 8,
        name: "Character Creator",
        avatar: "images/clients-item2.jpg",
        banner: "images/banner-lg2.jpg",
        category: "characters",
        categoryLabel: "Character Designer",
        totalVolume: 65.4,
        totalSales: 18,
        followers: 298,
        items: 11,
        description: "Creative character designer with unique storytelling",
        socialLinks: {
            twitter: "https://twitter.com/charactercreator",
            instagram: "https://instagram.com/charactercreator"
        },
        rank: 8,
        isFollowing: true
    }
];

const DEMO_COLLECTIONS = [
    {
        id: 1,
        name: "Ancient Bows Collection",
        creator: "Mutin Cap",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item1.jpg",
        items: 12,
        floorPrice: 2.5,
        totalVolume: 45.6,
        description: "Legendary bows from ancient civilizations"
    },
    {
        id: 2,
        name: "Cyber Arrows Set",
        creator: "Kelvin Glan",
        creatorAvatar: "images/clients-item2.jpg",
        image: "images/collection-item2.jpg",
        items: 8,
        floorPrice: 1.8,
        totalVolume: 32.1,
        description: "Futuristic arrows with advanced technology"
    },
    {
        id: 3,
        name: "Magical Accessories",
        creator: "Glam Lee",
        creatorAvatar: "images/clients-item3.jpg",
        image: "images/collection-item3.jpg",
        items: 15,
        floorPrice: 0.9,
        totalVolume: 28.7,
        description: "Enchanted accessories for archers"
    },
    {
        id: 4,
        name: "Legendary Characters",
        creator: "Archer Pro",
        creatorAvatar: "images/clients-item1.jpg",
        image: "images/collection-item4.jpg",
        items: 6,
        floorPrice: 3.2,
        totalVolume: 41.3,
        description: "Epic archer characters with unique abilities"
    }
];

const DEMO_STATS = {
    totalCreators: 156,
    totalVolume: 2.4,
    avgSales: 15.4
};

// ========================================
// STATE MANAGEMENT
// ========================================
let creatorsState = {
    currentPage: 1,
    totalPages: 1,
    filters: {
        category: '',
        sortBy: 'volume',
        searchQuery: ''
    },
    creators: [],
    loading: false,
    stats: DEMO_STATS
};

// ========================================
// API FUNCTIONS (Sẽ thay thế demo data)
// ========================================

// Fetch creators from API
async function fetchCreators(page = 1, filters = {}) {
    if (CREATORS_CONFIG.USE_DEMO_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, CREATORS_CONFIG.LOADING_DELAY));
        
        // Filter demo data
        let filteredCreators = [...DEMO_CREATORS];
        
        // Apply filters
        if (filters.category) {
            filteredCreators = filteredCreators.filter(creator => creator.category === filters.category);
        }
        
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filteredCreators = filteredCreators.filter(creator => 
                creator.name.toLowerCase().includes(query) ||
                creator.description.toLowerCase().includes(query)
            );
        }
        
        // Apply sorting
        switch (filters.sortBy) {
            case 'volume':
                filteredCreators.sort((a, b) => b.totalVolume - a.totalVolume);
                break;
            case 'sales':
                filteredCreators.sort((a, b) => b.totalSales - a.totalSales);
                break;
            case 'followers':
                filteredCreators.sort((a, b) => b.followers - a.followers);
                break;
            case 'recent':
                // Sort by rank for demo (in real API, would be by recent activity)
                filteredCreators.sort((a, b) => a.rank - b.rank);
                break;
            case 'items':
                filteredCreators.sort((a, b) => b.items - a.items);
                break;
        }
        
        // Pagination
        const startIndex = (page - 1) * CREATORS_CONFIG.ITEMS_PER_PAGE;
        const endIndex = startIndex + CREATORS_CONFIG.ITEMS_PER_PAGE;
        const paginatedCreators = filteredCreators.slice(startIndex, endIndex);
        
        return {
            creators: paginatedCreators,
            total: filteredCreators.length,
            page: page,
            totalPages: Math.ceil(filteredCreators.length / CREATORS_CONFIG.ITEMS_PER_PAGE)
        };
    } else {
        // Real API call (implement when ready)
        try {
            const response = await fetch(`${CREATORS_CONFIG.API_BASE_URL}${CREATORS_CONFIG.API_ENDPOINTS.creators}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page,
                    limit: CREATORS_CONFIG.ITEMS_PER_PAGE,
                    filters
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch creators');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching creators:', error);
            throw error;
        }
    }
}

// Fetch creator stats
async function fetchCreatorStats() {
    if (CREATORS_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return DEMO_STATS;
    } else {
        try {
            const response = await fetch(`${CREATORS_CONFIG.API_BASE_URL}${CREATORS_CONFIG.API_ENDPOINTS.stats}`);
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching creator stats:', error);
            throw error;
        }
    }
}

// Fetch featured collections
async function fetchFeaturedCollections() {
    if (CREATORS_CONFIG.USE_DEMO_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return DEMO_COLLECTIONS;
    } else {
        try {
            const response = await fetch(`${CREATORS_CONFIG.API_BASE_URL}${CREATORS_CONFIG.API_ENDPOINTS.collections}`);
            if (!response.ok) {
                throw new Error('Failed to fetch collections');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching collections:', error);
            throw error;
        }
    }
}

// ========================================
// UI FUNCTIONS
// ========================================

// Render creator card
function renderCreatorCard(creator) {
    const followBtnClass = creator.isFollowing ? 'follow-btn following' : 'follow-btn';
    const followBtnText = creator.isFollowing ? 'Following' : 'Follow';
    const followBtnIcon = creator.isFollowing ? 'fas fa-check' : 'fas fa-plus';
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="creator-card">
                <div class="rank-badge">#${creator.rank}</div>
                <img src="${creator.avatar}" alt="${creator.name}" class="creator-avatar">
                <div class="creator-info">
                    <h5 class="creator-name">${creator.name}</h5>
                    <div class="creator-category">${creator.categoryLabel}</div>
                    <p class="text-white-50 mb-3" style="font-size: 14px;">${creator.description}</p>
                    
                    <div class="creator-stats">
                        <div class="text-center">
                            <div class="stat-value">${creator.totalVolume} PPO</div>
                            <div class="stat-label">Volume</div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value">${creator.totalSales}</div>
                            <div class="stat-label">Sales</div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value">${creator.followers}</div>
                            <div class="stat-label">Followers</div>
                        </div>
                    </div>
                    
                    <button class="${followBtnClass}" onclick="toggleFollow(${creator.id})">
                        <i class="${followBtnIcon} me-2"></i>${followBtnText}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render creators grid
function renderCreatorsGrid(creators) {
    const creatorsGrid = document.getElementById('creatorsGrid');
    if (!creatorsGrid) return;
    
    if (creators.length === 0) {
        creatorsGrid.innerHTML = `
            <div class="col-12 text-center">
                <div class="py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-white">No creators found</h4>
                    <p class="text-white-50">Try adjusting your filters or search terms</p>
                </div>
            </div>
        `;
        return;
    }
    
    creatorsGrid.innerHTML = creators.map(creator => renderCreatorCard(creator)).join('');
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

// Render featured collections
function renderFeaturedCollections(collections) {
    const collectionsSwiper = document.getElementById('collectionsSwiper');
    if (!collectionsSwiper) return;
    
    collectionsSwiper.innerHTML = collections.map(collection => `
        <div class="swiper-slide">
            <div class="collection-card">
                <img src="${collection.image}" alt="${collection.name}" class="collection-image">
                <div class="collection-info">
                    <h5 class="collection-name">${collection.name}</h5>
                    <div class="collection-creator d-flex align-items-center">
                        <img src="${collection.creatorAvatar}" alt="${collection.creator}" class="rounded-circle me-2" style="width: 20px; height: 20px;">
                        <span>${collection.creator}</span>
                    </div>
                    <div class="collection-stats">
                        <div class="text-center">
                            <div class="stat-value">${collection.items}</div>
                            <div class="stat-label">Items</div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value">${collection.floorPrice} PPO</div>
                            <div class="stat-label">Floor</div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value">${collection.totalVolume} PPO</div>
                            <div class="stat-label">Volume</div>
                        </div>
                    </div>
                    <button class="btn btn-outline-primary btn-sm w-100" onclick="viewCollection(${collection.id})">
                        View Collection
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update stats display
function updateStats(stats) {
    document.getElementById('totalCreators').textContent = stats.totalCreators.toLocaleString();
    document.getElementById('totalVolume').textContent = `${stats.totalVolume}M PPO`;
    document.getElementById('avgSales').textContent = `${stats.avgSales}K`;
}

// Show/hide loading state
function setLoadingState(loading) {
    const loadingState = document.getElementById('loadingState');
    const creatorsGrid = document.getElementById('creatorsGrid');
    
    if (loading) {
        loadingState.classList.remove('d-none');
        creatorsGrid.style.opacity = '0.5';
    } else {
        loadingState.classList.add('d-none');
        creatorsGrid.style.opacity = '1';
    }
}

// Initialize sales chart
function initSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales Volume (PPO)',
                data: [120, 190, 300, 500, 200, 300],
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

// Load creators
async function loadCreators(page = 1) {
    try {
        setLoadingState(true);
        creatorsState.loading = true;
        
        const result = await fetchCreators(page, creatorsState.filters);
        
        creatorsState.creators = result.creators;
        creatorsState.currentPage = result.page;
        creatorsState.totalPages = result.totalPages;
        
        renderCreatorsGrid(result.creators);
        renderPagination(result.page, result.totalPages);
        
    } catch (error) {
        console.error('Error loading creators:', error);
        showNotification('Failed to load creators', true);
    } finally {
        setLoadingState(false);
        creatorsState.loading = false;
    }
}

// Change page
function changePage(page) {
    if (page < 1 || page > creatorsState.totalPages || creatorsState.loading) {
        return;
    }
    
    loadCreators(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Apply filters
function applyFilters() {
    creatorsState.filters = {
        category: document.getElementById('categoryFilter').value,
        sortBy: document.getElementById('sortBy').value,
        searchQuery: document.getElementById('searchInput').value
    };
    
    loadCreators(1);
}

// Search functionality
function performSearch() {
    creatorsState.filters.searchQuery = document.getElementById('searchInput').value;
    loadCreators(1);
}

// Toggle follow
function toggleFollow(creatorId) {
    if (!isWalletConnected()) {
        showNotification('Please connect your wallet first', true);
        return;
    }
    
    // Find creator and toggle follow status
    const creator = creatorsState.creators.find(c => c.id === creatorId);
    if (creator) {
        creator.isFollowing = !creator.isFollowing;
        
        // Update UI
        const followBtn = event.target.closest('.follow-btn');
        if (creator.isFollowing) {
            followBtn.classList.add('following');
            followBtn.innerHTML = '<i class="fas fa-check me-2"></i>Following';
            showNotification(`Now following ${creator.name}`);
        } else {
            followBtn.classList.remove('following');
            followBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Follow';
            showNotification(`Unfollowed ${creator.name}`);
        }
    }
    
    // TODO: Implement API call to follow/unfollow
    console.log('Toggle follow for creator:', creatorId);
}

// View collection
function viewCollection(collectionId) {
    // TODO: Navigate to collection page
    showNotification(`Viewing collection #${collectionId} (Feature coming soon)`);
    console.log('View collection:', collectionId);
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

// Initialize creators page
async function initCreators() {
    try {
        // Load initial stats
        const stats = await fetchCreatorStats();
        updateStats(stats);
        
        // Load initial creators
        await loadCreators(1);
        
        // Load featured collections
        const collections = await fetchFeaturedCollections();
        renderFeaturedCollections(collections);
        
        // Initialize sales chart
        initSalesChart();
        
        // Set up event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Error initializing creators:', error);
        showNotification('Failed to initialize creators page', true);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Filter changes
    document.getElementById('sortBy')?.addEventListener('change', applyFilters);
    document.getElementById('categoryFilter')?.addEventListener('change', applyFilters);
    
    // Search
    document.getElementById('searchBtn')?.addEventListener('click', performSearch);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ========================================
// STARTUP
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCreators);

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