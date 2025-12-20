const send404 = (res) => {
  res.statusCode = 404;
  res.end('Not Found');
};

const send405 = (res, allowed) => {
  res.statusCode = 405;
  res.setHeader('Allow', allowed);
  res.end('Method Not Allowed');
};

module.exports = { send404, send405 };