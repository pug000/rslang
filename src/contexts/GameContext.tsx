import { createContext } from 'react';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

interface GameContextValues {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  token: string,
  userId: string,
  isLoggedIn: boolean,
  isGameStarted: boolean,
  isShowResult: boolean,
  setShowResult: SetState<boolean>,
  setGameStarted: SetState<boolean>,
  setCorrectAnswers: SetState<WordData[]>,
  setIncorrectAnswers: SetState<WordData[]>,
  clearGameState: () => void,
}

const defaultValue = {
  correctAnswers: [],
  incorrectAnswers: [],
  token: '',
  userId: '',
  isLoggedIn: false,
  isGameStarted: false,
  isShowResult: false,
  setShowResult: () => { },
  setGameStarted: () => { },
  setCorrectAnswers: () => { },
  setIncorrectAnswers: () => { },
  clearGameState: () => { },
};

const GameContext = createContext<GameContextValues>(defaultValue);

export default GameContext;
