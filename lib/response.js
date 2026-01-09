function send(res, statusCode, data, contentType = 'application/json') {
  res.writeHead(statusCode, { 'Content-Type': contentType });

  if (contentType === 'application/json') {
    res.end(JSON.stringify(data));
  } else {
    res.end(data);
  }
}

function okay(res, data) {
  send(res, 200, data);
}

function notFound(res, message = 'Not Found') {
  send(res, 404, { error: message });
}

function badRequest(res, message = 'Bad Request') {
  send(res, 400, { error: message });
}

function notAllowed(res, message = 'Method Not Allowed') {
  send(res, 405, { error: message });
}

module.exports = {
  send,
  okay,
  notFound,
  badRequest,
  notAllowed
};
