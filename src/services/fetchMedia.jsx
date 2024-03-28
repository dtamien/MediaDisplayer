const fetchMedia = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch media files');
  }

  const data = await response.json();
  return data.mediaPaths.map(path => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  });
};

export default fetchMedia;
