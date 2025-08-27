<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
        <div class="nav-logo">
          <div class="logo" @click="navigateTo('/')">
            <img src="../assets/images/header-icon.png" alt="PixelPayot" class="logo-img">
            <span class="logo-text">PixelPayot</span>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="nav-menu desktop-menu">
          <ul class="nav-list">
            <li class="nav-item" v-for="item in menuItems" :key="item.id">
              <template v-if="item.submenu">
                <!-- Dropdown Menu -->
                <div class="nav-dropdown" @mouseenter="openDropdown(item.id)" @mouseleave="closeDropdown(item.id)">
                  <div 
                    class="nav-link dropdown-toggle" 
                    @click="handleDropdownClick(item.id)"
                    :class="{ 'active': activeDropdown === item.id }"
                  >
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                    <i class="fas fa-chevron-down"></i>
                  </div>
                  <ul class="dropdown-menu" :class="{ 'show': activeDropdown === item.id }">
                    <li v-for="subItem in item.submenu" :key="subItem.id">
                      <div 
                        class="dropdown-item"
                        @click="handleMenuClick(subItem)"
                      >
                        <i :class="subItem.icon"></i>
                        <span>{{ subItem.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              <template v-else>
                <!-- Regular Menu Item -->
                <div 
                  class="nav-link"
                  @click="handleMenuClick(item)"
                  :class="{ 'active': $route.path === item.url }"
                >
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </li>
          </ul>
        </div>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <!-- Wallet Section -->
          <div class="wallet-section">
            <WalletStatus />
            <ReownWalletButton />
          </div>

          <!-- User Menu -->
          <div class="user-menu" v-if="currentUser">
            <div class="user-avatar" @click="toggleUserMenu">
              <img :src="currentUser.photoURL || '../assets/images/default-avatar.png'" alt="User">
              <i class="fas fa-chevron-down"></i>
            </div>
            <ul class="user-dropdown" :class="{ 'show': isUserMenuOpen }">
              <li>
                <div @click="handleMenuClick({ url: '/profile', action: 'navigate' })">
                  <i class="fas fa-user"></i>
                  <span>Profile</span>
                </div>
              </li>
              <li>
                <div @click="handleMenuClick({ url: '/dashboard', action: 'navigate' })">
                  <i class="fas fa-chart-line"></i>
                  <span>Dashboard</span>
                </div>
              </li>
              <li>
                <div @click="handleLogout">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="mobile-menu-toggle" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ 'show': isMobileMenuOpen }">
        <!-- <ul class="mobile-nav-list">
          <li class="mobile-nav-item" v-for="item in menuItems" :key="item.id">
            <template v-if="item.submenu">
              <div class="mobile-dropdown">
                <div 
                  class="mobile-nav-link" 
                  @click="handleDropdownClick(item.id)"
                  :class="{ 'active': activeDropdown === item.id }" -->
        <div class="flex flex-col p-5 h-[calc(100vh-70px)] overflow-y-auto pb-[80px]">
          <ul class="mobile-nav-list list-none m-0 p-0 flex-1">
            <li class="mobile-nav-item mb-2" v-for="item in menuItems" :key="item.id">
              <template v-if="item.submenu">
                <div class="mobile-dropdown">
                  <a 
                    class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-white/5 border border-white/10 transition-all text-base hover:bg-pink-100/20 hover:text-pink-600"
                    href="#" 
                    @click.prevent="handleDropdownClick(item.id)"
                    :class="{ 'active': activeDropdown === item.id }"
                  >
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                    <i class="fas fa-chevron-down"></i>
                  </a>
                  <ul class="mobile-dropdown-menu" :class="{ 'show': activeDropdown === item.id }">
                    <li v-for="subItem in item.submenu" :key="subItem.id">
                      <router-link 
                        :to="subItem.url" 
                        class="mobile-dropdown-item flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-pink-100/20 hover:text-pink-600"
                        @click="handleMenuClick(subItem)"
                      >
                        <i :class="subItem.icon"></i>
                        <span>{{ subItem.name }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </template>
              <template v-else>
                <router-link 
                  :to="item.url" 
                  class="mobile-nav-link flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium bg-white/5 border border-white/10 transition-all text-base hover:bg-pink-100/20 hover:text-pink-600"
                  @click="handleMenuClick(item)"
                  :class="{ 'active': $route.path === item.url }"
                >
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <ul class="mobile-dropdown-menu" :class="{ 'show': activeDropdown === item.id }">
                  <li v-for="subItem in item.submenu" :key="subItem.id">
                    <div 
                      class="mobile-dropdown-item"
                      @click="handleMenuClick(subItem)"
                    >
                      <i :class="subItem.icon"></i>
                      <span>{{ subItem.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <div 
                class="mobile-nav-link"
                @click="handleMenuClick(item)"
                :class="{ 'active': $route.path === item.url }"
              >
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </li>
        </ul>

        <!-- Mobile Actions -->
        <!-- <div class="mobile-actions">
          <div class="mobile-wallet-section">
            <WalletStatus />
            <ReownWalletButton /> -->
          <!-- Mobile Actions -->
          <div class="mobile-actions mt-6">
            <div class="mobile-wallet-section mb-4">
              <WalletStatus />
              <ReownWalletButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWeb3 } from '../composables/useWeb3.js'
import { useFirebase } from '../composables/useFirebase.js'
import ThirdWebConnect from './ThirdWebConnect.vue'
import WalletStatus from './WalletStatus.vue'
import ReownWalletButton from './ReownWalletButton.vue'

const router = useRouter()

// State management
const isMobileMenuOpen = ref(false)
const activeDropdown = ref(null)
const isUserMenuOpen = ref(false)

// Use Web3 composable
const {
  isWeb3Ready,
  isWalletConnected,
  walletAddress,
  connectWallet,
  disconnectWallet
} = useWeb3()

const {
  currentUser,
  signOut
} = useFirebase()

// Menu items configuration
const menuItems = ref([
  {
    id: 'game',
    name: 'Game',
    url: '/game',
    icon: 'fas fa-gamepad'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    url: '/marketplace',
    icon: 'fas fa-store'
  },
  {
    id: 'collection',
    name: 'Collection',
    url: '/collection',
    icon: 'fas fa-images'
  },
  {
    id: 'investment',
    name: 'Investment',
    url: '/investment',
    icon: 'fas fa-chart-pie'
  },
  {
    id: 'profile',
    name: 'Profile',
    url: '/profile',
    icon: 'fas fa-user',
    submenu: [
      {
        id: 'my-profile',
        name: 'My Profile',
        url: '/profile',
        icon: 'fas fa-user-circle'
      },
      {
        id: 'dashboard',
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fas fa-chart-line'
      },
      {
        id: 'tasks',
        name: 'Daily Tasks',
        url: '/tasks',
        icon: 'fas fa-tasks'
      },
      {
        id: 'wallet-test',
        name: 'Wallet Test',
        url: '/wallet-test',
        icon: 'fas fa-wallet'
      },
      {
        id: 'referral',
        name: 'Referral',
        url: '/referral',
        icon: 'fas fa-users'
      }
    ]
  },
  {
    id: 'more',
    name: 'More',
    url: '#',
    icon: 'fas fa-ellipsis-h',
    submenu: [
      {
        id: 'blindbox',
        name: 'Blindbox',
        url: '/blindbox',
        icon: 'fas fa-box-open'
      },
      {
        id: 'swap',
        name: 'Swap',
        url: '/swap',
        icon: 'fas fa-exchange-alt'
      },
      {
        id: 'creators',
        name: 'Creators',
        url: '/creators',
        icon: 'fas fa-palette'
      },
      {
        id: 'whitepaper',
        name: 'Whitepaper',
        url: '/whitepaper',
        icon: 'fas fa-file-alt'
      }
    ]
  }
])

// Computed properties
const shortAddress = computed(() => {
  if (!walletAddress.value) return ''
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
})

// Methods
const navigateTo = (url) => {
  router.push(url)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const openDropdown = (dropdownId) => {
  if (window.innerWidth > 991) {
    activeDropdown.value = dropdownId
  }
}

const closeDropdown = (dropdownId) => {
  if (window.innerWidth > 991) {
    activeDropdown.value = null
  }
}

const handleDropdownClick = (dropdownId) => {
  if (window.innerWidth <= 991) {
    activeDropdown.value = activeDropdown.value === dropdownId ? null : dropdownId
  }
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleMenuClick = (item) => {
  // Close mobile menu after click
  if (window.innerWidth <= 991) {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }
  
  // Close dropdowns
  activeDropdown.value = null
  closeUserMenu()
  
  // Handle special actions
  if (item.action === 'logout') {
    handleLogout()
  } else if (item.url && item.url !== '#') {
    // Navigate using router.push for better performance
    router.push(item.url)
  }
}

const handleLogout = async () => {
  try {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      await signOut()
      disconnectWallet()
      router.push('/')
      closeUserMenu()
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Event listeners
const handleResize = () => {
  if (window.innerWidth > 991) {
    isMobileMenuOpen.value = false
    activeDropdown.value = null
    document.body.style.overflow = ''
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.user-menu')) {
    closeUserMenu()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Header Container */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
  height: 70px;
  display: flex;
  align-items: center;
}

.navbar {
  width: 100%;
  height: 100%;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-img {
  height: 35px;
  width: auto;
  margin-right: 10px;
}

.logo-text {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Desktop Menu */
.desktop-menu {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 0.9rem;
}

.nav-link:hover,
.nav-link.active {
  color: #cc00ff;
  background: rgba(204, 0, 255, 0.1);
}

.nav-link i {
  font-size: 1rem;
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  list-style: none;
  margin: 0;
  z-index: 1001;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 10px;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
}

/* Right Side Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

/* Wallet Section */
.wallet-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar i {
  color: white;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 0;
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  list-style: none;
  margin: 0;
  z-index: 1001;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.user-dropdown li a {
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 0 10px;
  font-size: 0.9rem;
}

.user-dropdown li a:hover {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
}

/* Sign In Button */
.btn-signin {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
}

.btn-signin:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Mobile Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  gap: 4px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 1002;
  position: relative;
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  display: block;
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  transform: translateX(-100%);
  transition: all 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
  visibility: hidden;
  width: 100%;
  height: calc(100vh - 70px);
  opacity: 0;
}

.mobile-menu.show {
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
}

.mobile-nav-item {
  margin-bottom: 10px;
}

.mobile-nav-link {
  color: white !important;
  text-decoration: none;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
}

.mobile-dropdown-menu {
  list-style: none;
  margin: 10px 0 0 20px;
  padding: 0;
  display: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.mobile-dropdown-menu.show {
  display: block;
}

.mobile-dropdown-item {
  color: white;
  text-decoration: none;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.mobile-dropdown-item:hover {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
}

/* Mobile Actions */
.mobile-actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-wallet-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.mobile-btn-signin {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 15px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1.1rem;
}

.mobile-btn-signin:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Responsive Design */
@media (max-width: 991px) {
  .desktop-menu {
    display: none !important;
  }

  .mobile-menu-toggle {
    display: flex !important;
  }

  .nav-actions {
    gap: 10px;
  }

  .wallet-section {
    display: none;
  }
  
  /* Ensure mobile menu is properly positioned */
  .mobile-menu {
    position: fixed !important;
    top: 70px !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: calc(100vh - 70px) !important;
    z-index: 1001 !important;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .logo-text {
    display: none;
  }

  .nav-actions {
    gap: 8px;
  }

  .mobile-menu-toggle {
    display: flex !important;
    padding: 6px;
  }

  .mobile-menu-toggle span {
    width: 22px;
    height: 2px;
  }
}

@media (max-width: 576px) {
  .nav-container {
    padding: 0 10px;
  }

  .logo-text {
    display: none;
  }

  .nav-actions {
    gap: 5px;
  }

  .mobile-menu-toggle {
    padding: 5px;
  }

  .mobile-menu-toggle span {
    width: 20px;
    height: 2px;
  }
}

/* Animation Classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
