<template>
  <div class="investment-page">
    <Header />
    
    <!-- Investment Hero Section -->
    <section class="investment-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="investment-header text-center">
              <h1 class="investment-title">Investment & Staking</h1>
              <p class="investment-subtitle">Grow your $PPO tokens through staking and yield farming</p>
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
                <i class="fas fa-wallet"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalStaked }}</h3>
                <p class="stat-label">Total Staked</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalEarned }}</h3>
                <p class="stat-label">Total Earned</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.apy }}%</h3>
                <p class="stat-label">Average APY</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalStakers }}</h3>
                <p class="stat-label">Total Stakers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Investment Stats (Only when wallet connected) -->
    <section v-if="isWalletConnected" class="personal-stats padding-large bg-gradient">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Your Investment Summary</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card personal">
              <div class="stat-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ personalStats.totalStaked }}</h3>
                <p class="stat-label">Your Total Staked</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card personal">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ personalStats.totalEarned }}</h3>
                <p class="stat-label">Your Total Earned</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card personal">
              <div class="stat-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ personalStats.apy }}%</h3>
                <p class="stat-label">Your Average APY</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card personal">
              <div class="stat-icon">
                <i class="fas fa-coins"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userBalance }}</h3>
                <p class="stat-label">Available Balance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Staking Pools -->
    <section class="staking-pools padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Staking Pools</h2>
            <div class="pools-grid">
              <div v-for="pool in stakingPools" :key="pool.id" class="pool-card">
                <div class="pool-header">
                  <div class="pool-icon">
                    <i :class="pool.icon"></i>
                  </div>
                  <div class="pool-info">
                    <h3 class="pool-name">{{ pool.name }}</h3>
                    <p class="pool-description">{{ pool.description }}</p>
                  </div>
                  <div class="pool-status" :class="pool.status">
                    {{ pool.status }}
                  </div>
                </div>
                
                <div class="pool-stats">
                  <div class="stat-row">
                    <span class="stat-label">APY</span>
                    <span class="stat-value">{{ pool.apy }}%</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Lock Period</span>
                    <span class="stat-value">{{ pool.lockPeriod }}</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Min Stake</span>
                    <span class="stat-value">{{ pool.minStake }} PPO</span>
                  </div>
                  <div class="stat-row">
                    <span class="stat-label">Total Staked</span>
                    <span class="stat-value">{{ pool.totalStaked }} PPO</span>
                  </div>
                </div>
                
                <div class="pool-actions">
                  <button 
                    class="btn btn-linear"
                    @click="openStakeModal(pool)"
                    :disabled="pool.status === 'coming-soon'"
                  >
                    <i class="fas fa-lock me-2"></i>Stake Now
                  </button>
                  <button 
                    class="btn btn-outline-linear"
                    @click="viewPoolDetails(pool.id)"
                  >
                    <i class="fas fa-info-circle me-2"></i>Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Investments -->
    <!-- <section class="my-investments padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">My Investments</h2>
            <div v-if="myStakes.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>No Active Stakes</h3>
              <p>Start staking your $PPO tokens to earn rewards</p>
              <button class="btn btn-linear" @click="scrollToPools">
                <i class="fas fa-arrow-down me-2"></i>View Staking Pools
              </button>
            </div>
            
            <div v-else class="stakes-list">
              <div v-for="stake in myStakes" :key="stake.id" class="stake-item">
                <div class="stake-info">
                  <div class="stake-pool">
                    <h4>{{ stake.poolName }}</h4>
                    <span class="stake-date">Staked on {{ formatDate(stake.stakeDate) }}</span>
                  </div>
                  <div class="stake-amount">
                    <span class="amount">{{ stake.amount }} PPO</span>
                    <span class="earned">+{{ stake.earned }} PPO earned</span>
                  </div>
                  <div class="stake-progress">
                    <div class="progress-bar">
                      <div 
                        class="progress-fill" 
                        :style="{ width: stake.progress + '%' }"
                      ></div>
                    </div>
                    <span class="progress-text">{{ stake.progress }}% complete</span>
                  </div>
                </div>
                
                <div class="stake-actions">
                  <button 
                    class="btn btn-linear btn-sm"
                    @click="claimRewards(stake.id)"
                    :disabled="stake.earned === 0"
                  >
                    <i class="fas fa-gift me-2"></i>Claim Rewards
                  </button>
                  <button 
                    class="btn btn-outline-linear btn-sm"
                    @click="unstake(stake.id)"
                    :disabled="stake.progress < 100"
                  >
                    <i class="fas fa-unlock me-2"></i>Unstake
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Yield Farming -->
    <!-- <section class="yield-farming padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Yield Farming</h2>
            <div class="farming-grid">
              <div v-for="farm in yieldFarms" :key="farm.id" class="farm-card">
                <div class="farm-header">
                  <div class="farm-tokens">
                    <img :src="farm.token1Icon" :alt="farm.token1" class="token-icon">
                    <img :src="farm.token2Icon" :alt="farm.token2" class="token-icon">
                  </div>
                  <div class="farm-info">
                    <h4>{{ farm.token1 }}/{{ farm.token2 }}</h4>
                    <p>{{ farm.description }}</p>
                  </div>
                </div>
                
                <div class="farm-stats">
                  <div class="stat-item">
                    <span class="stat-label">APY</span>
                    <span class="stat-value">{{ farm.apy }}%</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">TVL</span>
                    <span class="stat-value">${{ farm.tvl }}M</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Rewards</span>
                    <span class="stat-value">{{ farm.rewards }}</span>
                  </div>
                </div>
                
                <div class="farm-actions">
                  <button class="btn btn-linear btn-sm" @click="addLiquidity(farm.id)">
                    <i class="fas fa-plus me-2"></i>Add Liquidity
                  </button>
                  <button class="btn btn-outline-linear btn-sm" @click="viewFarm(farm.id)">
                    <i class="fas fa-eye me-2"></i>View Farm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Investment History -->
    <!-- <section class="investment-history padding-large">
      <div class="container">
      <div class="row">
        <div class="col-12">
            <h2 class="section-title text-center mb-5">Investment History</h2>
            <div class="history-table">
              <div class="table-header">
                <div class="header-cell">Date</div>
                <div class="header-cell">Type</div>
                <div class="header-cell">Amount</div>
                <div class="header-cell">Status</div>
                <div class="header-cell">Actions</div>
              </div>
              <div v-for="transaction in investmentHistory" :key="transaction.id" class="table-row">
                <div class="table-cell">{{ formatDate(transaction.date) }}</div>
                <div class="table-cell">
                  <span class="transaction-type" :class="transaction.type">
                    {{ transaction.type }}
                  </span>
                </div>
                <div class="table-cell">{{ transaction.amount }} PPO</div>
                <div class="table-cell">
                  <span class="status-badge" :class="transaction.status">
                    {{ transaction.status }}
                  </span>
                </div>
                <div class="table-cell">
                  <button class="btn-link" @click="viewTransaction(transaction.id)">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Staking Modal -->
    <div v-if="showStakeModal" class="modal-overlay" @click="closeStakeModal">
      <div class="staking-modal" @click.stop>
        <div class="modal-header">
          <h3>Stake {{ selectedPool?.name }}</h3>
          <button class="close-btn" @click="closeStakeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="stake-form">
            <div class="form-group">
              <label>Amount to Stake</label>
              <div class="input-group">
                <input 
                  v-model="stakeAmount"
                  type="number"
                  class="form-control"
                  placeholder="Enter amount"
                  min="0"
                >
                <span class="input-suffix">PPO</span>
              </div>
              <div class="balance-info">
                <span>Available: {{ userBalance }} PPO</span>
                <button class="btn-link" @click="setMaxAmount">Max</button>
              </div>
            </div>
            
            <div class="stake-preview">
              <div class="preview-item">
                <span>APY:</span>
                <span>{{ selectedPool?.apy }}%</span>
              </div>
              <div class="preview-item">
                <span>Lock Period:</span>
                <span>{{ selectedPool?.lockPeriod }}</span>
              </div>
              <div class="preview-item">
                <span>Estimated Rewards (30 days):</span>
                <span>{{ estimatedRewards }} PPO</span>
              </div>
            </div>
            
            <button 
              class="btn btn-linear btn-large w-100"
              @click="confirmStake"
              :disabled="!canStake"
            >
              <i class="fas fa-lock me-2"></i>Confirm Stake
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="toast-notification" :class="toastType">
      <div class="toast-content">
        <i :class="getToastIcon()" class="toast-icon"></i>
        <span class="toast-message">{{ toastMessage }}</span>
        <button class="toast-close" @click="closeToast">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWeb3 } from '../composables/useWeb3.js'
import { useFirebase } from '@/composables/useFirebase.js'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const { currentUser, getUserData } = useFirebase()

// Use Web3 composable for wallet connection
const {
  isWalletConnected,
  walletAddress,
  connectWallet
} = useWeb3()

// State
const showStakeModal = ref(false)
const selectedPool = ref(null)
const stakeAmount = ref('')
const userBalance = ref(0)

// Toast notification state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('info')

// Investment stats - make personal numbers conditional
const investmentStats = ref({
  totalStaked: '2,450,000',
  totalEarned: '125,000',
  apy: '15.8',
  totalStakers: '12,450'
})

// Personal stats - only show when wallet connected
const personalStats = computed(() => {
  if (!isWalletConnected.value) {
    return {
      totalStaked: '0',
      totalEarned: '0',
      apy: '0',
      totalStakers: '0'
    }
  }
  return {
    totalStaked: '45,000',
    totalEarned: '2,500',
    apy: '15.8',
    totalStakers: '1'
  }
})

// Staking pools
const stakingPools = ref([
  {
    id: 1,
    name: 'Flexible Staking',
    description: 'Stake and unstake anytime with no lock period',
    icon: 'fas fa-unlock',
    apy: 8.5,
    lockPeriod: 'No lock',
    minStake: 100,
    totalStaked: '850,000',
    status: 'active'
  },
  {
    id: 2,
    name: '30-Day Lock',
    description: 'Lock your tokens for 30 days for higher rewards',
    icon: 'fas fa-lock',
    apy: 12.5,
    lockPeriod: '30 days',
    minStake: 500,
    totalStaked: '1,200,000',
    status: 'active'
  },
  {
    id: 3,
    name: '90-Day Lock',
    description: 'Long-term staking with maximum rewards',
    icon: 'fas fa-lock',
    apy: 18.5,
    lockPeriod: '90 days',
    minStake: 1000,
    totalStaked: '400,000',
    status: 'active'
  }
])

// Yield farms
const yieldFarms = ref([
  {
    id: 1,
    token1: 'PPO',
    token2: 'BNB',
    token1Icon: '/src/assets/images/ppo-icon.png',
    token2Icon: '/src/assets/images/bnb-icon.png',
    description: 'PPO-BNB Liquidity Pool',
    apy: 25.5,
    tvl: '2.5M PPO',
    rewards: 'PPO + BNB'
  },
  {
    id: 2,
    token1: 'PPO',
    token2: 'USDT',
    token1Icon: '/src/assets/images/ppo-icon.png',
    token2Icon: '/src/assets/images/usdt-icon.png',
    description: 'PPO-USDT Liquidity Pool',
    apy: 22.8,
    tvl: '1.8M PPO',
    rewards: 'PPO + USDT'
  }
])

// Investment history
const investmentHistory = ref([
  {
    id: 1,
    date: '2024-01-15',
    type: 'stake',
    amount: 1000,
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-01-10',
    type: 'unstake',
    amount: 500,
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-01-05',
    type: 'reward',
    amount: 25,
    status: 'completed'
  }
])

// Computed properties
const estimatedRewards = computed(() => {
  if (!stakeAmount.value || !selectedPool.value) return 0
  const amount = parseFloat(stakeAmount.value)
  const apy = selectedPool.value.apy
  return ((amount * apy) / 100 / 12).toFixed(2)
})

const canStake = computed(() => {
  if (!isWalletConnected.value) return false
  if (!stakeAmount.value || parseFloat(stakeAmount.value) <= 0) return false
  if (parseFloat(stakeAmount.value) > userBalance.value) return false
  if (parseFloat(stakeAmount.value) < selectedPool.value?.minStake) return false
  return true
})

// Methods
const showToastMessage = (message, type = 'info') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    showToast.value = false
  }, 5000)
}

const closeToast = () => {
  showToast.value = false
}

const getToastIcon = () => {
  switch (toastType.value) {
    case 'success':
      return 'fas fa-check-circle'
    case 'warning':
      return 'fas fa-exclamation-triangle'
    case 'error':
      return 'fas fa-times-circle'
    default:
      return 'fas fa-info-circle'
  }
}

const openStakeModal = (pool) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first to stake tokens', 'warning')
    return
  }
  
  selectedPool.value = pool
  showStakeModal.value = true
  stakeAmount.value = ''
}

const closeStakeModal = () => {
  showStakeModal.value = false
  selectedPool.value = null
  stakeAmount.value = ''
}

const setMaxAmount = () => {
  stakeAmount.value = userBalance.value.toString()
}

const confirmStake = () => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first', 'warning')
    return
  }
  
  if (!canStake.value) {
    showToastMessage('Please check your stake amount and balance', 'warning')
    return
  }
  
  // Simulate staking
  console.log('Staking:', {
    pool: selectedPool.value.name,
    amount: stakeAmount.value,
    wallet: walletAddress.value
  })
  
  // Update user balance
  userBalance.value -= parseFloat(stakeAmount.value)
  
  // Close modal
  closeStakeModal()
  
  // Show success message
  showToastMessage('Staking successful!', 'success')
}

const addLiquidity = (farmId) => {
  if (!isWalletConnected.value) {
    showToastMessage('Please connect your wallet first to add liquidity', 'warning')
    return
  }
  
  console.log('Adding liquidity to farm:', farmId)
  // Implement liquidity addition logic
}

const viewFarm = (farmId) => {
  console.log('Viewing farm:', farmId)
  // Navigate to farm details
}

const viewTransaction = (transactionId) => {
  console.log('Viewing transaction:', transactionId)
  // Show transaction details
}

const viewPoolDetails = (poolId) => {
  console.log('Viewing pool details:', poolId)
  // Navigate to pool details page
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  console.log('Investment component mounted')
  
  // Load user data if authenticated
  if (currentUser.value) {
    const userData = await getUserData()
    if (userData) {
      userBalance.value = userData.balance || 0
    }
  }
})
</script>

<style scoped>
.investment-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
}

/* Glass Blur Background Effects */
.investment-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.15) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Investment Hero Section */
.investment-hero {
  position: relative;
  z-index: 1;
  padding: 120px 0 80px;
}

.investment-header {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 60px 40px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.investment-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  z-index: -1;
}

.investment-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(204, 0, 255, 0.3);
}

.investment-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 0;
  font-weight: 400;
}

/* Investment Overview */
.investment-overview {
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
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

/* Staking Pools */
.staking-pools {
  position: relative;
  z-index: 1;
  padding: 80px 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 60px;
  text-align: center;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.pool-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  z-index: -1;
}

.pool-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(204, 0, 255, 0.2);
  border-color: rgba(204, 0, 255, 0.3);
}

.pool-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.pool-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-right: 20px;
  position: relative;
  overflow: hidden;
}

.pool-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border-radius: 15px;
}

.pool-info {
  flex: 1;
}

.pool-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;
}

.pool-description {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin: 0;
}

.pool-status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.pool-status.active {
  background: linear-gradient(135deg, #34d399, #10b981);
  color: white;
}

.pool-status.coming-soon {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

.pool-stats {
  margin-bottom: 25px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-row .stat-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.stat-row .stat-value {
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
}

.pool-actions {
  display: flex;
  gap: 15px;
}

.btn-stake {
  flex: 1;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-stake::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-stake:hover::before {
  opacity: 1;
}

.btn-stake:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-details {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-details:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .investment-title {
    font-size: 2.5rem;
  }
  
  .investment-header {
    padding: 40px 20px;
  }
  
  .pools-grid {
    grid-template-columns: 1fr;
  }
  
  .pool-card {
    padding: 20px;
  }
  
  .stat-card {
    padding: 20px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  /* Mobile wallet connection fixes */
  .pool-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-stake,
  .btn-details {
    width: 100%;
    padding: 15px 20px;
    font-size: 1rem;
  }
  
  /* Ensure wallet connection works properly on mobile */
  .staking-modal {
    margin: 20px;
    max-width: calc(100% - 40px);
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .form-control {
    font-size: 1rem;
    padding: 15px;
  }
  
  .btn-linear {
    padding: 15px 20px;
    font-size: 1rem;
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
.pool-card {
  animation: fadeInUp 0.6s ease forwards;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

.pool-card:nth-child(1) { animation-delay: 0.5s; }
.pool-card:nth-child(2) { animation-delay: 0.6s; }
.pool-card:nth-child(3) { animation-delay: 0.7s; }

/* Personal Stats Section */
.personal-stats {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card.personal {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
}

.stat-card.personal .stat-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-card.personal .stat-value {
  color: #667eea;
}

/* Toast Notification Styles */
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  animation: slideInRight 0.3s ease;
}

.toast-notification.success {
  background: linear-gradient(135deg, #28a745, #20c997);
  border-left: 4px solid #155724;
}

.toast-notification.warning {
  background: linear-gradient(135deg, #ffc107, #fd7e14);
  border-left: 4px solid #856404;
}

.toast-notification.error {
  background: linear-gradient(135deg, #dc3545, #e83e8c);
  border-left: 4px solid #721c24;
}

.toast-notification.info {
  background: linear-gradient(135deg, #17a2b8, #6f42c1);
  border-left: 4px solid #0c5460;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.toast-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  color: white;
}

.toast-message {
  flex: 1;
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-left: 12px;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile responsive for toast */
@media (max-width: 768px) {
  .toast-notification {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .toast-content {
    padding: 14px 16px;
  }
  
  .toast-message {
    font-size: 0.9rem;
  }
}
</style>
