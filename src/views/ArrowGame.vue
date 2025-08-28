<template>
  <div class="arrow-game">
    <!-- Back Button -->
    <router-link to="/" class="back-button">
      <i class="fas fa-arrow-left me-2"></i>Back to Home
    </router-link>

    <!-- Coming Soon Content -->
    <div class="coming-soon-container">
      <div class="coming-soon-content">
        <div class="coming-soon-icon">
          <i class="fas fa-crosshairs"></i>
        </div>
        <h1 class="coming-soon-title">Coming Soon</h1>
        <p class="coming-soon-description">
          PPO Archery Game is under development. Get ready for an amazing gaming experience!
        </p>
        <div class="coming-soon-features">
          <div class="feature-item">
            <i class="fas fa-gamepad"></i>
            <span>Interactive Gameplay</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-trophy"></i>
            <span>Earn Rewards</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-users"></i>
            <span>Multiplayer Mode</span>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <p class="progress-text">Development Progress: 75%</p>
      </div>
    </div>

    <!-- Commented out original content -->
    <!--
    <div class="wallet-status" :class="walletStatusClass">
      <i class="fas fa-wallet me-1"></i>{{ walletStatusText }}
    </div>

    <div class="game-container">
      <div class="game-header">
        <div class="game-title">
          <i class="fas fa-crosshairs"></i>
          PPO Archery
        </div>
        <div class="game-stats">
          <div class="stat-card">
            <i class="fas fa-trophy"></i>
            <span>High: {{ highScore }}</span>
          </div>
          <div class="stat-card">
            <i class="fas fa-star"></i>
            <span>Level: {{ currentLevel }}</span>
          </div>
          <div class="stat-card score-display">
            <i class="fas fa-bullseye"></i>
            <span>Score: {{ score }}</span>
          </div>
        </div>
      </div>

      <div class="game-area" ref="gameArea">
        <div class="character" ref="character">
          <div class="character-body"></div>
          <div class="character-head">
            <div class="character-eyes"></div>
            <div class="character-mouth"></div>
          </div>
          <div class="character-arms">
            <div class="character-arm left"></div>
            <div class="character-arm right"></div>
          </div>
          <div class="character-hands">
            <div class="character-hand left"></div>
            <div class="character-hand right"></div>
          </div>
          <div class="character-legs">
            <div class="character-leg left"></div>
            <div class="character-leg right"></div>
          </div>
          <div class="character-feet">
            <div class="character-foot left"></div>
            <div class="character-foot right"></div>
          </div>
        </div>

        <div class="bow" ref="bow">
          <div class="bow-body"></div>
          <div class="bow-string" ref="bowString"></div>
        </div>

        <div class="aiming-line" ref="aimingLine"></div>
        <div class="arrow" ref="arrow"></div>
        <div class="flying-arrow" ref="flyingArrow"></div>

        <div class="target" ref="target">
          <div class="target-ring outer"></div>
          <div class="target-ring middle"></div>
          <div class="target-ring inner"></div>
          <div class="target-ring bullseye"></div>
        </div>

        <div class="arrow-counter">
          <h3><i class="fas fa-arrows-alt"></i> Arrows</h3>
          <div class="arrow-display">
            <i 
              v-for="i in 5" 
              :key="i"
              class="fas fa-arrow-right arrow-icon"
              :class="{ used: i > arrowsLeft }"
            ></i>
          </div>
        </div>

        <div class="ppo-balance">
          <h3><i class="fas fa-coins"></i> PPO</h3>
          <div class="ppo-amount">{{ ppoBalance }}</div>
        </div>

        <div class="game-controls">
          <button class="control-btn" @click="startGame" :disabled="gameStarted">
            <i class="fas fa-play"></i> Start
          </button>
          <button class="control-btn" @click="resetGame">
            <i class="fas fa-redo"></i> Reset
          </button>
          <button class="control-btn" @click="showInstructions">
            <i class="fas fa-question-circle"></i> Help
          </button>
        </div>
      </div>
    </div>

    <div class="game-instructions" v-if="showInstructionsModal">
      <div class="instructions-content">
        <h3>How to Play</h3>
        <ul>
          <li>Click and drag to aim</li>
          <li>Release to shoot</li>
          <li>Hit the target to score points</li>
          <li>Complete levels to earn PPO rewards</li>
        </ul>
        <button @click="showInstructionsModal = false">Got it!</button>
      </div>
    </div>
    -->
  </div>
</template>

<script setup>
// Commented out original script
/*
import { ref, onMounted, onUnmounted } from 'vue'
import { useWeb3 } from '../composables/useWeb3.js'

const { isWalletConnected, walletAddress } = useWeb3()

// Game state
const gameStarted = ref(false)
const score = ref(0)
const highScore = ref(0)
const currentLevel = ref(1)
const arrowsLeft = ref(5)
const ppoBalance = ref(0)

// DOM refs
const gameArea = ref(null)
const character = ref(null)
const bow = ref(null)
const bowString = ref(null)
const aimingLine = ref(null)
const arrow = ref(null)
const flyingArrow = ref(null)
const target = ref(null)

// Game variables
let isAiming = false
let aimStartX = 0
let aimStartY = 0
let currentAimX = 0
let currentAimY = 0
let gameLoop = null
let targetPosition = { x: 0, y: 0 }
let targetSpeed = 2
let targetDirection = 1

// Computed properties
const walletStatusText = computed(() => {
  return isWalletConnected.value 
    ? `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
    : 'Wallet Not Connected'
})

const walletStatusClass = computed(() => {
  return isWalletConnected.value ? 'connected' : 'disconnected'
})

// Game functions
const startGame = () => {
  gameStarted.value = true
  arrowsLeft.value = 5
  score.value = 0
  resetTarget()
  startGameLoop()
}

const resetGame = () => {
  gameStarted.value = false
  arrowsLeft.value = 5
  score.value = 0
  resetTarget()
  stopGameLoop()
}

const resetTarget = () => {
  if (target.value) {
    target.value.style.left = '80%'
    target.value.style.top = '50%'
    targetPosition = { x: 80, y: 50 }
  }
}

const startGameLoop = () => {
  gameLoop = setInterval(() => {
    moveTarget()
  }, 50)
}

const stopGameLoop = () => {
  if (gameLoop) {
    clearInterval(gameLoop)
    gameLoop = null
  }
}

const moveTarget = () => {
  if (!target.value) return
  
  targetPosition.y += targetSpeed * targetDirection
  
  if (targetPosition.y > 80 || targetPosition.y < 20) {
    targetDirection *= -1
  }
  
  target.value.style.top = `${targetPosition.y}%`
}

const showInstructions = () => {
  showInstructionsModal.value = true
}

// Event handlers
const handleMouseDown = (e) => {
  if (!gameStarted.value || arrowsLeft.value <= 0) return
  
  isAiming = true
  const rect = gameArea.value.getBoundingClientRect()
  aimStartX = e.clientX - rect.left
  aimStartY = e.clientY - rect.top
  
  if (aimingLine.value) {
    aimingLine.value.style.display = 'block'
  }
}

const handleMouseMove = (e) => {
  if (!isAiming) return
  
  const rect = gameArea.value.getBoundingClientRect()
  currentAimX = e.clientX - rect.left
  currentAimY = e.clientY - rect.top
  
  updateAimingLine()
}

const handleMouseUp = () => {
  if (!isAiming) return
  
  isAiming = false
  shootArrow()
  
  if (aimingLine.value) {
    aimingLine.value.style.display = 'none'
  }
}

const updateAimingLine = () => {
  if (!aimingLine.value) return
  
  const deltaX = currentAimX - aimStartX
  const deltaY = currentAimY - aimStartY
  const angle = Math.atan2(deltaY, deltaX)
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  
  aimingLine.value.style.transform = `rotate(${angle}rad)`
  aimingLine.value.style.width = `${Math.min(distance, 200)}px`
}

const shootArrow = () => {
  if (arrowsLeft.value <= 0) return
  
  arrowsLeft.value--
  
  const deltaX = currentAimX - aimStartX
  const deltaY = currentAimY - aimStartY
  const angle = Math.atan2(deltaY, deltaX)
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const power = Math.min(distance / 100, 2)
  
  if (flyingArrow.value) {
    flyingArrow.value.style.display = 'block'
    flyingArrow.value.style.transform = `rotate(${angle}rad)`
    
    const startX = aimStartX
    const startY = aimStartY
    const endX = startX + Math.cos(angle) * 300 * power
    const endY = startY + Math.sin(angle) * 300 * power
    
    flyingArrow.value.style.left = `${startX}px`
    flyingArrow.value.style.top = `${startY}px`
    
    setTimeout(() => {
      flyingArrow.value.style.left = `${endX}px`
      flyingArrow.value.style.top = `${endY}px`
      
      setTimeout(() => {
        flyingArrow.value.style.display = 'none'
        checkHit(endX, endY)
      }, 1000)
    }, 100)
  }
}

const checkHit = (arrowX, arrowY) => {
  if (!target.value) return
  
  const targetRect = target.value.getBoundingClientRect()
  const gameRect = gameArea.value.getBoundingClientRect()
  
  const targetCenterX = targetRect.left - gameRect.left + targetRect.width / 2
  const targetCenterY = targetRect.top - gameRect.top + targetRect.height / 2
  
  const distance = Math.sqrt(
    Math.pow(arrowX - targetCenterX, 2) + Math.pow(arrowY - targetCenterY, 2)
  )
  
  if (distance < 50) {
    const points = Math.max(1, Math.floor(50 - distance / 10))
    score.value += points
    
    if (score.value > highScore.value) {
      highScore.value = score.value
    }
    
    // Move target to new position
    targetPosition.x = 20 + Math.random() * 60
    targetPosition.y = 20 + Math.random() * 60
    target.value.style.left = `${targetPosition.x}%`
    target.value.style.top = `${targetPosition.y}%`
  }
  
  if (arrowsLeft.value === 0) {
    setTimeout(() => {
      endGame()
    }, 1000)
  }
}

const endGame = () => {
  gameStarted.value = false
  stopGameLoop()
  
  // Award PPO based on score
  const ppoEarned = Math.floor(score.value / 10)
  ppoBalance.value += ppoEarned
  
  if (score.value > 50) {
    currentLevel.value++
  }
}

// Lifecycle
onMounted(() => {
  if (gameArea.value) {
    gameArea.value.addEventListener('mousedown', handleMouseDown)
    gameArea.value.addEventListener('mousemove', handleMouseMove)
    gameArea.value.addEventListener('mouseup', handleMouseUp)
  }
  
  // Load saved data
  const savedHighScore = localStorage.getItem('arrowGameHighScore')
  if (savedHighScore) {
    highScore.value = parseInt(savedHighScore)
  }
  
  const savedPPO = localStorage.getItem('arrowGamePPO')
  if (savedPPO) {
    ppoBalance.value = parseInt(savedPPO)
  }
})

onUnmounted(() => {
  if (gameArea.value) {
    gameArea.value.removeEventListener('mousedown', handleMouseDown)
    gameArea.value.removeEventListener('mousemove', handleMouseMove)
    gameArea.value.removeEventListener('mouseup', handleMouseUp)
  }
  
  stopGameLoop()
  
  // Save data
  localStorage.setItem('arrowGameHighScore', highScore.value.toString())
  localStorage.setItem('arrowGamePPO', ppoBalance.value.toString())
})
*/
</script>

<style scoped>
/* Coming Soon Styles */
.coming-soon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.coming-soon-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 4rem 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.coming-soon-icon {
  font-size: 4rem;
  color: #ffffff;
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
}

.coming-soon-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.coming-soon-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.coming-soon-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.feature-item i {
  font-size: 1.5rem;
  color: #ffd700;
}

.feature-item span {
  font-size: 0.9rem;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  width: 75%;
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  border-radius: 4px;
  animation: progress 2s ease-in-out infinite;
}

.progress-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Back Button */
.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  color: #ffffff;
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes progress {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .coming-soon-content {
    padding: 3rem 2rem;
  }
  
  .coming-soon-title {
    font-size: 2.5rem;
  }
  
  .coming-soon-features {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .back-button {
    top: 1rem;
    left: 1rem;
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

/* Original styles commented out */
/*
.arrow-game {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.wallet-status {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1000;
}

.wallet-status.connected {
  border-color: #10b981;
}

.wallet-status.disconnected {
  border-color: #ef4444;
}

.game-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.game-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.game-stats {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 10px 15px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.game-area {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  cursor: crosshair;
}

.character {
  position: absolute;
  left: 10%;
  bottom: 20%;
  width: 60px;
  height: 120px;
  z-index: 10;
}

.character-body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 60px;
  background: #8b4513;
  border-radius: 15px 15px 0 0;
}

.character-head {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 25px;
  background: #ffdbac;
  border-radius: 50%;
}

.character-eyes {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 3px;
  background: #000;
  border-radius: 2px;
}

.character-mouth {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 2px;
  background: #000;
  border-radius: 1px;
}

.character-arms {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 40px;
}

.character-arm {
  position: absolute;
  width: 8px;
  height: 30px;
  background: #ffdbac;
  border-radius: 4px;
}

.character-arm.left {
  left: -5px;
  top: 0;
  transform: rotate(-20deg);
}

.character-arm.right {
  right: -5px;
  top: 0;
  transform: rotate(20deg);
}

.character-hands {
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  height: 20px;
}

.character-hand {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ffdbac;
  border-radius: 50%;
}

.character-hand.left {
  left: -8px;
  top: 0;
}

.character-hand.right {
  right: -8px;
  top: 0;
}

.character-legs {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
}

.character-leg {
  position: absolute;
  width: 10px;
  height: 35px;
  background: #8b4513;
  border-radius: 5px;
}

.character-leg.left {
  left: 5px;
  bottom: 0;
}

.character-leg.right {
  right: 5px;
  bottom: 0;
}

.character-feet {
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 15px;
}

.character-foot {
  position: absolute;
  width: 15px;
  height: 8px;
  background: #654321;
  border-radius: 4px;
}

.character-foot.left {
  left: 2px;
  bottom: 0;
}

.character-foot.right {
  right: 2px;
  bottom: 0;
}

.bow {
  position: absolute;
  left: 15%;
  bottom: 25%;
  width: 40px;
  height: 80px;
  z-index: 5;
}

.bow-body {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 60px;
  background: #8b4513;
  border-radius: 3px;
}

.bow-string {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 50px;
  background: #ffffff;
  border-radius: 1px;
}

.aiming-line {
  position: absolute;
  left: 20%;
  bottom: 30%;
  width: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
  transform-origin: left center;
  display: none;
  z-index: 15;
}

.arrow {
  position: absolute;
  left: 18%;
  bottom: 28%;
  width: 20px;
  height: 4px;
  background: #8b4513;
  border-radius: 2px;
  z-index: 8;
}

.arrow::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid #654321;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
}

.flying-arrow {
  position: absolute;
  width: 20px;
  height: 4px;
  background: #8b4513;
  border-radius: 2px;
  display: none;
  z-index: 20;
  transition: all 1s ease;
}

.flying-arrow::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid #654321;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
}

.target {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  z-index: 10;
  transition: all 0.5s ease;
}

.target-ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid;
}

.target-ring.outer {
  width: 100%;
  height: 100%;
  border-color: #ffffff;
}

.target-ring.middle {
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  border-color: #ff0000;
}

.target-ring.inner {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  border-color: #ffff00;
}

.target-ring.bullseye {
  width: 20%;
  height: 20%;
  top: 40%;
  left: 40%;
  border-color: #000000;
  background: #000000;
}

.arrow-counter {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  color: #ffffff;
}

.arrow-counter h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.arrow-display {
  display: flex;
  gap: 5px;
}

.arrow-icon {
  font-size: 1.2rem;
  color: #ffffff;
  transition: all 0.3s ease;
}

.arrow-icon.used {
  color: rgba(255, 255, 255, 0.3);
}

.ppo-balance {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  color: #ffffff;
  text-align: center;
}

.ppo-balance h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ppo-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
}

.game-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.game-instructions {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.instructions-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  color: #ffffff;
  max-width: 400px;
  text-align: center;
}

.instructions-content h3 {
  margin: 0 0 20px 0;
  font-size: 1.5rem;
}

.instructions-content ul {
  text-align: left;
  margin: 0 0 20px 0;
  padding-left: 20px;
}

.instructions-content li {
  margin-bottom: 10px;
}

.instructions-content button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.instructions-content button:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .game-stats {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .game-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .character {
    left: 5%;
    width: 40px;
    height: 80px;
  }
  
  .target {
    right: 5%;
    width: 80px;
    height: 80px;
  }
}
*/
</style>
