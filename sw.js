const CACHE_NAME = 'offline-v7';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon512.png',
  'opencv.js',
  'exifr.min.js',
  'xlsx.full.min.js',
  'tesseract.min.js',
  'worker.min.js',
  'worker-patched.js',
  'tesseract-core-simd.js',
  'tesseract-core-simd.wasm',
  'spa.traineddata',
  'eng.traineddata',
  '1234.xlsx',
  'mrz.esm.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      return resp || fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return r;
      });
    }).catch(() => caches.match('./'))
  );
});

