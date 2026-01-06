const { send404, send405 } = require('./lib/response-utils');
const matchRoute = require('./lib/route-matcher');
const userService = require('./api/users');
const bookService = require('./api/books');

const routes = [
  { method: 'GET', path: '/api/users', handler: userService.list },
  { method: 'POST', path: '/api/users', handler: userService.create },
  { method: 'GET', path: '/api/users/{id}', handler: userService.read },
  { method: 'PUT', path: '/api/users/{id}', handler: userService.update },
  { method: 'DELETE', path: '/api/users/{id}', handler: userService.delete },
  { method: 'GET', path: '/api/books', handler: bookService.list },
  { method: 'POST', path: '/api/books', handler: bookService.create },
  { method: 'GET', path: '/api/books/{id}', handler: bookService.read },
  { method: 'PUT', path: '/api/books/{id}', handler: bookService.update },
  { method: 'DELETE', path: '/api/books/{id}', handler: bookService.delete },
];

module.exports = async function router(req, res) {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    send405(res, 'GET, POST, PUT, DELETE');
    return;
  }

  // ignore query strings
  const originalUrl = req.url.split('?')[0];

  // try matching as-is (localhost)
  let match = matchRoute(routes, req.method, originalUrl);

  // if not found, try stripping /api (Vercel)
  if (!match && originalUrl.startsWith('/api/')) {
    const strippedUrl = originalUrl.slice(4);
    match = matchRoute(routes, req.method, strippedUrl);
  }

  if (!match) {
    send404(res);
    return;
  }

  return match.handler(req, res, match.id);
};

