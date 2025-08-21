<template>
  <div v-if="showNotification" class="task-notification" :class="notificationType">
    <div class="notification-content">
      <div class="notification-icon">
        <i :class="iconClass"></i>
      </div>
      <div class="notification-text">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
        <div v-if="reward" class="reward-info">
          <span class="reward-amount">+{{ reward }} PPO</span>
          <span class="new-balance">New Balance: {{ newBalance }} PPO</span>
        </div>
      </div>
      <button @click="closeNotification" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'TaskNotification',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success', // success, error, info
      validator: value => ['success', 'error', 'info', 'warning'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    reward: {
      type: Number,
      default: 0
    },
    newBalance: {
      type: Number,
      default: 0
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const showNotification = ref(props.show)

    const notificationType = computed(() => {
      return `notification-${props.type}`
    })

    const iconClass = computed(() => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
      }
      return icons[props.type] || icons.info
    })

    const closeNotification = () => {
      showNotification.value = false
      emit('close')
    }

    // Watch for show prop changes
    const updateShow = (newValue) => {
      showNotification.value = newValue
    }

    return {
      showNotification,
      notificationType,
      iconClass,
      closeNotification,
      updateShow
    }
  },
  watch: {
    show(newValue) {
      this.showNotification = newValue
    }
  }
}
</script>

<style scoped>
.task-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  color: white;
  position: relative;
}

.notification-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
}

.notification-text h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.notification-text p {
  margin: 0 0 10px 0;
  font-size: 14px;
  opacity: 0.9;
}

.reward-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.reward-amount {
  font-size: 18px;
  font-weight: bold;
  color: #ffd700;
}

.new-balance {
  font-size: 12px;
  opacity: 0.8;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  opacity: 1;
}

/* Notification types */
.notification-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.notification-error {
  background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
}

.notification-info {
  background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
}

.notification-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .task-notification {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification-content {
    padding: 15px;
  }
}
</style>
