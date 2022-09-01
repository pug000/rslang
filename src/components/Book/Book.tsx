import React, {
  useEffect,
  useState
} from 'react';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

import Loader from '@/Loader';
import Button from '@/Button';
import WordItem from '@/WordItem';

import Pagination from '@mui/material/Pagination';
import StarRateIcon from '@mui/icons-material/StarRate';

import {
  groupButtons,
  totalCountPages
} from '@/utils/variables';
import { getWords } from '@/api';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';

import {
  BookContainer,
  Group,
  GroupButton,
  Title,
  Wrapper,
  GamesWrapper,
  WordsContainer,
  Note
} from './Book.style';

interface BookProps {
  currentPage: number,
  bookGroupNumber: number,
  words: WordData[],
  setWords: SetState<WordData[]>,
  setCurrentPage: SetState<number>,
  setBookGroupNumber: SetState<number>,
  setGameStarted: SetState<boolean>,
}

function Book(
  {
    currentPage,
    bookGroupNumber,
    words,
    setWords,
    setCurrentPage,
    setBookGroupNumber,
    setGameStarted,
  }: BookProps,
) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    audio?.remove();
    setAudio(null);

    (async () => {
      setIsLoadingPage(true);
      const data = await getWords(bookGroupNumber, currentPage);
      setTimeout(() => {
        setWords(data);
        setIsLoadingPage(false);
      }, 500);
    })();
  }, [bookGroupNumber, currentPage]);

  return (
    <BookContainer>
      <Title>Учебник</Title>
      <Note>
        Добро пожаловать в учебник RS Lang!
        Выберите необходимый уровень английского языка и начните обучение,
        изучая новые слова в словаре или с помощью игр.
      </Note>
      <GamesWrapper>
        <NavLink to="/games/sprint">
          <Button
            id="sprint"
            title="Спринт"
            callback={() => setGameStarted(true)}
            disabled={!!isLoadingPage}
          />
        </NavLink>
        <NavLink to="/games/audio">
          <Button
            id="audio"
            title="Аудиовызов"
            callback={() => setGameStarted(true)}
            disabled={!!isLoadingPage}
          />
        </NavLink>
      </GamesWrapper>
      <Wrapper>
        <div>
          <Group>
            {groupButtons.map((
              {
                id,
                value,
                text,
                color
              }
            ) => (
              <GroupButton
                key={id}
                $color={color}
                disabled={isLoadingPage}
                active={bookGroupNumber === value}
                onClick={() => setBookGroupNumber(value)}
              >
                {text}
              </GroupButton>
            ))}
            <NavLink to="/difficult-words">
              <GroupButton
                $color={defaultTheme.colors.primaryColor}
                active={false}
                disabled={!!isLoadingPage}
                title="Сложные слова"
              >
                <StarRateIcon />
              </GroupButton>
            </NavLink>
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
            ? (<Loader />)
            : words.map((word) => (
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
