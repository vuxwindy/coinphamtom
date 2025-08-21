<template>
  <div class="collection-page">
    <Header />
    
    <!-- Collection Hero Section -->
    <section class="collection-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="collection-header text-center">
              <h1 class="collection-title">My Collection</h1>
              <p class="collection-subtitle">Manage and showcase your digital assets</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection Stats -->
    <section class="collection-stats padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-images"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ collectionStats.totalNFTs }}</h3>
                <p class="stat-label">Total NFTs</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-coins"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ collectionStats.totalValue }}</h3>
                <p class="stat-label">Total Value ($PPO)</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ collectionStats.rareNFTs }}</h3>
                <p class="stat-label">Rare NFTs</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-eye"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ collectionStats.totalViews }}</h3>
                <p class="stat-label">Total Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection Filters -->
    <section class="collection-filters padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filters-container">
              <div class="search-box">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search your collection..."
                  class="search-input"
                >
                <i class="fas fa-search search-icon"></i>
              </div>
              
              <div class="filter-buttons">
                <button 
                  v-for="category in categories" 
                  :key="category.id"
                  @click="selectCategory(category.id)"
                  :class="['filter-btn', { active: selectedCategory === category.id }]"
                >
                  {{ category.name }}
                </button>
              </div>
              
              <div class="view-options">
                <button 
                  @click="viewMode = 'grid'"
                  :class="['view-btn', { active: viewMode === 'grid' }]"
                >
                  <i class="fas fa-th"></i>
                </button>
                <button 
                  @click="viewMode = 'list'"
                  :class="['view-btn', { active: viewMode === 'list' }]"
                >
                  <i class="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection Grid/List -->
    <section class="collection-content padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Grid View -->
            <div v-if="viewMode === 'grid'" class="collection-grid">
              <div 
                v-for="nft in filteredNFTs" 
                :key="nft.id" 
                class="collection-item"
                @click="openNFTCard(nft)"
              >
                <div class="nft-image">
                  <img :src="nft.image" :alt="nft.name">
                  <div class="nft-overlay">
                    <div class="nft-actions">
                      <button class="btn btn-primary btn-sm" @click.stop="listForSale(nft)">
                        <i class="fas fa-tag"></i> List
                      </button>
                      <button class="btn btn-outline-primary btn-sm" @click.stop="viewDetails(nft)">
                        <i class="fas fa-eye"></i> View
                      </button>
                    </div>
                  </div>
                  <div class="nft-badge" v-if="nft.isListed">
                    <span class="badge-listed">Listed</span>
                  </div>
                </div>
                <div class="nft-info">
                  <h4 class="nft-name">{{ nft.name }}</h4>
                  <p class="nft-description">{{ nft.description }}</p>
                  <div class="nft-meta">
                    <div class="nft-rarity">
                      <span :class="['rarity-badge', nft.rarity.toLowerCase()]">{{ nft.rarity }}</span>
                    </div>
                    <div class="nft-value" v-if="nft.isListed">
                      <span class="value-amount">{{ nft.listedPrice }}</span>
                      <span class="value-currency">$PPO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- List View -->
            <div v-else class="collection-list">
              <div 
                v-for="nft in filteredNFTs" 
                :key="nft.id" 
                class="collection-list-item"
                @click="openNFTCard(nft)"
              >
                <div class="list-item-image">
                  <img :src="nft.image" :alt="nft.name">
                </div>
                <div class="list-item-info">
                  <h4>{{ nft.name }}</h4>
                  <p>{{ nft.description }}</p>
                  <div class="list-item-meta">
                    <span :class="['rarity-badge', nft.rarity.toLowerCase()]">{{ nft.rarity }}</span>
                    <span class="acquisition-date">Acquired: {{ formatDate(nft.acquiredDate) }}</span>
                  </div>
                </div>
                <div class="list-item-actions">
                  <button class="btn btn-primary btn-sm" @click.stop="listForSale(nft)">
                    <i class="fas fa-tag"></i> List
                  </button>
                  <button class="btn btn-outline-primary btn-sm" @click.stop="viewDetails(nft)">
                    <i class="fas fa-eye"></i> View
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredNFTs.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="fas fa-box-open"></i>
              </div>
              <h3>No NFTs Found</h3>
              <p>Start building your collection by playing games or buying from the marketplace!</p>
              <div class="empty-actions">
                <button class="btn btn-primary" @click="navigateTo('/game')">
                  <i class="fas fa-gamepad"></i> Play Games
                </button>
                <button class="btn btn-outline-primary" @click="navigateTo('/marketplace')">
                  <i class="fas fa-store"></i> Browse Marketplace
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NFT Details Modal -->
    <div v-if="selectedNFT" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedNFT.name }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="nft-details">
            <div class="nft-image-large">
              <img :src="selectedNFT.image" :alt="selectedNFT.name">
            </div>
            <div class="nft-details-info">
              <h4>{{ selectedNFT.name }}</h4>
              <p>{{ selectedNFT.description }}</p>
              <div class="nft-attributes">
                <div v-for="attr in selectedNFT.attributes" :key="attr.trait_type" class="attribute">
                  <span class="attribute-name">{{ attr.trait_type }}</span>
                  <span class="attribute-value">{{ attr.value }}</span>
                </div>
              </div>
              <div class="nft-actions-details">
                <div class="action-buttons">
                  <button class="btn btn-primary" @click="listForSale(selectedNFT)">
                    <i class="fas fa-tag"></i> List for Sale
                  </button>
                  <button class="btn btn-outline-primary" @click="transferNFT(selectedNFT)">
                    <i class="fas fa-share"></i> Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useFirebase } from '@/composables/useFirebase.js'

const router = useRouter()
const { currentUser } = useFirebase()

// State
const searchQuery = ref('')
const selectedCategory = ref('all')
const viewMode = ref('grid')
const selectedNFT = ref(null)

// Categories
const categories = ref([
  { id: 'all', name: 'All' },
  { id: 'art', name: 'Art' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'collectibles', name: 'Collectibles' },
  { id: 'music', name: 'Music' },
  { id: 'photography', name: 'Photography' }
])

// Collection stats
const collectionStats = ref({
  totalNFTs: 0,
  totalValue: 0,
  rareNFTs: 0,
  totalViews: 0
})

// Sample user's NFT collection
const userNFTs = ref([
  {
    id: 1,
    name: 'Cosmic Warrior #001',
    description: 'A legendary warrior from the cosmic realm',
    image: '/src/assets/images/nft1.jpg',
    category: 'gaming',
    rarity: 'Legendary',
    isListed: false,
    listedPrice: null,
    acquiredDate: new Date('2024-01-15'),
    attributes: [
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Level', value: '99' },
      { trait_type: 'Power', value: '9500' }
    ]
  },
  {
    id: 2,
    name: 'Digital Sunset',
    description: 'Beautiful digital art capturing the perfect sunset',
    image: '/src/assets/images/nft2.jpg',
    category: 'art',
    rarity: 'Rare',
    isListed: true,
    listedPrice: 75,
    acquiredDate: new Date('2024-01-10'),
    attributes: [
      { trait_type: 'Style', value: 'Abstract' },
      { trait_type: 'Colors', value: 'Warm' },
      { trait_type: 'Mood', value: 'Peaceful' }
    ]
  },
  {
    id: 3,
    name: 'Pixel Dragon',
    description: 'A rare pixel art dragon with unique abilities',
    image: '/src/assets/images/nft3.jpg',
    category: 'collectibles',
    rarity: 'Epic',
    isListed: false,
    listedPrice: null,
    acquiredDate: new Date('2024-01-05'),
    attributes: [
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Element', value: 'Fire' },
      { trait_type: 'Size', value: 'Large' }
    ]
  }
])

// Computed properties
const filteredNFTs = computed(() => {
  let filtered = userNFTs.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(nft => 
      nft.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(nft => nft.category === selectedCategory.value)
  }

  return filtered
})

// Methods
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const openNFTCard = (nft) => {
  selectedNFT.value = nft
}

const closeModal = () => {
  selectedNFT.value = null
}

const listForSale = (nft) => {
  if (!currentUser.value) {
    alert('Please connect your wallet to list NFTs')
    return
  }
  
  const price = prompt(`Enter price for ${nft.name} (in $PPO):`)
  if (price && !isNaN(price)) {
    nft.isListed = true
    nft.listedPrice = parseFloat(price)
    console.log(`NFT ${nft.name} listed for ${price} $PPO`)
    alert(`NFT ${nft.name} has been listed for ${price} $PPO`)
  }
}

const viewDetails = (nft) => {
  openNFTCard(nft)
}

const transferNFT = (nft) => {
  const address = prompt('Enter recipient wallet address:')
  if (address) {
    console.log(`Transferring ${nft.name} to ${address}`)
    alert(`Transfer initiated for ${nft.name}`)
  }
}

const navigateTo = (path) => {
  router.push(path)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadCollectionStats = () => {
  collectionStats.value = {
    totalNFTs: userNFTs.value.length,
    totalValue: userNFTs.value.reduce((sum, nft) => sum + (nft.listedPrice || 0), 0),
    rareNFTs: userNFTs.value.filter(nft => nft.rarity === 'Legendary' || nft.rarity === 'Epic').length,
    totalViews: userNFTs.value.reduce((sum, nft) => sum + (Math.floor(Math.random() * 1000)), 0)
  }
}

// Lifecycle
onMounted(() => {
  loadCollectionStats()
})
</script>

<style scoped>
.collection-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.collection-hero {
  background: linear-gradient(135deg, rgba(204, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 80px 0;
}

.collection-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.collection-subtitle {
  font-size: 1.3rem;
  color: #b0b0b0;
  margin-bottom: 0;
}

.collection-stats {
  padding: 60px 0;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
}

.stat-icon {
  font-size: 3rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
}

.stat-label {
  color: #b0b0b0;
  font-size: 1.1rem;
  margin: 0;
}

.collection-filters {
  padding: 40px 0;
}

.filters-container {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 15px 50px 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  font-size: 1rem;
}

.search-input::placeholder {
  color: #b0b0b0;
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b0b0;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background: #cc00ff;
  border-color: #cc00ff;
}

.view-options {
  display: flex;
  gap: 10px;
}

.view-btn {
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn:hover,
.view-btn.active {
  background: #cc00ff;
  border-color: #cc00ff;
}

.collection-content {
  padding: 60px 0;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.collection-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.collection-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
  border-color: #cc00ff;
}

.nft-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.nft-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nft-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.collection-item:hover .nft-overlay {
  opacity: 1;
}

.nft-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

.badge-listed {
  background: #00ff88;
  color: #000;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.nft-info {
  padding: 20px;
}

.nft-name {
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
}

.nft-description {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
}

.nft-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rarity-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rarity-badge.legendary {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #000;
}

.rarity-badge.epic {
  background: linear-gradient(45deg, #9932cc, #ba55d3);
  color: white;
}

.rarity-badge.rare {
  background: linear-gradient(45deg, #4169e1, #6495ed);
  color: white;
}

.rarity-badge.common {
  background: linear-gradient(45deg, #808080, #a9a9a9);
  color: white;
}

.nft-value {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.value-amount {
  font-size: 1.2rem;
  font-weight: 700;
  color: #cc00ff;
}

.value-currency {
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* List View */
.collection-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.collection-list-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.collection-list-item:hover {
  transform: translateX(10px);
  border-color: rgba(204, 0, 255, 0.3);
}

.list-item-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.list-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-item-info {
  flex: 1;
}

.list-item-info h4 {
  color: white;
  margin-bottom: 5px;
}

.list-item-info p {
  color: #b0b0b0;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.list-item-meta {
  display: flex;
  gap: 15px;
  align-items: center;
}

.acquisition-date {
  color: #666;
  font-size: 0.9rem;
}

.list-item-actions {
  display: flex;
  gap: 10px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 4rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: white;
  margin-bottom: 15px;
}

.empty-state p {
  color: #b0b0b0;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.empty-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

.close-btn:hover {
  color: white;
}

.modal-body {
  padding: 20px;
}

.nft-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.nft-image-large img {
  width: 100%;
  border-radius: 15px;
}

.nft-details-info h4 {
  color: white;
  margin-bottom: 15px;
}

.nft-details-info p {
  color: #b0b0b0;
  margin-bottom: 20px;
  line-height: 1.6;
}

.nft-attributes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.attribute {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.attribute-name {
  display: block;
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.attribute-value {
  color: #cc00ff;
  font-weight: 600;
}

.nft-actions-details {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .collection-title {
    font-size: 2.5rem;
  }
  
  .filters-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .collection-grid {
    grid-template-columns: 1fr;
  }
  
  .collection-list-item {
    flex-direction: column;
    text-align: center;
  }
  
  .list-item-actions {
    margin-top: 15px;
  }
  
  .nft-details {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
