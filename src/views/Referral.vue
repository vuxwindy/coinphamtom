<template>
  <div class="referral-page">
    <Header />
    
    <!-- Referral Hero Section -->
    <section class="referral-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="referral-header text-center">
              <h1 class="referral-title">Referral Program</h1>
              <p class="referral-subtitle">Invite friends and earn rewards together!</p>
              <div class="referral-banner">
                <div class="banner-content">
                  <h2>Earn 5 $PPO for each friend who joins!</h2>
                  <p>Plus, your friends get 2 $PPO bonus when they sign up with your code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral Stats -->
    <section class="referral-stats padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ referralStats.totalReferrals }}</h3>
                <p class="stat-label">Total Referrals</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-coins"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ referralStats.totalEarnings }}</h3>
                <p class="stat-label">Total Earnings ($PPO)</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ referralStats.activeReferrals }}</h3>
                <p class="stat-label">Active Referrals</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ referralStats.conversionRate }}%</h3>
                <p class="stat-label">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral Code Section -->
    <section class="referral-code-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="referral-code-card">
              <h2 class="section-title text-center">Your Referral Code</h2>
              <div class="code-display">
                <div class="code-input">
                  <input 
                    type="text" 
                    :value="userReferralCode" 
                    class="form-control"
                    readonly
                  >
                  <button class="btn btn-primary" @click="copyReferralCode">
                    <i class="fas fa-copy"></i> Copy
                  </button>
                </div>
                <div class="code-info">
                  <p>Share this code with your friends to start earning rewards!</p>
                </div>
              </div>
              
              <!-- Quick Share Buttons -->
              <div class="share-section">
                <h4>Quick Share</h4>
                <div class="share-buttons">
                  <button class="btn btn-social btn-twitter" @click="shareOnTwitter">
                    <i class="fab fa-twitter"></i> Twitter
                  </button>
                  <button class="btn btn-social btn-telegram" @click="shareOnTelegram">
                    <i class="fab fa-telegram"></i> Telegram
                  </button>
                  <button class="btn btn-social btn-facebook" @click="shareOnFacebook">
                    <i class="fab fa-facebook"></i> Facebook
                  </button>
                  <button class="btn btn-social btn-whatsapp" @click="shareOnWhatsApp">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral Rewards -->
    <section class="referral-rewards padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">How It Works</h2>
            <div class="rewards-grid">
              <div class="reward-card">
                <div class="reward-icon">
                  <i class="fas fa-user-plus"></i>
                </div>
                <h4>Step 1: Share Your Code</h4>
                <p>Share your unique referral code with friends and family</p>
              </div>
              <div class="reward-card">
                <div class="reward-icon">
                  <i class="fas fa-user-check"></i>
                </div>
                <h4>Step 2: Friends Join</h4>
                <p>Your friends sign up using your referral code</p>
              </div>
              <div class="reward-card">
                <div class="reward-icon">
                  <i class="fas fa-gift"></i>
                </div>
                <h4>Step 3: Earn Rewards</h4>
                <p>You both receive $PPO tokens as rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral List -->
    <section class="referral-list padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Your Referrals</h2>
            <div class="referral-table">
              <div class="table-header">
                <div class="header-cell">User</div>
                <div class="header-cell">Date Joined</div>
                <div class="header-cell">Status</div>
                <div class="header-cell">Reward</div>
              </div>
              <div v-for="referral in referrals" :key="referral.id" class="table-row">
                <div class="table-cell">
                  <div class="user-info">
                    <img :src="referral.avatar" :alt="referral.name" class="user-avatar">
                    <div class="user-details">
                      <h5>{{ referral.name }}</h5>
                      <small>{{ referral.email }}</small>
                    </div>
                  </div>
                </div>
                <div class="table-cell">
                  {{ formatDate(referral.joinedDate) }}
                </div>
                <div class="table-cell">
                  <span :class="['status-badge', referral.status]">{{ referral.status }}</span>
                </div>
                <div class="table-cell">
                  <span class="reward-amount">+{{ referral.reward }} $PPO</span>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-if="referrals.length === 0" class="empty-state">
                <div class="empty-icon">
                  <i class="fas fa-users"></i>
                </div>
                <h3>No Referrals Yet</h3>
                <p>Start sharing your referral code to earn rewards!</p>
                <button class="btn btn-primary" @click="scrollToCode">
                  <i class="fas fa-share"></i> Share Your Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral Leaderboard -->
    <section class="referral-leaderboard padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Top Referrers</h2>
            <div class="leaderboard">
              <div v-for="(leader, index) in topReferrers" :key="leader.id" class="leaderboard-item">
                <div class="leader-rank">
                  <span class="rank-number">{{ index + 1 }}</span>
                </div>
                <div class="leader-info">
                  <img :src="leader.avatar" :alt="leader.name" class="leader-avatar">
                  <div class="leader-details">
                    <h5>{{ leader.name }}</h5>
                    <p>{{ leader.referrals }} referrals</p>
                  </div>
                </div>
                <div class="leader-rewards">
                  <span class="reward-total">{{ leader.totalEarnings }} $PPO</span>
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
const { currentUser } = useFirebase()

// State
const userReferralCode = ref('ABC12345')

// Referral stats
const referralStats = ref({
  totalReferrals: 12,
  totalEarnings: 60,
  activeReferrals: 8,
  conversionRate: 75
})

// Referrals list
const referrals = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/src/assets/images/clients-item1.jpg',
    joinedDate: new Date('2024-01-15'),
    status: 'active',
    reward: 5
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/src/assets/images/clients-item2.jpg',
    joinedDate: new Date('2024-01-12'),
    status: 'active',
    reward: 5
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: '/src/assets/images/clients-item3.jpg',
    joinedDate: new Date('2024-01-10'),
    status: 'pending',
    reward: 0
  }
])

// Top referrers
const topReferrers = ref([
  {
    id: 1,
    name: 'CryptoKing',
    avatar: '/src/assets/images/clients-item1.jpg',
    referrals: 25,
    totalEarnings: 125
  },
  {
    id: 2,
    name: 'NFTQueen',
    avatar: '/src/assets/images/clients-item2.jpg',
    referrals: 18,
    totalEarnings: 90
  },
  {
    id: 3,
    name: 'BlockchainPro',
    avatar: '/src/assets/images/clients-item3.jpg',
    referrals: 15,
    totalEarnings: 75
  },
  {
    id: 4,
    name: 'DeFiMaster',
    avatar: '/src/assets/images/clients-item4.jpg',
    referrals: 12,
    totalEarnings: 60
  },
  {
    id: 5,
    name: 'Web3Wizard',
    avatar: '/src/assets/images/clients-item1.jpg',
    referrals: 10,
    totalEarnings: 50
  }
])

// Methods
const copyReferralCode = () => {
  navigator.clipboard.writeText(userReferralCode.value)
  alert('Referral code copied to clipboard!')
}

const shareOnTwitter = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userReferralCode.value} and get 2 $PPO bonus!`
  const url = window.location.origin
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
}

const shareOnTelegram = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userReferralCode.value} and get 2 $PPO bonus!`
  window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`)
}

const shareOnFacebook = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userReferralCode.value} and get 2 $PPO bonus!`
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`)
}

const shareOnWhatsApp = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userReferralCode.value} and get 2 $PPO bonus!`
  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.origin)}`)
}

const scrollToCode = () => {
  document.querySelector('.referral-code-section').scrollIntoView({ behavior: 'smooth' })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  // Load referral data
  console.log('Referral page loaded')
})
</script>

<style scoped>
.referral-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.referral-hero {
  background: linear-gradient(135deg, rgba(204, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 80px 0;
}

.referral-title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.referral-subtitle {
  font-size: 1.3rem;
  color: #b0b0b0;
  margin-bottom: 40px;
}

.referral-banner {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 20px;
  padding: 30px;
  margin-top: 30px;
}

.banner-content h2 {
  color: white;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.banner-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
}

.referral-stats {
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

.referral-code-section {
  padding: 80px 0;
}

.referral-code-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
}

.section-title {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: 600;
}

.code-display {
  margin-bottom: 40px;
}

.code-input {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.code-input .form-control {
  flex: 1;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}

.code-input .form-control:focus {
  outline: none;
  border-color: #cc00ff;
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.2);
}

.code-info p {
  color: #b0b0b0;
  text-align: center;
  font-size: 1.1rem;
}

.share-section {
  text-align: center;
}

.share-section h4 {
  color: white;
  margin-bottom: 20px;
}

.share-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-social {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-social.btn-twitter {
  background: #1da1f2;
}

.btn-social.btn-telegram {
  background: #0088cc;
}

.btn-social.btn-facebook {
  background: #1877f2;
}

.btn-social.btn-whatsapp {
  background: #25d366;
}

.btn-social:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.referral-rewards {
  padding: 80px 0;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.reward-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.reward-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
}

.reward-icon {
  font-size: 3rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.reward-card h4 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.reward-card p {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.referral-list {
  padding: 80px 0;
}

.referral-table {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background: rgba(204, 0, 255, 0.1);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-cell {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.table-cell {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details h5 {
  color: white;
  margin-bottom: 5px;
}

.user-details small {
  color: #b0b0b0;
}

.status-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-badge.active {
  background: #00ff88;
  color: #000;
}

.status-badge.pending {
  background: #ffaa00;
  color: #000;
}

.reward-amount {
  color: #00ff88;
  font-weight: 600;
  font-size: 1.1rem;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: white;
  margin-bottom: 15px;
}

.empty-state p {
  color: #b0b0b0;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.referral-leaderboard {
  padding: 80px 0;
}

.leaderboard {
  max-width: 800px;
  margin: 0 auto;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.leaderboard-item:hover {
  transform: translateX(10px);
  border-color: rgba(204, 0, 255, 0.3);
}

.leader-rank {
  min-width: 60px;
}

.rank-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2rem;
}

.leader-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.leader-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.leader-details h5 {
  color: white;
  margin-bottom: 5px;
}

.leader-details p {
  color: #b0b0b0;
  margin: 0;
}

.leader-rewards {
  text-align: right;
}

.reward-total {
  color: #cc00ff;
  font-weight: 700;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .referral-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .code-input {
    flex-direction: column;
  }
  
  .share-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .rewards-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .table-header {
    display: none;
  }
  
  .table-row {
    padding: 15px;
  }
  
  .table-cell {
    justify-content: center;
  }
  
  .leaderboard-item {
    flex-direction: column;
    text-align: center;
  }
  
  .leader-info {
    flex-direction: column;
  }
  
  .leader-rewards {
    text-align: center;
  }
}
</style>
