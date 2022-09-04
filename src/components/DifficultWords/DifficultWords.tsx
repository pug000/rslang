import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import BookContext from '@/contexts/BookContext';

import Loader from '@/Loader';
import DifficultWordItem from '@/DifficultWordItem';

import { filterDifficultWords } from '@/utils/variables';
import { getFilteredUserWordsByPage } from '@/api';
import { сhangeWordsDataKeyFromServer } from '@/utils/createCorrectPropResponse';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

import Pagination from '@mui/material/Pagination';

import {
  DifficultWordsWrapper,
  DifficultWordsContainer,
  DifficultWordsTitle,
  Note,
} from './DifficultWords.style';

interface DifficultWordsProps {
  isLoggedIn: boolean | null;
  currentPageDifficult: number,
  setCurrentPageDifficult: SetState<number>,
}

function DifficultWords(
  {
    isLoggedIn,
    currentPageDifficult,
    setCurrentPageDifficult,
  }: DifficultWordsProps
) {
  const {
    difficultWords,
    token,
    userId,
  } = useContext(BookContext);
  const totalCountPagesDifficult = Math.floor(difficultWords.length / 20);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [wordsDifficult, setWordsDifficult] = useState<WordData[]>([]);

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    (async () => {
      setIsLoadingPage(true);
      const wordsDifficultData = await getFilteredUserWordsByPage(
        filterDifficultWords,
        userId,
        token,
        currentPageDifficult
      );

      if (wordsDifficultData && typeof wordsDifficultData !== 'number') {
        const wordsDifficultDataChangeKeys = сhangeWordsDataKeyFromServer([wordsDifficultData[0]]);
        setWordsDifficult(wordsDifficultDataChangeKeys);
        setIsLoadingPage(false);
      }
    })();
  }, [currentPageDifficult]);

  return (
    <DifficultWordsWrapper>
      {isLoggedIn
        && (
          <>
            <DifficultWordsTitle>
              Сложные слова
            </DifficultWordsTitle>
            {!wordsDifficult.length && !isLoadingPage
              && (
                <Note>
                  Вы еще не добавили ни одного сложного слова. Сделать это можно из учебника.
                </Note>
              )}
            {
              totalCountPagesDifficult >= 1
              && (
                <Pagination
                  count={totalCountPagesDifficult + 1}
                  page={currentPageDifficult + 1}
                  disabled={isLoadingPage}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  sx={
                    {
                      display: 'grid',
                      gridArea: 'paginationTop',
                      justifySelf: 'center',
                    }
                  }
                  onChange={(_, value) => setCurrentPageDifficult(value - 1)}
                />
              )
            }
            <DifficultWordsContainer>
              {isLoadingPage
                ? ((
                  <Loader />
                )) : wordsDifficult.map((word) => (
                  <DifficultWordItem
                    key={word.id}
                    item={word}
                    audio={audio}
                    setNewAudio={(value: HTMLAudioElement | null) => setAudio(value)}
                  />
                ))}
            </DifficultWordsContainer>
            {
              totalCountPagesDifficult >= 1
              && (
                <Pagination
                  count={totalCountPagesDifficult + 1}
                  page={currentPageDifficult + 1}
                  disabled={isLoadingPage}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  sx={
                    {
                      display: 'grid',
                      gridArea: 'paginationTop',
                      justifySelf: 'center',
                    }
                  }
                  onChange={(_, value) => setCurrentPageDifficult(value - 1)}
                />
              )
            }
          </>
        )}
    </DifficultWordsWrapper>
  );
}

export default DifficultWords;
