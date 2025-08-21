// Marketplace Integration - NFT Card System
class MarketplaceIntegration {
    constructor() {
        this.nftManager = null;
        this.currentUser = null;
        this.availableCards = [];
        this.filteredCards = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            rarity: '',
            type: '',
            series: '',
            priceMin: '',
            priceMax: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };
        this.init();
    }

    async init() {
        try {
            // Initialize NFT Manager
            if (typeof NFTCardManager !== 'undefined') {
                this.nftManager = new NFTCardManager();
            }

            // Check if user is logged in
            this.currentUser = this.getCurrentUser();
            
            // Load available cards for purchase
            await this.loadAvailableCards();
            this.setupEventListeners();
            this.updateMarketplaceStats();
        } catch (error) {
            console.error('Error initializing marketplace integration:', error);
        }
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    async loadAvailableCards() {
        try {
            if (!this.nftManager) return;

            const result = await this.nftManager.getCards({ status: 'active' });
            if (result.success) {
                this.availableCards = result.cards.filter(card => card.available > 0);
                this.filteredCards = [...this.availableCards];
                this.displayMarketplace();
            }
        } catch (error) {
            console.error('Error loading available cards:', error);
        }
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('filterRarity')?.addEventListener('change', (e) => {
            this.filters.rarity = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filterType')?.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filterSeries')?.addEventListener('change', (e) => {
            this.filters.series = e.target.value;
            this.applyFilters();
        });

        document.getElementById('sortBy')?.addEventListener('change', (e) => {
            this.filters.sortBy = e.target.value;
            this.applyFilters();
        });

        document.getElementById('sortOrder')?.addEventListener('change', (e) => {
            this.filters.sortOrder = e.target.value;
            this.applyFilters();
        });

        // Price range filters
        document.getElementById('minPrice')?.addEventListener('input', this.debounce(() => {
            this.filters.priceMin = document.getElementById('minPrice').value;
            this.applyFilters();
        }, 300));

        document.getElementById('maxPrice')?.addEventListener('input', this.debounce(() => {
            this.filters.priceMax = document.getElementById('maxPrice').value;
            this.applyFilters();
        }, 300));

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(() => {
                this.applyFilters();
            }, 300));
        }

        // Clear filters
        document.getElementById('clearFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });

        // Apply filters
        document.getElementById('applyFilters')?.addEventListener('click', () => {
            this.applyFilters();
        });
    }

    applyFilters() {
        let filtered = [...this.availableCards];

        // Apply rarity filter
        if (this.filters.rarity) {
            filtered = filtered.filter(card => 
                card.rarity === this.filters.rarity
            );
        }

        // Apply type filter
        if (this.filters.type) {
            filtered = filtered.filter(card => 
                card.type === this.filters.type
            );
        }

        // Apply series filter
        if (this.filters.series) {
            filtered = filtered.filter(card => 
                card.series === this.filters.series
            );
        }

        // Apply price range filters
        if (this.filters.priceMin) {
            filtered = filtered.filter(card => 
                (card.price || 0) >= parseFloat(this.filters.priceMin)
            );
        }

        if (this.filters.priceMax) {
            filtered = filtered.filter(card => 
                (card.price || 0) <= parseFloat(this.filters.priceMax)
            );
        }

        // Apply search filter
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(card => 
                card.name.toLowerCase().includes(searchTerm) ||
                card.description.toLowerCase().includes(searchTerm)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (this.filters.sortBy) {
                case 'createdAt':
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
                case 'price-low':
                    aValue = a.price || 0;
                    bValue = b.price || 0;
                    break;
                case 'price-high':
                    aValue = b.price || 0;
                    bValue = a.price || 0;
                    break;
                case 'rarity':
                    aValue = this.getRarityValue(a.rarity);
                    bValue = this.getRarityValue(b.rarity);
                    break;
                case 'popular':
                    aValue = a.minted || 0;
                    bValue = b.minted || 0;
                    break;
                default:
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
            }

            if (this.filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        this.filteredCards = filtered;
        this.currentPage = 1;
        this.displayMarketplace();
            this.updateMarketplaceStats();
    }

    getRarityValue(rarity) {
        const rarityValues = {
            'Common': 1,
            'Rare': 2,
            'Epic': 3,
            'Legendary': 4
        };
        return rarityValues[rarity] || 0;
    }

    clearFilters() {
        // Reset filter inputs
        document.getElementById('filterRarity').value = '';
        document.getElementById('filterType').value = '';
        document.getElementById('filterSeries').value = '';
        document.getElementById('sortBy').value = 'createdAt';
        document.getElementById('sortOrder').value = 'desc';
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        document.getElementById('searchInput').value = '';

        // Reset filters object
        this.filters = {
            rarity: '',
            type: '',
            series: '',
            priceMin: '',
            priceMax: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
        };

        this.filteredCards = [...this.availableCards];
        this.currentPage = 1;
        this.displayMarketplace();
        this.updateMarketplaceStats();
    }

    displayMarketplace() {
        const container = document.getElementById('itemsGrid');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const cardsToShow = this.filteredCards.slice(startIndex, endIndex);
        
        if (cardsToShow.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="empty-state">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h4 class="text-white">No cards found</h4>
                        <p class="text-muted">Try adjusting your filters or check back later for new cards.</p>
                        <button class="btn btn-primary" onclick="marketplaceIntegration.clearFilters()">
                            Clear Filters
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = cardsToShow.map(card => this.createCardHTML(card)).join('');

        // Update pagination
        this.updatePagination();
    }

    createCardHTML(card) {
        const rarityClass = `rarity-${card.rarity?.toLowerCase()}`;
        const createdDate = new Date(card.createdAt).toLocaleDateString();
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="nft-card h-100">
                    <div class="card-image-container position-relative">
                        <img src="${card.image}" alt="${card.name}" 
                             class="card-image w-100" style="height: 250px; object-fit: cover;">
                        <div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end"
                             style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                            <div class="p-3 w-100">
                                <span class="badge ${rarityClass} mb-2">${card.rarity}</span>
                                <h6 class="text-white mb-1">${card.name}</h6>
                                <small class="text-white-50">Available: ${card.available}</small>
                        </div>
                    </div>
                    </div>
                    <div class="card-body">
                        <div class="card-details">
                            <div class="detail-row">
                                <span class="detail-label">Type:</span>
                                <span class="detail-value">${card.type}</span>
                </div>
                            <div class="detail-row">
                                <span class="detail-label">Series:</span>
                                <span class="detail-value">${card.series}</span>
            </div>
                            <div class="detail-row">
                                <span class="detail-label">Minted:</span>
                                <span class="detail-value">${card.minted}/${card.supply}</span>
                    </div>
                            <div class="detail-row">
                                <span class="detail-label">Price:</span>
                                <span class="detail-value text-primary">${card.price || 0} PPO</span>
                </div>
                        </div>
                        <div class="card-actions mt-3">
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="marketplaceIntegration.viewCard('${card.id}')">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="btn btn-sm btn-success me-2" onclick="marketplaceIntegration.buyCard('${card.id}')">
                                <i class="fas fa-shopping-cart"></i> Buy
                            </button>
                            <button class="btn btn-sm btn-outline-info" onclick="marketplaceIntegration.addToWishlist('${card.id}')">
                                <i class="fas fa-heart"></i> Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateMarketplaceStats() {
        const totalCards = this.availableCards.length;
        const totalValue = this.availableCards.reduce((sum, card) => sum + (card.price || 0), 0);
        const avgPrice = totalCards > 0 ? totalValue / totalCards : 0;
        
        // Find rarest card
        const rarestCard = this.availableCards.reduce((rarest, card) => {
            const currentRarity = this.getRarityValue(card.rarity);
            const rarestRarity = this.getRarityValue(rarest?.rarity);
            return currentRarity > rarestRarity ? card : rarest;
        }, null);

        // Update stats display
        const statsElements = {
            'totalItems': totalCards,
            'floorPrice': this.calculateFloorPrice(),
            'totalVolume': totalValue.toFixed(2) + ' PPO',
            'owners': this.availableCards.length
        };

        Object.entries(statsElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    calculateFloorPrice() {
        if (this.availableCards.length === 0) return '0 PPO';
        
        const minPrice = Math.min(...this.availableCards.map(card => card.price || 0));
        return minPrice.toFixed(2) + ' PPO';
    }

    viewCard(cardId) {
        const card = this.availableCards.find(c => c.id === cardId);
        if (!card) return;

        // Create modal to show card details
        const modal = this.createCardModal(card);
        document.body.appendChild(modal);
            
            // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
    }

    createCardModal(card) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'cardModal';
        modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">${card.name}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                <img src="${card.image}" alt="${card.name}" 
                                     class="img-fluid rounded">
                                    </div>
                                    <div class="col-md-6">
                                <h6>Card Details</h6>
                                <p class="text-muted">${card.description}</p>
                                
                                <div class="card-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Rarity:</span>
                                        <span class="badge rarity-${card.rarity?.toLowerCase()}">${card.rarity}</span>
                                            </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Type:</span>
                                        <span class="stat-value">${card.type}</span>
                                            </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Series:</span>
                                        <span class="stat-value">${card.series}</span>
                                            </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Available:</span>
                                        <span class="stat-value">${card.available}/${card.supply}</span>
                                            </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Created:</span>
                                        <span class="stat-value">${new Date(card.createdAt).toLocaleString()}</span>
                                            </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Price:</span>
                                        <span class="stat-value text-primary">${card.price || 0} PPO</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="marketplaceIntegration.buyCard('${card.id}')">
                            <i class="fas fa-shopping-cart"></i> Buy Card
                        </button>
                        </div>
                    </div>
                </div>
            `;
        return modal;
    }

    async buyCard(cardId) {
        if (!this.currentUser) {
            alert('Please connect your wallet to purchase cards.');
            return;
        }

        const card = this.availableCards.find(c => c.id === cardId);
        if (!card) return;

        if (card.available <= 0) {
            alert('This card is no longer available.');
            return;
        }

        const quantity = prompt(`How many "${card.name}" would you like to buy? (Available: ${card.available})`, '1');
        if (!quantity || isNaN(quantity) || quantity <= 0) return;

        const buyQuantity = parseInt(quantity);
        if (buyQuantity > card.available) {
            alert(`Only ${card.available} cards available.`);
            return;
        }

        const totalCost = buyQuantity * (card.price || 0);
        const confirmPurchase = confirm(
            `Purchase ${buyQuantity}x "${card.name}" for ${totalCost} PPO?\n\n` +
            `Price per card: ${card.price || 0} PPO\n` +
            `Total cost: ${totalCost} PPO`
        );

        if (confirmPurchase) {
            await this.performPurchase(cardId, buyQuantity, totalCost);
        }
    }

    async performPurchase(cardId, quantity, totalCost) {
        try {
            if (!this.nftManager || !this.currentUser) {
                throw new Error('User not authenticated');
            }

            // Check if user has enough PPO balance
            const userBalance = this.getUserBalance();
            if (userBalance < totalCost) {
                alert(`Insufficient balance. You have ${userBalance} PPO, need ${totalCost} PPO.`);
                return;
            }

            // Mint cards for user
            const result = await this.nftManager.mintCard(cardId, this.currentUser.uid, quantity);
            if (result.success) {
                // Deduct PPO from user balance
                this.deductUserBalance(totalCost);
                
                alert(`Successfully purchased ${quantity} card(s)!`);
                
                // Reload marketplace
                await this.loadAvailableCards();
                
                // Redirect to collection to view purchased cards
                setTimeout(() => {
                    window.location.href = 'collection.html';
                }, 1000);
            } else {
                alert('Purchase failed: ' + result.error);
            }
        } catch (error) {
            console.error('Error purchasing card:', error);
            alert('Purchase failed: ' + error.message);
        }
    }

    getUserBalance() {
        // Get user balance from localStorage or wallet
        const balance = localStorage.getItem('userBalance');
        return balance ? parseFloat(balance) : 1000; // Default 1000 PPO for demo
    }

    deductUserBalance(amount) {
        const currentBalance = this.getUserBalance();
        const newBalance = currentBalance - amount;
        localStorage.setItem('userBalance', newBalance.toString());
    }

    addToWishlist(cardId) {
        if (!this.currentUser) {
            alert('Please connect your wallet to add items to wishlist.');
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (!wishlist.includes(cardId)) {
            wishlist.push(cardId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert('Added to wishlist!');
        } else {
            alert('Already in wishlist!');
        }
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination');
        
        if (!pagination || totalPages <= 1) return;

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="marketplaceIntegration.goToPage(${this.currentPage - 1})">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="marketplaceIntegration.goToPage(${i})">${i}</a>
                    </li>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
            }
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="marketplaceIntegration.goToPage(${this.currentPage + 1})">Next</a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.displayMarketplace();
        }
    }

    debounce(func, wait) {
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
}

// Initialize marketplace integration when page loads
let marketplaceIntegration;
document.addEventListener('DOMContentLoaded', function() {
    marketplaceIntegration = new MarketplaceIntegration();
});

// Global functions for HTML onclick handlers
function filterMarketplace() {
    if (marketplaceIntegration) {
        marketplaceIntegration.applyFilters();
    }
}

function clearMarketplaceFilters() {
    if (marketplaceIntegration) {
        marketplaceIntegration.clearFilters();
    }
}
