const { okay, badRequest, notAllowed } = require('../../lib/response');

module.exports = async (req, res) => {
  if (req.method !== 'PUT' && req.method !== 'PATCH') {
    return notAllowed(res);
  }

  if (!req.query.id) {
    return badRequest(res, 'id is required');
  }

  console.log(req.query);

  const index = users.findIndex(u => u.id === req.query.id);

  if (index === -1) {
    return badRequest(res, 'User not found');
  }

  // PATCH behavior: merge fields
  users[index] = {
    ...users[index],
    ...req.body
  };

  return okay(res, users[index]);
};
