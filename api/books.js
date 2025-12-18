const books = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'You Don\'t Know JS' }
];

module.exports = function bookService(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end('Method Not Allowed');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(books));
};
