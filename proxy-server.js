// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve local files
app.use('/client_module.js', (req, res) => {
    const localPath = path.resolve(__dirname, 'client_module.js');
    res.setHeader('Content-Type', 'application/javascript');
    fs.createReadStream(localPath).pipe(res);
});

// Proxy everything else
app.use('/', createProxyMiddleware({
    target: 'https://w2-2004.lostcity.rs/rs2.cgi?plugin=0&world=2&lowmem=0',
    changeOrigin: true,
    selfHandleResponse: false,
    onProxyRes(proxyRes, req, res) {
        if (req.url.includes('client_module.js')) {
            // Override handled above
            return;
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy running at http://localhost:${PORT}`);
});