<template>
  <div class="marketplace-page">
    <Header />
    
    <!-- Marketplace Hero Section -->
    <section class="marketplace-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="marketplace-header text-center">
              <h1 class="marketplace-title">NFT Marketplace</h1>
              <p class="marketplace-subtitle">Discover, collect, and trade unique digital assets</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filters-container">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <select v-model="selectedCategory" class="form-select filter-select">
                    <option value="">All Categories</option>
                    <option value="art">Art</option>
                    <option value="gaming">Gaming</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="music">Music</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <select v-model="selectedPrice" class="form-select filter-select">
                    <option value="">All Prices</option>
                    <option value="0-10">0-10 $PPO</option>
                    <option value="10-50">10-50 $PPO</option>
                    <option value="50-100">50-100 $PPO</option>
                    <option value="100+">100+ $PPO</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <select v-model="selectedSort" class="form-select filter-select">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <button class="btn btn-linear" @click="resetFilters">
                    <i class="fas fa-refresh me-2"></i>Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NFT Grid Section -->
    <section class="nft-grid-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="nft-grid">
              <div v-for="nft in filteredNFTs" :key="nft.id" class="nft-card">
                <div class="nft-image-container">
                  <img :src="nft.image" :alt="nft.name" class="nft-image">
                  <div class="nft-overlay">
                    <button class="btn btn-linear btn-sm" @click="viewNFT(nft)">
                      <i class="fas fa-eye me-2"></i>View Details
                    </button>
                  </div>
                </div>
                <div class="nft-info">
                  <h4 class="nft-name">{{ nft.name }}</h4>
                  <p class="nft-description">{{ nft.description }}</p>
                  <div class="nft-meta">
                    <span class="nft-category">{{ nft.category }}</span>
                    <span class="nft-price">{{ nft.price }} $PPO</span>
                  </div>
                  <div class="nft-actions">
                    <button class="btn btn-linear btn-sm" @click="buyNFT(nft)" :disabled="!canAfford(nft.price)">
                      <i class="fas fa-shopping-cart me-2"></i>Buy Now
                    </button>
                    <button class="btn btn-outline-linear btn-sm" @click="addToWishlist(nft)">
                      <i class="fas fa-heart me-2"></i>Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pagination -->
    <section class="pagination-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav aria-label="NFT pagination">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    <i class="fas fa-chevron-left"></i>
                  </a>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    <i class="fas fa-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>

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
const { currentUser, getUserData, updateUserData } = useFirebase()

// Filters
const selectedCategory = ref('')
const selectedPrice = ref('')
const selectedSort = ref('newest')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

// NFT Data
const nfts = ref([
  {
    id: 1,
    name: 'Cosmic Archer',
    description: 'A legendary archer from the cosmic realm',
    image: '/src/assets/images/nft-item1.jpg',
    category: 'gaming',
    price: 25,
    creator: 'PixelPayot',
    rarity: 'rare'
  },
  {
    id: 2,
    name: 'Digital Landscape',
    description: 'Beautiful digital art landscape',
    image: '/src/assets/images/nft-item2.jpg',
    category: 'art',
    price: 15,
    creator: 'ArtMaster',
    rarity: 'common'
  },
  {
    id: 3,
    name: 'Golden Bow',
    description: 'Rare golden bow with magical properties',
    image: '/src/assets/images/nft-item3.jpg',
    category: 'gaming',
    price: 50,
    creator: 'GameDev',
    rarity: 'epic'
  },
  {
    id: 4,
    name: 'Neon City',
    description: 'Cyberpunk cityscape at night',
    image: '/src/assets/images/nft-item4.jpg',
    category: 'art',
    price: 30,
    creator: 'CyberArtist',
    rarity: 'rare'
  },
  {
    id: 5,
    name: 'Mystic Arrow',
    description: 'Enchanted arrow with elemental powers',
    image: '/src/assets/images/nft1.jpg',
    category: 'gaming',
    price: 40,
    creator: 'MagicCraft',
    rarity: 'epic'
  },
  {
    id: 6,
    name: 'Abstract Harmony',
    description: 'Abstract art representing harmony',
    image: '/src/assets/images/nft2.jpg',
    category: 'art',
    price: 20,
    creator: 'AbstractMind',
    rarity: 'common'
  },
  {
    id: 7,
    name: 'Dragon Slayer',
    description: 'Legendary dragon slayer armor',
    image: '/src/assets/images/nft3.jpg',
    category: 'gaming',
    price: 75,
    creator: 'EpicGames',
    rarity: 'legendary'
  },
  {
    id: 8,
    name: 'Ocean Waves',
    description: 'Peaceful ocean waves at sunset',
    image: '/src/assets/images/nft4.jpg',
    category: 'art',
    price: 18,
    creator: 'NatureArt',
    rarity: 'common'
  }
])

// User data
const userData = ref({
  tokenBalance: 0,
  ownedNFTs: []
})

// Computed properties
const filteredNFTs = computed(() => {
  let filtered = [...nfts.value]
  
  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(nft => nft.category === selectedCategory.value)
  }
  
  // Price filter
  if (selectedPrice.value) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(nft => nft.price >= min && nft.price <= max)
    } else {
      filtered = filtered.filter(nft => nft.price >= min)
    }
  }
  
  // Sort
  switch (selectedSort.value) {
    case 'oldest':
      filtered.sort((a, b) => a.id - b.id)
      break
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    default:
      filtered.sort((a, b) => b.id - a.id)
  }
  
  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredNFTs.value.length / itemsPerPage)
})

// Methods
const resetFilters = () => {
  selectedCategory.value = ''
  selectedPrice.value = ''
  selectedSort.value = 'newest'
  currentPage.value = 1
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewNFT = (nft) => {
  // Navigate to NFT detail page or show modal
  console.log('Viewing NFT:', nft)
}

const canAfford = (price) => {
  return userData.value.tokenBalance >= price
}

const buyNFT = async (nft) => {
  if (!currentUser.value) {
    alert('Please connect your wallet first!')
    return
  }
  
  if (!canAfford(nft.price)) {
    alert('Insufficient $PPO balance!')
    return
  }
  
  try {
    // Update user data
    const newBalance = userData.value.tokenBalance - nft.price
    const newOwnedNFTs = [...userData.value.ownedNFTs, nft.id]
    
    await updateUserData({
      tokenBalance: newBalance,
      ownedNFTs: newOwnedNFTs
    })
    
    userData.value.tokenBalance = newBalance
    userData.value.ownedNFTs = newOwnedNFTs
    
    alert(`Successfully purchased ${nft.name}!`)
  } catch (error) {
    console.error('Purchase failed:', error)
    alert('Purchase failed. Please try again.')
  }
}

const addToWishlist = (nft) => {
  // Add to wishlist functionality
  console.log('Added to wishlist:', nft)
  alert('Added to wishlist!')
}

const loadUserData = async () => {
  if (currentUser.value) {
    const result = await getUserData()
    if (result.success) {
      userData.value = result.data
    }
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
.marketplace-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.marketplace-hero {
  background: linear-gradient(135deg, rgba(204, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 80px 0;
}

.marketplace-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.marketplace-subtitle {
  font-size: 1.3rem;
  color: #b0b0b0;
  margin-bottom: 0;
}

.filters-section {
  padding: 40px 0;
}

.filters-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
}

.filter-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
}

.filter-select:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #cc00ff;
  color: #ffffff;
  box-shadow: 0 0 0 0.2rem rgba(204, 0, 255, 0.25);
}

.nft-grid-section {
  padding: 80px 0;
}

.nft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.nft-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.nft-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
  border-color: #cc00ff;
}

.nft-image-container {
  position: relative;
  overflow: hidden;
}

.nft-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.nft-card:hover .nft-image {
  transform: scale(1.05);
}

.nft-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nft-card:hover .nft-overlay {
  opacity: 1;
}

.nft-info {
  padding: 25px;
}

.nft-name {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.nft-description {
  color: #b0b0b0;
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.nft-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nft-category {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.nft-price {
  color: #00ff88;
  font-weight: 600;
  font-size: 1.1rem;
}

.nft-actions {
  display: flex;
  gap: 10px;
}

.nft-actions .btn {
  flex: 1;
  font-size: 0.9rem;
}

.pagination-section {
  padding: 40px 0;
}

.pagination .page-link {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  margin: 0 5px;
  border-radius: 10px;
}

.pagination .page-link:hover {
  background: rgba(204, 0, 255, 0.2);
  border-color: #cc00ff;
  color: #ffffff;
}

.pagination .page-item.active .page-link {
  background: #cc00ff;
  border-color: #cc00ff;
  color: #ffffff;
}

.pagination .page-item.disabled .page-link {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #666;
}

@media (max-width: 768px) {
  .marketplace-title {
    font-size: 2.5rem;
  }
  
  .nft-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-container .row > div {
    margin-bottom: 15px;
  }
}
</style>
