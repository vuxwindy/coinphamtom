<template>
  <div class="game-page">
    <Header />
    
    <!-- Game Hero Section -->
    <section class="game-hero padding-large">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="game-content">
              <h1 class="game-title">Archery Challenge</h1>
              <p class="game-description">
                Test your archery skills in this exciting game! Hit targets to earn $PPO tokens and climb the leaderboard.
                The more accurate your shots, the higher your rewards!
              </p>
              <div class="game-stats">
                <div class="stat-item">
                  <i class="fas fa-bullseye"></i>
                  <span>Hit Rate: <strong>0%</strong></span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-trophy"></i>
                  <span>Best Score: <strong>0</strong></span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-coins"></i>
                  <span>Earned: <strong>0 $PPO</strong></span>
                </div>
              </div>
              <div class="game-controls">
                <button class="btn btn-linear btn-large" @click="openGameFile">
                  <i class="fas fa-play me-2"></i>Start Game
                </button>
                <button class="btn btn-outline-linear btn-large" @click="showRules">
                  <i class="fas fa-info-circle me-2"></i>How to Play
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="game-canvas-container">
              <canvas ref="gameCanvas" class="game-canvas"></canvas>
              <div class="game-overlay" v-if="!gameStarted">
                <div class="overlay-content">
                  <h3>Ready to Shoot?</h3>
                  <p>Click "Start Game" to begin your archery adventure!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Game Rules Section -->
    <section class="game-rules padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">How to Play</h2>
            <div class="rules-grid">
              <div class="rule-item">
                <div class="rule-icon">
                  <i class="fas fa-mouse-pointer"></i>
                </div>
                <h4>1. Aim</h4>
                <p>Click and drag to aim your bow at the target</p>
              </div>
              <div class="rule-item">
                <div class="rule-icon">
                  <i class="fas fa-bullseye"></i>
                </div>
                <h4>2. Shoot</h4>
                <p>Release to shoot your arrow at the target</p>
              </div>
              <div class="rule-item">
                <div class="rule-icon">
                  <i class="fas fa-star"></i>
                </div>
                <h4>3. Score</h4>
                <p>Hit the center for maximum points and $PPO rewards</p>
              </div>
              <div class="rule-item">
                <div class="rule-icon">
                  <i class="fas fa-trophy"></i>
                </div>
                <h4>4. Win</h4>
                <p>Complete daily missions and climb the leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Missions Section -->
    <section class="daily-missions padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Daily Missions</h2>
            <div class="missions-grid">
              <div class="mission-item" v-for="mission in dailyMissions" :key="mission.id">
                <div class="mission-header">
                  <h4>{{ mission.title }}</h4>
                  <span class="mission-reward">{{ mission.reward }} $PPO</span>
                </div>
                <div class="mission-progress">
                  <div class="progress">
                    <div class="progress-bar" :style="{ width: mission.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ mission.current }}/{{ mission.target }}</span>
                </div>
                <div class="mission-status">
                  <span :class="mission.completed ? 'completed' : 'incomplete'">
                    {{ mission.completed ? 'Completed' : 'In Progress' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leaderboard Preview -->
    <section class="leaderboard-preview padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center">
              <h2 class="section-title">Top Players</h2>
              <router-link to="/leaderboard" class="btn btn-linear btn-medium">View Full Leaderboard</router-link>
            </div>
            <div class="leaderboard-table">
              <div class="leaderboard-item" v-for="(player, index) in topPlayers" :key="player.id">
                <div class="rank">{{ index + 1 }}</div>
                <div class="player-info">
                  <img :src="player.avatar" :alt="player.name" class="player-avatar">
                  <span class="player-name">{{ player.name }}</span>
                </div>
                <div class="player-score">{{ player.score }}</div>
                <div class="player-reward">{{ player.reward }} $PPO</div>
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
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const gameCanvas = ref(null)
const gameStarted = ref(false)

// Daily Missions Data
const dailyMissions = ref([
  {
    id: 1,
    title: 'Hit 10 Targets',
    reward: 5,
    current: 0,
    target: 10,
    progress: 0,
    completed: false
  },
  {
    id: 2,
    title: 'Achieve 80% Accuracy',
    reward: 10,
    current: 0,
    target: 80,
    progress: 0,
    completed: false
  },
  {
    id: 3,
    title: 'Score 1000 Points',
    reward: 15,
    current: 0,
    target: 1000,
    progress: 0,
    completed: false
  },
  {
    id: 4,
    title: 'Play 5 Games',
    reward: 8,
    current: 0,
    target: 5,
    progress: 0,
    completed: false
  }
])

// Top Players Data
const topPlayers = ref([
  {
    id: 1,
    name: 'Loura Chin',
    avatar: '/src/assets/images/clients-item-lg1.jpg',
    score: 2500,
    reward: 150
  },
  {
    id: 2,
    name: 'Kelvin Glan',
    avatar: '/src/assets/images/clients-item-lg2.jpg',
    score: 2200,
    reward: 120
  },
  {
    id: 3,
    name: 'Glam Lee',
    avatar: '/src/assets/images/clients-item-lg3.jpg',
    score: 2000,
    reward: 100
  },
  {
    id: 4,
    name: 'Alameda',
    avatar: '/src/assets/images/clients-item-lg4.jpg',
    score: 1800,
    reward: 80
  },
  {
    id: 5,
    name: 'Mutin Cap',
    avatar: '/src/assets/images/clients-item2.jpg',
    score: 1600,
    reward: 60
  }
])

const startGame = () => {
  gameStarted.value = true
  // Game logic would go here
  console.log('Game started!')
}

const openGameFile = () => {
  // Navigate to the classic archery game using Vue Router
  router.push('/arrow-game')
}

const showRules = () => {
  // Scroll to rules section
  document.querySelector('.game-rules').scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Initialize game canvas
  const canvas = gameCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 300
    
    // Draw a simple target
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw target circles
    ctx.beginPath()
    ctx.arc(200, 150, 80, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(200, 150, 60, 0, 2 * Math.PI)
    ctx.fillStyle = '#ff6b6b'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(200, 150, 40, 0, 2 * Math.PI)
    ctx.fillStyle = '#4ecdc4'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(200, 150, 20, 0, 2 * Math.PI)
    ctx.fillStyle = '#45b7d1'
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(200, 150, 10, 0, 2 * Math.PI)
    ctx.fillStyle = '#96ceb4'
    ctx.fill()
  }
})
</script>

<style scoped>
.game-page {
  background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #6600cc 100%);
  min-height: 100vh;
  padding-top: 80px;
}

.game-hero {
  padding: 100px 0;
}

.game-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.game-description {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.game-stats {
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

.game-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.game-canvas-container {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.game-canvas {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

.overlay-content {
  text-align: center;
  color: #ffffff;
}

.overlay-content h3 {
  color: #cc00ff;
  margin-bottom: 10px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.rule-item {
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.rule-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.rule-icon i {
  font-size: 2rem;
  color: #ffffff;
}

.rule-item h4 {
  color: #ffffff;
  margin-bottom: 15px;
}

.rule-item p {
  color: #b0b0b0;
}

.missions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.mission-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.mission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.mission-header h4 {
  color: #ffffff;
  margin: 0;
}

.mission-reward {
  color: #cc00ff;
  font-weight: 600;
}

.mission-progress {
  margin-bottom: 15px;
}

.progress {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  transition: width 0.3s ease;
}

.progress-text {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.mission-status .completed {
  color: #4ecdc4;
  font-weight: 600;
}

.mission-status .incomplete {
  color: #ff6b6b;
  font-weight: 600;
}

.leaderboard-table {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  margin-top: 40px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.leaderboard-item:last-child {
  border-bottom: none;
}

.rank {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  margin-right: 20px;
}

.player-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.player-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}

.player-name {
  color: #ffffff;
  font-weight: 600;
}

.player-score {
  color: #cc00ff;
  font-weight: 700;
  margin-right: 20px;
}

.player-reward {
  color: #4ecdc4;
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
  .game-title {
    font-size: 2.5rem;
  }
  
  .game-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .game-controls {
    flex-direction: column;
  }
  
  .rules-grid {
    grid-template-columns: 1fr;
  }
  
  .missions-grid {
    grid-template-columns: 1fr;
  }
  
  .leaderboard-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .player-info {
    flex-direction: column;
  }
}
</style>
