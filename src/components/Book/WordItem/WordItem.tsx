import { baseUrl, createUserWord, deleteUserWord } from '@/api';
import defaultTheme from '@/styles/theme';
import { Track, WordData, WordCreateProp } from '@/ts/interfaces';
import SetState from '@/ts/types';
import DOMPurify from 'dompurify';
import React, {
  useContext, useRef, useEffect,
} from 'react';
import WordItemContext from '@/contexts/WordItemContext';
import {
  DifficultWordBtn, DifficultWordBtnActive, LearnedWordBtn, Word, WordBtnContainer,
  WordImg, WordInfoContainer, WordInfoWrapper, WordPlayAudioBtn, WordPlayIcon,
  WordText, WordTitle
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
  } = useContext(WordItemContext);
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

  const createWordProp = (word: WordData, isDifficultWord: boolean) => {
    const currentWord: WordCreateProp = {
      difficulty: String(word.group),
      optional: {
        isDifficultWord: String(isDifficultWord),
      }
    };
    return currentWord;
  };

  const addActiveWord = (setState: SetState<WordData[]>, isDifficultWord: boolean) => {
    setState((prev) => [...prev, item]);
    const currentWord = createWordProp(item, isDifficultWord);
    createUserWord(item.id, currentWord);
  };

  const removeActiveWord = (setState: SetState<WordData[]>) => {
    setState((prev) => prev.filter((el) => el.id !== item.id));
    deleteUserWord(item.id);
  };

  const handleClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    arr: WordData[],
    setState: SetState<WordData[]>
  ) => {
    let isDifficultWord: boolean;
    if (e.currentTarget.id === 'learned') {
      isDifficultWord = false;
      // setDifficultWords((prev) => prev.filter((el) => el.id === item.id));
    } else {
      isDifficultWord = true;
      // setLearnedWords((prev) => prev.filter((el) => el.id === item.id));
    }
    console.log('difficultWords 3 ', difficultWords);
    console.log('learnedWords 3 ', learnedWords);
    toggleActive(arr)
      ? removeActiveWord(setState)
      : addActiveWord(setState, isDifficultWord);
  };

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
      <WordImg src={`${baseUrl}/${item.image}`} alt="word-img" />
      <WordInfoContainer>
        <div>
          <WordInfoWrapper>
            <WordTitle>
              {`${item.word} - ${item.transcription}`}
              <WordPlayAudioBtn
                onClick={() => playAudioOnClick()}
              >
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
          id="learned"
          colors={
            toggleActive(learnedWords)
              ? defaultTheme.colors.primaryColor
              : defaultTheme.colors.grey
          }
          onClick={(e) => handleClick(e, learnedWords, setLearnedWords)}
        />
        {
          toggleActive(difficultWords)
            ? (
              <DifficultWordBtnActive
                onClick={(e) => handleClick(e, difficultWords, setDifficultWords)}
              />
            )
            : (
              <DifficultWordBtn
                onClick={(e) => handleClick(e, difficultWords, setDifficultWords)}
              />
            )
        }
      </WordBtnContainer>
    </Word>
  );
}

export default WordItem;
