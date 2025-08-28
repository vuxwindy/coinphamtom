import { ref, computed } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'
import { app } from '../config/firebase.js'

// Firebase instances
const auth = getAuth(app)
const db = getFirestore(app)

// State
const isFirebaseReady = ref(false)
const firebaseError = ref(null)
const currentUser = ref(null)
const isLoading = ref(false)

// Initialize Firebase
const initializeFirebase = async () => {
  try {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user
      isFirebaseReady.value = true

      if (user) {
        loadUserData(user.uid)
      } else {
        currentUser.value = null
      }
    })

    // Initialize Firebase
    try {
      // Firebase is already initialized
    } catch (error) {
      // Handle initialization error
    }
  } catch (error) {
    firebaseError.value = `Failed to initialize Firebase: ${error.message}`
    console.error('❌ Firebase initialization failed:', error)
  }
}

// Load user data from Firestore
const loadUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return userData
    } else {
      // Create new user document
      await createUserDocument(userId)
    }
  } catch (error) {
    console.error('❌ Failed to load user data:', error)
  }
}

// Create user document
const createUserDocument = async (userId) => {
  try {
    const user = auth.currentUser
    if (!user) return

    // Generate unique referral code
    const referralCode = generateReferralCode()
    
    const userData = {
      uid: userId,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      // Game specific data
      tokenBalance: 0,
      nftBalance: 0,
      totalEarned: 0,
      referralEarnings: 0,
      referralCode: referralCode,
      referralCount: 0,
      level: 'F0',
      dailyTasks: {
        checkIn: false,
      },
      completedTasks: [], // Track one-time completed tasks
      lastCheckIn: null,
      transactions: [],
      // Accumulated rewards system
      accumulatedRewards: 0, // Total rewards earned from tasks
      claimedRewards: 0, // Total rewards claimed
      pendingRewards: 0, // Rewards waiting to be claimed (accumulatedRewards - claimedRewards)
      lastClaimDate: null,
    }

    await setDoc(doc(db, 'users', userId), userData)
    console.log('✅ User document created with referral code:', referralCode)
  } catch (error) {
    console.error('❌ Failed to create user document:', error)
  }
}

// Generate referral code
const generateReferralCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate referral link
const generateReferralLink = (code) => {
  return `https://pixelpayot.com/signup?ref=${code}`
}

// Sign in with email and password
const signIn = async (email, password) => {
  try {
    isLoading.value = true
    firebaseError.value = null

    const result = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: result.user }
  } catch (error) {
    firebaseError.value = getAuthErrorMessage(error.code)
    console.error('❌ Sign in failed:', error)
    return { success: false, error: firebaseError.value }
  } finally {
    isLoading.value = false
  }
}

// Sign up with email and password
const signUp = async (email, password, displayName = '') => {
  try {
    isLoading.value = true
    firebaseError.value = null

    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Update profile
    if (displayName) {
      await updateProfile(result.user, { displayName })
    }

    return { success: true, user: result.user }
  } catch (error) {
    firebaseError.value = getAuthErrorMessage(error.code)
    console.error('❌ Sign up failed:', error)
    return { success: false, error: firebaseError.value }
  } finally {
    isLoading.value = false
  }
}

// Sign out
const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error) {
    firebaseError.value = `Failed to sign out: ${error.message}`
    console.error('❌ Sign out failed:', error)
    return { success: false, error: firebaseError.value }
  }
}

// Reset password
const resetPassword = async (email) => {
  try {
    isLoading.value = true
    firebaseError.value = null

    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    firebaseError.value = getAuthErrorMessage(error.code)
    console.error('❌ Password reset failed:', error)
    return { success: false, error: firebaseError.value }
  } finally {
    isLoading.value = false
  }
}

// Update user data
const updateUserData = async (data) => {
  try {
    if (!currentUser.value) {
      throw new Error('No user logged in')
    }

    const userRef = doc(db, 'users', currentUser.value.uid)
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    console.error('❌ Failed to update user data:', error)
    return { success: false, error: error.message }
  }
}

// Get user data
const getUserData = async (userId = null) => {
  try {
    const targetUserId = userId || currentUser.value?.uid
    if (!targetUserId) {
      throw new Error('No user ID provided')
    }

    const userDoc = await getDoc(doc(db, 'users', targetUserId))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    console.error('❌ Failed to get user data:', error)
    return { success: false, error: error.message }
  }
}

// Claim daily task reward
const claimTaskReward = async (taskType) => {
  try {
    if (!currentUser.value) {
      throw new Error('No user logged in')
    }

    const userRef = doc(db, 'users', currentUser.value.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User document not found')
    }

    const userData = userDoc.data()
    const taskRewards = {
      checkIn: 1,
      telegramGroup: 2,
      telegramChannel: 2,
      facebookPage: 2,
      twitterFollow: 2,
      socialShare: 2,
      connect_wallet: 5,
    }

    const reward = taskRewards[taskType] || 0
    
    // Update accumulated rewards instead of directly adding to balance
    const currentAccumulated = userData.accumulatedRewards || 0
    const newAccumulated = currentAccumulated + reward
    const currentPending = userData.pendingRewards || 0
    const newPending = currentPending + reward

    // Update data based on task type
    const updateData = {
      accumulatedRewards: newAccumulated,
      pendingRewards: newPending,
      totalEarned: userData.totalEarned + reward,
      updatedAt: new Date(),
    }

    // For daily check-in task, update dailyTasks object
    if (taskType === 'checkIn') {
      updateData[`dailyTasks.${taskType}`] = true
      updateData.lastCheckIn = new Date()
      console.log('📅 Updated daily check-in data')
    } else {
      // For one-time tasks, add to completedTasks array
      const completedTasks = userData.completedTasks || []
      if (!completedTasks.includes(taskType)) {
        updateData.completedTasks = [...completedTasks, taskType]
        console.log('✅ Added to completed tasks:', taskType)
      } else {
        console.log('⚠️ Task already completed:', taskType)
      }
    }

    await updateDoc(userRef, updateData)

    return { 
      success: true, 
      reward, 
      newAccumulated,
      newPending,
      canClaim: newPending >= 220 // Check if can claim (220 PPO minimum)
    }
  } catch (error) {
    console.error('❌ Failed to claim task reward:', error)
    return { success: false, error: error.message }
  }
}

// Claim accumulated rewards (minimum 220 PPO)
const claimAccumulatedRewards = async () => {
  try {
    if (!currentUser.value) {
      throw new Error('No user logged in')
    }

    const userRef = doc(db, 'users', currentUser.value.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User document not found')
    }

    const userData = userDoc.data()
    const pendingRewards = userData.pendingRewards || 0

    // Check if user has enough rewards to claim (minimum 220 PPO)
    if (pendingRewards < 220) {
      throw new Error(`Need at least 220 PPO to claim. Current pending: ${pendingRewards} PPO`)
    }

    // Calculate new balances
    const currentBalance = userData.tokenBalance || 0
    const newBalance = currentBalance + pendingRewards
    const currentClaimed = userData.claimedRewards || 0
    const newClaimed = currentClaimed + pendingRewards

    // Update user data
    const updateData = {
      tokenBalance: newBalance,
      claimedRewards: newClaimed,
      pendingRewards: 0, // Reset pending rewards
      lastClaimDate: new Date(),
      updatedAt: new Date(),
    }

    // Add transaction record
    const transaction = {
      type: 'reward_claim',
      amount: pendingRewards,
      timestamp: new Date(),
      description: `Claimed ${pendingRewards} PPO from accumulated rewards`,
    }

    const transactions = userData.transactions || []
    updateData.transactions = [...transactions, transaction]

    await updateDoc(userRef, updateData)

    console.log(`💰 Successfully claimed ${pendingRewards} PPO`)

    return { 
      success: true, 
      claimedAmount: pendingRewards,
      newBalance,
      newClaimed
    }
  } catch (error) {
    console.error('❌ Failed to claim accumulated rewards:', error)
    return { success: false, error: error.message }
  }
}

// Add referral
const addReferral = async (referralCode) => {
  try {
    if (!currentUser.value) {
      throw new Error('No user logged in')
    }

    // Find user with referral code
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('referralCode', '==', referralCode))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      throw new Error('Invalid referral code')
    }

    const referrerDoc = querySnapshot.docs[0]
    const referrerData = referrerDoc.data()

    // Update referrer data
    await updateDoc(doc(db, 'users', referrerDoc.id), {
      referralCount: referrerData.referralCount + 1,
      referralEarnings: referrerData.referralEarnings + 5, // 5 PPO per referral
      updatedAt: new Date(),
    })

    // Update current user data
    await updateDoc(doc(db, 'users', currentUser.value.uid), {
      referredBy: referralCode,
      updatedAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    console.error('❌ Failed to add referral:', error)
    return { success: false, error: error.message }
  }
}

// Get auth error message
const getAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/too-many-requests':
      'Too many failed attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/network-request-failed':
      'Network error. Please check your connection.',
  }

  return errorMessages[errorCode] || 'An error occurred. Please try again.'
}

// Computed properties
const isAuthenticated = computed(() => !!currentUser.value)

// Initialize Firebase on module load
initializeFirebase()

// Add transaction to users
const addTransaction = async (transaction) => {
  try {
    if (!currentUser.value) {
      throw new Error('No user logged in')
    }

    const userRef = doc(db, 'users', currentUser.value.uid)
    const userDoc = await getDoc(userRef)
    const data = userDoc.data()
    await updateDoc(userRef, {
      transactions: [transaction, ...data.transactions],
      updatedAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    console.error('❌ Failed to add transaction:', error)
    return { success: false, error: error.message }
  }
}

// Get platform statistics
const getPlatformStats = async () => {
  try {
    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)
    
    let totalUsers = 0
    let totalReferrals = 0
    let totalEarnings = 0
    let totalTransactions = 0
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      totalUsers++
      totalReferrals += userData.referralCount || 0
      totalEarnings += userData.totalEarned || 0
      totalTransactions += userData.transactions?.length || 0
    })
    
    return {
      success: true,
      data: {
        totalUsers,
        totalReferrals,
        totalEarnings,
        totalTransactions
      }
    }
  } catch (error) {
    console.error('❌ Failed to get platform stats:', error)
    return { success: false, error: error.message }
  }
}

export function useFirebase() {
  return {
    // State
    isFirebaseReady,
    firebaseError,
    currentUser,
    isLoading,

    // Computed
    isAuthenticated,

    // Methods
    initializeFirebase,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserData,
    getUserData,
    claimTaskReward,
    claimAccumulatedRewards,
    addReferral,
    generateReferralCode,
    generateReferralLink,
    addTransaction,
    getPlatformStats,
  }
}
