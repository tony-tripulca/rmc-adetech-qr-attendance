module.exports = (routes, method, url) => {
  for (const route of routes) {
    if (route.method === method) {
      let id = null;
      if (route.path.includes('{id}')) {
        const base = route.path.replace('{id}', '');
        if (url.startsWith(base) && url !== base) {
          const parts = url.split('/');
          const baseParts = base.split('/');
          if (parts.length === baseParts.length + 1) {
            id = parts[parts.length - 1];
          }
        }
      } else if (url === route.path) {
        // exact match
      } else {
        continue;
      }
      return { handler: route.handler, id };
    }
  }
  return null;
};