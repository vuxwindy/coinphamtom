<template>
  <div class="arrow-game">
    <!-- Back Button -->
    <router-link to="/" class="back-button">
      <i class="fas fa-arrow-left me-2"></i>Back to Home
    </router-link>

    <!-- Wallet Status -->
    <div class="wallet-status" :class="walletStatusClass">
      <i class="fas fa-wallet me-1"></i>{{ walletStatusText }}
    </div>

    <!-- Game Container -->
    <div class="game-container">
      <!-- Header -->
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

      <!-- Game Area -->
      <div class="game-area" ref="gameArea">
        <!-- Character -->
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

        <!-- Bow -->
        <div class="bow" ref="bow">
          <div class="bow-body"></div>
          <div class="bow-string" ref="bowString"></div>
        </div>

        <!-- Aiming Line -->
        <div class="aiming-line" ref="aimingLine"></div>

        <!-- Arrow -->
        <div class="arrow" ref="arrow"></div>

        <!-- Flying Arrow -->
        <div class="flying-arrow" ref="flyingArrow"></div>

        <!-- Target -->
        <div class="target" ref="target">
          <div class="target-ring outer"></div>
          <div class="target-ring middle"></div>
          <div class="target-ring inner"></div>
          <div class="target-ring bullseye"></div>
        </div>

        <!-- Arrow Counter -->
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

        <!-- PPO Balance -->
        <div class="ppo-balance">
          <h3><i class="fas fa-coins"></i> PPO</h3>
          <div class="ppo-amount">{{ ppoBalance }}</div>
        </div>

        <!-- Game Controls -->
        <div class="game-controls">
          <button class="control-btn" @click="selectCharacter">
            <i class="fas fa-user"></i> Character
          </button>
          <button class="control-btn" @click="selectBow">
            <i class="fas fa-crosshairs"></i> Bow
          </button>
          <button class="control-btn" @click="buyArrows" :disabled="ppoBalance < 10">
            <i class="fas fa-shopping-cart"></i> Buy Arrows
          </button>
        </div>

        <!-- Instructions -->
        <div class="instructions">
          <i class="fas fa-mouse"></i> Click and drag to aim, release to shoot!
        </div>
      </div>
    </div>

    <!-- Character Selection Modal -->
    <div class="character-selector" v-if="showCharacterSelector">
      <h2>Choose Your Character</h2>
      <div class="character-grid">
        <div 
          v-for="char in characters" 
          :key="char.id"
          class="character-option"
          :class="{ selected: selectedCharacter === char.id }"
          @click="selectedCharacter = char.id"
        >
          <div class="character-avatar" :style="{ background: char.color }"></div>
          <span>{{ char.name }}</span>
        </div>
      </div>
      <button class="control-btn" @click="confirmCharacter">Confirm</button>
      <button class="control-btn" @click="showCharacterSelector = false">Cancel</button>
    </div>

    <!-- Bow Selection Modal -->
    <div class="bow-selector" v-if="showBowSelector">
      <h2>Choose Your Bow</h2>
      <div class="bow-grid">
        <div 
          v-for="bow in bows" 
          :key="bow.id"
          class="bow-option"
          :class="{ selected: selectedBow === bow.id }"
          @click="selectedBow = bow.id"
        >
          <i class="fas fa-crosshairs"></i>
          <div>{{ bow.name }}</div>
          <small>{{ bow.description }}</small>
        </div>
      </div>
      <button class="control-btn" @click="confirmBow">Confirm</button>
      <button class="control-btn" @click="showBowSelector = false">Cancel</button>
    </div>

    <!-- Game Over Modal -->
    <div class="game-over-modal" v-if="showGameOverModal">
      <div class="modal-content">
        <h2><i class="fas fa-gamepad"></i> Game Over!</h2>
        <div class="final-score">Score: {{ score }}</div>
        <p>You've run out of arrows!</p>
        <button class="control-btn" @click="restartGame">
          <i class="fas fa-redo"></i> Play Again
        </button>
        <button class="control-btn" @click="buyArrows">
          <i class="fas fa-shopping-cart"></i> Buy More Arrows
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWeb3 } from '@/composables/useWeb3.js'

export default {
  name: 'ArrowGame',
  setup() {
    // Use Web3 composable
    const { isWalletConnected } = useWeb3()

    // Game state
    const score = ref(0)
    const highScore = ref(0)
    const gameStarted = ref(false)
    const gamePaused = ref(false)
    const arrowsLeft = ref(5)
    const ppoBalance = ref(0)
    const currentLevel = ref(1)
    const hitCount = ref(0)
    const isGameActive = ref(true)
    const selectedCharacter = ref('archer1')
    const selectedBow = ref('basic')
    const isAiming = ref(false)
    const aimStartX = ref(0)
    const aimStartY = ref(0)

    // UI state
    const showCharacterSelector = ref(false)
    const showBowSelector = ref(false)
    const showGameOverModal = ref(false)

    // Characters and bows
    const characters = [
      { id: 'archer1', name: 'Archer', color: 'linear-gradient(135deg, #8B4513, #A0522D)' },
      { id: 'archer2', name: 'Ranger', color: 'linear-gradient(135deg, #4A90E2, #357ABD)' },
      { id: 'archer3', name: 'Hunter', color: 'linear-gradient(135deg, #E74C3C, #C0392B)' }
    ]

    const bows = [
      { id: 'basic', name: 'Basic Bow', description: 'Standard accuracy' },
      { id: 'premium', name: 'Premium Bow', description: '+20% accuracy' },
      { id: 'legendary', name: 'Legendary Bow', description: '+50% accuracy' }
    ]

    // Computed properties
    const walletStatusClass = computed(() => ({
      'wallet-status': true,
      'connected': isWalletConnected.value,
      'disconnected': !isWalletConnected.value
    }))

    const walletStatusText = computed(() => 
      isWalletConnected.value ? 'Wallet Connected' : 'Wallet Disconnected'
    )

    // Game methods
    const selectCharacter = () => {
      showCharacterSelector.value = true
    }

    const confirmCharacter = () => {
      showCharacterSelector.value = false
      updateCharacter()
    }

    const selectBow = () => {
      showBowSelector.value = true
    }

    const confirmBow = () => {
      showBowSelector.value = false
      updateBow()
    }

    const updateCharacter = () => {
      const character = document.querySelector('.character')
      if (!character) return

      const colors = {
        'archer1': { body: '#8B4513', head: '#FFE4C4', legs: '#8B4513' },
        'archer2': { body: '#4A90E2', head: '#FFE4C4', legs: '#4A90E2' },
        'archer3': { body: '#E74C3C', head: '#FFE4C4', legs: '#E74C3C' }
      }
      
      const color = colors[selectedCharacter.value]
      character.querySelector('.character-body').style.background = `linear-gradient(135deg, ${color.body}, ${color.body}dd)`
      character.querySelector('.character-head').style.background = color.head
      
      const legs = character.querySelectorAll('.character-leg')
      legs.forEach(leg => {
        leg.style.background = `linear-gradient(135deg, ${color.legs}, ${color.legs}dd)`
      })
    }

    const updateBow = () => {
      const bow = document.querySelector('.bow')
      if (!bow) return

      const colors = {
        'basic': '#8B4513',
        'premium': '#FFD700',
        'legendary': '#FF4500'
      }
      
      bow.querySelector('.bow-body').style.background = `linear-gradient(135deg, ${colors[selectedBow.value]}, ${colors[selectedBow.value]}dd)`
    }

    const buyArrows = async () => {
      if (!isWalletConnected.value) {
        showNotification('Please connect your wallet first!', 'error')
        return
      }

      if (ppoBalance.value >= 10) {
        try {
          // Simulate balance update for now
          ppoBalance.value -= 10
          arrowsLeft.value = 5
          isGameActive.value = true
          showGameOverModal.value = false
          showNotification('5 arrows purchased for 10 PPO!', 'success')
        } catch (error) {
          showNotification('Failed to purchase arrows', 'error')
        }
      } else {
        showNotification('Not enough PPO! Complete daily tasks to earn more!', 'error')
      }
    }

    const restartGame = () => {
      score.value = 0
      hitCount.value = 0
      currentLevel.value = 1
      arrowsLeft.value = 5
      isGameActive.value = true
      showGameOverModal.value = false
    }

    const showNotification = (message, type) => {
      // Simple notification implementation
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b6b' : '#4a90e2'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.remove()
      }, 3000)
    }

    // Game logic methods
    const startAim = (e) => {
      if (!isGameActive.value || arrowsLeft.value <= 0) return
      
      isAiming.value = true
      aimStartX.value = e.clientX
      aimStartY.value = e.clientY
      
      const arrow = document.querySelector('.arrow')
      const aimingLine = document.querySelector('.aiming-line')
      const bow = document.querySelector('.bow')
      
      if (arrow) arrow.style.display = 'block'
      if (aimingLine) aimingLine.style.display = 'block'
      if (bow) bow.classList.add('drawing')
    }

    const aim = (e) => {
      if (!isAiming.value) return
      
      const deltaX = e.clientX - aimStartX.value
      const deltaY = e.clientY - aimStartY.value
      const angle = Math.atan2(deltaY, deltaX)
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10, 50)
      
      const arrow = document.querySelector('.arrow')
      const aimingLine = document.querySelector('.aimingLine')
      const bowString = document.querySelector('.bowString')
      
      if (arrow) {
        arrow.style.transform = `rotate(${angle}rad) translateX(${distance}px)`
      }
      
      if (aimingLine) {
        aimingLine.style.transform = `rotate(${angle}rad)`
      }
      
      if (bowString) {
        const drawIntensity = Math.min(distance / 30, 1.5)
        bowString.style.transform = `rotate(${angle}rad) scaleY(${1 + drawIntensity})`
      }
    }

    const shoot = () => {
      if (!isAiming.value || !isGameActive.value || arrowsLeft.value <= 0) return
      
      isAiming.value = false
      arrowsLeft.value--
      
      const arrow = document.querySelector('.arrow')
      const aimingLine = document.querySelector('.aimingLine')
      const bow = document.querySelector('.bow')
      const bowString = document.querySelector('.bowString')
      
      if (arrow) arrow.style.display = 'none'
      if (aimingLine) aimingLine.style.display = 'none'
      if (bow) bow.classList.remove('drawing')
      if (bowString) bowString.style.transform = 'rotate(0rad) scaleY(1)'
      
      // Calculate shot result
      const accuracy = Math.random() * 100
      let hitChance = 30 // Base 30% chance
      if (selectedBow.value === 'premium') hitChance = 50
      if (selectedBow.value === 'legendary') hitChance = 80
      
      if (accuracy <= hitChance) {
        // Hit!
        hitCount.value++
        score.value += Math.floor(currentLevel.value * 10)
        
        // Level up every 5 hits
        if (hitCount.value % 5 === 0) {
          currentLevel.value++
          showNotification(`Level Up! Now Level ${currentLevel.value}`, 'success')
          
          // Reward PPO for leveling up
          const levelReward = Math.floor(currentLevel.value * 2)
          ppoBalance.value += levelReward
          showNotification(`Level Up Reward: +${levelReward} PPO!`, 'success')
        }
        
        showHitEffect('BULLSEYE!', '#ffd700')
      } else {
        showHitEffect('MISS!', '#ff6b6b')
      }
      
      // Check if game over
      if (arrowsLeft.value <= 0) {
        setTimeout(() => {
          gameOver()
        }, 2000)
      }
    }

    const showHitEffect = (text, color) => {
      const effect = document.createElement('div')
      effect.className = 'hit-effect'
      effect.innerHTML = `<div class="hit-text" style="color: ${color}">${text}</div>`
      effect.style.left = '50%'
      effect.style.top = '50%'
      effect.style.transform = 'translate(-50%, -50%)'
      
      const gameArea = document.querySelector('.game-area')
      if (gameArea) {
        gameArea.appendChild(effect)
        
        setTimeout(() => {
          effect.remove()
        }, 1000)
      }
    }

    const gameOver = () => {
      isGameActive.value = false
      showGameOverModal.value = true
      
      // Update high score
      if (score.value > highScore.value) {
        highScore.value = score.value
        localStorage.setItem('highScore', highScore.value)
        showNotification('New High Score!', 'success')
      }
    }

    // Event listeners
    const handleMouseDown = (e) => startAim(e)
    const handleMouseMove = (e) => aim(e)
    const handleMouseUp = () => shoot()

    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      startAim({ clientX: touch.clientX, clientY: touch.clientY })
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (isAiming.value) {
        const touch = e.touches[0]
        aim({ clientX: touch.clientX, clientY: touch.clientY })
      }
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      shoot()
    }

    onMounted(() => {
      const gameArea = document.querySelector('.game-area')
      if (gameArea) {
        gameArea.addEventListener('mousedown', handleMouseDown)
        gameArea.addEventListener('mousemove', handleMouseMove)
        gameArea.addEventListener('mouseup', handleMouseUp)
        
        // Touch events for mobile
        gameArea.addEventListener('touchstart', handleTouchStart)
        gameArea.addEventListener('touchmove', handleTouchMove)
        gameArea.addEventListener('touchend', handleTouchEnd)
      }

      // Update PPO balance from task system
      ppoBalance.value = userBalance.value // Assuming userBalance is available from useWeb3
    })

    onUnmounted(() => {
      const gameArea = document.querySelector('.game-area')
      if (gameArea) {
        gameArea.removeEventListener('mousedown', handleMouseDown)
        gameArea.removeEventListener('mousemove', handleMouseMove)
        gameArea.removeEventListener('mouseup', handleMouseUp)
        gameArea.removeEventListener('touchstart', handleTouchStart)
        gameArea.removeEventListener('touchmove', handleTouchMove)
        gameArea.removeEventListener('touchend', handleTouchEnd)
      }
    })

    return {
      // Game state
      score: computed(() => score.value),
      highScore: computed(() => highScore.value),
      arrowsLeft: computed(() => arrowsLeft.value),
      ppoBalance: computed(() => ppoBalance.value),
      currentLevel: computed(() => currentLevel.value),
      
      // UI state
      showCharacterSelector,
      showBowSelector,
      showGameOverModal,
      
      // Data
      characters,
      bows,
      selectedCharacter: computed(() => selectedCharacter.value),
      selectedBow: computed(() => selectedBow.value),
      
      // Computed
      walletStatusClass,
      walletStatusText,
      
      // Methods
      selectCharacter,
      confirmCharacter,
      selectBow,
      confirmBow,
      buyArrows,
      restartGame
    }
  }
}
</script>

<style scoped>
/* Import the game styles from the original HTML */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.arrow-game {
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

/* Game Container */
.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0;
}

/* Back Button */
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #fff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: bold;
}

.back-button:hover {
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  transform: translateX(-5px);
  text-decoration: none;
}

/* Wallet Status */
.wallet-status {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #fff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
}

.wallet-status.connected {
  border-color: #28a745;
  color: #28a745;
}

.wallet-status.disconnected {
  border-color: #dc3545;
  color: #dc3545;
}

/* Game Header */
.game-header {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.game-title {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.game-title i {
  color: #ffd700;
  font-size: 28px;
}

.game-stats {
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px 15px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
}

.stat-card i {
  color: #ffd700;
  font-size: 18px;
}

.score-display {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

/* Game Area */
.game-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
}

/* Character */
.character {
  position: absolute;
  left: 50px;
  bottom: 50px;
  width: 120px;
  height: 200px;
  z-index: 10;
}

.character-body {
  position: absolute;
  bottom: 0;
  width: 60px;
  height: 120px;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border-radius: 30px 30px 0 0;
  left: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.character-head {
  position: absolute;
  top: -40px;
  left: 15px;
  width: 30px;
  height: 30px;
  background: #FFE4C4;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.character-eyes {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 4px;
  height: 4px;
  background: #000;
  border-radius: 50%;
  box-shadow: 8px 0 0 #000;
}

.character-mouth {
  position: absolute;
  bottom: 6px;
  left: 12px;
  width: 6px;
  height: 2px;
  background: #000;
  border-radius: 1px;
}

.character-arms {
  position: absolute;
  top: 20px;
  width: 100%;
  height: 60px;
}

.character-arm {
  position: absolute;
  width: 15px;
  height: 60px;
  background: #FFE4C4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.character-arm.left {
  left: 10px;
  transform: rotate(-30deg);
}

.character-arm.right {
  right: 10px;
  transform: rotate(30deg);
}

.character-hands {
  position: absolute;
  bottom: -5px;
  width: 100%;
  height: 20px;
}

.character-hand {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #FFE4C4;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.character-hand.left {
  left: 8px;
}

.character-hand.right {
  right: 8px;
}

.character-legs {
  position: absolute;
  bottom: -20px;
  width: 100%;
  height: 40px;
}

.character-leg {
  position: absolute;
  width: 18px;
  height: 40px;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border-radius: 9px 9px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.character-leg.left {
  left: 15px;
}

.character-leg.right {
  right: 15px;
}

.character-feet {
  position: absolute;
  bottom: -8px;
  width: 100%;
  height: 15px;
}

.character-foot {
  position: absolute;
  width: 20px;
  height: 8px;
  background: #654321;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.character-foot.left {
  left: 12px;
}

.character-foot.right {
  right: 12px;
}

/* Bow */
.bow {
  position: absolute;
  left: 80px;
  bottom: 100px;
  width: 80px;
  height: 40px;
  z-index: 5;
}

.bow-string {
  position: absolute;
  width: 2px;
  height: 60px;
  background: #fff;
  left: 50%;
  top: -10px;
  transform-origin: center bottom;
  transition: all 0.2s ease;
}

.bow-body {
  position: absolute;
  width: 80px;
  height: 8px;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border-radius: 4px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
}

/* Bow Drawing Effect */
.bow.drawing .bow-string {
  transform: scaleY(1.5);
  background: linear-gradient(to bottom, #fff, #ffd700);
}

.bow.drawing .bow-body {
  transform: translateY(-50%) scaleX(1.1);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

/* Arrow */
.arrow {
  position: absolute;
  left: 85px;
  bottom: 105px;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #8B4513, #A0522D);
  z-index: 6;
  transform-origin: left center;
  display: none;
  transition: all 0.1s ease;
}

.arrow::before {
  content: '';
  position: absolute;
  right: -10px;
  top: -3px;
  width: 0;
  height: 0;
  border-left: 10px solid #A0522D;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

/* Aiming Line */
.aiming-line {
  position: absolute;
  left: 85px;
  bottom: 105px;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
  z-index: 4;
  transform-origin: left center;
  display: none;
  pointer-events: none;
}

/* Flying Arrow */
.flying-arrow {
  position: absolute;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #8B4513, #A0522D);
  z-index: 7;
  transform-origin: left center;
  display: none;
}

.flying-arrow::before {
  content: '';
  position: absolute;
  right: -10px;
  top: -3px;
  width: 0;
  height: 0;
  border-left: 10px solid #A0522D;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.flying-arrow::after {
  content: '';
  position: absolute;
  left: -2px;
  top: -1px;
  width: 4px;
  height: 6px;
  background: #654321;
  border-radius: 1px;
}

/* Target */
.target {
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  z-index: 5;
}

.target-ring {
  position: absolute;
  border-radius: 50%;
  border: 4px solid;
  transition: all 0.3s ease;
}

.target-ring.outer {
  width: 80px;
  height: 80px;
  border-color: #fff;
  background: #ff0000;
}

.target-ring.middle {
  width: 60px;
  height: 60px;
  border-color: #fff;
  background: #ffff00;
  top: 10px;
  left: 10px;
}

.target-ring.inner {
  width: 40px;
  height: 40px;
  border-color: #fff;
  background: #0000ff;
  top: 20px;
  left: 20px;
}

.target-ring.bullseye {
  width: 20px;
  height: 20px;
  background: #000;
  top: 30px;
  left: 30px;
}

/* Target Hit Effect */
.target.hit .target-ring {
  animation: targetHit 0.5s ease;
}

@keyframes targetHit {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Arrow Counter */
.arrow-counter {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  z-index: 50;
}

.arrow-counter h3 {
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
}

.arrow-display {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.arrow-icon {
  color: #ffd700;
  font-size: 20px;
  transition: all 0.3s ease;
}

.arrow-icon.used {
  color: #666;
  opacity: 0.3;
}

/* PPO Balance */
.ppo-balance {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  z-index: 50;
}

.ppo-balance h3 {
  color: #fff;
  margin-bottom: 5px;
  font-size: 16px;
}

.ppo-amount {
  color: #00ff88;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

/* Controls */
.game-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 50;
}

.control-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.control-btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Instructions */
.instructions {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px 25px;
  color: #fff;
  text-align: center;
  z-index: 50;
}

/* Character Selection */
.character-selector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  z-index: 1000;
  max-width: 500px;
  width: 90%;
}

.character-selector h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.character-option {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
}

.character-option:hover {
  border-color: #ffd700;
  transform: translateY(-2px);
}

.character-option.selected {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.2);
}

.character-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 10px;
}

/* Bow Selection */
.bow-selector {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 30px;
  z-index: 1000;
  max-width: 500px;
  width: 90%;
}

.bow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.bow-option {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
}

.bow-option:hover {
  border-color: #ffd700;
  transform: translateY(-2px);
}

.bow-option.selected {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.2);
}

.bow-option i {
  font-size: 40px;
  margin-bottom: 10px;
  color: #ffd700;
}

/* Game Over Modal */
.game-over-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  color: white;
  max-width: 400px;
  width: 90%;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #ffd700;
}

.final-score {
  font-size: 36px;
  font-weight: bold;
  color: #00ff88;
  margin: 20px 0;
}

/* Hit Effects */
.hit-effect {
  position: absolute;
  pointer-events: none;
  z-index: 100;
}

.hit-text {
  color: #ffd700;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .game-header {
    padding: 10px 15px;
    flex-direction: column;
    gap: 10px;
  }

  .game-title {
    font-size: 20px;
  }

  .game-stats {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .stat-card {
    padding: 8px 12px;
    font-size: 14px;
  }

  .character {
    left: 20px;
    bottom: 30px;
    transform: scale(0.8);
  }

  .target {
    right: 50px;
    transform: scale(0.8) translateY(-50%);
  }

  .arrow-counter,
  .ppo-balance {
    top: 10px;
    padding: 10px;
  }

  .arrow-counter {
    right: 10px;
  }

  .ppo-balance {
    left: 10px;
  }

  .game-controls {
    bottom: 10px;
    gap: 10px;
  }

  .control-btn {
    padding: 10px 15px;
    font-size: 14px;
  }

  .instructions {
    bottom: 70px;
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
