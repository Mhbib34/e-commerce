// src/middleware/upload.js

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Untuk mendapatkan __dirname dalam module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolusi path ke folder public/uploads dari root proyek
const uploadDir = path.resolve(__dirname, "../../public/uploads");

// Buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
