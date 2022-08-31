import React, { useContext, useEffect, useState } from 'react';
import { WordData } from '@/ts/interfaces';
import Pagination from '@mui/material/Pagination';
import SetState from '@/ts/types';
import { FILTER_DIFFICULT_WORDS } from '@/utils/variables';
import { getFilteredUserWordsByPage } from '@/api';
import Loader from '@/Loader';
import WordItemContext from '@/contexts/WordItemContext';
import { ChangeWordsDataKeyFromServer } from '@/utils/createCorrectPropResponse';
import {
  DifficultWordsWrapper, DifficultWordsContainer, DifficultWordsTitle
} from './DifficultWords.style';
import DifficultWordItem from './DifficultWordItem/DifficultWordItem';

interface DifficultWordsProps {
  isLoggedIn: boolean | null;
  currentPageDifficult: number,
  setCurrentPageDifficult: SetState<number>,
}

function DifficultWords({
  isLoggedIn,
  currentPageDifficult,
  setCurrentPageDifficult,
}: DifficultWordsProps) {
  if (!isLoggedIn) return null;

  const {
    difficultWords,
    token,
    userId,
  } = useContext(WordItemContext);

  const totalCountPagesDifficult = Math.floor(difficultWords.length / 20);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [wordsDifficult, setWordsDifficult] = useState<WordData[]>([]);

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    (async () => {
      setIsLoadingPage(true);
      const wordsDifficultData = await getFilteredUserWordsByPage(FILTER_DIFFICULT_WORDS, userId, token, currentPageDifficult);
      if (wordsDifficultData && typeof wordsDifficultData !== 'number') {
        const wordsDifficultDataChangeKeys = ChangeWordsDataKeyFromServer([wordsDifficultData[0]]);
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
