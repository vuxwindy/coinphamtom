import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFirebase } from './useFirebase.js'
import { useWeb3 } from './useWeb3.js'

// Task system state - tương thích với Firebase structure
const tasks = ref([
  {
    id: 'checkIn',
    name: 'Daily Check-in',
    description: 'Check in daily to earn rewards',
    reward: 1,
    type: 'daily',
    icon: 'fas fa-calendar-check',
    completed: false,
    cooldown: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    lastCompleted: null
  },
  {
    id: 'connect_wallet',
    name: 'Connect Wallet',
    description: 'Connect your wallet to earn rewards',
    reward: 5,
    type: 'one_time',
    icon: 'fas fa-wallet',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  },
  {
    id: 'telegramGroup',
    name: 'Join Telegram Group',
    description: 'Join our Telegram group',
    reward: 2,
    type: 'one_time',
    icon: 'fab fa-telegram',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  },
  {
    id: 'telegramChannel',
    name: 'Join Telegram Channel',
    description: 'Subscribe to our Telegram channel',
    reward: 2,
    type: 'one_time',
    icon: 'fab fa-telegram',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  },
  {
    id: 'facebookPage',
    name: 'Like Facebook Page',
    description: 'Like our Facebook page',
    reward: 2,
    type: 'one_time',
    icon: 'fab fa-facebook',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  },
  {
    id: 'twitterFollow',
    name: 'Follow Twitter',
    description: 'Follow us on Twitter',
    reward: 2,
    type: 'one_time',
    icon: 'fab fa-twitter',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  },
  {
    id: 'socialShare',
    name: 'Social Share',
    description: 'Share on social media',
    reward: 3,
    type: 'one_time',
    icon: 'fas fa-share-alt',
    completed: false,
    cooldown: 0,
    lastCompleted: null
  }
])

const userBalance = ref(0)
const userTasks = ref([])
const isLoading = ref(false)
const error = ref(null)

// Wallet connection state
const isWalletConnected = ref(false)
const walletAddress = ref(null)

// Use existing composables
const { currentUser, updateUserData, getUserData, claimTaskReward } = useFirebase()

// Handle wallet connection events
const handleWalletConnected = (event) => {
  const { address, wallet } = event.detail
  isWalletConnected.value = true
  walletAddress.value = address
  
  // Auto-complete connect wallet task when wallet is connected
  const connectTask = tasks.value.find(task => task.id === 'connect_wallet')
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
    if (!task.completed) return total + task.reward
    return total
  }, 0)
})

const completedTasksCount = computed(() => {
  return tasks.value.filter(task => task.completed).length
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
  try {
    const task = tasks.value.find(t => t.id === taskId)
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
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
        throw new Error(`Task available in ${hours}h ${minutes}m`)
      }
    }

    // Mark task as completed
    task.completed = true
    task.lastCompleted = Date.now()

    // Update user data in Firebase
    if (currentUser.value) {
      try {
        await updateUserData({
          completedTasks: tasks.value.filter(t => t.completed).map(t => t.id),
          lastTaskCompletion: Date.now()
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

    // Update user balance
    userBalance.value += task.reward

    return { 
      success: true, 
      reward: task.reward, 
      task: task,
      newBalance: userBalance.value
    }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  }
}

const resetDailyTasks = () => {
  tasks.value.forEach(task => {
    if (task.type === 'daily') {
      task.completed = false
      task.lastCompleted = null
    }
  })
}

const loadUserTasks = async () => {
  if (!currentUser.value) return

  try {
    isLoading.value = true
    const userData = await getUserData()
    
    if (userData) {
      userBalance.value = userData.balance || 0
      
      // Mark completed tasks
      const completedTaskIds = userData.completedTasks || []
      tasks.value.forEach(task => {
        if (completedTaskIds.includes(task.id)) {
          task.completed = true
        }
      })
    }
  } catch (err) {
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
    tasks.value.forEach(task => {
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
    
    // Computed
    totalRewards,
    completedTasksCount,
    totalTasksCount,
    progressPercentage,
    
    // Methods
    completeTask,
    resetDailyTasks,
    loadUserTasks
  }
}
