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
import AudioGamePage from '@/components/GamePage/GamePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [groupNumber, setGroupNumber] = useLocalStorage('bookGroupNumber', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);

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
            <ProtectedRoute conditionValue={isLoggedIn}>
              <DifficultWords isLoggedIn={isLoggedIn} />
            </ProtectedRoute>
          )}
        />
        <Route path="games" element={<GameContainer />} />
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
      <Route path="/games/sprint" element={<p>Sprint</p>} />
      <Route
        path="/games/audio"
        element={(
          <AudioGamePage
            isGameStarted={isGameStarted}
            defaultPage={currentPage}
            defaultGroupNumber={groupNumber}
            setIsGameStarted={setIsGameStarted}
          />
        )}
      />
    </Routes>
  );
}

export default App;
