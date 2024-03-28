import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const mediaDir = join(__dirname, 'dist', 'media');
const port = 3000;

app.use(cors());
app.use(express.static(join(__dirname, 'dist')));

app.get('/list-media', (req, res) => {
  fs.readdir(mediaDir, (err, files) => {
    if (err) {
      console.error('Error reading media directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|mp4|mov)$/i.test(file));
    const mediaPaths = mediaFiles.map(file => `/media/${file}`);
    res.json({ mediaPaths });
  });
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('*.js', (req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

app.listen(port, () => {
  console.log(`Lancement du diaporama à l'adresse: http://localhost:${port}`);
});