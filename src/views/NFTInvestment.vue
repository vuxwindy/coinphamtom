<template>
  <div class="nft-investment-page">
    <Header />
    
    <!-- NFT Investment Hero Section -->
    <section class="nft-investment-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="nft-investment-header text-center">
              <h1 class="nft-investment-title">NFT Investment</h1>
              <p class="nft-investment-subtitle">Invest in rare and valuable NFTs with high growth potential</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Investment Overview -->
    <section class="investment-overview padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-images"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalNFTs }}</h3>
                <p class="stat-label">Total NFTs</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalValue }}</h3>
                <p class="stat-label">Portfolio Value</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.growth }}%</h3>
                <p class="stat-label">Growth Rate</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.rarityScore }}</h3>
                <p class="stat-label">Avg Rarity Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NFT Collections -->
    <section class="nft-collections padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Featured Collections</h2>
            <div class="collections-grid">
              <div v-for="collection in nftCollections" :key="collection.id" class="collection-card">
                <div class="collection-image">
                  <img :src="collection.image" :alt="collection.name" class="collection-img">
                  <div class="collection-overlay">
                    <button class="btn btn-linear" @click="viewCollection(collection.id)">
                      <i class="fas fa-eye me-2"></i>View Collection
                    </button>
                  </div>
                </div>
                <div class="collection-info">
                  <h3 class="collection-name">{{ collection.name }}</h3>
                  <p class="collection-description">{{ collection.description }}</p>
                  <div class="collection-stats">
                    <div class="stat-item">
                      <span class="stat-label">Floor Price</span>
                      <span class="stat-value">{{ collection.floorPrice }} PPO</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Total Supply</span>
                      <span class="stat-value">{{ collection.totalSupply }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">Owned</span>
                      <span class="stat-value">{{ collection.owned }}</span>
                    </div>
                  </div>
                  <div class="collection-actions">
                    <button class="btn btn-linear btn-sm" @click="buyNFT(collection.id)">
                      <i class="fas fa-shopping-cart me-2"></i>Buy NFT
                    </button>
                    <button class="btn btn-outline-linear btn-sm" @click="viewCollection(collection.id)">
                      <i class="fas fa-info-circle me-2"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My NFT Portfolio -->
    <section class="my-portfolio padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">My NFT Portfolio</h2>
            <div v-if="myNFTs.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="fas fa-images"></i>
              </div>
              <h3>No NFTs Owned</h3>
              <p>Start building your NFT portfolio by investing in rare digital assets</p>
              <button class="btn btn-linear" @click="scrollToCollections">
                <i class="fas fa-arrow-down me-2"></i>View Collections
              </button>
            </div>
            
            <div v-else class="nft-grid">
              <div v-for="nft in myNFTs" :key="nft.id" class="nft-card">
                <div class="nft-image">
                  <img :src="nft.image" :alt="nft.name" class="nft-img">
                  <div class="nft-overlay">
                    <button class="btn btn-linear btn-sm" @click="viewNFT(nft.id)">
                      <i class="fas fa-eye me-2"></i>View Details
                    </button>
                  </div>
                </div>
                <div class="nft-info">
                  <h4 class="nft-name">{{ nft.name }}</h4>
                  <p class="nft-collection">{{ nft.collection }}</p>
                  <div class="nft-stats">
                    <div class="stat-row">
                      <span class="stat-label">Purchase Price</span>
                      <span class="stat-value">{{ nft.purchasePrice }} PPO</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Current Value</span>
                      <span class="stat-value" :class="nft.valueChange >= 0 ? 'positive' : 'negative'">
                        {{ nft.currentValue }} PPO
                      </span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Rarity Score</span>
                      <span class="stat-value">{{ nft.rarityScore }}/100</span>
                    </div>
                  </div>
                  <div class="nft-actions">
                    <button class="btn btn-linear btn-sm" @click="sellNFT(nft.id)">
                      <i class="fas fa-tag me-2"></i>Sell
                    </button>
                    <button class="btn btn-outline-linear btn-sm" @click="viewNFT(nft.id)">
                      <i class="fas fa-chart-line me-2"></i>Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NFT Analytics -->
    <section class="nft-analytics padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Portfolio Analytics</h2>
            <div class="analytics-grid">
              <div class="analytics-card">
                <h4>Portfolio Performance</h4>
                <div class="performance-chart">
                  <div class="chart-bar" style="height: 60%">
                    <span class="chart-label">Jan</span>
                  </div>
                  <div class="chart-bar" style="height: 75%">
                    <span class="chart-label">Feb</span>
                  </div>
                  <div class="chart-bar" style="height: 90%">
                    <span class="chart-label">Mar</span>
                  </div>
                  <div class="chart-bar" style="height: 85%">
                    <span class="chart-label">Apr</span>
                  </div>
                  <div class="chart-bar" style="height: 100%">
                    <span class="chart-label">May</span>
                  </div>
                </div>
              </div>
              
              <div class="analytics-card">
                <h4>Top Performing NFTs</h4>
                <div class="top-nfts">
                  <div v-for="nft in topPerformingNFTs" :key="nft.id" class="top-nft-item">
                    <img :src="nft.image" :alt="nft.name" class="top-nft-img">
                    <div class="top-nft-info">
                      <h5>{{ nft.name }}</h5>
                      <span class="growth" :class="nft.growth >= 0 ? 'positive' : 'negative'">
                        {{ nft.growth >= 0 ? '+' : '' }}{{ nft.growth }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="analytics-card">
                <h4>Collection Distribution</h4>
                <div class="distribution-chart">
                  <div class="pie-chart">
                    <div class="pie-segment" style="--percentage: 40%; --color: #cc00ff;">
                      <span class="segment-label">Gaming NFTs</span>
                    </div>
                    <div class="pie-segment" style="--percentage: 30%; --color: #d739ff;">
                      <span class="segment-label">Art NFTs</span>
                    </div>
                    <div class="pie-segment" style="--percentage: 20%; --color: #ff6b6b;">
                      <span class="segment-label">Music NFTs</span>
                    </div>
                    <div class="pie-segment" style="--percentage: 10%; --color: #51cf66;">
                      <span class="segment-label">Other</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

// Investment stats
const investmentStats = ref({
  totalNFTs: 15,
  totalValue: '45,250',
  growth: 23.5,
  rarityScore: 8.7
})

// NFT Collections
const nftCollections = ref([
  {
    id: 1,
    name: 'Pixel Warriors',
    description: 'Unique pixel art warriors with different traits and abilities',
    image: '/src/assets/images/collection1.jpg',
    floorPrice: 150,
    totalSupply: 10000,
    owned: 3
  },
  {
    id: 2,
    name: 'Crypto Dragons',
    description: 'Rare dragon NFTs with elemental powers',
    image: '/src/assets/images/collection2.jpg',
    floorPrice: 500,
    totalSupply: 5000,
    owned: 1
  },
  {
    id: 3,
    name: 'Digital Real Estate',
    description: 'Virtual land parcels in the metaverse',
    image: '/src/assets/images/collection3.jpg',
    floorPrice: 1000,
    totalSupply: 1000,
    owned: 0
  }
])

// My NFTs
const myNFTs = ref([
  {
    id: 1,
    name: 'Pixel Warrior #1234',
    collection: 'Pixel Warriors',
    image: '/src/assets/images/nft1.jpg',
    purchasePrice: 150,
    currentValue: 180,
    valueChange: 20,
    rarityScore: 85
  },
  {
    id: 2,
    name: 'Crypto Dragon #567',
    collection: 'Crypto Dragons',
    image: '/src/assets/images/nft2.jpg',
    purchasePrice: 500,
    currentValue: 650,
    valueChange: 30,
    rarityScore: 92
  }
])

// Top performing NFTs
const topPerformingNFTs = ref([
  {
    id: 1,
    name: 'Pixel Warrior #1234',
    image: '/src/assets/images/nft1.jpg',
    growth: 20
  },
  {
    id: 2,
    name: 'Crypto Dragon #567',
    image: '/src/assets/images/nft2.jpg',
    growth: 30
  }
])

// Methods
const viewCollection = (collectionId) => {
  router.push(`/nft-investment/collection/${collectionId}`)
}

const buyNFT = (collectionId) => {
  router.push(`/nft-investment/buy/${collectionId}`)
}

const viewNFT = (nftId) => {
  router.push(`/nft-investment/nft/${nftId}`)
}

const sellNFT = (nftId) => {
  router.push(`/nft-investment/sell/${nftId}`)
}

const scrollToCollections = () => {
  const collectionsSection = document.querySelector('.nft-collections')
  if (collectionsSection) {
    collectionsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.nft-investment-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.nft-investment-hero {
  padding-top: 120px;
  padding-bottom: 80px;
}

.nft-investment-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.nft-investment-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: white;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #cc00ff;
  margin-bottom: 10px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.nft-collections {
  background: rgba(0, 0, 0, 0.3);
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.collection-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.collection-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.15);
}

.collection-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.collection-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection-overlay {
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

.collection-card:hover .collection-overlay {
  opacity: 1;
}

.collection-info {
  padding: 25px;
  color: white;
}

.collection-name {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.collection-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  line-height: 1.6;
}

.collection-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .stat-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.stat-item .stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #cc00ff;
}

.collection-actions {
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

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.empty-icon {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 3rem;
  color: #cc00ff;
}

.empty-state h3 {
  margin-bottom: 15px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
}

.nft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.nft-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.nft-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.nft-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.nft-img {
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
  padding: 20px;
  color: white;
}

.nft-name {
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.nft-collection {
  color: #cc00ff;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.nft-stats {
  margin-bottom: 15px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.stat-row .stat-label {
  color: rgba(255, 255, 255, 0.7);
}

.stat-row .stat-value {
  font-weight: 600;
}

.stat-value.positive {
  color: #51cf66;
}

.stat-value.negative {
  color: #ff6b6b;
}

.nft-actions {
  display: flex;
  gap: 10px;
}

.nft-analytics {
  background: rgba(0, 0, 0, 0.3);
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.analytics-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  color: white;
}

.analytics-card h4 {
  margin-bottom: 20px;
  text-align: center;
}

.performance-chart {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 200px;
  gap: 10px;
}

.chart-bar {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 5px 5px 0 0;
  min-width: 40px;
  position: relative;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  transform: scale(1.1);
}

.chart-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.top-nfts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.top-nft-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.top-nft-img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.top-nft-info h5 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
}

.growth {
  font-weight: 600;
  font-size: 0.8rem;
}

.growth.positive {
  color: #51cf66;
}

.growth.negative {
  color: #ff6b6b;
}

.distribution-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.pie-chart {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    #cc00ff 0deg 144deg,
    #d739ff 144deg 252deg,
    #ff6b6b 252deg 324deg,
    #51cf66 324deg 360deg
  );
}

.pie-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.segment-label {
  position: absolute;
  font-size: 0.7rem;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .nft-investment-title {
    font-size: 2.5rem;
  }
  
  .collections-grid {
    grid-template-columns: 1fr;
  }
  
  .nft-grid {
    grid-template-columns: 1fr;
  }
  
  .analytics-grid {
    grid-template-columns: 1fr;
  }
  
  .performance-chart {
    height: 150px;
  }
  
  .chart-bar {
    min-width: 30px;
  }
}
</style>
