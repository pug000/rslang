import { createContext } from 'react';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

interface GameContextValues {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  countCorrectAnswers: number,
  maxCountCorrectAnswers: number,
  token: string,
  userId: string,
  isLoggedIn: boolean,
  isGameStarted: boolean,
  isShowResult: boolean,
  setShowResult: SetState<boolean>,
  setGameStarted: SetState<boolean>,
  setCorrectAnswers: SetState<WordData[]>,
  setIncorrectAnswers: SetState<WordData[]>,
  setCountCorrectAnswers: SetState<number>,
  setMaxCountCorrectAnswers: SetState<number>,
  clearGameState: () => void,
}

const defaultValue = {
  correctAnswers: [],
  incorrectAnswers: [],
  countCorrectAnswers: 0,
  maxCountCorrectAnswers: 0,
  token: '',
  userId: '',
  isLoggedIn: false,
  isGameStarted: false,
  isShowResult: false,
  setShowResult: () => { },
  setGameStarted: () => { },
  setCorrectAnswers: () => { },
  setIncorrectAnswers: () => { },
  setCountCorrectAnswers: () => { },
  setMaxCountCorrectAnswers: () => { },
  clearGameState: () => { },
};

const GameContext = createContext<GameContextValues>(defaultValue);

export default GameContext;
