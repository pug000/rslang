import { FilteredWordData, WordData } from '@/ts/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import Pagination from '@mui/material/Pagination';
import SetState from '@/ts/types';
import { groupBtns, totalCountPages } from '@/utils/variables';
import { getFilteredUserWords, getWords } from '@/api';
import Loader from '@/Loader';
import Button from '@/Button';
import { NavLink } from 'react-router-dom';
import WordItemContext from '@/contexts/WordItemContext';
import { DifficultWordsContainer, DifficultWordsTitle } from './DifficultWords.style';
import {
  BookContainer, Group, GroupBtn, Title, Wrapper, GamesWrapper,
  WordsContainer, Note
} from '../Book/Book.style';
import WordElem from './DifficultWordItem';

interface DifficultWordsProps {
  isLoggedIn: boolean | null;
  currentPage: number,
  groupNumber: number,
  words: WordData[],
  setWords: SetState<WordData[]>,
  setCurrentPage: SetState<number>,
  setGroupNumber: SetState<number>,
  changeGameState: (value: boolean) => void,
}
interface BookProps {
  currentPage: number,
  groupNumber: number,
  words: WordData[],
  setWords: SetState<WordData[]>,
  setCurrentPage: SetState<number>,
  setGroupNumber: SetState<number>,
  changeGameState: (value: boolean) => void,
}

function DifficultWords({
  isLoggedIn, currentPage,
  groupNumber,
  words,
  setWords,
  setCurrentPage,
  setGroupNumber,
  changeGameState,
}: DifficultWordsProps) {
  if (!isLoggedIn) return null;

  const {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords
  } = useContext(WordItemContext);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const FILTER_DIFFICULT_WORDS = encodeURIComponent('{"userWord.optional.isDifficultWord":"true"}');

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    (async () => {
      setIsLoadingPage(true);
      const difficultWordsData = await getFilteredUserWords(FILTER_DIFFICULT_WORDS);

      if (difficultWordsData && typeof difficultWordsData !== 'number') {
        const ChangeWordsDataKeyFromServer = (arr: FilteredWordData[]) => {
          const WordsDataNewKeyArr: WordData[] = [];
          for (let i = 0; i < arr[0].paginatedResults.length; i + 1) {
            const WordNewKey: WordData = {
              // eslint-disable-next-line no-underscore-dangle
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
        const difficultWordsChangeKeys = ChangeWordsDataKeyFromServer([difficultWordsData[0]]);
        setTimeout(() => {
          setDifficultWords(difficultWordsChangeKeys);
          setIsLoadingPage(false);
        }, 500);
      }
      console.log('difficultWords', difficultWords);
    })();
  }, [groupNumber, currentPage]);

  return (
    <DifficultWordsContainer>
      {isLoggedIn
        && (
          <>
            <DifficultWordsTitle>
              Сложные слова
            </DifficultWordsTitle>
            <WordsContainer>
              {isLoadingPage
                ? ((
                  <Loader />
                )) : difficultWords.map((word) => (
                  <WordElem
                    key={word.id}
                    item={word}
                    audio={audio}
                    setNewAudio={(value: HTMLAudioElement | null) => setAudio(value)}
                  />
                ))}
            </WordsContainer>
          </>
        )}
    </DifficultWordsContainer>
  );
}

export default DifficultWords;
