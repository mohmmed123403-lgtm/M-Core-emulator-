import express from 'express';
import fetch from 'node-fetch';
import compression from 'compression';
import { cacheMiddleware } from './Lightning-Cache.js';
import { destroySearch } from './Search-Destroyer.js';
import { obliterateHeaders } from './Firewall-God.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.json());

app.get('/mcore/titan', cacheMiddleware, async (req, res) => {
  const target = req.query.q;
  if (!target) return res.status(400).send('M-Core-Titan: Missing q');

  try {
    let url = destroySearch(decodeURIComponent(target));
    const response = await fetch(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 M-Core-Titan/3.0',
        'Referer': 'https://www.google.com/'
      }
    });
    
    let html = await response.text();
    html = obliterateHeaders(html, req, url);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.send(html);
  } catch (e) {
    res.status(500).send(`Titan Error: ${e.message}`);
  }
});

app.listen(PORT, () => console.log(`M-Core-Titan شغال على ${PORT}`));