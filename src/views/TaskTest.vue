<template>
  <div class="task-test">
    <div class="container">
      <h1>Task System Test</h1>
      
      <!-- User Status -->
      <div class="status-section">
        <h2>User Status</h2>
        <p><strong>Wallet Connected:</strong> {{ isConnected ? 'Yes' : 'No' }}</p>
        <p><strong>User Authenticated:</strong> {{ currentUser ? 'Yes' : 'No' }}</p>
        <p><strong>User Ready:</strong> {{ isUserReady ? 'Yes' : 'No' }}</p>
        <p><strong>Current Balance:</strong> {{ userBalance }} PPO</p>
        <p><strong>Last Check-in Date:</strong> {{ lastCheckInDate || 'Never' }}</p>
      </div>

      <!-- Task List -->
      <div class="tasks-section">
        <h2>Tasks</h2>
        <div class="task-grid">
          <div 
            v-for="task in tasks" 
            :key="task.id"
            :class="['task-card', { completed: task.completed, disabled: !isUserReady }]"
          >
            <div class="task-icon">
              <i :class="task.icon"></i>
            </div>
            <div class="task-info">
              <h3>{{ task.name }}</h3>
              <p>{{ task.description }}</p>
              <p class="reward">Reward: {{ task.reward }} PPO</p>
              <p class="status">
                Status: {{ task.completed ? 'Completed' : 'Available' }}
              </p>
            </div>
            <button 
              @click="testTask(task.id)"
              :disabled="!isUserReady || task.completed"
              class="task-button"
            >
              {{ task.completed ? 'Completed' : 'Complete' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Test Controls -->
      <div class="controls-section">
        <h2>Test Controls</h2>
        <div class="button-group">
          <button @click="resetDailyTasks" class="btn btn-warning">
            Reset Daily Tasks
          </button>
          <button @click="checkDailyReset" class="btn btn-info">
            Check Daily Reset
          </button>
          <button @click="loadFromFirebase" class="btn btn-primary">
            Load from Firebase
          </button>
          <button @click="testToast" class="btn btn-success">
            Test Toast
          </button>
        </div>
      </div>

      <!-- Logs -->
      <div class="logs-section">
        <h2>Console Logs</h2>
        <div class="log-container">
          <div v-for="log in logs" :key="log.id" :class="['log-entry', log.type]">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
        <button @click="clearLogs" class="btn btn-secondary">Clear Logs</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskSystem } from '../composables/useTaskSystem.js'
import { useFirebase } from '../composables/useFirebase.js'
import { useToast } from '../composables/useToast.js'
import { useAccount } from '@wagmi/vue'

const { address, isConnected } = useAccount()
const { currentUser } = useFirebase()
const { success, error, warning, info } = useToast()

const {
  tasks,
  userBalance,
  lastCheckInDate,
  isUserReady,
  completeTask,
  resetDailyTasks,
  checkDailyReset,
  loadTasksFromFirebase
} = useTaskSystem()

const logs = ref([])

const addLog = (message, type = 'info') => {
  logs.value.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
  
  // Keep only last 50 logs
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

const clearLogs = () => {
  logs.value = []
}

const testTask = async (taskId) => {
  try {
    addLog(`Testing task: ${taskId}`, 'info')
    const result = await completeTask(taskId)
    
    if (result.success) {
      addLog(`Task ${taskId} completed successfully! Reward: ${result.reward} PPO`, 'success')
      success(`Task completed! You earned ${result.reward} PPO`)
    } else {
      addLog(`Task ${taskId} failed: ${result.error}`, 'error')
      error(`Failed to complete task: ${result.error}`)
    }
  } catch (err) {
    addLog(`Error testing task ${taskId}: ${err.message}`, 'error')
    error(`Error: ${err.message}`)
  }
}

const testToast = () => {
  success('This is a success toast!')
  error('This is an error toast!')
  warning('This is a warning toast!')
  info('This is an info toast!')
  addLog('Tested all toast types', 'info')
}

const loadFromFirebase = async () => {
  try {
    addLog('Loading tasks from Firebase...', 'info')
    await loadTasksFromFirebase()
    addLog('Tasks loaded from Firebase successfully', 'success')
  } catch (err) {
    addLog(`Failed to load from Firebase: ${err.message}`, 'error')
  }
}

// Override console.log to capture logs
const originalLog = console.log
const originalError = console.error
const originalWarn = console.warn

console.log = (...args) => {
  originalLog(...args)
  addLog(args.join(' '), 'info')
}

console.error = (...args) => {
  originalError(...args)
  addLog(args.join(' '), 'error')
}

console.warn = (...args) => {
  originalWarn(...args)
  addLog(args.join(' '), 'warning')
}

onMounted(() => {
  addLog('Task Test page loaded', 'info')
})
</script>

<style scoped>
.task-test {
  padding: 20px;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #fb00ff;
}

.status-section,
.tasks-section,
.controls-section,
.logs-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.task-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.task-card.completed {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.3);
}

.task-card.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.task-icon {
  font-size: 24px;
  color: #fb00ff;
  margin-bottom: 10px;
}

.task-info h3 {
  margin: 0 0 10px 0;
  color: #fb00ff;
}

.task-info p {
  margin: 5px 0;
  font-size: 14px;
}

.reward {
  color: #22c55e;
  font-weight: bold;
}

.status {
  color: #fbbf24;
}

.task-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #fb00ff, #ff0080);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.task-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(251, 0, 255, 0.4);
}

.task-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.btn-success {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.btn-error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-info {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.log-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.log-entry {
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: monospace;
  font-size: 12px;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: #fbbf24;
  margin-right: 10px;
}

.log-entry.info .log-message {
  color: #60a5fa;
}

.log-entry.success .log-message {
  color: #22c55e;
}

.log-entry.error .log-message {
  color: #ef4444;
}

.log-entry.warning .log-message {
  color: #f59e0b;
}

@media (max-width: 768px) {
  .task-grid {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style>
