// worker-patched.js
const wasmURL = location.origin + location.pathname + 'tesseract-core-simd.wasm';
const origFetch = self.fetch.bind(self);
self.fetch = async function(r, i) {
  if (typeof r === 'string' && r.endsWith('tesseract-core-simd.wasm')) {
    return origFetch(wasmURL, i);
  }
  return origFetch(r, i);
};
importScripts(location.origin + location.pathname + 'worker.min.js');

