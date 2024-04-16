export const fetchMediaInfos = async () => {
  const url = '/media.json'
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch media info');
  }

  const data = await response.json();
  return data;
};

export default fetchMediaInfos;
