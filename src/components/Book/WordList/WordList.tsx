import { baseUrl } from '@/api';
import WordListContext from '@/contexts/WordListContext';
import defaultTheme from '@/styles/theme';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import DOMPurify from 'dompurify';
import React, { useContext } from 'react';
import {
  DifficultWordBtn, DifficultWordBtnActive, LearnedWordBtn, Word, WordBtnContainer,
  WordImg, WordInfoContainer, WordInfoWrapper, WordPlay, WordsContainer, WordText, WordTitle
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
                  <WordPlay />
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
