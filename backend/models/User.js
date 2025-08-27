const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  photoURL: {
    type: String,
    default: ''
  },
  walletAddress: {
    type: String,
    default: ''
  },
  
  // Game specific data
  tokenBalance: {
    type: Number,
    default: 0
  },
  nftBalance: {
    type: Number,
    default: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  },
  referralEarnings: {
    type: Number,
    default: 0
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: String,
    default: null
  },
  referralCount: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    default: 'F0'
  },
  
  // Daily tasks
  dailyTasks: {
    checkIn: {
      type: Boolean,
      default: false
    },
    telegramGroup: {
      type: Boolean,
      default: false
    },
    telegramChannel: {
      type: Boolean,
      default: false
    },
    facebookPage: {
      type: Boolean,
      default: false
    },
    twitterFollow: {
      type: Boolean,
      default: false
    },
    socialShare: {
      type: Boolean,
      default: false
    }
  },
  lastCheckIn: {
    type: Date,
    default: null
  },
  
  // Game statistics
  gameStats: {
    totalGames: {
      type: Number,
      default: 0
    },
    gamesWon: {
      type: Number,
      default: 0
    },
    highestScore: {
      type: Number,
      default: 0
    },
    totalShots: {
      type: Number,
      default: 0
    },
    accurateShots: {
      type: Number,
      default: 0
    }
  },
  
  // NFT collection
  nftCollection: [{
    tokenId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rarity: {
      type: String,
      enum: ['Common', 'Rare', 'Epic', 'Legendary'],
      default: 'Common'
    },
    acquiredAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Settings
  settings: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      showProfile: {
        type: Boolean,
        default: true
      },
      showStats: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Authentication
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
})

// Generate referral code before saving
UserSchema.pre('save', async function(next) {
  if (this.isNew && !this.referralCode) {
    this.referralCode = this.generateReferralCode()
  }
  
  if (this.isModified()) {
    this.updatedAt = Date.now()
  }
  
  next()
})

// Generate referral code method
UserSchema.methods.generateReferralCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Calculate accuracy percentage
UserSchema.methods.getAccuracy = function() {
  if (this.gameStats.totalShots === 0) return 0
  return Math.round((this.gameStats.accurateShots / this.gameStats.totalShots) * 100)
}

// Calculate win rate
UserSchema.methods.getWinRate = function() {
  if (this.gameStats.totalGames === 0) return 0
  return Math.round((this.gameStats.gamesWon / this.gameStats.totalGames) * 100)
}

// Check if user can claim daily check-in
UserSchema.methods.canClaimDailyCheckIn = function() {
  if (!this.lastCheckIn) return true
  
  const now = new Date()
  const lastCheckIn = new Date(this.lastCheckIn)
  const diffTime = Math.abs(now - lastCheckIn)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays >= 1
}

// Add tokens to user balance
UserSchema.methods.addTokens = function(amount) {
  this.tokenBalance += amount
  this.totalEarned += amount
  return this.save()
}

// Remove tokens from user balance
UserSchema.methods.removeTokens = function(amount) {
  if (this.tokenBalance < amount) {
    throw new Error('Insufficient token balance')
  }
  this.tokenBalance -= amount
  return this.save()
}

// Add NFT to collection
UserSchema.methods.addNFT = function(nftData) {
  this.nftCollection.push(nftData)
  this.nftBalance = this.nftCollection.length
  return this.save()
}

// Remove NFT from collection
UserSchema.methods.removeNFT = function(tokenId) {
  this.nftCollection = this.nftCollection.filter(nft => nft.tokenId !== tokenId)
  this.nftBalance = this.nftCollection.length
  return this.save()
}

// Update game statistics
UserSchema.methods.updateGameStats = function(gameResult) {
  this.gameStats.totalGames += 1
  
  if (gameResult.won) {
    this.gameStats.gamesWon += 1
  }
  
  if (gameResult.score > this.gameStats.highestScore) {
    this.gameStats.highestScore = gameResult.score
  }
  
  this.gameStats.totalShots += gameResult.totalShots || 0
  this.gameStats.accurateShots += gameResult.accurateShots || 0
  
  return this.save()
}

// Complete daily task
UserSchema.methods.completeTask = function(taskType) {
  if (this.dailyTasks[taskType] !== undefined) {
    this.dailyTasks[taskType] = true
    return this.save()
  }
  throw new Error('Invalid task type')
}

// Reset daily tasks (called daily)
UserSchema.methods.resetDailyTasks = function() {
  Object.keys(this.dailyTasks).forEach(task => {
    this.dailyTasks[task] = false
  })
  return this.save()
}

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return this.displayName
})

// Virtual for referral link
UserSchema.virtual('referralLink').get(function() {
  return `https://pixelpayot.com/signup?ref=${this.referralCode}`
})

// Indexes
UserSchema.index({ email: 1 })
UserSchema.index({ referralCode: 1 })
UserSchema.index({ walletAddress: 1 })
UserSchema.index({ createdAt: -1 })

module.exports = mongoose.model('User', UserSchema)
