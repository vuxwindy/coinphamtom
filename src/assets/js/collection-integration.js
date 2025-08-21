// Collection Integration - NFT Card System
class CollectionIntegration {
    constructor() {
        this.nftManager = null;
        this.currentUser = null;
        this.userCards = [];
        this.filteredCards = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            rarity: '',
            type: '',
            series: '',
            sortBy: 'mintedAt',
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
            
            if (this.currentUser) {
                await this.loadUserCollection();
                this.setupEventListeners();
                this.updateCollectionStats();
            } else {
                this.showLoginPrompt();
            }
        } catch (error) {
            console.error('Error initializing collection integration:', error);
        }
    }

    getCurrentUser() {
        // Get user from localStorage or session
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    async loadUserCollection() {
        try {
            if (!this.nftManager || !this.currentUser) return;

            const result = await this.nftManager.getUserCards(this.currentUser.uid);
            if (result.success) {
                this.userCards = result.cards;
                this.filteredCards = [...this.userCards];
                this.displayCollection();
            }
        } catch (error) {
            console.error('Error loading user collection:', error);
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
    }

    applyFilters() {
        let filtered = [...this.userCards];

        // Apply rarity filter
        if (this.filters.rarity) {
            filtered = filtered.filter(card => 
                card.metadata?.rarity === this.filters.rarity
            );
        }

        // Apply type filter
        if (this.filters.type) {
            filtered = filtered.filter(card => 
                card.metadata?.type === this.filters.type
            );
        }

        // Apply series filter
        if (this.filters.series) {
            filtered = filtered.filter(card => 
                card.metadata?.series === this.filters.series
            );
        }

        // Apply search filter
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(card => 
                card.metadata?.name.toLowerCase().includes(searchTerm) ||
                card.metadata?.description.toLowerCase().includes(searchTerm)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (this.filters.sortBy) {
                case 'mintedAt':
                    aValue = new Date(a.mintedAt);
                    bValue = new Date(b.mintedAt);
                    break;
                case 'rarity':
                    aValue = this.getRarityValue(a.metadata?.rarity);
                    bValue = this.getRarityValue(b.metadata?.rarity);
                    break;
                case 'name':
                    aValue = a.metadata?.name || '';
                    bValue = b.metadata?.name || '';
                    break;
                case 'value':
                    aValue = a.metadata?.price || 0;
                    bValue = b.metadata?.price || 0;
                    break;
                default:
                    aValue = new Date(a.mintedAt);
                    bValue = new Date(b.mintedAt);
            }

            if (this.filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        this.filteredCards = filtered;
        this.currentPage = 1;
        this.displayCollection();
        this.updateCollectionStats();
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
        document.getElementById('sortBy').value = 'mintedAt';
        document.getElementById('sortOrder').value = 'desc';
        document.getElementById('searchInput').value = '';

        // Reset filters object
        this.filters = {
            rarity: '',
            type: '',
            series: '',
            sortBy: 'mintedAt',
            sortOrder: 'desc'
        };

        this.filteredCards = [...this.userCards];
        this.currentPage = 1;
        this.displayCollection();
        this.updateCollectionStats();
    }

    displayCollection() {
        const container = document.getElementById('collectionGrid') || document.getElementById('itemsGrid');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const cardsToShow = this.filteredCards.slice(startIndex, endIndex);

        if (cardsToShow.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="empty-state">
                        <i class="fas fa-cards-blank fa-3x text-muted mb-3"></i>
                        <h4 class="text-white">No cards found</h4>
                        <p class="text-muted">Try adjusting your filters or check back later for new cards.</p>
                        <button class="btn btn-primary" onclick="collectionIntegration.clearFilters()">
                            Clear Filters
                        </button>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = cardsToShow.map(card => this.createCardHTML(card)).join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex < this.filteredCards.length ? 'inline-block' : 'none';
        }
    }

    createCardHTML(card) {
        const rarityClass = `rarity-${card.metadata?.rarity?.toLowerCase()}`;
        const mintDate = new Date(card.mintedAt).toLocaleDateString();
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="nft-card h-100">
                    <div class="card-image-container position-relative">
                        <img src="${card.metadata?.image}" alt="${card.metadata?.name}" 
                             class="card-image w-100" style="height: 250px; object-fit: cover;">
                        <div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end"
                             style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                            <div class="p-3 w-100">
                                <span class="badge ${rarityClass} mb-2">${card.metadata?.rarity}</span>
                                <h6 class="text-white mb-1">${card.metadata?.name}</h6>
                                <small class="text-white-50">Minted: ${mintDate}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="card-details">
                            <div class="detail-row">
                                <span class="detail-label">Type:</span>
                                <span class="detail-value">${card.metadata?.type}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Series:</span>
                                <span class="detail-value">${card.metadata?.series}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Token ID:</span>
                                <span class="detail-value">${card.tokenId}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Value:</span>
                                <span class="detail-value text-primary">${card.metadata?.price || 0} PPO</span>
                        </div>
                        </div>
                        <div class="card-actions mt-3">
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="collectionIntegration.viewCard('${card.id}')">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="btn btn-sm btn-outline-success me-2" onclick="collectionIntegration.sellCard('${card.id}')">
                                <i class="fas fa-tag"></i> Sell
                            </button>
                            <button class="btn btn-sm btn-outline-info" onclick="collectionIntegration.transferCard('${card.id}')">
                                <i class="fas fa-share"></i> Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateCollectionStats() {
        const totalCards = this.userCards.length;
        const uniqueCards = new Set(this.userCards.map(card => card.cardId)).size;
        const totalValue = this.userCards.reduce((sum, card) => sum + (card.metadata?.price || 0), 0);
        
        // Find rarest card
        const rarestCard = this.userCards.reduce((rarest, card) => {
            const currentRarity = this.getRarityValue(card.metadata?.rarity);
            const rarestRarity = this.getRarityValue(rarest?.metadata?.rarity);
            return currentRarity > rarestRarity ? card : rarest;
        }, null);

        // Update stats display
        document.getElementById('totalCards').textContent = totalCards;
        document.getElementById('uniqueCards').textContent = uniqueCards;
        document.getElementById('totalValue').textContent = totalValue.toFixed(2);
        document.getElementById('rarestCard').textContent = rarestCard?.metadata?.rarity || 'None';
    
    // Update collection stats
        document.getElementById('totalItems').textContent = totalCards;
        document.getElementById('floorPrice').textContent = this.calculateFloorPrice();
        document.getElementById('totalVolume').textContent = totalValue.toFixed(2) + ' PPO';
        document.getElementById('owners').textContent = '1'; // Current user only
    }

    calculateFloorPrice() {
        if (this.userCards.length === 0) return '0 PPO';
        
        const minPrice = Math.min(...this.userCards.map(card => card.metadata?.price || 0));
        return minPrice.toFixed(2) + ' PPO';
    }

    viewCard(cardId) {
        const card = this.userCards.find(c => c.id === cardId);
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
                        <h5 class="modal-title">${card.metadata?.name}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                <img src="${card.metadata?.image}" alt="${card.metadata?.name}" 
                                     class="img-fluid rounded">
                                        </div>
                                        <div class="col-md-6">
                                <h6>Card Details</h6>
                                <p class="text-muted">${card.metadata?.description}</p>
                                
                                <div class="card-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Rarity:</span>
                                        <span class="badge rarity-${card.metadata?.rarity?.toLowerCase()}">${card.metadata?.rarity}</span>
                                        </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Type:</span>
                                        <span class="stat-value">${card.metadata?.type}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Series:</span>
                                        <span class="stat-value">${card.metadata?.series}</span>
                                        </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Token ID:</span>
                                        <span class="stat-value">${card.tokenId}</span>
                                        </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Minted:</span>
                                        <span class="stat-value">${new Date(card.mintedAt).toLocaleString()}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Value:</span>
                                        <span class="stat-value text-primary">${card.metadata?.price || 0} PPO</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    <div class="modal-footer border-secondary">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="collectionIntegration.sellCard('${card.id}')">
                            <i class="fas fa-tag"></i> Sell Card
                            </button>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    sellCard(cardId) {
        const card = this.userCards.find(c => c.id === cardId);
        if (!card) return;

        // Redirect to marketplace with pre-filled sell form
        const sellUrl = `marketplace.html?sell=${cardId}`;
        window.location.href = sellUrl;
    }

    transferCard(cardId) {
        const card = this.userCards.find(c => c.id === cardId);
        if (!card) return;

        const recipientAddress = prompt('Enter recipient wallet address:');
        if (!recipientAddress) return;

        if (confirm(`Are you sure you want to transfer "${card.metadata?.name}" to ${recipientAddress}?`)) {
            this.performTransfer(cardId, recipientAddress);
        }
    }

    async performTransfer(cardId, recipientAddress) {
        try {
            if (!this.nftManager || !this.currentUser) {
                throw new Error('User not authenticated');
            }

            const result = await this.nftManager.transferNFT(cardId, this.currentUser.uid, recipientAddress);
            if (result.success) {
                alert('Card transferred successfully!');
                await this.loadUserCollection(); // Reload collection
            } else {
                alert('Transfer failed: ' + result.error);
            }
        } catch (error) {
            console.error('Error transferring card:', error);
            alert('Transfer failed: ' + error.message);
        }
    }

    loadMoreCards() {
        this.currentPage++;
        this.displayCollection();
    }

    showLoginPrompt() {
        const container = document.getElementById('collectionGrid') || document.getElementById('itemsGrid');
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="login-prompt">
                        <i class="fas fa-lock fa-3x text-muted mb-3"></i>
                        <h4 class="text-white">Login Required</h4>
                        <p class="text-muted">Please connect your wallet to view your NFT collection.</p>
                        <a href="metamask.html" class="btn btn-primary">
                            <i class="fas fa-wallet me-2"></i>Connect Wallet
                        </a>
                </div>
            </div>
        `;
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

// Initialize collection integration when page loads
let collectionIntegration;
document.addEventListener('DOMContentLoaded', function() {
    collectionIntegration = new CollectionIntegration();
});

// Global functions for HTML onclick handlers
function filterCollection() {
    if (collectionIntegration) {
        collectionIntegration.applyFilters();
    }
}

function loadMoreCards() {
    if (collectionIntegration) {
        collectionIntegration.loadMoreCards();
    }
}
