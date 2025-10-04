const CACHE_NAME = 'offline-v9';
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
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('index.html')); // nunca devuelve undefined
    })
  );
});
