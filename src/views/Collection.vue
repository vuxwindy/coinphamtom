<template>
  <div class="collection-page">
    <Header />

    <!-- Collection Hero Section -->
    <section id="collection-hero" class="padding-large overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="collection-hero-content">
              <!-- Collection Banner -->
              <div class="collection-banner position-relative mb-4">
                <img src="/src/assets/images/banner-lg1.jpg" alt="Collection Banner" class="w-100 rounded" style="height: 300px; object-fit: cover;">
                <div class="collection-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" 
                     style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                  <div class="container">
                    <div class="row align-items-end">
                      <div class="col-md-8">
                        <h1 class="text-white mb-2" id="collectionName">Ancient Bows Collection</h1>
                        <p class="text-white-50 mb-3" id="collectionDescription">
                          Legendary bows from ancient civilizations with mystical powers and unique enchantments
                        </p>
                        <div class="d-flex align-items-center mb-3">
                          <img src="/src/assets/images/clients-item2.jpg" alt="Creator" class="rounded-circle me-3" style="width: 50px; height: 50px;">
                          <div>
                            <h6 class="text-white mb-0" id="creatorName">Mutin Cap</h6>
                            <small class="text-white-50">Creator</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 text-end">
                        <button class="btn btn-primary me-2 card-gradient" id="followBtn">
                          <i class="fas fa-plus me-2"></i>Follow
                        </button>
                        <button class="btn btn-outline-light">
                          <i class="fas fa-share me-2"></i>Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection Stats Section -->
    <section id="collection-stats" class="padding-large pt-0">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card-gradient stats-card border border-primary rounded p-4">
              <div class="row text-center">
                <div class="col-md-3 mb-3 mb-md-0">
                  <h3 class="text-primary" id="totalItems">12</h3>
                  <small class="text-white-50">Items</small>
                </div>
                <div class="col-md-3 mb-3 mb-md-0">
                  <h3 class="text-success" id="floorPrice">2.5 PPO</h3>
                  <small class="text-white-50">Floor Price</small>
                </div>
                <div class="col-md-3 mb-3 mb-md-0">
                  <h3 class="text-warning" id="totalVolume">45.6 PPO</h3>
                  <small class="text-white-50">Total Volume</small>
                </div>
                <div class="col-md-3">
                  <h3 class="text-info" id="owners">8</h3>
                  <small class="text-white-50">Owners</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section id="filter-section" class="padding-large pt-0">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter-card card-gradient border border-primary rounded p-4">
              <div class="row align-items-center">
                <!-- Rarity Filter -->
                <div class="col-md-3 mb-3 mb-md-0">
                  <label class="text-white mb-2">Rarity</label>
                  <select class="form-select" id="rarityFilter">
                    <option value="">All Rarities</option>
                    <option value="basic">Basic (1-3★)</option>
                    <option value="premium">Premium (4-5★)</option>
                    <option value="mega">Mega (SSS)</option>
                  </select>
                </div>

                <!-- Price Range -->
                <div class="col-md-3 mb-3 mb-md-0">
                  <label class="text-white mb-2">Price Range (PPO)</label>
                  <div class="d-flex">
                    <input type="number" class="form-control me-2" id="minPrice" placeholder="Min" step="0.01">
                    <input type="number" class="form-control" id="maxPrice" placeholder="Max" step="0.01">
                  </div>
                </div>

                <!-- Sort By -->
                <div class="col-md-3 mb-3 mb-md-0">
                  <label class="text-white mb-2">Sort By</label>
                  <select class="form-select" id="sortBy">
                    <option value="recent">Recently Listed</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rarity">Rarity</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                <!-- Search -->
                <div class="col-md-3">
                  <label class="text-white mb-2">Search Items</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="searchInput" placeholder="Search by name...">
                    <button class="btn btn-primary btn-clear btn-search" type="button" id="searchBtn">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Filter Buttons -->
              <div class="row mt-3">
                <div class="col-12 d-flex justify-content-between">
                  <button class="btn btn-outline-primary btn-clear" id="clearFilters">
                    <i class="fas fa-times me-2"></i>Clear Filters
                  </button>
                  <button class="btn btn-primary btn-clear" id="applyFilters">
                    <i class="fas fa-filter me-2"></i>Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Items Grid Section -->
    <section id="items-grid" class="padding-large pt-0">
      <div class="container">
        <!-- Loading State -->
        <div id="loadingState" class="text-center d-none">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-white mt-3">Loading Items...</p>
        </div>

        <!-- Items Grid -->
        <div id="itemsGrid" class="row">
          <!-- Collection items will be dynamically loaded here -->
        </div>

        <!-- Pagination -->
        <div class="row mt-5">
          <div class="col-12">
            <nav aria-label="Items pagination">
              <ul class="pagination justify-content-center" id="pagination">
                <!-- Pagination will be dynamically generated -->
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection History Section -->
    <section id="collection-history" class="padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="section-title light">Collection History</h2>
            <p class="text-white-50">Recent sales and activity for this collection</p>
          </div>
        </div>
        
        <div class="row">
          <!-- Price History Chart -->
          <div class="col-lg-8 mb-4">
            <div class="stats-card bg-dark border border-primary rounded p-4">
              <h4 class="text-white mb-4">
                <i class="fas fa-chart-line me-2"></i>Price History
              </h4>
              <div class="chart-container" style="height: 300px;">
                <canvas id="priceChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Recent Sales -->
          <div class="col-lg-4 mb-4">
            <div class="stats-card bg-dark border border-primary rounded p-4">
              <h4 class="text-white mb-4">
                <i class="fas fa-history me-2"></i>Recent Sales
              </h4>
              <div id="recentSales">
                <!-- Recent sales will be dynamically loaded here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Collection',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      // Component data
    }
  },
  methods: {
    connectWallet() {
      // Wallet connection logic
      console.log('Connecting wallet...')
    }
  }
}
</script>

<style scoped>
.collection-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

.filter-card {
  background: linear-gradient(45deg, #4f0270, #2b0246) !important;
  backdrop-filter: blur(10px);
}

.stats-card {
  background: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(10px);
  border: 1px solid #d739ff !important;
}

.navbar-toggler {
  background: #750085 !important;
}

.collection-item-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.collection-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border-color: #cc00ff;
}

.item-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.collection-item-card:hover .item-image {
  transform: scale(1.05);
}

.item-info {
  padding: 20px;
}

.item-name {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 10px;
}

.item-price {
  color: #cc00ff;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 15px;
}

.rarity-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-buy {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  flex: 1;
}

.btn-bid {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #ffffff;
  color: white;
  flex: 1;
}

.recent-sale-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.recent-sale-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.recent-sale-item:last-child {
  border-bottom: none;
}

.sale-item-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 15px;
}

.sale-item-info {
  flex: 1;
}

.sale-item-name {
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 5px;
}

.sale-item-price {
  color: #cc00ff;
  font-weight: 600;
  font-size: 16px;
}

.sale-item-time {
  color: #cccccc;
  font-size: 12px;
}

.pagination .page-link {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.pagination .page-link:hover {
  background: #cc00ff;
  border-color: #cc00ff;
}

.pagination .page-item.active .page-link {
  background: #cc00ff;
  border-color: #cc00ff;
}

.connect-wallet-btn.connected {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  border-color: #27ae60;
}

.card-gradient {
  background: linear-gradient(45deg, #4f0270, #2b0246) !important;
  border-color: #d739ff !important;
}

.btn-clear {
  background: linear-gradient(45deg, #611f7e, #750085) !important;
  border-color: #d739ff !important;
  color: #ea95ff !important;
}

.btn-search {
  height: 50px !important;
}
</style>
