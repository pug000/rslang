import React, { useEffect, useMemo, useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';

import Header from '@/Header';
import Footer from '@/Footer';
import Book from '@/Book';
import GameContainer from '@/GamesContainer';
import { WordData } from '@/ts/interfaces';
import WordItemContext from '@/contexts/WordItemContext';
import ProtectedRoute from '@/ProtectedRoute';
import DifficultWords from '@/DifficultWords';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './components/Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Routes>
          <Route path="dist/index.html" element={<Navigate replace to="/" />} />
          <Route path="/index.html" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/book"
            element={(
              <WordItemContext.Provider value={wordItemValue}>
                <Book />
              </WordItemContext.Provider>
            )}
          />
          <Route
            path="/difficult-words"
            element={(
              <ProtectedRoute conditionValue={isLoggedIn}>
                <DifficultWords isLoggedIn={isLoggedIn} />
              </ProtectedRoute>
            )}
          />
          <Route path="/games" element={<GameContainer />} />
          <Route path="/games/sprint" element={<p>Sprint</p>} />
          <Route path="/games/audio" element={<p>Audio</p>} />
          <Route
            path="/statistics"
            element={(
              <ProtectedRoute conditionValue={isLoggedIn}>
                <p>Statistics</p>
              </ProtectedRoute>
            )}
          />
          <Route path="/about-project" element={<p>About Project</p>} />
          <Route path="/about-team" element={<p>About Team</p>} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
