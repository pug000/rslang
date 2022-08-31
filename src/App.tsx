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
import { getFilteredUserWords } from '@/api';
import GameContext from './contexts/GameContext';
import { defaultToken, defaultUserID } from './utils/variables';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const [difficultWords, setDifficultWords] = useState<WordData[]>([]);
  const [learnedWords, setLearnedWords] = useState<WordData[]>([]);
  // const [learnedWords, setLearnedWords] = useState<WordData[]>([{
  //   id: "5e9f5ee35eb9e72bc21af4a3",
  //   group: 0,
  //   page: 0,
  //   word: "arrive",
  //   image: "files/01_0003.jpg",
  //   audio: "files/01_0003.mp3",
  //   audioMeaning: "files/01_0003_meaning.mp3",
  //   audioExample: "files/01_0003_example.mp3",
  //   textMeaning: "To <i>arrive</i> is to get somewhere.",
  //   textExample: "They <b>arrived</b> at school at 7 a.m.",
  //   transcription: "[əráiv]",
  //   wordTranslate: "прибыть",
  //   textMeaningTranslate: "Приехать значит попасть куда-то",
  //   textExampleTranslate: "Они прибыли в школу в 7 часов утра"
  // }
  // ]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [words, setWords] = useState<WordData[]>([]);
  const [groupNumber, setGroupNumber] = useLocalStorage('bookGroupNumber', 0);
  const [currentPage, setCurrentPage] = useLocalStorage('bookCurrentPage', 0);
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
      setToken,
      setUserId,
    }
  ), [isGameStarted, isLoggedIn]);

  const FILTER_DIFFICULT_WORDS = encodeURIComponent('{"userWord.optional.isDifficultWord":"true"}');
  const FILTER_LEARNED_WORDS = encodeURIComponent('{"userWord.optional.isDifficultWord":"false"}');

  // useEffect(() => {
  //   (async () => {
  //     const difficultWordsData = await getFilteredUserWords(FILTER_DIFFICULT_WORDS);
  //     const learnedWordsData = await getFilteredUserWords(FILTER_LEARNED_WORDS);
  //     setTimeout(() => {
  //       setDifficultWords(difficultWordsData[0].paginatedResults);
  //       setLearnedWords(learnedWordsData[0].paginatedResults);
  //       console.log('difficultWords 1 ', difficultWords);
  //       console.log('learnedWords 1 ', learnedWords);
  //     }, 500);
  //   })();
  // }, []);

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
                  currentPage={currentPage}
                  groupNumber={groupNumber}
                  words={words}
                  setWords={setWords}
                  setCurrentPage={setCurrentPage}
                  setGroupNumber={setGroupNumber}
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
        <Route path="about-project" element={<p>About Project</p>} />
        <Route path="about-team" element={<p>About Team</p>} />
      </Route>
    </Routes>
  );
}

export default App;
