/* =============================================
   TEHCS Service Worker
   Handles: caching, offline, push notifications
============================================= */

const CACHE_NAME = 'tehcs-v1';
const STATIC_ASSETS = [
  '/app/index.html',
  '/app/staff.html',
  '/app/css/app.css',
  '/app/js/app.js',
  '/app/manifest.json',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Nunito:wght@300;400;500;600;700&display=swap'
];

/* ── INSTALL: cache static assets ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── ACTIVATE: clean old caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── FETCH: network first, cache fallback ── */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

/* ── PUSH NOTIFICATIONS ── */
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  const title   = data.title   || 'TEHCS Update';
  const options = {
    body:    data.body    || 'You have a new update from TEHCS.',
    icon:    '/app/icons/icon-192.png',
    badge:   '/app/icons/icon-192.png',
    vibrate: [200, 100, 200],
    data:    { url: data.url || '/app/index.html' },
    actions: [
      { action: 'view',    title: 'View Now' },
      { action: 'dismiss', title: 'Dismiss'  }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

/* ── NOTIFICATION CLICK ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  const url = e.notification.data?.url || '/app/index.html';
  e.waitUntil(clients.openWindow(url));
});
