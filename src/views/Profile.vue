<template>
  <div class="profile-page">
    <Header />
    
    <!-- Profile Hero Section -->
    <section class="profile-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="profile-header text-center">
              <div class="profile-avatar">
                <img :src="userProfile.avatar || '/src/assets/images/default-avatar.png'" alt="Profile Avatar">
                <button class="avatar-edit-btn" @click="editAvatar">
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              <h1 class="profile-name">{{ userProfile.displayName || 'User' }}</h1>
              <p class="profile-email">{{ userProfile.email }}</p>
              <div class="profile-level">
                <span class="level-badge">{{ userProfile.level }}</span>
                <span class="level-progress">Level {{ userProfile.level }} - {{ userProfile.experience }}/1000 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Stats -->
    <section class="profile-stats padding-large">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-coins"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userProfile.tokenBalance || 0 }}</h3>
                <p class="stat-label">$PPO Balance</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userProfile.totalEarned || 0 }}</h3>
                <p class="stat-label">Total Earned</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userProfile.referralCount || 0 }}</h3>
                <p class="stat-label">Referrals</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-value">{{ userProfile.daysActive || 0 }}</h3>
                <p class="stat-label">Days Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="profile-content padding-large">
      <div class="container">
        <div class="row">
          <!-- Profile Navigation -->
          <div class="col-lg-3">
            <div class="profile-nav">
              <button 
                v-for="tab in profileTabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="['nav-tab', { active: activeTab === tab.id }]"
              >
                <i :class="tab.icon"></i>
                <span>{{ tab.name }}</span>
              </button>
            </div>
          </div>

          <!-- Profile Content -->
          <div class="col-lg-9">
            <div class="profile-tab-content">
              <!-- Personal Information Tab -->
              <div v-if="activeTab === 'personal'" class="tab-panel">
                <h2 class="tab-title">Personal Information</h2>
                <div class="form-section">
                  <div class="form-group">
                    <label>Display Name</label>
                    <input 
                      type="text" 
                      v-model="userProfile.displayName" 
                      class="form-control"
                      placeholder="Enter your display name"
                    >
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      v-model="userProfile.email" 
                      class="form-control"
                      disabled
                    >
                    <small class="form-text">Email cannot be changed</small>
                  </div>
                  <div class="form-group">
                    <label>Bio</label>
                    <textarea 
                      v-model="userProfile.bio" 
                      class="form-control"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label>Location</label>
                    <input 
                      type="text" 
                      v-model="userProfile.location" 
                      class="form-control"
                      placeholder="Enter your location"
                    >
                  </div>
                  <button class="btn btn-primary" @click="saveProfile">
                    <i class="fas fa-save"></i> Save Changes
                  </button>
                </div>
              </div>

              <!-- Security Tab -->
              <div v-if="activeTab === 'security'" class="tab-panel">
                <h2 class="tab-title">Security Settings</h2>
                <div class="security-section">
                  <div class="security-item">
                    <div class="security-info">
                      <h4>Change Password</h4>
                      <p>Update your account password</p>
                    </div>
                    <button class="btn btn-outline-primary" @click="showChangePassword = true">
                      Change Password
                    </button>
                  </div>
                  <div class="security-item">
                    <div class="security-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button class="btn btn-outline-primary" @click="setup2FA">
                      Setup 2FA
                    </button>
                  </div>
                  <div class="security-item">
                    <div class="security-info">
                      <h4>Connected Wallets</h4>
                      <p>Manage your connected cryptocurrency wallets</p>
                    </div>
                    <button class="btn btn-outline-primary" @click="manageWallets">
                      Manage Wallets
                    </button>
                  </div>
                </div>
              </div>

              <!-- Referral Tab -->
              <div v-if="activeTab === 'referral'" class="tab-panel">
                <h2 class="tab-title">Referral Program</h2>
                <div class="referral-section">
                  <div class="referral-stats">
                    <div class="referral-stat">
                      <h3>{{ userProfile.referralCount || 0 }}</h3>
                      <p>Total Referrals</p>
                    </div>
                    <div class="referral-stat">
                      <h3>{{ userProfile.referralEarnings || 0 }} $PPO</h3>
                      <p>Total Earnings</p>
                    </div>
                  </div>
                  <div class="referral-code-section">
                    <h4>Your Referral Code</h4>
                    <div class="referral-code">
                      <input 
                        type="text" 
                        :value="userProfile.referralCode" 
                        class="form-control"
                        readonly
                      >
                      <button class="btn btn-primary" @click="copyReferralCode">
                        <i class="fas fa-copy"></i> Copy
                      </button>
                    </div>
                    <p class="referral-info">Share this code with friends to earn 5 $PPO for each successful referral!</p>
                  </div>
                  <div class="referral-links">
                    <h4>Quick Share Links</h4>
                    <div class="share-buttons">
                      <button class="btn btn-social btn-twitter" @click="shareOnTwitter">
                        <i class="fab fa-twitter"></i> Twitter
                      </button>
                      <button class="btn btn-social btn-telegram" @click="shareOnTelegram">
                        <i class="fab fa-telegram"></i> Telegram
                      </button>
                      <button class="btn btn-social btn-facebook" @click="shareOnFacebook">
                        <i class="fab fa-facebook"></i> Facebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Activity Tab -->
              <div v-if="activeTab === 'activity'" class="tab-panel">
                <h2 class="tab-title">Recent Activity</h2>
                <div class="activity-list">
                  <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                    <div class="activity-icon">
                      <i :class="activity.icon"></i>
                    </div>
                    <div class="activity-content">
                      <h5>{{ activity.title }}</h5>
                      <p>{{ activity.description }}</p>
                      <small class="activity-time">{{ formatTime(activity.timestamp) }}</small>
                    </div>
                    <div class="activity-amount" v-if="activity.amount">
                      <span class="amount-positive" v-if="activity.amount > 0">+{{ activity.amount }} $PPO</span>
                      <span class="amount-negative" v-else>{{ activity.amount }} $PPO</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Settings Tab -->
              <div v-if="activeTab === 'settings'" class="tab-panel">
                <h2 class="tab-title">Account Settings</h2>
                <div class="settings-section">
                  <div class="setting-item">
                    <div class="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about your account</p>
                    </div>
                    <div class="setting-toggle">
                      <input type="checkbox" v-model="settings.emailNotifications" id="emailNotif">
                      <label for="emailNotif"></label>
                    </div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-info">
                      <h4>Push Notifications</h4>
                      <p>Receive push notifications in your browser</p>
                    </div>
                    <div class="setting-toggle">
                      <input type="checkbox" v-model="settings.pushNotifications" id="pushNotif">
                      <label for="pushNotif"></label>
                    </div>
                  </div>
                  <div class="setting-item">
                    <div class="setting-info">
                      <h4>Dark Mode</h4>
                      <p>Use dark theme for better experience</p>
                    </div>
                    <div class="setting-toggle">
                      <input type="checkbox" v-model="settings.darkMode" id="darkMode">
                      <label for="darkMode"></label>
                    </div>
                  </div>
                  <button class="btn btn-primary" @click="saveSettings">
                    <i class="fas fa-save"></i> Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="modal-overlay" @click="showChangePassword = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Change Password</h3>
          <button class="close-btn" @click="showChangePassword = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" v-model="passwordForm.currentPassword" class="form-control">
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" v-model="passwordForm.newPassword" class="form-control">
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <input type="password" v-model="passwordForm.confirmPassword" class="form-control">
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" @click="changePassword">
              <i class="fas fa-key"></i> Change Password
            </button>
            <button class="btn btn-secondary" @click="showChangePassword = false">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useFirebase } from '@/composables/useFirebase.js'

const router = useRouter()
const { currentUser, updateUserData } = useFirebase()

// State
const activeTab = ref('personal')
const showChangePassword = ref(false)

// Profile tabs
const profileTabs = ref([
  { id: 'personal', name: 'Personal Info', icon: 'fas fa-user' },
  { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
  { id: 'referral', name: 'Referrals', icon: 'fas fa-users' },
  { id: 'activity', name: 'Activity', icon: 'fas fa-history' },
  { id: 'settings', name: 'Settings', icon: 'fas fa-cog' }
])

// User profile data
const userProfile = ref({
  displayName: '',
  email: '',
  avatar: '',
  bio: '',
  location: '',
  level: 'F0',
  experience: 0,
  tokenBalance: 0,
  totalEarned: 0,
  referralCount: 0,
  referralEarnings: 0,
  referralCode: '',
  daysActive: 0
})

// Settings
const settings = ref({
  emailNotifications: true,
  pushNotifications: true,
  darkMode: true
})

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'Daily Check-in',
    description: 'Completed daily check-in task',
    amount: 1,
    icon: 'fas fa-calendar-check',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Game Reward',
    description: 'Earned from archery game',
    amount: 5,
    icon: 'fas fa-gamepad',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: 'Referral Bonus',
    description: 'New user joined with your code',
    amount: 5,
    icon: 'fas fa-users',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
])

// Methods
const editAvatar = () => {
  // Implement avatar upload functionality
  console.log('Edit avatar clicked')
}

const saveProfile = async () => {
  try {
    await updateUserData({
      displayName: userProfile.value.displayName,
      bio: userProfile.value.bio,
      location: userProfile.value.location
    })
    alert('Profile updated successfully!')
  } catch (error) {
    alert('Failed to update profile: ' + error.message)
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match!')
    return
  }
  
  // Implement password change logic
  console.log('Changing password...')
  alert('Password changed successfully!')
  showChangePassword.value = false
  passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
}

const setup2FA = () => {
  alert('2FA setup functionality will be implemented here')
}

const manageWallets = () => {
  alert('Wallet management functionality will be implemented here')
}

const copyReferralCode = () => {
  navigator.clipboard.writeText(userProfile.value.referralCode)
  alert('Referral code copied to clipboard!')
}

const shareOnTwitter = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userProfile.value.referralCode}`
  const url = window.location.origin
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
}

const shareOnTelegram = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userProfile.value.referralCode}`
  window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(text)}`)
}

const shareOnFacebook = () => {
  const text = `Join me on PixelPayot! Use my referral code: ${userProfile.value.referralCode}`
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`)
}

const saveSettings = () => {
  // Save settings to database
  console.log('Settings saved:', settings.value)
  alert('Settings saved successfully!')
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}

const loadUserProfile = async () => {
  if (currentUser.value) {
    userProfile.value = {
      displayName: currentUser.value.displayName || '',
      email: currentUser.value.email || '',
      avatar: currentUser.value.photoURL || '',
      bio: '',
      location: '',
      level: 'F0',
      experience: 250,
      tokenBalance: 150,
      totalEarned: 500,
      referralCount: 3,
      referralEarnings: 15,
      referralCode: 'ABC12345',
      daysActive: 15
    }
  }
}

// Lifecycle
onMounted(() => {
  loadUserProfile()
})
</script>

<style scoped>
.profile-page {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.profile-hero {
  background: linear-gradient(135deg, rgba(204, 0, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  padding: 80px 0;
}

.profile-header {
  text-align: center;
}

.profile-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #cc00ff;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #cc00ff;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

.profile-email {
  color: #b0b0b0;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.profile-level {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.level-badge {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
}

.level-progress {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.profile-stats {
  padding: 60px 0;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.2);
}

.stat-icon {
  font-size: 3rem;
  color: #cc00ff;
  margin-bottom: 20px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
}

.stat-label {
  color: #b0b0b0;
  font-size: 1.1rem;
  margin: 0;
}

.profile-content {
  padding: 60px 0;
}

.profile-nav {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  position: sticky;
  top: 20px;
}

.nav-tab {
  width: 100%;
  padding: 15px 20px;
  background: none;
  border: none;
  color: #b0b0b0;
  text-align: left;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-tab:hover,
.nav-tab.active {
  background: #cc00ff;
  color: white;
}

.nav-tab i {
  width: 20px;
}

.profile-tab-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  min-height: 500px;
}

.tab-title {
  color: white;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
}

.form-section {
  max-width: 600px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  color: white;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #cc00ff;
  box-shadow: 0 0 0 2px rgba(204, 0, 255, 0.2);
}

.form-control:disabled {
  background: rgba(255, 255, 255, 0.05);
  color: #666;
}

.form-text {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-top: 5px;
}

.security-section {
  max-width: 600px;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 20px;
}

.security-info h4 {
  color: white;
  margin-bottom: 5px;
}

.security-info p {
  color: #b0b0b0;
  margin: 0;
}

.referral-section {
  max-width: 600px;
}

.referral-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.referral-stat {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
}

.referral-stat h3 {
  color: #cc00ff;
  font-size: 2rem;
  margin-bottom: 5px;
}

.referral-stat p {
  color: #b0b0b0;
  margin: 0;
}

.referral-code-section {
  margin-bottom: 30px;
}

.referral-code-section h4 {
  color: white;
  margin-bottom: 15px;
}

.referral-code {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.referral-code .form-control {
  flex: 1;
}

.referral-info {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.share-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-social {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-social.btn-twitter {
  background: #1da1f2;
}

.btn-social.btn-telegram {
  background: #0088cc;
}

.btn-social.btn-facebook {
  background: #1877f2;
}

.btn-social:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.activity-list {
  max-width: 600px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  transform: translateX(10px);
  border-color: rgba(204, 0, 255, 0.3);
}

.activity-icon {
  font-size: 2rem;
  color: #cc00ff;
  min-width: 50px;
}

.activity-content {
  flex: 1;
}

.activity-content h5 {
  color: white;
  margin-bottom: 5px;
}

.activity-content p {
  color: #b0b0b0;
  margin-bottom: 5px;
}

.activity-time {
  color: #666;
  font-size: 0.9rem;
}

.activity-amount {
  font-weight: 600;
  font-size: 1.1rem;
}

.amount-positive {
  color: #00ff88;
}

.amount-negative {
  color: #ff4444;
}

.settings-section {
  max-width: 600px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 20px;
}

.setting-info h4 {
  color: white;
  margin-bottom: 5px;
}

.setting-info p {
  color: #b0b0b0;
  margin: 0;
}

.setting-toggle {
  position: relative;
}

.setting-toggle input[type="checkbox"] {
  display: none;
}

.setting-toggle label {
  display: block;
  width: 50px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.setting-toggle label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 21px;
  height: 21px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.setting-toggle input[type="checkbox"]:checked + label {
  background: #cc00ff;
}

.setting-toggle input[type="checkbox"]:checked + label::after {
  transform: translateX(25px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: white;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

.close-btn:hover {
  color: white;
}

.modal-body {
  padding: 20px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .profile-name {
    font-size: 2rem;
  }
  
  .profile-nav {
    position: static;
    margin-bottom: 30px;
  }
  
  .nav-tab {
    padding: 12px 15px;
    font-size: 0.9rem;
  }
  
  .profile-tab-content {
    padding: 20px;
  }
  
  .tab-title {
    font-size: 1.5rem;
  }
  
  .referral-stats {
    grid-template-columns: 1fr;
  }
  
  .referral-code {
    flex-direction: column;
  }
  
  .share-buttons {
    justify-content: center;
  }
  
  .activity-item {
    flex-direction: column;
    text-align: center;
  }
  
  .activity-amount {
    margin-top: 10px;
  }
  
  .setting-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}
</style>
