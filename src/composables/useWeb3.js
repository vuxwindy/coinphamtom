import { ref, computed, onMounted } from 'vue'
import Web3 from 'web3'

export function useWeb3() {
  // State
  const isWeb3Ready = ref(false)
  const web3Error = ref(null)
  const isWalletConnected = ref(false)
  const walletAddress = ref('')
  const walletBalance = ref('0')
  const web3Instance = ref(null)

  // Computed
  const shortAddress = computed(() => {
    if (!walletAddress.value) return ''
    return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
  })

  const isMainnet = computed(() => {
    return web3Instance.value?.eth?.net?.getId() === 1
  })

  // Check wallet connection status
  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          walletAddress.value = accounts[0]
          isWalletConnected.value = true
          await getBalance()
          
          // Dispatch event for other components
          window.dispatchEvent(new CustomEvent('wallet-connected', {
            detail: { address: accounts[0] }
          }))
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  // Initialize Web3
  const initializeWeb3 = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        web3Instance.value = new Web3(window.ethereum)
        isWeb3Ready.value = true
        web3Error.value = null
        
        // Check if already connected
        await checkWalletConnection()
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)
        
        console.log('✅ Web3 initialized successfully')
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
        await initializeWeb3()
      }
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      if (accounts.length > 0) {
        walletAddress.value = accounts[0]
        isWalletConnected.value = true
        await getBalance()
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('wallet-connected', {
          detail: { address: accounts[0] }
        }))
        
        console.log('✅ Wallet connected successfully')
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
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('wallet-disconnected'))
    
    console.log('✅ Wallet disconnected successfully')
  }

  // Get balance
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
      disconnectWallet()
    } else {
      walletAddress.value = accounts[0]
      await getBalance()
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('wallet-connected', {
        detail: { address: accounts[0] }
      }))
    }
  }

  // Handle chain changes
  const handleChainChanged = () => {
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
      
      console.log('✅ Transaction sent successfully')
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
      
      console.log('✅ Message signed successfully')
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

  // Initialize on first use
  onMounted(() => {
    initializeWeb3()
  })

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
    getNetworkInfo,
    checkWalletConnection
  }
}
