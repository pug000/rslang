import { getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { Button, WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import useLocalStorage from '@/hooks/useLocalStorage';
import Pagination from '@mui/material/Pagination';
import {
  BookContainer, Group, GroupBtn, GroupTitle, Title, Wrapper, GamesWrapper, GameLink,
  WordsContainer, LoadingRing, LoadingText,
} from './Book.style';

function Book() {
  const [words, setWords] = useState<WordData[]>([]);
  const [groupCount, setGroupCount] = useLocalStorage('bookGroup', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setLoadingPage] = useState(false);
  const totalCountPages = 30;
  const groupBtns: Button[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 }
  ];

  useEffect(() => {
    if (audio) {
      setAudio(null);
    }

    (async () => {
      setLoadingPage(true);
      const res = await getWords(groupCount, currentPage);
      setWords(res);
      setLoadingPage(false);
    })();
  }, [groupCount, currentPage]);

  return (
    <BookContainer>
      <Title>Учебник</Title>
      <GamesWrapper>
        <GameLink to="/games/sprint">Спринт</GameLink>
        <GameLink to="/games/audio">Аудиовызов</GameLink>
      </GamesWrapper>
      <Wrapper>
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
        <div>
          <Group>
            <GroupTitle>Раздел</GroupTitle>
            {groupBtns.map(({ id, value }) => (
              <GroupBtn
                key={id}
                colors={
                  groupCount === value - 1
                    ? defaultTheme.colors.primaryColor
                    : defaultTheme.colors.grey
                }
                onClick={() => setGroupCount(value - 1)}
              >
                {value}
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
