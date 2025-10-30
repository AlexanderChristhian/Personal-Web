/**
 * Service Worker - Aggressive Caching Strategy
 * Inspired by McMaster-Carr's approach to performance
 * 
 * Caching Strategy:
 * 1. Static assets: Cache First (immutable)
 * 2. Images: Cache First with fallback
 * 3. External CDN: Network First with cache fallback
 * 4. Navigation: Network First
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `personal-web-${CACHE_VERSION}`;
const CDN_CACHE = `cdn-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/Foto_Personal.jpg',
  '/Logo.png'
];

// CDN domains to cache
const CDN_ORIGINS = [
  'https://cdn.jsdelivr.net',
  'https://upload.wikimedia.org',
  'https://avatars.githubusercontent.com',
  'https://cdn.brandfetch.io'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching critical assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('personal-web-') && 
                     cacheName !== CACHE_NAME &&
                     cacheName !== CDN_CACHE &&
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different resource types
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (isCDNRequest(url)) {
    event.respondWith(handleCDNRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handleNavigationRequest(request));
  }
});

/**
 * Image caching: Cache First, fallback to network
 * Long cache lifetime for images
 */
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone before caching
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Image fetch failed:', error);
    // Return a placeholder or cached version
    return cached || new Response('Image not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * CDN caching: Network First, cache as backup
 * Ensures fresh content from CDNs but has offline support
 */
async function handleCDNRequest(request) {
  const cache = await caches.open(CDN_CACHE);
  
  try {
    const response = await fetch(request, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] CDN fetch failed, using cache:', request.url);
    const cached = await cache.match(request);
    return cached || new Response('CDN resource not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Static asset caching: Cache First
 * JS and CSS bundles are immutable with hashed filenames
 */
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Static asset fetch failed:', error);
    return cached || new Response('Asset not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Navigation caching: Network First
 * Always try to get fresh HTML
 */
async function handleNavigationRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Navigation fetch failed, using cache');
    const cached = await cache.match(request);
    return cached || caches.match('/index.html');
  }
}

/**
 * Check if request is from a CDN
 */
function isCDNRequest(url) {
  return CDN_ORIGINS.some(origin => url.origin === origin);
}

/**
 * Message handler for cache management
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        return self.clients.matchAll();
      }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      })
    );
  }
});
