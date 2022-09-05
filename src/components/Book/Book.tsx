import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

import BookContext from '@/contexts/BookContext';

import Loader from '@/Loader';
import Button from '@/Button';
import WordItem from '@/WordItem';

import Pagination from '@mui/material/Pagination';
import StarRateIcon from '@mui/icons-material/StarRate';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  groupButtons,
  totalCountPages
} from '@/utils/variables';
import { getWords } from '@/api';

import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import {
  BookContainer,
  GroupWrapper,
  Group,
  GroupButton,
  Title,
  Wrapper,
  GamesWrapper,
  WordsContainer,
  Note,
  Message
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
  const { isLoggedIn, learnedWords } = useContext(BookContext);
  const [popupMessage, setPopupMessage] = useState<boolean>(false);

  const checkWordsOnPage = () => {
    const result = words
      .every((wordItem) => learnedWords
        .some((learnedWordItem) => learnedWordItem.id === wordItem.id));

    return result;
  };
  const showMessage = () => {
    if (isLoggedIn) {
      const allWordsLearned = checkWordsOnPage();
      if (allWordsLearned === true) {
        setPopupMessage(true);
      } else {
        setPopupMessage(false);
      }
    } else {
      setPopupMessage(false);
    }
  };

  const filterWords = () => {
    const result = words
      .filter((wordItem) => !learnedWords
        .some((learnedWordItem) => learnedWordItem.id === wordItem.id));

    setWords(result);
  };

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
  }, [bookGroupNumber, currentPage, isLoggedIn]);

  useEffect(() => {
    showMessage();
  }, [learnedWords, isLoggedIn]);

  const matchesMediaQuery = useMediaQuery('(max-width:560px)');

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
            callback={() => {
              filterWords();
              setGameStarted(true);
            }}
            disabled={!!isLoadingPage || checkWordsOnPage()}
          />
        </NavLink>
        <NavLink to="/games/audio">
          <Button
            id="audio"
            title="Аудиовызов"
            callback={() => {
              filterWords();
              setGameStarted(true);
            }}
            disabled={!!isLoadingPage || checkWordsOnPage()}
          />
        </NavLink>
      </GamesWrapper>
      <Wrapper>
        <GroupWrapper>
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
        </GroupWrapper>
        <Pagination
          count={totalCountPages}
          page={currentPage + 1}
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
          onChange={(_, value) => setCurrentPage(value - 1)}
        />
        <WordsContainer>
          {(isLoggedIn && popupMessage) && <Message>Отлично! На данной странице все слова изучены.</Message>}
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
          size={matchesMediaQuery ? 'small' : 'large'}
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
