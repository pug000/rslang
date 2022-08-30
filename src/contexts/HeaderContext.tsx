import SetState from '@/ts/types';
import { createContext } from 'react';

interface HeaderContextValues {
  isLoggedIn: boolean,
  isGameStarted: boolean,
  setIsLoggedIn: SetState<boolean>,
  setIsGameStarted: SetState<boolean>,
  setToken: SetState<string>,
  setUserId: SetState<string>,
}

const defaultValue = {
  isLoggedIn: false,
  isGameStarted: false,
  setIsLoggedIn: () => { },
  setIsGameStarted: () => { },
  setToken: () => { },
  setUserId: () => { },
};

const HeaderContext = createContext<HeaderContextValues>(defaultValue);

export default HeaderContext;
