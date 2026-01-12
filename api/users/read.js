const { badRequest, okay, notAllowed } = require('../../lib/response');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return notAllowed(res);
  }

  const { query } = req;

  if (!query.id) {
    return badRequest(res, 'id is required');
  }

  return okay(res, {
    id: query.id,
    message: 'Read user'
  });
};
