import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import GameContext from '@/contexts/GameContext';

import GameControl from '@/GameControl';
import GameResults from '@/GameResults';

import { baseUrl } from '@/api';
import { shuffleArray } from '@/utils/randomize';

import { WordData } from '@/ts/interfaces';

import {
  AudioButton,
  AudioGameButton,
  AudioIcon,
  AudioGameOptions,
  AudioGameWrapper,
  AudioGameContainer,
  Note,
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
    countCorrectAnswers,
    maxCountCorrectAnswers,
    setShowResult,
    setCorrectAnswers,
    setIncorrectAnswers,
    setCountCorrectAnswers,
    setMaxCountCorrectAnswers,
  } = useContext(GameContext);
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordData>(words[step]);
  const [wordsOptions, setWordsOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);
  const audio = new Audio();

  const updateMaxCount = () => {
    if (countCorrectAnswers > maxCountCorrectAnswers) {
      setMaxCountCorrectAnswers(countCorrectAnswers);
    }

    setCountCorrectAnswers(0);
  };

  useEffect(() => {
    if (step <= words.length - 1) {
      setCurrentWord(words[step]);
    }

    if (step === words.length) {
      updateMaxCount();
      setShowResult(true);
    }
  }, [step]);

  useEffect(() => {
    const wrongOptions = shuffleArray(words)
      .filter((item) => item.wordTranslate !== currentWord.wordTranslate)
      .map((item) => item.wordTranslate)
      .slice(0, 4);
    setPlayingAudio(true);
    setWordsOptions(shuffleArray([currentWord.wordTranslate, ...wrongOptions]));
  }, [currentWord]);

  const changePlayStatus = (value: boolean) => setPlayingAudio(value);

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
      setCountCorrectAnswers(countCorrectAnswers + 1);
    } else {
      setIncorrectAnswers((prev) => [...prev, currentWord]);
      updateMaxCount();
    }
  };

  const nextStep = () => {
    setSelectedAnswer(undefined);
    setStep((prev) => prev + 1);
    setPlayingAudio(false);
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
      <GameControl color={mainColor} />
      {!isShowResult ? (
        <GameBlock>
          <AudioGameWrapper>
            <AudioButton
              tabIndex={-1}
              disabled={isPlayingAudio}
              onClick={() => setPlayingAudio(true)}
            >
              <AudioIcon $active={isPlayingAudio} />
            </AudioButton>
            <AudioGameOptions>
              {wordsOptions.map((el, i) => (
                <AudioGameButton
                  key={el}
                  tabIndex={-1}
                  className={toggleCorrect(el)}
                  disabled={!!selectedAnswer}
                  onClick={() => {
                    setSelectedAnswer(el);
                    handleEvent(el);
                  }}
                >
                  {`${i + 1}. ${el}`}
                </AudioGameButton>
              ))}
            </AudioGameOptions>
          </AudioGameWrapper>
          <AudioGameWrapper>
            {!selectedAnswer
              ? (
                <AudioGameButton
                  tabIndex={-1}
                  disabled={!!selectedAnswer}
                  onClick={() => {
                    setSelectedAnswer('Incorrect');
                    handleEvent('Incorrect');
                  }}
                >
                  Не знаю
                </AudioGameButton>
              )
              : (
                <AudioGameButton
                  tabIndex={-1}
                  onClick={nextStep}
                >
                  Далее
                </AudioGameButton>
              )}
            <Note>*можно использовать цифры на клавиатуре и клавишу Enter</Note>
          </AudioGameWrapper>
        </GameBlock>
      )
        : (
          <GameResults
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            maxCount={maxCountCorrectAnswers}
            game="audio"
            mainColor={mainColor}
            words={words}
          />
        )}
    </AudioGameContainer>
  );
}

export default AudioGame;
