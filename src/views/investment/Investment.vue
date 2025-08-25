<template>
  <div class="investment-page">
    <Header />
    
    <!-- Investment Hero Section -->
    <section class="investment-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="investment-header text-center">
              <h1 class="investment-title">Investment</h1>
              <!-- <p class="investment-subtitle">Grow your $PPO tokens through staking and yield farming</p> -->
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

    <!-- Staking Pools -->
    <section class="staking-pools padding-large bg-dark relative">
      <button
        class="absolute top-4 right-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg z-10"
        @click="showMysteryBox = true"
      >
        Invest
      </button>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">My NFTs</h2>
            <div class="pools-grid">
              <InvestNFTCard
                v-for="nft in nftPackages"
                :key="nft.tier + '-' + nft.startTime"
                :nft="nft"
              />
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

    <!-- Mystery Box -->
    <Dialog :open="showMysteryBox" @close="showMysteryBox = false">
      <MysteryBox @minted="loadUserNFTs" />
    </Dialog>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.js'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MysteryBox from '@/views/investment/MysteryBox.vue'
import Dialog from '@/components/Dialog.vue'
import InvestNFTCard from './InvestNFTCard.vue'
import { readContract } from "@wagmi/core";
import { useAccount, useChainId } from "@wagmi/vue";
import { ppoPackageAbi } from "@/abis/ppoPackage.js";
import { useContractAddress } from "@/composables/useContractAddress";
import { wagmiConfig } from '../../config/wagmi'

const router = useRouter()
const { currentUser, getUserData } = useFirebase()

// State
const showStakeModal = ref(false)
const showMysteryBox = ref(false)
const selectedPool = ref(null)
const stakeAmount = ref('')
const userBalance = ref(0)

const nftPackages = ref([]);
const { address } = useAccount();
const { ppoPackageAddress } = useContractAddress(); // Địa chỉ contract
const chainId = useChainId();

// Investment stats
const investmentStats = ref({
  totalStaked: '2,450,000',
  totalEarned: '125,000',
  apy: '15.8',
  totalStakers: '12,450'
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
  },
  {
    id: 4,
    name: 'VIP Staking',
    description: 'Exclusive staking for large holders',
    icon: 'fas fa-crown',
    apy: 25.0,
    lockPeriod: '180 days',
    minStake: 10000,
    totalStaked: '0',
    status: 'coming-soon'
  }
])

// My stakes
const myStakes = ref([
  {
    id: 1,
    poolName: 'Flexible Staking',
    amount: 500,
    earned: 12.5,
    stakeDate: new Date('2024-01-15'),
    progress: 100
  },
  {
    id: 2,
    poolName: '30-Day Lock',
    amount: 1000,
    earned: 45.2,
    stakeDate: new Date('2024-02-01'),
    progress: 75
  }
])

// Yield farms
const yieldFarms = ref([
  {
    id: 1,
    token1: 'PPO',
    token2: 'ETH',
    token1Icon: '/src/assets/images/ppo-icon.png',
    token2Icon: '/src/assets/images/eth-icon.png',
    description: 'PPO/ETH liquidity pool',
    apy: 45.2,
    tvl: 2.5,
    rewards: 'PPO + ETH'
  },
  {
    id: 2,
    token1: 'PPO',
    token2: 'USDT',
    token1Icon: '/src/assets/images/ppo-icon.png',
    token2Icon: '/src/assets/images/usdt-icon.png',
    description: 'PPO/USDT liquidity pool',
    apy: 38.7,
    tvl: 1.8,
    rewards: 'PPO + USDT'
  }
])

// Investment history
const investmentHistory = ref([
  {
    id: 1,
    date: new Date('2024-02-15'),
    type: 'stake',
    amount: 500,
    status: 'completed'
  },
  {
    id: 2,
    date: new Date('2024-02-10'),
    type: 'unstake',
    amount: 250,
    status: 'completed'
  },
  {
    id: 3,
    date: new Date('2024-02-05'),
    type: 'claim',
    amount: 12.5,
    status: 'completed'
  }
])

// Computed
const estimatedRewards = computed(() => {
  if (!selectedPool.value || !stakeAmount.value) return 0
  const amount = parseFloat(stakeAmount.value)
  const apy = selectedPool.value.apy
  return ((amount * apy) / 100 / 12).toFixed(2)
})

const canStake = computed(() => {
  if (!selectedPool.value || !stakeAmount.value) return false
  const amount = parseFloat(stakeAmount.value)
  return amount >= selectedPool.value.minStake && amount <= userBalance.value
})

// Methods
const openStakeModal = (pool) => {
  selectedPool.value = pool
  stakeAmount.value = ''
  showStakeModal.value = true
}

const closeStakeModal = () => {
  showStakeModal.value = false
  selectedPool.value = null
  stakeAmount.value = ''
}

const setMaxAmount = () => {
  stakeAmount.value = userBalance.value.toString()
}

const loadUserNFTs = async () => {
  if (!address.value) return;
  try {
    const result = await readContract(wagmiConfig, {
      address: ppoPackageAddress.value,
      abi: ppoPackageAbi,
      functionName: "getPackagesOfOwner",
      args: [address.value],
      chainId: chainId.value,
    });

    console.log("User NFTs:", result);
    nftPackages.value = result;
  } catch (err) {
    console.error("Error loading NFTs:", err);
  }
};

const confirmStake = async () => {
  if (!canStake.value) return
  
  try {
    // Mock staking - in real app, this would call smart contract
    console.log(`Staking ${stakeAmount.value} PPO in ${selectedPool.value.name}`)
    
    // Add to my stakes
    myStakes.value.push({
      id: Date.now(),
      poolName: selectedPool.value.name,
      amount: parseFloat(stakeAmount.value),
      earned: 0,
      stakeDate: new Date(),
      progress: 0
    })
    
    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: 'stake',
      amount: parseFloat(stakeAmount.value),
      status: 'completed'
    })
    
    closeStakeModal()
    
  } catch (error) {
    console.error('Staking failed:', error)
  }
}

const claimRewards = (stakeId) => {
  const stake = myStakes.value.find(s => s.id === stakeId)
  if (stake && stake.earned > 0) {
    console.log(`Claiming ${stake.earned} PPO rewards`)
    stake.earned = 0
    
    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: 'claim',
      amount: stake.earned,
      status: 'completed'
    })
  }
}

const unstake = (stakeId) => {
  const stakeIndex = myStakes.value.findIndex(s => s.id === stakeId)
  if (stakeIndex !== -1) {
    const stake = myStakes.value[stakeIndex]
    console.log(`Unstaking ${stake.amount} PPO`)
    
    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: 'unstake',
      amount: stake.amount,
      status: 'completed'
    })
    
    // Remove from my stakes
    myStakes.value.splice(stakeIndex, 1)
  }
}

const viewPoolDetails = (poolId) => {
  // router.push(`/investment/pool/${poolId}`)
}

const addLiquidity = (farmId) => {
  router.push(`/investment/farm/${farmId}`)
}

const viewFarm = (farmId) => {
  router.push(`/investment/farm/${farmId}`)
}

const viewTransaction = (txId) => {
  console.log(`Viewing transaction ${txId}`)
}

const scrollToPools = () => {
  const poolsSection = document.querySelector('.staking-pools')
  if (poolsSection) {
    poolsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// Load user data
const loadUserData = async () => {
  if (currentUser.value) {
    try {
      const result = await getUserData()
      if (result.success) {
        userBalance.value = result.data.tokenBalance || 0
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
    }
  }
}

onMounted(() => {
  loadUserData()
  loadUserNFTs()
})

watch(address, loadUserNFTs);

</script>

<style scoped>
.investment-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.investment-hero {
  padding-top: 120px;
  padding-bottom: 80px;
}

.investment-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.investment-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
}

.investment-overview {
  padding: 0 0 60px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: white;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #cc00ff;
  margin-bottom: 10px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.staking-pools {
  background: rgba(0, 0, 0, 0.3);
}

.staking-pools .section-title {
  color: white;
  padding: 0 0 40px;
}

.pools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: white;
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
}

.empty-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 30px;
}

.stakes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stake-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
}

.stake-info {
  flex: 1;
}

.stake-pool h4 {
  margin-bottom: 5px;
  color: white;
}

.stake-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.stake-amount {
  margin: 15px 0;
}

.amount {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #cc00ff;
}

.earned {
  color: #51cf66;
  font-size: 0.9rem;
}

.stake-progress {
  margin-top: 15px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.stake-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.yield-farming {
  background: rgba(0, 0, 0, 0.3);
}

.farming-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.farm-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.farm-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.farm-tokens {
  display: flex;
  align-items: center;
}

.token-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
}

.token-icon:last-child {
  margin-left: -10px;
}

.farm-info h4 {
  color: white;
  margin-bottom: 5px;
}

.farm-info p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.farm-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .stat-label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.stat-item .stat-value {
  color: #cc00ff;
  font-weight: 600;
}

.farm-actions {
  display: flex;
  gap: 10px;
}

.history-table {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 80px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  color: white;
  font-weight: 600;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 80px;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.transaction-type {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.transaction-type.stake {
  background: rgba(81, 207, 102, 0.2);
  color: #51cf66;
}

.transaction-type.unstake {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.transaction-type.claim {
  background: rgba(255, 212, 59, 0.2);
  color: #ffd43b;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.completed {
  background: rgba(81, 207, 102, 0.2);
  color: #51cf66;
}

.status-badge.pending {
  background: rgba(255, 212, 59, 0.2);
  color: #ffd43b;
}

.btn-link {
  background: none;
  border: none;
  color: #cc00ff;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-link:hover {
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.staking-modal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.form-control {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px;
  color: white;
  font-size: 16px;
}

.form-control:focus {
  outline: none;
}

.input-suffix {
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.stake-preview {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.preview-item:last-child {
  margin-bottom: 0;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .investment-title {
    font-size: 2.5rem;
  }
  
  .pools-grid {
    grid-template-columns: 1fr;
  }
  
  .stake-item {
    flex-direction: column;
    text-align: center;
  }
  
  .farming-grid {
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>
