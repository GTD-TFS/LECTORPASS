self.addEventListener('install', e => {
  e.waitUntil(caches.open('offline-v1').then(c => c.addAll([
    '/', '/index.html', '/app.js', '/manifest.webmanifest',
    '/libs/opencv.js','/libs/exifr.min.js','/libs/xlsx.full.min.js',
    '/libs/tesseract.min.js','/libs/tesseract.worker.min.js','/libs/tesseract-core-simd.js',
    '/tessdata/eng.traineddata','/tessdata/spa.traineddata','/data/paises_es.json','/data/1234.xlsx'
  ])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});