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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [words, setWords] = useState<WordData[]>([]);
  const [groupNumber, setGroupNumber] = useLocalStorage('bookGroupNumber', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);

  const changeGameState = (value: boolean) => setIsGameStarted(value);

  useEffect(() => (
    isLoggedIn
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false)
  ), [isLoggedIn]);

  const wordItemValue = useMemo(() => (
    {
      difficultWords,
      learnedWords,
      setDifficultWords,
      setLearnedWords,
    }
  ), [difficultWords, learnedWords]);

  const headerValue = useMemo(() => (
    {
      isLoggedIn,
      isGameStarted,
      setIsLoggedIn,
      setIsGameStarted,
    }
  ), [isGameStarted, isLoggedIn]);

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
                changeGameState={changeGameState}
              />
            </WordItemContext.Provider>
          )}
        />
        <Route
          path="difficult-words"
          element={(
            <ProtectedRoute conditionValue={isLoggedIn}>
              <DifficultWords isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          )}
        />
        <Route path="games" element={<GameContainer />} />
        <Route
          path="games/sprint"
          element={(
            <SprintGamePage
              isGameStarted={isGameStarted}
              changeGameState={changeGameState}
              defaultPage={currentPage}
              defaultGroupNumber={groupNumber}
              defaultWords={words}
            />
          )}
        />
        <Route
          path="games/audio"
          element={(
            <AudioGamePage
              isGameStarted={isGameStarted}
              changeGameState={changeGameState}
              defaultPage={currentPage}
              defaultGroupNumber={groupNumber}
              defaultWords={words}
            />
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
        <Route path="about-project" element={<p>About Project</p>} />
        <Route path="about-team" element={<p>About Team</p>} />
      </Route>
    </Routes>
  );
}

export default App;
