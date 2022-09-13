import {
  WordData,
  WordCreateProp,
  FilteredWordData
} from '@/ts/interfaces';

const createWordProp = (word: WordData, isDifficultWord: boolean) => {
  const currentWord: WordCreateProp = {
    difficulty: String(word.group),
    optional: {
      isDifficultWord: String(isDifficultWord),
    }
  };
  return currentWord;
};

const сhangeWordsDataKeyFromServer = (arr: FilteredWordData[]) => {
  const WordsDataNewKeyArr: WordData[] = [];
  for (let i = 0; i < arr[0].paginatedResults.length; i += 1) {
    const WordNewKey: WordData = {
      id: String(arr[0].paginatedResults[i]._id),
      ...arr[0].paginatedResults[i]
    };
    WordsDataNewKeyArr.push(WordNewKey);
  }
  return WordsDataNewKeyArr;
};

export {
  createWordProp,
  сhangeWordsDataKeyFromServer
};
