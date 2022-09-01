import {
  defaultStatistics,
  todayDate
} from '@/utils/variables';

import {
  WordData,
  UserData,
  RegisteredUserData,
  LogInUserData,
  Statistics,
  WordCreateProp,
  GetUserProp,
  FilteredWordData,
} from '@/ts/interfaces';
import ServerResponses from '@/ts/enums';

const baseUrl = 'https://lang-learnwords.herokuapp.com';

const endpoints = {
  words: 'words',
  users: 'users',
  signin: 'signin',
  tokens: 'tokens',
  aggregatedWords: 'aggregatedWords',
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
    const response = await fetch(`${baseUrl}/${endpoints.words}?group=${group}&page=${page}`, {
      method: methods.get,
    });
    const data: WordData[] = await response.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateUserStatistics = async (userId: string, token: string, body: Statistics) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.statistics}`, {
      method: methods.put,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const { status } = response;

    return status;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getUserStatistics = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.statistics}`, {
      method: methods.get,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const { status } = response;
    const data: Statistics = await response.json();

    if (status === ServerResponses.error404) {
      return defaultStatistics;
    }

    if (todayDate !== data.optional.date) {
      const newStatistics: Statistics = {
        ...data,
        optional: {
          ...defaultStatistics.optional,
        }
      };

      return newStatistics;
    }

    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const registerUser = async (userData: UserData) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoints.users}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const { status } = response;

    if (status === ServerResponses.error417
      || status === ServerResponses.error422) {
      return status;
    }

    const data: RegisteredUserData = await response.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const loginUser = async (userData: UserData) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoints.signin}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const { status } = response;

    if (status === ServerResponses.error403
      || status === ServerResponses.error404) {
      return status;
    }

    const data: LogInUserData = await response.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const { status } = res;

    if (status === ServerResponses.error401) {
      return status;
    }

    if (status === ServerResponses.error404) {
      return status;
    }

    const data: GetUserProp = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getNewToken = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.tokens}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const { status } = res;

    if (status === ServerResponses.error403) {
      return status;
    }

    if (status === ServerResponses.error401) {
      return status;
    }

    const data: LogInUserData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const createUserWord = async (
  wordId: string,
  word: WordCreateProp,
  userId: string,
  token: string
) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.words}/${wordId}`, {
    method: methods.post,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const { status } = res;

  if (status === ServerResponses.response200) {
    return status;
  }

  if (status === ServerResponses.error417) {
    return status;
  }

  return null;
};

const deleteUserWord = async (wordId: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.words}/${wordId}`, {
    method: methods.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const { status } = res;

  if (status === ServerResponses.response204) {
    return status;
  }

  if (status === ServerResponses.error401) {
    return status;
  }

  return null;
};

const getUserWords = async (userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.words}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const { status } = res;

  if (status === ServerResponses.error402) {
    return status;
  }

  const data: WordCreateProp = await res.json();
  return data;
};

const getUserWord = async (wordId: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  const { status } = res;

  if (status === ServerResponses.error402) {
    return status;
  }

  if (status === ServerResponses.error404) {
    return status;
  }

  if (status === ServerResponses.error417) {
    return status;
  }

  const data: WordCreateProp = await res.json();
  return data;
};

const getFilteredUserWords = async (filter: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/aggregatedWords?wordsPerPage=6000&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  const { status } = res;

  if (status === ServerResponses.error402) {
    return status;
  }

  const data: FilteredWordData[] = await res.json();
  return data;
};

const getFilteredUserWordsByPage = async (
  filter: string,
  userId: string,
  token: string,
  page = 0,
) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.aggregatedWords}?page=${page}&wordsPerPage=20&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  const { status } = res;

  if (status === ServerResponses.error402) {
    return status;
  }

  const data: FilteredWordData[] = await res.json();
  return data;
};

export {
  baseUrl,
  endpoints,
  getWords,
  registerUser,
  loginUser,
  updateUserStatistics,
  getUserStatistics,
  getUser,
  getUserWords,
  getNewToken,
  createUserWord,
  deleteUserWord,
  getFilteredUserWords,
  getUserWord,
  getFilteredUserWordsByPage
};
