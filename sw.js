// 🔒 Service Worker infalible anti-caché
const VERSION = '2025-10-04-01'; // cambia este valor en cada commit
const CACHE_NAME = `offline-${VERSION}`;

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      './',
      'index.html',
      'manifest.webmanifest',
      'icon512.png',
      'opencv.js',
      'exifr.min.js',
      'xlsx.full.min.js',
      'tesseract.min.js',
      'mrz.esm.js',
      'eng.traineddata',
      'spa.traineddata',
      '1234.xlsx',
      'paises_es.json'
    ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      // Reemplaza el cache si la petición fue exitosa
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match(event.request))
  );
});
