import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { createContext } from 'react';

interface GameContextValues {
  correctAnswers: WordData[],
  incorrectAnswers: WordData[],
  setCorrectAnswers: SetState<WordData[]>,
  setInCorrectAnswers: SetState<WordData[]>,
}

const defaultValue = {
  correctAnswers: [],
  incorrectAnswers: [],
  setCorrectAnswers: () => { },
  setInCorrectAnswers: () => { },
};

const GameContext = createContext<GameContextValues>(defaultValue);

export default GameContext;
