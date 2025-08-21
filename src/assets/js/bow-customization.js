// Bow Customization System - Hệ thống tùy chỉnh cung
// Thay đổi hình ảnh bow dựa trên NFT mà user sở hữu

console.log('🏹 Bow Customization System loaded');

class BowCustomization {
    constructor() {
        this.currentBow = null;
        this.userBows = [];
        this.defaultBow = {
            id: 'default',
            name: 'Default Bow',
            type: 'basic',
            image: null,
            svgPath: null,
            cssClass: 'bow-default',
            attributes: {
                damage: 10,
                accuracy: 80,
                fireRate: 1.0,
                range: 50
            }
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Load user's NFT bows
            await this.loadUserBows();
            
            // Set default bow
            this.setCurrentBow(this.defaultBow);
            
            console.log('✅ Bow Customization initialized');
        } catch (error) {
            console.error('❌ Error initializing Bow Customization:', error);
        }
    }
    
    async loadUserBows() {
        try {
            // Get user's NFT bows from localStorage or Firebase
            const userBows = this.getUserBowsFromStorage();
            
            if (userBows && userBows.length > 0) {
                this.userBows = userBows;
                console.log(`🏹 Loaded ${userBows.length} user bows`);
                
                // Set the first bow as current (or user's preferred bow)
                const preferredBow = this.getPreferredBow();
                if (preferredBow) {
                    this.setCurrentBow(preferredBow);
                }
            }
        } catch (error) {
            console.error('❌ Error loading user bows:', error);
        }
    }
    
    getUserBowsFromStorage() {
        try {
            const storedBows = localStorage.getItem('userNFTBows');
            return storedBows ? JSON.parse(storedBows) : [];
        } catch (error) {
            console.error('Error getting bows from storage:', error);
            return [];
        }
    }
    
    getPreferredBow() {
        try {
            const preferredBowId = localStorage.getItem('preferredBowId');
            if (preferredBowId) {
                return this.userBows.find(bow => bow.id === preferredBowId);
            }
            return this.userBows[0]; // Return first bow if no preference
        } catch (error) {
            console.error('Error getting preferred bow:', error);
            return null;
        }
    }
    
    setCurrentBow(bow) {
        this.currentBow = bow;
        localStorage.setItem('preferredBowId', bow.id);
        
        // Apply bow customization to game
        this.applyBowToGame(bow);
        
        console.log(`🏹 Current bow set to: ${bow.name}`);
    }
    
    applyBowToGame(bow) {
        // Apply to SVG game (arrow-game.html)
        this.applyBowToSVGGame(bow);
        
        // Apply to CSS game (arrow-game-modern.html)
        this.applyBowToCSSGame(bow);
        
        // Update game attributes
        this.updateGameAttributes(bow);
    }
    
    applyBowToSVGGame(bow) {
        try {
            const svgGame = document.getElementById('game');
            if (!svgGame) return;
            
            const bowElement = svgGame.querySelector('#bow');
            if (!bowElement) return;
            
            if (bow.image) {
                // Use image for bow
                this.createImageBow(bowElement, bow);
            } else if (bow.svgPath) {
                // Use custom SVG path
                this.createSVGBow(bowElement, bow);
            } else {
                // Use default bow with custom styling
                this.createStyledBow(bowElement, bow);
            }
            
            console.log('✅ Applied bow to SVG game');
        } catch (error) {
            console.error('❌ Error applying bow to SVG game:', error);
        }
    }
    
    applyBowToCSSGame(bow) {
        try {
            const cssGame = document.getElementById('bow');
            if (!cssGame) return;
            
            // Remove existing bow classes
            cssGame.className = 'bow';
            
            // Add custom bow class
            if (bow.cssClass) {
                cssGame.classList.add(bow.cssClass);
            }
            
            // Apply custom styling
            this.applyCustomBowStyling(cssGame, bow);
            
            console.log('✅ Applied bow to CSS game');
        } catch (error) {
            console.error('❌ Error applying bow to CSS game:', error);
        }
    }
    
    createImageBow(bowElement, bow) {
        // Clear existing content
        bowElement.innerHTML = '';
        
        // Create image element
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', bow.image);
        image.setAttribute('x', '60');
        image.setAttribute('y', '180');
        image.setAttribute('width', '60');
        image.setAttribute('height', '120');
        image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        bowElement.appendChild(image);
    }
    
    createSVGBow(bowElement, bow) {
        // Clear existing content
        bowElement.innerHTML = '';
        
        // Create custom SVG path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', bow.svgPath);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', bow.strokeColor || '#ffd700');
        path.setAttribute('stroke-width', bow.strokeWidth || '3');
        path.setAttribute('stroke-linecap', 'round');
        
        bowElement.appendChild(path);
    }
    
    createStyledBow(bowElement, bow) {
        // Keep existing structure but modify styling
        const polyline = bowElement.querySelector('polyline');
        const path = bowElement.querySelector('path');
        
        if (polyline) {
            polyline.setAttribute('stroke', bow.stringColor || '#ddd');
        }
        
        if (path) {
            path.setAttribute('stroke', bow.bowColor || '#ffd700');
            path.setAttribute('stroke-width', bow.strokeWidth || '3');
        }
    }
    
    applyCustomBowStyling(bowElement, bow) {
        // Apply custom CSS variables
        bowElement.style.setProperty('--bow-color', bow.bowColor || '#8B4513');
        bowElement.style.setProperty('--string-color', bow.stringColor || '#ddd');
        bowElement.style.setProperty('--bow-size', bow.size || '1');
        
        // Apply custom background image if available
        if (bow.image) {
            bowElement.style.backgroundImage = `url(${bow.image})`;
            bowElement.style.backgroundSize = 'contain';
            bowElement.style.backgroundRepeat = 'no-repeat';
            bowElement.style.backgroundPosition = 'center';
        }
    }
    
    updateGameAttributes(bow) {
        // Update game mechanics based on bow attributes
        if (window.gameNFTSystem) {
            // Update damage multiplier
            window.gameNFTSystem.damageMultiplier = bow.attributes.damage / 10;
            
            // Update accuracy bonus
            window.gameNFTSystem.accuracyBonus = (bow.attributes.accuracy - 80) / 100;
            
            // Update fire rate
            window.gameNFTSystem.fireRateMultiplier = bow.attributes.fireRate;
        }
        
        // Update UI to show current bow
        this.updateBowUI(bow);
    }
    
    updateBowUI(bow) {
        // Update bow display in UI
        const bowDisplay = document.getElementById('currentBowDisplay');
        if (bowDisplay) {
            bowDisplay.innerHTML = `
                <div class="current-bow">
                    <img src="${bow.image || 'images/default-bow.png'}" alt="${bow.name}" style="width: 40px; height: 40px;">
                    <span>${bow.name}</span>
                </div>
            `;
        }
        
        // Update bow stats display
        const bowStats = document.getElementById('bowStats');
        if (bowStats) {
            bowStats.innerHTML = `
                <div class="bow-stats">
                    <div>Damage: ${bow.attributes.damage}</div>
                    <div>Accuracy: ${bow.attributes.accuracy}%</div>
                    <div>Fire Rate: ${bow.attributes.fireRate}x</div>
                    <div>Range: ${bow.attributes.range}</div>
                </div>
            `;
        }
    }
    
    // Bow selection functions
    selectBow(bowId) {
        const bow = this.userBows.find(b => b.id === bowId);
        if (bow) {
            this.setCurrentBow(bow);
            return true;
        }
        return false;
    }
    
    getAvailableBows() {
        return [this.defaultBow, ...this.userBows];
    }
    
    // Add new bow to user's collection
    addUserBow(bow) {
        this.userBows.push(bow);
        localStorage.setItem('userNFTBows', JSON.stringify(this.userBows));
        console.log(`🏹 Added new bow: ${bow.name}`);
    }
    
    // Remove bow from user's collection
    removeUserBow(bowId) {
        this.userBows = this.userBows.filter(bow => bow.id !== bowId);
        localStorage.setItem('userNFTBows', JSON.stringify(this.userBows));
        
        // If removed bow was current, switch to default
        if (this.currentBow && this.currentBow.id === bowId) {
            this.setCurrentBow(this.defaultBow);
        }
        
        console.log(`🏹 Removed bow: ${bowId}`);
    }
    
    // Get current bow info
    getCurrentBow() {
        return this.currentBow;
    }
    
    // Check if user has specific bow
    hasBow(bowId) {
        return this.userBows.some(bow => bow.id === bowId);
    }
    
    // Create bow from NFT data
    createBowFromNFT(nftData) {
        return {
            id: nftData.id,
            name: nftData.metadata.name,
            type: nftData.metadata.type,
            image: nftData.metadata.image,
            svgPath: nftData.metadata.svgPath,
            cssClass: `bow-${nftData.metadata.rarity.toLowerCase()}`,
            bowColor: this.getBowColorByRarity(nftData.metadata.rarity),
            stringColor: '#ddd',
            strokeWidth: '3',
            size: '1',
            attributes: nftData.metadata.attributes,
            rarity: nftData.metadata.rarity,
            source: nftData.source
        };
    }
    
    getBowColorByRarity(rarity) {
        const colors = {
            'Common': '#8B4513',
            'Rare': '#4169E1',
            'Epic': '#9932CC',
            'Legendary': '#FFD700'
        };
        return colors[rarity] || '#8B4513';
    }
    
    // Sync with NFT system
    async syncWithNFTSystem() {
        try {
            if (window.gameNFTSystem && window.gameNFTSystem.nftManager) {
                const user = window.gameNFTSystem.getCurrentUser();
                if (user) {
                    const userNFTs = await window.gameNFTSystem.nftManager.getUserCards(user.uid);
                    if (userNFTs.success) {
                        const bowNFTs = userNFTs.cards.filter(nft => nft.metadata.category === 'bow');
                        
                        // Convert NFT data to bow format
                        const bows = bowNFTs.map(nft => this.createBowFromNFT(nft));
                        
                        // Update user bows
                        this.userBows = bows;
                        localStorage.setItem('userNFTBows', JSON.stringify(bows));
                        
                        console.log(`🏹 Synced ${bows.length} bow NFTs`);
                        
                        // Update current bow if needed
                        if (!this.currentBow || !this.hasBow(this.currentBow.id)) {
                            const preferredBow = this.getPreferredBow();
                            if (preferredBow) {
                                this.setCurrentBow(preferredBow);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('❌ Error syncing with NFT system:', error);
        }
    }
}

// Export to global scope
window.BowCustomization = BowCustomization;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Bow Customization...');
    window.bowCustomization = new BowCustomization();
    
    // Sync with NFT system after a delay
    setTimeout(() => {
        window.bowCustomization.syncWithNFTSystem();
    }, 2000);
});

// Add CSS for custom bows
const bowStyles = document.createElement('style');
bowStyles.textContent = `
    /* Custom Bow Classes */
    .bow-common {
        --bow-color: #8B4513;
        --string-color: #ddd;
    }
    
    .bow-rare {
        --bow-color: #4169E1;
        --string-color: #87CEEB;
    }
    
    .bow-epic {
        --bow-color: #9932CC;
        --string-color: #DDA0DD;
    }
    
    .bow-legendary {
        --bow-color: #FFD700;
        --string-color: #FFFACD;
        animation: legendaryGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes legendaryGlow {
        from { 
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            transform: scale(1);
        }
        to { 
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            transform: scale(1.05);
        }
    }
    
    /* Bow Selection UI */
    .bow-selector {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #667eea;
        border-radius: 15px;
        padding: 2rem;
        z-index: 10000;
        max-width: 500px;
        display: none;
    }
    
    .bow-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .bow-option {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .bow-option:hover {
        background: rgba(102, 126, 234, 0.2);
        border-color: #667eea;
    }
    
    .bow-option.selected {
        background: rgba(102, 126, 234, 0.3);
        border-color: #667eea;
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }
`;
document.head.appendChild(bowStyles);

console.log('✅ Bow Customization System ready');


