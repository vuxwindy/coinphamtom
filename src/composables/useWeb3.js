import { ref, computed } from 'vue'
import Web3 from 'web3'

// Web3 state
const isWeb3Ready = ref(false)
const web3Error = ref(null)
const isWalletConnected = ref(false)
const walletAddress = ref('')
const walletBalance = ref('0')
const web3Instance = ref(null)

// Initialize Web3
const initializeWeb3 = async () => {
  try {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      web3Instance.value = new Web3(window.ethereum)
      isWeb3Ready.value = true
      web3Error.value = null
      
      // Check if already connected
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        await connectWallet()
      }
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      
      // Web3 initialized successfully
    } else {
      web3Error.value = 'MetaMask is not installed. Please install MetaMask to use this feature.'
      console.warn('⚠️ MetaMask not found')
    }
  } catch (error) {
    web3Error.value = `Failed to initialize Web3: ${error.message}`
    console.error('❌ Web3 initialization failed:', error)
  }
}

// Connect wallet
const connectWallet = async () => {
  try {
    if (!isWeb3Ready.value) {
      throw new Error('Web3 is not ready')
    }
    
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    })
    
    if (accounts.length > 0) {
      walletAddress.value = accounts[0]
      isWalletConnected.value = true
      await getBalance()
      // Wallet connected successfully
    }
  } catch (error) {
    web3Error.value = `Failed to connect wallet: ${error.message}`
    console.error('❌ Wallet connection failed:', error)
  }
}

// Disconnect wallet
const disconnectWallet = () => {
  walletAddress.value = ''
  walletBalance.value = '0'
  isWalletConnected.value = false
      // Wallet disconnected successfully
}

// Get wallet balance
const getBalance = async () => {
  try {
    if (!isWalletConnected.value || !web3Instance.value) {
      return '0'
    }
    
    const balance = await web3Instance.value.eth.getBalance(walletAddress.value)
    const balanceInEth = web3Instance.value.utils.fromWei(balance, 'ether')
    walletBalance.value = parseFloat(balanceInEth).toFixed(4)
    
    return walletBalance.value
  } catch (error) {
    console.error('❌ Failed to get balance:', error)
    return '0'
  }
}

// Handle account changes
const handleAccountsChanged = async (accounts) => {
  if (accounts.length === 0) {
    // User disconnected wallet
    disconnectWallet()
  } else {
    // User switched accounts
    walletAddress.value = accounts[0]
    await getBalance()
  }
}

// Handle chain changes
const handleChainChanged = () => {
  // Reload the page when chain changes
  window.location.reload()
}

// Send transaction
const sendTransaction = async (to, amount, data = '') => {
  try {
    if (!isWalletConnected.value) {
      throw new Error('Wallet not connected')
    }
    
    const transaction = {
      from: walletAddress.value,
      to: to,
      value: web3Instance.value.utils.toWei(amount.toString(), 'ether'),
      data: data
    }
    
    const result = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transaction]
    })
    
    // Transaction sent successfully
    return result
  } catch (error) {
    console.error('❌ Transaction failed:', error)
    throw error
  }
}

// Sign message
const signMessage = async (message) => {
  try {
    if (!isWalletConnected.value) {
      throw new Error('Wallet not connected')
    }
    
    const result = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, walletAddress.value]
    })
    
    // Message signed successfully
    return result
  } catch (error) {
    console.error('❌ Message signing failed:', error)
    throw error
  }
}

// Get network info
const getNetworkInfo = async () => {
  try {
    if (!web3Instance.value) {
      return null
    }
    
    const networkId = await web3Instance.value.eth.net.getId()
    const networkType = await web3Instance.value.eth.net.getNetworkType()
    
    return {
      id: networkId,
      type: networkType
    }
  } catch (error) {
    console.error('❌ Failed to get network info:', error)
    return null
  }
}

// Computed properties
const shortAddress = computed(() => {
  if (!walletAddress.value) return ''
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
})

const isMainnet = computed(() => {
  return web3Instance.value?.eth?.net?.getId() === 1
})

// Initialize Web3 on module load
initializeWeb3()

export function useWeb3() {
  return {
    // State
    isWeb3Ready,
    web3Error,
    isWalletConnected,
    walletAddress,
    walletBalance,
    web3Instance,
    
    // Computed
    shortAddress,
    isMainnet,
    
    // Methods
    initializeWeb3,
    connectWallet,
    disconnectWallet,
    getBalance,
    sendTransaction,
    signMessage,
    getNetworkInfo
  }
}
