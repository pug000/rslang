import { ResponseWord } from '@/ts/interfaces';

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

const getWords = async (group = 0, page = 0) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.words}?group=${group}&page=${page}`, {
      method: methods.get,
    });
    const resObj: ResponseWord = {
      data: await res.json(),
      count: Number(res.headers.get('X-Total-Count'))
    };
    return resObj;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const registerUser = async (userData: { email: string; password: string }) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const content = await res.json();
    const status = await res.status
    console.log(content);
    console.log(status);
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const signInUser = async (userData: { email: string; password: string }) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.signin}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const content = await res.json();
    const status = await res.status
    console.log(content);
    console.log(status);
    return { content, status };
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { baseUrl, getWords, registerUser, signInUser };
