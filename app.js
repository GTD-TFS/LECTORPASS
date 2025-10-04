// App lógica (stub).
// - Captura (input file / getUserMedia)
// - OpenCV: recorte/perspectiva
// - OCR: Tesseract.js (eng + spa), MRZ con whitelist
// - Parseo MRZ (si incluyes una librería mrz-parser, añádela aquí)
// - Normalización: Nombre, Apellidos, Sexo, FechaNacimiento (DD/MM/AAAA), Nacionalidad en castellano
// - Escritura en XLSX: hoja 'Resumen', Col A = campo, Col B = valor
document.getElementById('captureBtn').addEventListener('click', () => {
  alert('Stub: aquí iría el flujo de captura/OCR/exportación.');
});