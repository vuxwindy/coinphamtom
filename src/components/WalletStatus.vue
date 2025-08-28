<template>
  <div
    class="wallet-status"
    v-if="isConnected"
  >
    <div class="wallet-info">
      <div class="wallet-icon">
        <i :class="getWalletIcon(connectedWallet)"></i>
      </div>
      <div class="wallet-details">
        <div class="address">{{ shortAddress }}</div>
        <div class="network">{{ networkName }}</div>
      </div>
    </div>
    <button
      @click="disconnect"
      class="disconnect-btn"
      title="Disconnect"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDisconnect } from '@wagmi/vue'

export default {
  name: 'WalletStatus',
  setup() {
    const isConnected = ref(false)
    const connectedWallet = ref(null)
    const walletAddress = ref(null)
    const networkName = ref('Ethereum')

    const { disconnect: onDisconnect } = useDisconnect()

    const shortAddress = computed(() => {
      if (!walletAddress.value) return ''
      return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(
        -4
      )}`
    })

    const getWalletIcon = (walletId) => {
      const icons = {
        metamask: 'fab fa-ethereum',
        coinbase: 'fas fa-wallet',
        trust: 'fas fa-shield-alt',
        binance: 'fas fa-wallet',
        okx: 'fas fa-key',
        'io.metamask': 'fab fa-ethereum',
        'com.coinbase.wallet': 'fas fa-wallet',
        'com.trustwallet.app': 'fas fa-shield-alt',
        'com.binance.wallet': 'fas fa-wallet',
        'com.okex.wallet': 'fas fa-key',
      }
      return icons[walletId] || 'fas fa-wallet'
    }

    const disconnect = () => {
      isConnected.value = false
      connectedWallet.value = null
      walletAddress.value = null

      onDisconnect()
      // Emit disconnect event
      // window.dispatchEvent(new CustomEvent('wallet-disconnected'))
    }

    const handleWalletConnected = (event) => {
      const { address, wallet } = event.detail
      isConnected.value = true
      connectedWallet.value = wallet
      walletAddress.value = address
    }

    onMounted(() => {
      window.addEventListener('wallet-connected', handleWalletConnected)
    })

    onUnmounted(() => {
      window.removeEventListener('wallet-connected', handleWalletConnected)
    })

    return {
      isConnected,
      connectedWallet,
      walletAddress,
      networkName,
      shortAddress,
      getWalletIcon,
      disconnect,
    }
  },
}
</script>

<style scoped>
.wallet-status {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.wallet-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.wallet-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.wallet-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.address {
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
}

.network {
  font-size: 11px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.disconnect-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disconnect-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 480px) {
  .wallet-status {
    padding: 6px 10px;
    font-size: 12px;
  }

  .address {
    font-size: 11px;
  }

  .wallet-icon {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
}
</style>
