import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { createContext } from 'react';

interface WordItemContextValues {
  difficultWords: WordData[],
  learnedWords: WordData[],
  setDifficultWords: SetState<WordData[]>,
  setLearnedWords: SetState<WordData[]>,
  token: string,
  userId: string,
}

const defaultValue = {
  difficultWords: [],
  learnedWords: [],
  setDifficultWords: () => { },
  setLearnedWords: () => { },
  token: '',
  userId: '',
};

const WordItemContext = createContext<WordItemContextValues>(defaultValue);

export default WordItemContext;
