<template>
  <section id="product-card" class="">
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
                    <span class="rarity-badge badge" :class="getRarityClass(nft.rarity)">{{ nft.rarity }}</span>
                    <span class="rarity-badge badge currency">{{ nft.price }} PPO</span>
                  </div>
                  <div class="clients-detail">
                    <img :src="nft.creator.avatar" :alt="nft.creator.name" class="circle-shape">
                    <span class="clients-name">{{ nft.creator.name }}</span>
                  </div>
                  <div class="btn-card">
                    <button class="btn btn-linear btn-full btn-rounded btn-medium place-bid-btn" @click="placeBid(nft)">
                      Place a Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const nftItems = ref([
  {
    id: 1,
    title: 'Ancient Skeleton',
    rarity: 'SSS',
    price: '3,290',
    image: '/src/assets/images/nft1.jpg',
    creator: {
      name: 'Mutin Cap',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 2,
    title: 'Cyber Beam',
    rarity: 'SSS',
    price: '5,400',
    image: '/src/assets/images/nft2.jpg',
    creator: {
      name: 'Kelvin Glan',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 3,
    title: 'Volcanic Breath',
    rarity: '★★★',
    price: '1,220',
    image: '/src/assets/images/nft3.jpg',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item3.jpg'
    }
  },
  {
    id: 4,
    title: 'Inferno Wrath',
    rarity: '★★★★★',
    price: '2,470',
    image: '/src/assets/images/nft4.jpg',
    creator: {
      name: 'Kelvin Glan',
      avatar: '/src/assets/images/clients-item2.jpg'
    }
  },
  {
    id: 5,
    title: 'Frost Breath',
    rarity: 'SSS',
    price: '9,820',
    image: '/src/assets/images/nft5.jpg',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item1.jpg'
    }
  },
  {
    id: 6,
    title: 'Hard Breath',
    rarity: '★★',
    price: '220',
    image: '/src/assets/images/collection-item3.jpg',
    creator: {
      name: 'Glam Lee',
      avatar: '/src/assets/images/clients-item3.jpg'
    }
  }
])

let swiper = null

onMounted(() => {
  initSwiper()
})

const initSwiper = () => {
  swiper = new Swiper('.product-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
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
}

const getRarityClass = (rarity) => {
  if (rarity === 'SSS') return 'bg-warning'
  if (rarity.includes('★★★★★')) return 'bg-success'
  if (rarity.includes('★★★')) return 'bg-info'
  return 'bg-secondary'
}

const placeBid = (nft) => {
  // Place bid logic here
  nft.currentBid += 0.1
  nft.bidCount++
}
</script>

<style scoped>
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rarity-item {
  text-align: center;
}

.rarity-item .badge {
  font-size: 0.8rem;
  padding: 5px 10px;
}

.product-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(204, 0, 255, 0.3);
}

.image-holder {
  position: relative;
  overflow: hidden;
}

.image-holder img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-item:hover .image-holder img {
  transform: scale(1.1);
}

.product-detail {
  padding: 20px;
  background: rgba(255, 255, 255, 0.95) !important;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.rarity-badge {
  font-size: 0.7rem;
  padding: 3px 8px;
}

.currency {
  background: linear-gradient(45deg, #cc00ff, #d739ff) !important;
  color: white;
}

.clients-detail {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.circle-shape {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.clients-name {
  color: #666;
  font-weight: 500;
}

.btn-linear {
  background: linear-gradient(45deg, #cc00ff, #d739ff);
  border: none;
  color: white;
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-linear:hover {
  background: linear-gradient(45deg, #d739ff, #cc00ff);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(204, 0, 255, 0.3);
}

.place-bid-btn {
  transition: all 0.3s ease;
}

.place-bid-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.swiper-pagination {
  margin-top: 30px;
}

.swiper-pagination-bullet {
  background: #cc00ff;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #cc00ff;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .rarities-guide {
    flex-direction: column;
    gap: 10px;
  }
  
  .rarity-item {
    margin: 0;
  }
}
</style>
