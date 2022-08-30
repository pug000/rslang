import { WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import Pagination from '@mui/material/Pagination';
import SetState from '@/ts/types';
import { groupBtns, totalCountPages } from '@/utils/variables';
import { getWords } from '@/api';
import Loader from '@/Loader';
import Button from '@/Button';
import { NavLink } from 'react-router-dom';
import {
  BookContainer, Group, GroupBtn, Title, Wrapper, GamesWrapper,
  WordsContainer, Note
} from './Book.style';

interface BookProps {
  currentPage: number,
  groupNumber: number,
  words: WordData[],
  setWords: SetState<WordData[]>,
  setCurrentPage: SetState<number>,
  setGroupNumber: SetState<number>,
  setIsGameStarted: SetState<boolean>,
}

function Book(
  {
    currentPage,
    groupNumber,
    words,
    setWords,
    setCurrentPage,
    setGroupNumber,
    setIsGameStarted,
  }: BookProps,
) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    (async () => {
      setIsLoadingPage(true);
      const data = await getWords(groupNumber, currentPage);
      setTimeout(() => {
        setWords(data);
        setIsLoadingPage(false);
      }, 500);
    })();
  }, [groupNumber, currentPage]);

  return (
    <BookContainer>
      <Title>Учебник</Title>
      <Note>
        {'Добро пожаловать в учебник RS Lang! '}
        {'Выберите необходимый уровень английского языка и начните обучение, '}
        изучая новые слова в словаре или с помощью игр.
      </Note>
      <GamesWrapper>
        <NavLink to="/games/sprint">
          <Button
            id="sprint"
            title="Спринт"
            callback={() => setIsGameStarted(true)}
          />
        </NavLink>
        <NavLink to="/games/audio">
          <Button
            id="audio"
            title="Аудиовызов"
            callback={() => setIsGameStarted(true)}
          />
        </NavLink>
      </GamesWrapper>
      <Wrapper>
        <div>
          <Group>
            {groupBtns.map((
              {
                id,
                value,
                text,
                color
              }
            ) => (
              <GroupBtn
                key={id}
                colors={color}
                disabled={isLoadingPage}
                active={groupNumber === value}
                onClick={() => setGroupNumber(value)}
              >
                {text}
              </GroupBtn>
            ))}
          </Group>
        </div>
        <Pagination
          count={totalCountPages}
          page={currentPage + 1}
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
          onChange={(_, value) => setCurrentPage(value - 1)}
        />
        <WordsContainer>
          {isLoadingPage
            ? ((
              <Loader />
            )) : words.map((word) => (
              <WordItem
                key={word.id}
                item={word}
                audio={audio}
                setNewAudio={(value: HTMLAudioElement | null) => setAudio(value)}
              />
            ))}
        </WordsContainer>
        <Pagination
          count={totalCountPages}
          page={currentPage + 1}
          disabled={isLoadingPage}
          variant="outlined"
          shape="rounded"
          size="large"
          sx={
            {
              justifySelf: 'center',
              display: 'grid',
              gridArea: 'paginationBottom',
            }
          }
          onChange={(_, value) => setCurrentPage(value - 1)}
        />
      </Wrapper>
    </BookContainer>
  );
}

export default Book;
