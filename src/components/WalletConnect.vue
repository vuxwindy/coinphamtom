<template>
  <div class="wallet-connect">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Wallet Connection</h5>
            </div>
            <div class="card-body">
                             <div v-if="!isWalletConnected" class="text-center">
                 <button 
                   @click="connectWallet" 
                   class="btn btn-primary"
                   :disabled="!isWeb3Ready"
                 >
                   <i class="fas fa-wallet me-2"></i>
                   Connect MetaMask
                 </button>
                 <p v-if="!isWeb3Ready" class="text-muted mt-2">
                   <i class="fas fa-spinner fa-spin me-2"></i>
                   Initializing Web3...
                 </p>
                 <p v-else class="text-muted mt-2">
                   <i class="fas fa-info-circle me-2"></i>
                   Click to connect your MetaMask wallet
                 </p>
               </div>
              
                             <div v-else class="wallet-info">
                 <div class="alert alert-success">
                   <i class="fas fa-check-circle me-2"></i>
                   MetaMask Connected!
                 </div>
                 <p><strong>Address:</strong> {{ shortAddress }}</p>
                 <p><strong>Balance:</strong> {{ walletBalance }} ETH</p>
                 <div class="mt-3">
                   <button @click="refreshBalance" class="btn btn-outline-primary me-2">
                     <i class="fas fa-sync-alt me-2"></i>
                     Refresh Balance
                   </button>
                   <button @click="disconnectWallet" class="btn btn-outline-danger">
                     <i class="fas fa-times me-2"></i>
                     Disconnect
                   </button>
                 </div>
               </div>
              
              <div v-if="web3Error" class="alert alert-warning mt-3">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ web3Error }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Firebase Status</h5>
            </div>
            <div class="card-body">
              <div v-if="isFirebaseReady" class="alert alert-success">
                <i class="fas fa-check-circle me-2"></i>
                Firebase Ready!
              </div>
              <div v-else class="alert alert-warning">
                <i class="fas fa-spinner fa-spin me-2"></i>
                Initializing Firebase...
              </div>
              
              <div v-if="currentUser" class="user-info">
                <p><strong>User:</strong> {{ currentUser.email }}</p>
                <button @click="signOut" class="btn btn-outline-secondary">
                  <i class="fas fa-sign-out-alt me-2"></i>
                  Sign Out
                </button>
              </div>
              <div v-else>
                <p class="text-muted">No user logged in</p>
              </div>
              
              <div v-if="firebaseError" class="alert alert-warning mt-3">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ firebaseError }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeb3 } from '../composables/useWeb3.js'
import { useFirebase } from '../composables/useFirebase.js'

// Use composables
const {
  isWeb3Ready,
  web3Error,
  isWalletConnected,
  walletAddress,
  walletBalance,
  connectWallet,
  disconnectWallet,
  getBalance
} = useWeb3()

const {
  isFirebaseReady,
  firebaseError,
  currentUser,
  signOut
} = useFirebase()

// Computed properties
const shortAddress = computed(() => {
  if (!walletAddress.value) return ''
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
})

// Methods
const refreshBalance = async () => {
  if (walletAddress.value) {
    const balance = await getBalance()
          // Balance refreshed successfully
  }
}
</script>

<style scoped>
.wallet-connect {
  padding: 20px 0;
}

.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.card-header {
  background: rgba(204, 0, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.card-body {
  color: white;
}

.btn {
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.wallet-info {
  text-align: center;
}

.user-info {
  text-align: center;
}

.alert {
  border-radius: 8px;
  border: none;
}

.alert-success {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.alert-warning {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}
</style>
