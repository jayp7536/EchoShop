// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const { runOCR } = require('./public/ocr');
// const { getMainCategory } = require('./public/ai');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(express.json());
// app.use(express.static('public'));

// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         const imagePath = path.join(__dirname, req.file.path);

//         // Step 1: Get OCR text
//         const ocrText = await runOCR(imagePath);

//         // Step 2: Determine main category
//         const category = getMainCategory(ocrText);

//         // Step 3: Return category as JSON
//         res.json({ category, ocrText });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

// Import ocr.js from /public
const { runOCR } = require(path.join(__dirname, 'public/ocr.js'));

const app = express();
const PORT = 3000;

// Serve everything in /public as static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure file uploads
const upload = multer({ dest: 'uploads/' });

// Handle POST /upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const text = await runOCR(req.file.path);
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OCR failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/title_screen.html`);
});