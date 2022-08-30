import { baseUrl } from '@/api';
import { WordData } from '@/ts/interfaces';
import { shuffleArray } from '@/utils/randomize';
import React, {
  useContext, useEffect, useState
} from 'react';
import GameControl from '@/GameControl';
import GameContext from '@/contexts/GameContext';
import GameResults from '@/GameResults';
import {
  AudioBtn, AudioGameBtn, AudioIcon, AudioGameOptions, AudioGameWrapper, AudioGameContainer, Note,
  GameBlock,
} from './AudioGame.style';

interface AudioGameProps {
  words: WordData[],
  mainColor: string,
}

function AudioGame(
  {
    words,
    mainColor,
  }: AudioGameProps
) {
  const {
    correctAnswers,
    incorrectAnswers,
    isShowResult,
    setIsShowResult,
    setCorrectAnswers,
    setIncorrectAnswers,
  } = useContext(GameContext);
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [wordsOptions, setWordsOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audio = new Audio();

  useEffect(() => {
    if (step <= words.length - 1) {
      setCurrentWord(words[step]);
    }

    if (step === words.length) {
      setIsShowResult(true);
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

  const changePlayStatus = (value: boolean) => setIsPlayingAudio(value);

  useEffect(() => {
    if (isPlayingAudio) {
      audio.src = `${baseUrl}/${currentWord.audio}`;
      audio.play();

      audio.addEventListener(('ended'), () => changePlayStatus(false));
    }

    return () => {
      audio.removeEventListener('ended', () => changePlayStatus(false));
      audio.remove();
    };
  }, [isPlayingAudio]);

  const toggleCorrect = (word: string) => {
    if (currentWord.wordTranslate === word && selectedAnswer) {
      return 'CorrectAnswer';
    }

    if (selectedAnswer === word) {
      return 'IncorrectAnswer';
    }

    return '';
  };

  const handleEvent = (word: string) => {
    if (currentWord.wordTranslate === word) {
      setCorrectAnswers((prev) => [...prev, currentWord]);
    } else {
      setIncorrectAnswers((prev) => [...prev, currentWord]);
    }
  };

  const nextStep = () => {
    setSelectedAnswer(undefined);
    setStep((prev) => prev + 1);
    setIsPlayingAudio(false);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!selectedAnswer) {
      const currentKey = Number(e.key) - 1;
      const word = wordsOptions[currentKey];

      if (word) {
        setSelectedAnswer(word);
        handleEvent(word);
      }
    }

    if (e.code === 'Enter') {
      if (!selectedAnswer) {
        setSelectedAnswer('Incorrect');
        handleEvent('Incorrect');
      } else {
        nextStep();
      }
    }
  };

  useEffect(() => {
    if (step < words.length) {
      document.addEventListener('keypress', handleKey);
    }

    return () => document.removeEventListener('keypress', handleKey);
  }, [wordsOptions, selectedAnswer, step]);

  return (
    <AudioGameContainer>
      <GameControl
        color={mainColor}
      />
      {!isShowResult ? (
        <GameBlock>
          <AudioGameWrapper>
            <AudioBtn
              tabIndex={-1}
              disabled={isPlayingAudio}
              onClick={() => setIsPlayingAudio(true)}
            >
              <AudioIcon $active={isPlayingAudio} />
            </AudioBtn>
            <AudioGameOptions>
              {wordsOptions.map((el, i) => (
                <AudioGameBtn
                  key={el}
                  tabIndex={-1}
                  className={toggleCorrect(el)}
                  disabled={!!selectedAnswer}
                  onClick={() => {
                    setSelectedAnswer(el);
                    handleEvent(el);
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
                <AudioGameBtn
                  tabIndex={-1}
                  disabled={!!selectedAnswer}
                  onClick={() => {
                    setSelectedAnswer('Incorrect');
                    handleEvent('Incorrect');
                  }}
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
            <Note>*можно использовать цифры на клавиатуре и клавишу Enter</Note>
          </AudioGameWrapper>
        </GameBlock>
      )
        : (
          <GameResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            game="audio"
            mainColor={mainColor}
            words={words}
          />
        )}
    </AudioGameContainer>
  );
}

export default AudioGame;
