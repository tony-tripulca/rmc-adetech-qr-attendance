module.exports = function parseUrl(url) {
  const parts = url.split('/').filter(part => part !== '');

  if (parts.length >= 3 && parts[0] === 'api' && parts[1] === 'books') {
    const action = parts[2];
    const id = parts.length === 4 ? parseInt(parts[3]) : null;
    return { action, id };
  }

  return null;
};