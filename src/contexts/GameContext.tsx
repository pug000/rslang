import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { createContext } from 'react';

interface GameContextValues {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  setCorrectAnswers: SetState<WordData[]>,
  setIncorrectAnswers: SetState<WordData[]>,
  clearGameState: () => void,
}

const defaultValue = {
  correctAnswers: [],
  incorrectAnswers: [],
  setCorrectAnswers: () => { },
  setIncorrectAnswers: () => { },
  clearGameState: () => { },
};

const GameContext = createContext<GameContextValues>(defaultValue);

export default GameContext;
