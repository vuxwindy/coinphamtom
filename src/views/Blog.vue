<template>
  <div class="blog-page">
    <Header />
    
    <!-- Blog Hero Section -->
    <section class="blog-hero padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="blog-title">NFT News & Updates</h1>
            <p class="blog-description">
              Stay updated with the latest news, trends, and insights from the world of NFTs and blockchain gaming.
            </p>
            <div class="blog-stats">
              <div class="stat-item">
                <i class="fas fa-newspaper"></i>
                <span>Total Articles: <strong>{{ totalArticles }}</strong></span>
              </div>
              <div class="stat-item">
                <i class="fas fa-eye"></i>
                <span>Total Views: <strong>{{ totalViews }}</strong></span>
              </div>
              <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>Active Readers: <strong>{{ activeReaders }}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Article Section -->
    <section class="featured-article padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Featured Article</h2>
            <div class="featured-card" v-if="featuredArticle">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <div class="featured-image">
                    <img :src="featuredArticle.image" :alt="featuredArticle.title">
                    <div class="featured-badge">Featured</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="featured-content">
                    <div class="article-meta">
                      <span class="category">{{ featuredArticle.category }}</span>
                      <span class="date">{{ featuredArticle.date }}</span>
                      <span class="read-time">{{ featuredArticle.readTime }} min read</span>
                    </div>
                    <h3 class="article-title">{{ featuredArticle.title }}</h3>
                    <p class="article-excerpt">{{ featuredArticle.excerpt }}</p>
                    <div class="article-author">
                      <img :src="featuredArticle.author.avatar" :alt="featuredArticle.author.name">
                      <div class="author-info">
                        <span class="author-name">{{ featuredArticle.author.name }}</span>
                        <span class="author-title">{{ featuredArticle.author.title }}</span>
                      </div>
                    </div>
                    <router-link :to="featuredArticle.link" class="btn btn-linear btn-medium">
                      Read Full Article
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="section-title text-center">Categories</h2>
            <div class="categories-grid">
              <div 
                class="category-item" 
                v-for="category in categories" 
                :key="category.id"
                :class="{ active: selectedCategory === category.id }"
                @click="selectedCategory = category.id"
              >
                <div class="category-icon">
                  <i :class="category.icon"></i>
                </div>
                <h4>{{ category.name }}</h4>
                <span class="article-count">{{ category.count }} articles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Grid Section -->
    <section class="articles-section padding-large">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header d-flex justify-content-between align-items-center">
              <h2 class="section-title">Latest Articles</h2>
              <div class="filter-controls">
                <select v-model="sortBy" class="form-select">
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
            <div class="articles-grid">
              <div class="article-card" v-for="article in filteredArticles" :key="article.id">
                <div class="article-image">
                  <img :src="article.image" :alt="article.title">
                  <div class="category-badge">{{ article.category }}</div>
                </div>
                <div class="article-content">
                  <div class="article-meta">
                    <span class="date">{{ article.date }}</span>
                    <span class="read-time">{{ article.readTime }} min read</span>
                  </div>
                  <h3 class="article-title">
                    <router-link :to="article.link">{{ article.title }}</router-link>
                  </h3>
                  <p class="article-excerpt">{{ article.excerpt }}</p>
                  <div class="article-footer">
                    <div class="article-author">
                      <img :src="article.author.avatar" :alt="article.author.name">
                      <span class="author-name">{{ article.author.name }}</span>
                    </div>
                    <div class="article-stats">
                      <span class="views">
                        <i class="fas fa-eye"></i>
                        {{ article.views }}
                      </span>
                      <span class="likes">
                        <i class="fas fa-heart"></i>
                        {{ article.likes }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section padding-large bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="section-title">Subscribe to Our Newsletter</h2>
            <p class="newsletter-description">
              Get the latest NFT news, gaming updates, and exclusive content delivered to your inbox.
            </p>
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <div class="input-group">
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="Enter your email address"
                  class="form-control"
                  required
                >
                <button type="submit" class="btn btn-linear">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const selectedCategory = ref('all')
const sortBy = ref('latest')
const email = ref('')
const totalArticles = ref(156)
const totalViews = ref(1250000)
const activeReaders = ref(15420)

// Featured Article Data
const featuredArticle = ref({
  id: 1,
  title: 'The Future of NFT Gaming: How Blockchain is Revolutionizing the Gaming Industry',
  excerpt: 'Discover how NFTs are transforming the gaming landscape, creating new opportunities for players and developers alike. From play-to-earn models to true digital ownership, explore the exciting future of blockchain gaming.',
  image: '/src/assets/images/blog1.jpg',
  category: 'Gaming',
  date: 'March 15, 2024',
  readTime: 8,
  author: {
    name: 'Sarah Johnson',
    title: 'Gaming Editor',
    avatar: '/src/assets/images/clients-item-lg1.jpg'
  },
  link: '/blog/1'
})

// Categories Data
const categories = ref([
  {
    id: 'all',
    name: 'All Articles',
    icon: 'fas fa-newspaper',
    count: 156
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: 'fas fa-gamepad',
    count: 45
  },
  {
    id: 'nft',
    name: 'NFTs',
    icon: 'fas fa-image',
    count: 38
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    icon: 'fas fa-link',
    count: 32
  },
  {
    id: 'tutorial',
    name: 'Tutorials',
    icon: 'fas fa-graduation-cap',
    count: 28
  },
  {
    id: 'news',
    name: 'News',
    icon: 'fas fa-bullhorn',
    count: 13
  }
])

// Articles Data
const articles = ref([
  {
    id: 1,
    title: 'Top 10 NFT Games to Watch in 2024',
    excerpt: 'Explore the most promising NFT games that are set to dominate the market this year.',
    image: '/src/assets/images/blog2.jpg',
    category: 'Gaming',
    date: 'March 14, 2024',
    readTime: 6,
    views: 12500,
    likes: 890,
    author: {
      name: 'Mike Chen',
      avatar: '/src/assets/images/clients-item-lg2.jpg'
    },
    link: '/blog/2'
  },
  {
    id: 2,
    title: 'How to Create Your First NFT Collection',
    excerpt: 'A comprehensive guide for beginners on creating and launching their first NFT collection.',
    image: '/src/assets/images/blog3.jpg',
    category: 'Tutorial',
    date: 'March 13, 2024',
    readTime: 12,
    views: 8900,
    likes: 654,
    author: {
      name: 'Emma Davis',
      avatar: '/src/assets/images/clients-item-lg3.jpg'
    },
    link: '/blog/3'
  },
  {
    id: 3,
    title: 'The Rise of Play-to-Earn Gaming Models',
    excerpt: 'Understanding how play-to-earn is changing the gaming industry and creating new economic opportunities.',
    image: '/src/assets/images/blog4.jpg',
    category: 'Gaming',
    date: 'March 12, 2024',
    readTime: 7,
    views: 11200,
    likes: 756,
    author: {
      name: 'Alex Thompson',
      avatar: '/src/assets/images/clients-item-lg4.jpg'
    },
    link: '/blog/4'
  },
  {
    id: 4,
    title: 'Blockchain Technology: Beyond Cryptocurrency',
    excerpt: 'Exploring the various applications of blockchain technology beyond digital currencies.',
    image: '/src/assets/images/nft-item1.jpg',
    category: 'Blockchain',
    date: 'March 11, 2024',
    readTime: 9,
    views: 7800,
    likes: 543,
    author: {
      name: 'Lisa Wang',
      avatar: '/src/assets/images/clients-item2.jpg'
    },
    link: '/blog/5'
  },
  {
    id: 5,
    title: 'NFT Market Trends: What\'s Hot in 2024',
    excerpt: 'An analysis of current NFT market trends and what collectors should watch out for.',
    image: '/src/assets/images/nft-item2.jpg',
    category: 'NFT',
    date: 'March 10, 2024',
    readTime: 5,
    views: 15600,
    likes: 1023,
    author: {
      name: 'David Kim',
      avatar: '/src/assets/images/clients-item3.jpg'
    },
    link: '/blog/6'
  },
  {
    id: 6,
    title: 'Gaming Guilds: The Future of Competitive Gaming',
    excerpt: 'How gaming guilds are revolutionizing competitive gaming and creating new opportunities for players.',
    image: '/src/assets/images/nft-item3.jpg',
    category: 'Gaming',
    date: 'March 9, 2024',
    readTime: 8,
    views: 9200,
    likes: 678,
    author: {
      name: 'Rachel Green',
      avatar: '/src/assets/images/clients-item1.jpg'
    },
    link: '/blog/7'
  }
])

// Computed properties
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => 
      article.category.toLowerCase() === selectedCategory.value
    )
  }

  // Sort articles
  switch (sortBy.value) {
    case 'popular':
      filtered = [...filtered].sort((a, b) => b.views - a.views)
      break
    case 'trending':
      filtered = [...filtered].sort((a, b) => b.likes - a.likes)
      break
    default:
      // Latest (default) - already sorted by date
      break
  }

  return filtered
})

const subscribeNewsletter = () => {
  if (email.value) {
    alert(`Thank you for subscribing with: ${email.value}`)
    email.value = ''
  }
}
</script>

<style scoped>
.blog-page {
  background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #6600cc 100%);
  min-height: 100vh;
  padding-top: 80px;
}

.blog-hero {
  padding: 100px 0;
  text-align: center;
}

.blog-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

.blog-description {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
}

.stat-item i {
  color: #cc00ff;
  font-size: 1.2rem;
}

.featured-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  margin-top: 40px;
}

.featured-image {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.featured-content {
  padding: 40px;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.category, .date, .read-time {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.category {
  color: #cc00ff;
  font-weight: 600;
}

.article-title {
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.3;
}

.article-excerpt {
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 30px;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.article-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  color: #ffffff;
  font-weight: 600;
}

.author-title {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.category-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.category-item:hover, .category-item.active {
  background: rgba(204, 0, 255, 0.2);
  transform: translateY(-5px);
}

.category-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 1.5rem;
  color: #ffffff;
}

.category-item h4 {
  color: #ffffff;
  margin-bottom: 10px;
}

.article-count {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.section-header {
  margin-bottom: 40px;
}

.filter-controls {
  display: flex;
  gap: 15px;
}

.form-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
  padding: 10px 15px;
  backdrop-filter: blur(10px);
}

.form-select:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #cc00ff;
  box-shadow: 0 0 0 0.2rem rgba(204, 0, 255, 0.25);
  color: #ffffff;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.article-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-10px);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(204, 0, 255, 0.9);
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.article-content {
  padding: 25px;
}

.article-content .article-meta {
  margin-bottom: 15px;
}

.article-content .article-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.article-content .article-title a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-content .article-title a:hover {
  color: #cc00ff;
}

.article-content .article-excerpt {
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-footer .article-author {
  margin-bottom: 0;
}

.article-footer .article-author img {
  width: 35px;
  height: 35px;
}

.article-footer .author-name {
  font-size: 0.9rem;
}

.article-stats {
  display: flex;
  gap: 15px;
}

.article-stats span {
  color: #b0b0b0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.article-stats i {
  color: #cc00ff;
}

.newsletter-section {
  text-align: center;
}

.newsletter-description {
  color: #b0b0b0;
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.newsletter-form {
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 10px;
}

.input-group .form-control {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
}

.input-group .form-control:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #cc00ff;
  box-shadow: 0 0 0 0.2rem rgba(204, 0, 255, 0.25);
  color: #ffffff;
}

.input-group .form-control::placeholder {
  color: #b0b0b0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2.5rem;
  }
  
  .blog-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .featured-content {
    padding: 25px;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .input-group {
    flex-direction: column;
  }
}
</style>
