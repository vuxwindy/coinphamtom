<template>
  <div class="leaderboard-page">
    <Header />
    
    <!-- Leaderboard Hero Section -->
    <section class="leaderboard-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="leaderboard-title">Archery Leaderboard</h1>
            <p class="leaderboard-description">
              Compete with the best archers in the world! Show your skills and climb the rankings to earn exclusive rewards.
            </p>
            <div class="leaderboard-stats">
              <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>Total Players: <strong>{{ totalPlayers }}</strong></span>
              </div>
              <div class="stat-item">
                <i class="fas fa-trophy"></i>
                <span>Your Rank: <strong>{{ userRank }}</strong></span>
              </div>
              <div class="stat-item">
                <i class="fas fa-coins"></i>
                <span>Total Rewards: <strong>{{ totalRewards }} $PPO</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter-controls">
              <div class="filter-group">
                <label>Time Period:</label>
                <select v-model="selectedPeriod" class="form-select">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="all-time">All Time</option>
                </select>
              </div>
              <div class="filter-group">
                <label>Category:</label>
                <select v-model="selectedCategory" class="form-select">
                  <option value="all">All Categories</option>
                  <option value="accuracy">Accuracy</option>
                  <option value="speed">Speed</option>
                  <option value="distance">Distance</option>
                  <option value="points">Points</option>
                </select>
              </div>
              <div class="filter-group">
                <label>Search:</label>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search players..."
                  class="form-control"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top 3 Players Section -->
    <section class="top-players padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Top 3 Champions</h2>
            <div class="top-players-grid">
              <!-- Second Place -->
              <div class="top-player second-place" v-if="topPlayers[1]">
                <div class="rank-badge">2</div>
                <div class="player-avatar">
                  <img :src="topPlayers[1].avatar" :alt="topPlayers[1].name">
                </div>
                <h3 class="player-name">{{ topPlayers[1].name }}</h3>
                <div class="player-stats">
                  <div class="stat">
                    <span class="label">Score</span>
                    <span class="value">{{ topPlayers[1].score }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Accuracy</span>
                    <span class="value">{{ topPlayers[1].accuracy }}%</span>
                  </div>
                  <div class="stat">
                    <span class="label">Rewards</span>
                    <span class="value">{{ topPlayers[1].rewards }} $PPO</span>
                  </div>
                </div>
              </div>

              <!-- First Place -->
              <div class="top-player first-place" v-if="topPlayers[0]">
                <div class="rank-badge">1</div>
                <div class="crown-icon">
                  <i class="fas fa-crown"></i>
                </div>
                <div class="player-avatar">
                  <img :src="topPlayers[0].avatar" :alt="topPlayers[0].name">
                </div>
                <h3 class="player-name">{{ topPlayers[0].name }}</h3>
                <div class="player-stats">
                  <div class="stat">
                    <span class="label">Score</span>
                    <span class="value">{{ topPlayers[0].score }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Accuracy</span>
                    <span class="value">{{ topPlayers[0].accuracy }}%</span>
                  </div>
                  <div class="stat">
                    <span class="label">Rewards</span>
                    <span class="value">{{ topPlayers[0].rewards }} $PPO</span>
                  </div>
                </div>
              </div>

              <!-- Third Place -->
              <div class="top-player third-place" v-if="topPlayers[2]">
                <div class="rank-badge">3</div>
                <div class="player-avatar">
                  <img :src="topPlayers[2].avatar" :alt="topPlayers[2].name">
                </div>
                <h3 class="player-name">{{ topPlayers[2].name }}</h3>
                <div class="player-stats">
                  <div class="stat">
                    <span class="label">Score</span>
                    <span class="value">{{ topPlayers[2].score }}</span>
                  </div>
                  <div class="stat">
                    <span class="label">Accuracy</span>
                    <span class="value">{{ topPlayers[2].accuracy }}%</span>
                  </div>
                  <div class="stat">
                    <span class="label">Rewards</span>
                    <span class="value">{{ topPlayers[2].rewards }} $PPO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Full Leaderboard Section -->
    <section class="full-leaderboard padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Full Rankings</h2>
            <div class="leaderboard-table">
              <div class="table-header">
                <div class="header-cell">Rank</div>
                <div class="header-cell">Player</div>
                <div class="header-cell">Score</div>
                <div class="header-cell">Accuracy</div>
                <div class="header-cell">Games</div>
                <div class="header-cell">Rewards</div>
              </div>
              <div 
                class="leaderboard-row" 
                v-for="(player, index) in filteredPlayers" 
                :key="player.id"
                :class="{ 'current-user': player.isCurrentUser }"
              >
                <div class="rank-cell">
                  <span class="rank-number">{{ index + 1 }}</span>
                  <div class="rank-medal" v-if="index < 3">
                    <i :class="getMedalIcon(index)"></i>
                  </div>
                </div>
                <div class="player-cell">
                  <img :src="player.avatar" :alt="player.name" class="player-avatar-small">
                  <div class="player-info">
                    <span class="player-name">{{ player.name }}</span>
                    <span class="player-level">Level {{ player.level }}</span>
                  </div>
                </div>
                <div class="score-cell">{{ player.score }}</div>
                <div class="accuracy-cell">{{ player.accuracy }}%</div>
                <div class="games-cell">{{ player.games }}</div>
                <div class="rewards-cell">{{ player.rewards }} $PPO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rewards Section -->
    <section class="rewards-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Seasonal Rewards</h2>
            <div class="rewards-grid">
              <div class="reward-item" v-for="reward in seasonalRewards" :key="reward.rank">
                <div class="reward-rank">{{ reward.rank }}</div>
                <div class="reward-icon">
                  <i :class="reward.icon"></i>
                </div>
                <h4>{{ reward.title }}</h4>
                <div class="reward-prize">{{ reward.prize }} $PPO</div>
                <div class="reward-bonus" v-if="reward.bonus">
                  <span>{{ reward.bonus }}</span>
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
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const selectedPeriod = ref('all-time')
const selectedCategory = ref('all')
const searchQuery = ref('')
const totalPlayers = ref(15420)
const userRank = ref(1250)
const totalRewards = ref(1250000)

// Top Players Data
const topPlayers = ref([
  {
    id: 1,
    name: 'Loura Chin',
    avatar: '/src/assets/images/clients-item-lg1.jpg',
    score: 2500,
    accuracy: 98.5,
    rewards: 150,
    level: 25,
    games: 150
  },
  {
    id: 2,
    name: 'Kelvin Glan',
    avatar: '/src/assets/images/clients-item-lg2.jpg',
    score: 2200,
    accuracy: 97.2,
    rewards: 120,
    level: 23,
    games: 135
  },
  {
    id: 3,
    name: 'Glam Lee',
    avatar: '/src/assets/images/clients-item-lg3.jpg',
    score: 2000,
    accuracy: 96.8,
    rewards: 100,
    level: 21,
    games: 120
  }
])

// All Players Data
const allPlayers = ref([
  {
    id: 1,
    name: 'Loura Chin',
    avatar: '/src/assets/images/clients-item-lg1.jpg',
    score: 2500,
    accuracy: 98.5,
    rewards: 150,
    level: 25,
    games: 150,
    isCurrentUser: false
  },
  {
    id: 2,
    name: 'Kelvin Glan',
    avatar: '/src/assets/images/clients-item-lg2.jpg',
    score: 2200,
    accuracy: 97.2,
    rewards: 120,
    level: 23,
    games: 135,
    isCurrentUser: false
  },
  {
    id: 3,
    name: 'Glam Lee',
    avatar: '/src/assets/images/clients-item-lg3.jpg',
    score: 2000,
    accuracy: 96.8,
    rewards: 100,
    level: 21,
    games: 120,
    isCurrentUser: false
  },
  {
    id: 4,
    name: 'Alameda',
    avatar: '/src/assets/images/clients-item-lg4.jpg',
    score: 1800,
    accuracy: 95.5,
    rewards: 80,
    level: 19,
    games: 110,
    isCurrentUser: false
  },
  {
    id: 5,
    name: 'Mutin Cap',
    avatar: '/src/assets/images/clients-item2.jpg',
    score: 1600,
    accuracy: 94.2,
    rewards: 60,
    level: 17,
    games: 95,
    isCurrentUser: true
  },
  {
    id: 6,
    name: 'Glam Lee Jr',
    avatar: '/src/assets/images/clients-item3.jpg',
    score: 1400,
    accuracy: 93.1,
    rewards: 45,
    level: 15,
    games: 85,
    isCurrentUser: false
  }
])

// Seasonal Rewards Data
const seasonalRewards = ref([
  {
    rank: '1st',
    title: 'Champion',
    prize: 1000,
    icon: 'fas fa-crown',
    bonus: 'Exclusive NFT + VIP Status'
  },
  {
    rank: '2nd',
    title: 'Runner-up',
    prize: 500,
    icon: 'fas fa-medal',
    bonus: 'Rare NFT + Premium Status'
  },
  {
    rank: '3rd',
    title: 'Bronze',
    prize: 250,
    icon: 'fas fa-award',
    bonus: 'Premium NFT'
  },
  {
    rank: 'Top 10',
    title: 'Elite',
    prize: 100,
    icon: 'fas fa-star',
    bonus: 'Special Badge'
  },
  {
    rank: 'Top 50',
    title: 'Veteran',
    prize: 50,
    icon: 'fas fa-shield-alt',
    bonus: null
  },
  {
    rank: 'Top 100',
    title: 'Skilled',
    prize: 25,
    icon: 'fas fa-trophy',
    bonus: null
  }
])

// Computed properties
const filteredPlayers = computed(() => {
  let filtered = allPlayers.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(player => 
      player.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category (simplified for demo)
  if (selectedCategory.value !== 'all') {
    // In a real app, you would filter by actual category data
    filtered = filtered.filter(player => player.score > 0)
  }

  return filtered
})

const getMedalIcon = (index) => {
  const icons = ['fas fa-crown', 'fas fa-medal', 'fas fa-award']
  return icons[index] || ''
}
</script>

<style scoped>
.leaderboard-page {
  background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #6600cc 100%);
  min-height: 100vh;
  padding-top: 80px;
}

.leaderboard-hero {
  padding: 100px 0;
  text-align: center;
}

.leaderboard-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.leaderboard-description {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.leaderboard-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
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

.filter-controls {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-group label {
  color: #ffffff;
  font-weight: 600;
}

.form-select, .form-control {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
  padding: 10px 15px;
  backdrop-filter: blur(10px);
}

.form-select:focus, .form-control:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #cc00ff;
  box-shadow: 0 0 0 0.2rem rgba(204, 0, 255, 0.25);
  color: #ffffff;
}

.top-players-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 30px;
  align-items: end;
  margin-top: 40px;
}

.top-player {
  text-align: center;
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  position: relative;
  transition: transform 0.3s ease;
}

.top-player:hover {
  transform: translateY(-10px);
}

.first-place {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 215, 0, 0.1));
  border: 2px solid #ffc107;
  transform: scale(1.1);
}

.second-place {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(169, 169, 169, 0.1));
  border: 2px solid #c0c0c0;
}

.third-place {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(184, 115, 51, 0.1));
  border: 2px solid #cd7f32;
}

.rank-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.first-place .rank-badge {
  background: #ffc107;
  color: #000000;
}

.second-place .rank-badge {
  background: #c0c0c0;
  color: #000000;
}

.third-place .rank-badge {
  background: #cd7f32;
  color: #ffffff;
}

.crown-icon {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffc107;
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.player-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.player-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-name {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.player-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat .label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.stat .value {
  color: #cc00ff;
  font-weight: 600;
}

.leaderboard-table {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  margin-top: 40px;
}

.table-header {
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 1fr 1fr;
  padding: 20px;
  background: rgba(204, 0, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-cell {
  color: #ffffff;
  font-weight: 600;
  text-align: center;
}

.header-cell:first-child {
  text-align: center;
}

.header-cell:nth-child(2) {
  text-align: left;
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 80px 2fr 1fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.leaderboard-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.leaderboard-row.current-user {
  background: rgba(204, 0, 255, 0.1);
  border-left: 4px solid #cc00ff;
}

.rank-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.rank-number {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
}

.rank-medal {
  position: absolute;
  top: -5px;
  right: -5px;
  color: #ffc107;
  font-size: 1.2rem;
}

.player-cell {
  display: flex;
  align-items: center;
  gap: 15px;
}

.player-avatar-small {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.player-info {
  display: flex;
  flex-direction: column;
}

.player-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
}

.player-level {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.score-cell, .accuracy-cell, .games-cell, .rewards-cell {
  color: #ffffff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rewards-cell {
  color: #cc00ff;
  font-weight: 600;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.reward-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.reward-item:hover {
  transform: translateY(-5px);
}

.reward-rank {
  font-size: 1.5rem;
  font-weight: 700;
  color: #cc00ff;
  margin-bottom: 15px;
}

.reward-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: #ffffff;
}

.reward-item h4 {
  color: #ffffff;
  margin-bottom: 15px;
}

.reward-prize {
  color: #cc00ff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.reward-bonus {
  color: #4ecdc4;
  font-size: 0.9rem;
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
  .leaderboard-title {
    font-size: 2.5rem;
  }
  
  .leaderboard-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .top-players-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .first-place {
    transform: none;
  }
  
  .table-header, .leaderboard-row {
    grid-template-columns: 60px 1fr 80px 80px 60px 80px;
    font-size: 0.9rem;
  }
  
  .player-cell {
    flex-direction: column;
    text-align: center;
    gap: 5px;
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
