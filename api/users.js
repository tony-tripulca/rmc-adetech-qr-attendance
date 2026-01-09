const { okay, notFound, badRequest } = require('../lib/response');
const { bodyParser } = require('../lib/body-parser');

module.exports = async (req, res) => {
  const { action, query } = req;


  // POST /api/users/create
  if (req.method === 'POST' && action === 'create') {
    try {
      const body = await bodyParser(req);

      if (!body.name) {
        return badRequest(res, 'name is required');
      }

      return okay(res, {
        message: 'User created',
        user: body
      });
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  // GET /api/users/read?id=123
  if (req.method === 'GET' && action === 'read') {
    if (!query.id) {
      return badRequest(res, 'id is required');
    }

    return okay(res, {
      id: query.id,
      message: 'Read user'
    });
  }

  // PUT / PATCH /api/users/update?id=123
  if (
    (req.method === 'PUT' || req.method === 'PATCH') &&
    action === 'update'
  ) {
    if (!query.id) {
      return badRequest(res, 'id is required');
    }

    return okay(res, {
      id: query.id,
      message: 'User updated'
    });
  }

  // DELETE /api/users/delete?id=123
  if (req.method === 'DELETE' && action === 'delete') {
    if (!query.id) {
      return badRequest(res, 'id is required');
    }

    return okay(res, {
      id: query.id,
      message: 'User deleted'
    });
  }

  return notFound(res, 'Invalid users action or method');
};
