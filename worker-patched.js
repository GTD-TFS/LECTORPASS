// worker-patched.js — estable para GitHub Pages/Offline
(() => {
  try {
    // Ruta base ABSOLUTA fija a tu sitio (robusta aunque el worker se ejecute desde un blob)
    const BASE = 'https://gtd-tfs.github.io/LECTORPASS/';

    const wasmURL   = BASE + 'tesseract-core-simd.wasm';
    const workerURL = BASE + 'worker.min.js';

    // Intercepta peticiones dentro del worker:
    // 1) .wasm -> URL absoluta correcta
    // 2) .traineddata.gz -> usar .traineddata plano en la raíz
    // 3) /tessdata/*.traineddata -> archivo en la raíz
    const origFetch = self.fetch.bind(self);
    self.fetch = async function (r, i) {
      if (typeof r === 'string') {
        if (r.endsWith('tesseract-core-simd.wasm')) {
          return origFetch(wasmURL, i);
        }
        if (r.endsWith('.traineddata.gz')) {
          const fname = r.replace(/\.gz$/, '').split('/').pop();
          return origFetch(BASE + fname, i);
        }
        if (r.includes('/tessdata/') && r.endsWith('.traineddata')) {
          const fname = r.split('/tessdata/').pop();
          return origFetch(BASE + fname, i);
        }
      }
      return origFetch(r, i);
    };

    // Carga el worker real
    importScripts(workerURL);
  } catch (err) {
    console.error('❌ worker-patched.js error:', err);
  }
})();
