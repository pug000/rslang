import { WordData } from '@/ts/interfaces';
import { generateRandomNumber, shuffleArray } from '@/utils/randomize';
import React, { useEffect, useState } from 'react';
import Timer from '@/Timer';
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
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [translation, setTranslation] = useState<string>(currentWord.wordTranslate);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setInCorrectAnswers] = useState<WordData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<WordData[]>([]);

  useEffect(() => {
    if (step <= words.length - 1) {
      setCurrentWord(words[step]);
    }

    if (step === words.length - 1) {
      changeGameState(false);
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

  const clickCorrectBtn = () => {
    if (currentWord.wordTranslate === translation) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setScore(score + 20);
    } else {
      setInCorrectAnswers((prev) => [...prev, currentWord]);
    }
  };

  const clickInCorrectBtn = () => {
    if (currentWord.wordTranslate !== translation) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
      setScore(score + 20);
    } else {
      setInCorrectAnswers((prev) => [...prev, currentWord]);
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      nextStep();
      clickCorrectBtn();
    } else if (e.code === 'ArrowRight') {
      nextStep();
      clickInCorrectBtn();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  });

  return (
    <SprintGameContainer>
      {/* компонент верхняя панель игры (закрыть, full screen) */}
      <SprintGameWrapper>
        <Timer mainColor={mainColor} isCounting={isGameStarted} setIsCounting={changeGameState} />
        <p>
          Ваш результат
          {score}
        </p>
        <p>{currentWord.word}</p>
        <p>{translation}</p>
        <button
          type="button"
          onClick={() => {
            nextStep();
            clickCorrectBtn();
          }}
        >
          верно
        </button>
        <button
          type="button"
          onClick={() => {
            nextStep();
            clickInCorrectBtn();
          }}
        >
          неверно
        </button>
      </SprintGameWrapper>
    </SprintGameContainer>
  );
}

export default SprintGame;
