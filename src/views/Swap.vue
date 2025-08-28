<template>
  <div class="swap-page">
    <Header />

    <!-- Swap Hero Section -->
    <section class="swap-hero padding-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="swap-header text-center">
              <h1 class="swap-title">Token Swap</h1>
              <p class="swap-subtitle">
                Swap tokens instantly with the best rates and lowest fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Swap Interface -->
    <section class="swap-interface padding-large">
      <div class="container swap-container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="swap-card">
              <!-- Wallet Connection Status -->
              <div
                v-if="!isWalletConnected"
                class="wallet-notice"
              >
                <div class="notice-content">
                  <div class="notice-icon">
                    <i class="fas fa-wallet"></i>
                  </div>
                  <h4>Connect Your Wallet</h4>
                  <p>Please connect your wallet to start swapping tokens</p>
                  <div class="connect-btn">
                    <ReownWalletButton />
                  </div>
                </div>
              </div>

              <!-- Swap Form -->
              <div
                v-else
                class="swap-form"
              >
                <!-- From Token -->
                <div class="token-input">
                  <div class="input-header">
                    <label>From</label>
                    <div class="balance-info">
                      <span
                        >Balance: {{ floorFragment(fromTokenBalance, 5) }}
                        {{ selectedFromToken.symbol }}</span
                      >
                      <button
                        class="btn-link"
                        @click="setMaxAmount"
                      >
                        Max
                      </button>
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      v-model="swapForm.fromAmount"
                      type="number"
                      class="form-control"
                      placeholder="0.0"
                      @input="calculateSwap"
                    />
                    <div
                      class="token-selector"
                      @click="showFromTokenModal = true"
                    >
                      <img
                        :src="selectedFromToken.icon"
                        :alt="selectedFromToken.symbol"
                        class="token-icon"
                      />
                      <span class="token-symbol">{{
                        selectedFromToken.symbol
                      }}</span>
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <!-- Swap Direction Button -->
                <div class="swap-direction">
                  <button
                    class="direction-btn"
                    @click="swapTokens"
                  >
                    <i class="fas fa-exchange-alt"></i>
                  </button>
                </div>

                <!-- To Token -->
                <div class="token-input">
                  <div class="input-header">
                    <label>To</label>
                    <div class="balance-info">
                      <span
                        >Balance: {{ floorFragment(toTokenBalance, 5) }}
                        {{ selectedToToken.symbol }}</span
                      >
                    </div>
                  </div>
                  <div class="input-group">
                    <input
                      v-model="swapForm.toAmount"
                      type="number"
                      class="form-control"
                      placeholder="0.0"
                      readonly
                    />
                    <div
                      class="token-selector"
                      @click="showToTokenModal = true"
                    >
                      <img
                        :src="selectedToToken.icon"
                        :alt="selectedToToken.symbol"
                        class="token-icon"
                      />
                      <span class="token-symbol">{{
                        selectedToToken.symbol
                      }}</span>
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <!-- Swap Details -->
                <div class="swap-details">
                  <div class="detail-row">
                    <span class="detail-label">Exchange Rate</span>
                    <span class="detail-value"
                      >1 {{ selectedFromToken.symbol }} = {{ exchangeRate }}
                      {{ selectedToToken.symbol }}</span
                    >
                  </div>
                  <div class="detail-row" v-if="swapUsdValue > 0">
                    <span class="detail-label">USD Value</span>
                    <span class="detail-value">${{ swapUsdValue.toFixed(2) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Price Impact</span>
                    <span
                      class="detail-value"
                      :class="priceImpactClass"
                      >{{ priceImpact }}%</span
                    >
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Slippage Tolerance</span>
                    <span class="detail-value">{{ slippage }}%</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Network Fee</span>
                    <span class="detail-value">{{ networkFee }} BNB</span>
                  </div>
                </div>

                <!-- Swap Button -->
                <!-- <div class="swap-actions">
                  <button 
                    class="btn-swap" 
                    @click="executeSwap"
                    :disabled="!canSwap"
                    :class="{ 'disabled': !canSwap }" -->
                <button
                  class="btn btn-swap btn-linear btn-large w-full"
                  @click="executeSwap"
                  :disabled="!canSwap || isLoading"
                >
                  <i
                    v-if="isLoading"
                    class="fas fa-spinner fa-spin me-2"
                  ></i>
                  <i
                    v-else
                    class="fas fa-exchange-alt me-2"
                  ></i>
                  {{ getSwapButtonText() }}
                </button>

                <!-- Settings -->
                <!-- <div class="swap-settings">
                  <button
                    class="btn-link"
                    @click="showSettings = !showSettings"
                  >
                    <i class="fas fa-exchange-alt me-2"></i>
                    {{ swapButtonText }}
                  </button>
                </div> -->

                <!-- Recent Transactions -->
                <div class="recent-transactions">
                  <h5>Recent Transactions</h5>
                  <div class="transaction-list">
                    <div
                      v-for="tx in recentTransactions"
                      :key="tx.id"
                      class="transaction-item"
                    >
                      <div class="tx-info">
                        <div class="tx-tokens">
                          <span>{{ tx.fromAmount }} {{ tx.fromToken }}</span>
                          <i class="fas fa-arrow-right"></i>
                          <span>{{ tx.toAmount }} {{ tx.toToken }}</span>
                        </div>
                        <div class="tx-time">{{ tx.time }}</div>
                      </div>
                      <div
                        class="tx-status"
                        :class="tx.status"
                      >
                        {{ tx.status }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Market Info Panel -->
          <div class="col-lg-4 col-md-8">
            <div class="market-panel">
              <h4>Market Overview</h4>
              <div class="market-stats">
                <div class="market-stat">
                  <span class="stat-label">24h Volume</span>
                  <span class="stat-value">$2.5M</span>
                </div>
                <div class="market-stat">
                  <span class="stat-label">Total Liquidity</span>
                  <span class="stat-value">$15.2M</span>
                </div>
                <div class="market-stat">
                  <span class="stat-label">BNB Price</span>
                  <span class="stat-value">
                    <i v-if="isPriceLoading" class="fas fa-spinner fa-spin me-2"></i>
                    ${{ tokenPrices.BNB ? tokenPrices.BNB.toFixed(2) : '0.00' }}
                  </span>
                </div>
                <div class="market-stat">
                  <span class="stat-label">PPO Price</span>
                  <span class="stat-value">${{ tokenPrices.PPO.toFixed(2) }}</span>
                </div>
              </div>

              <div class="price-chart">
                <h5>PPO Price Chart</h5>
                <div class="chart-placeholder">
                  <i class="fas fa-chart-line"></i>
                  <p>Price chart will be displayed here</p>
                </div>
              </div>

              <div class="popular-pairs">
                <h5>Popular Pairs</h5>
                <div class="pair-list">
                  <div
                    v-for="pair in popularPairs"
                    :key="pair.id"
                    class="pair-item"
                    @click="selectPair(pair)"
                  >
                    <div class="pair-tokens">
                      <img
                        :src="pair.token1.icon"
                        :alt="pair.token1.symbol"
                        class="token-icon-small"
                      />
                      <img
                        :src="pair.token2.icon"
                        :alt="pair.token2.symbol"
                        class="token-icon-small"
                      />
                      <span
                        >{{ pair.token1.symbol }}/{{ pair.token2.symbol }}</span
                      >
                    </div>
                    <div class="pair-price">
                      <i v-if="isPriceLoading" class="fas fa-spinner fa-spin me-1"></i>
                      {{ pair.price }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Selection Modal -->
    <div
      v-if="showFromTokenModal || showToTokenModal"
      class="modal-overlay"
      @click="closeTokenModal"
    >
      <div
        class="token-modal"
        @click.stop
      >
        <div class="modal-header">
          <h4>Select Token</h4>
          <button
            class="close-btn"
            @click="closeTokenModal"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              v-model="tokenSearch"
              type="text"
              placeholder="Search tokens..."
              class="search-input"
            />
          </div>
          <div class="token-list">
            <div
              v-for="token in filteredTokens"
              :key="token.address"
              class="token-item"
              @click="selectToken(token)"
            >
              <img
                :src="token.icon"
                :alt="token.symbol"
                class="token-icon"
              />
              <div class="token-info">
                <span class="token-symbol">{{ token.symbol }}</span>
                <span class="token-name">{{ token.name }}</span>
              </div>
              <div class="token-balance">
                {{ floorFragment(getTokenBalance(token.address), 4) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="toast-notification"
      :class="toastType"
    >
      <div class="toast-content">
        <i
          :class="getToastIcon()"
          class="toast-icon"
        ></i>
        <span class="toast-message">{{ toastMessage }}</span>
        <button
          class="toast-close"
          @click="closeToast"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import ReownWalletButton from '../components/ReownWalletButton.vue'
import { useAccount, useChainId } from '@wagmi/vue'
import { wagmiConfig } from '../config/wagmi'
import { ethers } from 'ethers'
import {
  readContract,
  getBalance,
  getConnectorClient,
  writeContract,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { ppoTokenAbi } from '@/abis/ppoToken.js'
import { ppoSwapAbi } from '@/abis/ppoSwap.js'
import { bsc, bscTestnet } from 'viem/chains'
import { useFirebase } from '../composables/useFirebase'
import bnbIcon from '@/assets/images/bnb-icon.png'
import ppoIcon from '@/assets/images/ppo-icon.png'
import usdtIcon from '@/assets/images/usdt-icon.png'
import usdcIcon from '@/assets/images/usdc-icon.png'

// PPO Token và PPO Swap contract addresses
const ppoSwapAddress = computed(() => {
  if (bsc.id === chainId.value) {
    return '0x8dCa51f217969A7f9ea1FA5e99d5a66152063188'
  }
  return '0x80B5AcE6283fAf55E8fE4FE9B15d1b2f41aFb95D'
})

const router = useRouter()
const { getUserData, addTransaction, currentUser } = useFirebase()

// Use Web3 composable for wallet connection
const { address, connectWallet } = useAccount()
const isWalletConnected = computed(() => !!address?.value)
const chainId = useChainId()

// State
const isLoading = ref(false)
const showFromTokenModal = ref(false)
const showToTokenModal = ref(false)
const tokenSearch = ref('')

// Token prices state
const tokenPrices = ref({
  BNB: 0,
  PPO: 0.05, // Fixed PPO price at $0.05
  USDT: 1,
  USDC: 1,
})
const isPriceLoading = ref(false)

// Toast notification state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('info')

// Swap form
const swapForm = reactive({
  fromAmount: '',
  toAmount: '',
})

// Balances
const tokenBalances = ref({})
const fromTokenBalance = ref(0)
const toTokenBalance = ref(0)

// Recent Transactions
const recentTransactions = ref([])

// Default tokens (BNB and PPO)
const selectedFromToken = ref({
  symbol: 'BNB',
  name: 'Binance Coin',
  icon: bnbIcon,
  address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  decimals: 18,
})

const selectedToToken = ref({
  symbol: 'PPO',
  name: 'PixelPayot Token',
  icon: ppoIcon,
  address: '0xCdA7eBb5005aaC33B6F4f32c17647698b020eFC9',
  decimals: 18,
})

// Available tokens
const availableTokens = ref([
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: bnbIcon,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
  },
  {
    symbol: 'PPO',
    name: 'PixelPayot Token',
    icon: ppoIcon,
    address: '0xCdA7eBb5005aaC33B6F4f32c17647698b020eFC9',
    decimals: 18,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: usdtIcon,
    address: '0x55d398326f99059fF775485246999027B3197955',
    decimals: 18,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: usdcIcon,
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: 18,
  },
])

// Popular pairs with live prices
const popularPairs = computed(() => [
  {
    id: 1,
    token1: { symbol: 'PPO', icon: ppoIcon },
    token2: { symbol: 'BNB', icon: bnbIcon },
    price: `${(tokenPrices.value.PPO / tokenPrices.value.BNB).toFixed(6)} BNB`,
  },
  {
    id: 2,
    token1: { symbol: 'PPO', icon: ppoIcon },
    token2: { symbol: 'USDT', icon: usdtIcon },
    price: `$${tokenPrices.value.PPO.toFixed(2)} USDT`,
  },
  {
    id: 3,
    token1: { symbol: 'BNB', icon: bnbIcon },
    token2: { symbol: 'USDT', icon: usdtIcon },
    price: `$${tokenPrices.value.BNB.toFixed(2)} USDT`,
  },
])

// Recent transactions - conditional based on wallet connection
// const recentTransactions = computed(() => {
//   if (!isWalletConnected.value) {
//     return []
//   }
//   return [
//     {
//       id: 1,
//       type: 'swap',
//       from: { symbol: 'BNB', amount: '0.1' },
//       to: { symbol: 'PPO', amount: '2222.22' },
//       time: '2 minutes ago',
//       status: 'completed',
//     },
//     {
//       id: 2,
//       type: 'swap',
//       from: { symbol: 'PPO', amount: '100' },
//       to: { symbol: 'USDT', amount: '4.5' },
//       time: '5 minutes ago',
//       status: 'completed',
//     },
//     {
//       id: 3,
//       type: 'swap',
//       from: { symbol: 'USDT', amount: '10' },
//       to: { symbol: 'BNB', amount: '0.031' },
//       time: '10 minutes ago',
//       status: 'completed',
//     },
//   ]
// })

// Computed properties
const filteredTokens = computed(() => {
  if (!tokenSearch.value) return availableTokens.value
  return availableTokens.value.filter(
    (token) =>
      token.symbol.toLowerCase().includes(tokenSearch.value.toLowerCase()) ||
      token.name.toLowerCase().includes(tokenSearch.value.toLowerCase())
  )
})

const exchangeRate = computed(() => {
  // Dynamic exchange rate based on live token prices
  const fromToken = selectedFromToken.value.symbol
  const toToken = selectedToToken.value.symbol
  
  const fromPrice = tokenPrices.value[fromToken] || 0
  const toPrice = tokenPrices.value[toToken] || 0
  
  if (fromPrice > 0 && toPrice > 0) {
    // Calculate exchange rate based on USD prices
    // If 1 BNB = $320 and 1 PPO = $0.05, then 1 BNB = 320/0.05 = 6400 PPO
    const rate = fromPrice / toPrice
    return rate.toFixed(6)
  }
  
  // Fallback rates for specific pairs
  if (fromToken === 'BNB' && toToken === 'PPO') {
    const bnbPrice = tokenPrices.value.BNB || 320
    const ppoPrice = 0.05
    return (bnbPrice / ppoPrice).toFixed(6)
  } else if (fromToken === 'PPO' && toToken === 'BNB') {
    const bnbPrice = tokenPrices.value.BNB || 320
    const ppoPrice = 0.05
    return (ppoPrice / bnbPrice).toFixed(6)
  }
  
  return '0.0000'
})

const priceImpact = computed(() => {
  const amount = parseFloat(swapForm.fromAmount) || 0
  if (amount < 0.1) return '< 0.01'
  if (amount < 1) return '0.01'
  if (amount < 5) return '0.05'
  return '0.12'
})

const priceImpactClass = computed(() => {
  const impact = parseFloat(priceImpact.value)
  if (impact < 0.1) return 'low'
  if (impact < 1) return 'medium'
  return 'high'
})

const slippage = ref(0.5)
const networkFee = ref(0.001)

// Computed property for USD value of swap
const swapUsdValue = computed(() => {
  if (!swapForm.fromAmount || parseFloat(swapForm.fromAmount) <= 0) return 0
  
  const fromToken = selectedFromToken.value.symbol
  const fromPrice = tokenPrices.value[fromToken] || 0
  
  return parseFloat(swapForm.fromAmount) * fromPrice
})

const getSwapButtonText = () => {
  if (isLoading.value) return 'Swapping...'
  if (!isWalletConnected.value) return 'Connect Wallet'
  if (!swapForm.fromAmount) return 'Swap'
  if (parseFloat(swapForm.fromAmount) > fromTokenBalance.value)
    return 'Insufficient Balance'
  if (selectedFromToken.value.address === selectedToToken.value.address)
    return 'Select different tokens'
  return 'Swap'
}

const canSwap = computed(() => {
  return (
    swapForm.fromAmount &&
    parseFloat(swapForm.fromAmount) > 0 &&
    parseFloat(swapForm.fromAmount) <= fromTokenBalance.value
  )
})

const swapButtonText = computed(() => {
  if (!swapForm.fromAmount) return 'Enter an amount'
  if (parseFloat(swapForm.fromAmount) > fromTokenBalance.value)
    return 'Insufficient balance'
  return 'Swap'
})

const swapRate = computed(() => {
  // Exchange rate based on live token prices
  const fromToken = selectedFromToken.value.symbol
  const toToken = selectedToToken.value.symbol
  
  const fromPrice = tokenPrices.value[fromToken] || 0
  const toPrice = tokenPrices.value[toToken] || 0
  
  if (fromPrice > 0 && toPrice > 0) {
    // Calculate exchange rate based on USD prices
    return fromPrice / toPrice
  }
  
  // Fallback rates for specific pairs
  if (fromToken === 'BNB' && toToken === 'PPO') {
    const bnbPrice = tokenPrices.value.BNB || 320
    const ppoPrice = 0.05
    return bnbPrice / ppoPrice
  } else if (fromToken === 'PPO' && toToken === 'BNB') {
    const bnbPrice = tokenPrices.value.BNB || 320
    const ppoPrice = 0.05
    return ppoPrice / bnbPrice
  }
  
  return 1
})

// Methods
const calculateSwap = () => {
  if (swapForm.fromAmount > 0) {
    try {
      const fromDecimals = selectedFromToken.value.decimals || 18
      const toDecimals = selectedToToken.value.decimals || 18

      const parsedAmount = ethers.parseUnits(
        swapForm.fromAmount?.toString(),
        fromDecimals
      )
      console.log('Parsed Amount:', parsedAmount)
      console.log('ppoSwapAddress.value:', ppoSwapAddress.value)
      
      readContract(wagmiConfig, {
        chainId: chainId.value,
        abi: ppoSwapAbi,
        address: ppoSwapAddress.value,
        functionName: 'getEstimateAmountsOut',
        args: [parsedAmount],
      }).then((data) => {
        console.log('getEstimateAmountsOut:', data)
        const formattedAmount = ethers.formatUnits(
          data,
          toDecimals
        )
        swapForm.toAmount = (+formattedAmount).toFixed(5)
      }).catch((error) => {
        console.error('Error calculating swap:', error)
        // Fallback to simple calculation if contract call fails
        const rate = swapRate.value
        const calculatedAmount = parseFloat(swapForm.fromAmount) * rate
        swapForm.toAmount = calculatedAmount.toFixed(5)
      })
    } catch (error) {
      console.error('Error in calculateSwap:', error)
      // Fallback to simple calculation
      const rate = swapRate.value
      const calculatedAmount = parseFloat(swapForm.fromAmount) * rate
      swapForm.toAmount = calculatedAmount.toFixed(5)
    }
  } else {
    swapForm.toAmount = ''
  }
}
const swapTokens = () => {
  const temp = { ...selectedFromToken.value }
  selectedFromToken.value = { ...selectedToToken.value }
  selectedToToken.value = temp

  // Swap amounts
  const tempAmount = swapForm.fromAmount
  swapForm.fromAmount = swapForm.toAmount
  swapForm.toAmount = tempAmount

  // Update balances for swapped tokens
  fromTokenBalance.value = getTokenBalance(selectedFromToken.value.address)
  toTokenBalance.value = getTokenBalance(selectedToToken.value.address)

  calculateSwap()
}

const setMaxAmount = () => {
  swapForm.fromAmount = fromTokenBalance.value.toString()
  calculateSwap()
}

const selectFromToken = (token) => {
  selectedFromToken.value = token
  showFromTokenModal.value = false
  calculateSwap()
}

const selectToToken = (token) => {
  selectedToToken.value = token
  showToTokenModal.value = false
  calculateSwap()
}

const loadTokenBalances = async () => {
  if (!address.value) return

  try {
    console.log('chainId.value:', chainId.value)

    // Lấy số dư của native token (BNB)
    const nativeBalance = await getBalance(wagmiConfig, {
      chainId: chainId.value,
      address: address.value,
      units: 'ether',
    })

    console.log('nativeBalance:', nativeBalance)

    // Load balances for all available tokens
    const balances = {}
    
    // Add native token balance
    balances['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'] = nativeBalance?.formatted || '0'
    
    // Load balances for other tokens
    for (const token of availableTokens.value) {
      if (token.address !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        try {
          const tokenBalance = await getBalance(wagmiConfig, {
            chainId: chainId.value,
            address: address.value,
            token: token.address,
          })
          const formattedBalance = ethers.formatUnits(tokenBalance.value, token.decimals || 18)
          balances[token.address] = formattedBalance
        } catch (error) {
          console.error(`Failed to load balance for ${token.symbol}:`, error)
          balances[token.address] = '0'
        }
      }
    }

    tokenBalances.value = balances

    // Update balances for current selected tokens
    fromTokenBalance.value = getTokenBalance(selectedFromToken.value.address)
    toTokenBalance.value = getTokenBalance(selectedToToken.value.address)
  } catch (error) {
    console.error('Failed to load balances:', error)
  }
}

const executeSwap = async () => {
  if (!canSwap.value) return

  try {
    isLoading.value = true

    const balance = +tokenBalances.value[selectedFromToken.value.address] || 0
    if (balance < +swapForm.fromAmount) {
      showToastMessage('Insufficient balance', 'error')
      return
    }

    const fromDecimals = selectedFromToken.value.decimals || 18
    console.log(
      'params',
      swapForm.fromAmount?.toString(),
      fromDecimals
    )

    const parsedAmount = ethers.parseUnits(
      swapForm.fromAmount?.toString(),
      fromDecimals
    )
    console.log('Parsed Amount:', parsedAmount)
    const txHash = await writeContract(wagmiConfig, {
      chainId: chainId.value,
      abi: ppoSwapAbi,
      address: ppoSwapAddress.value,
      functionName: 'swap',
      args: [],
      value: parsedAmount,
    })
    showToastMessage('Transaction sent. Waiting for confirmation...')

    // Reset form
    swapForm.fromAmount = ''
    swapForm.toAmount = ''

    await waitForTransactionReceipt(wagmiConfig, {
      chainId: chainId.value,
      hash: txHash,
    })

    await addTransaction({
      hash: txHash,
      fromAmount: swapForm.fromAmount,
      fromToken: selectedFromToken.value.symbol,
      toAmount: swapForm.toAmount,
      toToken: selectedToToken.value.symbol,
      timestamp: Date.now(),
      status: 'completed',
    })

    // Add to recent transactions
    recentTransactions.value.unshift({
      hash: txHash,
      fromAmount: swapForm.fromAmount,
      fromToken: selectedFromToken.value.symbol,
      toAmount: swapForm.toAmount,
      toToken: selectedToToken.value.symbol,
      timestamp: Date.now(),
      status: 'completed',
    })

    showToastMessage('Swap successfully!', 'success')

    // Update balances
    await loadTokenBalances()
  } catch (error) {
    console.error('Swap failed:', error)
    showToastMessage('Swap failed!', 'error')
  } finally {
    isLoading.value = false
  }
}

const selectToken = (token) => {
  if (showFromTokenModal.value) {
    selectedFromToken.value = token
    fromTokenBalance.value = getTokenBalance(token.address)
  } else if (showToTokenModal.value) {
    selectedToToken.value = token
    toTokenBalance.value = getTokenBalance(token.address)
  }
  closeTokenModal()
  calculateSwap()
}

const selectPair = (pair) => {
  const fromToken = availableTokens.value.find(
    (t) => t.symbol === pair.token1.symbol
  )
  const toToken = availableTokens.value.find(
    (t) => t.symbol === pair.token2.symbol
  )
  
  if (fromToken && toToken) {
    selectedFromToken.value = fromToken
    selectedToToken.value = toToken
    
    // Update balances
    fromTokenBalance.value = getTokenBalance(fromToken.address)
    toTokenBalance.value = getTokenBalance(toToken.address)
    
    calculateSwap()
  }
}

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

const closeTokenModal = () => {
  showFromTokenModal.value = false
  showToTokenModal.value = false
  tokenSearch.value = ''
}

const getTokenBalance = (address) => {
  return tokenBalances.value[address] || 0
}

const floorFragment = (value, decimals) => {
  console.log('value', value)
  return parseFloat(value).toFixed(decimals)
}

// Fetch live token prices from CoinGecko
const fetchTokenPrices = async () => {
  try {
    isPriceLoading.value = true
    
    // Fetch BNB price from CoinGecko with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd', {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.binancecoin && data.binancecoin.usd) {
      const newBnbPrice = data.binancecoin.usd
      // Only update if price is reasonable (between $1 and $1000)
      if (newBnbPrice > 1 && newBnbPrice < 1000) {
        tokenPrices.value.BNB = newBnbPrice
        console.log('BNB price updated:', tokenPrices.value.BNB)
      } else {
        console.warn('BNB price seems unreasonable:', newBnbPrice)
      }
    }
    
    // PPO price is fixed at $0.05
    tokenPrices.value.PPO = 0.05
    
    // USDT and USDC are stablecoins, should be close to $1
    tokenPrices.value.USDT = 1
    tokenPrices.value.USDC = 1
    
  } catch (error) {
    console.error('Failed to fetch token prices:', error)
    
    // Only set fallback if we don't have any price yet
    if (tokenPrices.value.BNB === 0) {
      tokenPrices.value.BNB = 320 // Fallback BNB price
      console.log('Using fallback BNB price:', tokenPrices.value.BNB)
    }
    
    tokenPrices.value.PPO = 0.05
    tokenPrices.value.USDT = 1
    tokenPrices.value.USDC = 1
  } finally {
    isPriceLoading.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const loadUserData = async () => {
  if (currentUser.value) {
    const result = await getUserData()
    if (result.success) {
      console.log('result', result)
      recentTransactions.value = result.data.transactions || []
    }
  }
}

watch(currentUser, async (newUser, oldUser) => {
  if (newUser !== oldUser && newUser) {
    await loadUserData()
  }
})

// Lifecycle
onMounted(async () => {
  await loadUserData()
  await loadTokenBalances()
  await fetchTokenPrices()
  
  // Update prices every 30 seconds
  setInterval(async () => {
    await fetchTokenPrices()
  }, 30000)
})

// Watch for wallet address changes
watch(address, async (newAddress, oldAddress) => {
  console.log(`Address changed from ${oldAddress} to ${newAddress}`)
  if (newAddress !== oldAddress) {
    await loadTokenBalances()
  }
})

// Watch for selected token changes to update balances
watch([selectedFromToken, selectedToToken], async ([newFromToken, newToToken], [oldFromToken, oldToToken]) => {
  if (newFromToken?.address !== oldFromToken?.address) {
    fromTokenBalance.value = getTokenBalance(newFromToken?.address)
  }
  if (newToToken?.address !== oldToToken?.address) {
    toTokenBalance.value = getTokenBalance(newToToken?.address)
  }
})

onMounted(() => {
  console.log('Swap component mounted')
})
</script>

<style scoped>
.swap-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
}

/* Glass Blur Background Effects */
.swap-page::before {
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

/* Swap Hero Section */
.swap-hero {
  position: relative;
  /* z-index: 1; */
  padding: 120px 0 80px;
}

.swap-header {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 60px 40px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.swap-header::before {
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

.swap-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(204, 0, 255, 0.3);
}

.swap-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 0;
  font-weight: 400;
}

/* Swap Interface */
.swap-interface {
  position: relative;
  /* z-index: 1; */
  padding: 60px 0;
}

.swap-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.swap-card::before {
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

/* Wallet Notice */
.wallet-notice {
  text-align: center;
  padding: 40px 20px;
}

.notice-content {
  max-width: 300px;
  margin: 0 auto;
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

.notice-content h4 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #ffffff;
}

.notice-content p {
  color: #b0b0b0;
  margin-bottom: 30px;
}

/* Swap Form */
.swap-form {
  position: relative;
}

.token-input {
  margin-bottom: 20px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.input-header label {
  font-weight: 600;
  color: #ffffff;
  font-size: 1rem;
}

.balance-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #b0b0b0;
}

.btn-link {
  background: none;
  border: none;
  color: #cc00ff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0;
}

.btn-link:hover {
  text-decoration: underline;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-group:focus-within {
  border-color: rgba(204, 0, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.1);
}

.form-control {
  flex: 1;
  background: transparent;
  border: none;
  padding: 20px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  outline: none;
}

.form-control::placeholder {
  color: #666;
}

.token-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.token-selector:hover {
  background: rgba(255, 255, 255, 0.1);
}

.token-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.token-symbol {
  font-weight: 600;
  color: #ffffff;
}

/* Swap Direction */
.swap-direction {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.direction-btn {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.direction-btn::before {
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
  opacity: 0;
  transition: opacity 0.3s ease;
}

.direction-btn:hover::before {
  opacity: 1;
}

.direction-btn:hover {
  transform: rotate(180deg);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

/* Swap Details */
.swap-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.detail-value {
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
}

.detail-value.low {
  color: #34d399;
}
.detail-value.medium {
  color: #fbbf24;
}
.detail-value.high {
  color: #ef4444;
}

/* Swap Actions */
.swap-actions {
  margin: 30px 0;
}

.btn-swap {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 18px;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-swap::before {
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
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-swap:hover:not(.disabled)::before {
  opacity: 1;
}

.btn-swap:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(102, 126, 234, 0.3);
}

.btn-swap.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.1);
}

/* Recent Transactions */
.recent-transactions {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.recent-transactions h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.transaction-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.tx-info {
  flex: 1;
}

.tx-tokens {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  font-weight: 600;
  color: #ffffff;
}

.tx-tokens i {
  color: #cc00ff;
  font-size: 0.8rem;
}

.tx-time {
  font-size: 0.8rem;
  color: #b0b0b0;
}

.tx-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.tx-status.completed {
  background: linear-gradient(135deg, #34d399, #10b981);
  color: white;
}

.tx-status.pending {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
}

/* Market Panel */
.market-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  height: fit-content;
  position: relative;
  overflow: hidden;
}

.market-panel::before {
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

.market-panel h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #ffffff;
}

.market-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.market-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.market-stat:last-child {
  border-bottom: none;
}

.stat-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.stat-value {
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
}

.price-chart {
  margin-bottom: 30px;
}

.price-chart h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.chart-placeholder {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  color: #b0b0b0;
}

.chart-placeholder i {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #cc00ff;
}

.popular-pairs h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.pair-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pair-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pair-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
}

.pair-tokens {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #ffffff;
}

.token-icon-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.pair-price {
  color: #cc00ff;
  font-weight: 600;
}

/* Token Modal */
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
  backdrop-filter: blur(10px);
}

.token-modal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h4 {
  margin: 0;
  color: #ffffff;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.modal-body {
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: rgba(204, 0, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.1);
}

.search-input::placeholder {
  color: #666;
}

.token-list {
  max-height: 300px;
  overflow-y: auto;
}

.token-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.token-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.token-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.token-info .token-symbol {
  font-weight: 600;
  color: #ffffff;
  font-size: 1rem;
}

.token-info .token-name {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.token-balance {
  color: #b0b0b0;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .swap-title {
    font-size: 2.5rem;
  }

  .swap-header {
    padding: 40px 20px;
  }

  .swap-card {
    padding: 20px;
  }

  .market-panel {
    margin-top: 30px;
    padding: 20px;
  }

  .form-control {
    font-size: 1rem;
    padding: 15px;
  }

  .token-selector {
    padding: 15px;
    min-width: 100px;
  }

  /* Mobile wallet connection fixes */
  .wallet-notice {
    padding: 20px;
  }

  .notice-content {
    text-align: center;
  }

  .notice-content h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .notice-content p {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .connect-btn {
    display: flex;
    justify-content: center;
  }

  /* Ensure wallet button is properly sized on mobile */
  .connect-btn :deep(.wallet-container) {
    width: 100%;
    max-width: 200px;
  }

  .connect-btn :deep(.wallet-info) {
    justify-content: center;
    width: 100%;
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

.swap-card,
.market-panel {
  animation: fadeInUp 0.6s ease forwards;
}

.market-panel {
  animation-delay: 0.2s;
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
