import { WordData, WordCreateProp, FilteredWordData } from '@/ts/interfaces';

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
      group: arr[0].paginatedResults[i].group,
      page: arr[0].paginatedResults[i].page,
      word: String(arr[0].paginatedResults[i].word),
      image: String(arr[0].paginatedResults[i].image),
      audio: String(arr[0].paginatedResults[i].audio),
      audioMeaning: String(arr[0].paginatedResults[i].audioMeaning),
      audioExample: String(arr[0].paginatedResults[i].audioExample),
      textMeaning: String(arr[0].paginatedResults[i].textMeaning),
      textExample: String(arr[0].paginatedResults[i].textExample),
      transcription: String(arr[0].paginatedResults[i].transcription),
      wordTranslate: String(arr[0].paginatedResults[i].wordTranslate),
      textMeaningTranslate: String(arr[0].paginatedResults[i].textMeaningTranslate),
      textExampleTranslate: String(arr[0].paginatedResults[i].textExampleTranslate),
    };
    WordsDataNewKeyArr.push(WordNewKey);
  }
  return WordsDataNewKeyArr;
};

export {
  createWordProp,
  сhangeWordsDataKeyFromServer
};
