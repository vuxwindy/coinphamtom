<template>
  <div class="arrow-game-modern">
    <!-- Back Button -->
    <router-link to="/" class="back-button">
      <i class="fas fa-arrow-left me-2"></i>Back to Home
    </router-link>

    <!-- Wallet Status -->
    <div class="wallet-status" :class="walletStatusClass" id="walletStatus">
      <i class="fas fa-wallet me-1"></i>{{ walletStatusText }}
    </div>

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
            <span>High: <span id="highScore">{{ highScore }}</span></span>
          </div>
          <div class="stat-card">
            <i class="fas fa-star"></i>
            <span>Level: <span id="currentLevel">{{ currentLevel }}</span></span>
          </div>
          <div class="stat-card score-display">
            <i class="fas fa-bullseye"></i>
            <span>Score: <span id="score">{{ score }}</span></span>
          </div>
        </div>
      </div>

      <!-- Game Area -->
      <div class="game-area" ref="gameArea">
        <!-- Character -->
        <div class="character" id="character">
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
        <div class="bow" id="bow">
          <div class="bow-body"></div>
          <div class="bow-string" id="bowString"></div>
        </div>

        <!-- Aiming Line -->
        <div class="aiming-line" id="aimingLine"></div>

        <!-- Arrow -->
        <div class="arrow" id="arrow"></div>

        <!-- Flying Arrow -->
        <div class="flying-arrow" id="flyingArrow"></div>

        <!-- Target -->
        <div class="target" id="target">
          <div class="target-ring outer"></div>
          <div class="target-ring middle"></div>
          <div class="target-ring inner"></div>
          <div class="target-ring bullseye"></div>
          <!-- Stuck arrows will be added here dynamically -->
        </div>

        <!-- Arrow Counter -->
        <div class="arrow-counter">
          <h3><i class="fas fa-arrows-alt"></i> Arrows</h3>
          <div class="arrow-display" id="arrowDisplay"></div>
        </div>

        <!-- PPO Balance -->
        <div class="ppo-balance">
          <h3><i class="fas fa-coins"></i> PPO</h3>
          <div class="ppo-amount" id="ppoBalance">{{ ppoBalance }}</div>
        </div>

        <!-- Game Controls -->
        <div class="game-controls">
          <button class="control-btn" @click="selectCharacter">
            <i class="fas fa-user"></i> Character
          </button>
          <button class="control-btn" @click="selectBow">
            <i class="fas fa-crosshairs"></i> Bow
          </button>
          <button class="control-btn" @click="buyArrows" :disabled="ppoBalance < 10" id="buyArrowsBtn">
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
    <div class="character-selector" id="characterSelector" v-show="showCharacterSelector">
      <h2>Choose Your Character</h2>
      <div class="character-grid">
        <div class="character-option" 
             :class="{ selected: selectedCharacter === 'archer1' }"
             @click="selectedCharacter = 'archer1'">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #8B4513, #A0522D); border-radius: 50%; margin: 0 auto 10px;"></div>
          <span>Archer</span>
        </div>
        <div class="character-option" 
             :class="{ selected: selectedCharacter === 'archer2' }"
             @click="selectedCharacter = 'archer2'">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4A90E2, #357ABD); border-radius: 50%; margin: 0 auto 10px;"></div>
          <span>Ranger</span>
        </div>
        <div class="character-option" 
             :class="{ selected: selectedCharacter === 'archer3' }"
             @click="selectedCharacter = 'archer3'">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #E74C3C, #C0392B); border-radius: 50%; margin: 0 auto 10px;"></div>
          <span>Hunter</span>
        </div>
      </div>
      <button class="control-btn" @click="confirmCharacter">Confirm</button>
      <button class="control-btn" @click="closeCharacterSelector">Cancel</button>
    </div>

    <!-- Bow Selection Modal -->
    <div class="bow-selector" id="bowSelector" v-show="showBowSelector">
      <h2>Choose Your Bow</h2>
      <div class="bow-grid">
        <div class="bow-option" 
             :class="{ selected: selectedBow === 'basic' }"
             @click="selectedBow = 'basic'">
          <i class="fas fa-crosshairs"></i>
          <div>Basic Bow</div>
          <small>Standard accuracy</small>
        </div>
        <div class="bow-option" 
             :class="{ selected: selectedBow === 'premium' }"
             @click="selectedBow = 'premium'">
          <i class="fas fa-crosshairs"></i>
          <div>Premium Bow</div>
          <small>+20% accuracy</small>
        </div>
        <div class="bow-option" 
             :class="{ selected: selectedBow === 'legendary' }"
             @click="selectedBow = 'legendary'">
          <i class="fas fa-crosshairs"></i>
          <div>Legendary Bow</div>
          <small>+50% accuracy</small>
        </div>
      </div>
      <button class="control-btn" @click="confirmBow">Confirm</button>
      <button class="control-btn" @click="closeBowSelector">Cancel</button>
    </div>

    <!-- Game Over Modal -->
    <div class="game-over-modal" id="gameOverModal" v-show="showGameOverModal">
      <div class="modal-content">
        <h2><i class="fas fa-gamepad"></i> Game Over!</h2>
        <div class="final-score" id="finalScore">Score: {{ score }}</div>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useWeb3 } from '@/composables/useWeb3.js'

export default {
  name: 'ArrowGameModern',
  setup() {
    // Game state
    const gameArea = ref(null)
    const isLandscape = ref(true)
    const score = ref(0)
    const highScore = ref(0)
    const gameStarted = ref(false)
    const gamePaused = ref(false)

    // UI state
    const showCharacterSelector = ref(false)
    const showBowSelector = ref(false)
    const showGameOverModal = ref(false)

    // Computed properties
    const walletStatusClass = computed(() => ({
      'wallet-status': true,
      'connected': isWalletConnected.value,
      'disconnected': !isWalletConnected.value
    }))

    const walletStatusText = computed(() => 
      isWalletConnected.value ? 'Wallet Connected' : 'Wallet Disconnected'
    )

    // Simplified initialization
    const initGame = () => {
      try {
        // Initializing game...
        updateUI()
        setupEventListeners()
        // Game initialized successfully
      } catch (error) {
        console.error('Error initializing game:', error)
      }
    }

    // Setup Event Listeners
    const setupEventListeners = () => {
      if (gameArea.value) {
        // Setting up event listeners for game area
        gameArea.value.addEventListener('mousedown', startAim)
        gameArea.value.addEventListener('mousemove', aim)
        gameArea.value.addEventListener('mouseup', shoot)
        
        // Touch events for mobile
        gameArea.value.addEventListener('touchstart', handleTouchStart)
        gameArea.value.addEventListener('touchmove', handleTouchMove)
        gameArea.value.addEventListener('touchend', handleTouchEnd)
        
        console.log('Event listeners set up successfully')
      } else {
        console.error('Game area ref not found')
      }
    }

    // Touch event handlers
    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      startAim({ clientX: touch.clientX, clientY: touch.clientY })
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (gameState.isAiming) {
        const touch = e.touches[0]
        aim({ clientX: touch.clientX, clientY: touch.clientY })
      }
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      shoot()
    }

    // Game methods
    const selectCharacter = () => {
      showCharacterSelector.value = true
    }

    const confirmCharacter = () => {
      updateCharacter()
      showCharacterSelector.value = false
    }

    const closeCharacterSelector = () => {
      showCharacterSelector.value = false
    }

    const selectBow = () => {
      showBowSelector.value = true
    }

    const confirmBow = () => {
      updateBow()
      showBowSelector.value = false
    }

    const closeBowSelector = () => {
      showBowSelector.value = false
    }

    const updateCharacter = () => {
      const character = document.getElementById('character')
      if (!character) return

      const colors = {
        'archer1': { body: '#8B4513', head: '#FFE4C4', legs: '#8B4513' },
        'archer2': { body: '#4A90E2', head: '#FFE4C4', legs: '#4A90E2' },
        'archer3': { body: '#E74C3C', head: '#FFE4C4', legs: '#E74C3C' }
      }
      
      const color = colors[gameState.selectedCharacter]
      character.querySelector('.character-body').style.background = `linear-gradient(135deg, ${color.body}, ${color.body}dd)`
      character.querySelector('.character-head').style.background = color.head
      
      const legs = character.querySelectorAll('.character-leg')
      legs.forEach(leg => {
        leg.style.background = `linear-gradient(135deg, ${color.legs}, ${color.legs}dd)`
      })
    }

    const updateBow = () => {
      const bow = document.getElementById('bow')
      if (!bow) return

      const colors = {
        'basic': '#8B4513',
        'premium': '#FFD700',
        'legendary': '#FF4500'
      }
      
      bow.querySelector('.bow-body').style.background = `linear-gradient(135deg, ${colors[gameState.selectedBow]}, ${colors[gameState.selectedBow]}dd)`
    }

    const buyArrows = async () => {
      if (!isWalletConnected.value) {
        showNotification('Please connect your wallet first!', 'error')
        return
      }

      if (gameState.ppoBalance >= 10) {
        try {
          await updateBalance(10, 'subtract')
          gameState.ppoBalance -= 10
          gameState.arrowsLeft = 5
          gameState.isGameActive = true
          showGameOverModal.value = false
          updateUI()
          showNotification('5 arrows purchased for 10 PPO!', 'success')
        } catch (error) {
          showNotification('Failed to purchase arrows', 'error')
        }
      } else {
        showNotification('Not enough PPO! Complete daily tasks to earn more!', 'error')
      }
    }

    const restartGame = () => {
      gameState.score = 0
      gameState.hitCount = 0
      gameState.currentLevel = 1
      gameState.arrowsLeft = 5
      gameState.isGameActive = true
      clearStuckArrows()
      updateUI()
      showGameOverModal.value = false
    }

    const showNotification = (message, type) => {
      const notification = document.createElement('div')
      const colors = {
        'success': '#00ff88',
        'error': '#ff6b6b',
        'info': '#4a90e2'
      }
      
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      `
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.remove()
      }, 3000)
    }

    // Game logic methods
    const startAim = (e) => {
      if (!gameState.isGameActive || gameState.arrowsLeft <= 0) return
      
      gameState.isAiming = true
      gameState.aimStartX = e.clientX
      gameState.aimStartY = e.clientY
      
      // Show aiming elements
      const arrow = document.getElementById('arrow')
      const aimingLine = document.getElementById('aimingLine')
      const bow = document.getElementById('bow')
      
      if (arrow) arrow.style.display = 'block'
      if (aimingLine) aimingLine.style.display = 'block'
      if (bow) bow.classList.add('drawing')
    }

    const aim = (e) => {
      if (!gameState.isAiming) return
      
      const deltaX = e.clientX - gameState.aimStartX
      const deltaY = e.clientY - gameState.aimStartY
      const angle = Math.atan2(deltaY, deltaX)
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10, 50)
      
      // Update arrow position and rotation
      const arrow = document.getElementById('arrow')
      if (arrow) {
        arrow.style.transform = `rotate(${angle}rad) translateX(${distance}px)`
      }
      
      // Update aiming line
      const aimingLine = document.getElementById('aimingLine')
      if (aimingLine) {
        aimingLine.style.transform = `rotate(${angle}rad)`
      }
      
      // Update bow string
      const bowString = document.getElementById('bowString')
      if (bowString) {
        const drawIntensity = Math.min(distance / 30, 1.5)
        bowString.style.transform = `rotate(${angle}rad) scaleY(${1 + drawIntensity})`
      }
    }

    const shoot = () => {
      if (!gameState.isAiming || !gameState.isGameActive || gameState.arrowsLeft <= 0) return
      
      gameState.isAiming = false
      gameState.arrowsLeft--
      
      // Hide aiming elements
      const arrow = document.getElementById('arrow')
      const aimingLine = document.getElementById('aimingLine')
      const bow = document.getElementById('bow')
      const bowString = document.getElementById('bowString')
      
      if (arrow) arrow.style.display = 'none'
      if (aimingLine) aimingLine.style.display = 'none'
      if (bow) bow.classList.remove('drawing')
      if (bowString) bowString.style.transform = 'rotate(0rad) scaleY(1)'
      
      // Simple hit calculation
      const accuracy = Math.random() * 100
      let hitChance = 30 // Base 30% chance
      if (gameState.selectedBow === 'premium') hitChance = 50
      if (gameState.selectedBow === 'legendary') hitChance = 80
      
      if (accuracy <= hitChance) {
        gameState.hitCount++
        gameState.score += Math.floor(gameState.currentLevel * 10)
        
        // Level up every 5 hits
        if (gameState.hitCount % 5 === 0) {
          gameState.currentLevel++
          showNotification(`Level Up! Now Level ${gameState.currentLevel}`, 'success')
          
          // Reward PPO for leveling up
          const levelReward = Math.floor(gameState.currentLevel * 2)
          gameState.ppoBalance += levelReward
          showNotification(`Level Up Reward: +${levelReward} PPO!`, 'success')
        }
        
        setTimeout(() => {
          showHitEffect('BULLSEYE!', '#ffd700')
        }, 1000)
      } else {
        setTimeout(() => {
          showHitEffect('MISS!', '#ff6b6b')
        }, 1000)
      }
      
      updateUI()
      
      // Check if game over
      if (gameState.arrowsLeft <= 0) {
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
      gameState.isGameActive = false
      showGameOverModal.value = true
      
      // Update high score
      if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score
        localStorage.setItem('highScore', gameState.highScore)
        showNotification('New High Score!', 'success')
      }
    }

    const clearStuckArrows = () => {
      gameState.stuckArrows.forEach(arrow => {
        if (arrow.parentNode) {
          arrow.parentNode.removeChild(arrow)
        }
      })
      gameState.stuckArrows = []
    }

    const updateUI = () => {
      // Update arrow display
      const arrowDisplay = document.getElementById('arrowDisplay')
      if (arrowDisplay) {
        arrowDisplay.innerHTML = ''
        
        for (let i = 0; i < 5; i++) {
          const arrowIcon = document.createElement('i')
          arrowIcon.className = `fas fa-arrow-right arrow-icon ${i >= gameState.arrowsLeft ? 'used' : ''}`
          arrowDisplay.appendChild(arrowIcon)
        }
      }
      
      // Update buy button state
      const buyBtn = document.getElementById('buyArrowsBtn')
      if (buyBtn) {
        buyBtn.disabled = gameState.ppoBalance < 10
      }
    }

    onMounted(() => {
      try {
        console.log('Component mounted, initializing game...')
        
        // Wait for DOM to be fully rendered
        nextTick(() => {
          console.log('DOM updated, checking game area ref:', !!gameArea.value)
          
          // Debug: Check if elements exist
          setTimeout(() => {
            const character = document.getElementById('character')
            const bow = document.getElementById('bow')
            const target = document.getElementById('target')
            
            console.log('Debug - Elements found:', {
              character: !!character,
              bow: !!bow,
              target: !!target,
              gameAreaRef: !!gameArea.value
            })
            
            if (character) console.log('Character element:', character)
            if (bow) console.log('Bow element:', bow)
            if (target) console.log('Target element:', target)
            if (gameArea.value) console.log('Game area ref:', gameArea.value)
            
            // Initialize game after elements are confirmed to exist
            initGame()
            updateUI()
          }, 100)
        })
        
        // Update PPO balance from task system
        gameState.ppoBalance = userBalance.value
      } catch (error) {
        console.warn('Game initialization error:', error)
      }
    })

    onUnmounted(() => {
      try {
        if (gameArea.value) {
          gameArea.value.removeEventListener('mousedown', startAim)
          gameArea.value.removeEventListener('mousemove', aim)
          gameArea.value.removeEventListener('mouseup', shoot)
          gameArea.value.removeEventListener('touchstart', handleTouchStart)
          gameArea.value.removeEventListener('touchmove', handleTouchMove)
          gameArea.value.removeEventListener('touchend', handleTouchEnd)
        }
      } catch (error) {
        console.warn('Game cleanup error:', error)
      }
    })

    return {
      // Refs
      gameArea,
      
      // Game state
      score: computed(() => gameState.score),
      highScore: computed(() => gameState.highScore),
      arrowsLeft: computed(() => gameState.arrowsLeft),
      ppoBalance: computed(() => gameState.ppoBalance),
      currentLevel: computed(() => gameState.currentLevel),
      
      // UI state
      showCharacterSelector,
      showBowSelector,
      showGameOverModal,
      
      // Data
      selectedCharacter: computed(() => gameState.selectedCharacter),
      selectedBow: computed(() => gameState.selectedBow),
      
      // Computed
      walletStatusClass,
      walletStatusText,
      
      // Methods
      selectCharacter,
      confirmCharacter,
      closeCharacterSelector,
      selectBow,
      confirmBow,
      closeBowSelector,
      buyArrows,
      restartGame
    }
  }
}
</script>

<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.arrow-game-modern {
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

/* Wallet Connection Status */
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

/* Modern Header */
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

/* Game Area */
.game-area {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
  min-height: 400px;
  width: 100%;
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

/* Target Glow Effect */
.target.glow {
  animation: targetGlow 2s infinite;
}

@keyframes targetGlow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)); }
}

/* Stuck Arrows */
.stuck-arrow {
  position: absolute;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #8B4513, #A0522D);
  z-index: 6;
  transform-origin: left center;
}

.stuck-arrow::before {
  content: '';
  position: absolute;
  right: -8px;
  top: -2px;
  width: 0;
  height: 0;
  border-left: 8px solid #A0522D;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.stuck-arrow::after {
  content: '';
  position: absolute;
  left: -2px;
  top: -1px;
  width: 4px;
  height: 5px;
  background: #654321;
  border-radius: 1px;
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

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slideIn {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.score-display {
  animation: pulse 2s infinite;
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
</style>
