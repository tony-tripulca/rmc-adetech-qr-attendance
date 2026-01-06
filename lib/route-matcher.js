module.exports = (routes, method, url) => {
  for (const route of routes) {
    if (route.method !== method) continue;

    let id = null;

    if (route.path.includes('{id}')) {
      const base = route.path.replace('{id}', '');
      if (url.startsWith(base) && url !== base) {
        const parts = url.split('/');
        const baseParts = base.split('/');
        if (parts.length === baseParts.length + 1) {
          id = parts[parts.length - 1];
          return { handler: route.handler, id }; // only return here
        }
      }
      continue; // skip if no id
    }

    // exact match
    if (url === route.path) {
      return { handler: route.handler, id: null };
    }
  }

  return null;
};
