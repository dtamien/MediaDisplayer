export const fetchMedia = async () => {
  const url = 'http://localhost:29870/media';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch media list');
  }

  const data = await response.json();
  return data.mediaPaths.map(path => {
    const parts = path.split('/');
    return parts.pop();
  });
};
