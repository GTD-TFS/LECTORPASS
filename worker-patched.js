// === worker-patched.js ===
// Parche universal para rutas absolutas en GitHub Pages y soporte offline

(() => {
  try {
    const origin = self.location.origin;
    // Asegura que termina con "/"
    let basePath = self.location.pathname.replace(/[^/]+$/, '');
    if (!basePath.endsWith('/')) basePath += '/';

    const wasmURL = `${origin}${basePath}tesseract-core-simd.wasm`;
    const workerURL = `${origin}${basePath}worker.min.js`;

    // Intercepta cualquier fetch al .wasm y lo redirige a la URL absoluta correcta
    const origFetch = self.fetch.bind(self);
    self.fetch = async function (r, i) {
      if (typeof r === 'string' && r.endsWith('tesseract-core-simd.wasm')) {
        return origFetch(wasmURL, i);
      }
      return origFetch(r, i);
    };

    // Carga el worker real desde su URL absoluta
    importScripts(workerURL);
  } catch (err) {
    console.error("❌ worker-patched.js error:", err);
  }
})();
