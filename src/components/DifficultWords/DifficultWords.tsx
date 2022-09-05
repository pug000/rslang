import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import BookContext from '@/contexts/BookContext';

import Loader from '@/Loader';
import DifficultWordItem from '@/DifficultWordItem';

import { filterDifficultWords } from '@/utils/variables';
import calculationTotalCountPages from '@/utils/calculationTotalCountPages';
import { getFilteredUserWordsByPage } from '@/api';
import { сhangeWordsDataKeyFromServer } from '@/utils/createCorrectPropResponse';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

import Pagination from '@mui/material/Pagination';
import { useMediaQuery } from '@mui/material';

import ServerResponses from '@/ts/enums';

import {
  DifficultWordsWrapper,
  DifficultWordsContainer,
  DifficultWordsTitle,
  Note,
  LoaderWrapper
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [wordsDifficultPerPage, setWordsDifficultPerPage] = useState<WordData[]>([]);
  const totalCountPagesDifficult = calculationTotalCountPages(difficultWords);

  useEffect(() => {
    if (isLoggedIn && difficultWords.length <= 20) {
      setCurrentPageDifficult(0);
    }
  }, [difficultWords]);

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    if (isLoggedIn) {
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
          setWordsDifficultPerPage(wordsDifficultDataChangeKeys);
          setIsLoadingPage(false);
        } else if (wordsDifficultData === ServerResponses.error401) {
          window.location.reload();
        }
      })();
    }
  }, [currentPageDifficult, totalCountPagesDifficult]);

  const matchesMediaQuery = useMediaQuery('(max-width:560px)');

  return (
    <DifficultWordsWrapper>
      {isLoggedIn
        && (
          <>
            <DifficultWordsTitle>
              Сложные слова
            </DifficultWordsTitle>
            {!wordsDifficultPerPage.length && !isLoadingPage
              && (
                <Note>
                  Вы еще не добавили ни одного сложного слова. Сделать это можно из учебника.
                </Note>
              )}
            {
              totalCountPagesDifficult > 1
              && (
                <Pagination
                  count={totalCountPagesDifficult}
                  page={currentPageDifficult + 1}
                  disabled={isLoadingPage}
                  variant="outlined"
                  shape="rounded"
                  size={matchesMediaQuery ? 'small' : 'large'}
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
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                )) : wordsDifficultPerPage.map((word) => (
                  <DifficultWordItem
                    key={word.id}
                    item={word}
                    audio={audio}
                    setNewAudio={(value: HTMLAudioElement | null) => setAudio(value)}
                    removeWord={(id: string) => setWordsDifficultPerPage((prev) => prev.filter((el) => el.id !== id))}
                  />
                ))}
            </DifficultWordsContainer>
            {
              totalCountPagesDifficult > 1
              && (
                <Pagination
                  count={totalCountPagesDifficult}
                  page={currentPageDifficult + 1}
                  disabled={isLoadingPage}
                  variant="outlined"
                  shape="rounded"
                  size={matchesMediaQuery ? 'small' : 'large'}
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
