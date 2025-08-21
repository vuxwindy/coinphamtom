// NFT Card Manager - Hệ thống quản lý thẻ bài NFT
class NFTCardManager {
    constructor() {
        this.firebase = null;
        this.storage = null;
        this.firestore = null;
        this.currentUser = null;
        this.init();
    }

    async init() {
        try {
            // Initialize Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                authDomain: "coinphantom-e995b.firebaseapp.com",
                projectId: "coinphantom-e995b",
                storageBucket: "coinphantom-e995b.appspot.com",
                messagingSenderId: "123456789",
                appId: "1:123456789:web:abcdef123456"
            };

            if (window.firebase && window.firebase.app) {
                this.firebase = window.firebase;
                this.storage = window.firebase.storage();
                this.firestore = window.firebase.db;
                console.log('✅ Firebase storage and firestore initialized');
                console.log('✅ Firebase initialized for NFT Card Manager');
            } else {
                console.warn('⚠️ Firebase not available, using fallback mode');
                // Fallback mode - create mock functions
                this.firebase = {
                    storage: () => ({ ref: () => ({ child: () => ({ put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } }) }) }) }),
                    firestore: () => ({ collection: () => ({ doc: () => ({ set: () => Promise.resolve(), get: () => Promise.resolve({ exists: false, data: () => null }) }) }) })
                };
                this.storage = this.firebase.storage();
                this.firestore = this.firebase.firestore();
            }
        } catch (error) {
            console.error('Error initializing NFT Card Manager:', error);
        }
    }

    // Upload thẻ bài mới
    async uploadCard(cardData) {
        try {
            const {
                name,
                description,
                imageFile,
                rarity,
                type,
                series,
                attributes,
                price,
                supply,
                creator
            } = cardData;

            // Validate input
            if (!name || !imageFile || !rarity || !type) {
                throw new Error('Missing required fields');
            }

            // Generate unique ID
            const cardId = this.generateCardId();
            
            // Upload image to Firebase Storage
            const imagePath = `nft-cards/${cardId}/${imageFile.name}`;
            const imageRef = this.storage.ref().child(imagePath);
            const uploadTask = await imageRef.put(imageFile);
            const imageUrl = await uploadTask.ref.getDownloadURL();

            // Create metadata
            const metadata = {
                id: cardId,
                name: name,
                description: description,
                image: imageUrl,
                rarity: rarity, // Common, Rare, Epic, Legendary
                type: type, // Character, Item, Spell, etc.
                series: series || 'Base Set',
                attributes: attributes || {},
                price: price || 0,
                supply: supply || 1,
                creator: creator || this.currentUser?.uid,
                createdAt: new Date(),
                status: 'active',
                minted: 0,
                available: supply || 1
            };

            // Save to Firestore
            await this.firestore.collection('nft-cards').doc(cardId).set(metadata);

            return {
                success: true,
                cardId: cardId,
                metadata: metadata
            };

        } catch (error) {
            console.error('Error uploading card:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Mint thẻ bài cho user
    async mintCard(cardId, userId, quantity = 1) {
        try {
            const cardRef = this.firestore.collection('nft-cards').doc(cardId);
            const cardDoc = await cardRef.get();

            if (!cardDoc.exists) {
                throw new Error('Card not found');
            }

            const cardData = cardDoc.data();
            
            if (cardData.available < quantity) {
                throw new Error('Insufficient supply');
            }

            // Create minted NFT instances
            const mintedNFTs = [];
            for (let i = 0; i < quantity; i++) {
                const nftId = `${cardId}_${Date.now()}_${i}`;
                const nftInstance = {
                    id: nftId,
                    cardId: cardId,
                    owner: userId,
                    mintedAt: new Date(),
                    tokenId: `${cardId}_${cardData.minted + i + 1}`,
                    metadata: {
                        name: cardData.name,
                        description: cardData.description,
                        image: cardData.image,
                        rarity: cardData.rarity,
                        type: cardData.type,
                        series: cardData.series,
                        attributes: cardData.attributes
                    },
                    status: 'owned'
                };

                // Save NFT instance
                await this.firestore.collection('user-nfts').doc(nftId).set(nftInstance);
                mintedNFTs.push(nftInstance);
            }

            // Update card supply
            await cardRef.update({
                minted: cardData.minted + quantity,
                available: cardData.available - quantity
            });

            return {
                success: true,
                nfts: mintedNFTs
            };

        } catch (error) {
            console.error('Error minting card:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Lấy danh sách thẻ bài
    async getCards(filters = {}) {
        try {
            // Check if firestore is available
            if (!this.firestore || typeof this.firestore.collection !== 'function') {
                console.warn('⚠️ Firestore not available, returning mock data');
                return {
                    success: true,
                    cards: []
                };
            }
            
            let query = this.firestore.collection('nft-cards');

            // Apply filters
            if (filters.rarity) {
                query = query.where('rarity', '==', filters.rarity);
            }
            if (filters.type) {
                query = query.where('type', '==', filters.type);
            }
            if (filters.series) {
                query = query.where('series', '==', filters.series);
            }
            if (filters.status) {
                query = query.where('status', '==', filters.status);
            }

            const snapshot = await query.get();
            const cards = [];
            
            snapshot.forEach(doc => {
                cards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                cards: cards
            };

        } catch (error) {
            console.error('Error getting cards:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Lấy thẻ bài của user
    async getUserCards(userId) {
        try {
            const snapshot = await this.firestore
                .collection('user-nfts')
                .where('owner', '==', userId)
                .get();

            const userCards = [];
            snapshot.forEach(doc => {
                userCards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return {
                success: true,
                cards: userCards
            };

        } catch (error) {
            console.error('Error getting user cards:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Cập nhật thẻ bài
    async updateCard(cardId, updates) {
        try {
            await this.firestore.collection('nft-cards').doc(cardId).update({
                ...updates,
                updatedAt: new Date()
            });

            return {
                success: true
            };

        } catch (error) {
            console.error('Error updating card:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Xóa thẻ bài
    async deleteCard(cardId) {
        try {
            await this.firestore.collection('nft-cards').doc(cardId).update({
                status: 'deleted',
                deletedAt: new Date()
            });

            return {
                success: true
            };

        } catch (error) {
            console.error('Error deleting card:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Transfer NFT
    async transferNFT(nftId, fromUserId, toUserId) {
        try {
            const nftRef = this.firestore.collection('user-nfts').doc(nftId);
            const nftDoc = await nftRef.get();

            if (!nftDoc.exists) {
                throw new Error('NFT not found');
            }

            const nftData = nftDoc.data();
            if (nftData.owner !== fromUserId) {
                throw new Error('Unauthorized transfer');
            }

            // Update owner
            await nftRef.update({
                owner: toUserId,
                transferredAt: new Date(),
                previousOwner: fromUserId
            });

            // Add to transaction history
            await this.firestore.collection('transactions').add({
                nftId: nftId,
                from: fromUserId,
                to: toUserId,
                type: 'transfer',
                timestamp: new Date()
            });

            return {
                success: true
            };

        } catch (error) {
            console.error('Error transferring NFT:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get card statistics
    async getCardStats() {
        try {
            const cardsSnapshot = await this.firestore.collection('nft-cards').get();
            const userNftsSnapshot = await this.firestore.collection('user-nfts').get();

            let totalCards = 0;
            let totalMinted = 0;
            let totalUsers = new Set();

            cardsSnapshot.forEach(doc => {
                const data = doc.data();
                totalCards += data.supply || 0;
                totalMinted += data.minted || 0;
            });

            userNftsSnapshot.forEach(doc => {
                const data = doc.data();
                totalUsers.add(data.owner);
            });

            return {
                success: true,
                stats: {
                    totalCards: totalCards,
                    totalMinted: totalMinted,
                    totalUsers: totalUsers.size,
                    availableCards: totalCards - totalMinted
                }
            };

        } catch (error) {
            console.error('Error getting card stats:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Generate unique card ID
    generateCardId() {
        return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Set current user
    setCurrentUser(user) {
        this.currentUser = user;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NFTCardManager;
} else {
    window.NFTCardManager = NFTCardManager;
}
