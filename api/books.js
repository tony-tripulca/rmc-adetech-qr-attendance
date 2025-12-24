const bodyParser = require('../lib/body-parser');
const { send404 } = require('../lib/response-utils');

const books = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'You Don\'t Know JS' }
];

const bookService = {
  list: async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(books));
  },
  create: async (req, res) => {
    try {
      const data = await bodyParser(req);
      books.push(data);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    } catch (err) {
      res.statusCode = 400;
      res.end(err.message);
    }
  },
  read: async (req, res, id) => {
    if (id === null) {
      send404(res);
      return;
    }
    const book = books.find(b => b.id == id);
    if (!book) {
      send404(res);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(book));
  },
  update: async (req, res, id) => {
    if (id === null) {
      send404(res);
      return;
    }
    const index = books.findIndex(b => b.id == id);
    if (index === -1) {
      send404(res);
      return;
    }
    try {
      const data = await bodyParser(req);
      books[index] = { ...books[index], ...data };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(books[index]));
    } catch (err) {
      res.statusCode = 400;
      res.end(err.message);
    }
  },
  delete: async (req, res, id) => {
    if (id === null) {
      send404(res);
      return;
    }
    const index = books.findIndex(b => b.id == id);
    if (index === -1) {
      send404(res);
      return;
    }
    books.splice(index, 1);
    res.statusCode = 204;
    res.end();
  }
};

module.exports = bookService;
