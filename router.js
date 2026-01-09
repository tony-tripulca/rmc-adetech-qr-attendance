const http = require('http');
const path = require('path');
const { notFound } = require('./lib/response');

const router = http.createServer((req, res) => {
  try {
    // strip leading slash
    const filePath = req.url.split('?')[0].replace(/^\/+/, '');

    // api/users/list → api/users/list.js
    const handler = require(path.join(__dirname, filePath));

    return handler(req, res);
  } catch (err) {
    console.error(err);
    return notFound(res);
  }
});

module.exports = router;
