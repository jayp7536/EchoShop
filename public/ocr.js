const Tesseract = require('tesseract.js');

async function runOCR(filePath) {
   console.log("Starting OCR...");

   const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
   console.log("OCR Result:", text);

   console.log("OCR complete.");
   return text.trim();
}



module.exports = { runOCR };

/*
// ocr.js  — browser version only
console.log("✅ ocr.js loaded");

export async function runOCR(file) {
  console.log("Starting OCR...");

  // Access global Tesseract object (loaded from CDN in HTML)
  const { createWorker } = Tesseract;

  const worker = await createWorker('eng');

  const result = await worker.recognize(file);
  console.log("OCR Result:", result.data.text);

  await worker.terminate();
  console.log("OCR complete.");

  return result.data.text.trim();
}
*/


/*
export async function runOCR(file) {
  console.log("Starting OCR...");

  const { createWorker } = Tesseract;

  const worker = await createWorker('eng');
  const result = await worker.recognize(file);
  console.log("OCR Result:", result.data.text);

  await worker.terminate();
  console.log("OCR complete.");

  return result.data.text.trim();
}
*/