const isRoot = url => {
  if (url === "/") return true
  return false
}

const isProducts = url => {
  return /^\/products/.test(url);
};

const cacheMiddleware = (req, res, next) => {
  if (isRoot(req.url) || isProducts(req.url)) {
    res.header('Cache-Control', `max-age=${3600}`);
  }
  next();
};

module.exports = cacheMiddleware;