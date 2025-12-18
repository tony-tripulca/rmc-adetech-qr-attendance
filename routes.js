const userService = require('./api/users');
const bookService = require('./api/books');

module.exports = routes = {
  '/api/users': userService,
  '/api/books': bookService,
};