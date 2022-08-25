import { SetState } from '@/ts/types';
import { createContext } from 'react';

interface HeaderContextValues {
  isLoggedIn: boolean,
  isGameStarted: boolean,
  setIsLoggedIn: SetState<boolean>,
  setIsGameStarted: SetState<boolean>,
}

const defaultValue = {
  isLoggedIn: false,
  isGameStarted: false,
  setIsLoggedIn: () => { },
  setIsGameStarted: () => { },
};

const HeaderContext = createContext<HeaderContextValues>(defaultValue);

export default HeaderContext;
