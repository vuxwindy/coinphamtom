import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useAccount, useBalance } from '@wagmi/vue'
import { useFirebase } from './useFirebase.js'
import { useContractAddress } from './useContractAddress.js'

export function useTaskSystem() {
  const { address, isConnected } = useAccount()
  const { currentUser, claimTaskReward, getUserData } = useFirebase()
  const { ppoTokenAddress } = useContractAddress()

  // Task state
  const tasks = ref([
    {
      id: 'checkIn',
      name: 'Daily Check-in',
      description: 'Complete daily check-in to earn rewards',
      reward: 1,
      type: 'daily',
      completed: false,
      cooldown: 24 * 60 * 60 * 1000, // 24 hours
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
      icon: 'fab fa-telegram'
    },
    {
      id: 'telegramChannel',
      name: 'Subscribe Telegram Channel',
      description: 'Subscribe to our official channel',
      reward: 2,
      type: 'one-time',
      completed: false,
      cooldown: 0,
      lastCompleted: null,
      icon: 'fab fa-telegram'
    },
    {
      id: 'facebookPage',
      name: 'Like Facebook Page',
      description: 'Like and follow our Facebook page',
      reward: 2,
      type: 'one-time',
      completed: false,
      cooldown: 0,
      lastCompleted: null,
      icon: 'fab fa-facebook'
    },
    {
      id: 'twitterFollow',
      name: 'Follow on Twitter',
      description: 'Follow us on Twitter/X',
      reward: 2,
      type: 'one-time',
      completed: false,
      cooldown: 0,
      lastCompleted: null,
      icon: 'fab fa-twitter'
    },
    {
      id: 'socialShare',
      name: 'Share Post',
      description: 'Share about the project on social media',
      reward: 3,
      type: 'one-time',
      completed: false,
      cooldown: 0,
      lastCompleted: null,
      icon: 'fas fa-share-alt'
    }
  ])

  // User state
  const userBalance = ref(0)
  const isLoading = ref(false)
  const error = ref(null)
  const lastCheckInDate = ref(null)

  // Daily reset timer
  let dailyResetTimer = null
  let hourlyCheckTimer = null

  // Computed properties
  const totalRewards = computed(() => {
    return tasks.value.reduce((total, task) => {
      if (!task.completed) return total + task.reward
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

  // Check if user is authenticated and wallet is connected
  const isUserReady = computed(() => {
    return isConnected.value && (currentUser.value || address.value)
  })

  // Methods
  const completeTask = async (taskId) => {
    console.log('🎯 Completing task:', taskId)
    
    if (!isUserReady.value) {
      error.value = 'Please connect your wallet and sign in first!'
      return { success: false, error: error.value }
    }

    try {
      isLoading.value = true
      error.value = null

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

      // Claim reward from Firebase
      const result = await claimTaskReward(taskId)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to claim reward')
      }

      // Mark task as completed
      task.completed = true
      task.lastCompleted = Date.now()

      // Update user balance
      userBalance.value = result.newBalance

      // For daily check-in, save the date
      if (taskId === 'checkIn') {
        const currentDate = new Date().toDateString()
        lastCheckInDate.value = currentDate
        localStorage.setItem('lastCheckInDate', currentDate)
        console.log(`📅 Daily check-in completed on: ${currentDate}`)
      }

      // Save to localStorage for persistence
      saveTasksToLocalStorage()

      console.log(`✅ Task ${taskId} completed successfully!`)
      return {
        success: true,
        reward: task.reward,
        task: task,
        newBalance: userBalance.value,
      }
    } catch (err) {
      error.value = err.message
      console.error('❌ Task completion failed:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const resetDailyTasks = () => {
    console.log('🔄 Resetting daily tasks...')
    tasks.value.forEach((task) => {
      if (task.type === 'daily') {
        task.completed = false
        task.lastCompleted = null
      }
    })
    saveTasksToLocalStorage()
    console.log('✅ Daily tasks reset completed')
  }

  const checkDailyReset = () => {
    const currentDate = new Date().toDateString()
    const savedDate = localStorage.getItem('lastCheckInDate')
    
    console.log('📅 Checking daily reset...')
    console.log('- Last check-in date:', savedDate)
    console.log('- Current date:', currentDate)
    
    if (savedDate && savedDate !== currentDate) {
      console.log('🔄 New day detected, resetting daily check-in...')
      resetDailyTasks()
      lastCheckInDate.value = currentDate
    }
  }

  const setupDailyResetTimers = () => {
    // Clear existing timers
    if (dailyResetTimer) clearInterval(dailyResetTimer)
    if (hourlyCheckTimer) clearInterval(hourlyCheckTimer)

    // Check every hour for daily reset
    hourlyCheckTimer = setInterval(() => {
      checkDailyReset()
    }, 60 * 60 * 1000) // Check every hour

    // Also check when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ Page became visible, checking daily reset...')
        checkDailyReset()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Return cleanup function
    return () => {
      if (hourlyCheckTimer) clearInterval(hourlyCheckTimer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  const loadTasksFromFirebase = async () => {
    if (!currentUser.value) return

    try {
      const userData = await getUserData()
      if (userData.success) {
        const data = userData.data
        
        // Update user balance
        userBalance.value = data.tokenBalance || 0
        
        // Update task completion status
        tasks.value.forEach((task) => {
          if (task.type === 'daily') {
            // Check daily tasks
            if (data.dailyTasks && data.dailyTasks[task.id]) {
              task.completed = true
              task.lastCompleted = data.lastCheckIn ? new Date(data.lastCheckIn).getTime() : null
            }
          } else {
            // Check one-time tasks
            if (data.completedTasks && data.completedTasks.includes(task.id)) {
              task.completed = true
            }
          }
        })

        // Load last check-in date
        if (data.lastCheckIn) {
          lastCheckInDate.value = new Date(data.lastCheckIn).toDateString()
          localStorage.setItem('lastCheckInDate', lastCheckInDate.value)
        }
      }
    } catch (error) {
      console.warn('Failed to load tasks from Firebase:', error)
    }
  }

  const loadTasksFromLocalStorage = () => {
    try {
      const savedTasks = localStorage.getItem('dailyTasks')
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks)
        tasks.value.forEach((task) => {
          const savedTask = parsedTasks.find((t) => t.id === task.id)
          if (savedTask) {
            task.completed = savedTask.completed
            task.lastCompleted = savedTask.lastCompleted
          }
        })
      }

      // Load last check-in date
      const savedDate = localStorage.getItem('lastCheckInDate')
      if (savedDate) {
        lastCheckInDate.value = savedDate
      }
    } catch (error) {
      console.warn('Failed to load tasks from localStorage:', error)
    }
  }

  const saveTasksToLocalStorage = () => {
    try {
      localStorage.setItem('dailyTasks', JSON.stringify(tasks.value))
    } catch (error) {
      console.warn('Failed to save tasks to localStorage:', error)
    }
  }

  const isTaskAvailable = (task) => {
    if (task.type !== 'daily') return !task.completed
    
    if (!task.lastCompleted) return true
    
    const timeSinceLastCompletion = Date.now() - task.lastCompleted
    return timeSinceLastCompletion >= task.cooldown
  }

  // Watch for wallet connection changes
  watch(isConnected, (newValue) => {
    if (newValue) {
      console.log('🔗 Wallet connected, loading tasks...')
      loadTasksFromFirebase()
    } else {
      console.log('🔒 Wallet disconnected')
      // Reset tasks when wallet disconnects
      tasks.value.forEach(task => {
        task.completed = false
        task.lastCompleted = null
      })
    }
  })

  // Watch for user authentication changes
  watch(currentUser, (newUser) => {
    if (newUser) {
      console.log('👤 User authenticated, loading tasks...')
      loadTasksFromFirebase()
    }
  })

  // Initialize on mount
  onMounted(() => {
    console.log('🚀 Initializing Task System...')
    loadTasksFromLocalStorage()
    
    if (isUserReady.value) {
      loadTasksFromFirebase()
    }

    // Setup daily reset timers
    const cleanup = setupDailyResetTimers()
    
    // Initial check for daily reset
    checkDailyReset()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    if (hourlyCheckTimer) clearInterval(hourlyCheckTimer)
  })

  return {
    // State
    tasks,
    userBalance,
    isLoading,
    error,
    lastCheckInDate,
    
    // Computed
    totalRewards,
    completedTasksCount,
    totalTasksCount,
    progressPercentage,
    isUserReady,
    
    // Methods
    completeTask,
    resetDailyTasks,
    checkDailyReset,
    loadTasksFromFirebase,
    loadTasksFromLocalStorage,
    saveTasksToLocalStorage,
    isTaskAvailable
  }
}
