import { baseUrl } from '@/api';
import WordListContext from '@/contexts/WordListContext';
import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import DOMPurify from 'dompurify';
import React, {
  useContext, useRef, useState, useEffect
} from 'react';
import {
  DifficultWordBtn, DifficultWordBtnActive, LearnedWordBtn, Word, WordBtnContainer,
  WordImg, WordInfoContainer, WordInfoWrapper, WordPlayAudioBtn, WordPlayIcon, WordsContainer,
  WordText, WordTitle
} from './WordList.style';

interface WordListProps {
  words: WordData[],
}

function WordsList(
  {
    words,
  }: WordListProps
) {
  const {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords
  } = useContext(WordListContext);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [audioUrls, setAudioUrls] = useState<string[]>([]);

  const toggleActive = (arr: WordData[], word: WordData) => (
    arr.some((el) => el.id === word.id)
  );

  const addActiveWord = (word: WordData, setState: SetState<WordData[]>) => (
    setState((prev) => [...prev, word])
  );

  const removeActiveWord = (word: WordData, setState: SetState<WordData[]>) => (
    setState((prev) => prev.filter((item) => item.id !== word.id))
  );

  const handleClick = (arr: WordData[], word: WordData, setState: SetState<WordData[]>) => (
    toggleActive(arr, word)
      ? removeActiveWord(word, setState)
      : addActiveWord(word, setState)
  );

  const nextAudio = () => {
    if (index < audioUrls.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      setPlaying(() => false);
    }
  };

  const startAudio = () => {
    clearInterval(intervalRef.current);

    if (audioRef.current) {
      audioRef.current.play();

      intervalRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.ended) {
          nextAudio();
        }
      });
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.src = audioUrls[index];
      audioRef.current.volume = 0.5;
      startAudio();
    }
  }, [isPlaying, index]);

  const playOnClick = (paths: string[]) => {
    if (audioRef.current) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      setIndex(0);
    }

    setAudioUrls(paths.map((el) => `${baseUrl}/${el}`));
    setPlaying(true);
  };

  return (
    <WordsContainer>
      {words.map((item) => (
        <Word key={item.id}>
          <WordImg src={`${baseUrl}/${item.image}`} alt="word-img" />
          <WordInfoContainer>
            <div>
              <WordInfoWrapper>
                <WordTitle>
                  {`${item.word} - ${item.transcription}`}
                  <WordPlayAudioBtn
                    // disabled={isPlaying}
                    onClick={() => (
                      playOnClick([item.audio, item.audioMeaning, item.audioExample])
                    )}
                  >
                    <WordPlayIcon disabled={isPlaying} />
                  </WordPlayAudioBtn>
                </WordTitle>
                <WordText
                  color={defaultTheme.colors.text}
                  fontSize={defaultTheme.fontSizes.smallText}
                  opacity={defaultTheme.effects.hoverOpacity}
                >
                  {`${item.wordTranslate}`}
                </WordText>
              </WordInfoWrapper>
              <WordInfoWrapper>
                <WordText
                  dangerouslySetInnerHTML={
                    {
                      __html: DOMPurify.sanitize(item.textMeaning)
                    }
                  }
                  color={defaultTheme.colors.textBold}
                  fontSize={defaultTheme.fontSizes.smallText}
                />
                <WordText
                  dangerouslySetInnerHTML={
                    {
                      __html: DOMPurify.sanitize(item.textMeaningTranslate)
                    }
                  }
                  color={defaultTheme.colors.text}
                  fontSize={defaultTheme.fontSizes.smallText}
                  opacity={defaultTheme.effects.hoverOpacity}
                />
              </WordInfoWrapper>
              <WordInfoWrapper>
                <WordText
                  dangerouslySetInnerHTML={
                    {
                      __html: DOMPurify.sanitize(item.textExample)
                    }
                  }
                  color={defaultTheme.colors.textBold}
                  fontSize={defaultTheme.fontSizes.smallText}
                />
                <WordText
                  dangerouslySetInnerHTML={
                    {
                      __html: DOMPurify.sanitize(item.textExampleTranslate)
                    }
                  }
                  color={defaultTheme.colors.text}
                  fontSize={defaultTheme.fontSizes.smallText}
                  opacity={defaultTheme.effects.hoverOpacity}
                />
              </WordInfoWrapper>
            </div>
          </WordInfoContainer>
          <WordBtnContainer>
            <LearnedWordBtn
              colors={
                toggleActive(learnedWords, item)
                  ? defaultTheme.colors.primaryColor
                  : defaultTheme.colors.grey
              }
              onClick={() => handleClick(learnedWords, item, setLearnedWords)}
            />
            {
              toggleActive(difficultWords, item)
                ? (
                  <DifficultWordBtnActive
                    onClick={() => handleClick(difficultWords, item, setDifficultWords)}
                  />
                )
                : (
                  <DifficultWordBtn
                    onClick={() => handleClick(difficultWords, item, setDifficultWords)}
                  />
                )
            }
          </WordBtnContainer>
        </Word>
      ))}
    </WordsContainer>
  );
}

export default WordsList;
