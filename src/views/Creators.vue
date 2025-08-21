<template>
  <div class="creators-page">
    <Header />
    
    <!-- Creators Hero Section -->
    <section class="creators-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="creators-header text-center">
              <h1 class="creators-title">NFT Creators</h1>
              <p class="creators-subtitle">Discover amazing artists and creators in the PixelPayot ecosystem</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Creators -->
    <section class="featured-creators padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Featured Creators</h2>
            <div class="creators-grid">
              <div v-for="creator in featuredCreators" :key="creator.id" class="creator-card featured">
                <div class="creator-banner">
                  <img :src="creator.banner" :alt="creator.name" class="banner-image">
                  <div class="creator-avatar">
                    <img :src="creator.avatar" :alt="creator.name" class="avatar-image">
                  </div>
                </div>
                <div class="creator-info">
                  <h3 class="creator-name">{{ creator.name }}</h3>
                  <p class="creator-bio">{{ creator.bio }}</p>
                  <div class="creator-stats">
                    <div class="stat-item">
                      <span class="stat-value">{{ creator.totalSales }}</span>
                      <span class="stat-label">Total Sales</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-value">{{ creator.nftCount }}</span>
                      <span class="stat-label">NFTs Created</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-value">{{ creator.followers }}</span>
                      <span class="stat-label">Followers</span>
                    </div>
                  </div>
                  <div class="creator-actions">
                    <button class="btn btn-linear" @click="viewCreator(creator.id)">
                      <i class="fas fa-eye me-2"></i>View Profile
                    </button>
                    <button class="btn btn-outline-linear" @click="followCreator(creator.id)">
                      <i class="fas fa-heart me-2"></i>Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Creators -->
    <section class="all-creators padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="creators-header-section">
              <h2 class="section-title">All Creators</h2>
              <div class="filters">
                <select v-model="selectedCategory" class="form-select">
                  <option value="">All Categories</option>
                  <option value="art">Art</option>
                  <option value="gaming">Gaming</option>
                  <option value="music">Music</option>
                  <option value="photography">Photography</option>
                </select>
                <select v-model="selectedSort" class="form-select">
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Active</option>
                  <option value="sales">Highest Sales</option>
                  <option value="followers">Most Followers</option>
                </select>
              </div>
            </div>
            
            <div class="creators-list">
              <div v-for="creator in filteredCreators" :key="creator.id" class="creator-item">
                <div class="creator-avatar">
                  <img :src="creator.avatar" :alt="creator.name" class="avatar-image">
                </div>
                <div class="creator-details">
                  <h4 class="creator-name">{{ creator.name }}</h4>
                  <p class="creator-category">{{ creator.category }}</p>
                  <p class="creator-bio">{{ creator.bio }}</p>
                  <div class="creator-metrics">
                    <span class="metric">
                      <i class="fas fa-coins"></i>
                      {{ creator.totalSales }} sales
                    </span>
                    <span class="metric">
                      <i class="fas fa-images"></i>
                      {{ creator.nftCount }} NFTs
                    </span>
                    <span class="metric">
                      <i class="fas fa-users"></i>
                      {{ creator.followers }} followers
                    </span>
                  </div>
                </div>
                <div class="creator-actions">
                  <button class="btn btn-linear btn-sm" @click="viewCreator(creator.id)">
                    View Profile
                  </button>
                  <button class="btn btn-outline-linear btn-sm" @click="followCreator(creator.id)">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Creator Spotlight -->
    <section class="creator-spotlight padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Creator Spotlight</h2>
            <div class="spotlight-content">
              <div class="spotlight-creator">
                <div class="spotlight-image">
                  <img :src="spotlightCreator.spotlightImage" :alt="spotlightCreator.name" class="spotlight-img">
                </div>
                <div class="spotlight-info">
                  <h3 class="spotlight-name">{{ spotlightCreator.name }}</h3>
                  <p class="spotlight-description">{{ spotlightCreator.description }}</p>
                  <div class="spotlight-stats">
                    <div class="stat">
                      <span class="stat-number">{{ spotlightCreator.totalValue }}</span>
                      <span class="stat-text">Total Value Sold</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ spotlightCreator.avgPrice }}</span>
                      <span class="stat-text">Average Price</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ spotlightCreator.rarity }}</span>
                      <span class="stat-text">Rarity Score</span>
                    </div>
                  </div>
                  <div class="spotlight-actions">
                    <button class="btn btn-linear btn-large" @click="viewCreator(spotlightCreator.id)">
                      <i class="fas fa-eye me-2"></i>View Collection
                    </button>
                    <button class="btn btn-outline-linear btn-large" @click="followCreator(spotlightCreator.id)">
                      <i class="fas fa-heart me-2"></i>Follow Creator
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Become a Creator -->
    <section class="become-creator padding-large bg-dark">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="become-creator-content text-center">
              <h2 class="section-title">Become a Creator</h2>
              <p class="section-subtitle">Start creating and selling your NFTs on PixelPayot</p>
              <div class="creator-benefits">
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <i class="fas fa-palette"></i>
                  </div>
                  <h4>Create & Mint</h4>
                  <p>Upload your artwork and mint it as an NFT</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <i class="fas fa-store"></i>
                  </div>
                  <h4>Sell & Earn</h4>
                  <p>List your NFTs and earn from sales</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <h4>Grow Your Brand</h4>
                  <p>Build your audience and increase your value</p>
                </div>
              </div>
              <button class="btn btn-linear btn-large" @click="becomeCreator">
                <i class="fas fa-plus me-2"></i>Start Creating
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

// State
const selectedCategory = ref('')
const selectedSort = ref('popular')

// Featured creators data
const featuredCreators = ref([
  {
    id: 1,
    name: 'CryptoArtist',
    bio: 'Digital artist specializing in futuristic landscapes and abstract art',
    avatar: '/src/assets/images/creator1.jpg',
    banner: '/src/assets/images/creator-banner1.jpg',
    category: 'Art',
    totalSales: 150,
    nftCount: 45,
    followers: 2500
  },
  {
    id: 2,
    name: 'GameDevPro',
    bio: 'Gaming NFT creator with unique character designs and game assets',
    avatar: '/src/assets/images/creator2.jpg',
    banner: '/src/assets/images/creator-banner2.jpg',
    category: 'Gaming',
    totalSales: 89,
    nftCount: 32,
    followers: 1800
  },
  {
    id: 3,
    name: 'MusicNFT',
    bio: 'Musician creating unique audio-visual experiences as NFTs',
    avatar: '/src/assets/images/creator3.jpg',
    banner: '/src/assets/images/creator-banner3.jpg',
    category: 'Music',
    totalSales: 67,
    nftCount: 28,
    followers: 1200
  }
])

// All creators data
const allCreators = ref([
  {
    id: 4,
    name: 'PhotoMaster',
    bio: 'Professional photographer capturing stunning moments',
    avatar: '/src/assets/images/creator4.jpg',
    category: 'Photography',
    totalSales: 45,
    nftCount: 15,
    followers: 800
  },
  {
    id: 5,
    name: 'DigitalDreamer',
    bio: 'Creating dreamlike digital art with AI assistance',
    avatar: '/src/assets/images/creator5.jpg',
    category: 'Art',
    totalSales: 78,
    nftCount: 23,
    followers: 950
  },
  {
    id: 6,
    name: 'PixelPioneer',
    bio: 'Pixel art specialist with retro gaming aesthetics',
    avatar: '/src/assets/images/creator6.jpg',
    category: 'Gaming',
    totalSales: 34,
    nftCount: 12,
    followers: 650
  },
  {
    id: 7,
    name: 'SoundScape',
    bio: 'Ambient music creator with visual accompaniments',
    avatar: '/src/assets/images/creator7.jpg',
    category: 'Music',
    totalSales: 56,
    nftCount: 18,
    followers: 720
  },
  {
    id: 8,
    name: 'AbstractMind',
    bio: 'Abstract artist exploring consciousness through digital art',
    avatar: '/src/assets/images/creator8.jpg',
    category: 'Art',
    totalSales: 92,
    nftCount: 31,
    followers: 1100
  }
])

// Spotlight creator
const spotlightCreator = ref({
  id: 1,
  name: 'CryptoArtist',
  description: 'Leading digital artist in the NFT space, known for creating stunning futuristic landscapes that blend technology and nature. Each piece tells a unique story and has been highly sought after by collectors worldwide.',
  spotlightImage: '/src/assets/images/spotlight-artwork.jpg',
  totalValue: '2.5M PPO',
  avgPrice: '55K PPO',
  rarity: '9.8/10'
})

// Computed
const filteredCreators = computed(() => {
  let filtered = allCreators.value

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(creator => creator.category.toLowerCase() === selectedCategory.value.toLowerCase())
  }

  // Sort by selected criteria
  switch (selectedSort.value) {
    case 'popular':
      filtered.sort((a, b) => b.followers - a.followers)
      break
    case 'recent':
      // Mock recent sorting - in real app would use actual timestamps
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'sales':
      filtered.sort((a, b) => b.totalSales - a.totalSales)
      break
    case 'followers':
      filtered.sort((a, b) => b.followers - a.followers)
      break
  }

  return filtered
})

// Methods
const viewCreator = (creatorId) => {
  router.push(`/creator/${creatorId}`)
}

const followCreator = (creatorId) => {
  // Mock follow functionality
  console.log(`Following creator ${creatorId}`)
  // In real app, this would update the database
}

const becomeCreator = () => {
  router.push('/creator/apply')
}
</script>

<style scoped>
.creators-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.creators-hero {
  padding-top: 120px;
  padding-bottom: 80px;
}

.creators-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.creators-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.creators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.creator-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.creator-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.creator-banner {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-avatar {
  position: absolute;
  bottom: -30px;
  left: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  background: white;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creator-info {
  padding: 40px 20px 20px;
  color: white;
}

.creator-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.creator-bio {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.6;
}

.creator-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #cc00ff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.creator-actions {
  display: flex;
  gap: 10px;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  transform: translateY(-2px);
}

.btn-outline-linear {
  background: transparent;
  border: 2px solid #cc00ff;
  color: #cc00ff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1;
}

.btn-outline-linear:hover {
  background: #cc00ff;
  color: white;
}

.all-creators {
  background: rgba(0, 0, 0, 0.3);
}

.creators-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.filters {
  display: flex;
  gap: 15px;
}

.form-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  min-width: 150px;
}

.form-select option {
  background: #333;
  color: white;
}

.creators-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.creator-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  color: white;
  transition: all 0.3s ease;
}

.creator-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.creator-item .creator-avatar {
  position: static;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.creator-details {
  flex: 1;
}

.creator-item .creator-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.creator-category {
  color: #cc00ff;
  font-weight: 600;
  margin-bottom: 8px;
}

.creator-metrics {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.creator-item .creator-actions {
  display: flex;
  gap: 10px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.creator-spotlight {
  background: rgba(255, 255, 255, 0.05);
}

.spotlight-content {
  max-width: 1000px;
  margin: 0 auto;
}

.spotlight-creator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.spotlight-image {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.spotlight-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.spotlight-info {
  color: white;
}

.spotlight-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.spotlight-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.spotlight-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #cc00ff;
}

.stat-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.spotlight-actions {
  display: flex;
  gap: 15px;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.become-creator {
  background: rgba(0, 0, 0, 0.4);
}

.become-creator-content {
  color: white;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.creator-benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.benefit-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
}

.benefit-item h4 {
  margin-bottom: 15px;
  font-weight: 600;
}

.benefit-item p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .creators-title {
    font-size: 2.5rem;
  }
  
  .creators-grid {
    grid-template-columns: 1fr;
  }
  
  .creators-header-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .creator-item {
    flex-direction: column;
    text-align: center;
  }
  
  .spotlight-creator {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .spotlight-name {
    font-size: 2rem;
  }
  
  .creator-benefits {
    grid-template-columns: 1fr;
  }
}
</style>
