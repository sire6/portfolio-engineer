// Custom proxy setup for Create React App
// Only proxy API requests, not static files
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/send-telegram',
    createProxyMiddleware({
      target: 'http://backend:3001',
      changeOrigin: true,
    })
  );
};
