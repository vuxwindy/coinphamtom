<template>
  <div class="task-system">
    <!-- Task Notification -->
    <TaskNotification
      :show="showNotification"
      :type="notificationType"
      :title="notificationTitle"
      :message="notificationMessage"
      :reward="notificationReward"
      :new-balance="notificationNewBalance"
      @close="closeNotification"
    />

    <!-- Error Display -->
    <div v-if="error" class="alert alert-danger">
      <i class="fas fa-exclamation-triangle"></i>
      {{ error }}
    </div>

    <!-- Balance Display -->
    <div class="balance-section">
      <div class="balance-card">
        <div class="balance-header">
          <i class="fas fa-coins"></i>
          <h3>Your Balance</h3>
        </div>
        <div class="balance-amount">
          <span class="amount">{{ userBalance }}</span>
          <span class="currency">PPO</span>
        </div>
        <div class="balance-actions">
          <button 
            @click="syncWalletBalance"
            class="btn btn-outline-primary btn-sm"
            :disabled="!isConnected"
          >
            <i class="fas fa-sync-alt"></i>
            Sync Wallet
          </button>
        </div>
      </div>
    </div>

    <!-- Daily Progress -->
    <div class="progress-section">
      <h4>Daily Progress</h4>
      <div class="progress-card">
        <div class="progress-info">
          <span>{{ completedTasksCount }}/{{ totalTasksCount }} tasks completed</span>
          <span class="percentage">{{ progressPercentage }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Available Rewards -->
    <div class="rewards-section" v-if="totalRewards > 0">
      <div class="rewards-card">
        <div class="rewards-header">
          <i class="fas fa-gift"></i>
          <h4>Available Rewards</h4>
        </div>
        <div class="rewards-amount">
          <span class="amount">{{ totalRewards }}</span>
          <span class="currency">PPO</span>
        </div>
        <button 
          @click="claimAllRewards"
          class="btn btn-success"
          :disabled="!isConnected || isLoading"
        >
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-gift"></i>
          {{ isLoading ? 'Claiming...' : 'Claim All Rewards' }}
        </button>
      </div>
    </div>

    <!-- Tasks Grid -->
    <div class="tasks-section">
      <h4>Available Tasks</h4>
      <div class="tasks-grid">
        <div 
          v-for="task in tasks" 
          :key="task.id"
          class="task-card"
          :class="{ 
            'completed': task.completed,
            'unavailable': !isTaskAvailable(task) && !task.completed
          }"
        >
          <div class="task-header">
            <div class="task-icon">
              <i :class="task.icon"></i>
            </div>
            <div class="task-info">
              <h5>{{ task.name }}</h5>
              <p>{{ task.description }}</p>
            </div>
            <div class="task-reward">
              <span class="reward-amount">{{ task.reward }}</span>
              <span class="reward-currency">PPO</span>
            </div>
          </div>
          
          <div class="task-status">
            <div v-if="task.completed" class="status-completed">
              <i class="fas fa-check-circle"></i>
              <span>Completed</span>
            </div>
            <div v-else-if="!isTaskAvailable(task)" class="status-cooldown">
              <i class="fas fa-clock"></i>
              <span>On Cooldown</span>
            </div>
            <div v-else class="status-available">
              <i class="fas fa-play-circle"></i>
              <span>Available</span>
            </div>
          </div>
          
          <div class="task-actions">
            <button 
              v-if="!task.completed && isTaskAvailable(task)"
              @click="completeTask(task.id)"
              class="btn btn-primary btn-sm"
              :disabled="!isConnected || isLoading"
            >
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-check"></i>
              {{ isLoading ? 'Completing...' : 'Complete Task' }}
            </button>
            <button 
              v-else-if="task.completed"
              class="btn btn-success btn-sm"
              disabled
            >
              <i class="fas fa-check-circle"></i>
              Completed
            </button>
            <button 
              v-else
              class="btn btn-secondary btn-sm"
              disabled
            >
              <i class="fas fa-clock"></i>
              On Cooldown
            </button>
          </div>
          
          <!-- Cooldown timer -->
          <div v-if="task.lastCompleted && !isTaskAvailable(task)" class="cooldown-timer">
            <small>
              Available in: {{ getCooldownTime(task) }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Wallet Connection Status -->
    <div class="wallet-status">
      <div class="status-card" :class="{ 'connected': isConnected, 'disconnected': !isConnected }">
        <div class="status-icon">
          <i v-if="isConnected" class="fas fa-wallet"></i>
          <i v-else class="fas fa-wallet-slash"></i>
        </div>
        <div class="status-info">
          <h5>{{ isConnected ? 'Wallet Connected' : 'Wallet Disconnected' }}</h5>
          <p v-if="isConnected">{{ shortAddress }}</p>
          <p v-else>Connect your wallet to complete tasks</p>
        </div>
      </div>
      
      <!-- Connect Wallet Task Reminder -->
      <div v-if="isConnected && !isConnectWalletCompleted" class="task-reminder">
        <div class="reminder-card">
          <div class="reminder-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <div class="reminder-content">
            <h6>Complete Connect Wallet Task</h6>
            <p>Don't forget to complete the "Connect Wallet" task to earn 50 PPO!</p>
            <button 
              @click="completeTask('connect_wallet')"
              class="btn btn-primary btn-sm"
              :disabled="isLoading"
            >
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-check"></i>
              {{ isLoading ? 'Completing...' : 'Complete Task' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTaskSystem } from '@/composables/useTaskSystem.js'
import { useFirebase } from '@/composables/useFirebase.js'
import TaskNotification from './TaskNotification.vue'

export default {
  name: 'TaskSystem',
  components: {
    TaskNotification
  },
  setup() {
    const { 
      tasks, 
      userBalance, 
      isLoading, 
      error,
      isWalletConnected,
      walletAddress,
      completeTask, 
      totalRewards,
      completedTasksCount,
      totalTasksCount,
      progressPercentage
    } = useTaskSystem()

    const { currentUser } = useFirebase()

    // Computed properties for wallet info
    const shortAddress = computed(() => {
      if (!walletAddress.value) return ''
      return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
    })

    const isConnected = computed(() => isWalletConnected.value)

    // Check if task is available
    const isTaskAvailable = (task) => {
      if (task.type === 'one_time' && task.completed) return false
      if (task.lastCompleted) {
        const timeSinceLastCompletion = Date.now() - task.lastCompleted
        return timeSinceLastCompletion >= task.cooldown
      }
      return true
    }

    // Check if connect wallet task is completed
    const isConnectWalletCompleted = computed(() => {
      const connectTask = tasks.value.find(task => task.id === 'connect_wallet')
      return connectTask ? connectTask.completed : false
    })

    // Notification state
    const showNotification = ref(false)
    const notificationType = ref('success')
    const notificationTitle = ref('')
    const notificationMessage = ref('')
    const notificationReward = ref(0)
    const notificationNewBalance = ref(0)

    // Show notification
    const showTaskNotification = (type, title, message, reward = 0, newBalance = 0) => {
      notificationType.value = type
      notificationTitle.value = title
      notificationMessage.value = message
      notificationReward.value = reward
      notificationNewBalance.value = newBalance
      showNotification.value = true
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        showNotification.value = false
      }, 5000)
    }

    // Close notification
    const closeNotification = () => {
      showNotification.value = false
    }

    // Enhanced complete task with notification
    const completeTaskWithNotification = async (taskId) => {
      const result = await completeTask(taskId)
      
      if (result.success) {
        showTaskNotification(
          'success',
          'Task Completed!',
          `${result.task.name} has been completed successfully!`,
          result.reward,
          result.newBalance
        )
      } else {
        showTaskNotification(
          'error',
          'Task Failed',
          result.error || 'Failed to complete task'
        )
      }
    }

    // Enhanced claim all rewards with notification
    const claimAllRewardsWithNotification = async () => {
      // For now, just show a notification that this feature is not implemented
      showTaskNotification(
        'info',
        'Feature Coming Soon',
        'Claim all rewards feature will be implemented soon!'
      )
    }

    // Get cooldown time remaining
    const getCooldownTime = (task) => {
      if (!task.lastCompleted) return ''
      
      const timeRemaining = task.cooldown - (Date.now() - task.lastCompleted)
      if (timeRemaining <= 0) return ''
      
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`
      } else {
        return `${minutes}m`
      }
    }

    // Sync wallet balance (placeholder)
    const syncWalletBalance = async () => {
      showTaskNotification(
        'info',
        'Sync Feature',
        'Wallet balance sync feature will be implemented soon!'
      )
    }

    return {
      tasks,
      userBalance,
      isLoading,
      error,
      totalRewards,
      isConnected,
      shortAddress,
      completeTask: completeTaskWithNotification,
      claimAllRewards: claimAllRewardsWithNotification,
      syncWalletBalance,
      isTaskAvailable,
      getCooldownTime,
      showNotification,
      notificationType,
      notificationTitle,
      notificationMessage,
      notificationReward,
      notificationNewBalance,
      closeNotification,
      isConnectWalletCompleted,
      completedTasksCount,
      totalTasksCount,
      progressPercentage
    }
  }
}
</script>

<style scoped>
.task-system {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.balance-section {
  margin-bottom: 30px;
}

.balance-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.balance-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.balance-header i {
  font-size: 24px;
}

.balance-header h3 {
  margin: 0;
  font-size: 20px;
}

.balance-amount {
  margin-bottom: 20px;
}

.balance-amount .amount {
  font-size: 48px;
  font-weight: bold;
  margin-right: 10px;
}

.balance-amount .currency {
  font-size: 24px;
  opacity: 0.9;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-section h4 {
  margin-bottom: 15px;
  color: #333;
}

.progress-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 600;
}

.percentage {
  color: #667eea;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.rewards-section {
  margin-bottom: 30px;
}

.rewards-card {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.rewards-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rewards-amount {
  margin-bottom: 20px;
}

.rewards-amount .amount {
  font-size: 36px;
  font-weight: bold;
  margin-right: 10px;
}

.rewards-amount .currency {
  font-size: 20px;
  opacity: 0.9;
}

.tasks-section {
  margin-bottom: 30px;
}

.tasks-section h4 {
  margin-bottom: 20px;
  color: #333;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.task-card.completed {
  border-color: #28a745;
  background: linear-gradient(135deg, #f8fff9 0%, #e8f5e8 100%);
}

.task-card.unavailable {
  opacity: 0.6;
  border-color: #6c757d;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.task-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.task-info {
  flex: 1;
}

.task-info h5 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.task-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.task-reward {
  text-align: right;
}

.reward-amount {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
}

.reward-currency {
  font-size: 12px;
  color: #666;
}

.task-status {
  margin-bottom: 15px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.status-completed {
  background: #d4edda;
  color: #155724;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-available {
  background: #d1ecf1;
  color: #0c5460;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-cooldown {
  background: #fff3cd;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-actions {
  margin-bottom: 10px;
}

.task-actions .btn {
  width: 100%;
  padding: 10px;
  font-weight: 600;
}

.cooldown-timer {
  text-align: center;
  color: #666;
  font-size: 12px;
}

.wallet-status {
  margin-top: 30px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.status-card.connected {
  border-left: 4px solid #28a745;
}

.status-card.disconnected {
  border-left: 4px solid #dc3545;
}

.status-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.status-card.connected .status-icon {
  background: #d4edda;
  color: #155724;
}

.status-card.disconnected .status-icon {
  background: #f8d7da;
  color: #721c24;
}

.status-info h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.status-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.task-reminder {
  margin-top: 20px;
  padding: 15px;
  background: #fff3cd;
  border-radius: 10px;
  border-left: 4px solid #856404;
}

.reminder-card {
  display: flex;
  align-items: center;
  gap: 15px;
}

.reminder-icon {
  width: 40px;
  height: 40px;
  background: #856404;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.reminder-content h6 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.reminder-content p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
}

.reminder-content .btn {
  width: 100%;
  padding: 10px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .task-system {
    padding: 15px;
  }
  
  .tasks-grid {
    grid-template-columns: 1fr;
  }
  
  .balance-amount .amount {
    font-size: 36px;
  }
  
  .rewards-amount .amount {
    font-size: 28px;
  }
}
</style>
