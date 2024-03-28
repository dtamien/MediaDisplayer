import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('File server is running on http://localhost:3000');
});
