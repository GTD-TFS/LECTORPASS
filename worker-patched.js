// worker-patched.js — versión final estable (GitHub Pages / offline)
(() => {
  try {
    // Detecta la ruta base exacta (funciona en GitHub Pages y local)
    let base = self.location.href.split('/').slice(0, -1).join('/') + '/';

    const wasmURL = base + 'tesseract-core-simd.wasm';
    const workerURL = base + 'worker.min.js';

    // Intercepta cualquier fetch al .wasm y redirige correctamente
    const origFetch = self.fetch.bind(self);
    self.fetch = async function (r, i) {
      if (typeof r === 'string' && r.endsWith('tesseract-core-simd.wasm')) {
        return origFetch(wasmURL, i);
      }
      return origFetch(r, i);
    };

    importScripts(workerURL);
  } catch (err) {
    console.error('❌ worker-patched.js error:', err);
  }
})();

