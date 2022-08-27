import { baseUrl } from '@/api';
import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import { shuffleArray } from '@/utils/randomize';
import React, { useEffect, useRef, useState } from 'react';
import GameControl from '@/GameControl';
import {
  AudioBtn, AudioGameBtn, AudioIcon, AudioGameOptions, AudioGameWrapper, AudioGameContainer
} from './AudioGame.style';

interface AudioGameProps {
  words: WordData[],
  changeGameState: (value: boolean) => void,
}

function AudioGame(
  {
    words,
    changeGameState,
  }: AudioGameProps
) {
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [wordsOptions, setWordsOptions] = useState<string[]>([]);
  const [incorrectAnswers, setInCorrectAnswers] = useState<WordData[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<WordData[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (step <= words.length - 1) {
      setTimeout(() => {
        setCurrentWord(words[step]);
      }, 250);
    }
  }, [step]);

  useEffect(() => {
    const wrongOptions = shuffleArray(words)
      .filter((item) => item.id !== currentWord.id)
      .map((item) => item.wordTranslate)
      .slice(0, 4);
    setIsPlayingAudio(true);
    setWordsOptions(shuffleArray([currentWord.wordTranslate, ...wrongOptions]));
  }, [currentWord]);

  useEffect(() => {
    if (isPlayingAudio) {
      audioRef.current.src = `${baseUrl}/${currentWord.audio}`;
      audioRef.current.play();
    }
  }, [isPlayingAudio]);

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

  const selectAnswer = (word: string) => {
    setSelectedAnswer(word);
    setResultAnswers(word);
  };

  const nextStep = () => {
    setSelectedAnswer(undefined);
    setStep((prev) => prev + 1);
    setIsPlayingAudio(false);
  };

  const skipAnswer = () => {
    setSelectedAnswer('Incorrect');
    setInCorrectAnswers((prev) => [...prev, currentWord]);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!selectedAnswer) {
      const currentKey = Number(e.key) - 1;
      const word = wordsOptions[currentKey];

      if (word) {
        selectAnswer(word);
      }
    }

    if (e.code === 'Enter') {
      if (!selectedAnswer) {
        skipAnswer();
      } else {
        nextStep();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKey);

    return () => document.removeEventListener('keypress', handleKey);
  }, [wordsOptions, selectedAnswer]);

  return (
    <AudioGameContainer>
      <GameControl
        changeGameState={changeGameState}
        color={defaultTheme.colors.pink}
      />
      <AudioGameWrapper>
        <AudioBtn
          tabIndex={-1}
          disabled={isPlayingAudio}
          onClick={() => setIsPlayingAudio(true)}
        >
          <AudioIcon />
          <audio
            ref={audioRef}
            onEnded={() => setIsPlayingAudio(false)}
          >
            <track kind="captions" />
          </audio>
        </AudioBtn>
        <AudioGameOptions>
          {wordsOptions.map((el, i) => (
            <AudioGameBtn
              key={el}
              tabIndex={-1}
              $color={toggleCorrect(el)}
              disabled={!!selectedAnswer}
              onClick={() => selectAnswer(el)}
            >
              {`${i + 1} ${el}`}
            </AudioGameBtn>
          ))}
        </AudioGameOptions>
      </AudioGameWrapper>
      <AudioGameWrapper>
        {!selectedAnswer
          ? (
            <AudioGameBtn
              tabIndex={-1}
              onClick={skipAnswer}
            >
              Не знаю
            </AudioGameBtn>
          )
          : (
            <AudioGameBtn
              tabIndex={-1}
              onClick={nextStep}
            >
              Далее
            </AudioGameBtn>
          )}
      </AudioGameWrapper>
    </AudioGameContainer>
  );
}

export default AudioGame;
