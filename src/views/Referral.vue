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
              <p class="referral-subtitle">
                Invite friends and earn rewards together!
              </p>
              <div class="referral-banner">
                <div class="banner-content">
                  <h2>Earn 5 $PPO for each friend who joins!</h2>
                  <p>
                    Plus, your friends get 2 $PPO bonus when they sign up with
                    your code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wallet Connection Notice -->
    <section
      v-if="!isWalletConnected"
      class="wallet-notice-section padding-large"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="wallet-notice-card">
              <div class="notice-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <h3>Connect Your Wallet</h3>
              <p>
                Please connect your wallet to view your referral data and start
                earning rewards
              </p>
              <div class="connect-btn">
                <ReownWalletButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Referral Content (Only show when wallet connected) -->
    <div v-if="isWalletConnected">
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
                  <h3 class="stat-value">
                    {{ referralStats.activeReferrals }}
                  </h3>
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
                  <h3 class="stat-value">
                    {{ referralStats.conversionRate }}%
                  </h3>
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
                    />
                    <button
                      class="btn btn-primary"
                      @click="copyReferralCode"
                    >
                      <i class="fas fa-copy"></i> Copy Code
                    </button>
                  </div>

                  <!-- Referral Link Display -->
                  <div class="referral-link-section">
                    <h5>Your Referral Link</h5>
                    <div class="link-input">
                      <input
                        type="text"
                        :value="generateReferralLink(userReferralCode)"
                        class="form-control"
                        readonly
                      />
                      <button
                        class="btn btn-secondary"
                        @click="copyReferralLink"
                      >
                        <i class="fas fa-copy"></i> Copy Link
                      </button>
                    </div>
                  </div>

                  <div class="code-info">
                    <p>
                      Share this code or link with your friends to start earning
                      rewards!
                    </p>
                  </div>
                </div>

                <!-- Quick Share Buttons -->
                <div class="share-section">
                  <h4>Quick Share</h4>
                  <div class="share-buttons">
                    <button
                      class="btn btn-social btn-twitter"
                      @click="shareOnTwitter"
                    >
                      <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button
                      class="btn btn-social btn-telegram"
                      @click="shareOnTelegram"
                    >
                      <i class="fab fa-telegram"></i> Telegram
                    </button>
                    <button
                      class="btn btn-social btn-facebook"
                      @click="shareOnFacebook"
                    >
                      <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button
                      class="btn btn-social btn-whatsapp"
                      @click="shareOnWhatsApp"
                    >
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
                <div
                  v-for="referral in referrals"
                  :key="referral.id"
                  class="table-row"
                >
                  <div class="table-cell">
                    <div class="user-info">
                      <img
                        :src="referral.avatar"
                        :alt="referral.name"
                        class="user-avatar"
                      />
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
                    <span :class="['status-badge', referral.status]">{{
                      referral.status
                    }}</span>
                  </div>
                  <div class="table-cell">
                    <span class="reward-amount"
                      >+{{ referral.reward }} $PPO</span
                    >
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  v-if="referrals.length === 0"
                  class="empty-state"
                >
                  <div class="empty-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <h3>No Referrals Yet</h3>
                  <p>Start sharing your referral code to earn rewards!</p>
                  <button
                    class="btn btn-primary"
                    @click="scrollToCode"
                  >
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
                <div
                  v-for="(leader, index) in topReferrers"
                  :key="leader.id"
                  class="leaderboard-item"
                >
                  <div class="leader-rank">
                    <span class="rank-number">{{ index + 1 }}</span>
                  </div>
                  <div class="leader-info">
                    <img
                      :src="leader.avatar"
                      :alt="leader.name"
                      class="leader-avatar"
                    />
                    <div class="leader-details">
                      <h5>{{ leader.name }}</h5>
                      <p>{{ leader.referrals }} referrals</p>
                    </div>
                  </div>
                  <div class="leader-rewards">
                    <span class="reward-total"
                      >{{ leader.totalEarnings }} $PPO</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAccount } from '@wagmi/vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ReownWalletButton from '@/components/ReownWalletButton.vue'
import { useFirebase } from '@/composables/useFirebase.js'
import { useToast } from 'vue-toastification'

const router = useRouter()
const { currentUser } = useFirebase()
const { address } = useAccount()
const toast = useToast()

// Computed properties
const isWalletConnected = computed(() => !!address.value)

// State
const userReferralCode = ref('')
const isLoading = ref(false)

// Referral stats
const referralStats = ref({
  totalReferrals: 0,
  totalEarnings: 0,
  activeReferrals: 0,
  conversionRate: 0,
})

// Referrals list
const referrals = ref([])

// Top referrers - will be loaded from Firebase
const topReferrers = ref([])

// Load top referrers from Firebase
const loadTopReferrers = async () => {
  try {
    // Query Firebase for top referrers
    const { getFirestore, collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
    const db = getFirestore()
    
    const usersRef = collection(db, 'users')
    const q = query(usersRef, orderBy('referralCount', 'desc'), limit(10))
    const querySnapshot = await getDocs(q)
    
    const topReferrersList = []
    querySnapshot.forEach((doc) => {
      const userData = doc.data()
      if (userData.referralCount > 0) {
        topReferrersList.push({
          id: doc.id,
          name: userData.displayName || 'Anonymous User',
          avatar: userData.photoURL || '/src/assets/images/default-avatar.png',
          referrals: userData.referralCount || 0,
          totalEarnings: userData.referralEarnings || 0,
        })
      }
    })
    
    // If no real data, show placeholder
    if (topReferrersList.length === 0) {
      topReferrers.value = [
        {
          id: 1,
          name: 'No Top Referrers Yet',
          avatar: '/src/assets/images/default-avatar.png',
          referrals: 0,
          totalEarnings: 0,
          note: 'Top referrers will appear here once users start referring others.'
        }
      ]
    } else {
      topReferrers.value = topReferrersList
    }
  } catch (error) {
    console.error('Failed to load top referrers:', error)
    topReferrers.value = [
      {
        id: 1,
        name: 'Loading Error',
        avatar: '/src/assets/images/default-avatar.png',
        referrals: 0,
        totalEarnings: 0,
        note: 'Failed to load top referrers data.'
      }
    ]
  }
}

// Methods
const generateReferralCode = (address) => {
  if (!address) return ''
  // Generate a unique referral code based on wallet address
  const shortAddress = address.slice(2, 8).toUpperCase()
  const timestamp = Date.now().toString(36).toUpperCase()
  return `PPO${shortAddress}${timestamp}`
}

const generateReferralLink = (code) => {
  return `https://pixelpayot.com/signup?ref=${code}`
}

const loadReferralData = async () => {
  if (!address.value) return

  try {
    isLoading.value = true

    // Load user data from Firebase
    const { getUserData } = useFirebase()
    const result = await getUserData()
    
    if (result.success) {
      const userData = result.data
      
      // Use referral code from Firebase, don't generate new one
      userReferralCode.value = userData.referralCode || ''
      
      // Load real referral stats
      await loadReferralStats(userData)
      
      // Load real referrals list
      await loadReferralsList(userData)
      
      // Load top referrers
      await loadTopReferrers()
    } else {
      // Fallback to empty code if no user data
      userReferralCode.value = ''
      await loadReferralStats()
      await loadReferralsList()
      await loadTopReferrers()
    }
  } catch (error) {
    console.error('Failed to load referral data:', error)
    // Fallback to empty code
    userReferralCode.value = ''
    await loadReferralStats()
    await loadReferralsList()
    await loadTopReferrers()
  } finally {
    isLoading.value = false
  }
}

const loadReferralStats = async (userData = null) => {
  try {
    let stats = {
      totalReferrals: 0,
      totalEarnings: 0,
      activeReferrals: 0,
      conversionRate: 0,
    }

    if (userData) {
      // Use real data from Firebase
      stats = {
        totalReferrals: userData.referralCount || 0,
        totalEarnings: userData.referralEarnings || 0,
        activeReferrals: userData.referralCount || 0, // Assuming all referrals are active
        conversionRate: userData.referralCount > 0 ? 85 : 0, // Mock conversion rate
      }
    } else {
      // Fallback to mock data
      stats = {
        totalReferrals: 0,
        totalEarnings: 0,
        activeReferrals: 0,
        conversionRate: 0,
      }
    }

    referralStats.value = stats
  } catch (error) {
    console.error('Failed to load referral stats:', error)
    referralStats.value = {
      totalReferrals: 0,
      totalEarnings: 0,
      activeReferrals: 0,
      conversionRate: 0,
    }
  }
}

const loadReferralsList = async (userData = null) => {
  try {
    let referralsList = []

    if (userData && userData.referralCount > 0) {
      // Query Firebase for actual referrals
      const { getFirestore, collection, query, where, getDocs } = await import('firebase/firestore')
      const db = getFirestore()
      
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('referredBy', '==', userData.referralCode))
      const querySnapshot = await getDocs(q)
      
      querySnapshot.forEach((doc) => {
        const referredUserData = doc.data()
        referralsList.push({
          id: doc.id,
          name: referredUserData.displayName || 'Anonymous User',
          email: referredUserData.email || 'No email',
          avatar: referredUserData.photoURL || '/src/assets/images/default-avatar.png',
          joinedDate: referredUserData.createdAt ? new Date(referredUserData.createdAt.toDate()) : new Date(),
          status: 'active',
          reward: 5,
        })
      })
      
      // If no referrals found but referralCount > 0, show placeholder
      if (referralsList.length === 0) {
        referralsList = [
          {
            id: 1,
            name: 'Referral Data Loading',
            email: 'loading@example.com',
            avatar: '/src/assets/images/default-avatar.png',
            joinedDate: new Date(),
            status: 'active',
            reward: 5,
            note: `You have ${userData.referralCount} referral(s). Referral details will be displayed here.`
          }
        ]
      }
    } else {
      // No referrals yet
      referralsList = [
        {
          id: 1,
          name: 'No Referrals Yet',
          email: 'noreferrals@example.com',
          avatar: '/src/assets/images/default-avatar.png',
          joinedDate: new Date(),
          status: 'pending',
          reward: 0,
          note: 'Share your referral code to start earning rewards!'
        }
      ]
    }

    referrals.value = referralsList
  } catch (error) {
    console.error('Failed to load referrals list:', error)
    referrals.value = [
      {
        id: 1,
        name: 'Loading Error',
        email: 'error@example.com',
        avatar: '/src/assets/images/default-avatar.png',
        joinedDate: new Date(),
        status: 'error',
        reward: 0,
        note: 'Failed to load referral data.'
      }
    ]
  }
}

const copyReferralCode = async () => {
  try {
    await navigator.clipboard.writeText(userReferralCode.value)
    toast.success('Referral code copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy referral code:', error)
    toast.error('Failed to copy referral code')
  }
}

const copyReferralLink = async () => {
  try {
    const referralLink = generateReferralLink(userReferralCode.value)
    await navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy referral link:', error)
    toast.error('Failed to copy referral link')
  }
}

const shareOnTwitter = () => {
  const referralLink = generateReferralLink(userReferralCode.value)
  const text = `Join me on PixelPayot! Use my referral link and get 2 $PPO bonus!`
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(referralLink)}`
  )
}

const shareOnTelegram = () => {
  const referralLink = generateReferralLink(userReferralCode.value)
  const text = `Join me on PixelPayot! Use my referral link and get 2 $PPO bonus!`
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(text)}`
  )
}

const shareOnFacebook = () => {
  const referralLink = generateReferralLink(userReferralCode.value)
  const text = `Join me on PixelPayot! Use my referral link and get 2 $PPO bonus!`
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralLink
    )}&quote=${encodeURIComponent(text)}`
  )
}

const shareOnWhatsApp = () => {
  const referralLink = generateReferralLink(userReferralCode.value)
  const text = `Join me on PixelPayot! Use my referral link and get 2 $PPO bonus!`
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text + ' ' + referralLink)}`
  )
}

const scrollToCode = () => {
  document
    .querySelector('.referral-code-section')
    .scrollIntoView({ behavior: 'smooth' })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Watch for wallet connection changes
watch(address, (newAddress, oldAddress) => {
  if (newAddress && newAddress !== oldAddress) {
    loadReferralData()
  }
})

// Lifecycle
onMounted(async () => {
  if (isWalletConnected.value) {
    await loadReferralData()
    await loadTopReferrers()
  }
})

// Watch for wallet connection changes
watch(address, async (newAddress, oldAddress) => {
  if (newAddress !== oldAddress) {
    await loadReferralData()
  }
})

// Watch for user changes
watch(currentUser, async (newUser) => {
  if (newUser) {
    await loadReferralData()
  } else {
    // Reset data when user logs out
    userReferralCode.value = ''
    referralStats.value = {
      totalReferrals: 0,
      totalEarnings: 0,
      activeReferrals: 0,
      conversionRate: 0,
    }
    referrals.value = []
    topReferrers.value = []
  }
})
</script>

<style scoped>
.referral-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
}

/* Glass Blur Background Effects */
.referral-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 50%,
      rgba(120, 119, 198, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 119, 198, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 80%,
      rgba(119, 198, 255, 0.15) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
}

/* Referral Hero Section */
.referral-hero {
  position: relative;
  /* z-index: 1; */
  padding: 120px 0 80px;
}

.referral-header {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 60px 40px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.referral-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 20px;
  z-index: -1;
}

.referral-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(204, 0, 255, 0.3);
}

.referral-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 30px;
  font-weight: 400;
}

.referral-banner {
  background: linear-gradient(
    135deg,
    rgba(204, 0, 255, 0.1),
    rgba(102, 126, 234, 0.1)
  );
  border: 1px solid rgba(204, 0, 255, 0.2);
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
}

.banner-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
}

.banner-content p {
  color: #b0b0b0;
  margin: 0;
}

/* Wallet Notice Section */
.wallet-notice-section {
  position: relative;
  /* z-index: 1; */
  padding: 80px 0;
}

.wallet-notice-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 50px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.wallet-notice-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 20px;
  z-index: -1;
}

.notice-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.notice-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 50%;
}

.wallet-notice-card h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #ffffff;
}

.wallet-notice-card p {
  color: #b0b0b0;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

/* Referral Stats */
.referral-stats {
  position: relative;
  z-index: 1;
  padding: 60px 0;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 20px;
  z-index: -1;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
  border-color: rgba(204, 0, 255, 0.3);
}

.stat-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.stat-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 50%;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.stat-label {
  color: #b0b0b0;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

/* Referral Code Section */
.referral-code-section {
  position: relative;
  z-index: 1;
  padding: 80px 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.referral-code-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.referral-code-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 20px;
  z-index: -1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 40px;
  text-align: center;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.code-display {
  margin-bottom: 30px;
}

.code-input {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.code-input .form-control {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px 20px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;
}

.code-input .form-control:focus {
  border-color: rgba(204, 0, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.code-info p {
  color: #b0b0b0;
  text-align: center;
  margin: 0;
}

.referral-link-section {
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.referral-link-section h5 {
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
}

.link-input {
  display: flex;
  gap: 15px;
  align-items: center;
}

.link-input input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px 20px;
  color: white;
  font-size: 0.9rem;
  word-break: break-all;
  outline: none;
  transition: all 0.3s ease;
}

.link-input input:focus {
  border-color: rgba(204, 0, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.1);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: none;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-secondary:hover::before {
  opacity: 1;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(108, 117, 125, 0.3);
}

.share-section {
  text-align: center;
}

.share-section h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-social {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn-social:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
}

.btn-twitter:hover {
  background: rgba(29, 161, 242, 0.2);
}
.btn-telegram:hover {
  background: rgba(0, 136, 204, 0.2);
}
.btn-facebook:hover {
  background: rgba(66, 103, 178, 0.2);
}
.btn-whatsapp:hover {
  background: rgba(37, 211, 102, 0.2);
}

/* Referral Rewards */
.referral-rewards {
  position: relative;
  z-index: 1;
  padding: 80px 0;
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.reward-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.reward-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 20px;
  z-index: -1;
}

.reward-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(204, 0, 255, 0.2);
  border-color: rgba(204, 0, 255, 0.3);
}

.reward-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.reward-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 50%;
}

.reward-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #ffffff;
}

.reward-card p {
  color: #b0b0b0;
  margin: 0;
}

/* Referral List */
.referral-list {
  position: relative;
  z-index: 1;
  padding: 80px 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.referral-table {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  font-weight: 600;
  color: #ffffff;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.table-row:last-child {
  border-bottom: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details h5 {
  margin: 0;
  font-weight: 600;
  color: #ffffff;
}

.user-details small {
  color: #b0b0b0;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: linear-gradient(135deg, #34d399, #10b981);
  color: white;
}

.status-badge.pending {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.reward-amount {
  color: #34d399;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
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
  color: #ffffff;
}

.empty-state p {
  color: #b0b0b0;
  margin-bottom: 30px;
}

/* Referral Leaderboard */
.referral-leaderboard {
  position: relative;
  z-index: 1;
  padding: 80px 0;
}

.leaderboard {
  max-width: 600px;
  margin: 0 auto;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.leaderboard-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 15px;
  z-index: -1;
}

.leaderboard-item:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 25px rgba(204, 0, 255, 0.2);
  border-color: rgba(204, 0, 255, 0.3);
}

.leader-rank {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  position: relative;
  overflow: hidden;
}

.leader-rank::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 50%;
}

.rank-number {
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
  margin: 0;
  font-weight: 600;
  color: #ffffff;
}

.leader-details p {
  margin: 0;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.leader-rewards {
  font-weight: 600;
  color: #34d399;
}

/* Responsive Design */
@media (max-width: 768px) {
  .referral-title {
    font-size: 2.5rem;
  }

  .referral-header {
    padding: 40px 20px;
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .code-input {
    flex-direction: column;
  }

  .share-buttons {
    flex-direction: column;
  }

  .btn-social {
    min-width: auto;
  }

  .rewards-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card,
.reward-card,
.leaderboard-item {
  animation: fadeInUp 0.6s ease forwards;
}

.stat-card:nth-child(1) {
  animation-delay: 0.1s;
}
.stat-card:nth-child(2) {
  animation-delay: 0.2s;
}
.stat-card:nth-child(3) {
  animation-delay: 0.3s;
}
.stat-card:nth-child(4) {
  animation-delay: 0.4s;
}

.reward-card:nth-child(1) {
  animation-delay: 0.5s;
}
.reward-card:nth-child(2) {
  animation-delay: 0.6s;
}
.reward-card:nth-child(3) {
  animation-delay: 0.7s;
}
</style>
