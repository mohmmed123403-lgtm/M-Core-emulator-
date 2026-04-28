import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

export function cacheMiddleware(req, res, next) {
  const key = req.query.q;
  const cached = cache.get(key);
  if (cached) return res.send(cached);
  
  const originalSend = res.send;
  res.send = function(body) {
    cache.set(key, body);
    originalSend.call(this, body);
  };
  next();
}