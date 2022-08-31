import { createContext } from 'react';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

interface BookContextValues {
  difficultWords: WordData[],
  learnedWords: WordData[],
  setDifficultWords: SetState<WordData[]>,
  setLearnedWords: SetState<WordData[]>,
}

const defaultValue = {
  difficultWords: [],
  learnedWords: [],
  setDifficultWords: () => { },
  setLearnedWords: () => { },
};

const BookContext = createContext<BookContextValues>(defaultValue);

export default BookContext;
