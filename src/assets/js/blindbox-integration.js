// Blindbox Integration System
const BlindboxIntegration = {
    blindboxData: {
        blindboxes: [],
        userBlindboxes: [],
        totalOpened: 0,
        totalCreated: 0,
        rarities: {
            common: { chance: 60, color: 'secondary', name: 'Common' },
            rare: { chance: 25, color: 'primary', name: 'Rare' },
            epic: { chance: 10, color: 'info', name: 'Epic' },
            legendary: { chance: 4, color: 'warning', name: 'Legendary' },
            mythic: { chance: 1, color: 'danger', name: 'Mythic' }
        },
        nftTemplates: {
            bows: [
                { name: 'Wooden Bow', rarity: 'common', image: 'images/nft/bow-wooden.jpg' },
                { name: 'Iron Bow', rarity: 'rare', image: 'images/nft/bow-iron.jpg' },
                { name: 'Golden Bow', rarity: 'epic', image: 'images/nft/bow-golden.jpg' },
                { name: 'Dragon Bow', rarity: 'legendary', image: 'images/nft/bow-dragon.jpg' },
                { name: 'Phoenix Bow', rarity: 'mythic', image: 'images/nft/bow-phoenix.jpg' }
            ],
            arrows: [
                { name: 'Stone Arrow', rarity: 'common', image: 'images/nft/arrow-stone.jpg' },
                { name: 'Iron Arrow', rarity: 'rare', image: 'images/nft/arrow-iron.jpg' },
                { name: 'Magic Arrow', rarity: 'epic', image: 'images/nft/arrow-magic.jpg' },
                { name: 'Lightning Arrow', rarity: 'legendary', image: 'images/nft/arrow-lightning.jpg' },
                { name: 'Cosmic Arrow', rarity: 'mythic', image: 'images/nft/arrow-cosmic.jpg' }
            ],
            accessories: [
                { name: 'Leather Quiver', rarity: 'common', image: 'images/nft/quiver-leather.jpg' },
                { name: 'Magic Quiver', rarity: 'rare', image: 'images/nft/quiver-magic.jpg' },
                { name: 'Dragon Quiver', rarity: 'epic', image: 'images/nft/quiver-dragon.jpg' },
                { name: 'Celestial Quiver', rarity: 'legendary', image: 'images/nft/quiver-celestial.jpg' },
                { name: 'Infinity Quiver', rarity: 'mythic', image: 'images/nft/quiver-infinity.jpg' }
            ]
        }
    },

    // Initialize the system
    init() {
        this.loadBlindboxData();
        this.setupEventListeners();
        this.updateBlindboxDisplay();
        this.setupPeriodicUpdates();
        console.log('📦 Blindbox Integration initialized');
    },

    // Load blindbox data from localStorage
    loadBlindboxData() {
        const saved = localStorage.getItem('blindboxData');
        if (saved) {
            this.blindboxData = JSON.parse(saved);
        } else {
            this.blindboxData = {
                blindboxes: [],
                userBlindboxes: [],
                totalOpened: 0,
                totalCreated: 0,
                rarities: {
                    common: { chance: 60, color: 'secondary', name: 'Common' },
                    rare: { chance: 25, color: 'primary', name: 'Rare' },
                    epic: { chance: 10, color: 'info', name: 'Epic' },
                    legendary: { chance: 4, color: 'danger', name: 'Legendary' },
                    mythic: { chance: 1, color: 'warning', name: 'Mythic' }
                },
                nftTemplates: {
                    bows: [
                        { name: 'Wooden Bow', rarity: 'common', image: 'images/nft/bow-wooden.jpg' },
                        { name: 'Iron Bow', rarity: 'rare', image: 'images/nft/bow-iron.jpg' },
                        { name: 'Golden Bow', rarity: 'epic', image: 'images/nft/bow-golden.jpg' },
                        { name: 'Dragon Bow', rarity: 'legendary', image: 'images/nft/bow-dragon.jpg' },
                        { name: 'Phoenix Bow', rarity: 'mythic', image: 'images/nft/bow-phoenix.jpg' }
                    ],
                    arrows: [
                        { name: 'Stone Arrow', rarity: 'common', image: 'images/nft/arrow-stone.jpg' },
                        { name: 'Iron Arrow', rarity: 'rare', image: 'images/nft/arrow-iron.jpg' },
                        { name: 'Magic Arrow', rarity: 'epic', image: 'images/nft/arrow-magic.jpg' },
                        { name: 'Lightning Arrow', rarity: 'legendary', image: 'images/nft/arrow-lightning.jpg' },
                        { name: 'Cosmic Arrow', rarity: 'mythic', image: 'images/nft/arrow-cosmic.jpg' }
                    ],
                    accessories: [
                        { name: 'Leather Quiver', rarity: 'common', image: 'images/nft/quiver-leather.jpg' },
                        { name: 'Magic Quiver', rarity: 'rare', image: 'images/nft/quiver-magic.jpg' },
                        { name: 'Dragon Quiver', rarity: 'epic', image: 'images/nft/quiver-dragon.jpg' },
                        { name: 'Celestial Quiver', rarity: 'legendary', image: 'images/nft/quiver-celestial.jpg' },
                        { name: 'Infinity Quiver', rarity: 'mythic', image: 'images/nft/quiver-infinity.jpg' }
                    ]
                }
            };
            this.addSampleBlindboxes();
        }
        console.log('📦 Loaded blindbox data:', this.blindboxData);
    },

    // Save blindbox data to localStorage
    saveBlindboxData() {
        localStorage.setItem('blindboxData', JSON.stringify(this.blindboxData));
        // Dispatch storage event for cross-tab synchronization
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'blindboxData',
            newValue: localStorage.getItem('blindboxData')
        }));
    },

    // Add sample blindboxes for demonstration
    addSampleBlindboxes() {
        const sampleBlindboxes = [
            {
                id: '1',
                name: 'Mystery Box',
                description: 'A mysterious box containing random archery items',
                price: 100,
                category: 'mixed',
                rarity: 'common',
                image: 'images/blindbox-mystery.jpg',
                creator: 'system',
                createdAt: new Date().toISOString(),
                available: true
            },
            {
                id: '2',
                name: 'Premium Box',
                description: 'Premium box with higher chance for rare items',
                price: 500,
                category: 'mixed',
                rarity: 'rare',
                image: 'images/blindbox-premium.jpg',
                creator: 'system',
                createdAt: new Date().toISOString(),
                available: true
            },
            {
                id: '3',
                name: 'Legendary Box',
                description: 'Legendary box with guaranteed epic or better items',
                price: 1000,
                category: 'mixed',
                rarity: 'legendary',
                image: 'images/blindbox-legendary.jpg',
                creator: 'system',
                createdAt: new Date().toISOString(),
                available: true
            }
        ];

        this.blindboxData.blindboxes = sampleBlindboxes;
        this.blindboxData.totalCreated = sampleBlindboxes.length;
        this.saveBlindboxData();
        console.log('✅ Added sample blindboxes');
    },

    // Create a new blindbox
    createBlindbox(blindboxData) {
        const newBlindbox = {
            id: Date.now().toString(),
            name: blindboxData.name,
            description: blindboxData.description,
            price: parseFloat(blindboxData.price),
            category: blindboxData.category,
            rarity: blindboxData.rarity,
            image: blindboxData.image || 'images/blindbox-default.jpg',
            creator: localStorage.getItem('walletAddress') || 'demo',
            createdAt: new Date().toISOString(),
            available: true
        };

        this.blindboxData.blindboxes.push(newBlindbox);
        this.blindboxData.userBlindboxes.push(newBlindbox);
        this.blindboxData.totalCreated++;
        this.saveBlindboxData();
        this.updateBlindboxDisplay();
        
        // Dispatch event for other systems
        const event = new CustomEvent('blindboxCreated', {
            detail: { blindbox: newBlindbox }
        });
        window.dispatchEvent(event);

        console.log('✅ Created new blindbox:', newBlindbox);
        return newBlindbox;
    },

    // Open a blindbox
    openBlindbox(blindboxId) {
        const blindbox = this.blindboxData.blindboxes.find(b => b.id === blindboxId);
        if (!blindbox) {
            console.error('❌ Blindbox not found:', blindboxId);
            return null;
        }

        // Check if user has enough PPO
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        if (userStats.ppoBalance < blindbox.price) {
            this.showNotification('Insufficient PPO balance!', true);
            return null;
        }

        // Deduct PPO
        userStats.ppoBalance -= blindbox.price;
        localStorage.setItem('userStats', JSON.stringify(userStats));

        // Generate random NFT based on rarity
        const nft = this.generateRandomNFT(blindbox.rarity);
        
        // Add NFT to user's collection
        this.addNFTToUser(nft);
        
        // Update statistics
        this.blindboxData.totalOpened++;
        this.saveBlindboxData();
        this.updateBlindboxDisplay();

        // Dispatch events
        const openEvent = new CustomEvent('blindboxOpened', {
            detail: { blindbox, nft }
        });
        window.dispatchEvent(openEvent);

        const nftEvent = new CustomEvent('nftAcquired', {
            detail: { nft, source: 'blindbox' }
        });
        window.dispatchEvent(nftEvent);

        console.log('✅ Opened blindbox:', blindbox.name, 'Got NFT:', nft);
        return nft;
    },

    // Generate random NFT based on rarity
    generateRandomNFT(targetRarity) {
        const categories = Object.keys(this.blindboxData.nftTemplates);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const templates = this.blindboxData.nftTemplates[category];
        
        // Filter templates by rarity or better
        const rarityOrder = ['common', 'rare', 'epic', 'legendary', 'mythic'];
        const targetIndex = rarityOrder.indexOf(targetRarity);
        const availableTemplates = templates.filter(template => {
            const templateIndex = rarityOrder.indexOf(template.rarity);
            return templateIndex >= targetIndex;
        });

        const selectedTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
        
        return {
            id: Date.now().toString(),
            name: selectedTemplate.name,
            category: category,
            rarity: selectedTemplate.rarity,
            image: selectedTemplate.image,
            acquiredAt: new Date().toISOString(),
            source: 'blindbox'
        };
    },

    // Add NFT to user's collection
    addNFTToUser(nft) {
        const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        if (!userStats.nfts) {
            userStats.nfts = [];
        }
        userStats.nfts.push(nft);
        userStats.nftBalance = userStats.nfts.length;
        localStorage.setItem('userStats', JSON.stringify(userStats));
        
        console.log('✅ Added NFT to user collection:', nft);
    },

    // Update blindbox display
    updateBlindboxDisplay() {
        this.updateBlindboxGrid();
        this.updateBlindboxStats();
    },

    // Update blindbox grid
    updateBlindboxGrid() {
        const grid = document.getElementById('blindboxGrid');
        if (!grid) return;

        const blindboxes = this.blindboxData.blindboxes.filter(b => b.available);
        grid.innerHTML = '';

        blindboxes.forEach(blindbox => {
            const blindboxCard = this.createBlindboxCard(blindbox);
            grid.appendChild(blindboxCard);
        });
    },

    // Create blindbox card element
    createBlindboxCard(blindbox) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        col.innerHTML = `
            <div class="blindbox-card bg-dark border border-primary rounded p-4">
                <img src="${blindbox.image}" alt="${blindbox.name}" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover;">
                <h5 class="text-white mb-2">${blindbox.name}</h5>
                <p class="text-white-50 mb-3">${blindbox.description}</p>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-${this.blindboxData.rarities[blindbox.rarity].color}">${this.blindboxData.rarities[blindbox.rarity].name}</span>
                    <span class="text-primary fw-bold">${blindbox.price} PPO</span>
                </div>
                
                <button class="btn btn-primary w-100" onclick="BlindboxIntegration.openBlindbox('${blindbox.id}')">
                    <i class="fas fa-box-open me-2"></i>Open Box
                </button>
            </div>
        `;
        
        return col;
    },

    // Update blindbox statistics
    updateBlindboxStats() {
        const totalCreatedEl = document.getElementById('totalBlindboxes');
        const totalOpenedEl = document.getElementById('totalOpened');
        const userBalanceEl = document.getElementById('userPPOBalance');

        if (totalCreatedEl) totalCreatedEl.textContent = this.blindboxData.totalCreated.toLocaleString();
        if (totalOpenedEl) totalOpenedEl.textContent = this.blindboxData.totalOpened.toLocaleString();
        
        if (userBalanceEl) {
            const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
            userBalanceEl.textContent = (userStats.ppoBalance || 0).toLocaleString();
        }
    },

    // Show creation modal
    showCreationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'blindboxCreationModal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-white">Create Blindbox</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="blindboxCreationForm">
                            <div class="mb-3">
                                <label class="form-label text-white">Blindbox Name</label>
                                <input type="text" class="form-control" name="name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Description</label>
                                <textarea class="form-control" name="description" rows="3" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Price (PPO)</label>
                                <input type="number" class="form-control" name="price" min="1" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Category</label>
                                <select class="form-select" name="category" required>
                                    <option value="">Select Category</option>
                                    <option value="bows">Bows</option>
                                    <option value="arrows">Arrows</option>
                                    <option value="accessories">Accessories</option>
                                    <option value="mixed">Mixed</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Rarity</label>
                                <select class="form-select" name="rarity" required>
                                    <option value="">Select Rarity</option>
                                    <option value="common">Common (60%)</option>
                                    <option value="rare">Rare (25%)</option>
                                    <option value="epic">Epic (10%)</option>
                                    <option value="legendary">Legendary (4%)</option>
                                    <option value="mythic">Mythic (1%)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-white">Image URL</label>
                                <input type="url" class="form-control" name="image" placeholder="https://example.com/image.jpg">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-secondary">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="BlindboxIntegration.handleCreation()">Create</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    // Handle creation form submission
    handleCreation() {
        const form = document.getElementById('blindboxCreationForm');
        const formData = new FormData(form);
        
        const blindboxData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            category: formData.get('category'),
            rarity: formData.get('rarity'),
            image: formData.get('image')
        };

        this.createBlindbox(blindboxData);
        const modal = bootstrap.Modal.getInstance(document.getElementById('blindboxCreationModal'));
        modal.hide();
        this.showNotification('Successfully created blindbox!', false);
    },

    // Setup event listeners
    setupEventListeners() {
        // Listen for storage events (cross-tab synchronization)
        window.addEventListener('storage', (e) => {
            if (e.key === 'blindboxData') {
                this.loadBlindboxData();
                this.updateBlindboxDisplay();
            }
        });

        // Listen for blindbox-related events
        window.addEventListener('blindboxCreated', (e) => {
            console.log('📦 Blindbox created event received:', e.detail);
        });

        window.addEventListener('blindboxOpened', (e) => {
            console.log('📦 Blindbox opened event received:', e.detail);
            this.showResultModal(e.detail.nft);
        });

        // Add creation button if not exists
        this.addCreationButton();
    },

    // Add creation button to page
    addCreationButton() {
        const container = document.querySelector('#blindbox .container');
        if (container && !document.getElementById('createBlindboxBtn')) {
            const button = document.createElement('button');
            button.id = 'createBlindboxBtn';
            button.className = 'btn btn-primary btn-lg mb-4';
            button.innerHTML = '<i class="fas fa-plus me-2"></i>Create Blindbox';
            button.onclick = () => this.showCreationModal();
            
            container.insertBefore(button, container.firstChild);
        }
    },

    // Show result modal
    showResultModal(nft) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'blindboxResultModal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title text-white">🎉 Congratulations!</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${nft.image}" alt="${nft.name}" class="img-fluid rounded mb-3" style="max-height: 200px;">
                        <h4 class="text-white mb-2">${nft.name}</h4>
                        <span class="badge bg-${this.blindboxData.rarities[nft.rarity].color} mb-3">${this.blindboxData.rarities[nft.rarity].name}</span>
                        <p class="text-white-50">The NFT has been added to your collection!</p>
                        <a href="profile.html" class="btn btn-primary">View Collection</a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    // Setup periodic updates
    setupPeriodicUpdates() {
        setInterval(() => {
            this.updateBlindboxDisplay();
        }, 30000); // Update every 30 seconds
    },

    // Show notification
    showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${isError ? 'danger' : 'success'} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    },


};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    BlindboxIntegration.init();
});

// Make available globally
window.BlindboxIntegration = BlindboxIntegration;
