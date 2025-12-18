const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

app.use('/sap', createProxyMiddleware({
  target: 'http://172.17.19.24:8000',
  changeOrigin: true,
  headers: {
    'Authorization': 'Basic SzkwMTgxMzpOaXRoaWVzaEAxMA==',
    'sap-client': '100'
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});