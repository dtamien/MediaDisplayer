import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const mediaDir = join(__dirname, 'dist', 'media');
const port = 29870;

app.use(cors());

app.get('/media', (req, res) => {
  fs.readdir(mediaDir, (err, files) => {
    if (err) {
      console.error('Error reading media directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|mp4|mov)$/i.test(file));
    const mediaPaths = mediaFiles.map(file => `/media/${file}`); // Adjusted path
    res.json({ mediaPaths });
  });
});

// Serving media files statically
app.use('/media', express.static(mediaDir));

// Serving the build folder
app.use(express.static(join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Slideshow launched at: http://localhost:${port}`);
});
