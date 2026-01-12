const { okay, badRequest, notAllowed } = require('../../lib/response');

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') {
    return notAllowed(res);
  }

  if (!req.query.id) {
    return badRequest(res, 'id is required');
  }

  return okay(res, {
    id: req.query.id,
    message: 'User deleted'
  });
};
