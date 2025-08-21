<template>
  <div class="whitepaper-page">
    <Header />
    
    <!-- Whitepaper Hero Section -->
    <section class="whitepaper-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="whitepaper-header text-center">
              <h1 class="whitepaper-title">PixelPayot Whitepaper</h1>
              <p class="whitepaper-subtitle">The Future of Gaming and NFT Ecosystem</p>
              <div class="whitepaper-actions">
                <button class="btn btn-linear btn-large" @click="downloadPDF">
                  <i class="fas fa-download me-2"></i>Download PDF
                </button>
                <button class="btn btn-outline-linear btn-large" @click="shareWhitepaper">
                  <i class="fas fa-share me-2"></i>Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Table of Contents -->
    <section class="toc-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center mb-5">Table of Contents</h2>
            <div class="toc-grid">
              <div v-for="section in tableOfContents" :key="section.id" class="toc-item" @click="scrollToSection(section.id)">
                <div class="toc-icon">
                  <i :class="section.icon"></i>
                </div>
                <div class="toc-content">
                  <h4>{{ section.title }}</h4>
                  <p>{{ section.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Executive Summary -->
    <section id="executive-summary" class="content-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-chart-line me-3"></i>
                Executive Summary
              </h2>
              <div class="content-body">
                <p class="lead">
                  PixelPayot is a revolutionary gaming and NFT ecosystem that combines blockchain technology with immersive gaming experiences. Our platform enables players to earn, trade, and collect unique digital assets while participating in an engaging gaming universe.
                </p>
                <div class="key-points">
                  <div class="point-item">
                    <i class="fas fa-gamepad"></i>
                    <span>Play-to-Earn Gaming Platform</span>
                  </div>
                  <div class="point-item">
                    <i class="fas fa-coins"></i>
                    <span>PPO Token Economy</span>
                  </div>
                  <div class="point-item">
                    <i class="fas fa-store"></i>
                    <span>NFT Marketplace</span>
                  </div>
                  <div class="point-item">
                    <i class="fas fa-users"></i>
                    <span>Community-Driven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section id="vision-mission" class="content-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-eye me-3"></i>
                Our Vision
              </h2>
              <div class="content-body">
                <p>
                  To create the world's leading gaming ecosystem where players can truly own their digital assets and earn real value from their gaming activities. We envision a future where gaming is not just entertainment, but a viable career path for millions of people worldwide.
                </p>
                <div class="vision-stats">
                  <div class="stat">
                    <span class="stat-number">10M+</span>
                    <span class="stat-label">Target Users</span>
                  </div>
                  <div class="stat">
                    <span class="stat-number">$100M</span>
                    <span class="stat-label">Market Cap Goal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-bullseye me-3"></i>
                Our Mission
              </h2>
              <div class="content-body">
                <p>
                  To democratize gaming by providing accessible, fair, and rewarding gaming experiences that empower players to earn while they play. We are committed to building a sustainable ecosystem that benefits all participants.
                </p>
                <div class="mission-values">
                  <div class="value-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Security & Transparency</span>
                  </div>
                  <div class="value-item">
                    <i class="fas fa-handshake"></i>
                    <span>Fair Play</span>
                  </div>
                  <div class="value-item">
                    <i class="fas fa-heart"></i>
                    <span>Community First</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tokenomics -->
    <section id="tokenomics" class="content-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-coins me-3"></i>
                Tokenomics
              </h2>
              <div class="content-body">
                <div class="tokenomics-overview">
                  <div class="token-info">
                    <h3>PPO Token</h3>
                    <p>The native utility token of the PixelPayot ecosystem</p>
                    <div class="token-details">
                      <div class="detail">
                        <span class="label">Total Supply:</span>
                        <span class="value">1,000,000,000 PPO</span>
                      </div>
                      <div class="detail">
                        <span class="label">Initial Price:</span>
                        <span class="value">$0.01 USD</span>
                      </div>
                      <div class="detail">
                        <span class="label">Blockchain:</span>
                        <span class="value">Ethereum (ERC-20)</span>
                      </div>
                    </div>
                  </div>
                  <div class="token-distribution">
                    <h4>Token Distribution</h4>
                    <div class="distribution-chart">
                      <div class="chart-item" style="--percentage: 40%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Gaming Rewards (40%)</span>
                      </div>
                      <div class="chart-item" style="--percentage: 25%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Team & Advisors (25%)</span>
                      </div>
                      <div class="chart-item" style="--percentage: 20%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Ecosystem Fund (20%)</span>
                      </div>
                      <div class="chart-item" style="--percentage: 10%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Marketing (10%)</span>
                      </div>
                      <div class="chart-item" style="--percentage: 5%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Initial Sale (5%)</span>
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

    <!-- Technology -->
    <section id="technology" class="content-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-microchip me-3"></i>
                Technology Stack
              </h2>
              <div class="content-body">
                <div class="tech-grid">
                  <div class="tech-item">
                    <div class="tech-icon">
                      <i class="fab fa-ethereum"></i>
                    </div>
                    <h4>Blockchain</h4>
                    <p>Ethereum smart contracts for secure and transparent transactions</p>
                  </div>
                  <div class="tech-item">
                    <div class="tech-icon">
                      <i class="fas fa-gamepad"></i>
                    </div>
                    <h4>Gaming Engine</h4>
                    <p>Custom gaming engine built with Unity for immersive experiences</p>
                  </div>
                  <div class="tech-item">
                    <div class="tech-icon">
                      <i class="fas fa-cloud"></i>
                    </div>
                    <h4>Cloud Infrastructure</h4>
                    <p>AWS-powered scalable infrastructure for global accessibility</p>
                  </div>
                  <div class="tech-item">
                    <div class="tech-icon">
                      <i class="fas fa-shield-alt"></i>
                    </div>
                    <h4>Security</h4>
                    <p>Multi-layer security with encryption and audit trails</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Roadmap -->
    <section id="roadmap" class="content-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-road me-3"></i>
                Development Roadmap
              </h2>
              <div class="content-body">
                <div class="roadmap-timeline">
                  <div v-for="phase in roadmap" :key="phase.id" class="timeline-item">
                    <div class="timeline-marker" :class="phase.status">
                      <i :class="phase.icon"></i>
                    </div>
                    <div class="timeline-content">
                      <h4>{{ phase.title }}</h4>
                      <span class="timeline-date">{{ phase.date }}</span>
                      <p>{{ phase.description }}</p>
                      <div class="phase-features">
                        <span v-for="feature in phase.features" :key="feature" class="feature-tag">
                          {{ feature }}
                        </span>
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

    <!-- Team -->
    <section id="team" class="content-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-users me-3"></i>
                Team
              </h2>
              <div class="content-body">
                <div class="team-grid">
                  <div v-for="member in team" :key="member.id" class="team-member">
                    <div class="member-avatar">
                      <img :src="member.avatar" :alt="member.name" class="avatar-image">
                    </div>
                    <h4 class="member-name">{{ member.name }}</h4>
                    <p class="member-role">{{ member.role }}</p>
                    <p class="member-bio">{{ member.bio }}</p>
                    <div class="member-social">
                      <a v-if="member.linkedin" :href="member.linkedin" target="_blank" class="social-link">
                        <i class="fab fa-linkedin"></i>
                      </a>
                      <a v-if="member.twitter" :href="member.twitter" target="_blank" class="social-link">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="content-section padding-large">
      <div class="container">
      <div class="row">
        <div class="col-12">
            <div class="content-card">
              <h2 class="content-title">
                <i class="fas fa-envelope me-3"></i>
                Contact & Resources
              </h2>
              <div class="content-body">
                <div class="contact-grid">
                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-globe"></i>
                    </div>
                    <h4>Website</h4>
                    <a href="https://pixelpayot.com" target="_blank">pixelpayot.com</a>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fab fa-telegram"></i>
                    </div>
                    <h4>Telegram</h4>
                    <a href="https://t.me/pixelpayot" target="_blank">@pixelpayot</a>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fab fa-twitter"></i>
                    </div>
                    <h4>Twitter</h4>
                    <a href="https://twitter.com/pixelpayot" target="_blank">@pixelpayot</a>
                  </div>
                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <h4>Email</h4>
                    <a href="mailto:info@pixelpayot.com">info@pixelpayot.com</a>
                  </div>
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
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// Table of contents
const tableOfContents = ref([
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'Overview of the PixelPayot ecosystem',
    icon: 'fas fa-chart-line'
  },
  {
    id: 'vision-mission',
    title: 'Vision & Mission',
    description: 'Our goals and values',
    icon: 'fas fa-eye'
  },
  {
    id: 'tokenomics',
    title: 'Tokenomics',
    description: 'PPO token distribution and economics',
    icon: 'fas fa-coins'
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Technical architecture and stack',
    icon: 'fas fa-microchip'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    description: 'Development timeline and milestones',
    icon: 'fas fa-road'
  },
  {
    id: 'team',
    title: 'Team',
    description: 'Meet our core team members',
    icon: 'fas fa-users'
  }
])

// Roadmap data
const roadmap = ref([
  {
    id: 1,
    title: 'Phase 1: Foundation',
    date: 'Q1 2024',
    status: 'completed',
    icon: 'fas fa-check',
    description: 'Core platform development and smart contract deployment',
    features: ['Smart Contracts', 'Basic UI', 'Token Launch']
  },
  {
    id: 2,
    title: 'Phase 2: Gaming Platform',
    date: 'Q2 2024',
    status: 'completed',
    icon: 'fas fa-check',
    description: 'Launch of first play-to-earn games and NFT marketplace',
    features: ['First Game', 'NFT Marketplace', 'Wallet Integration']
  },
  {
    id: 3,
    title: 'Phase 3: Ecosystem Expansion',
    date: 'Q3 2024',
    status: 'in-progress',
    icon: 'fas fa-spinner',
    description: 'Expansion of gaming portfolio and community features',
    features: ['Multiple Games', 'Social Features', 'Mobile App']
  },
  {
    id: 4,
    title: 'Phase 4: Global Launch',
    date: 'Q4 2024',
    status: 'upcoming',
    icon: 'fas fa-rocket',
    description: 'Full platform launch with advanced features and partnerships',
    features: ['Global Launch', 'Partnerships', 'Advanced Features']
  },
  {
    id: 5,
    title: 'Phase 5: Metaverse',
    date: 'Q1 2025',
    status: 'upcoming',
    icon: 'fas fa-cube',
    description: 'Integration with metaverse platforms and VR experiences',
    features: ['Metaverse Integration', 'VR Support', 'Cross-Platform']
  }
])

// Team data
const team = ref([
  {
    id: 1,
    name: 'Alex Chen',
    role: 'CEO & Founder',
    bio: 'Former gaming executive with 15+ years in the industry. Led successful game studios and blockchain projects.',
    avatar: '/src/assets/images/team/ceo.jpg',
    linkedin: 'https://linkedin.com/in/alexchen',
    twitter: 'https://twitter.com/alexchen'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO',
    bio: 'Blockchain architect with expertise in smart contracts and gaming infrastructure. Previously at major tech companies.',
    avatar: '/src/assets/images/team/cto.jpg',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    twitter: 'https://twitter.com/sarahjohnson'
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    role: 'Head of Gaming',
    bio: 'Game designer and producer with experience in AAA titles. Passionate about creating engaging play-to-earn experiences.',
    avatar: '/src/assets/images/team/gaming.jpg',
    linkedin: 'https://linkedin.com/in/mikerodriguez',
    twitter: 'https://twitter.com/mikerodriguez'
  },
  {
    id: 4,
    name: 'Lisa Wang',
    role: 'Head of Marketing',
    bio: 'Marketing strategist specializing in blockchain and gaming. Built communities for multiple successful projects.',
    avatar: '/src/assets/images/team/marketing.jpg',
    linkedin: 'https://linkedin.com/in/lisawang',
    twitter: 'https://twitter.com/lisawang'
  }
])

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const downloadPDF = () => {
  // Mock PDF download
  console.log('Downloading whitepaper PDF...')
  // In real app, this would trigger actual PDF download
}

const shareWhitepaper = () => {
  if (navigator.share) {
    navigator.share({
      title: 'PixelPayot Whitepaper',
      text: 'Check out the PixelPayot whitepaper - the future of gaming and NFTs!',
      url: window.location.href
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}
</script>

<style scoped>
.whitepaper-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.whitepaper-hero {
  padding-top: 120px;
  padding-bottom: 80px;
}

.whitepaper-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.whitepaper-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.whitepaper-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.btn-outline-linear {
  background: transparent;
  border: 2px solid #cc00ff;
  color: #cc00ff;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-outline-linear:hover {
  background: #cc00ff;
  color: white;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.toc-section {
  background: rgba(0, 0, 0, 0.3);
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toc-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.toc-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.toc-content h4 {
  margin-bottom: 8px;
  font-weight: 600;
}

.toc-content p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.content-section {
  color: white;
}

.content-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: white;
}

.content-body {
  line-height: 1.8;
}

.lead {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.point-item i {
  color: #cc00ff;
  font-size: 1.2rem;
}

.vision-stats {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #cc00ff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.mission-values {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.value-item i {
  color: #cc00ff;
  font-size: 1.2rem;
}

.tokenomics-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.token-info h3 {
  color: #cc00ff;
  margin-bottom: 15px;
}

.token-details {
  margin-top: 20px;
}

.detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail .label {
  font-weight: 600;
}

.detail .value {
  color: #cc00ff;
}

.distribution-chart {
  margin-top: 20px;
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.chart-bar {
  width: var(--percentage);
  height: 20px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.chart-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.tech-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.tech-icon {
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

.tech-item h4 {
  margin-bottom: 15px;
  color: white;
}

.tech-item p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.roadmap-timeline {
  position: relative;
  padding-left: 30px;
}

.roadmap-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.2);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
}

.timeline-marker {
  position: absolute;
  left: -22px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
}

.timeline-marker.completed {
  background: #51cf66;
}

.timeline-marker.in-progress {
  background: #ffd43b;
}

.timeline-marker.upcoming {
  background: rgba(255, 255, 255, 0.3);
}

.timeline-content {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  margin-left: 20px;
}

.timeline-content h4 {
  color: white;
  margin-bottom: 10px;
}

.timeline-date {
  display: inline-block;
  background: #cc00ff;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 15px;
}

.timeline-content p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
}

.phase-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: rgba(204, 0, 255, 0.2);
  color: #cc00ff;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(204, 0, 255, 0.3);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.team-member {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid #cc00ff;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  color: white;
  margin-bottom: 8px;
}

.member-role {
  color: #cc00ff;
  font-weight: 600;
  margin-bottom: 15px;
}

.member-bio {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
}

.member-social {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #cc00ff;
  transform: translateY(-2px);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.contact-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: white;
}

.contact-item h4 {
  color: white;
  margin-bottom: 10px;
}

.contact-item a {
  color: #cc00ff;
  text-decoration: none;
  font-weight: 600;
}

.contact-item a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .whitepaper-title {
    font-size: 2.5rem;
  }
  
  .whitepaper-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .toc-grid {
    grid-template-columns: 1fr;
  }
  
  .tokenomics-overview {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .content-card {
    padding: 25px;
  }
}
</style>
