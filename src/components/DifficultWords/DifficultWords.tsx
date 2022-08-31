import { FilteredWordData, WordData } from '@/ts/interfaces';
import React, { useContext, useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import Pagination from '@mui/material/Pagination';
import SetState from '@/ts/types';
import { FILTER_DIFFICULT_WORDS, groupBtns, totalCountPages } from '@/utils/variables';
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
import { ChangeWordsDataKeyFromServer } from '@/utils/createCorrectPropResponse';

interface DifficultWordsProps {
  isLoggedIn: boolean | null;
  currentPage: number,
  groupNumber: number,
  words: WordData[],
  setWords: SetState<WordData[]>,
  setCurrentPage: SetState<number>,
  setGroupNumber: SetState<number>,
}

function DifficultWords({
  isLoggedIn, currentPage,
  groupNumber,
  words,
  setWords,
  setCurrentPage,
  setGroupNumber,
}: DifficultWordsProps) {
  if (!isLoggedIn) return null;

  const {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords,
    token,
    userId,
  } = useContext(WordItemContext);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // useEffect(() => {
  //   audio?.remove();
  //   setAudio(null);

  //   (async () => {
  //     setIsLoadingPage(true);
  //     const difficultWordsData = await getFilteredUserWords(FILTER_DIFFICULT_WORDS, userId, token);

  //     if (difficultWordsData && typeof difficultWordsData !== 'number') {
  //       const difficultWordsChangeKeys = ChangeWordsDataKeyFromServer([difficultWordsData[0]]);
  //       setDifficultWords(difficultWordsChangeKeys);
  //       setIsLoadingPage(false);
  //     }
  //     console.log('difficultWords', difficultWords);
  //   })();
  // }, [groupNumber, currentPage]);

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
