<template>
  <div class="signup-page">
    <Header />
    
    <!-- Auth Hero Section -->
    <section class="auth-hero padding-large">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="auth-container">
              <!-- Auth Tabs -->
              <div class="auth-tabs">
                <button 
                  @click="activeTab = 'signup'"
                  :class="['tab-btn', { active: activeTab === 'signup' }]"
                >
                  <i class="fas fa-user-plus"></i>
                  Sign Up
                </button>
                <button 
                  @click="activeTab = 'signin'"
                  :class="['tab-btn', { active: activeTab === 'signin' }]"
                >
                  <i class="fas fa-sign-in-alt"></i>
                  Sign In
                </button>
              </div>

              <!-- Sign Up Form -->
              <div v-if="activeTab === 'signup'" class="auth-form">
                <h2 class="form-title">Create Your Account</h2>
                <p class="form-subtitle">Join PixelPayot and start earning $PPO tokens!</p>
                
                <form @submit.prevent="handleSignUp">
                  <div class="form-group">
                    <label for="signup-name">Display Name</label>
                    <input 
                      id="signup-name"
                      v-model="signupForm.displayName"
                      type="text" 
                      class="form-control"
                      placeholder="Enter your display name"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="signup-email">Email Address</label>
                    <input 
                      id="signup-email"
                      v-model="signupForm.email"
                      type="email" 
                      class="form-control"
                      placeholder="Enter your email"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="signup-password">Password</label>
                    <input 
                      id="signup-password"
                      v-model="signupForm.password"
                      type="password" 
                      class="form-control"
                      placeholder="Create a password (min 6 characters)"
                      required
                      minlength="6"
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="signup-referral">Referral Code (Optional)</label>
                    <input 
                      id="signup-referral"
                      v-model="signupForm.referralCode"
                      type="text" 
                      class="form-control"
                      placeholder="Enter referral code if you have one"
                    >
                  </div>
                  
                  <div class="form-group">
                    <label class="checkbox-label">
                      <input 
                        v-model="signupForm.agreeTerms"
                        type="checkbox" 
                        required
                      >
                      <span class="checkmark"></span>
                      I agree to the <a href="#" @click.prevent="showTerms">Terms of Service</a> and <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-linear btn-large w-100"
                    :disabled="isLoading"
                  >
                    <i v-if="isLoading" class="fas fa-spinner fa-spin me-2"></i>
                    <i v-else class="fas fa-user-plus me-2"></i>
                    {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                  </button>
                </form>
              </div>

              <!-- Sign In Form -->
              <div v-if="activeTab === 'signin'" class="auth-form">
                <h2 class="form-title">Welcome Back!</h2>
                <p class="form-subtitle">Sign in to your PixelPayot account</p>
                
                <form @submit.prevent="handleSignIn">
                  <div class="form-group">
                    <label for="signin-email">Email Address</label>
                    <input 
                      id="signin-email"
                      v-model="signinForm.email"
                      type="email" 
                      class="form-control"
                      placeholder="Enter your email"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="signin-password">Password</label>
                    <input 
                      id="signin-password"
                      v-model="signinForm.password"
                      type="password" 
                      class="form-control"
                      placeholder="Enter your password"
                      required
                    >
                  </div>
                  
                  <div class="form-group">
                    <label class="checkbox-label">
                      <input 
                        v-model="signinForm.rememberMe"
                        type="checkbox"
                      >
                      <span class="checkmark"></span>
                      Remember me
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="btn btn-linear btn-large w-100"
                    :disabled="isLoading"
                  >
                    <i v-if="isLoading" class="fas fa-spinner fa-spin me-2"></i>
                    <i v-else class="fas fa-sign-in-alt me-2"></i>
                    {{ isLoading ? 'Signing In...' : 'Sign In' }}
                  </button>
                  
                  <div class="form-footer">
                    <a href="#" @click.prevent="showForgotPassword">Forgot Password?</a>
                  </div>
                </form>
              </div>

              <!-- Error Display -->
              <div v-if="error" class="alert alert-danger mt-3">
                <i class="fas fa-exclamation-circle me-2"></i>
                {{ error }}
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="alert alert-success mt-3">
                <i class="fas fa-check-circle me-2"></i>
                {{ successMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Why Join PixelPayot?</h2>
            <div class="row">
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card">
                  <div class="benefit-icon">
                    <i class="fas fa-coins"></i>
                  </div>
                  <h4>Earn $PPO Tokens</h4>
                  <p>Complete tasks, play games, and earn $PPO tokens that you can use in the marketplace</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card">
                  <div class="benefit-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <h4>Referral Rewards</h4>
                  <p>Invite friends and earn 5 $PPO for each successful referral</p>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="benefit-card">
                  <div class="benefit-icon">
                    <i class="fas fa-gamepad"></i>
                  </div>
                  <h4>Play & Earn</h4>
                  <p>Enjoy exciting games while earning rewards and climbing the leaderboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebase } from '@/composables/useFirebase.js'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const { signIn, signUp, addReferral, isLoading, firebaseError } = useFirebase()

// State
const activeTab = ref('signup')
const error = ref('')
const successMessage = ref('')

// Forms
const signupForm = reactive({
  displayName: '',
  email: '',
  password: '',
  referralCode: '',
  agreeTerms: false
})

const signinForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Methods
const handleSignUp = async () => {
  try {
    error.value = ''
    successMessage.value = ''
    
    const result = await signUp(signupForm.email, signupForm.password, signupForm.displayName)
    
    if (result.success) {
      // Add referral if provided
      if (signupForm.referralCode) {
        try {
          await addReferral(signupForm.referralCode)
        } catch (referralError) {
          console.warn('Referral code error:', referralError)
        }
      }
      
      successMessage.value = 'Account created successfully! Welcome to PixelPayot!'
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = err.message || 'Failed to create account'
  }
}

const handleSignIn = async () => {
  try {
    error.value = ''
    successMessage.value = ''
    
    const result = await signIn(signinForm.email, signinForm.password)
    
    if (result.success) {
      successMessage.value = 'Welcome back!'
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = err.message || 'Failed to sign in'
  }
}

const showTerms = () => {
  // TODO: Show terms modal
  alert('Terms of Service will be displayed here')
}

const showPrivacy = () => {
  // TODO: Show privacy modal
  alert('Privacy Policy will be displayed here')
}

const showForgotPassword = () => {
  // TODO: Show forgot password modal
  alert('Forgot password functionality will be implemented here')
}

// Check for referral code in URL on page load
const checkReferralFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const refCode = urlParams.get('ref')
  if (refCode) {
    signupForm.referralCode = refCode
    console.log('Referral code detected from URL:', refCode)
  }
}

// Watch for Firebase errors
import { watch, onMounted } from 'vue'
watch(firebaseError, (newError) => {
  if (newError) {
    error.value = newError
  }
})

// Lifecycle
onMounted(() => {
  checkReferralFromURL()
})
</script>

<style scoped>
.signup-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.auth-hero {
  padding-top: 120px;
  padding-bottom: 80px;
}

.auth-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-tabs {
  display: flex;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 5px;
}

.tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.2);
  color: #cc00ff;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.auth-form {
  color: white;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  margin-bottom: 30px;
  opacity: 0.8;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: white;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-control:focus {
  outline: none;
  border-color: #cc00ff;
  background: rgba(255, 255, 255, 0.15);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.checkbox-label a {
  color: #cc00ff;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.btn-linear:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
}

.form-footer a {
  color: #cc00ff;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}

.alert {
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.alert-danger {
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
}

.alert-success {
  background: rgba(40, 167, 69, 0.2);
  border: 1px solid rgba(40, 167, 69, 0.3);
  color: #51cf66;
}

.benefits-section {
  background: rgba(0, 0, 0, 0.3);
}

.benefit-card {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.benefit-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: white;
}

.benefit-card h4 {
  color: white;
  margin-bottom: 15px;
  font-weight: 600;
}

.benefit-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 30px 20px;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .tab-btn {
    padding: 12px 15px;
    font-size: 14px;
  }
}
</style>
