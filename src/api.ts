import {
  WordData, UserData, RegisteredUserData, LogInUserData, WordCreateProp, GetUserProp, FilteredWordData,
} from '@/ts/interfaces';
import ServerResponses from './ts/enums';

const baseUrl = 'https://lang-learnwords.herokuapp.com';

const tokenLocal = window.localStorage.getItem('token')?.slice(1, length - 1);
const userIdLocal = window.localStorage.getItem('userId')?.slice(1, length - 1);

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
    if (res.status === ServerResponses.error417 || res.status === ServerResponses.error422) {
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
    if (res.status === ServerResponses.error403 || res.status === ServerResponses.error404) {
      const { status } = res;
      return status;
    }
    const content: LogInUserData = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getUser = async (userId: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenLocal}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === ServerResponses.error401) {
      const { status } = res;
      console.log('need token');
      return status;
    }
    if (res.status === ServerResponses.error404) {
      const { status } = res;
      console.log('not found');
      return status;
    }
    const content: GetUserProp = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getNewToken = async (userId: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/tokens`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${tokenLocal}`,
      },
    });
    if (res.status === ServerResponses.error403) {
      const { status } = res;
      console.log('Access token is missing, expired or invalid');
      return status;
    } if (res.status === ServerResponses.error401) {
      const { status } = res;
      console.log('unauthorized');
      return status;
    }
    const content: LogInUserData = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const createUserWord = async (wordId: string, word: WordCreateProp) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userIdLocal}/words/${wordId}`, {
    method: methods.post,
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  if (res.status === ServerResponses.response200) {
    const { status } = res;
    console.log('word created');
    return status;
  } if (res.status === ServerResponses.error417) {
    const { status } = res;
    console.log('word already exist');
    return status;
  }
  return null;
};

const deleteUserWord = async (wordId: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userIdLocal}/words/${wordId}`, {
    method: methods.delete,
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  if (res.status === ServerResponses.response204) {
    const { status } = res;
    console.log('word delete complite');
    return status;
  } if (res.status === ServerResponses.error401) {
    const { status } = res;
    console.log('need token');
    return status;
  }
  return null;
};

const getUserWords = async (userId: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    console.log('need token');
    return status;
  }
  const content: WordCreateProp = await res.json();
  console.log('get words');
  return content;
};

const getUserWord = async (wirdId: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userIdLocal}/words/${wirdId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
      Accept: 'application/json',
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    console.log('need token');
    return status;
  } if (res.status === ServerResponses.error404) {
    const { status } = res;
    console.log('not found');
    return status;
  } if (res.status === ServerResponses.error417) {
    const { status } = res;
    console.log('already exist');
    return status;
  }
  const content: WordCreateProp = await res.json();
  console.log('get word');
  return content;
};

const getFilteredUserWords = async (filter: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userIdLocal}/aggregatedWords?filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenLocal}`,
      Accept: 'application/json',
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    console.log('need token');
    return status;
  }
  const content: FilteredWordData[] = await res.json();
  console.log('getFilteredUserWords', content);
  return content;
};

export {
  baseUrl, endpoints, getWords, registerUser, loginUser, getUser, getUserWords,
  getNewToken, createUserWord, deleteUserWord, getFilteredUserWords, getUserWord
};
