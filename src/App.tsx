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
import GamePage from '@/GamePage';
import { games } from '@/variables';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  const [isGameStarted, setGameStarted] = useState(false);

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
    <Routes>
      <Route
        path="/"
        element={(
          <AppLayout
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      >
        <Route index element={<Home />} />
        <Route
          path="book"
          element={(
            <WordItemContext.Provider value={wordItemValue}>
              <Book />
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
            <GamePage
              bgColor={games.sprint.bgColor}
              elementColor={games.sprint.btnColor}
              gameTitle={games.sprint.name}
              description={games.sprint.description}
              icon={games.sprint.icon}
              note={games.sprint.note}
              isGameStarted={isGameStarted}
              setGameStarted={setGameStarted}
            />
          )}
        />
        <Route
          path="games/audio"
          element={(
            <GamePage
              bgColor={games.audio.bgColor}
              elementColor={games.audio.btnColor}
              gameTitle={games.audio.name}
              description={games.audio.description}
              icon={games.audio.icon}
              note={games.audio.note}
              isGameStarted={isGameStarted}
              setGameStarted={setGameStarted}
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
