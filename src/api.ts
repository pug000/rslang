
import { WordData, UserData, SingUpUserData, SignInUserData } from '@/ts/interfaces';

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

const registerOrSingInUser = async (userData: UserData, endpoint: string, buttonId: string) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: methods.post,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (res.status === 200) {
      if (buttonId === 'signIn') {
        const content: SignInUserData = {
          content: await res.json(),
          status: res.status,
        }
        return content;
      } else if (buttonId === 'signUp') {
        const content: SingUpUserData = await res.json();
        return content;
      } else if (buttonId === 'signOut') {
        const content: SignInUserData = {
          content: await res.json(),
          status: res.status,
        }
        return content;
      }
    }
    else {
      const { status } = res;
      return status
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export { baseUrl, endpoints, getWords, registerOrSingInUser };
