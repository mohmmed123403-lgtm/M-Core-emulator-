export function destroySearch(query) {
  if (!query.includes('.') || query.includes(' ')) {
    return `https://www.bing.com/search?q=${encodeURIComponent(query)}&ensearch=1`;
  }
  return query.startsWith('http') ? query : 'https://' + query;
}