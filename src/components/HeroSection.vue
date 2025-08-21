<template>
  <section id="billboard" class="padding-large overflow-hidden">
    <div class="container">
      <div class="row d-flex flex-wrap align-items-center">
        <div class="col-md-7 col-sm-8">
          <div class="banner-content content-light m-0 mt-5 mt-md-0">
            <h1 class="banner-title m-0">Modern Gamefi Platform</h1>
            <p class="grey">Welcome to our modern gamefi platform, where you can experience the thrill of archery and earn rewards. Join us and become the best archer in the world!</p>
            <div class="weather-status d-flex align-items-center mb-4">
              <i class="weather-icon fas fa-sun text-warning me-2"></i>
              <span class="current-weather">Fast Deposit-Withdraw | Easy to play | Support 24/7</span>
            </div>
            <div class="level-indicator d-flex align-items-center mb-4">
              <span class="current-level fw-bold me-2">Current Mission: </span>
              <div class="progress flex-grow-1" style="height: 8px;">
                <div class="progress-bar bg-success" :style="{ width: missionProgress + '%' }"></div>
              </div>
              <span class="hits ms-2">{{ currentMission }}/6 Daily Mission</span>
            </div>
            <div class="btn-wrap d-flex flex-wrap">
              <router-link to="/game" class="btn btn-linear btn-medium mt-3">
                <i class="fas fa-gamepad me-2"></i>Play Games
              </router-link>
              <router-link to="/blindbox" class="btn btn-outline-linear btn-medium mt-3">
                <i class="fas fa-box-open me-2"></i>Open Blindbox
              </router-link>
            </div>
            <div class="quick-stats d-flex mt-4">
              <div class="stat-item me-4">
                <small class="claim-reward">Mission Left</small>
                <h4 class="mb-0">{{ missionsLeft }}/06</h4>
              </div>
              <div class="stat-item me-4">
                <small class="claim-reward">Hit Rate</small>
                <h4 class="mb-0">{{ hitRate }}%</h4>
              </div>
              <div class="stat-item">
                <small class="claim-reward">$PPO Balance</small>
                <h4 class="mb-0">{{ ppoBalance }}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-8">
          <div class="image-holder">
            <img src="../assets/images/planet-arrow.png" alt="banner" class="banner-image img-fluid">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentMission = ref(1)
const missionsLeft = ref(5)
const hitRate = ref(0)
const ppoBalance = ref(0)
const missionProgress = ref(0)

onMounted(() => {
  // Load user stats from localStorage or API
  loadUserStats()
})

const loadUserStats = () => {
  // Load stats from localStorage
  const savedStats = localStorage.getItem('userStats')
  if (savedStats) {
    const stats = JSON.parse(savedStats)
    currentMission.value = stats.currentMission || 1
    missionsLeft.value = stats.missionsLeft || 5
    hitRate.value = stats.hitRate || 0
    ppoBalance.value = stats.ppoBalance || 0
    missionProgress.value = (currentMission.value / 6) * 100
  }
}
</script>

<style scoped>
.banner-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.grey {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.weather-status {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 15px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
}

.current-weather {
  color: #ffffff;
  font-weight: 500;
}

.level-indicator {
  background: rgba(0, 0, 0, 0.3);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid rgba(204, 0, 255, 0.3);
}

.current-level {
  color: #cc00ff;
}

.progress {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.progress-bar {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 10px;
}

.hits {
  color: #ffffff;
  font-weight: 600;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.btn-outline-linear {
  background: transparent;
  border: 2px solid #cc00ff;
  color: #cc00ff;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-outline-linear:hover {
  background: #cc00ff;
  color: white;
  transform: translateY(-2px);
}

.quick-stats {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(204, 0, 255, 0.3);
}

.stat-item {
  text-align: center;
}

.claim-reward {
  color: #cc00ff;
  font-weight: 600;
  font-size: 0.9rem;
}

.banner-image {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.image-holder {
  text-align: center;
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 2rem;
  }
  
  .quick-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .stat-item {
    margin-bottom: 10px;
  }
}
</style>
