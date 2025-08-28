import { ref, computed, onMounted, watch } from 'vue'
import { useAccount } from '@wagmi/vue'
import { useFirebase } from './useFirebase.js'

export function useReferralSystem() {
  const { address, isConnected } = useAccount()
  const { currentUser, getUserData, addReferral } = useFirebase()

  // Referral state
  const userReferralCode = ref('')
  const userReferralLink = ref('')
  const referralStats = ref({
    totalReferrals: 0,
    totalEarnings: 0,
    activeReferrals: 0,
    conversionRate: 0,
    level: 'F0',
    refsNeeded: 15
  })
  const referrals = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Computed properties
  const isUserReady = computed(() => {
    return isConnected.value && (currentUser.value || address.value)
  })

  const shortReferralCode = computed(() => {
    if (!userReferralCode.value) return ''
    return userReferralCode.value.slice(0, 8) + '...'
  })

  // Methods
  const generateReferralCode = (address) => {
    if (!address) return ''
    // Generate a unique referral code based on wallet address
    const shortAddress = address.slice(2, 8).toUpperCase()
    const timestamp = Date.now().toString(36).toUpperCase()
    return `PPO${shortAddress}${timestamp}`
  }

  const generateReferralLink = (code) => {
    if (!code) return ''
    return `${window.location.origin}/signup?ref=${code}`
  }

  const loadReferralData = async () => {
    if (!isUserReady.value) return

    try {
      isLoading.value = true
      error.value = null

      // Get user data from Firebase
      const userData = await getUserData()
      if (userData.success) {
        const data = userData.data
        
        // Set referral code
        userReferralCode.value = data.referralCode || generateReferralCode(address.value)
        userReferralLink.value = generateReferralLink(userReferralCode.value)
        
        // Set referral stats
        referralStats.value = {
          totalReferrals: data.referralCount || 0,
          totalEarnings: data.referralEarnings || 0,
          activeReferrals: data.activeReferrals || 0,
          conversionRate: data.conversionRate || 0,
          level: data.level || 'F0',
          refsNeeded: calculateRefsNeeded(data.referralCount || 0)
        }
      }
    } catch (err) {
      error.value = err.message
      console.error('Failed to load referral data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const calculateRefsNeeded = (currentRefs) => {
    const levels = {
      'F0': 15,
      'F1': 30,
      'F2': 50,
      'F3': 100,
      'F4': 200,
      'F5': 500
    }
    
    const currentLevel = getCurrentLevel(currentRefs)
    const nextLevel = getNextLevel(currentLevel)
    const refsForNextLevel = levels[nextLevel] || 0
    
    return Math.max(0, refsForNextLevel - currentRefs)
  }

  const getCurrentLevel = (refs) => {
    if (refs >= 500) return 'F5'
    if (refs >= 200) return 'F4'
    if (refs >= 100) return 'F3'
    if (refs >= 50) return 'F2'
    if (refs >= 15) return 'F1'
    return 'F0'
  }

  const getNextLevel = (currentLevel) => {
    const levelOrder = ['F0', 'F1', 'F2', 'F3', 'F4', 'F5']
    const currentIndex = levelOrder.indexOf(currentLevel)
    return levelOrder[currentIndex + 1] || currentLevel
  }

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(userReferralLink.value)
      return { success: true, message: 'Referral link copied to clipboard!' }
    } catch (err) {
      console.error('Failed to copy referral link:', err)
      return { success: false, error: 'Failed to copy referral link' }
    }
  }

  const shareReferralLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join PixelPayot - Earn Rewards!',
          text: 'Join me on PixelPayot and earn rewards by completing daily tasks!',
          url: userReferralLink.value
        })
        return { success: true, message: 'Shared successfully!' }
      } else {
        // Fallback to copying
        return await copyReferralLink()
      }
    } catch (err) {
      console.error('Failed to share referral link:', err)
      return { success: false, error: 'Failed to share referral link' }
    }
  }

  const processReferral = async (referralCode) => {
    if (!isUserReady.value) {
      return { success: false, error: 'Please connect your wallet and sign in first!' }
    }

    try {
      isLoading.value = true
      error.value = null

      const result = await addReferral(referralCode)
      
      if (result.success) {
        // Reload referral data
        await loadReferralData()
        return { success: true, message: 'Referral processed successfully!' }
      } else {
        return { success: false, error: result.error }
      }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const getReferralFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('ref') || null
  }

  // Watch for wallet connection changes
  watch(isConnected, (newValue) => {
    if (newValue) {
      console.log('🔗 Wallet connected, loading referral data...')
      loadReferralData()
    } else {
      console.log('🔒 Wallet disconnected, clearing referral data...')
      // Clear referral data when wallet disconnects
      userReferralCode.value = ''
      userReferralLink.value = ''
      referralStats.value = {
        totalReferrals: 0,
        totalEarnings: 0,
        activeReferrals: 0,
        conversionRate: 0,
        level: 'F0',
        refsNeeded: 15
      }
      referrals.value = []
    }
  })

  // Watch for user authentication changes
  watch(currentUser, (newUser) => {
    if (newUser) {
      console.log('👤 User authenticated, loading referral data...')
      loadReferralData()
    }
  })

  // Initialize on mount
  onMounted(() => {
    console.log('🚀 Initializing Referral System...')
    
    // Check for referral code in URL
    const urlReferral = getReferralFromURL()
    if (urlReferral) {
      console.log('📋 Found referral code in URL:', urlReferral)
      // Process referral if user is ready
      if (isUserReady.value) {
        processReferral(urlReferral)
      }
    }
    
    if (isUserReady.value) {
      loadReferralData()
    }
  })

  return {
    // State
    userReferralCode,
    userReferralLink,
    referralStats,
    referrals,
    isLoading,
    error,
    
    // Computed
    isUserReady,
    shortReferralCode,
    
    // Methods
    generateReferralCode,
    generateReferralLink,
    loadReferralData,
    copyReferralLink,
    shareReferralLink,
    processReferral,
    getReferralFromURL,
    calculateRefsNeeded,
    getCurrentLevel,
    getNextLevel
  }
}
