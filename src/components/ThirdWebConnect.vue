<template>
  <div class="thirdweb-connect" style="display: inline-block;">
    <button @click="showModal = true" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);">
      <i class="fas fa-wallet" style="font-size: 16px;"></i>
      Connect Wallet
    </button>

    <!-- Modal Overlay -->
    <div v-if="showModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(4px); padding: 16px;" @click="showModal = false">
      <!-- Modal Content -->
      <div style="  position: fixed;
    top: 25%;
background: white; border-radius: 16px; padding: 0; max-width: 450px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); animation: modalSlideIn 0.3s ease;" @click.stop>
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 20px 0 20px; border-bottom: 1px solid #f3f4f6; position: sticky; top: 0; background: white; z-index: 10;">
          <h3 style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600;">Connect Wallet</h3>
          <button @click="showModal = false" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #9ca3af; padding: 8px; border-radius: 8px; transition: all 0.2s ease; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        
        <!-- Wallet List -->
        <div style="padding: 20px;">
          <div style="margin-bottom: 16px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">Choose your preferred wallet</p>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <button 
              v-for="wallet in walletList" 
              :key="wallet.id"
              @click="connectWallet(wallet)"
              :disabled="isConnecting"
              style="width: 100%; background: white; border: 2px solid #f3f4f6; padding: 16px; border-radius: 12px; cursor: pointer; text-align: left; font-size: 14px; display: flex; align-items: center; gap: 12px; transition: all 0.3s ease; position: relative; overflow: hidden; min-height: 72px;"
              :style="{ 
                'border-color': wallet.id === 'io.metamask' ? '#f6851b' : wallet.id === 'com.coinbase.wallet' ? '#0052ff' : '#3375bb',
                'opacity': isConnecting ? '0.6' : '1',
                'cursor': isConnecting ? 'not-allowed' : 'pointer'
              }"
            >
              <!-- Wallet Icon -->
              <div style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; flex-shrink: 0;"
                   :style="{ 'background': wallet.id === 'io.metamask' ? 'linear-gradient(135deg, #f6851b, #e2761b)' : wallet.id === 'com.coinbase.wallet' ? 'linear-gradient(135deg, #0052ff, #0043cc)' : 'linear-gradient(135deg, #3375bb, #2a5f9e)' }">
                <i :class="wallet.icon"></i>
              </div>
              
              <!-- Wallet Info -->
              <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; color: #1f2937; margin-bottom: 2px; font-size: 16px;">{{ wallet.name }}</div>
                <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">{{ wallet.description }}</div>
              </div>
              
              <!-- Loading or Arrow -->
              <div style="color: #9ca3af; font-size: 14px; transition: all 0.3s ease; flex-shrink: 0;">
                <i v-if="isConnecting" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-chevron-right"></i>
              </div>
            </button>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 16px 20px 20px 20px; border-top: 1px solid #f3f4f6; text-align: center; position: sticky; bottom: 0; background: white;">
          <p style="margin: 0 0 16px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
            Don't have a wallet? 
            <a href="https://metamask.io/download/" target="_blank" style="color: #667eea; text-decoration: none; font-weight: 500;">Get MetaMask</a>
          </p>
          <button @click="showModal = false" style="background: #f3f4f6; color: #374151; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s ease; width: 100%; max-width: 200px;">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createThirdwebClient } from 'thirdweb'
import { createWallet } from 'thirdweb/wallets'
import { thirdwebConfig } from '@/config/thirdweb.js'

export default {
  name: 'ThirdWebConnect',
  setup() {
    const showModal = ref(false)
    const isConnecting = ref(false)
    let client = null
    let wallets = []

    const walletList = [
      { 
        id: 'io.metamask', 
        name: 'MetaMask', 
        description: 'The most popular wallet',
        icon: 'fab fa-ethereum'
      },
      { 
        id: 'com.coinbase.wallet', 
        name: 'Coinbase Wallet', 
        description: 'Simple and secure',
        icon: 'fas fa-wallet'
      },
      { 
        id: 'com.trustwallet.app', 
        name: 'Trust Wallet', 
        description: 'Mobile-first wallet',
        icon: 'fas fa-shield-alt'
      }
    ]

    onMounted(async () => {
      try {
        // Initialize ThirdWeb client with config
        client = createThirdwebClient({
          clientId: thirdwebConfig.clientId,
        })

        // Create wallet instances
        wallets = walletList.map(wallet => createWallet(wallet.id))
      } catch (error) {
        console.error('Failed to initialize ThirdWeb:', error)
      }
    })

    const connectWallet = async (walletConfig) => {
      if (isConnecting.value) return
      
      isConnecting.value = true
      
      try {
        // Find the corresponding wallet instance
        const wallet = wallets.find(w => w.id === walletConfig.id)
        
        if (!wallet) {
          throw new Error('Wallet not found')
        }

        // Connect to the wallet - this will trigger the actual Web3 popup
        const result = await wallet.connect({
          client,
        })

        if (result.error) {
          throw new Error(result.error.message || 'Connection failed')
        }

        // Success - close modal and dispatch event
        showModal.value = false
        
        window.dispatchEvent(new CustomEvent('wallet-connected', {
          detail: {
            address: result.data.address,
            wallet: walletConfig.id,
            connection: result.data
          }
        }))
        
        showNotification(`Connected to ${walletConfig.name}!`, 'success')
        
      } catch (error) {
        console.error('Wallet connection error:', error)
        
        let errorMessage = 'Connection failed'
        
        if (error.message.includes('User rejected')) {
          errorMessage = 'Connection was cancelled'
        } else if (error.message.includes('not installed')) {
          errorMessage = `${walletConfig.name} is not installed`
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error occurred'
        }
        
        showNotification(errorMessage, 'error')
      } finally {
        isConnecting.value = false
      }
    }

    const showNotification = (message, type = 'info') => {
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        text-align: center;
      `
      notification.textContent = message
      document.body.appendChild(notification)
      
      // Remove after 4 seconds
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.style.animation = 'slideOutRight 0.3s ease'
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification)
            }
          }, 300)
        }
      }, 4000)
    }

    return {
      showModal,
      isConnecting,
      walletList,
      connectWallet
    }
  }
}
</script>

<style scoped>
/* Animation keyframes */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
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

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .thirdweb-connect button {
    font-size: 13px !important;
    padding: 8px 16px !important;
  }
}

/* Hover effects for wallet buttons */
button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:hover:not(:disabled) .fas.fa-chevron-right {
  transform: translateX(4px);
}

/* Touch-friendly mobile styles */
@media (max-width: 768px) {
  button {
    min-height: 44px !important; /* iOS minimum touch target */
  }
  
  .fas.fa-chevron-right {
    font-size: 16px !important;
  }
}
</style>
