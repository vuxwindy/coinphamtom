<template>
  <div class="marketplace-page">
    <Header />

    <!-- Hero Section -->
    <section id="marketplace-hero" class="padding-large overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <div class="banner-content content-light">
              <h1 class="banner-title">NFT Marketplace</h1>
              <p class="grey">Discover, buy and sell NFTs from all players</p>
              
              <!-- Marketplace Stats -->
              <div class="marketplace-stats d-flex justify-content-center mt-5">
                <div class="stat-item mx-4 text-center">
                  <h3 class="text-primary">{{ totalMarketplaceItems }}</h3>
                  <small class="text-white-50">Total NFTs on Market</small>
                    </div>
                <div class="stat-item mx-4 text-center">
                  <h3 class="text-success">{{ totalPersonalItems }}</h3>
                  <small class="text-white-50">Personal NFTs</small>
                  </div>
                <div class="stat-item mx-4 text-center">
                  <h3 class="text-warning">{{ totalValue }} PPO</h3>
                  <small class="text-white-50">Total Value</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: Current NFT Marketplace for All Players -->
    <section class="marketplace-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="fas fa-store"></i>
                    </div>
          <h2 class="section-title">NFT Marketplace Currently Trading from All Players</h2>
          <p class="section-description">Discover and buy NFTs from the player community</p>
        </div>

        <!-- Search and Filter -->
        <div class="filter-section">
          <div class="row">
            <div class="col-md-6">
              <div class="search-box">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search NFTs..."
                  class="search-input"
                >
                <i class="fas fa-search search-icon"></i>
              </div>
            </div>
            <div class="col-md-6">
              <div class="filter-controls">
                <select v-model="selectedCategory" class="filter-select">
                  <option value="">All Categories</option>
                  <option value="character">Characters</option>
                  <option value="weapon">Weapons</option>
                  <option value="accessory">Accessories</option>
                  <option value="mount">Mounts</option>
                </select>
                <select v-model="selectedRarity" class="filter-select">
                  <option value="">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
                  </div>
                </div>
              </div>

        <!-- NFT Grid -->
        <div class="nft-grid">
          <div class="row">
            <div 
              v-for="nft in filteredMarketplaceNFTs" 
              :key="nft.id" 
              class="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div class="nft-card">
                <div class="nft-image-container">
                  <img :src="nft.image" :alt="nft.name" class="nft-image">
                  <div class="nft-badge" :class="nft.rarity">
                    {{ nft.rarity }}
                </div>
                  <div class="nft-price-badge">
                    {{ nft.price }} PPO
                </div>
                </div>
                <div class="nft-info">
                  <h3 class="nft-name">{{ nft.name }}</h3>
                  <p class="nft-description">{{ nft.description }}</p>
                  <div class="nft-owner">
                    <span>Owner: {{ nft.owner }}</span>
                  </div>
                  <div class="nft-actions">
                    <button 
                      class="btn-buy" 
                      :class="{ 'disabled': !isWalletConnected }"
                      @click="openBuyModal(nft)"
                      :disabled="!isWalletConnected"
                    >
                      <i class="fas fa-shopping-cart"></i>
                      {{ isWalletConnected ? 'Buy Now' : 'Connect Wallet' }}
                    </button>
                    <button 
                      class="btn-offer" 
                      :class="{ 'disabled': !isWalletConnected }"
                      @click="openOfferModal(nft)"
                      :disabled="!isWalletConnected"
                    >
                      <i class="fas fa-gavel"></i>
                      {{ isWalletConnected ? 'Make Offer' : 'Connect Wallet' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Personal NFT Storage with Buy/Sell Capability -->
    <section class="marketplace-section personal-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="fas fa-vault"></i>
                </div>
          <h2 class="section-title">Personal NFT Storage with Buy/Sell Capability</h2>
          <p class="section-description">Manage and sell your NFTs</p>
                </div>

        <!-- Personal Stats -->
        <div class="personal-stats">
          <div class="row">
            <div class="col-md-3">
              <div class="stat-card">
                <h3>{{ personalStats.totalNFTs }}</h3>
                <p>Total NFTs</p>
                  </div>
                </div>
                <div class="col-md-3">
              <div class="stat-card">
                <h3>{{ personalStats.totalValue }} PPO</h3>
                <p>Total Value</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <h3>{{ personalStats.listedNFTs }}</h3>
                <p>Listed for Sale</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="stat-card">
                <h3>{{ personalStats.soldNFTs }}</h3>
                <p>Sold</p>
              </div>
            </div>
                </div>
              </div>

        <!-- Personal NFT Grid -->
        <div class="nft-grid">
          <div class="row">
            <div 
              v-for="nft in personalNFTs" 
              :key="nft.id" 
              class="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div class="nft-card personal-nft">
                <div class="nft-image-container">
                  <img :src="nft.image" :alt="nft.name" class="nft-image">
                  <div class="nft-badge" :class="nft.rarity">
                    {{ nft.rarity }}
                  </div>
                  <div class="nft-status" :class="nft.status">
                    {{ nft.status === 'listed' ? 'Listed' : 'In Storage' }}
                  </div>
                </div>
                <div class="nft-info">
                  <h3 class="nft-name">{{ nft.name }}</h3>
                  <p class="nft-description">{{ nft.description }}</p>
                  <div class="nft-price" v-if="nft.status === 'listed'">
                    <span>Price: {{ nft.price }} PPO</span>
                  </div>
                                    <div class="nft-actions">
                    <button 
                      v-if="nft.status === 'owned'" 
                      class="btn-sell" 
                      :class="{ 'disabled': !isWalletConnected }"
                      @click="openSellModal(nft)"
                      :disabled="!isWalletConnected"
                    >
                      <i class="fas fa-tag"></i>
                      {{ isWalletConnected ? 'Sell' : 'Connect Wallet' }}
                  </button>
                    <button 
                      v-if="nft.status === 'listed'" 
                      class="btn-cancel" 
                      :class="{ 'disabled': !isWalletConnected }"
                      @click="cancelListing(nft)"
                      :disabled="!isWalletConnected"
                    >
                      <i class="fas fa-times"></i>
                      {{ isWalletConnected ? 'Cancel Sale' : 'Connect Wallet' }}
                    </button>
                    <button class="btn-details" @click="viewDetails(nft)">
                      <i class="fas fa-eye"></i>
                      Details
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Additional NFT Storage -->
    <section class="marketplace-section additional-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="fas fa-archive"></i>
          </div>
          <h2 class="section-title">Additional NFT Storage</h2>
          <p class="section-description">Special and rare NFT collections</p>
        </div>

        <!-- Special Collections -->
        <div class="collections-grid">
          <div class="row">
            <div 
              v-for="collection in specialCollections" 
              :key="collection.id" 
              class="col-lg-4 col-md-6 mb-4"
            >
              <div class="collection-card">
                <div class="collection-image">
                  <img :src="collection.image" :alt="collection.name">
                  <div class="collection-overlay">
                    <h3>{{ collection.name }}</h3>
                    <p>{{ collection.description }}</p>
                    <div class="collection-stats">
                      <span>{{ collection.itemCount }} items</span>
                      <span>{{ collection.floorPrice }} PPO floor</span>
                    </div>
                    <button class="btn-explore" @click="exploreCollection(collection)">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured NFTs -->
        <div class="featured-section">
          <h3 class="featured-title">Featured NFTs</h3>
          <div class="nft-grid">
            <div class="row">
              <div 
                v-for="nft in featuredNFTs" 
                :key="nft.id" 
                class="col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <div class="nft-card featured-nft">
                  <div class="nft-image-container">
                    <img :src="nft.image" :alt="nft.name" class="nft-image">
                    <div class="nft-badge featured">
                      Featured
            </div>
                    <div class="nft-price-badge">
                      {{ nft.price }} PPO
          </div>
        </div>
                  <div class="nft-info">
                    <h3 class="nft-name">{{ nft.name }}</h3>
                    <p class="nft-description">{{ nft.description }}</p>
                    <div class="nft-actions">
                      <button 
                        class="btn-buy" 
                        :class="{ 'disabled': !isWalletConnected }"
                        @click="openBuyModal(nft)"
                        :disabled="!isWalletConnected"
                      >
                        <i class="fas fa-shopping-cart"></i>
                        {{ isWalletConnected ? 'Buy Now' : 'Connect Wallet' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Buy NFT Modal -->
    <div v-if="showBuyModal" class="modal-overlay" @click="closeBuyModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Buy NFT</h3>
          <button class="modal-close" @click="closeBuyModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="nft-preview">
            <img :src="selectedNFT?.image" :alt="selectedNFT?.name" class="nft-preview-image">
            <div class="nft-preview-info">
              <h4>{{ selectedNFT?.name }}</h4>
              <p>{{ selectedNFT?.description }}</p>
              <div class="nft-preview-price">
                <span class="price-label">Price:</span>
                <span class="price-value">{{ selectedNFT?.price }} PPO</span>
              </div>
            </div>
          </div>
          <div class="purchase-form">
            <div class="form-group">
              <label>Your Wallet Address:</label>
              <input 
                type="text" 
                v-model="buyerWallet" 
                placeholder="Enter wallet address"
                class="form-input"
              >
            </div>
            <div class="form-group">
              <label>Quantity:</label>
              <input 
                type="number" 
                v-model="buyQuantity" 
                min="1" 
                max="1"
                class="form-input"
              >
            </div>
            <div class="total-section">
              <div class="total-row">
                <span>NFT Price:</span>
                <span>{{ selectedNFT?.price }} PPO</span>
              </div>
              <div class="total-row">
                <span>Transaction Fee:</span>
                <span>0.01 PPO</span>
              </div>
              <div class="total-row total">
                <span>Total:</span>
                <span>{{ (selectedNFT?.price || 0) + 0.01 }} PPO</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel-modal" @click="closeBuyModal">
            Cancel
          </button>
          <button class="btn-confirm-buy" @click="confirmBuy" :disabled="isProcessing">
            <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
            <span v-else>Confirm Purchase</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Offer Modal -->
    <div v-if="showOfferModal" class="modal-overlay" @click="closeOfferModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Make Offer for NFT</h3>
          <button class="modal-close" @click="closeOfferModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="nft-preview">
            <img :src="selectedNFT?.image" :alt="selectedNFT?.name" class="nft-preview-image">
            <div class="nft-preview-info">
              <h4>{{ selectedNFT?.name }}</h4>
              <p>{{ selectedNFT?.description }}</p>
              <div class="nft-preview-price">
                <span class="price-label">Current Price:</span>
                <span class="price-value">{{ selectedNFT?.price }} PPO</span>
              </div>
            </div>
          </div>
          <div class="offer-form">
            <div class="form-group">
              <label>Offer Price (PPO):</label>
              <input 
                type="number" 
                v-model="offerPrice" 
                :min="(selectedNFT?.price || 0) * 0.8"
                :max="(selectedNFT?.price || 0) * 1.5"
                step="0.01"
                class="form-input"
                placeholder="Enter offer price"
              >
              <small class="form-help">
                Offer price from {{ ((selectedNFT?.price || 0) * 0.8).toFixed(2) }} to {{ ((selectedNFT?.price || 0) * 1.5).toFixed(2) }} PPO
              </small>
            </div>
            <div class="form-group">
              <label>Valid Duration (hours):</label>
              <select v-model="offerDuration" class="form-input">
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
                <option value="168">1 week</option>
              </select>
            </div>
            <div class="form-group">
              <label>Note (optional):</label>
              <textarea 
                v-model="offerNote" 
                class="form-input"
                placeholder="Enter note for seller..."
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel-modal" @click="closeOfferModal">
            Cancel
          </button>
          <button class="btn-confirm-offer" @click="confirmOffer" :disabled="isProcessing">
            <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
            <span v-else>Send Offer</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Sell NFT Modal -->
    <div v-if="showSellModal" class="modal-overlay" @click="closeSellModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Sell NFT</h3>
          <button class="modal-close" @click="closeSellModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="nft-preview">
            <img :src="selectedNFT?.image" :alt="selectedNFT?.name" class="nft-preview-image">
            <div class="nft-preview-info">
              <h4>{{ selectedNFT?.name }}</h4>
              <p>{{ selectedNFT?.description }}</p>
            </div>
          </div>
          <div class="sell-form">
            <div class="form-group">
              <label>Selling Price (PPO):</label>
              <input 
                type="number" 
                v-model="sellPrice" 
                min="0.01"
                step="0.01"
                class="form-input"
                placeholder="Enter selling price"
              >
            </div>
            <div class="form-group">
              <label>Description (optional):</label>
              <textarea 
                v-model="sellDescription" 
                class="form-input"
                placeholder="Describe your NFT..."
                rows="3"
              ></textarea>
            </div>
            <div class="fee-section">
              <div class="fee-row">
                <span>Listing Fee:</span>
                <span>0.01 PPO</span>
              </div>
              <div class="fee-row">
                <span>Transaction Fee:</span>
                <span>2.5%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel-modal" @click="closeSellModal">
            Cancel
          </button>
          <button class="btn-confirm-sell" @click="confirmSell" :disabled="isProcessing">
            <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
            <span v-else>List for Sale</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Toast -->
    <div v-if="showToast" class="toast" :class="toastType">
      <div class="toast-content">
        <i :class="toastIcon"></i>
        <span>{{ toastMessage }}</span>
      </div>
      <button class="toast-close" @click="closeToast">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// Simple wallet connection state
const isWalletConnected = ref(false)
const walletAddress = ref('')

// Check wallet connection status from localStorage or window events
const checkWalletConnection = () => {
  // Check if wallet is connected via localStorage
  const connected = localStorage.getItem('walletConnected') === 'true'
  const address = localStorage.getItem('walletAddress') || ''
  
  isWalletConnected.value = connected
  walletAddress.value = address
  
  // Also check window events for real-time updates
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          isWalletConnected.value = true
          walletAddress.value = accounts[0]
          localStorage.setItem('walletConnected', 'true')
          localStorage.setItem('walletAddress', accounts[0])
        }
      })
      .catch(console.error)
  }
}

// Listen for wallet connection events
onMounted(() => {
  checkWalletConnection()
  
  // Listen for wallet connection events
  window.addEventListener('wallet-connected', (event) => {
    isWalletConnected.value = true
    walletAddress.value = event.detail.address || ''
    localStorage.setItem('walletConnected', 'true')
    localStorage.setItem('walletAddress', walletAddress.value)
  })
  
  window.addEventListener('wallet-disconnected', () => {
    isWalletConnected.value = false
    walletAddress.value = ''
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  })
  
  // Listen for MetaMask account changes
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        isWalletConnected.value = false
        walletAddress.value = ''
        localStorage.removeItem('walletConnected')
        localStorage.removeItem('walletAddress')
      } else {
        isWalletConnected.value = true
        walletAddress.value = accounts[0]
        localStorage.setItem('walletConnected', 'true')
        localStorage.setItem('walletAddress', accounts[0])
      }
    })
  }
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedRarity = ref('')

// Marketplace NFTs data
const marketplaceNFTs = ref([
  {
    id: 1,
    name: 'Legendary Warrior',
    description: 'Legendary warrior with special powers',
    image: '/src/assets/images/nft1.jpg',
    price: 150,
    rarity: 'legendary',
    category: 'character',
    owner: 'Player123',
    status: 'listed'
  },
  {
    id: 2,
    name: 'Epic Sword',
    description: 'Epic sword with powerful attack abilities',
    image: '/src/assets/images/nft2.jpg',
    price: 75,
    rarity: 'epic',
    category: 'weapon',
    owner: 'Gamer456',
    status: 'listed'
  },
  {
    id: 3,
    name: 'Rare Mount',
    description: 'Rare mount with fast movement speed',
    image: '/src/assets/images/nft3.jpg',
    price: 200,
    rarity: 'rare',
    category: 'mount',
    owner: 'Collector789',
    status: 'listed'
  },
  {
    id: 4,
    name: 'Magic Bow',
    description: 'Magic bow with high accuracy',
    image: '/src/assets/images/nft4.jpg',
    price: 120,
    rarity: 'epic',
    category: 'weapon',
    owner: 'Archer101',
    status: 'listed'
  },
  {
    id: 5,
    name: 'Rare Archer',
    description: 'Rare archer with precise shooting skills',
    image: '/src/assets/images/nft5.jpg',
    price: 180,
    rarity: 'rare',
    category: 'character',
    owner: 'Hunter202',
    status: 'listed'
  },
  {
    id: 6,
    name: 'Legendary Staff',
    description: 'Legendary magic staff with ultimate power',
    image: '/src/assets/images/nft6.jpg',
    price: 300,
    rarity: 'legendary',
    category: 'weapon',
    owner: 'Mage777',
    status: 'listed'
  }
])

// Personal NFTs data
const personalNFTs = ref([
  {
    id: 101,
    name: 'My First NFT',
    description: 'My first NFT',
    image: '/src/assets/images/nft-item1.jpg',
    price: 50,
    rarity: 'common',
    category: 'character',
    status: 'owned'
  },
  {
    id: 102,
    name: 'Rare Collection',
    description: 'Rare collection',
    image: '/src/assets/images/nft-item2.jpg',
    price: 180,
    rarity: 'rare',
    category: 'accessory',
    status: 'listed'
  },
  {
    id: 103,
    name: 'Limited Edition',
    description: 'Limited edition',
    image: '/src/assets/images/nft-item3.jpg',
    price: 300,
    rarity: 'legendary',
    category: 'weapon',
    status: 'owned'
  },
  {
    id: 104,
    name: 'Epic Accessory',
    description: 'Epic accessory with special effects',
    image: '/src/assets/images/nft-item4.jpg',
    price: 120,
    rarity: 'epic',
    category: 'accessory',
    status: 'owned'
  }
])

// Special collections data
const specialCollections = ref([
  {
    id: 1,
    name: 'Legendary Warriors',
    description: 'Legendary warrior collection',
    image: '/src/assets/images/collection-item1.jpg',
    itemCount: 25,
    floorPrice: 500
  },
  {
    id: 2,
    name: 'Epic Weapons',
    description: 'Powerful epic weapons',
    image: '/src/assets/images/collection-item2.jpg',
    itemCount: 15,
    floorPrice: 300
  },
  {
    id: 3,
    name: 'Rare Mounts',
    description: 'Rare mounts collection',
    image: '/src/assets/images/collection-item3.jpg',
    itemCount: 10,
    floorPrice: 800
  }
])

// Featured NFTs data
const featuredNFTs = ref([
  {
    id: 201,
    name: 'Ultimate Warrior',
    description: 'Ultimate warrior',
    image: '/src/assets/images/collection-item4.jpg',
    price: 1000,
    rarity: 'legendary'
  },
  {
    id: 202,
    name: 'Mythical Sword',
    description: 'Mythical sword',
    image: '/src/assets/images/collection-item5.jpg',
    price: 750,
    rarity: 'legendary'
  },
  {
    id: 203,
    name: 'Dragon Mount',
    description: 'Legendary dragon mount',
    image: '/src/assets/images/collection-item6.jpg',
    price: 1500,
    rarity: 'legendary'
  },
  {
    id: 204,
    name: 'Magic Staff',
    description: 'Powerful magic staff',
    image: '/src/assets/images/collection-item7.jpg',
    price: 600,
    rarity: 'epic'
  }
])

// Modal state
const showBuyModal = ref(false)
const showOfferModal = ref(false)
const showSellModal = ref(false)
const selectedNFT = ref(null)

// Form data for modals
const buyerWallet = ref('')
const buyQuantity = ref(1)
const offerPrice = ref(0)
const offerDuration = ref('24')
const offerNote = ref('')
const sellPrice = ref(0)
const sellDescription = ref('')

// Processing state
const isProcessing = ref(false)

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('info') // 'info', 'success', 'error'
const toastIcon = ref('fas fa-info-circle') // 'fas fa-check-circle', 'fas fa-times-circle'

// Computed properties
const filteredMarketplaceNFTs = computed(() => {
  return marketplaceNFTs.value.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || nft.category === selectedCategory.value
    const matchesRarity = !selectedRarity.value || nft.rarity === selectedRarity.value
    
    return matchesSearch && matchesCategory && matchesRarity
  })
})

const totalMarketplaceItems = computed(() => marketplaceNFTs.value.length)
const totalPersonalItems = computed(() => personalNFTs.value.length)
const totalValue = computed(() => {
  const marketplaceValue = marketplaceNFTs.value.reduce((sum, nft) => sum + nft.price, 0)
  const personalValue = personalNFTs.value.reduce((sum, nft) => sum + nft.price, 0)
  return marketplaceValue + personalValue
})

const personalStats = computed(() => {
  if (!isWalletConnected.value) {
    return {
      totalNFTs: 0,
      totalValue: 0,
      listedNFTs: 0,
      soldNFTs: 0
    }
  }
  
  const totalNFTs = personalNFTs.value.length
  const totalValue = personalNFTs.value.reduce((sum, nft) => sum + nft.price, 0)
  const listedNFTs = personalNFTs.value.filter(nft => nft.status === 'listed').length
  const soldNFTs = 3 // Mock data - should be dynamic in real implementation
  
  return {
    totalNFTs,
    totalValue,
    listedNFTs,
    soldNFTs
  }
})

// Methods
const openBuyModal = (nft) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first to buy NFTs.', 'error')
    return
  }
  
  selectedNFT.value = nft
  showBuyModal.value = true
  buyerWallet.value = walletAddress.value || ''
  buyQuantity.value = 1
}

const closeBuyModal = () => {
  showBuyModal.value = false
  selectedNFT.value = null
}

const openOfferModal = (nft) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first to make offers.', 'error')
    return
  }
  
  selectedNFT.value = nft
  showOfferModal.value = true
  offerPrice.value = nft.price
  offerDuration.value = '24'
  offerNote.value = ''
}

const closeOfferModal = () => {
  showOfferModal.value = false
  selectedNFT.value = null
}

const openSellModal = (nft) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first to sell NFTs.', 'error')
    return
  }
  
  selectedNFT.value = nft
  showSellModal.value = true
  sellPrice.value = nft.price
  sellDescription.value = ''
}

const closeSellModal = () => {
  showSellModal.value = false
  selectedNFT.value = null
}

const viewDetails = (nft) => {
  console.log('Viewing details for NFT:', nft.name)
  // Implement view details logic
}

const exploreCollection = (collection) => {
  console.log('Exploring collection:', collection.name)
  // Implement explore logic
}

const confirmBuy = async () => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first.', 'error')
    return
  }

  if (!buyerWallet.value) {
    showToastMessage('Please enter your wallet address.', 'error')
    return
  }

  isProcessing.value = true
  try {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToastMessage('You have successfully purchased the NFT!', 'success')
    // Update personalNFTs or marketplaceNFTs if needed
    // For now, just close modal and refresh stats
    closeBuyModal()
    // Re-fetch or update personalNFTs to reflect purchase
    // personalNFTs.value = personalNFTs.value.filter(nft => nft.id !== selectedNFT.value.id)
  } catch (error) {
    console.error('Error confirming buy:', error)
    showToastMessage('An error occurred while purchasing the NFT.', 'error')
  } finally {
    isProcessing.value = false
  }
}

const confirmOffer = async () => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first.', 'error')
    return
  }

  if (offerPrice.value <= 0) {
    showToastMessage('Please enter an offer price.', 'error')
    return
  }

  isProcessing.value = true
  try {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500))
    showToastMessage('You have successfully made an offer for the NFT!', 'success')
    // Update marketplaceNFTs to reflect offer
    const index = marketplaceNFTs.value.findIndex(nft => nft.id === selectedNFT.value.id)
    if (index !== -1) {
      marketplaceNFTs.value[index].price = offerPrice.value
      marketplaceNFTs.value[index].status = 'offer' // Or 'pending'
      marketplaceNFTs.value[index].offerPrice = offerPrice.value
      marketplaceNFTs.value[index].offerDuration = offerDuration.value
      marketplaceNFTs.value[index].offerNote = offerNote.value
    }
    closeOfferModal()
  } catch (error) {
    console.error('Error confirming offer:', error)
    showToastMessage('An error occurred while making the offer.', 'error')
  } finally {
    isProcessing.value = false
  }
}

const confirmSell = async () => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first.', 'error')
    return
  }

  if (sellPrice.value <= 0) {
    showToastMessage('Please enter a selling price.', 'error')
    return
  }

  isProcessing.value = true
  try {
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500))
    showToastMessage('You have successfully listed the NFT for sale!', 'success')
    // Update personalNFTs to reflect sale
    const index = personalNFTs.value.findIndex(nft => nft.id === selectedNFT.value.id)
    if (index !== -1) {
      personalNFTs.value[index].status = 'listed'
      personalNFTs.value[index].price = sellPrice.value
      personalNFTs.value[index].description = sellDescription.value
    }
    closeSellModal()
  } catch (error) {
    console.error('Error confirming sell:', error)
    showToastMessage('An error occurred while listing for sale.', 'error')
  } finally {
    isProcessing.value = false
  }
}

const cancelListing = (nft) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first.', 'error')
    return
  }
  
  console.log('Canceling listing for NFT:', nft.name)
  nft.status = 'owned'
  showToastMessage('Listing cancelled successfully.', 'success')
  // Implement cancel logic
}

const showToastMessage = (message, type = 'info') => {
  toastMessage.value = message
  toastType.value = type
  toastIcon.value = type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle'
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const closeToast = () => {
  showToast.value = false
}

onMounted(() => {
  console.log('Marketplace component mounted')
})
</script>

<style scoped>
.marketplace-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

/* Hero Section */
.banner-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.grey {
  color: #b0b0b0;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.content-light {
  color: #ffffff;
}

.marketplace-stats {
  margin-top: 50px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(204, 0, 255, 0.2);
}

.stat-item h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.stat-item small {
  font-size: 1rem;
  opacity: 0.8;
}

/* Marketplace Sections */
.marketplace-section {
  padding: 80px 0;
  position: relative;
}

.marketplace-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(204, 0, 255, 0.3), transparent);
}

.personal-section {
  background: rgba(204, 0, 255, 0.05);
}

.additional-section {
  background: rgba(255, 255, 255, 0.02);
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  margin-bottom: 20px;
  font-size: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(204, 0, 255, 0.3);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-description {
  font-size: 1.2rem;
  color: #b0b0b0;
  max-width: 600px;
  margin: 0 auto;
}

/* Search and Filter */
.filter-section {
  margin-bottom: 50px;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
}

.search-input::placeholder {
  color: #b0b0b0;
}

.search-input:focus {
  outline: none;
  border-color: #cc00ff;
  box-shadow: 0 0 20px rgba(204, 0, 255, 0.3);
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b0b0;
  font-size: 1.2rem;
}

.filter-controls {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.filter-select {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  min-width: 150px;
}

.filter-select:focus {
  outline: none;
  border-color: #cc00ff;
}

/* NFT Grid */
.nft-grid {
  margin-bottom: 50px;
}

.nft-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  height: 100%;
  position: relative;
}

.nft-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: #cc00ff;
}

.personal-nft {
  border-color: rgba(255, 193, 7, 0.3);
}

.personal-nft:hover {
  border-color: #ffc107;
}

.featured-nft {
  border-color: rgba(220, 53, 69, 0.3);
}

.featured-nft:hover {
  border-color: #dc3545;
}

.nft-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.nft-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.nft-card:hover .nft-image {
  transform: scale(1.1);
}

.nft-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.nft-badge.common {
  background: linear-gradient(45deg, #6c757d, #495057);
}

.nft-badge.rare {
  background: linear-gradient(45deg, #007bff, #0056b3);
}

.nft-badge.epic {
  background: linear-gradient(45deg, #6f42c1, #5a2d91);
}

.nft-badge.legendary {
  background: linear-gradient(45deg, #ffc107, #e0a800);
}

.nft-badge.featured {
  background: linear-gradient(45deg, #dc3545, #c82333);
}

.nft-price-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: #cc00ff;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.nft-status {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.nft-status.owned {
  background: linear-gradient(45deg, #28a745, #20c997);
}

.nft-status.listed {
  background: linear-gradient(45deg, #ffc107, #fd7e14);
}

.nft-info {
  padding: 25px;
}

.nft-name {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 10px;
  line-height: 1.3;
}

.nft-description {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.5;
}

.nft-owner {
  color: #cc00ff;
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-weight: 500;
}

.nft-price {
  color: #ffc107;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.nft-actions {
  display: flex;
  gap: 10px;
}

.btn-buy, .btn-offer, .btn-sell, .btn-cancel, .btn-details {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-buy {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: white;
}

.btn-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(204, 0, 255, 0.4);
}

.btn-offer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-offer:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-sell {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
}

.btn-sell:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4);
}

.btn-cancel {
  background: linear-gradient(45deg, #dc3545, #c82333);
  color: white;
}

.btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(220, 53, 69, 0.4);
}

.btn-details {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-details:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Disabled Button States */
.btn-buy.disabled, .btn-offer.disabled, .btn-sell.disabled, .btn-cancel.disabled {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #b0b0b0 !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  cursor: not-allowed !important;
  opacity: 0.6;
}

.btn-buy.disabled:hover, .btn-offer.disabled:hover, .btn-sell.disabled:hover, .btn-cancel.disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

/* Personal Stats */
.personal-stats {
  margin-bottom: 50px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(204, 0, 255, 0.2);
  border-color: #cc00ff;
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #cc00ff;
  margin-bottom: 10px;
}

.stat-card p {
  color: #b0b0b0;
  font-size: 1rem;
  margin: 0;
}

/* Collections Grid */
.collections-grid {
  margin-bottom: 60px;
}

.collection-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  height: 300px;
  position: relative;
}

.collection-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-color: #cc00ff;
}

.collection-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.collection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-card:hover .collection-image img {
  transform: scale(1.1);
}

.collection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(204, 0, 255, 0.3));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.collection-card:hover .collection-overlay {
  opacity: 1;
}

.collection-overlay h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.collection-overlay p {
  color: #e0e0e0;
  font-size: 0.9rem;
  margin-bottom: 20px;
  line-height: 1.4;
}

.collection-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.collection-stats span {
  color: #cc00ff;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-explore {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-explore:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(204, 0, 255, 0.4);
}

/* Featured Section */
.featured-section {
  margin-top: 60px;
}

.featured-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 40px;
  background: linear-gradient(45deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.modal-header h3 {
  margin: 0;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #cc00ff;
}

.modal-body {
  padding: 25px;
  overflow-y: auto;
  flex-grow: 1;
}

.nft-preview {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nft-preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nft-preview-info h4 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.nft-preview-info p {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.nft-preview-price {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.price-label {
  color: #ffc107;
  font-weight: 600;
  font-size: 1rem;
}

.price-value {
  color: #cc00ff;
  font-weight: 700;
  font-size: 1.2rem;
}

.purchase-form, .offer-form, .sell-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #cc00ff;
  box-shadow: 0 0 20px rgba(204, 0, 255, 0.3);
}

.form-input::placeholder {
  color: #b0b0b0;
}

.form-help {
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-top: 5px;
}

.total-section, .fee-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.total-row, .fee-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.total-row span:last-child, .fee-row span:last-child {
  color: #ffc107;
  font-weight: 600;
}

.total-row.total span:last-child {
  color: #cc00ff;
  font-weight: 700;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.btn-cancel-modal, .btn-confirm-buy, .btn-confirm-offer, .btn-confirm-sell {
  flex: 1;
  padding: 12px 25px;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-cancel-modal {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-cancel-modal:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-confirm-buy {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: white;
}

.btn-confirm-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(204, 0, 255, 0.4);
}

.btn-confirm-offer {
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
}

.btn-confirm-offer:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.4);
}

.btn-confirm-sell {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
}

.btn-confirm-sell:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4);
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10000;
  opacity: 0.9;
  transition: opacity 0.5s ease-in-out;
}

.toast.success {
  background: linear-gradient(45deg, #28a745, #20c997);
}

.toast.error {
  background: linear-gradient(45deg, #dc3545, #c82333);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
}

.toast-close:hover {
  color: #cc00ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .marketplace-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .stat-item {
    min-width: auto;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
  }
  
  .nft-actions {
    flex-direction: column;
  }
  
  .collection-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .personal-stats .row {
    gap: 20px;
  }
  
  .stat-card {
    margin-bottom: 20px;
  }
  
  /* Modal responsive */
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .nft-preview {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-footer {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-cancel-modal, .btn-confirm-buy, .btn-confirm-offer, .btn-confirm-sell {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .banner-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-badge {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .nft-info {
    padding: 20px;
  }
  
  .nft-name {
    font-size: 1.1rem;
  }
  
  .collection-overlay {
    padding: 20px;
  }
  
  .collection-overlay h3 {
    font-size: 1.2rem;
  }
  
  /* Modal responsive for small screens */
  .modal-header {
    padding: 20px;
  }
  
  .modal-header h3 {
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .nft-preview-image {
    width: 80px;
    height: 80px;
  }
  
  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    padding: 12px 20px;
  }
}
</style>
