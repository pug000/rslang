import React, { useEffect, useMemo, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import Book from '@/Book';
import GameContainer from '@/GamesContainer';
import { Games, WordData } from '@/ts/interfaces';
import WordItemContext from '@/contexts/WordItemContext';
import ProtectedRoute from '@/ProtectedRoute';
import DifficultWords from '@/DifficultWords';
import AppLayout from '@/AppLayout';
import Home from '@/Home';
import useLocalStorage from '@/hooks/useLocalStorage';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import GamePage from './components/GamesContainer/GameComponents/GamePage';
import defaultTheme from './styles/theme';

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

  // нужно перенести в variables
  const games: Games = {
    audio: {
      name: 'Аудиовызов',
      description: 'Вы слышите слово на английском языке и видите 5 вариантов перевода. Цель игры - выбрать правильный перевод озвученного слова.',
      bgColor: `${defaultTheme.colors.bgPink}`,
      btnColor: `${defaultTheme.colors.pink}`,
      icon: <VolumeUpIcon />,
      note: '*не забудьте включить звук',
    },
    sprint: {
      name: 'Спринт',
      description: 'Спринт - это тренировка на скорость. Вам будет предложено слово и его перевод. Цель игры - выбрать как можно больше правильных переводов за 1 минуту.',
      bgColor: `${defaultTheme.colors.bgBlue}`,
      btnColor: `${defaultTheme.colors.blue}`,
      icon: <SpeedIcon />,
      note: '*будьте внимательны',
    }
  };
  // нужно перенести в variables

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
