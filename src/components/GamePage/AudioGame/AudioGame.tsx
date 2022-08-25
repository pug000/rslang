import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { shuffleArray } from '@/utils/randomize';
import React, { useEffect, useState } from 'react';
import {
  AudioBtn, AudioGameBtn, AudioIcon, AudioGameOptions,
  AudioGameContolBtn, AudioGameWrapper, Link, AudioGameControls, CloseIconSvg,
  FullscreenIconSvg, FullscreenExitIconSvg, AudioGameContainer,
} from './AudioGame.style';

interface AudioGameProps {
  words: WordData[],
  setIsGameStarted: SetState<boolean>,
}

function AudioGame(
  {
    words,
    setIsGameStarted,
  }: AudioGameProps
) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [wordsOptions, setWordsOptions] = useState<string[]>([]);
  const [incorrectAnswers, setInCorrectAnswers] = useState<WordData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<WordData[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();

  useEffect(() => {
    if (step > 0 && step <= words.length - 1) {
      setCurrentWord(words[step]);
    }
  }, [step]);

  useEffect(() => {
    const wrongOptions = shuffleArray(words)
      .filter((item) => item.id !== currentWord.id)
      .map((item) => item.wordTranslate)
      .slice(0, 4);
    setWordsOptions(shuffleArray([currentWord.wordTranslate, ...wrongOptions]));
  }, [currentWord]);

  const toggleCorrect = (word: string) => {
    if (currentWord.wordTranslate === word && selectedAnswer) {
      return defaultTheme.colors.blue;
    }

    if (selectedAnswer === word) {
      return defaultTheme.colors.pink;
    }

    return '';
  };

  const setResultAnswers = (word: string) => (currentWord.wordTranslate === word
    ? setCorrectAnswers((prev) => [...prev, currentWord])
    : setInCorrectAnswers((prev) => [...prev, currentWord]));

  return (
    <AudioGameContainer>
      <AudioGameControls>
        <AudioGameContolBtn>
          <Link to="/games" onClick={() => setIsGameStarted(false)}><CloseIconSvg /></Link>
        </AudioGameContolBtn>
        <AudioGameContolBtn>
          {!isFullscreen ? <FullscreenIconSvg /> : <FullscreenExitIconSvg />}
        </AudioGameContolBtn>
      </AudioGameControls>
      <AudioGameWrapper>
        <AudioBtn>
          <AudioIcon />
          {currentWord.word}
        </AudioBtn>
        <AudioGameOptions>
          {wordsOptions.map((el, i) => (
            <AudioGameBtn
              key={el}
              colors={toggleCorrect(el)}
              disabled={!!selectedAnswer}
              onClick={() => {
                setSelectedAnswer(el);
                setResultAnswers(el);
              }}
            >
              {`${i + 1} ${el}`}
            </AudioGameBtn>
          ))}
        </AudioGameOptions>
      </AudioGameWrapper>
      <AudioGameWrapper>
        {!selectedAnswer
          ? (
            <AudioGameBtn onClick={() => {
              setSelectedAnswer('Incorrect');
              setInCorrectAnswers((prev) => [...prev, currentWord]);
            }}
            >
              Не знаю
            </AudioGameBtn>
          )
          : (
            <AudioGameBtn onClick={() => {
              setSelectedAnswer(undefined);
              setStep(step + 1);
            }}
            >
              Далее
            </AudioGameBtn>
          )}
      </AudioGameWrapper>
    </AudioGameContainer>
  );
}

export default AudioGame;
