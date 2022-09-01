import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Book from '@/Book';
import GameContainer from '@/GamesContainer';
import { WordData } from '@/ts/interfaces';
import WordItemContext from '@/contexts/WordItemContext';
import ProtectedRoute from '@/ProtectedRoute';
import DifficultWords from '@/DifficultWords';
import AppLayout from '@/AppLayout';
import Home from '@/Home';
import useLocalStorage from '@/hooks/useLocalStorage';
import HeaderContext from '@/contexts/HeaderContext';
import AudioGamePage from '@/AudioGamePage';
import SprintGamePage from '@/SprintGamePage';
import About from '@/About';
import NotFound from '@/NotFound';
import { getFilteredUserWords } from '@/api';
import GameContext from './contexts/GameContext';
import {
  defaultToken, defaultUserID, FILTER_DIFFICULT_WORDS, FILTER_LEARNED_WORDS
} from './utils/variables';
import { ChangeWordsDataKeyFromServer } from './utils/createCorrectPropResponse';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [words, setWords] = useState<WordData[]>([]);
  const [groupNumber, setGroupNumber] = useLocalStorage('bookGroupNumber', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
  const [currentPageDifficult, setCurrentPageDifficult] = useLocalStorage('CurrentPageDifficult', 0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<WordData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<WordData[]>([]);
  const [token, setToken] = useLocalStorage('token', defaultToken);
  const [userId, setUserId] = useLocalStorage('userId', defaultUserID);

  const clearGameState = () => {
    setIsGameStarted(false);
    setIsShowResult(false);
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

  useEffect(() => (
    isLoggedIn
      ? setIsLoggedIn(true)
      : (setIsLoggedIn(false), setDifficultWords([]), setLearnedWords([]))
  ), [isLoggedIn]);

  const wordItemValue = useMemo(() => (
    {
      difficultWords,
      learnedWords,
      setDifficultWords,
      setLearnedWords,
      token,
      userId,
    }
  ), [difficultWords, learnedWords]);

  const headerValue = useMemo(() => (
    {
      isLoggedIn,
      isGameStarted,
      setIsLoggedIn,
      setIsGameStarted,
      setToken,
      setUserId,
    }
  ), [isGameStarted, isLoggedIn]);

  useEffect(() => {
    (async () => {
      const difficultWordsData = await getFilteredUserWords(FILTER_DIFFICULT_WORDS, userId, token);

      const learnedWordsData = await getFilteredUserWords(FILTER_LEARNED_WORDS, userId, token);

      if (difficultWordsData && typeof difficultWordsData !== 'number') {
        const difficultWordsChangeKeys = ChangeWordsDataKeyFromServer([difficultWordsData[0]]);
        setDifficultWords(difficultWordsChangeKeys);
      }

      if (learnedWordsData && typeof learnedWordsData !== 'number') {
        const learnedWordsChangeKeys = ChangeWordsDataKeyFromServer([learnedWordsData[0]]);
        setLearnedWords(learnedWordsChangeKeys);
      }
    })();
  }, [isLoggedIn, currentPage]);

  const gameValue = useMemo(() => (
    {
      correctAnswers,
      incorrectAnswers,
      token,
      userId,
      isLoggedIn,
      isGameStarted,
      isShowResult,
      setIsShowResult,
      setIsGameStarted,
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
                groupNumber={groupNumber}
                words={words}
                setWords={setWords}
                setCurrentPage={setCurrentPage}
                setGroupNumber={setGroupNumber}
                setIsGameStarted={setIsGameStarted}
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
                defaultGroupNumber={groupNumber}
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
                defaultGroupNumber={groupNumber}
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
