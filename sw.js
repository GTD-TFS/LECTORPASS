const CACHE_NAME = 'offline-v2'; // <-- cambia el número al actualizar

self.addEventListener('install', e => {
  self.skipWaiting(); // fuerza activación inmediata
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        './',
        'index.html',
        'manifest.webmanifest',
        'icon512.png',
        'opencv.js',
        'exifr.min.js',
        'xlsx.full.min.js',
        'tesseract.min.js',
        'worker.min.js',
        'tesseract-core-simd.js',
        'tesseract-core-simd.wasm',
        'mrz.esm.js',
        'eng.traineddata',
        'spa.traineddata',
        '1234.xlsx',
        'paises_es.json'
      ])
    )
  );
});

self.addEventListener('activate', e => {
  // elimina versiones viejas del cache
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
