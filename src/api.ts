import {
  WordData, UserData, RegisteredUserData, LogInUserData, Statistics, WordCreateProp,
  GetUserProp, FilteredWordData,
} from '@/ts/interfaces';
import ServerResponses from './ts/enums';

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

    if (status === ServerResponses.error404) {
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

const getUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === ServerResponses.error401) {
      const { status } = res;
      return status;
    }
    if (res.status === ServerResponses.error404) {
      const { status } = res;
      return status;
    }
    const content: GetUserProp = await res.json();
    return content;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getNewToken = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/tokens`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === ServerResponses.error403) {
      const { status } = res;
      return status;
    } if (res.status === ServerResponses.error401) {
      const { status } = res;
      return status;
    }
    const content: LogInUserData = await res.json();
    return content;
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
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words/${wordId}`, {
    method: methods.post,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  if (res.status === ServerResponses.response200) {
    const { status } = res;
    return status;
  } if (res.status === ServerResponses.error417) {
    const { status } = res;
    return status;
  }
  return null;
};

const deleteUserWord = async (wordId: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words/${wordId}`, {
    method: methods.delete,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  if (res.status === ServerResponses.response204) {
    const { status } = res;
    return status;
  } if (res.status === ServerResponses.error401) {
    const { status } = res;
    return status;
  }
  return null;
};

const getUserWords = async (userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    return status;
  }
  const content: WordCreateProp = await res.json();
  return content;
};

const getUserWord = async (wordId: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    return status;
  } if (res.status === ServerResponses.error404) {
    const { status } = res;
    return status;
  } if (res.status === ServerResponses.error417) {
    const { status } = res;
    return status;
  }
  const content: WordCreateProp = await res.json();
  return content;
};

const getFilteredUserWords = async (filter: string, userId: string, token: string) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/aggregatedWords?wordsPerPage=6000&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    return status;
  }
  const content: FilteredWordData[] = await res.json();
  return content;
};

const getFilteredUserWordsByPage = async (
  filter: string,
  userId: string,
  token: string,
  page = 0,
) => {
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/aggregatedWords?page=${page}&wordsPerPage=20&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  if (res.status === ServerResponses.error402) {
    const { status } = res;
    return status;
  }
  const content: FilteredWordData[] = await res.json();
  return content;
};

export {
  baseUrl, endpoints, getWords, registerUser, loginUser,
  updateUserStatistics, getUserStatistics, getUser, getUserWords,
  getNewToken, createUserWord, deleteUserWord, getFilteredUserWords, getUserWord,
  getFilteredUserWordsByPage
};
