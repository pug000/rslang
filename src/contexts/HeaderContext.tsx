import SetState from '@/ts/types';
import { createContext } from 'react';

interface HeaderContextValues {
  isLoggedIn: boolean,
  setLoggedIn: SetState<boolean>,
  setToken: SetState<string>,
  setUserId: SetState<string>,
}

const defaultValue = {
  isLoggedIn: false,
  setLoggedIn: () => { },
  setToken: () => { },
  setUserId: () => { },
};

const HeaderContext = createContext<HeaderContextValues>(defaultValue);

export default HeaderContext;
