<template>
  <div class="home">
    <Header />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="floating-elements">
          <div class="floating-icon floating-icon-1">
            <i class="fas fa-gamepad"></i>
          </div>
          <div class="floating-icon floating-icon-2">
            <i class="fas fa-coins"></i>
          </div>
          <div class="floating-icon floating-icon-3">
            <i class="fab fa-ethereum"></i>
          </div>
          <div class="floating-icon floating-icon-4">
            <i class="fas fa-trophy"></i>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 col-md-12">
            <div class="hero-content">
              <div class="hero-badge">
                <i class="fas fa-rocket me-2"></i>
                <span>Play-to-Earn Gaming Platform</span>
              </div>
              <h1 class="hero-title">
                <span class="gradient-text">PixelPayot</span>
                <br>
                <span class="typewriter">Modern GameFi</span>
                <br>
                <span class="highlight-text">Experience</span>
              </h1>
              <p class="hero-description">
                Dive into the ultimate play-to-earn gaming ecosystem where every shot counts, 
                every victory rewards you, and every moment brings you closer to legendary status.
              </p>
              
              <div class="hero-stats">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="stat-content">
                    <h4>10K+</h4>
                    <span>Active Players</span>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-coins"></i>
                  </div>
                  <div class="stat-content">
                    <h4>$1.5M</h4>
                    <span>Total Rewards</span>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-bullseye"></i>
                  </div>
                  <div class="stat-content">
                    <h4>95%</h4>
                    <span>Success Rate</span>
                  </div>
                </div>
              </div>
              
                                     <div class="hero-actions">
                         <router-link to="/arrow-game" class="btn btn-hero-primary">
                           <i class="fas fa-crosshairs me-2"></i>
                           Play Archery
                         </router-link>
                         <router-link to="/arrow-game-modern" class="btn btn-hero-secondary">
                           <i class="fas fa-gamepad me-2"></i>
                           Modern Archery
                         </router-link>
                       </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="hero-visual">
              <div class="hero-image-container">
                <img src="../assets/images/planet-arrow.png" alt="PixelPayot Gaming" class="hero-image">
                <div class="floating-cards">
                  <div class="game-card card-1">
                    <i class="fas fa-trophy"></i>
                    <span>Win Rewards</span>
                  </div>
                  <div class="game-card card-2">
                    <i class="fas fa-chart-line"></i>
                    <span>Earn PPO</span>
                  </div>
                  <div class="game-card card-3">
                    <i class="fas fa-users"></i>
                    <span>Join Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Daily Tasks Section -->
    <section id="daily-tasks" class="daily-tasks-section">
      <div class="container">
        <div class="section-header text-center mb-5">
          <div class="section-badge">
            <i class="fas fa-tasks me-2"></i>
            <span>Daily Missions</span>
          </div>
          <h2 class="section-title">Complete Tasks & Earn Rewards</h2>
          <p class="section-description">
            Join thousands of players earning $PPO tokens daily through engaging missions
          </p>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-6 col-md-12">
            <div class="tasks-card">
              <div class="card-header">
                <div class="header-icon">
                  <i class="fas fa-list-check"></i>
                </div>
                <div class="header-content">
                  <h3>Daily Tasks</h3>
                  <p>Complete tasks to earn $PPO tokens</p>
                </div>
                <div class="progress-indicator">
                  <span class="progress-text">1/6</span>
                </div>
              </div>
              <div class="card-body">
                <div class="task-list">
                  <!-- Daily Check-in -->
                  <div class="modern-task-item">
                    <div class="task-icon">
                      <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="task-content">
                      <h5>Daily Check-in</h5>
                      <p class="task-reward">+1 PPO</p>
                    </div>
                    <button class="btn btn-task completed" disabled>
                      <i class="fas fa-check"></i>
                    </button>
                  </div>

                  <!-- Telegram Group -->
                  <div class="modern-task-item">
                    <div class="task-icon">
                      <i class="fab fa-telegram"></i>
                    </div>
                    <div class="task-content">
                      <h5>Join Telegram Group</h5>
                      <p class="task-reward">+2 PPO</p>
                    </div>
                    <button class="btn btn-task" data-task="telegramGroup">
                      <i class="fas fa-users"></i>
                    </button>
                  </div>

                  <!-- Telegram Channel -->
                  <div class="modern-task-item">
                    <div class="task-icon">
                      <i class="fab fa-telegram"></i>
                    </div>
                    <div class="task-content">
                      <h5>Subscribe Channel</h5>
                      <p class="task-reward">+2 PPO</p>
                    </div>
                    <button class="btn btn-task" data-task="telegramChannel">
                      <i class="fas fa-bell"></i>
                    </button>
                  </div>

                  <!-- Facebook Page -->
                  <div class="modern-task-item">
                    <div class="task-icon">
                      <i class="fab fa-facebook"></i>
                    </div>
                    <div class="task-content">
                      <h5>Like Facebook Page</h5>
                      <p class="task-reward">+2 PPO</p>
                    </div>
                    <button class="btn btn-task" data-task="facebookPage">
                      <i class="fas fa-thumbs-up"></i>
                    </button>
                  </div>

                  <!-- Twitter Follow -->
                  <div class="modern-task-item">
                    <div class="task-icon">
                      <i class="fab fa-x-twitter"></i>
                    </div>
                    <div class="task-content">
                      <h5>Follow on X</h5>
                      <p class="task-reward">+2 PPO</p>
                    </div>
                    <button class="btn btn-task" data-task="twitterFollow">
                      <i class="fas fa-user-plus"></i>
                    </button>
                  </div>

                  <!-- Social Share -->
                  <div class="modern-task-item special">
                    <div class="task-icon">
                      <i class="fas fa-share-alt"></i>
                    </div>
                    <div class="task-content">
                      <h5>Share & Earn</h5>
                      <p class="task-reward">+3 PPO</p>
                      <small class="task-note">Share about PixelPayot</small>
                    </div>
                    <button class="btn btn-task" data-task="socialShare">
                      <i class="fas fa-share"></i>
                    </button>
                  </div>
                </div>
                
                <div class="claim-section">
                  <div class="rewards-summary">
                    <div class="rewards-icon">
                      <i class="fas fa-gift"></i>
                    </div>
                    <div class="rewards-content">
                      <h4>Available Rewards</h4>
                      <span class="rewards-amount">0 PPO</span>
                    </div>
                    <button class="btn btn-claim-rewards" disabled>
                      <i class="fas fa-download"></i>
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="stats-card">
              <div class="card-header">
                <div class="header-icon">
                  <i class="fas fa-chart-line"></i>
              </div>
                <div class="header-content">
                  <h3>Your Statistics</h3>
                  <p>Track your progress and earnings</p>
                </div>
                <div class="level-badge">
                  <span class="level-text">Level F0</span>
                </div>
              </div>
              
              <div class="card-body">
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-icon wallet">
                      <i class="fas fa-wallet"></i>
                  </div>
                    <div class="stat-content">
                      <span class="stat-value">0</span>
                      <span class="stat-label">PPO Balance</span>
                  </div>
                  </div>
                  
                  <div class="stat-item">
                    <div class="stat-icon nft">
                      <i class="fas fa-images"></i>
                  </div>
                    <div class="stat-content">
                      <span class="stat-value">0</span>
                      <span class="stat-label">NFTs Owned</span>
                </div>
                  </div>
                  
                  <div class="stat-item">
                    <div class="stat-icon earnings">
                      <i class="fas fa-star"></i>
                      </div>
                    <div class="stat-content">
                      <span class="stat-value">0</span>
                      <span class="stat-label">Total Earned</span>
                      </div>
                    </div>
                  
                  <div class="stat-item">
                    <div class="stat-icon referral">
                      <i class="fas fa-users"></i>
                  </div>
                    <div class="stat-content">
                      <span class="stat-value">0</span>
                      <span class="stat-label">Referrals</span>
                </div>
              </div>
            </div>
                
                <div class="referral-section">
                  <div class="referral-header">
                    <div class="referral-icon">
                      <i class="fas fa-user-friends"></i>
                    </div>
                    <div class="referral-content">
                      <h4>Invite Friends</h4>
                      <p>Earn 5 PPO for each referral</p>
                    </div>
                  </div>
                  
                  <div class="referral-link">
                    <input type="text" class="form-control" id="referralLink" readonly placeholder="Your referral link will appear here">
                    <button class="btn btn-copy">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  
                  <div class="referral-progress">
                    <div class="progress-info">
                      <span class="current-refs">0 Referrals</span>
                      <span class="next-level">15 needed for Level F1</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 0%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

                 <!-- Games Section -->
             <section class="games-section">
      <div class="container">
                 <div class="section-header text-center mb-5">
                   <div class="section-badge">
                     <i class="fas fa-gamepad me-2"></i>
                     <span>Play & Earn Games</span>
              </div>
                   <h2 class="section-title">Choose Your Adventure</h2>
                   <p class="section-description">
                     Play exciting games and earn PPO tokens while having fun
                   </p>
                </div>
                 
                 <div class="games-grid">
                   <div class="game-card">
                     <div class="game-icon">
                       <i class="fas fa-crosshairs"></i>
              </div>
                     <div class="game-content">
                       <h3>PPO Archery</h3>
                       <p>Test your aim and precision in this classic archery game. Hit targets to earn PPO tokens!</p>
                       <div class="game-features">
                         <span class="feature">🎯 Precision Aiming</span>
                         <span class="feature">💰 Earn PPO Tokens</span>
                         <span class="feature">🏆 Leaderboards</span>
                       </div>
                       <router-link to="/arrow-game" class="btn btn-game">
                         <i class="fas fa-play me-2"></i>
                         Play Now
                </router-link>
                     </div>
                     <div class="game-glow"></div>
                   </div>
                   
                   <div class="game-card">
                     <div class="game-icon">
                       <i class="fas fa-gamepad"></i>
                     </div>
                     <div class="game-content">
                       <h3>Modern Archery</h3>
                       <p>Experience the next generation of archery with enhanced graphics and gameplay mechanics.</p>
                       <div class="game-features">
                         <span class="feature">🎨 Modern Graphics</span>
                         <span class="feature">⚡ Enhanced Gameplay</span>
                         <span class="feature">🎮 Mobile Optimized</span>
                       </div>
                       <router-link to="/arrow-game-modern" class="btn btn-game">
                         <i class="fas fa-play me-2"></i>
                         Play Now
                </router-link>
              </div>
                     <div class="game-glow"></div>
                </div>
                </div>
                </div>
             </section>

             <!-- Features Section -->
             <section class="features-section">
               <div class="container">
                 <div class="section-header text-center mb-5">
                   <div class="section-badge">
                     <i class="fas fa-star me-2"></i>
                     <span>Platform Features</span>
              </div>
                   <h2 class="section-title">Experience Next-Gen Gaming</h2>
                   <p class="section-description">
                     Discover powerful features that make PixelPayot the ultimate GameFi destination
                   </p>
            </div>
                 
                 <div class="features-grid">
                   <div class="feature-card">
                     <div class="feature-icon">
                       <i class="fas fa-bolt"></i>
          </div>
                     <div class="feature-content">
                       <h3>Lightning Fast</h3>
                       <p>Experience instant transactions with our optimized blockchain integration</p>
                       <div class="feature-stats">
                         <span class="stat">0.1s</span>
                         <span class="stat-label">Transaction Time</span>
            </div>
          </div>
                     <div class="feature-glow"></div>
                   </div>
                   
                   <div class="feature-card">
                     <div class="feature-icon">
                       <i class="fas fa-shield-alt"></i>
                     </div>
                     <div class="feature-content">
                       <h3>Secure & Safe</h3>
                       <p>Bank-grade security with multi-signature wallet protection</p>
                       <div class="feature-stats">
                         <span class="stat">99.9%</span>
                         <span class="stat-label">Uptime</span>
                       </div>
                     </div>
                     <div class="feature-glow"></div>
                   </div>
                   
                   <div class="feature-card">
                     <div class="feature-icon">
                       <i class="fas fa-users"></i>
                     </div>
                     <div class="feature-content">
                       <h3>Community Driven</h3>
                       <p>Join a thriving community of gamers and earn together</p>
                       <div class="feature-stats">
                         <span class="stat">24/7</span>
                         <span class="stat-label">Support</span>
                       </div>
                     </div>
                     <div class="feature-glow"></div>
                   </div>
        </div>
      </div>
    </section>

    <!-- Association Section -->
    <section id="association-with" class="padding-large pt-5 pattern-blur">
      <div class="pattern-overlay left-side-pattern">
        <img src="../assets/images/pattern-blur-left.png">
      </div>
      <div class="container">
        <div class="row justify-content-between">
          <img src="../assets/images/association-brand1.png" alt="brand" class="col-md-2 img-fluid">
          <img src="../assets/images/association-brand2.png" alt="brand" class="col-md-2 img-fluid">
          <img src="../assets/images/association-brand3.png" alt="brand" class="col-md-2 img-fluid">
          <img src="../assets/images/association-brand4.png" alt="brand" class="col-md-2 img-fluid">
          <img src="../assets/images/association-brand5.png" alt="brand" class="col-md-2 img-fluid">
        </div>
      </div>
    </section>

    <!-- Product Card Section -->
    <!-- <section id="product-card" class="">
      <div class="container">
        <div class="row">
          <div class="section-header text-center">
            <h2 class="section-title light">Legendary Bow Parts</h2>
            <p class="text-white-50 mt-3">Collect and combine mystical bow parts to forge your perfect weapon</p>
          </div>
          <div class="rarities-guide d-flex justify-content-center mb-4">
            <div class="rarity-item mx-3">
              <span class="badge bg-secondary">Basic</span>
              <small class="ms-1">1-3★</small>
            </div>
            <div class="rarity-item mx-3">
              <span class="badge bg-primary">Premium</span>
              <small class="ms-1">4-5★</small>
            </div>
            <div class="rarity-item mx-3">
              <span class="badge bg-warning">Mega</span>
              <small class="ms-1">SSS</small>
            </div>
          </div>
          <div class="swiper product-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="nft in nftItems" :key="nft.id">
                <div class="product-item">
                  <div class="image-holder">
                    <img :src="nft.image" :alt="nft.title" class="rounded-shape">
                  </div>
                  <div class="product-detail bg-light">
                    <div class="card-header d-flex flex-wrap justify-content-between">
                      <h3 class="card-title">{{ nft.title }}</h3>
                      <span class="rarity-badge badge" :class="nft.rarityClass">{{ nft.rarity }}</span>
                      <span class="rarity-badge badge currency">{{ nft.price }} PPO</span>
                    </div>
                    <div class="clients-detail">
                      <img :src="nft.creator.avatar" :alt="nft.creator.name" class="circle-shape">
                      <span class="clients-name">{{ nft.creator.name }}</span>
                    </div>
                    <div class="btn-card">
                      <a href="#" class="btn btn-linear btn-full btn-rounded btn-medium">Place a Bid</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section> -->

    <!-- Top Creators Section -->
    <!-- <section id="top-creators" class="padding-large">
      <div class="container">
        <div class="row">
          <div class="section-header align-center">
            <h2 class="section-title light">Leaderboard</h2>
            <p>Our most skilled archers who have conquered the highest targets</p>
            <div class="achievement-stats d-flex justify-content-center gap-4 mb-4">
              <div class="stat-box text-center">
                <h3>1000+</h3>
                <small>Highest Target Hit</small>
              </div>
              <div class="stat-box text-center">
                <h3>1.49M</h3>
                <small>$PPO Won</small>
              </div>
              <div class="stat-box text-center">
                <h3>1.8%</h3>
                <small>Success Rate</small>
              </div>
            </div>
            <router-link to="/leaderboard" class="btn btn-linear btn-medium mt-4">View Full Rankings</router-link>
          </div>
          <div class="product-content overflow-hidden">
            <div class="row d-flex flex-wrap">
              <div class="col-md-3 col-sm-6" v-for="creator in topCreators" :key="creator.id">
                <div class="product-item bg-blue-trans border-rounded">
                  <div class="product-detail text-center">
                    <div class="clients-detail">
                      <img :src="creator.avatar" :alt="creator.name" class="circle-shape">
                    </div>
                    <h3 class="block-title">{{ creator.name }}</h3>
                    <div class="btn-card">
                      <router-link :to="creator.link" class="btn btn-linear btn-rounded btn-medium">View Details</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Subscribe Section -->
    <!-- <section id="subscribe" class="pattern-circle">
      <div class="pattern-overlay">
        <img src="../assets/images/pattern-overlay.png" alt="pattern-overlay">
      </div>
      <div class="container">
        <div class="row d-flex flex-wrap justify-content-center">
          <div class="col-md-6">
            <div class="image-holder">
              <img src="../assets/images/single-image.jpg" alt="single image" class="banner-image">
            </div>
          </div>
          <div class="col-md-6">
            <div class="subscribe-content">
              <div class="subscribe-header">
                <h3 class="subscribe-title light">Join the Archer's Community</h3>
                <p>Stay updated with daily weather forecasts, target challenges, and exclusive Blindbox drops. Connect with fellow archers and share your legendary shots!</p>
                <div class="community-stats d-flex justify-content-between mb-4">
                  <div class="stat">
                    <i class="fas fa-users"></i>
                    <span>10K+ Archers</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-bullseye"></i>
                    <span>1M+ Shots</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-trophy"></i>
                    <span>100 Legends</span>
                  </div>
                </div>
              </div>
              <form @submit.prevent="subscribeNewsletter" class="d-flex justify-content-between bg-blue-trans rounded-3">
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="Write your email here"
                  class="btn-rounded w-100 content-dim-light align-self-center bg-transparent border-0"
                  required
                >
                <button type="submit" class="btn btn-linear btn-medium rounded-0">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- NFT Collections Section -->
    <!-- <section id="nft-collection" class="padding-large">
      <div class="container">
        <div class="row overflow-hidden">
          <div class="section-header align-center">
            <h2 class="section-title light">Unique NFT Collections</h2>
            <p>Explore outstanding NFT collections from leading artists and creators</p>
          </div>
          <div class="product-content">
            <div class="row">
              <div class="col-md-3 col-sm-6" v-for="collection in nftCollections" :key="collection.id">
                <div class="product-item bg-blue-trans border-rounded-pill">
                  <div class="product-detail text-center">
                    <div class="clients-detail">
                      <img :src="collection.image" :alt="collection.name" class="circle-shape">
                    </div>
                    <h3 class="block-title">{{ collection.name }}</h3>
                    <div class="btn-card">
                      <router-link :to="collection.link" class="view-btn">View Collection</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Blog Section -->
    <!-- <section id="blog" class="padding-large">
      <div class="container">
        <div class="row overflow-hidden">
          <div class="section-header d-md-flex justify-content-between">
            <h2 class="section-title light">Latest NFT News</h2>
            <p class="text-white-50">Stay updated with the latest trends and news in the NFT world</p>
            <div>
              <router-link to="/blog" class="btn btn-linear btn-medium">Read our blogs</router-link>
            </div>
          </div>
          <div class="product-content">
            <div class="row">
              <div class="col-md-3 col-sm-6" v-for="blog in blogPosts" :key="blog.id">
                <div class="product-item bg-blue-trans p-3 rounded-1 mb-3">
                  <div class="product-detail">
                    <div class="clients-detail">
                      <router-link :to="blog.link">
                        <img :src="blog.image" :alt="blog.title">
                      </router-link>
                    </div>
                    <div class="btn-card">
                      <router-link :to="blog.link" class="view-btn">{{ blog.category }}</router-link>
                    </div>
                    <router-link :to="blog.link">
                      <h3 class="block-title">{{ blog.title }}</h3>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const email = ref('')

// NFT Items Data
const nftItems = ref([
  {
    id: 1,
    title: 'Ancient Skeleton',
    image: '/src/assets/images/nft1.jpg',
    rarity: 'SSS',
    rarityClass: 'bg-warning',
    price: '3.29',
    creator: {
      name: 'Mutin Cap',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 2,
    title: 'Cyber Beam',
    image: '/src/assets/images/nft2.jpg',
    rarity: 'SSS',
    rarityClass: 'bg-warning',
    price: '5.40',
    creator: {
      name: 'Kelvin Glan',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 3,
    title: 'Volcanic Breath',
    image: '/src/assets/images/nft3.jpg',
    rarity: '★★★',
    rarityClass: 'bg-success',
    price: '1.22',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item3.jpg'
    }
  },
  {
    id: 4,
    title: 'Inferno Wrath',
    image: '/src/assets/images/nft4.jpg',
    rarity: '★★★★★',
    rarityClass: 'bg-success',
    price: '2.47',
    creator: {
      name: 'Kelvin Glan',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 5,
    title: 'Frost Breath',
    image: '/src/assets/images/nft5.jpg',
    rarity: 'SSS',
    rarityClass: 'bg-warning',
    price: '9.82',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item1.jpg'
    }
  },
  {
    id: 6,
    title: 'Hard Breath',
    image: '/src/assets/images/collection-item3.jpg',
    rarity: '★★',
    rarityClass: 'bg-secondary',
    price: '0.22',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item3.jpg'
    }
  }
])

// Top Creators Data
const topCreators = ref([
  {
    id: 1,
    name: 'Loura Chin',
    avatar: '/src/assets/images/clients-item-lg1.jpg',
    link: '/creators/loura-chin'
  },
  {
    id: 2,
    name: 'Kelvin Glan',
    avatar: '/src/assets/images/clients-item-lg2.jpg',
    link: '/creators/kelvin-glan'
  },
  {
    id: 3,
    name: 'Glam Lee',
    avatar: '/src/assets/images/clients-item-lg3.jpg',
    link: '/creators/glam-lee'
  },
  {
    id: 4,
    name: 'Alameda',
    avatar: '/src/assets/images/clients-item-lg4.jpg',
    link: '/creators/alameda'
  }
])

// NFT Collections Data
const nftCollections = ref([
  {
    id: 1,
    name: 'Broken Collection',
    image: '/src/assets/images/blog1.jpg',
    link: '/collection/broken'
  },
  {
    id: 2,
    name: 'Broken Collection',
    image: '/src/assets/images/blog2.jpg',
    link: '/collection/broken-2'
  },
  {
    id: 3,
    name: 'Broken Collection',
    image: '/src/assets/images/blog3.jpg',
    link: '/collection/broken-3'
  },
  {
    id: 4,
    name: 'Broken Collection',
    image: '/src/assets/images/blog4.jpg',
    link: '/collection/broken-4'
  }
])

// Blog Posts Data
const blogPosts = ref([
  {
    id: 1,
    title: 'Best NFTs arts collections from best artists',
    category: 'Art',
    image: '/src/assets/images/nft-item1.jpg',
    link: '/blog/1'
  },
  {
    id: 2,
    title: 'Best NFTs arts collections from best artists',
    category: 'Design',
    image: '/src/assets/images/nft-item2.jpg',
    link: '/blog/2'
  },
  {
    id: 3,
    title: 'Best NFTs arts collections from best artists',
    category: 'NFTs',
    image: '/src/assets/images/nft-item3.jpg',
    link: '/blog/3'
  },
  {
    id: 4,
    title: 'Best NFTs arts collections from best artists',
    category: 'Arts',
    image: '/src/assets/images/nft-item4.jpg',
    link: '/blog/4'
  }
])

const subscribeNewsletter = () => {
  if (email.value) {
    alert(`Thank you for subscribing with: ${email.value}`)
    email.value = ''
  }
}

onMounted(() => {
  // Initialize Swiper
  new Swiper('.product-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  })
})
</script>

<style scoped>
/* Import modern fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.home {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%);
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.floating-icon-1 { top: 20%; left: 10%; animation-delay: 0s; }
.floating-icon-2 { top: 60%; right: 15%; animation-delay: 1.5s; }
.floating-icon-3 { bottom: 30%; left: 20%; animation-delay: 3s; }
.floating-icon-4 { top: 40%; right: 25%; animation-delay: 4.5s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 30px;
  position: relative;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.typewriter {
  color: #ffffff;
  position: relative;
}

.typewriter::after {
  content: '|';
  animation: blink 1s infinite;
  color: #667eea;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.highlight-text {
  color: #f093fb;
  text-shadow: 0 0 30px rgba(240, 147, 251, 0.5);
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
  max-width: 600px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.hero-stats .stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.hero-stats .stat-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.hero-stats .stat-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.hero-stats .stat-content h4 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.hero-stats .stat-content span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.btn-hero-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-hero-primary:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.btn-hero-secondary {
  background: transparent;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.hero-visual {
  position: relative;
  z-index: 2;
}

.hero-image-container {
  position: relative;
  text-align: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
  animation: floatImage 3s ease-in-out infinite;
}

@keyframes floatImage {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating-cards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.game-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  font-weight: 500;
  color: white;
  animation: cardFloat 4s ease-in-out infinite;
}

.card-1 { top: 20%; right: 10%; animation-delay: 0s; }
.card-2 { top: 50%; left: 5%; animation-delay: 1s; }
.card-3 { bottom: 20%; right: 15%; animation-delay: 2s; }

@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); opacity: 0.8; }
  50% { transform: translateY(-15px); opacity: 1; }
}

/* Daily Tasks Section */
.daily-tasks-section {
  padding: 100px 0;
  background: linear-gradient(180deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 26, 58, 0.9) 100%);
  position: relative;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-radius: 50px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  font-size: 14px;
  font-weight: 500;
  color: #667eea;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  line-height: 1.2;
}

.section-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.tasks-card, .stats-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.tasks-card:hover, .stats-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.header-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.header-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.progress-indicator {
  background: rgba(102, 126, 234, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
}

.level-badge {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 20px;
  padding: 8px 16px;
}

.level-text {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.card-body {
  padding: 24px;
}

/* Modern Task Items */
.modern-task-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.modern-task-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.modern-task-item.special {
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1));
  border-color: rgba(240, 147, 251, 0.3);
}

.task-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #667eea;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.task-content {
  flex: 1;
}

.task-content h5 {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.task-reward {
  font-size: 14px;
  font-weight: 600;
  color: #4ade80;
  margin: 0;
}

.task-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  display: block;
}

.btn-task {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-task:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: scale(1.05);
}

.btn-task.completed {
  background: linear-gradient(135deg, #4ade80, #22c55e);
}

.btn-task:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Claim Section */
.claim-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.rewards-summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1));
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.rewards-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #34d399, #10b981);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.rewards-content {
  flex: 1;
}

.rewards-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.rewards-amount {
  font-size: 18px;
  font-weight: 700;
  color: #34d399;
}

.btn-claim-rewards {
  background: linear-gradient(135deg, #34d399, #10b981);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-claim-rewards:hover:not(:disabled) {
  background: linear-gradient(135deg, #10b981, #34d399);
  transform: translateY(-2px);
}

.btn-claim-rewards:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.stat-icon.wallet { background: linear-gradient(135deg, #667eea, #764ba2); }
.stat-icon.nft { background: linear-gradient(135deg, #f093fb, #f5576c); }
.stat-icon.earnings { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
.stat-icon.referral { background: linear-gradient(135deg, #34d399, #10b981); }

.stat-content {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Referral Section */
.referral-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.referral-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.referral-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #34d399, #10b981);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
}

.referral-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.referral-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.referral-link {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.referral-link .form-control {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #ffffff;
  font-size: 14px;
}

.referral-link .form-control::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.btn-copy {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-copy:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
}

.referral-progress {
  margin-top: 16px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.current-refs {
  color: #34d399;
  font-weight: 600;
}

.next-level {
  color: rgba(255, 255, 255, 0.6);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #34d399, #10b981);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* Games Section */
.games-section {
  padding: 100px 0;
  background: linear-gradient(180deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 26, 58, 0.9) 100%);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 60px;
}

.game-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover::before {
  opacity: 1;
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}

.game-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.game-content {
  position: relative;
  z-index: 2;
}

.game-content h3 {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
}

.game-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 20px;
}

.game-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.game-features .feature {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.btn-game {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 16px;
}

.btn-game:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.game-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.game-card:hover .game-glow {
  opacity: 1;
}

/* Features Section */
.features-section {
  padding: 100px 0;
  background: linear-gradient(180deg, rgba(26, 26, 58, 0.9) 0%, rgba(15, 15, 35, 0.8) 100%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 60px;
}

.feature-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.feature-content {
  position: relative;
  z-index: 2;
}

.feature-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
}

.feature-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-stats {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.feature-stats .stat {
  font-size: 28px;
  font-weight: 800;
  color: #667eea;
}

.feature-stats .stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.feature-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.feature-card:hover .feature-glow {
  opacity: 1;
}

.pattern-blur {
  position: relative;
  overflow: hidden;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 60px 0;
  }
  
  .hero-section .container {
    padding: 0 15px;
  }
  
  .hero-title {
    font-size: 2.5rem;
    text-align: center;
  }
  
  .hero-description {
    font-size: 16px;
    text-align: center;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .hero-stats .stat-card {
    justify-content: center;
    text-align: center;
  }
  
  .hero-actions {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .btn-hero-primary,
  .btn-hero-secondary {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .hero-image {
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }
  
  .floating-cards {
    display: none;
  }
  
  .floating-elements {
    display: none;
  }
  
  .daily-tasks-section,
  .features-section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
    text-align: center;
  }
  
  .section-description {
    font-size: 16px;
    text-align: center;
  }
  
  .tasks-card,
  .stats-card {
    margin-bottom: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
    .games-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 40px;
  }

  .game-card {
    padding: 24px;
  }

  .game-content h3 {
    font-size: 24px;
  }

  .game-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 40px;
  }

  .feature-card {
    padding: 24px;
  }
  
  .modern-task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    text-align: center;
  }
  
  .task-content {
    order: 2;
    text-align: left;
    width: 100%;
  }
  
  .btn-task {
    order: 3;
    align-self: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
  }
  
  .rewards-summary {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .btn-claim-rewards {
    width: 100%;
  }
  
  .referral-link {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-copy {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats .stat-card {
    padding: 12px;
  }
  
  .hero-stats .stat-content h4 {
    font-size: 16px;
  }
  
  .hero-stats .stat-content span {
    font-size: 11px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .progress-indicator,
  .level-badge {
    align-self: flex-end;
  }
  
  .modern-task-item {
    padding: 12px;
  }
  
  .task-icon {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .task-content h5 {
    font-size: 14px;
  }
  
  .task-reward {
    font-size: 12px;
  }
  
  .feature-content h3 {
    font-size: 20px;
  }
  
  .feature-content p {
    font-size: 14px;
  }
  
  .feature-stats .stat {
    font-size: 24px;
  }
  
  .stat-item {
    padding: 12px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .stat-label {
    font-size: 11px;
  }
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;
}

.pattern-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container {
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.achievement-stats {
  margin: 30px 0;
}

.stat-box h3 {
  color: #cc00ff;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 5px;
}

.stat-box small {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.product-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.3);
}

.circle-shape {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 20px;
}

.block-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.view-btn {
  color: #cc00ff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.view-btn:hover {
  color: #d739ff;
}

.subscribe-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.subscribe-content p {
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 30px;
}

.community-stats {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.stat {
  text-align: center;
  color: #ffffff;
}

.stat i {
  color: #cc00ff;
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: block;
}

.banner-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

.bg-blue-trans {
  background: rgba(204, 0, 255, 0.1);
}

.border-rounded {
  border-radius: 15px;
}

.border-rounded-pill {
  border-radius: 50px;
}

/* Daily Tasks Styles */
.daily-title {
  color: #cc00ff;
  font-weight: 700;
}

.claim-reward {
  color: #ffffff;
  font-weight: 600;
}

.claim-text {
  color: #b0b0b0;
}

.task-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(204, 0, 255, 0.2);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

/* Billboard Section */
.banner-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.grey {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.weather-status {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.level-indicator {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.quick-stats {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.stat-item {
  text-align: center;
}

.stat-item h4 {
  color: #cc00ff;
  font-weight: 800;
  margin: 0;
}

.stat-item small {
  color: #b0b0b0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .banner-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .achievement-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .community-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .stat {
    margin-bottom: 15px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet Responsive Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .hero-section .container {
    max-width: 900px;
    padding: 0 30px;
  }
}

/* Desktop Responsive Styles */
@media (min-width: 1025px) {
  .hero-section .container {
    max-width: 1200px;
    padding: 0 40px;
  }
}
</style>
