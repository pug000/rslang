const baseUrl = 'https://react-learnwords-example.herokuapp.com';

const endpoints = {
  words: 'words',
  users: 'users',
  signin: 'signin',
  tokens: 'tokens',
  aggreagatedWords: 'aggregatedWords',
  statistics: 'statistics',
  settings: 'settings'
};

const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

const getWords = async () => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.words}`, {
      method: methods.get,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { baseUrl, getWords };
