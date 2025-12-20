const bodyParser = require('../lib/body-parser');
const parseUrl = require('../lib/url-parser');
const { send404, send405 } = require('../lib/response-utils');

const books = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'You Don\'t Know JS' }
];

module.exports = async function bookService(req, res) {
  const parsed = parseUrl(req.url);

  if (!parsed) {
    send404(res);
    return;
  }

  const { action, id } = parsed;

  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
    send405(res, 'GET, POST, PUT');
    return;
  }

  // GET /api/books/list
  if (action === 'list') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(books));
    return;
  }

  // GET /api/books/read/:id
  if (action === 'read' && id !== null) {
    const book = books.find(b => b.id === id);

    if (!book) {
      send404(res);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(book));
    return;
  }

  // POST /api/books/create
  if (action === 'create') {
    try {
      const data = await bodyParser(req);

      books.push(data);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return;

    } catch (err) {
      res.statusCode = 400;
      res.end(err.message);
      return;
    }
  }

  // PUT /api/books/update/:id
  if (action === 'update' && id !== null) {
    const book = books.find(b => b.id === id);

    if (!book) {
      send404(res);
      return;
    }

    try {
      const data = await bodyParser(req);
      books[index] = { ...books[index], ...data };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(books[index]));
      return;
    } catch (err) {
      res.statusCode = 400;
      res.end(err.message);
      return;
    }
  }

  send404(res);
  return;
}
