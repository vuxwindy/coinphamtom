<template>
  <div class="dashboard-page">
    <Header />
    
    <!-- Dashboard Hero Section -->
    <section class="dashboard-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="dashboard-header">
              <h1 class="dashboard-title">Welcome back, {{ userDisplayName }}!</h1>
              <p class="dashboard-subtitle">Track your progress and manage your assets</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Cards -->
    <section class="stats-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-coins"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userStats.tokenBalance || 0 }}</h3>
                <p class="stat-label">$PPO Balance</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-images"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userStats.nftBalance || 0 }}</h3>
                <p class="stat-label">NFTs Owned</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userStats.totalEarned || 0 }}</h3>
                <p class="stat-label">Total Earned</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userStats.referralCount || 0 }}</h3>
                <p class="stat-label">Referrals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Quick Actions</h2>
            <div class="row">
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="action-card" @click="navigateTo('/game')">
                  <div class="action-icon">
                    <i class="fas fa-gamepad"></i>
                  </div>
                  <h4>Play Game</h4>
                  <p>Earn $PPO by playing games</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="action-card" @click="navigateTo('/marketplace')">
                  <div class="action-icon">
                    <i class="fas fa-store"></i>
                  </div>
                  <h4>Marketplace</h4>
                  <p>Buy and sell NFTs</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="action-card" @click="navigateTo('/tasks')">
                  <div class="action-icon">
                    <i class="fas fa-tasks"></i>
                  </div>
                  <h4>Daily Tasks</h4>
                  <p>Complete tasks for rewards</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-4">
                <div class="action-card" @click="navigateTo('/referral')">
                  <div class="action-icon">
                    <i class="fas fa-share-alt"></i>
                  </div>
                  <h4>Refer Friends</h4>
                  <p>Earn from referrals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Activities -->
    <section class="recent-activities padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Recent Activities</h2>
            <div class="activities-list">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                <div class="activity-icon">
                  <i :class="activity.icon"></i>
                </div>
                <div class="activity-content">
                  <h5>{{ activity.title }}</h5>
                  <p>{{ activity.description }}</p>
                  <small class="activity-time">{{ formatTime(activity.timestamp) }}</small>
                </div>
                <div class="activity-amount" v-if="activity.amount">
                  <span class="amount-positive" v-if="activity.amount > 0">+{{ activity.amount }} $PPO</span>
                  <span class="amount-negative" v-else>{{ activity.amount }} $PPO</span>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useFirebase } from '@/composables/useFirebase.js'

const router = useRouter()
const { currentUser, getUserData } = useFirebase()

// User data
const userStats = ref({
  tokenBalance: 0,
  nftBalance: 0,
  totalEarned: 0,
  referralCount: 0
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'Daily Check-in',
    description: 'Completed daily check-in task',
    amount: 1,
    icon: 'fas fa-calendar-check',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 2,
    title: 'Game Reward',
    description: 'Earned from archery game',
    amount: 5,
    icon: 'fas fa-gamepad',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: 3,
    title: 'Referral Bonus',
    description: 'New user joined with your code',
    amount: 5,
    icon: 'fas fa-users',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  }
])

// Computed properties
const userDisplayName = computed(() => {
  return currentUser.value?.displayName || currentUser.value?.email?.split('@')[0] || 'User'
})

// Methods
const navigateTo = (path) => {
  router.push(path)
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}

const loadUserData = async () => {
  if (currentUser.value) {
    const result = await getUserData()
    if (result.success) {
      userStats.value = result.data
    }
  }
}

// Lifecycle
onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
.dashboard-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.dashboard-hero {
  background: linear-gradient(135deg, rgba(204, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 80px 0;
}

.dashboard-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.dashboard-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 0;
}

.stats-section {
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

.quick-actions {
  padding: 80px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 50px;
}

.action-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
  border-color: #cc00ff;
}

.action-icon {
  font-size: 3rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.action-card h4 {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 15px;
}

.action-card p {
  color: #b0b0b0;
  margin: 0;
}

.recent-activities {
  padding: 80px 0;
}

.activities-list {
  max-width: 800px;
  margin: 0 auto;
}

.activity-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateX(10px);
  border-color: rgba(204, 0, 255, 0.3);
}

.activity-icon {
  font-size: 2rem;
  color: #cc00ff;
  min-width: 50px;
}

.activity-content {
  flex: 1;
}

.activity-content h5 {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 5px;
}

.activity-content p {
  color: #b0b0b0;
  margin-bottom: 5px;
}

.activity-time {
  color: #666;
  font-size: 0.9rem;
}

.activity-amount {
  font-weight: 600;
  font-size: 1.1rem;
}

.amount-positive {
  color: #00ff88;
}

.amount-negative {
  color: #ff4444;
}

@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .activity-item {
    flex-direction: column;
    text-align: center;
  }
  
  .activity-amount {
    margin-top: 10px;
  }
}
</style>
