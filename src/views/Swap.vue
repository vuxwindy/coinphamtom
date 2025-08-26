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
                Swap tokens instantly with the best rates
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
              <!-- <div v-if="!isWalletConnected" class="wallet-notice">
                <div class="notice-content">
                  <i class="fas fa-wallet"></i>
                  <h4>Connect Your Wallet</h4>
                  <p>Please connect your wallet to start swapping tokens</p>
                  <button class="btn btn-linear" @click="open">
                    <i class="fas fa-plug me-2"></i>Connect Wallet
                  </button>
                </div>
              </div> -->
              <div v-if="!isWalletConnected" class="wallet-notice">
                <div class="notice-content">
                  <i class="fas fa-wallet"></i>
                  <p>Please connect your wallet to start swapping tokens</p>
                  <div class="connect-btn">
                    <ReownWalletButton />
                  </div>
                </div>
              </div>

              <!-- Swap Form -->
              <div v-else class="swap-form">
                <!-- From Token -->
                <div class="token-input">
                  <label>From</label>
                  <div class="input-group">
                    <input
                      v-model="swapForm.fromAmount"
                      type="number"
                      class="form-control"
                      placeholder="0.0"
                      @input="calculateSwap"
                    />
                    <!-- <div
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
                    </div> -->
                    <div class="token-selector">
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
                  <div class="balance-info">
                    <span
                      >Balance: {{ floorFragment(fromTokenBalance, 5) }}
                      {{ selectedFromToken.symbol }}</span
                    >
                    <button class="btn-link" @click="setMaxAmount">Max</button>
                  </div>
                </div>

                <!-- Swap Direction Button -->
                <!-- <div class="swap-direction">
                  <button class="direction-btn" @click="swapTokens">
                    <i class="fas fa-exchange-alt"></i>
                  </button>
                </div> -->

                <!-- To Token -->
                <div class="token-input">
                  <label>To</label>
                  <div class="input-group">
                    <input
                      v-model="swapForm.toAmount"
                      type="number"
                      class="form-control"
                      placeholder="0.0"
                      readonly
                    />
                    <!-- <div
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
                    </div> -->
                    <div class="token-selector">
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
                  <div class="balance-info">
                    <span
                      >Balance: {{ floorFragment(toTokenBalance, 5) }}
                      {{ selectedToToken.symbol }}</span
                    >
                  </div>
                </div>

                <!-- Swap Details -->
                <!-- <div v-if="swapForm.fromAmount > 0" class="swap-details">
                  <div class="detail-row">
                    <span>Rate</span>
                    <span
                      >1 {{ selectedFromToken.symbol }} = {{ swapRate }}
                      {{ selectedToToken.symbol }}</span
                    >
                  </div>
                  <div class="detail-row">
                    <span>Slippage</span>
                    <span>{{ slippage }}%</span>
                  </div>
                  <div class="detail-row">
                    <span>Network Fee</span>
                    <span>{{ networkFee }} ETH</span>
                  </div>
                </div> -->

                <!-- Swap Button -->
                <button
                  class="btn btn-swap btn-linear btn-large w-full"
                  @click="executeSwap"
                  :disabled="!canSwap || isLoading"
                >
                  <i v-if="isLoading" class="fas fa-spinner fa-spin me-2"></i>
                  <i v-else class="fas fa-exchange-alt me-2"></i>
                  {{ getSwapButtonText() }}
                </button>

                <!-- Settings -->
                <!-- <div class="swap-settings">
                  <button
                    class="btn-link"
                    @click="showSettings = !showSettings"
                  >
                    <i class="fas fa-cog me-2"></i>Settings
                  </button>
                </div> -->

                <!-- Settings Panel -->
                <div v-if="showSettings" class="settings-panel">
                  <div class="setting-item">
                    <label>Slippage Tolerance</label>
                    <div class="slippage-inputs">
                      <button
                        v-for="option in slippageOptions"
                        :key="option"
                        @click="slippage = option"
                        :class="[
                          'slippage-btn',
                          { active: slippage === option },
                        ]"
                      >
                        {{ option }}%
                      </button>
                      <input
                        v-model="customSlippage"
                        type="number"
                        class="form-control"
                        placeholder="Custom"
                        @input="setCustomSlippage"
                      />
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
      <div class="token-modal" @click.stop>
        <div class="modal-header">
          <h3>Select Token</h3>
          <button class="close-btn" @click="closeTokenModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="search-box">
            <input
              v-model="tokenSearch"
              type="text"
              class="form-control"
              placeholder="Search tokens..."
            />
          </div>
          <div class="token-list">
            <div
              v-for="token in filteredTokens"
              :key="token.address"
              class="token-item"
              @click="selectToken(token)"
            >
              <img :src="token.icon" :alt="token.symbol" class="token-icon" />
              <div class="token-info">
                <span class="token-symbol">{{ token.symbol }}</span>
                <span class="token-name">{{ token.name }}</span>
              </div>
              <div class="token-balance">
                {{ getTokenBalance(token.address) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <!-- <section class="recent-transactions padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Recent Transactions</h2>
            <div class="transactions-list">
              <div
                v-for="tx in recentTransactions"
                :key="tx.hash"
                class="transaction-item"
              >
                <div class="tx-icon">
                  <i class="fas fa-exchange-alt"></i>
                </div>
                <div class="tx-details">
                  <div class="tx-pair">
                    {{ tx.fromAmount }} {{ tx.fromToken }} → {{ tx.toAmount }}
                    {{ tx.toToken }}
                  </div>
                  <div class="tx-time">{{ formatTime(tx.timestamp) }}</div>
                </div>
                <div class="tx-status" :class="tx.status">
                  <i :class="getStatusIcon(tx.status)"></i>
                  {{ tx.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { ppoTokenAbi } from "@/abis/ppoToken.js";
import { ppoSwapAbi } from "@/abis/ppoSwap.js";
import { useWeb3 } from "@/composables/useWeb3.js";
import { useFirebase } from "@/composables/useFirebase.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useAppKit } from "@reown/appkit/vue";
import { useAccount, useDisconnect, useChainId } from "@wagmi/vue";
import { erc20Abi } from "viem";
import {
  readContract,
  getBalance,
  getConnectorClient,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { wagmiConfig } from "../config/wagmi";
import { useToast } from "vue-toastification";
import { floorFragment } from "@/utils/number";
import ReownWalletButton from "../components/ReownWalletButton.vue";
import { bsc, bscTestnet } from "viem/chains";

// PPO Token và PPO Swap contract addresses
const ppoSwapAddress = computed(() => {
  if (bsc.id === chainId.value) {
    return "0x8dCa51f217969A7f9ea1FA5e99d5a66152063188";
  }
  return "0x80B5AcE6283fAf55E8fE4FE9B15d1b2f41aFb95D";
});

// Composables
const { currentUser } = useFirebase();
const { address } = useAccount();
const chainId = useChainId();
const { disconnect } = useDisconnect();
const { open } = useAppKit();
const toast = useToast();

// State
const provider = ref(null);
const signer = ref(null);
const ppoTokenContract = ref(null);
const ppoSwapContract = ref(null);
const nativeBalance = ref(0);
const ppoBalance = ref(0);

const isWalletConnected = computed(() => !!address.value);

// Wallet connection state
const account = ref(null);
const balance = ref("0");

// Handle wallet connection events
const handleWalletConnected = (event) => {
  const { address } = event.detail;
  isWalletConnected.value = true;
  account.value = address;
};

// const handleWalletDisconnected = () => {
//   isConnected.value = false;
//   account.value = null;
//   balance.value = "0";
// };

// onMounted(() => {
//   window.addEventListener("wallet-connected", handleWalletConnected);
//   window.addEventListener("wallet-disconnected", handleWalletDisconnected);
// });

// onUnmounted(() => {
//   window.removeEventListener("wallet-connected", handleWalletConnected);
//   window.removeEventListener("wallet-disconnected", handleWalletDisconnected);
// });

// State
const isLoading = ref(false);
const showFromTokenModal = ref(false);
const showToTokenModal = ref(false);
const showSettings = ref(false);
const tokenSearch = ref("");
const slippage = ref(0.5);
const customSlippage = ref("");

// Swap form
const swapForm = reactive({
  fromAmount: "",
  toAmount: "",
});

// Total tokens
const totalTokens = ref([
  {
    chainId: bscTestnet.id,
    symbol: "BNB",
    name: "Binance",
    address: "0x0000000000000000000000000000000000000000",
    icon: "/token/bsc.png",
    decimals: 18,
  },
  {
    chainId: bscTestnet.id,
    symbol: "PPO",
    name: "PixelPayot Token",
    address: "0x1C075C6053b1FC1Ee7EED91e4ebe20428bEf4E69",
    icon: "/token/ppo.png",
    decimals: 18,
  },
  {
    chainId: bsc.id,
    symbol: "BNB",
    name: "Binance",
    address: "0x0000000000000000000000000000000000000000",
    icon: "/token/bsc.png",
    decimals: 18,
  },
  {
    chainId: bsc.id,
    symbol: "PPO",
    name: "PixelPayot Token",
    address: "0xCdA7eBb5005aaC33B6F4f32c17647698b020eFC9",
    icon: "/token/ppo.png",
    decimals: 18,
  },
  {
    chainId: bscTestnet.id,
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    icon: "/token/usdt.png",
    decimals: 6,
  },
  {
    chainId: bscTestnet.id,
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
    icon: "/token/usdc.webp",
    decimals: 6,
  },
]);

// Available tokens
const availableTokens = computed(() =>
  totalTokens.value.filter((token) => token.chainId === chainId.value)
);

// Selected tokens
const selectedFromToken = ref(availableTokens.value[0]);
const selectedToToken = ref(availableTokens.value[1]);
watch(availableTokens, () => {
  if (chainId.value === bscTestnet.id) {
    selectedFromToken.value = availableTokens.value[0];
    selectedToToken.value = availableTokens.value[1];
  } else if (chainId.value === bsc.id) {
    selectedFromToken.value = availableTokens.value[0];
    selectedToToken.value = availableTokens.value[1];
  }
});

// Balances
const tokenBalances = ref({});
const fromTokenBalance = ref(0);
const toTokenBalance = ref(0);

// Slippage options
const slippageOptions = [0.1, 0.5, 1.0];

// Recent transactions
const recentTransactions = ref([
  {
    hash: "0x123...",
    fromAmount: "1.5",
    fromToken: "ETH",
    toAmount: "2500",
    toToken: "PPO",
    timestamp: Date.now() - 3600000,
    status: "completed",
  },
  {
    hash: "0x456...",
    fromAmount: "100",
    fromToken: "PPO",
    toAmount: "0.06",
    toToken: "ETH",
    timestamp: Date.now() - 7200000,
    status: "pending",
  },
]);

// Computed
const filteredTokens = computed(() => {
  if (!tokenSearch.value) return availableTokens.value;
  return availableTokens.value.filter(
    (token) =>
      token.symbol.toLowerCase().includes(tokenSearch.value.toLowerCase()) ||
      token.name.toLowerCase().includes(tokenSearch.value.toLowerCase())
  );
});

const swapRate = computed(() => {
  // Mock exchange rate - in real app, this would come from DEX API
  if (
    selectedFromToken.value.symbol === "ETH" &&
    selectedToToken.value.symbol === "PPO"
  ) {
    return 1666.67;
  }
  if (
    selectedFromToken.value.symbol === "PPO" &&
    selectedToToken.value.symbol === "ETH"
  ) {
    return 0.0006;
  }
  return 1;
});

const networkFee = computed(() => {
  return "0.005";
});

const canSwap = computed(() => {
  return (
    swapForm.fromAmount > 0 &&
    parseFloat(swapForm.fromAmount) <= fromTokenBalance.value &&
    selectedFromToken.value.address !== selectedToToken.value.address
  );
});

const calculateSwap = () => {
  if (swapForm.fromAmount > 0) {
    const rate = swapRate.value;

    const parsedAmount = ethers.parseUnits(
      swapForm.fromAmount?.toString(),
      selectedFromToken.value.decimals
    );
    console.log("Parsed Amount:", parsedAmount);
    console.log("ppoSwapAddress.value:", ppoSwapAddress.value);
    readContract(wagmiConfig, {
      chainId: chainId.value,
      abi: ppoSwapAbi,
      address: ppoSwapAddress.value,
      functionName: "getEstimateAmountsOut",
      args: [parsedAmount],
    }).then((data) => {
      console.log("getEstimateAmountsOut:", data);
      const formattedAmount = ethers.formatUnits(
        data,
        selectedToToken.value.decimals
      );
      swapForm.toAmount = (+formattedAmount).toFixed(5);
    });
  } else {
    swapForm.toAmount = "";
  }
};

const swapTokens = () => {
  const temp = selectedFromToken.value;
  selectedFromToken.value = selectedToToken.value;
  selectedToToken.value = temp;
  calculateSwap();
};

const setMaxAmount = () => {
  swapForm.fromAmount = fromTokenBalance.value.toString();
  calculateSwap();
};

const executeSwap = async () => {
  if (!canSwap.value) return;

  try {
    isLoading.value = true;

    const balance = +tokenBalances.value[selectedFromToken.value.address] || 0;
    if (balance < +swapForm.fromAmount) {
      toast.error("Insufficient balance");
      return;
    }

    const parsedAmount = ethers.parseUnits(
      swapForm.fromAmount?.toString(),
      selectedFromToken.value.decimals
    );
    console.log("Parsed Amount:", parsedAmount);
    const txHash = await writeContract(wagmiConfig, {
      chainId: chainId.value,
      abi: ppoSwapAbi,
      address: ppoSwapAddress.value,
      functionName: "swap",
      args: [],
      value: parsedAmount,
    });
    toast.info("Transaction sent. Waiting for confirmation...");

    // Reset form
    swapForm.fromAmount = "";
    swapForm.toAmount = "";

    await waitForTransactionReceipt(wagmiConfig, {
      chainId: chainId.value,
      hash: txHash,
    });

    toast.success("Swap successfully!");

    // Add to recent transactions
    recentTransactions.value.unshift({
      hash: "0x" + Math.random().toString(36).substr(2, 9),
      fromAmount: swapForm.fromAmount,
      fromToken: selectedFromToken.value.symbol,
      toAmount: swapForm.toAmount,
      toToken: selectedToToken.value.symbol,
      timestamp: Date.now(),
      status: "completed",
    });

    // Update balances
    await loadTokenBalances();
  } catch (error) {
    console.error("Swap failed:", error);
    toast.error("Swap failed!");
  } finally {
    isLoading.value = false;
  }
};

const selectToken = (token) => {
  if (showFromTokenModal.value) {
    selectedFromToken.value = token;
  } else {
    selectedToToken.value = token;
  }
  closeTokenModal();
  calculateSwap();
};

const closeTokenModal = () => {
  showFromTokenModal.value = false;
  showToTokenModal.value = false;
  tokenSearch.value = "";
};

const setCustomSlippage = () => {
  if (customSlippage.value > 0) {
    slippage.value = parseFloat(customSlippage.value);
  }
};

const getTokenBalance = (address) => {
  return tokenBalances.value[address] || 0;
};

const loadTokenBalances = async () => {
  if (!address.value) return;

  try {
    console.log("chainId.value:", chainId.value);

    ethers;

    // Lấy số dư của native token
    const nativeBalance = await getBalance(wagmiConfig, {
      chainId: chainId.value,
      address: address.value,
      units: "ether",
    });

    // const client = await getConnectorClient(wagmiConfig, { chainId });

    console.log("nativeBalance:", nativeBalance);
    const ppoBalance = await readContract(wagmiConfig, {
      chainId: chainId.value,
      abi: ppoTokenAbi,
      address: selectedToToken.value.address,
      functionName: "balanceOf",
      args: [address.value],
    });

    console.log("Balance:", ppoBalance);

    const formattedPpoBalance = ethers.formatUnits(ppoBalance, 18);

    // Mock balances - in real app, this would fetch from blockchain
    tokenBalances.value = {
      "0x0000000000000000000000000000000000000000": nativeBalance?.formatted, // BNB
      [selectedToToken.value.address]: formattedPpoBalance, // PPO
      // "0xdAC17F958D2ee523a2206206994597C13D831ec7": 100, // USDT
      // "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8": 50, // USDC
    };

    fromTokenBalance.value = getTokenBalance(selectedFromToken.value.address);
    toTokenBalance.value = getTokenBalance(selectedToToken.value.address);
  } catch (error) {
    console.error("Failed to load balances:", error);
  }
};

const getSwapButtonText = () => {
  if (isLoading.value) return "Swapping...";
  if (!isWalletConnected.value) return "Connect Wallet";
  if (!swapForm.fromAmount) return "Swap";
  if (parseFloat(swapForm.fromAmount) > fromTokenBalance.value)
    return "Insufficient Balance";
  if (selectedFromToken.value.address === selectedToToken.value.address)
    return "Select different tokens";
  return "Swap";
};

const formatTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
};

const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return "fas fa-check-circle";
    case "pending":
      return "fas fa-clock";
    case "failed":
      return "fas fa-times-circle";
    default:
      return "fas fa-question-circle";
  }
};

// Lifecycle
onMounted(async () => {
  await loadTokenBalances();
});

// Watch for wallet address changes
watch(address, async (newAddress, oldAddress) => {
  console.log(`Address changed from ${oldAddress} to ${newAddress}`);
  if (newAddress !== oldAddress) {
    await loadTokenBalances();
  }
});
</script>

<style scoped>
.swap-container {
  max-width: 600px;
}

.swap-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.swap-hero {
  padding-top: 60px;
  padding-bottom: 20px;
}

.swap-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
}

.swap-interface {
  padding-top: 20px;
  padding-bottom: 60px;
}

.swap-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.swap-card {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.wallet-notice {
  text-align: center;
  padding: 40px 0;
  color: white;
}

.notice-content i {
  font-size: 3rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.notice-content h4 {
  margin-bottom: 15px;
}

.notice-content p {
  margin-bottom: 25px;
  opacity: 0.8;
}

.notice-content .connect-btn {
  display: flex;
  justify-content: center;
}

.token-input {
  margin-bottom: 20px;
}

.token-input label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.form-control {
  flex: 1;
  background: transparent;
  border: none;
  padding: 15px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-control:focus {
  outline: none;
}

.token-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.token-selector:hover {
  background: rgba(255, 255, 255, 0.2);
}

.token-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.token-symbol {
  font-weight: 600;
  color: white;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.btn-link {
  background: none;
  border: none;
  color: #cc00ff;
  cursor: pointer;
  font-size: 14px;
}

.btn-link:hover {
  text-decoration: underline;
}

.swap-direction {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.direction-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.direction-btn:hover {
  transform: rotate(180deg);
}

.swap-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.detail-row:last-child {
  margin-bottom: 0;
}

.btn-swap {
  display: block;
  margin: auto;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-linear:hover:not(:disabled) {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.btn-linear:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.swap-settings {
  text-align: center;
  margin-top: 20px;
}

.settings-panel {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
}

.setting-item label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
}

.slippage-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.slippage-btn {
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slippage-btn.active {
  background: #cc00ff;
  border-color: #cc00ff;
}

.slippage-btn:hover {
  background: rgba(204, 0, 255, 0.2);
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

.token-modal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
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
}

.search-box {
  margin-bottom: 20px;
}

.token-list {
  max-height: 400px;
  overflow-y: auto;
}

.token-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.token-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.token-info {
  flex: 1;
}

.token-symbol {
  display: block;
  font-weight: 600;
}

.token-name {
  display: block;
  font-size: 14px;
  opacity: 0.7;
}

.token-balance {
  font-weight: 600;
}

.recent-transactions {
  background: rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 768px) {
  .section-title {
    font-size: 2rem;
    line-height: normal;
  }
}

.transactions-list {
  max-width: 800px;
  margin: 0 auto;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 15px;
  color: white;
}

.tx-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx-details {
  flex: 1;
}

.tx-pair {
  font-weight: 600;
  margin-bottom: 5px;
}

.tx-time {
  font-size: 14px;
  opacity: 0.7;
}

.tx-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
}

.tx-status.completed {
  color: #51cf66;
}

.tx-status.pending {
  color: #ffd43b;
}

.tx-status.failed {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .swap-title {
    font-size: 2rem;
  }

  .swap-card {
    padding: 20px;
  }

  .token-selector {
    min-width: 100px;
    padding: 12px 15px;
  }

  .slippage-inputs {
    flex-wrap: wrap;
  }
}
</style>
