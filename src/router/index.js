import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import('../views/Marketplace.vue')
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/blindbox',
    name: 'Blindbox',
    component: () => import('../views/Blindbox.vue')
  },
  {
    path: '/investment',
    name: 'Investment',
    component: () => import('../views/Investment.vue')
  },
  {
    path: '/nft-investment',
    name: 'NFTInvestment',
    component: () => import('../views/NFTInvestment.vue')
  },
  {
    path: '/referral',
    name: 'Referral',
    component: () => import('../views/Referral.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/whitepaper',
    name: 'Whitepaper',
    component: () => import('../views/Whitepaper.vue')
  },
  {
    path: '/swap',
    name: 'Swap',
    component: () => import('../views/Swap.vue')
  },
  {
    path: '/creators',
    name: 'Creators',
    component: () => import('../views/Creators.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/arrow-game',
    name: 'ArrowGame',
    component: () => import('../views/ArrowGame.vue')
  },
  {
    path: '/arrow-game-modern',
    name: 'ArrowGameModern',
    component: () => import('../views/ArrowGameModern.vue')
  },
  {
    path: '/wallet-test',
    name: 'WalletTest',
    component: () => import('../views/WalletTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
