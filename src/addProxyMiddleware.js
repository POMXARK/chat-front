const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function addProxyMiddleware(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:80',
            changeOrigin: true,
        }),
    );
};