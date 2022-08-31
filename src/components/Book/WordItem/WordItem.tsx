import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import DOMPurify from 'dompurify';
import defaultTheme from '@/styles/theme';

import BookContext from '@/contexts/BookContext';

import { baseUrl } from '@/api';

import {
  Track,
  WordData
} from '@/ts/interfaces';
import SetState from '@/ts/types';

import {
  DifficultWordButton,
  DifficultWordButtonActive,
  LearnedWordButton,
  Word,
  WordButtonContainer,
  WordImage,
  WordInfoContainer,
  WordInfoWrapper,
  WordPlayAudioButton,
  WordPlayIcon,
  WordText,
  WordTitle
} from './WordItem.style';

interface WordItemProps {
  item: WordData,
  audio: HTMLAudioElement | null,
  setNewAudio: (value: HTMLAudioElement | null) => void,
}

function WordItem(
  {
    item,
    audio,
    setNewAudio,
  }: WordItemProps
) {
  const {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords
  } = useContext(BookContext);
  const audioWord = useRef(new Audio());
  const audioMeaning = useRef(new Audio());
  const audioExample = useRef(new Audio());

  const tracks: Track[] = [
    {
      id: 1, src: `${baseUrl}/${item.audio}`, ref: audioWord, onEnded: audioMeaning.current,
    },
    {
      id: 2, src: `${baseUrl}/${item.audioMeaning}`, ref: audioMeaning, onEnded: audioExample.current,
    },
    {
      id: 3, src: `${baseUrl}/${item.audioExample}`, ref: audioExample, onEnded: null,
    },
  ];

  const toggleActive = (arr: WordData[]) => (
    arr.some((el) => el.id === item.id)
  );

  const addActiveWord = (setState: SetState<WordData[]>) => (
    setState((prev) => [...prev, item])
  );

  const removeActiveWord = (setState: SetState<WordData[]>) => (
    setState((prev) => prev.filter((el) => el.id !== item.id))
  );

  const handleClick = (arr: WordData[], setState: SetState<WordData[]>) => (
    toggleActive(arr)
      ? removeActiveWord(setState)
      : addActiveWord(setState)
  );

  useEffect(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);

  const playAudioOnClick = () => {
    if (audio) {
      audio.pause();
      const currentAudio = audio;
      currentAudio.currentTime = 0;
      setNewAudio(null);
    }

    setNewAudio(audioWord.current);
  };

  return (
    <Word>
      <WordImage src={`${baseUrl}/${item.image}`} alt="word-img" />
      <WordInfoContainer>
        <div>
          <WordInfoWrapper>
            <WordTitle>
              {`${item.word} - ${item.transcription}`}
              <WordPlayAudioButton onClick={() => playAudioOnClick()}>
                <WordPlayIcon />
                {tracks.map((el) => (
                  <audio
                    key={el.id}
                    ref={el.ref}
                    onEnded={() => setNewAudio(el.onEnded)}
                  >
                    <source src={el.src} />
                    <track kind="captions" />
                  </audio>
                ))}
              </WordPlayAudioButton>
            </WordTitle>
            <WordText
              $color={defaultTheme.colors.text}
              fontSize={defaultTheme.fontSizes.smallText}
              opacity={defaultTheme.effects.hoverOpacity}
            >
              {item.wordTranslate}
            </WordText>
          </WordInfoWrapper>
          <WordInfoWrapper>
            <WordText
              dangerouslySetInnerHTML={
                {
                  __html: DOMPurify.sanitize(item.textMeaning)
                }
              }
              $color={defaultTheme.colors.textBold}
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
              $color={defaultTheme.colors.text}
              fontSize={defaultTheme.fontSizes.smallText}
              opacity={defaultTheme.effects.hoverOpacity}
            />
          </WordInfoWrapper>
        </div>
      </WordInfoContainer>
      <WordButtonContainer>
        <LearnedWordButton
          $color={
            toggleActive(learnedWords)
              ? defaultTheme.colors.primaryColor
              : defaultTheme.colors.grey
          }
          onClick={() => handleClick(learnedWords, setLearnedWords)}
        />
        {
          toggleActive(difficultWords)
            ? (
              <DifficultWordButtonActive
                onClick={() => handleClick(difficultWords, setDifficultWords)}
              />
            )
            : (
              <DifficultWordButton
                onClick={() => handleClick(difficultWords, setDifficultWords)}
              />
            )
        }
      </WordButtonContainer>
    </Word>
  );
}

export default WordItem;
