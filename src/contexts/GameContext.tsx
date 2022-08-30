import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { createContext } from 'react';

interface GameContextValues {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  token: string,
  userId: string,
  isLoggedIn: boolean,
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
  setCorrectAnswers: () => { },
  setIncorrectAnswers: () => { },
  clearGameState: () => { },
};

const GameContext = createContext<GameContextValues>(defaultValue);

export default GameContext;
