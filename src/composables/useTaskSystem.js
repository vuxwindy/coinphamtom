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
    icon: 'fas fa-calendar-check',
  },
  {
    id: 'joinTelegram',
    name: 'Join Telegram Channel',
    description: 'Join our official Telegram channel',
    reward: 0,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-telegram',
    href: 'https://t.me/PixelpayotChannels',
  },
  {
    id: 'joinX',
    name: 'Follow on X',
    description: 'Follow us on X (Twitter)',
    reward: 0,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-twitter',
    href: 'https://x.com/TetMinh46256',
  },
  {
    id: 'joinYoutube',
    name: 'Watch YouTube Video',
    description: 'Watch our YouTube video',
    reward: 0,
    type: 'one-time',
    completed: false,
    cooldown: 0,
    lastCompleted: null,
    icon: 'fab fa-youtube',
    href: 'https://www.youtube.com/@minhtet-q2r9o',
  },
])

const userBalance = ref(0)
const userTasks = ref([])
const isLoading = ref(false)
const error = ref(null)

// Wallet connection state
const isWalletConnected = ref(false)
const walletAddress = ref(null)

// Use existing composables
const { currentUser, updateUserData, getUserData, claimTaskReward } =
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
  try {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) {
      throw new Error('Task not found')
    }

    // Check if task is already completed
    if (task.completed) {
      throw new Error('Task already completed')
    }

    let userData = await getUserData()

    // Check cooldown for daily tasks

    const lastCheckIn = userData.data.lastCheckIn
    console.log('lastCheckIn:', lastCheckIn)
    const timeSinceLastCompletion = Date.now() - lastCheckIn
    if (timeSinceLastCompletion < 24 * 60 * 60 * 1000) {
      const remainingTime = 24 * 60 * 60 * 1000 - timeSinceLastCompletion
      const hours = Math.floor(remainingTime / (1000 * 60 * 60))
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      )
      throw new Error(`Task available in ${hours}h ${minutes}m`)
    }

    // For tasks with href links, open the link first
    if (task.href) {
      window.open(task.href, '_blank')
    }

    // Mark task as completed
    task.completed = true
    task.lastCompleted = Date.now()

    // For daily check-in only, save the date
    // if (taskId === 'checkIn') {
    //   const currentDate = new Date().toDateString()
    //   localStorage.setItem('lastCheckInDate', currentDate)
    //   console.log(`📅 Daily check-in completed on: ${currentDate}`)
    // }

    const checkAllTasks = tasks.value.every((t) => t.completed)
    console.log('All tasks completed:', checkAllTasks)
    // Update user data in Firebase
    if (currentUser.value && checkAllTasks) {
      try {
        const newTimeComplete = Date.now()
        const newEarnedRewards = userData.data.totalEarned + 1
        console.log('newEarnedRewards', newEarnedRewards)
        await updateUserData({
          completedTasks: [...userData.data.completedTasks, newTimeComplete],
          totalEarned: newEarnedRewards,
          lastCheckIn: Date.now(),
        })

        userData = await getUserData()
      } catch (err) {
        // Continue even if Firebase update fails
        console.warn('Failed to update user data:', err.message)
      }
    }

    return {
      success: true,
      reward: task.reward,
      task: task,
      newBalance: userData.data.totalEarned,
    }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  }
}

const resetDailyTasks = () => {
  console.log('🔄 Resetting daily check-in task...')
  const checkInTask = tasks.value.find((task) => task.id === 'checkIn')
  if (checkInTask) {
    checkInTask.completed = false
    checkInTask.lastCompleted = null
    console.log('✅ Reset daily check-in task')
  }
  saveTasksToLocalStorage()
}

const saveTasksToLocalStorage = () => {
  try {
    const tasksData = tasks.value.map((task) => ({
      id: task.id,
      completed: task.completed,
      lastCompleted: task.lastCompleted,
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
    if (savedTasks) {
      const tasksData = JSON.parse(savedTasks)
      tasksData.forEach((savedTask) => {
        const task = tasks.value.find((t) => t.id === savedTask.id)
        if (task) {
          task.completed = savedTask.completed
          task.lastCompleted = savedTask.lastCompleted
        }
      })
      console.log('📂 Tasks loaded from localStorage')
    }
  } catch (err) {
    console.warn('Failed to load tasks from localStorage:', err)
  }
}

const loadUserTasks = async () => {
  if (!currentUser.value) return

  try {
    isLoading.value = true

    // Load from localStorage first
    loadTasksFromLocalStorage()

    const userData = await getUserData()

    if (userData) {
      userBalance.value = userData.balance || 0

      // Load daily tasks from Firebase
      if (userData.dailyTasks) {
        const checkInTask = tasks.value.find((task) => task.id === 'checkIn')
        if (checkInTask && userData.dailyTasks.checkIn) {
          checkInTask.completed = true
        }
      }

      // Load completed one-time tasks from Firebase
      const completedTaskIds = userData.completedTasks || []
      tasks.value.forEach((task) => {
        if (task.type === 'one-time' && completedTaskIds.includes(task.id)) {
          task.completed = true
        }
      })
    }

    // Save to localStorage after loading from Firebase
    saveTasksToLocalStorage()
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

    // Computed
    totalRewards,
    earnedRewards,
    completedTasksCount,
    totalTasksCount,
    progressPercentage,

    // Methods
    completeTask,
    resetDailyTasks,
    loadUserTasks,
    saveTasksToLocalStorage,
    loadTasksFromLocalStorage,
  }
}
