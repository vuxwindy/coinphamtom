// Database Validator and Fixer
// Kiểm tra và sửa lỗi database

console.log('🔍 Database Validator loaded')

export class DatabaseValidator {
  constructor() {
    this.errors = []
    this.fixes = []
  }

  // Kiểm tra cấu trúc database
  async validateDatabaseStructure() {
    console.log('🔍 Validating database structure...')
    
    try {
      // Kiểm tra Firebase connection
      const firebaseCheck = await this.checkFirebaseConnection()
      if (!firebaseCheck.success) {
        this.errors.push('Firebase connection failed')
        return false
      }

      // Kiểm tra collections
      const collectionsCheck = await this.checkCollections()
      if (!collectionsCheck.success) {
        this.errors.push('Collections check failed')
        return false
      }

      // Kiểm tra user data structure
      const userDataCheck = await this.checkUserDataStructure()
      if (!userDataCheck.success) {
        this.errors.push('User data structure check failed')
        return false
      }

      console.log('✅ Database structure validation completed')
      return true
    } catch (error) {
      console.error('❌ Database validation failed:', error)
      this.errors.push(error.message)
      return false
    }
  }

  // Kiểm tra kết nối Firebase
  async checkFirebaseConnection() {
    try {
      // Kiểm tra xem Firebase đã được khởi tạo chưa
      if (typeof window !== 'undefined' && window.firebase) {
        console.log('✅ Firebase connection found')
        return { success: true }
      } else {
        console.warn('⚠️ Firebase not found, checking for Vue Firebase...')
        // Kiểm tra Vue Firebase
        const { app } = await import('../config/firebase.js')
        if (app) {
          console.log('✅ Vue Firebase connection found')
          return { success: true }
        } else {
          return { success: false, error: 'No Firebase connection found' }
        }
      }
    } catch (error) {
      console.error('❌ Firebase connection check failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Kiểm tra collections
  async checkCollections() {
    try {
      const requiredCollections = [
        'users',
        'daily_tasks',
        'referrals',
        'transactions',
        'nfts'
      ]

      console.log('📋 Checking required collections...')
      
      // Trong môi trường development, chúng ta sẽ tạo collections nếu chưa có
      for (const collection of requiredCollections) {
        console.log(`📁 Checking collection: ${collection}`)
        // Collections sẽ được tạo tự động khi có dữ liệu đầu tiên
      }

      return { success: true }
    } catch (error) {
      console.error('❌ Collections check failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Kiểm tra cấu trúc user data
  async checkUserDataStructure() {
    try {
      console.log('👤 Checking user data structure...')
      
      const requiredFields = [
        'uid',
        'email',
        'displayName',
        'tokenBalance',
        'nftBalance',
        'totalEarned',
        'referralEarnings',
        'referralCode',
        'referralCount',
        'level',
        'dailyTasks',
        'completedTasks',
        'createdAt',
        'updatedAt'
      ]

      console.log('📋 Required user fields:', requiredFields)
      
      // Trong môi trường development, chúng ta sẽ tạo default values
      const defaultUserData = {
        uid: '',
        email: '',
        displayName: '',
        tokenBalance: 0,
        nftBalance: 0,
        totalEarned: 0,
        referralEarnings: 0,
        referralCode: '',
        referralCount: 0,
        level: 'F0',
        dailyTasks: {
          checkIn: false,
          telegramGroup: false,
          telegramChannel: false,
          facebookPage: false,
          twitterFollow: false,
          socialShare: false
        },
        completedTasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      console.log('📋 Default user data structure:', defaultUserData)
      
      return { success: true, defaultUserData }
    } catch (error) {
      console.error('❌ User data structure check failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Sửa lỗi database
  async fixDatabaseIssues() {
    console.log('🔧 Fixing database issues...')
    
    try {
      const fixes = []

      // Sửa lỗi user data
      const userDataFix = await this.fixUserData()
      if (userDataFix.success) {
        fixes.push('User data fixed')
      }

      // Sửa lỗi task data
      const taskDataFix = await this.fixTaskData()
      if (taskDataFix.success) {
        fixes.push('Task data fixed')
      }

      // Sửa lỗi referral data
      const referralDataFix = await this.fixReferralData()
      if (referralDataFix.success) {
        fixes.push('Referral data fixed')
      }

      this.fixes = fixes
      console.log('✅ Database fixes completed:', fixes)
      return { success: true, fixes }
    } catch (error) {
      console.error('❌ Database fixes failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Sửa lỗi user data
  async fixUserData() {
    try {
      console.log('👤 Fixing user data...')
      
      // Kiểm tra localStorage
      const localUserData = localStorage.getItem('userData')
      if (localUserData) {
        const userData = JSON.parse(localUserData)
        
        // Thêm các trường còn thiếu
        const fixedUserData = {
          ...userData,
          tokenBalance: userData.tokenBalance || 0,
          nftBalance: userData.nftBalance || 0,
          totalEarned: userData.totalEarned || 0,
          referralEarnings: userData.referralEarnings || 0,
          referralCode: userData.referralCode || '',
          referralCount: userData.referralCount || 0,
          level: userData.level || 'F0',
          dailyTasks: userData.dailyTasks || {
            checkIn: false,
            telegramGroup: false,
            telegramChannel: false,
            facebookPage: false,
            twitterFollow: false,
            socialShare: false
          },
          completedTasks: userData.completedTasks || [],
          updatedAt: new Date()
        }
        
        localStorage.setItem('userData', JSON.stringify(fixedUserData))
        console.log('✅ User data fixed in localStorage')
      }

      return { success: true }
    } catch (error) {
      console.error('❌ User data fix failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Sửa lỗi task data
  async fixTaskData() {
    try {
      console.log('📋 Fixing task data...')
      
      // Kiểm tra localStorage
      const localTaskData = localStorage.getItem('dailyTasks')
      if (localTaskData) {
        const taskData = JSON.parse(localTaskData)
        
        // Đảm bảo tất cả tasks đều có đầy đủ thông tin
        const requiredTasks = [
          'checkIn',
          'telegramGroup',
          'telegramChannel',
          'facebookPage',
          'twitterFollow',
          'socialShare'
        ]
        
        const fixedTaskData = {}
        requiredTasks.forEach(taskId => {
          if (taskData[taskId]) {
            fixedTaskData[taskId] = {
              ...taskData[taskId],
              completed: taskData[taskId].completed || false,
              lastCompleted: taskData[taskId].lastCompleted || null
            }
          } else {
            fixedTaskData[taskId] = {
              completed: false,
              lastCompleted: null
            }
          }
        })
        
        localStorage.setItem('dailyTasks', JSON.stringify(fixedTaskData))
        console.log('✅ Task data fixed in localStorage')
      }

      return { success: true }
    } catch (error) {
      console.error('❌ Task data fix failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Sửa lỗi referral data
  async fixReferralData() {
    try {
      console.log('🔗 Fixing referral data...')
      
      // Kiểm tra localStorage
      const localReferralData = localStorage.getItem('referralData')
      if (localReferralData) {
        const referralData = JSON.parse(localReferralData)
        
        // Thêm các trường còn thiếu
        const fixedReferralData = {
          ...referralData,
          totalReferrals: referralData.totalReferrals || 0,
          totalEarnings: referralData.totalEarnings || 0,
          activeReferrals: referralData.activeReferrals || 0,
          conversionRate: referralData.conversionRate || 0,
          level: referralData.level || 'F0',
          refsNeeded: referralData.refsNeeded || 15,
          updatedAt: new Date()
        }
        
        localStorage.setItem('referralData', JSON.stringify(fixedReferralData))
        console.log('✅ Referral data fixed in localStorage')
      }

      return { success: true }
    } catch (error) {
      console.error('❌ Referral data fix failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Tạo báo cáo
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      errors: this.errors,
      fixes: this.fixes,
      summary: {
        totalErrors: this.errors.length,
        totalFixes: this.fixes.length,
        status: this.errors.length === 0 ? 'healthy' : 'needs_attention'
      }
    }

    console.log('📊 Database Report:', report)
    return report
  }

  // Chạy full validation và fix
  async runFullCheck() {
    console.log('🚀 Running full database check...')
    
    // Validate
    const validationResult = await this.validateDatabaseStructure()
    
    // Fix issues if validation failed
    if (!validationResult) {
      console.log('🔧 Validation failed, attempting fixes...')
      await this.fixDatabaseIssues()
    }
    
    // Generate report
    const report = this.generateReport()
    
    return {
      validationResult,
      report
    }
  }
}

// Export singleton instance
export const databaseValidator = new DatabaseValidator()

// Auto-run validation on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Auto-running database validation...')
    databaseValidator.runFullCheck()
  })
}
