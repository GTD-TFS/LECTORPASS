self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('offline-v1').then(cache =>
      cache.addAll([
        './',
        'index.html',
        'manifest.webmanifest',
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
        'paises_es.json',
        '1234.xlsx',
        'icon512.png'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
