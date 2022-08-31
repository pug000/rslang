import { WordData } from '@/ts/interfaces';
import { generateRandomNumber, shuffleArray } from '@/utils/randomize';
import React, { useContext, useEffect, useState } from 'react';
import Timer from '@/Timer';
import GameContext from '@/contexts/GameContext';
import GameResults from '@/GameResults';
import GameControl from '@/GameControl';
import Button from '@/Button';
import { strikeMessages } from '@/utils/variables';
import {
  SprintGameContainer, SprintGameWrapper, Result,
  TextBlock, Word, Translation, SprintButtons, Note,
  StrikeBlock, Strike, StrikeMessage
} from './SprintGame.style';

interface SprintGameProps {
  words: WordData[],
  mainColor: string,
}

function SprintGame(
  {
    words,
    mainColor,
  }: SprintGameProps
) {
  const {
    correctAnswers,
    incorrectAnswers,
    isShowResult,
    setCorrectAnswers,
    setIncorrectAnswers,
    setShowResult,
  } = useContext(GameContext);
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [translation, setTranslation] = useState<string>(currentWord.wordTranslate);
  const [score, setScore] = useState(0);
  const [strike, setStrike] = useState(0);
  const [isCorrect, setCorrect] = useState(true);

  useEffect(() => {
    if (step <= words.length - 1) {
      setCurrentWord(words[step]);
    }

    if (step === words.length) {
      setShowResult(true);
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

  const correctAnswer = () => {
    if (strike === 2) {
      setScore(score + 100);
      setStrike(strike + 1);
    } else if (strike === 3) {
      setScore(score + 20);
      setStrike(1);
    } else {
      setScore(score + 20);
      setStrike(strike + 1);
    }

    setCorrect(true);
    setCorrectAnswers((prev) => [...prev, currentWord]);
  };

  const incorrectAnswer = () => {
    if (strike) setStrike(0);
    setCorrect(false);
    setIncorrectAnswers((prev) => [...prev, currentWord]);
  };

  const clickCorrectBtn = () => {
    if (currentWord.wordTranslate === translation) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }

    nextStep();
  };

  const clickInCorrectBtn = () => {
    if (currentWord.wordTranslate !== translation) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }

    nextStep();
  };

  const strikeMessageText = strikeMessages[generateRandomNumber(strikeMessages.length - 1)];

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

    return () => document.removeEventListener('keydown', handleKey);
  }, [step, translation, currentWord]);

  return (
    <SprintGameContainer>
      <GameControl color={mainColor} />
      {!isShowResult
        ? (
          <SprintGameWrapper>
            <Timer mainColor={mainColor} />
            <Result isCorrect={isCorrect}>
              {'Ваш результат '}
              <span>
                {score}
              </span>
              {' баллов'}
            </Result>
            <StrikeBlock>
              <Strike strike={strike} id="strike1">✔️</Strike>
              <Strike strike={strike} id="strike2">✔️</Strike>
              <Strike strike={strike} id="strike3">✔️</Strike>
              {strike === 3 && <StrikeMessage>{strikeMessageText}</StrikeMessage>}
            </StrikeBlock>
            <TextBlock>
              <Word>{currentWord.word}</Word>
              <Translation>{translation}</Translation>
            </TextBlock>
            <SprintButtons>
              <Button
                id="correct"
                title="← верно"
                callback={clickCorrectBtn}
              />
              <Button
                id="incorrect"
                title="неверно →"
                callback={clickInCorrectBtn}
              />
            </SprintButtons>
            <Note>*можно использовать стрелки</Note>
          </SprintGameWrapper>
        )
        : (
          <GameResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            game="sprint"
            mainColor={mainColor}
            words={words}
          />
        )}
    </SprintGameContainer>
  );
}

export default SprintGame;
