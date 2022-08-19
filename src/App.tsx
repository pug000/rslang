import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';

import Header from '@/Header';
import Footer from '@/Footer';
import Book from '@/Book';
import GameContainer from '@/GamesContainer';
import { WordData } from '@/ts/interfaces';

function App() {
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route
            path="/book"
            element={(
              <Book
                difficultWords={difficultWords}
                learnedWords={learnedWords}
                setDifficultWords={setDifficultWords}
                setLearnedWords={setLearnedWords}
              />
            )}
          />
          <Route path="/games" element={<GameContainer />} />
          <Route path="/games/sprint" element={<p>Sprint</p>} />
          <Route path="/games/audio" element={<p>Audio</p>} />
          <Route path="/statistics" element={<p>Statistics</p>} />
          <Route path="/about-project" element={<p>About Project</p>} />
          <Route path="/about-team" element={<p>About Team</p>} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
