import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFirebase } from './useFirebase.js'

// Task system state - đồng bộ với Home.vue
const tasks = ref([
  {
    id: 'checkIn',
    name: 'Daily Check-in',
    description: 'Complete daily check-in to earn rewards',
    reward: 1,
    type: 'daily',
    completed: false,
    cooldown: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    lastCompleted: null,
    icon: 'fas fa-calendar-check'
  },
  {
    id: 'telegramGroup',
    name: 'Join Telegram Group',
    description: 'Join our official Telegram group',
    reward: 2,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-telegram',
    href: 'https://t.me/PixelpayotChannels'
  },
  {
    id: 'telegramChannel',
    name: 'Subscribe Channel',
    description: 'Subscribe to our Telegram channel',
    reward: 2,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-telegram',
    href: 'https://t.me/PixelpayotChannels'
  },
  {
    id: 'facebookPage',
    name: 'Like Facebook Page',
    description: 'Like our Facebook page',
    reward: 2,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-facebook',
    href: 'https://facebook.com/Pixelpayot'
  },
  {
    id: 'twitterFollow',
    name: 'Follow on Twitter',
    description: 'Follow us on Twitter',
    reward: 2,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-twitter',
    href: 'https://x.com/TetMinh46256'
  },
  {
    id: 'socialShare',
    name: 'Share on Social Media',
    description: 'Share our platform on social media',
    reward: 2,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fas fa-share',
    href: null // Will be handled in completeTask function
  },
  {
    id: 'connect_wallet',
    name: 'Connect Wallet',
    description: 'Connect your wallet to the platform',
    reward: 5,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fas fa-wallet'
  }
])

const userBalance = ref(0)
const userTasks = ref([])
const isLoading = ref(false)
const error = ref(null)

// Accumulated rewards state
const accumulatedRewards = ref(0)
const claimedRewards = ref(0)
const pendingRewards = ref(0)
const canClaimRewards = ref(false)

// Wallet connection state
const isWalletConnected = ref(false)
const walletAddress = ref(null)

// Use existing composables
const { currentUser, updateUserData, getUserData, claimTaskReward, claimAccumulatedRewards } =
  useFirebase()

// Handle wallet connection events
const handleWalletConnected = (event) => {
  const { address, wallet } = event.detail
  isWalletConnected.value = true
  walletAddress.value = address

  // Auto-complete connect wallet task when wallet is connected
  const connectTask = tasks.value.find((task) => task.id === 'connect_wallet')
  if (connectTask && !connectTask.completed) {
    completeTask('connect_wallet')
  }
}

const handleWalletDisconnected = () => {
  isWalletConnected.value = false
  walletAddress.value = null
}

// Computed properties
const totalRewards = computed(() => {
  return tasks.value.reduce((total, task) => {
    // Chỉ tính điểm cho các task chưa hoàn thành
    if (!task.completed) {
      return total + task.reward
    }
    return total
  }, 0)
})

// Tổng điểm đã kiếm được từ các task đã hoàn thành
const earnedRewards = computed(() => {
  return tasks.value.reduce((total, task) => {
    if (task.completed) {
      return total + task.reward
    }
    return total
  }, 0)
})

const completedTasksCount = computed(() => {
  return tasks.value.filter((task) => task.completed).length
})

const totalTasksCount = computed(() => {
  return tasks.value.length
})

const progressPercentage = computed(() => {
  if (totalTasksCount.value === 0) return 0
  return Math.round((completedTasksCount.value / totalTasksCount.value) * 100)
})

// Methods
const completeTask = async (taskId) => {
  console.log('🎯 Completing task:', taskId)
  console.log('🎯 Available tasks:', tasks.value.map(t => ({ id: t.id, completed: t.completed })))
  try {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    // Check if task is already completed
    if (task.completed) {
      throw new Error('Task already completed')
    }

    // Check cooldown for daily tasks
    if (task.type === 'daily' && task.lastCompleted) {
      const timeSinceLastCompletion = Date.now() - task.lastCompleted
      if (timeSinceLastCompletion < task.cooldown) {
        const remainingTime = task.cooldown - timeSinceLastCompletion
        const hours = Math.floor(remainingTime / (1000 * 60 * 60))
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        )
        throw new Error(`Task available in ${hours}h ${minutes}m`)
      }
    }

    // For tasks with href links, open the link first
    if (task.href) {
      window.open(task.href, '_blank')
    }
    
    // Special handling for social share task
    if (taskId === 'socialShare') {
      const shareText = `Exciting news! Join me on PPO NFT Challenge! 🎯\n\nEarn rewards by completing daily tasks and collecting legendary bow parts! 🏹\n\nJoin now: ${window.location.origin}/?ref=${walletAddress.value || 'user'}\n\n#ArcherNFT #NFTGame #PlayToEarn`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
    }

    // Mark task as completed
    task.completed = true
    task.lastCompleted = Date.now()

    // For daily check-in only, save the date
    if (taskId === 'checkIn') {
      const currentDate = new Date().toDateString()
      localStorage.setItem('lastCheckInDate', currentDate)
      console.log(`📅 Daily check-in completed on: ${currentDate}`)
    }

    // Update user data in Firebase
    if (currentUser.value) {
      try {
        await updateUserData({
          completedTasks: tasks.value
            .filter((t) => t.completed)
            .map((t) => t.id),
          lastTaskCompletion: Date.now(),
        })
      } catch (err) {
        // Continue even if Firebase update fails
        console.warn('Failed to update user data:', err.message)
      }
    }

    // Claim reward
    try {
      await claimTaskReward(taskId, task.reward)
    } catch (err) {
      // Continue even if reward claiming fails
      console.warn('Failed to claim reward:', err.message)
    }

    // Update accumulated rewards instead of direct balance
    accumulatedRewards.value += task.reward
    pendingRewards.value += task.reward
    canClaimRewards.value = pendingRewards.value >= 220

    return {
      success: true,
      reward: task.reward,
      task: task,
      newAccumulated: accumulatedRewards.value,
      newPending: pendingRewards.value,
      canClaim: canClaimRewards.value,
    }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  }
}

const resetDailyTasks = () => {
  console.log('🔄 Resetting daily check-in task...')
  const checkInTask = tasks.value.find(task => task.id === 'checkIn')
  if (checkInTask) {
    checkInTask.completed = false
    checkInTask.lastCompleted = null
    console.log('✅ Reset daily check-in task')
  }
  saveTasksToLocalStorage()
}

// Claim accumulated rewards
const claimRewards = async () => {
  try {
    console.log('💰 Claiming accumulated rewards...')
    
    if (!currentUser.value) {
      throw new Error('User not logged in')
    }

    const result = await claimAccumulatedRewards()
    
    if (result.success) {
      console.log(`💰 Successfully claimed ${result.claimedAmount} PPO`)
      
      // Update local state
      userBalance.value = result.newBalance
      claimedRewards.value = result.newClaimed
      pendingRewards.value = 0
      canClaimRewards.value = false
      
      return {
        success: true,
        claimedAmount: result.claimedAmount,
        newBalance: result.newBalance
      }
    } else {
      throw new Error(result.error)
    }
  } catch (error) {
    console.error('❌ Failed to claim rewards:', error)
    return { success: false, error: error.message }
  }
}

const saveTasksToLocalStorage = () => {
  try {
    const tasksData = tasks.value.map(task => ({
      id: task.id,
      completed: task.completed,
      lastCompleted: task.lastCompleted
    }))
    localStorage.setItem('userTasks', JSON.stringify(tasksData))
    console.log('💾 Tasks saved to localStorage')
  } catch (err) {
    console.warn('Failed to save tasks to localStorage:', err)
  }
}

const loadTasksFromLocalStorage = () => {
  try {
    const savedTasks = localStorage.getItem('userTasks')
    console.log('🔄 Saved tasks from localStorage:', savedTasks)
    
    if (savedTasks) {
      const tasksData = JSON.parse(savedTasks)
      console.log('🔄 Parsed tasks data:', tasksData)
      
      tasksData.forEach(savedTask => {
        const task = tasks.value.find(t => t.id === savedTask.id)
        if (task) {
          task.completed = savedTask.completed
          task.lastCompleted = savedTask.lastCompleted
          console.log(`🔄 Updated task ${savedTask.id}: completed=${savedTask.completed}`)
        } else {
          console.warn(`🔄 Task ${savedTask.id} not found in current tasks`)
        }
      })
      console.log('📂 Tasks loaded from localStorage')
    } else {
      console.log('🔄 No saved tasks found in localStorage')
    }
  } catch (err) {
    console.warn('Failed to load tasks from localStorage:', err)
  }
}

const loadUserTasks = async () => {
  console.log('🔄 Loading user tasks...')
  console.log('🔄 Current user:', currentUser.value)
  
  if (!currentUser.value) {
    console.log('🔄 No current user, loading from localStorage only')
    loadTasksFromLocalStorage()
    return
  }

  try {
    isLoading.value = true
    
    // Load from localStorage first
    loadTasksFromLocalStorage()
    console.log('🔄 Tasks after localStorage load:', tasks.value.map(t => ({ id: t.id, completed: t.completed })))
    
    const userData = await getUserData()
    console.log('🔄 User data from Firebase:', userData)

    if (userData) {
      userBalance.value = userData.tokenBalance || 0

      // Load accumulated rewards data
      accumulatedRewards.value = userData.accumulatedRewards || 0
      claimedRewards.value = userData.claimedRewards || 0
      pendingRewards.value = userData.pendingRewards || 0
      canClaimRewards.value = (userData.pendingRewards || 0) >= 220
      
      console.log('🔄 Loaded accumulated rewards data:', {
        accumulated: accumulatedRewards.value,
        claimed: claimedRewards.value,
        pending: pendingRewards.value,
        canClaim: canClaimRewards.value
      })

      // Load daily tasks from Firebase
      if (userData.dailyTasks) {
        const checkInTask = tasks.value.find(task => task.id === 'checkIn')
        if (checkInTask && userData.dailyTasks.checkIn) {
          checkInTask.completed = true
          console.log('🔄 Marked checkIn task as completed from Firebase')
        }
      }

      // Load completed one-time tasks from Firebase
      const completedTaskIds = userData.completedTasks || []
      console.log('🔄 Completed task IDs from Firebase:', completedTaskIds)
      
      tasks.value.forEach((task) => {
        if (task.type === 'one-time' && completedTaskIds.includes(task.id)) {
          task.completed = true
          console.log(`🔄 Marked ${task.id} as completed from Firebase`)
        }
      })
    }
    
    // Save to localStorage after loading from Firebase
    saveTasksToLocalStorage()
    console.log('🔄 Final tasks state:', tasks.value.map(t => ({ id: t.id, completed: t.completed })))
  } catch (err) {
    console.error('🔄 Error loading user tasks:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('wallet-connected', handleWalletConnected)
  window.addEventListener('wallet-disconnected', handleWalletDisconnected)

  // Load user tasks
  loadUserTasks()
})

onUnmounted(() => {
  window.removeEventListener('wallet-connected', handleWalletConnected)
  window.removeEventListener('wallet-disconnected', handleWalletDisconnected)
})

// Watch for user changes
watch(currentUser, (newUser) => {
  if (newUser) {
    loadUserTasks()
  } else {
    // Reset state when user logs out
    userBalance.value = 0
    tasks.value.forEach((task) => {
      task.completed = false
      task.lastCompleted = null
    })
  }
})

export function useTaskSystem() {
  return {
    // State
    tasks,
    userBalance,
    userTasks,
    isLoading,
    error,
    isWalletConnected,
    walletAddress,

    // Accumulated rewards state
    accumulatedRewards,
    claimedRewards,
    pendingRewards,
    canClaimRewards,

    // Computed
    totalRewards,
    earnedRewards,
    completedTasksCount,
    totalTasksCount,
    progressPercentage,

    // Methods
    completeTask,
    claimRewards,
    resetDailyTasks,
    loadUserTasks,
    saveTasksToLocalStorage,
    loadTasksFromLocalStorage,
  }
}
