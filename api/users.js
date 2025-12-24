const bodyParser = require('../lib/body-parser');
const { send404 } = require('../lib/response-utils');

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const userService = {
  list: async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  },
  create: async (req, res) => {
    try {
      const data = await bodyParser(req);
      users.push(data);
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
    const user = users.find(u => u.id == id);
    if (!user) {
      send404(res);
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  },
  update: async (req, res, id) => {
    if (id === null) {
      send404(res);
      return;
    }
    const index = users.findIndex(u => u.id == id);
    if (index === -1) {
      send404(res);
      return;
    }
    try {
      const data = await bodyParser(req);
      users[index] = { ...users[index], ...data };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users[index]));
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
    const delIndex = users.findIndex(u => u.id == id);
    if (delIndex === -1) {
      send404(res);
      return;
    }
    users.splice(delIndex, 1);
    res.statusCode = 204;
    res.end();
  }
};

module.exports = userService;
