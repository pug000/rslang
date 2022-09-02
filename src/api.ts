import {
  WordData,
  UserData,
  RegisteredUserData,
  LogInUserData,
  Statistics,
  WordCreateProp,
  GetUserProp,
  FilteredWordData,
  GetNewTokenUserData,
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

    const data: Statistics = await response.json();
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
  console.log('getUser before userId', userId);
  console.log('getUser before token', token);
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}`, {
      method: methods.get,
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

const getNewToken = async (userId: string, refreshToken: string) => {
  console.log('getNewToken before userId', userId);
  console.log('getNewToken before refreshToken', refreshToken);
  try {
    const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.tokens}`, {
      method: methods.get,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const { status } = res;

    if (status === ServerResponses.error403) {
      return status;
    }

    if (status === ServerResponses.error401) {
      return status;
    }
    console.log('status', status);
    const data: GetNewTokenUserData = await res.json();
    console.log('data', data);
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

  if (status === ServerResponses.error401) {
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
    method: methods.get,
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
    method: methods.get,
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
  const res = await fetch(`${baseUrl}/${endpoints.users}/${userId}/${endpoints.aggregatedWords}?wordsPerPage=6000&filter=${filter}`, {
    method: methods.get,
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
    method: methods.get,
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
