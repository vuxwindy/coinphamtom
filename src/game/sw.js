const CACHE_NAME = 'coinpayot-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/unified-styles.css',
  '/css/thirdweb-wallet-styles.css',
  '/css/mobile-responsive.css',
  '/css/browser-fallback.css',
  '/css/uniswap-style-modal.css',
  '/js/thirdweb-integration.js',
  '/js/ppo-config.js',
  '/js/pwa-mobile.js',
  '/js/browser-fallback.js',
  '/js/uniswap-style-wallet.js',
  '/images/logo.png',
  '/images/banner-image.png',
  'https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js',
  'https://unpkg.com/thirdweb@latest/dist/thirdweb.umd.js'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from COINPAYOT',
    icon: '/images/logo.png',
    badge: '/images/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/images/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('COINPAYOT NFT', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/index.html')
    );
  }
});
