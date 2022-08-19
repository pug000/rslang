import { baseUrl, getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { GroupBtn, Word } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { SetState } from '@/ts/types';
import {
  BookContainer,
  BookGroup,
  BookGroupBtn,
  BookGroupTitle,
  BookItem,
  BookItemImg,
  BookItemsContainer,
  BookTitle,
  BookWrapper,
  BookItemTitle,
  BookItemInfoContainer,
  BookItemText,
  BookItemInfoWrapper,
  BookItemPlay,
  BookItemBtnContainer,
  DifficultWordBtn,
  LearnedWordBtn,
  DifficultWordBtnActive,
} from './styled';

interface BookProps {
  difficultWords: Word[],
  learnedWords: Word[],
  setDifficultWords: SetState<Word[]>,
  setLearnedWords: SetState<Word[]>,
}

function Book(
  {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords,
  }: BookProps
) {
  const [words, setWords] = useState<Word[]>([]);
  const groupBtns: GroupBtn[] = [
    { id: 1, text: '1' },
    { id: 2, text: '2' },
    { id: 3, text: '3' },
    { id: 4, text: '4' },
    { id: 5, text: '5' },
    { id: 6, text: '6' }
  ];

  const toggleActive = (arr: Word[], word: Word) => (
    arr.some((el) => el.id === word.id)
  );

  const addActiveWord = (word: Word, setState: SetState<Word[]>) => (
    setState((prev) => [...prev, word])
  );

  const removeActiveWord = (word: Word, setState: SetState<Word[]>) => (
    setState((prev) => prev.filter((item) => item.id !== word.id))
  );

  const handleClick = (arr: Word[], word: Word, setState: SetState<Word[]>) => (
    toggleActive(arr, word)
      ? removeActiveWord(word, setState)
      : addActiveWord(word, setState)
  );

  useEffect(() => {
    getWords().then((data) => setWords(data));
  }, []);

  return (
    <BookContainer>
      <BookTitle>Учебник</BookTitle>
      <BookWrapper>
        <BookItemsContainer>
          {words.map((item) => (
            <BookItem key={item.id}>
              <BookItemImg src={`${baseUrl}/${item.image}`} alt="word-img" />
              <BookItemInfoContainer>
                <div>
                  <BookItemInfoWrapper>
                    <BookItemTitle>
                      {`${item.word} - ${item.transcription}`}
                      <BookItemPlay />
                    </BookItemTitle>
                    <BookItemText
                      color={defaultTheme.colors.text}
                      fontSize={defaultTheme.fontSizes.smallText}
                      opacity={defaultTheme.effects.hoverOpacity}
                    >
                      {`${item.wordTranslate}`}
                    </BookItemText>
                  </BookItemInfoWrapper>
                  <BookItemInfoWrapper>
                    <BookItemText
                      dangerouslySetInnerHTML={
                        {
                          __html: DOMPurify.sanitize(item.textMeaning)
                        }
                      }
                      color={defaultTheme.colors.textBold}
                      fontSize={defaultTheme.fontSizes.smallText}
                    />
                    <BookItemText
                      dangerouslySetInnerHTML={
                        {
                          __html: DOMPurify.sanitize(item.textMeaningTranslate)
                        }
                      }
                      color={defaultTheme.colors.text}
                      fontSize={defaultTheme.fontSizes.smallText}
                      opacity={defaultTheme.effects.hoverOpacity}
                    />
                  </BookItemInfoWrapper>
                  <BookItemInfoWrapper>
                    <BookItemText
                      dangerouslySetInnerHTML={
                        {
                          __html: DOMPurify.sanitize(item.textExample)
                        }
                      }
                      color={defaultTheme.colors.textBold}
                      fontSize={defaultTheme.fontSizes.smallText}
                    />
                    <BookItemText
                      dangerouslySetInnerHTML={
                        {
                          __html: DOMPurify.sanitize(item.textExampleTranslate)
                        }
                      }
                      color={defaultTheme.colors.text}
                      fontSize={defaultTheme.fontSizes.smallText}
                      opacity={defaultTheme.effects.hoverOpacity}
                    />
                  </BookItemInfoWrapper>
                </div>
              </BookItemInfoContainer>
              <BookItemBtnContainer>
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
              </BookItemBtnContainer>
            </BookItem>
          ))}
        </BookItemsContainer>
        <div>
          <BookGroup>
            <BookGroupTitle>Раздел</BookGroupTitle>
            {groupBtns.map(({ id, text }) => (
              <BookGroupBtn key={id}>{text}</BookGroupBtn>
            ))}
          </BookGroup>
        </div>
      </BookWrapper>
    </BookContainer>
  );
}

export default Book;
