<template>
  <div class="game-page">
    <Header />

    <!-- Hero Section -->
    <section class="hero-section padding-large">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="text-white display-4 fw-bold mb-4">Game Center</h1>
            <p class="text-white-50 lead mb-4">Play exciting games, earn PPO tokens, and use your NFT cards to boost your performance!</p>
            
            <!-- User Stats Display -->
            <div class="user-stats bg-dark border border-info rounded p-4 mb-4" id="userStatsContainer">
              <div class="row text-center">
                <div class="col-3">
                  <div class="stat-number text-info" id="ppoBalance">0</div>
                  <div class="stat-label text-white-50">PPO Balance</div>
                </div>
                <div class="col-3">
                  <div class="stat-number text-success" id="totalGames">0</div>
                  <div class="stat-label text-white-50">Games Played</div>
                </div>
                <div class="col-3">
                  <div class="stat-number text-warning" id="bestScore">0</div>
                  <div class="stat-label text-white-50">Best Score</div>
                </div>
                <div class="col-3">
                  <div class="stat-number text-primary" id="nftCardsCount">0</div>
                  <div class="stat-label text-white-50">NFT Cards</div>
                </div>
              </div>
            </div>
            
            <!-- NFT Cards Preview -->
            <div class="nft-cards-preview bg-dark border border-success rounded p-4">
              <h5 class="text-white mb-3">
                <i class="fas fa-cards-blank me-2"></i>Your NFT Cards
                <button class="btn btn-sm btn-outline-success float-end" @click="showCardSelection">
                  <i class="fas fa-plus"></i> Select Card
                </button>
              </h5>
              <div class="row" id="nftCardsContainer">
                <!-- NFT cards will be loaded here -->
              </div>
            </div>
          </div>
          
          <div class="col-lg-6">
            <div class="game-features bg-dark border border-primary rounded p-4">
              <h4 class="text-white mb-4">
                <i class="fas fa-star me-2"></i>Game Features
              </h4>
              <ul class="text-white-50">
                <li class="mb-2">
                  <i class="fas fa-coins text-warning me-2"></i>
                  Earn 1 PPO token per game point
                </li>
                <li class="mb-2">
                  <i class="fas fa-cards-blank text-success me-2"></i>
                  Use NFT cards to boost performance
                </li>
                <li class="mb-2">
                  <i class="fas fa-trophy text-warning me-2"></i>
                  Compete for high scores and rewards
                </li>
                <li class="mb-2">
                  <i class="fas fa-chart-line text-info me-2"></i>
                  Track your progress and statistics
                </li>
                <li class="mb-2">
                  <i class="fas fa-gift text-danger me-2"></i>
                  Daily rewards and special events
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Games Section -->
    <section class="games-section padding-large">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12">
            <h2 class="text-white mb-4">
              <i class="fas fa-gamepad me-2"></i>Available Games
            </h2>
          </div>
        </div>

        <div class="row">
          <!-- Arrow Game Classic -->
          <div class="col-lg-6 col-md-12 mb-4">
            <div class="game-card bg-dark border border-primary rounded overflow-hidden h-100">
              <div class="game-image position-relative">
                <img src="/src/assets/images/arrow-game-preview.png" alt="Arrow Game Classic" class="w-100" style="height: 250px; object-fit: cover;">
                <div class="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <h3 class="text-black mb-3">Arrow Game Classic</h3>
                    <h4 class="text-black mb-4 card-game">Classic archery challenge with NFT card integration</h4>
                    <a href="/arrow-game" class="btn btn-primary btn-lg">
                      <i class="fas fa-play me-2"></i>Play Now
                    </a>
                  </div>
                </div>
              </div>
              <div class="game-info p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="text-white mb-0">Arrow Game Classic</h5>
                  <span class="badge bg-primary">Active</span>
                </div>
                <p class="text-white-50 mb-3">Classic archery game with NFT card bonuses and PPO rewards.</p>
                <div class="game-features">
                  <div class="row text-center">
                    <div class="col-4">
                      <small class="text-white-50 d-block">Reward</small>
                      <span class="text-primary fw-bold">1 PPO/Point</span>
                    </div>
                    <div class="col-4">
                      <small class="text-white-50 d-block">Difficulty</small>
                      <span class="text-warning fw-bold">Medium</span>
                    </div>
                    <div class="col-4">
                      <small class="text-white-50 d-block">Players</small>
                      <span class="text-info fw-bold" id="classicPlayers">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow Game Modern -->
          <div class="col-lg-6 col-md-12 mb-4">
            <div class="game-card bg-dark border border-success rounded overflow-hidden h-100">
              <div class="game-image position-relative">
                <img src="/src/assets/images/arrow-game-modern-preview.png" alt="Arrow Game Modern" class="w-100" style="height: 250px; object-fit: cover;">
                <div class="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <h3 class="text-black mb-3">Arrow Game Modern</h3>
                    <h4 class="text-black mb-4 card-game">Enhanced archery experience with modern UI and effects</h4>
                    <a href="/arrow-game-modern" class="btn btn-success btn-lg">
                      <i class="fas fa-play me-2"></i>Play Now
                    </a>
                  </div>
                </div>
              </div>
              <div class="game-info p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="text-white mb-0">Arrow Game Modern</h5>
                  <span class="badge bg-success">Active</span>
                </div>
                <p class="text-white-50 mb-3">Modern version with enhanced graphics, character selection, and advanced scoring system.</p>
                <div class="game-features">
                  <div class="row text-center">
                    <div class="col-4">
                      <small class="text-white-50 d-block">Reward</small>
                      <span class="text-success fw-bold">1 PPO/Point</span>
                    </div>
                    <div class="col-4">
                      <small class="text-white-50 d-block">Difficulty</small>
                      <span class="text-warning fw-bold">Hard</span>
                    </div>
                    <div class="col-4">
                      <small class="text-white-50 d-block">Players</small>
                      <span class="text-info fw-bold" id="modernPlayers">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coming Soon Games -->
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="text-white mb-4">
              <i class="fas fa-clock me-2"></i>Coming Soon
            </h2>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="game-card bg-dark border border-secondary rounded overflow-hidden h-100 opacity-50">
              <div class="game-image position-relative">
                <img src="/src/assets/images/plinko-preview.png" alt="Coming Soon" class="w-100" style="height: 200px; object-fit: cover;">
                <div class="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <h3 class="text-white mb-3">Coming Soon</h3>
                    <p class="text-white-50">New games are being developed</p>
                  </div>
                </div>
              </div>
              <div class="game-info p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="text-white mb-0">Plinko</h5>
                  <span class="badge bg-secondary">Soon</span>
                </div>
                <p class="text-white-50 mb-3">Drop the ball and multiple bet</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="game-card bg-dark border border-secondary rounded overflow-hidden h-100 opacity-50">
              <div class="game-image position-relative">
                <img src="/src/assets/images/snake-preview.png" alt="Coming Soon" class="w-100" style="height: 200px; object-fit: cover;">
                <div class="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <h3 class="text-white mb-3">Coming Soon</h3>
                    <p class="text-white-50">New games are being developed</p>
                  </div>
                </div>
              </div>
              <div class="game-info p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="text-white mb-0">Snake</h5>
                  <span class="badge bg-secondary">Soon</span>
                </div>
                <p class="text-white-50 mb-3">Origin snake and eat the $PPO!</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="game-card bg-dark border border-secondary rounded overflow-hidden h-100 opacity-50">
              <div class="game-image position-relative">
                <img src="/src/assets/images/fishing-preview.png" alt="Coming Soon" class="w-100" style="height: 200px; object-fit: cover;">
                <div class="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="text-center">
                    <h3 class="text-white mb-3">Coming Soon</h3>
                    <p class="text-white-50">New games are being developed</p>
                  </div>
                </div>
              </div>
              <div class="game-info p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="text-white mb-0">Fishing Coin</h5>
                  <span class="badge bg-secondary">Soon</span>
                </div>
                <p class="text-white-50 mb-3">Fishing coin and earn $PPO!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Rules -->
        <div class="row mt-5">
          <div class="col-12">
            <div class="game-rules bg-dark border border-info rounded p-4">
              <h3 class="text-white mb-4">
                <i class="fas fa-book me-2"></i>Game Rules & Rewards
              </h3>
              <div class="row">
                <div class="col-md-6">
                  <h5 class="text-info mb-3">
                    <i class="fas fa-coins me-2"></i>How to Earn PPO
                  </h5>
                  <ul class="text-white-50">
                    <li>Daily Check-in: 1 PPO per day</li>
                    <li>Complete Daily Tasks: 1-5 PPO per task</li>
                    <li>Game Points: 1 PPO per point scored</li>
                    <li>NFT Card Bonuses: Extra points based on card rarity</li>
                    <li>Deposit: Direct PPO transfer to platform</li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h5 class="text-success mb-3">
                    <i class="fas fa-cards-blank me-2"></i>NFT Card System
                  </h5>
                  <ul class="text-white-50">
                    <li>Use NFT cards to boost game performance</li>
                    <li>Rarity affects bonus points: Common (+5), Rare (+15), Epic (+30), Legendary (+50)</li>
                    <li>Card attributes provide additional bonuses</li>
                    <li>Cards can be purchased in the marketplace</li>
                    <li>Collect rare cards for maximum rewards</li>
                  </ul>
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

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Game',
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
    addToWallet() {
      // Add PPO to wallet logic
      console.log('Adding PPO to wallet...')
    },
    showCardSelection() {
      // Show card selection logic
      console.log('Showing card selection...')
    }
  }
}
</script>

<style scoped>
.game-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

/* Notification System */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  padding: 1rem;
  max-width: 300px;
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.notification.show {
  transform: translateX(0);
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-message {
  flex: 1;
  margin-right: 1rem;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6c757d;
}

.notification-success {
  border-left: 4px solid #28a745;
}

.notification-error {
  border-left: 4px solid #dc3545;
}

.notification-warning {
  border-left: 4px solid #ffc107;
}

.notification-info {
  border-left: 4px solid #17a2b8;
}

/* Network Status */
.network-status {
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
}

.network-status.connected {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.network-status.warning {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.network-status.disconnected {
  background: rgba(108, 117, 125, 0.2);
  color: #6c757d;
}

/* Back Button */
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #fff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  transform: translateX(-5px);
}

.game-card {
  transition: all 0.3s ease;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
}

.game-overlay {
  background: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9rem;
}

.game-rules {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

.game-rules ul {
  list-style: none;
  padding-left: 0;
}

.game-rules li {
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.game-rules li:last-child {
  border-bottom: none;
}
</style>
