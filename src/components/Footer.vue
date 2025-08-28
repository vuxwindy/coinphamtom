<template>
  <footer
    id="footer"
    class="padding-large pattern-blur"
  >
    <div class="pattern-overlay pattern-blur-footer right-side-pattern">
      <img src="/src/assets/images/footer-pattern.png" />
    </div>
    <div class="container">
      <div class="row d-flex flex-wrap justify-content-between">
        <div class="col-lg-4 col-md-6">
          <div class="footer-item md:item-001">
            <img
              src="/src/assets/images/header-icon.png"
              alt="logo"
            />
            <p>
              PixelPayot is a platform that allows you to earn money by playing
              games.
            </p>
            <div class="social-media">
              <ul class="d-flex list-unstyled">
                <li class="bg-blue-trans border-rounded-circle">
                  <a
                    href="#"
                    @click="openSocialLink('facebook')"
                  >
                    <i class="icon icon-facebook"></i>
                  </a>
                </li>
                <li class="bg-blue-trans border-rounded-circle">
                  <a
                    href="#"
                    @click="openSocialLink('twitter')"
                  >
                    <i class="icon icon-twitter"></i>
                  </a>
                </li>
                <li class="bg-blue-trans border-rounded-circle">
                  <a
                    href="#"
                    @click="openSocialLink('instagram')"
                  >
                    <i class="icon icon-instagram"></i>
                  </a>
                </li>
                <li class="bg-blue-trans border-rounded-circle">
                  <a
                    href="#"
                    @click="openSocialLink('youtube')"
                  >
                    <i class="icon icon-youtube"></i>
                  </a>
                </li>
                <li class="bg-blue-trans border-rounded-circle">
                  <a
                    href="#"
                    @click="openSocialLink('linkedin')"
                  >
                    <i class="icon icon-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <div class="footer-item item-002 content-light">
            <h4>Marketplace</h4>
            <ul class="footer-menu list-unstyled">
              <li><router-link to="/marketplace">NFTs</router-link></li>
              <li><router-link to="/collection">Art</router-link></li>
              <li><router-link to="/blindbox">Collectibles</router-link></li>
              <li><a href="#">Virtual world</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <div class="footer-item item-003 content-light">
            <h4>Info</h4>
            <ul class="footer-menu list-unstyled">
              <li><router-link to="/dashboard">Activity</router-link></li>
              <li><router-link to="/profile">Stats</router-link></li>
              <li><a href="#leaderboard">Rankings</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <div class="footer-item item-004 content-light">
            <h4>Company</h4>
            <ul class="footer-menu list-unstyled">
              <li><router-link to="/whitepaper">About</router-link></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#features">Features</a></li>
              <li><router-link to="/creators">Top Creators</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <div class="footer-item item-005 content-light">
            <h4>Resources</h4>
            <ul class="footer-menu list-unstyled">
              <li><router-link to="/whitepaper">Info</router-link></li>
              <li><router-link to="/referral">Affiliates</router-link></li>
              <li><a href="#association">Associated</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <hr />
  <div id="footer-bottom">
    <div class="container">
      <div class="row text-center">
        <p>© {{ currentYear }} Copyright PixelPayot. All rights reserved</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const openSocialLink = (platform) => {
  const socialLinks = {
    facebook: 'https://facebook.com/coinpayot',
    twitter: 'https://twitter.com/coinpayot',
    instagram: 'https://instagram.com/coinpayot',
    youtube: 'https://youtube.com/coinpayot',
    linkedin: 'https://linkedin.com/company/coinpayot',
  }

  if (socialLinks[platform]) {
    window.open(socialLinks[platform], '_blank')
  }
}
</script>

<style scoped>
#footer {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.pattern-overlay {
  position: absolute;
  top: 0;
  right: 0;
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

.footer-item {
  margin-bottom: 30px;
}

.footer-item img {
  height: 40px;
  margin-bottom: 20px;
}

.footer-item p {
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-item h4 {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-menu li {
  margin-bottom: 10px;
}

.footer-menu a {
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-menu a:hover {
  color: #cc00ff;
}

.social-media ul {
  gap: 15px;
  margin: 0;
}

.social-media li {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(204, 0, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-media li:hover {
  background: rgba(204, 0, 255, 0.4);
  transform: translateY(-3px);
}

.social-media a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
}

.social-media a:hover {
  color: #cc00ff;
}

#footer-bottom {
  background: rgba(0, 0, 0, 0.9);
  padding: 20px 0;
}

#footer-bottom p {
  color: #b0b0b0;
  margin: 0;
}

hr {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-item {
    text-align: center;
  }

  .social-media ul {
    justify-content: center;
  }
}
</style>
