import { WordData } from '@/ts/interfaces';
import { generateRandomNumber, shuffleArray } from '@/utils/randomize';
import React, { useContext, useEffect, useState } from 'react';
import Timer from '@/Timer';
import GameContext from '@/contexts/GameContext';
import GameResults from '@/GameResults';
import {
  SprintGameContainer, SprintGameWrapper
} from './SprintGame.style';

interface SprintGameProps {
  words: WordData[],
  changeGameState: (value: boolean) => void,
  mainColor: string,
  isGameStarted: boolean
}

function SprintGame(
  {
    words,
    changeGameState,
    mainColor,
    isGameStarted
  }: SprintGameProps
) {
  const {
    correctAnswers,
    incorrectAnswers,
    setCorrectAnswers,
    setInCorrectAnswers,
  } = useContext(GameContext);
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [translation, setTranslation] = useState<string>(currentWord.wordTranslate);
  const [isShowResult, setIsShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (step <= words.length - 1) {
      setCurrentWord(words[step]);
    }

    if (step === words.length) {
      setIsShowResult(true);
    }
  }, [step]);

  useEffect(() => {
    const wrongTranslate = shuffleArray(words)
      .filter((item) => item.id !== currentWord.id)
      .map((item) => item.wordTranslate)
      .slice(0, 1);

    const translateOption = generateRandomNumber(2);
    if (translateOption === 1) {
      setTranslation(currentWord.wordTranslate);
    } else {
      setTranslation(wrongTranslate[0]);
    }
  }, [currentWord]);

  const nextStep = () => setStep((prev) => prev + 1);

  const clickCorrectBtn = () => {
    if (currentWord.wordTranslate === translation) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setScore(score + 20);
    } else {
      setInCorrectAnswers((prev) => [...prev, currentWord]);
    }

    nextStep();
  };

  const clickInCorrectBtn = () => {
    if (currentWord.wordTranslate !== translation) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setScore(score + 20);
    } else {
      setInCorrectAnswers((prev) => [...prev, currentWord]);
    }

    nextStep();
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      clickCorrectBtn();
    } else if (e.code === 'ArrowRight') {
      clickInCorrectBtn();
    }
  };

  useEffect(() => {
    if (step < words.length) {
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [step, translation]);

  return (
    <SprintGameContainer>
      {/* компонент верхняя панель игры (закрыть, full screen) */}
      {!isShowResult
        ? (
          <SprintGameWrapper>
            <Timer
              mainColor={mainColor}
              isCounting={isGameStarted}
              setIsCounting={setIsShowResult}
            />
            <p>
              Ваш результат
              {score}
            </p>
            <p>{currentWord.word}</p>
            <p>{translation}</p>
            <button
              type="button"
              onClick={() => {
                clickCorrectBtn();
              }}
            >
              верно
            </button>
            <button
              type="button"
              onClick={() => {
                clickInCorrectBtn();
              }}
            >
              неверно
            </button>
          </SprintGameWrapper>
        )
        : (
          <GameResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setIncorrectAnswers={setInCorrectAnswers}
            path="sprint"
            changeGameState={changeGameState}
          />
        )}
    </SprintGameContainer>
  );
}

export default SprintGame;
