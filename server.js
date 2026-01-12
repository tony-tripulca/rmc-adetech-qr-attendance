const staticServer = require('./lib/static');
const apiRouter = require('./lib/router');

const STATIC_PORT = 3000;
const API_PORT = 8000;

/* START SERVERS */
staticServer.listen(STATIC_PORT, () => {
  console.log(`Static server running at http://localhost:${STATIC_PORT}`);
});

apiRouter.listen(API_PORT, () => {
  console.log(`API server running at http://localhost:${API_PORT}`);
});
