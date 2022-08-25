import { getWords } from '@/api';
import { WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import WordItem from '@/WordItem';
import useLocalStorage from '@/hooks/useLocalStorage';
import Pagination from '@mui/material/Pagination';
import Loader from '@/Loader';
import { groupBtns } from '@/utils/variables';
import {
  BookContainer, Group, GroupBtn, GroupTitle, Title, Wrapper, GamesWrapper, GameLink,
  WordsContainer
} from './Book.style';

function Book() {
  const [words, setWords] = useState<WordData[]>([]);
  const [groupCount, setGroupCount] = useLocalStorage('bookGroup', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setLoadingPage] = useState(false);
  const totalCountPages = 30;

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
                active={groupCount === value}
                onClick={() => setGroupCount(value)}
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
