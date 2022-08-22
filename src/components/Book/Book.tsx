import { getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { Btn, WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import useLocalStorage from '@/hooks/useLocalStorage';
import Pagination from '@mui/material/Pagination';
import {
  BookContainer, Group, GroupBtn, GroupTitle, Title, Wrapper, GamesWrapper, GameLink,
  WordsContainer,
} from './Book.style';

function Book() {
  const [words, setWords] = useState<WordData[]>([]);
  const [groupCount, setGroupCount] = useLocalStorage('bookGroup', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const totalCountPages = 30;
  const groupBtns: Btn[] = [
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
      const res = await getWords(groupCount, currentPage);
      setWords(res.data);
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
          {words.map((word) => (
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
