import {
  WordData, UserData, RegisteredUserData, LogInUserData, Statistics, GameStatistics
} from '@/ts/interfaces';
import StatusError from './ts/enums';

const baseUrl = 'https://lang-learnwords.herokuapp.com';

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

const updateUserStatistics = async (userId: string, token: string, body: Statistics) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.statistics}`, {
      method: methods.put,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const { status } = res;

    return status;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getUserStatistics = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.statistics}`, {
      method: methods.get,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const { status } = res;

    if (status === StatusError.error404) {
      const defaultData: Statistics = {
        learnedWords: 0,
        optional: {
          audio: {
            gameLearnedWords: 0,
            percentCorrectWord: 0,
            correctAnswersCount: 0,
          },
          sprint: {
            gameLearnedWords: 0,
            percentCorrectWord: 0,
            correctAnswersCount: 0,
          }
        }
      };

      return defaultData;
    }

    const data: Statistics = await res.json();
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
  baseUrl, endpoints, getWords, registerUser, loginUser,
  updateUserStatistics, getUserStatistics,
};
