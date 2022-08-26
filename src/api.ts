import {
  WordData, UserData, RegisteredUserData, LogInUserData
} from '@/ts/interfaces';
import StatusError from './ts/enums';

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
    const data: WordData[] = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const registerUser = async (userData: UserData) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (res.status === StatusError.error417 || res.status === StatusError.error422) {
      const { status } = res;
      return status;
    }
    const content: RegisteredUserData = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const loginUser = async (userData: UserData) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.signin}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (res.status === StatusError.error403 || res.status === StatusError.error404) {
      const { status } = res;
      return status;
    }
    const content: LogInUserData = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export {
  baseUrl, endpoints, getWords, registerUser, loginUser
};
