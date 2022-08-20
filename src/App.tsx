import React, { useEffect, useMemo, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';

import Header from '@/Header';
import Footer from '@/Footer';
import Book from '@/Book';
import GameContainer from '@/GamesContainer';
import { WordData } from '@/ts/interfaces';
import WordListContext from '@/contexts/WordListContext';
import ProtectedRoute from '@/ProtectedRoute';
import DifficultWords from '@/DifficultWords';
import Home from './components/Home/Home';

const isLoggedInFromLocalStorage = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(isLoggedInFromLocalStorage);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);

  useEffect(() => (
    isLoggedIn
      ? localStorage.setItem('isLoggedIn', 'true')
      : localStorage.setItem('isLoggedIn', 'false')
  ), [isLoggedIn]);

  const wordsListValue = useMemo(() => (
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
          <Route path="/" element={<Home />} />
          <Route
            path="/book"
            element={(
              <WordListContext.Provider value={wordsListValue}>
                <Book />
              </WordListContext.Provider>
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
