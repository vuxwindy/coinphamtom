<template>
  <div class="blindbox-page">
    <Header />
    
    <!-- Blindbox Hero Section -->
    <section class="blindbox-hero padding-large">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="blindbox-content">
              <h1 class="blindbox-title">Mystery Blindbox</h1>
              <p class="blindbox-description">
                Open mysterious blindboxes to discover rare NFT items! Each box contains unique archery equipment,
                from basic bows to legendary weapons. The rarer the item, the more valuable it becomes!
              </p>
              <div class="blindbox-stats">
                <div class="stat-item">
                  <i class="fas fa-box-open"></i>
                  <span>Boxes Opened: <strong>{{ boxesOpened }}</strong></span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-star"></i>
                  <span>Rarest Item: <strong>{{ rarestItem }}</strong></span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-coins"></i>
                  <span>Total Value: <strong>{{ totalValue }} $PPO</strong></span>
                </div>
              </div>
              <div class="blindbox-controls">
                <button class="btn btn-linear btn-large" @click="openBlindbox">
                  <i class="fas fa-gift me-2"></i>Open Blindbox (10 $PPO)
                </button>
                <button class="btn btn-outline-linear btn-large" @click="showInventory">
                  <i class="fas fa-inbox me-2"></i>View Inventory
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="blindbox-display">
              <div class="box-container" :class="{ 'shaking': isShaking }">
                <div class="mystery-box">
                  <i class="fas fa-gift"></i>
                </div>
                <div class="box-glow"></div>
              </div>
              <div class="box-info">
                <h3>Mystery Box</h3>
                <p>Contains random NFT items</p>
                <div class="rarity-chances">
                  <div class="chance-item">
                    <span class="rarity-badge basic">Basic</span>
                    <span class="chance">70%</span>
                  </div>
                  <div class="chance-item">
                    <span class="rarity-badge premium">Premium</span>
                    <span class="chance">25%</span>
                  </div>
                  <div class="chance-item">
                    <span class="rarity-badge legendary">Legendary</span>
                    <span class="chance">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rarity Guide Section -->
    <section class="rarity-guide padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Rarity Guide</h2>
            <div class="rarity-grid">
              <div class="rarity-item basic">
                <div class="rarity-icon">
                  <i class="fas fa-circle"></i>
                </div>
                <h4>Basic Items</h4>
                <p>Common equipment with basic stats</p>
                <div class="rarity-stats">
                  <span>Drop Rate: 70%</span>
                  <span>Value: 1-5 $PPO</span>
                </div>
              </div>
              <div class="rarity-item premium">
                <div class="rarity-icon">
                  <i class="fas fa-star"></i>
                </div>
                <h4>Premium Items</h4>
                <p>Rare equipment with enhanced stats</p>
                <div class="rarity-stats">
                  <span>Drop Rate: 25%</span>
                  <span>Value: 10-50 $PPO</span>
                </div>
              </div>
              <div class="rarity-item legendary">
                <div class="rarity-icon">
                  <i class="fas fa-crown"></i>
                </div>
                <h4>Legendary Items</h4>
                <p>Ultra-rare equipment with maximum stats</p>
                <div class="rarity-stats">
                  <span>Drop Rate: 5%</span>
                  <span>Value: 100-1000 $PPO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Drops Section -->
    <section class="recent-drops padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Recent Drops</h2>
            <div class="drops-grid">
              <div class="drop-item" v-for="drop in recentDrops" :key="drop.id">
                <div class="drop-image">
                  <img :src="drop.image" :alt="drop.name">
                  <div class="rarity-overlay" :class="drop.rarity">
                    <span class="rarity-text">{{ drop.rarity }}</span>
                  </div>
                </div>
                <div class="drop-info">
                  <h4>{{ drop.name }}</h4>
                  <p>{{ drop.description }}</p>
                  <div class="drop-stats">
                    <span class="drop-value">{{ drop.value }} $PPO</span>
                    <span class="drop-time">{{ drop.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Inventory Preview -->
    <section class="inventory-preview padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center">
              <h2 class="section-title">Your Collection</h2>
              <p class="text-white-50">Your discovered NFT items</p>
            </div>
            <div class="inventory-grid">
              <div class="inventory-item" v-for="item in inventoryItems" :key="item.id">
                <div class="item-image">
                  <img :src="item.image" :alt="item.name">
                  <div class="rarity-badge" :class="item.rarity">{{ item.rarity }}</div>
                </div>
                <div class="item-info">
                  <h5>{{ item.name }}</h5>
                  <p>{{ item.description }}</p>
                  <div class="item-stats">
                    <span class="item-value">{{ item.value }} $PPO</span>
                    <button class="btn btn-sm btn-outline-primary">Trade</button>
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
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const boxesOpened = ref(0)
const rarestItem = ref('None')
const totalValue = ref(0)
const isShaking = ref(false)

// Recent Drops Data
const recentDrops = ref([
  {
    id: 1,
    name: 'Ancient Bow',
    description: 'A mystical bow with ancient power',
    image: '/src/assets/images/nft1.jpg',
    rarity: 'legendary',
    value: 500,
    time: '2 min ago'
  },
  {
    id: 2,
    name: 'Steel Arrow',
    description: 'Sharp and durable arrows',
    image: '/src/assets/images/nft2.jpg',
    rarity: 'premium',
    value: 25,
    time: '5 min ago'
  },
  {
    id: 3,
    name: 'Wooden Bow',
    description: 'Basic wooden bow for beginners',
    image: '/src/assets/images/nft3.jpg',
    rarity: 'basic',
    value: 3,
    time: '10 min ago'
  },
  {
    id: 4,
    name: 'Crystal Quiver',
    description: 'Magical quiver that never runs out',
    image: '/src/assets/images/nft4.jpg',
    rarity: 'legendary',
    value: 800,
    time: '15 min ago'
  }
])

// Inventory Items Data
const inventoryItems = ref([
  {
    id: 1,
    name: 'Training Bow',
    description: 'Perfect for practice',
    image: '/src/assets/images/collection-item3.jpg',
    rarity: 'basic',
    value: 2
  },
  {
    id: 2,
    name: 'Iron Arrow',
    description: 'Strong and reliable',
    image: '/src/assets/images/nft5.jpg',
    rarity: 'premium',
    value: 15
  }
])

const openBlindbox = () => {
  isShaking.value = true
  
  // Simulate opening animation
  setTimeout(() => {
    isShaking.value = false
    boxesOpened.value++
    
    // Simulate getting a random item
    const random = Math.random()
    let newItem
    
    if (random < 0.05) {
      newItem = {
        name: 'Legendary Bow',
        rarity: 'Legendary',
        value: 500
      }
    } else if (random < 0.3) {
      newItem = {
        name: 'Premium Arrow',
        rarity: 'Premium',
        value: 25
      }
    } else {
      newItem = {
        name: 'Basic Bow',
        rarity: 'Basic',
        value: 3
      }
    }
    
    totalValue.value += newItem.value
    if (newItem.rarity === 'Legendary') {
      rarestItem.value = newItem.name
    }
    
    alert(`Congratulations! You got a ${newItem.rarity} ${newItem.name} worth ${newItem.value} $PPO!`)
  }, 2000)
}

const showInventory = () => {
  // Scroll to inventory section
  document.querySelector('.inventory-preview').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.blindbox-page {
  background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #6600cc 100%);
  min-height: 100vh;
  padding-top: 80px;
}

.blindbox-hero {
  padding: 100px 0;
}

.blindbox-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.blindbox-description {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.blindbox-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
}

.stat-item i {
  color: #cc00ff;
  font-size: 1.2rem;
}

.blindbox-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.blindbox-display {
  text-align: center;
}

.box-container {
  position: relative;
  margin-bottom: 30px;
}

.mystery-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 4rem;
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(204, 0, 255, 0.3);
  transition: all 0.3s ease;
}

.box-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 30px;
  opacity: 0.3;
  filter: blur(20px);
  z-index: -1;
}

.shaking {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.box-info h3 {
  color: #ffffff;
  margin-bottom: 10px;
}

.box-info p {
  color: #b0b0b0;
  margin-bottom: 20px;
}

.rarity-chances {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.chance-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rarity-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rarity-badge.basic {
  background: #6c757d;
  color: #ffffff;
}

.rarity-badge.premium {
  background: #007bff;
  color: #ffffff;
}

.rarity-badge.legendary {
  background: #ffc107;
  color: #000000;
}

.chance {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.rarity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.rarity-item {
  text-align: center;
  padding: 40px 30px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.rarity-item:hover {
  transform: translateY(-10px);
}

.rarity-item.basic {
  background: rgba(108, 117, 125, 0.2);
  border: 2px solid #6c757d;
}

.rarity-item.premium {
  background: rgba(0, 123, 255, 0.2);
  border: 2px solid #007bff;
}

.rarity-item.legendary {
  background: rgba(255, 193, 7, 0.2);
  border: 2px solid #ffc107;
}

.rarity-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
}

.rarity-item.basic .rarity-icon {
  background: #6c757d;
  color: #ffffff;
}

.rarity-item.premium .rarity-icon {
  background: #007bff;
  color: #ffffff;
}

.rarity-item.legendary .rarity-icon {
  background: #ffc107;
  color: #000000;
}

.rarity-item h4 {
  color: #ffffff;
  margin-bottom: 15px;
}

.rarity-item p {
  color: #b0b0b0;
  margin-bottom: 20px;
}

.rarity-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rarity-stats span {
  color: #ffffff;
  font-size: 0.9rem;
}

.drops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.drop-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.drop-item:hover {
  transform: translateY(-5px);
}

.drop-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.drop-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rarity-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rarity-overlay.basic {
  background: #6c757d;
  color: #ffffff;
}

.rarity-overlay.premium {
  background: #007bff;
  color: #ffffff;
}

.rarity-overlay.legendary {
  background: #ffc107;
  color: #000000;
}

.drop-info {
  padding: 20px;
}

.drop-info h4 {
  color: #ffffff;
  margin-bottom: 10px;
}

.drop-info p {
  color: #b0b0b0;
  margin-bottom: 15px;
}

.drop-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drop-value {
  color: #cc00ff;
  font-weight: 600;
}

.drop-time {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.inventory-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.item-image {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  padding: 15px;
}

.item-info h5 {
  color: #ffffff;
  margin-bottom: 10px;
}

.item-info p {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.item-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-value {
  color: #cc00ff;
  font-weight: 600;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .blindbox-title {
    font-size: 2.5rem;
  }
  
  .blindbox-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .blindbox-controls {
    flex-direction: column;
  }
  
  .rarity-chances {
    flex-direction: column;
    align-items: center;
  }
  
  .rarity-grid {
    grid-template-columns: 1fr;
  }
  
  .drops-grid {
    grid-template-columns: 1fr;
  }
  
  .inventory-grid {
    grid-template-columns: 1fr;
  }
}
</style>
