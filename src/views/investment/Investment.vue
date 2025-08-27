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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalNfts }}</h3>
                <p class="stat-label">Total NFTs</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ investmentStats.totalMyNfts }}</h3>
                <p class="stat-label">Total My NFTs</p>
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-3 col-md-6 mb-4">
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
          </div> -->
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
      <div class="container relative">
        <div class="flex justify-end md:mb-[-80px]">
          <button
            class="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg z-10"
            @click="showMysteryBox = true"
          >
            Invest
          </button>
        </div>
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">My NFTs</h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
            >
              <InvestNFTCard
                v-for="nft in nftPackages"
                :key="nft.tier + '-' + nft.startTime"
                :nft="nft"
                @claimed="loadUserNFTs"
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
                />
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
    <!-- <div v-if="showToast" class="toast-notification" :class="toastType">
      <div class="toast-content">
        <i :class="getToastIcon()" class="toast-icon"></i>
        <span class="toast-message">{{ toastMessage }}</span>
        <button class="toast-close" @click="closeToast">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div> -->
    <!-- Mystery Box -->
    <Dialog :open="showMysteryBox" @close="showMysteryBox = false">
      <MysteryBox @minted="loadUserNFTs" />
    </Dialog>

    <Footer />
  </div>
</template>

<script setup>
// import { ref, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import { useWeb3 } from '../composables/useWeb3.js'
// import { useFirebase } from '@/composables/useFirebase.js'
// import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useFirebase } from "@/composables/useFirebase.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import MysteryBox from "@/views/investment/MysteryBox.vue";
import Dialog from "@/components/Dialog.vue";
import InvestNFTCard from "./InvestNFTCard.vue";
import { readContract } from "@wagmi/core";
import { useAccount, useChainId } from "@wagmi/vue";
import { ppoPackageAbi } from "@/abis/ppoPackage.js";
import { useContractAddress } from "@/composables/useContractAddress";
import { wagmiConfig } from "../../config/wagmi";

const router = useRouter();
const { currentUser, getUserData } = useFirebase();

// Use Web3 composable for wallet connection
const {
  isWalletConnected,
  walletAddress,
  connectWallet
} = useWeb3()

// State
const showStakeModal = ref(false);
const showMysteryBox = ref(false);
const selectedPool = ref(null);
const stakeAmount = ref("");
const userBalance = ref(0);

const nftPackages = ref([]);
const { address } = useAccount();
const { ppoPackageAddress } = useContractAddress(); // Địa chỉ contract
const chainId = useChainId();

// Toast notification state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('info')

// Investment stats - make personal numbers conditional
const investmentStats = ref({
  totalNfts: "-",
  totalMyNfts: "-",
  totalEarned: "125,000",
  apy: "15.8",
  totalStakers: "12,450",
});

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
    name: "Flexible Staking",
    description: "Stake and unstake anytime with no lock period",
    icon: "fas fa-unlock",
    apy: 8.5,
    lockPeriod: "No lock",
    minStake: 100,
    totalStaked: "850,000",
    status: "active",
  },
  {
    id: 2,
    name: "30-Day Lock",
    description: "Lock your tokens for 30 days for higher rewards",
    icon: "fas fa-lock",
    apy: 12.5,
    lockPeriod: "30 days",
    minStake: 500,
    totalStaked: "1,200,000",
    status: "active",
  },
  {
    id: 3,
    name: "90-Day Lock",
    description: "Long-term staking with maximum rewards",
    icon: "fas fa-lock",
    apy: 18.5,
    lockPeriod: "90 days",
    minStake: 1000,
//     totalStaked: '400,000',
//     status: 'active'
//   }
// ])
    totalStaked: "400,000",
    status: "active",
  },
  {
    id: 4,
    name: "VIP Staking",
    description: "Exclusive staking for large holders",
    icon: "fas fa-crown",
    apy: 25.0,
    lockPeriod: "180 days",
    minStake: 10000,
    totalStaked: "0",
    status: "coming-soon",
  },
]);

// My stakes
const myStakes = ref([
  {
    id: 1,
    poolName: "Flexible Staking",
    amount: 500,
    earned: 12.5,
    stakeDate: new Date("2024-01-15"),
    progress: 100,
  },
  {
    id: 2,
    poolName: "30-Day Lock",
    amount: 1000,
    earned: 45.2,
    stakeDate: new Date("2024-02-01"),
    progress: 75,
  },
]);

// Yield farms
const yieldFarms = ref([
  {
    id: 1,
//     token1: 'PPO',
//     token2: 'BNB',
//     token1Icon: '/src/assets/images/ppo-icon.png',
//     token2Icon: '/src/assets/images/bnb-icon.png',
//     description: 'PPO-BNB Liquidity Pool',
//     apy: 25.5,
//     tvl: '2.5M PPO',
//     rewards: 'PPO + BNB'
//   },
//   {
//     id: 2,
//     token1: 'PPO',
//     token2: 'USDT',
//     token1Icon: '/src/assets/images/ppo-icon.png',
//     token2Icon: '/src/assets/images/usdt-icon.png',
//     description: 'PPO-USDT Liquidity Pool',
//     apy: 22.8,
//     tvl: '1.8M PPO',
//     rewards: 'PPO + USDT'
//   }
// ])
    token1: "PPO",
    token2: "ETH",
    token1Icon: "/src/assets/images/ppo-icon.png",
    token2Icon: "/src/assets/images/eth-icon.png",
    description: "PPO/ETH liquidity pool",
    apy: 45.2,
    tvl: 2.5,
    rewards: "PPO + ETH",
  },
  {
    id: 2,
    token1: "PPO",
    token2: "USDT",
    token1Icon: "/src/assets/images/ppo-icon.png",
    token2Icon: "/src/assets/images/usdt-icon.png",
    description: "PPO/USDT liquidity pool",
    apy: 38.7,
    tvl: 1.8,
    rewards: "PPO + USDT",
  },
]);

// Investment history
const investmentHistory = ref([
  {
    id: 1,
//     date: '2024-01-15',
//     type: 'stake',
//     amount: 1000,
//     status: 'completed'
//   },
//   {
//     id: 2,
//     date: '2024-01-10',
//     type: 'unstake',
//     amount: 500,
//     status: 'completed'
//   },
//   {
//     id: 3,
//     date: '2024-01-05',
//     type: 'reward',
//     amount: 25,
//     status: 'completed'
//   }
// ])
    date: new Date("2024-02-15"),
    type: "stake",
    amount: 500,
    status: "completed",
  },
  {
    id: 2,
    date: new Date("2024-02-10"),
    type: "unstake",
    amount: 250,
    status: "completed",
  },
  {
    id: 3,
    date: new Date("2024-02-05"),
    type: "claim",
    amount: 12.5,
    status: "completed",
  },
]);

// Computed properties
const estimatedRewards = computed(() => {
//   if (!stakeAmount.value || !selectedPool.value) return 0
//   const amount = parseFloat(stakeAmount.value)
//   const apy = selectedPool.value.apy
//   return ((amount * apy) / 100 / 12).toFixed(2)
// })

// const canStake = computed(() => {
//   if (!isWalletConnected.value) return false
//   if (!stakeAmount.value || parseFloat(stakeAmount.value) <= 0) return false
//   if (parseFloat(stakeAmount.value) > userBalance.value) return false
//   if (parseFloat(stakeAmount.value) < selectedPool.value?.minStake) return false
//   return true
// })
  if (!selectedPool.value || !stakeAmount.value) return 0;
  const amount = parseFloat(stakeAmount.value);
  const apy = selectedPool.value.apy;
  return ((amount * apy) / 100 / 12).toFixed(2);
});

const canStake = computed(() => {
  if (!selectedPool.value || !stakeAmount.value) return false;
  const amount = parseFloat(stakeAmount.value);
  return amount >= selectedPool.value.minStake && amount <= userBalance.value;
});

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
//   if (!isWalletConnected.value) {
//     showToastMessage('Please connect your wallet first to stake tokens', 'warning')
//   }
  
//   selectedPool.value = pool
//   showStakeModal.value = true
//   stakeAmount.value = ''
// }
  selectedPool.value = pool;
  stakeAmount.value = "";
};

const closeStakeModal = () => {
  selectedPool.value = null;
  stakeAmount.value = "";
};

const setMaxAmount = () => {
  stakeAmount.value = userBalance.value.toString();
};

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
    // Fetch totalSupply and update investmentStats.totalNfts
    try {
      const totalSupply = await readContract(wagmiConfig, {
        address: ppoPackageAddress.value,
        abi: ppoPackageAbi,
        functionName: "totalSupply",
        chainId: chainId.value,
      });
      investmentStats.value.totalNfts = totalSupply.toLocaleString();
    } catch (err) {
      console.error("Error loading totalSupply:", err);
      investmentStats.value.totalNfts = "-";
    }

    try {
      const balanceOf = await readContract(wagmiConfig, {
        address: ppoPackageAddress.value,
        abi: ppoPackageAbi,
        functionName: "balanceOf",
        args: [address.value],
        chainId: chainId.value,
      });
      investmentStats.value.totalMyNfts = balanceOf.toLocaleString();
    } catch (err) {
      console.error("Error loading balanceOf:", err);
      investmentStats.value.totalMyNfts = "-";
    }
  } catch (err) {
    console.error("Error loading NFTs:", err);
  }
};

// const confirmStake = () => {
//   if (!isWalletConnected.value) {
//     showToastMessage('Please connect your wallet first', 'warning')
//     return
//   }
  
//   if (!canStake.value) {
//     showToastMessage('Please check your stake amount and balance', 'warning')
//     return
//   }
  
//   // Simulate staking
//   console.log('Staking:', {
//     pool: selectedPool.value.name,
//     amount: stakeAmount.value,
//     wallet: walletAddress.value
//   })
  
//   // Update user balance
//   userBalance.value -= parseFloat(stakeAmount.value)
  
//   // Close modal
//   closeStakeModal()
  
//   // Show success message
//   showToastMessage('Staking successful!', 'success')
// }

// const addLiquidity = (farmId) => {
//   if (!isWalletConnected.value) {
//     showToastMessage('Please connect your wallet first to add liquidity', 'warning')
//     return
//   }
  
//   console.log('Adding liquidity to farm:', farmId)
//   // Implement liquidity addition logic
// }

// const viewFarm = (farmId) => {
//   console.log('Viewing farm:', farmId)
//   // Navigate to farm details
// }

// const viewTransaction = (transactionId) => {
//   console.log('Viewing transaction:', transactionId)
//   // Show transaction details
// }

// const viewPoolDetails = (poolId) => {
//   console.log('Viewing pool details:', poolId)
//   // Navigate to pool details page
// }

// const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString()
// }
const confirmStake = async () => {
  if (!canStake.value) return;

  try {
    // Mock staking - in real app, this would call smart contract
    console.log(
      `Staking ${stakeAmount.value} PPO in ${selectedPool.value.name}`
    );

    // Add to my stakes
    myStakes.value.push({
      id: Date.now(),
      poolName: selectedPool.value.name,
      amount: parseFloat(stakeAmount.value),
      earned: 0,
      stakeDate: new Date(),
      progress: 0,
    });

    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: "stake",
      amount: parseFloat(stakeAmount.value),
      status: "completed",
    });

    closeStakeModal();
  } catch (error) {
    console.error("Staking failed:", error);
  }
};

const claimRewards = (stakeId) => {
  const stake = myStakes.value.find((s) => s.id === stakeId);
  if (stake && stake.earned > 0) {
    console.log(`Claiming ${stake.earned} PPO rewards`);
    stake.earned = 0;

    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: "claim",
      amount: stake.earned,
      status: "completed",
    });
  }
};

const unstake = (stakeId) => {
  const stakeIndex = myStakes.value.findIndex((s) => s.id === stakeId);
  if (stakeIndex !== -1) {
    const stake = myStakes.value[stakeIndex];
    console.log(`Unstaking ${stake.amount} PPO`);

    // Add to history
    investmentHistory.value.unshift({
      id: Date.now(),
      date: new Date(),
      type: "unstake",
      amount: stake.amount,
      status: "completed",
    });

    // Remove from my stakes
    myStakes.value.splice(stakeIndex, 1);
  }
};

const viewPoolDetails = (poolId) => {
  // router.push(`/investment/pool/${poolId}`)
};

const addLiquidity = (farmId) => {
  router.push(`/investment/farm/${farmId}`);
};

const viewFarm = (farmId) => {
  router.push(`/investment/farm/${farmId}`);
};

const viewTransaction = (txId) => {
  console.log(`Viewing transaction ${txId}`);
};

const scrollToPools = () => {
  const poolsSection = document.querySelector(".staking-pools");
  if (poolsSection) {
    poolsSection.scrollIntoView({ behavior: "smooth" });
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

onMounted(async () => {
  console.log('Investment component mounted')
  
  // Load user data if authenticated
  if (currentUser.value) {
//     const userData = await getUserData()
//     if (userData) {
//       userBalance.value = userData.balance || 0
//     }
//   }
// })
    try {
      const result = await getUserData();
      if (result.success) {
        userBalance.value = result.data.tokenBalance || 0;
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  }
};

onMounted(() => {
  loadUserData();
  loadUserNFTs();
  setInterval(loadUserNFTs, 60000);
});

watch(address, loadUserNFTs);
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
