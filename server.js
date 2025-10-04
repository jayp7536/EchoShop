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
import "dotenv/config";
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { runOCR } from "./public/ocr.js";
import { getMainCategory } from "./public/ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log("Starting OCR...");
    const text = await runOCR(req.file.path);
    console.log("OCR complete.");

    const category = await getMainCategory(text);
    res.json({ text, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OCR or AI failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/index.html`);
});
