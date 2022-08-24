import { WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import Pagination from '@mui/material/Pagination';
import SetState from '@/ts/types';
import { groupBtns, totalCountPages } from '@/utils/variables';
import getWords from '@/utils/words';
import {
  BookContainer, Group, GroupBtn, GroupTitle, Title, Wrapper, GamesWrapper, GameLink,
  WordsContainer, LoadingRing, LoadingText,
} from './Book.style';

interface BookProps {
  currentPage: number,
  groupNumber: number,
  setCurrentPage: SetState<number>,
  setGroupNumber: SetState<number>,
  setIsGameStarted: SetState<boolean>,
}

function Book(
  {
    currentPage,
    groupNumber,
    setCurrentPage,
    setGroupNumber,
    setIsGameStarted,
  }: BookProps,
) {
  const [words, setWords] = useState<WordData[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setAudio(null);
    getWords(groupNumber, currentPage, setWords, setLoadingPage);
  }, [groupNumber, currentPage]);

  return (
    <BookContainer>
      <Title>Учебник</Title>
      <GamesWrapper>
        <GameLink to="/games/sprint">Спринт</GameLink>
        <GameLink to="/games/audio" onClick={() => setIsGameStarted(true)}>Аудиовызов</GameLink>
      </GamesWrapper>
      <Wrapper>
        <div>
          <Group>
            <GroupTitle>Раздел</GroupTitle>
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
              <LoadingRing>
                <LoadingText>Загрузка...</LoadingText>
              </LoadingRing>
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
