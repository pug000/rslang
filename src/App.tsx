import React, {
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';

import HeaderContext from '@/contexts/HeaderContext';
import WordItemContext from '@/contexts/BookContext';
import GameContext from '@/contexts/GameContext';

import AppLayout from '@/AppLayout';
import Home from '@/Home';
import Book from '@/Book';
import ProtectedRoute from '@/ProtectedRoute';
import DifficultWords from '@/DifficultWords';
import AudioGamePage from '@/AudioGamePage';
import SprintGamePage from '@/SprintGamePage';
import About from '@/About';
import NotFound from '@/NotFound';
import GameContainer from '@/GamesContainer';

import {
  defaultToken,
  defaultUserID,
  FILTER_DIFFICULT_WORDS,
  FILTER_LEARNED_WORDS,
} from '@/utils/variables';
import { сhangeWordsDataKeyFromServer } from '@/utils/createCorrectPropResponse';
import { getFilteredUserWords, getNewToken, getUser } from '@/api';
import useLocalStorage from '@/hooks/useLocalStorage';

import { WordData } from '@/ts/interfaces';
import ServerResponses from './ts/enums';

function App() {
  const [isLoggedIn, setLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isShowResult, setShowResult] = useState(false);
  const [words, setWords] = useState<WordData[]>([]);
  const [bookGroupNumber, setBookGroupNumber] = useLocalStorage('bookGroupNumber', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
  const [currentPageDifficult, setCurrentPageDifficult] = useLocalStorage('difficultCurrentPage', 0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<WordData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<WordData[]>([]);
  const [token, setToken] = useLocalStorage('token', defaultToken);
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', defaultToken);
  const [userId, setUserId] = useLocalStorage('userId', defaultUserID);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        console.log('пользователь авторизован');
        console.log('before token', token);
        console.log('before refreshToken', refreshToken);
        console.log('before userId', userId);

        const responseGetUser = await getUser(userId, token);
        if (responseGetUser === ServerResponses.error401) {
          console.log('пользователю нужен новый токен');
          const responseNewToken = await getNewToken(userId, refreshToken);
          if (responseNewToken && typeof responseNewToken !== 'number') {
            console.log('пользователь получил новые данные');
            setToken(responseNewToken.token);
            setRefreshToken(responseNewToken.refreshToken);

            console.log('after token', token);
            console.log('after refreshToken', refreshToken);
          }
        } else {
          console.log('пользователю НЕ!! нужен новый токен');
        }
      } else {
        console.log('пользователь не авторизован 1');
      }
      console.log('пользователь не авторизован 2');
    })();
  }, []);

  const clearGameState = () => {
    setGameStarted(false);
    setShowResult(false);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  useEffect(() => {
    if (isGameStarted) {
      window.addEventListener('popstate', clearGameState);
    }

    return () => (
      window.removeEventListener('popstate', clearGameState)
    );
  }, [isGameStarted]);

  const wordItemValue = useMemo(() => (
    {
      difficultWords,
      learnedWords,
      setDifficultWords,
      setLearnedWords,
      token,
      userId,
      isLoggedIn,
    }
  ), [difficultWords, learnedWords]);

  const headerValue = useMemo(() => (
    {
      isLoggedIn,
      setLoggedIn,
      setToken,
      setUserId,
      setRefreshToken,
    }
  ), [isGameStarted, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        setTimeout(async () => {
          const difficultWordsData = await getFilteredUserWords(FILTER_DIFFICULT_WORDS, userId, token);

          const learnedWordsData = await getFilteredUserWords(FILTER_LEARNED_WORDS, userId, token);

          if (difficultWordsData && typeof difficultWordsData !== 'number') {
            const difficultWordsChangeKeys = сhangeWordsDataKeyFromServer([difficultWordsData[0]]);
            setDifficultWords(difficultWordsChangeKeys);
          }

          if (learnedWordsData && typeof learnedWordsData !== 'number') {
            const learnedWordsChangeKeys = сhangeWordsDataKeyFromServer([learnedWordsData[0]]);
            setLearnedWords(learnedWordsChangeKeys);
          }
        }, 500);
      })();
    }
  }, [isLoggedIn, currentPage, token]);

  const gameValue = useMemo(() => (
    {
      correctAnswers,
      incorrectAnswers,
      token,
      userId,
      isLoggedIn,
      isGameStarted,
      isShowResult,
      setShowResult,
      setGameStarted,
      setCorrectAnswers,
      setIncorrectAnswers,
      clearGameState,
    }
  ), [
    correctAnswers,
    incorrectAnswers,
    token,
    userId,
    isLoggedIn,
    isGameStarted,
    isShowResult,
  ]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <HeaderContext.Provider value={headerValue}>
            <AppLayout />
          </HeaderContext.Provider>
        )}
      >
        <Route index element={<Home />} />
        <Route
          path="book"
          element={(
            <WordItemContext.Provider value={wordItemValue}>
              <Book
                currentPage={currentPage}
                bookGroupNumber={bookGroupNumber}
                words={words}
                setWords={setWords}
                setCurrentPage={setCurrentPage}
                setBookGroupNumber={setBookGroupNumber}
                setGameStarted={setGameStarted}
              />
            </WordItemContext.Provider>
          )}
        />
        <Route
          path="difficult-words"
          element={(
            <WordItemContext.Provider value={wordItemValue}>
              <ProtectedRoute conditionValue={isLoggedIn}>
                <DifficultWords
                  isLoggedIn={isLoggedIn}
                  currentPageDifficult={currentPageDifficult}
                  setCurrentPageDifficult={setCurrentPageDifficult}
                />
              </ProtectedRoute>
            </WordItemContext.Provider>
          )}
        />
        <Route path="games" element={<GameContainer />} />
        <Route
          path="games/sprint"
          element={(
            <GameContext.Provider value={gameValue}>
              <SprintGamePage
                isGameStarted={isGameStarted}
                defaultPage={currentPage}
                defaultGroupNumber={bookGroupNumber}
                defaultWords={words}
              />
            </GameContext.Provider>
          )}
        />
        <Route
          path="games/audio"
          element={(
            <GameContext.Provider value={gameValue}>
              <AudioGamePage
                isGameStarted={isGameStarted}
                defaultPage={currentPage}
                defaultGroupNumber={bookGroupNumber}
                defaultWords={words}
              />
            </GameContext.Provider>
          )}
        />
        <Route
          path="statistics"
          element={(
            <ProtectedRoute conditionValue={isLoggedIn}>
              <p>Statistics</p>
            </ProtectedRoute>
          )}
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
