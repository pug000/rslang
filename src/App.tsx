import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';

import Header from '@/Header';
import Footer from '@/Footer';
import GameContainer from '@/GamesContainer';
import Protected from './pages/DifficultWords/Protected';
import DifficultWords from './pages/DifficultWords/DifficultWords';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(true)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/book" element={<p>Book</p>} />
          <Route path="/difficult-words" element={
            <Protected isLoggedIn={isLoggedIn}>
              <DifficultWords isLoggedIn={isLoggedIn} />
            </Protected>}
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
