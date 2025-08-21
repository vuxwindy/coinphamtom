<template>
  <section id="daily-tasks" class="section-padding bg-dark-top">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-dark text-white border-primary">
            <div class="card-header border-primary">
              <h3 class="daily-title"><i class="fas fa-tasks me-2 daily-title"></i>Daily Tasks</h3>
              <p class="daily-title-content text-muted">Complete tasks to earn $PPO tokens</p>
            </div>
            <div class="card-body">
              <div class="task-list">
                <!-- Daily Check-in -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded" 
                     :class="{ completed: tasks.dailyCheckIn.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fas fa-calendar-check me-2"></i>Daily Check-in</h5>
                    <small class="claim-text">Reward: {{ tasks.dailyCheckIn.reward }} $PPO</small>
                  </div>
                  <button class="btn btn-outline-info task-btn button-claim" 
                          @click="completeTask('dailyCheckIn')"
                          :disabled="tasks.dailyCheckIn.completed">
                    <i class="fas fa-check-circle me-2"></i>{{ tasks.dailyCheckIn.completed ? 'Completed' : 'Check-in' }}
                  </button>
                </div>

                <!-- Telegram Group -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                     :class="{ completed: tasks.telegramGroup.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fab fa-telegram me-2"></i>Join Telegram Group</h5>
                    <small class="claim-text">Reward: {{ tasks.telegramGroup.reward }} $PPO</small>
                  </div>
                  <button class="btn btn-outline-info task-btn" 
                          @click="completeTask('telegramGroup')"
                          :disabled="tasks.telegramGroup.completed">
                    <i class="fas fa-users me-2"></i>{{ tasks.telegramGroup.completed ? 'Joined' : 'Join' }}
                  </button>
                </div>

                <!-- Telegram Channel -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                     :class="{ completed: tasks.telegramChannel.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fab fa-telegram me-2"></i>Subscribe Telegram Channel</h5>
                    <small class="claim-text">Reward: {{ tasks.telegramChannel.reward }} $PPO</small>
                  </div>
                  <button class="btn btn-outline-info task-btn" 
                          @click="completeTask('telegramChannel')"
                          :disabled="tasks.telegramChannel.completed">
                    <i class="fas fa-bullhorn me-2"></i>{{ tasks.telegramChannel.completed ? 'Subscribed' : 'Subscribe' }}
                  </button>
                </div>

                <!-- Facebook Page -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                     :class="{ completed: tasks.facebookPage.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fab fa-facebook me-2"></i>Like Facebook Page</h5>
                    <small class="claim-text">Reward: {{ tasks.facebookPage.reward }} $PPO</small>
                  </div>
                  <button class="btn btn-outline-info task-btn" 
                          @click="completeTask('facebookPage')"
                          :disabled="tasks.facebookPage.completed">
                    <i class="fas fa-thumbs-up me-2"></i>{{ tasks.facebookPage.completed ? 'Liked' : 'Like' }}
                  </button>
                </div>

                <!-- Twitter Follow -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                     :class="{ completed: tasks.twitterFollow.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fab fa-twitter me-2"></i>Follow X (Twitter)</h5>
                    <small class="claim-text">Reward: {{ tasks.twitterFollow.reward }} $PPO</small>
                  </div>
                  <button class="btn btn-outline-info task-btn" 
                          @click="completeTask('twitterFollow')"
                          :disabled="tasks.twitterFollow.completed">
                    <i class="fas fa-user-plus me-2"></i>{{ tasks.twitterFollow.completed ? 'Following' : 'Follow' }}
                  </button>
                </div>

                <!-- Social Share -->
                <div class="task-item d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                     :class="{ completed: tasks.socialShare.completed }">
                  <div>
                    <h5 class="claim-reward"><i class="fas fa-share-alt me-2"></i>Share Post</h5>
                    <small class="claim-text">Reward: {{ tasks.socialShare.reward }} $PPO</small>
                    <p class="claim-text small mb-0">Create a post or share about the project on X (Twitter)</p>
                  </div>
                  <button class="btn btn-outline-success task-btn" 
                          @click="completeTask('socialShare')"
                          :disabled="tasks.socialShare.completed">
                    <i class="fas fa-share me-2"></i>{{ tasks.socialShare.completed ? 'Shared' : 'Share' }}
                  </button>
                </div>
              </div>
              <div class="claim-section text-center mt-4 p-4 task-item rounded border border-primary">
                <h4 class="claim-reward">Available Rewards: <span class="available-rewards text-success">{{ availableRewards }}</span> $PPO</h4>
                <button class="btn btn-success btn-lg mt-3 claim-btn" 
                        @click="claimAllRewards"
                        :disabled="availableRewards === 0">
                  <i class="fas fa-gift me-2"></i>Claim Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 card-border">
          <div class="card-static bg-dark text-white">
            <div class="card-header border-primary">
              <h3 class="daily-title">Your Statistics</h3>
            </div>
            <div class="card-body">
              <div class="stats-grid">
                <div class="task-item rounded p-3 border border-primary">
                  <h5 class="claim-reward"><i class="fas fa-coins me-2"></i>Token Balance</h5>
                  <h3 class="claim-text"><span class="token-balance claim">{{ userStats.tokenBalance }}</span> $PPO</h3>
                </div>
                <div class="task-item rounded p-3 border border-primary">
                  <h5 class="claim-reward"><i class="fas fa-image me-2"></i>NFT Balance</h5>
                  <h3 class="claim-text"><span class="nft-balance text-info">{{ userStats.nftBalance }}</span></h3>
                </div>
                <div class="task-item rounded p-3 border border-primary">
                  <h5 class="claim-reward"><i class="fas fa-star me-2"></i>Total Earnings</h5>
                  <h3 class="claim-text"><span class="total-earned text-warning">{{ userStats.totalEarned }}</span> $PPO</h3>
                </div>
                <div class="task-item rounded p-3 border border-primary">
                  <h5 class="claim-reward"><i class="fas fa-users me-2"></i>Referral Earnings</h5>
                  <h3 class="claim-text"><span class="referral-earnings text-primary">{{ userStats.referralEarnings }}</span> $PPO</h3>
                </div>
              </div>
              <div class="task-item mt-4 p-4 rounded border border-primary">
                <h4 class="claim-reward"><i class="fas fa-user-friends me-2"></i>Referral Program</h4>
                <div class="input-group mt-3">
                  <input type="text" class="form-control text-copy" :value="referralLink" readonly>
                  <button class="btn btn-primary copy-btn" @click="copyReferralLink">
                    <i class="fas fa-copy me-2"></i>Copy
                  </button>
                </div>
                <div class="referral-stats mt-4">
                  <div class="row">
                    <div class="col">
                      <h5 class="claim-reward">Level: <span class="ref-level badge bg-primary">{{ userStats.referralLevel }}</span></h5>
                      <small class="claim-text">Need <span class="refs-needed text-warning">{{ userStats.refsNeeded }}</span> more referrals to level up</small>
                    </div>
                    <div class="col text-end">
                      <h5 class="claim-reward">Total Referrals: <span class="total-refs badge bg-success">{{ userStats.totalReferrals }}</span></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tasks = ref({
  dailyCheckIn: { completed: false, reward: 1 },
  telegramGroup: { completed: false, reward: 2 },
  telegramChannel: { completed: false, reward: 2 },
  facebookPage: { completed: false, reward: 2 },
  twitterFollow: { completed: false, reward: 2 },
  socialShare: { completed: false, reward: 3 }
})

const userStats = ref({
  tokenBalance: 0,
  nftBalance: 0,
  totalEarned: 0,
  referralEarnings: 0,
  referralLevel: 'F0',
  refsNeeded: 15,
  totalReferrals: 0
})

const referralLink = ref('https://coinpayot.com/ref/user123')

const availableRewards = computed(() => {
  return Object.values(tasks.value)
    .filter(task => task.completed)
    .reduce((total, task) => total + task.reward, 0)
})

onMounted(() => {
  loadTasks()
  loadUserStats()
})

const loadTasks = () => {
  const savedTasks = localStorage.getItem('dailyTasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
}

const loadUserStats = () => {
  const savedStats = localStorage.getItem('userStats')
  if (savedStats) {
    userStats.value = { ...userStats.value, ...JSON.parse(savedStats) }
  }
}

const completeTask = (taskName) => {
  if (tasks.value[taskName]) {
    tasks.value[taskName].completed = true
    localStorage.setItem('dailyTasks', JSON.stringify(tasks.value))
    
    // Show success message
    alert(`Task completed! You earned ${tasks.value[taskName].reward} $PPO`)
  }
}

const claimAllRewards = () => {
  if (availableRewards.value > 0) {
    userStats.value.tokenBalance += availableRewards.value
    userStats.value.totalEarned += availableRewards.value
    
    // Reset completed tasks
    Object.values(tasks.value).forEach(task => {
      task.completed = false
    })
    
    localStorage.setItem('userStats', JSON.stringify(userStats.value))
    localStorage.setItem('dailyTasks', JSON.stringify(tasks.value))
    
    alert(`Successfully claimed ${availableRewards.value} $PPO!`)
  }
}

const copyReferralLink = () => {
  navigator.clipboard.writeText(referralLink.value)
  alert('Referral link copied to clipboard!')
}
</script>

<style scoped>
.bg-dark-top {
  background-image: linear-gradient(to right, #30004d 0%, #32066b 100%) !important;
}

.task-item {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, rgba(52, 0, 87, 0.829), rgba(234, 0, 255, 0.692));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-item:hover {
  background: rgb(153, 0, 255);
}

.task-item.completed {
  background: rgba(46, 204, 113, 0.2);
}

.task-item.completed button {
  background: #9301e756;
  border-color: #27ae60;
  color: white;
}

.card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.daily-title {
  color: #cc00ff;
}

.daily-title-content {
  color: rgb(253 221 255) !important;
}

.claim-reward {
  color: #d739ff;
}

.claim-text {
  color: rgb(253 221 255) !important;
}

.button-claim {
  color: #ffffff !important;
}

.claim-btn {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-color: #d739ff;
  color: white;
}

.task-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid #fff;
}

.copy-btn {
  height: 50px;
  background: #cc00ff;
  border: 1px solid #cc00ff;
}

.text-copy {
  color: #cc00ff !important;
}

.card-static {
  border: 1px solid #d739ff !important;
  padding: 10px;
  border-radius: 15px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
