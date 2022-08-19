import { baseUrl, getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { Btn, WordData } from '@/ts/interfaces';
import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import SetState from '@/ts/types';
import getPages from '@/utils';
import {
  BookContainer,
  Group,
  GroupBtn,
  GroupTitle,
  Word,
  WordImg,
  WordsContainer,
  Title,
  Wrapper,
  WordTitle,
  WordInfoContainer,
  WordText,
  WordInfoWrapper,
  WordPlay,
  WordBtnContainer,
  DifficultWordBtn,
  LearnedWordBtn,
  DifficultWordBtnActive,
  PaginationWrapper,
  PaginationPrev,
  PaginationNext,
  PaginationPageBtn,
  GamesWrapper,
  GameLink,
} from './Book.style';

interface BookProps {
  difficultWords: WordData[],
  learnedWords: WordData[],
  setDifficultWords: SetState<WordData[]>,
  setLearnedWords: SetState<WordData[]>,
}

function Book(
  {
    difficultWords,
    learnedWords,
    setDifficultWords,
    setLearnedWords,
  }: BookProps
) {
  const [words, setWords] = useState<WordData[]>([]);
  const [groupCount, setGroupCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<Btn[]>([]);
  const totalCountPages = 30;
  const groupBtns: Btn[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 }
  ];

  useMemo(() => {
    setPages(getPages(totalCountPages));
  }, [totalCountPages]);

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

  useEffect(() => {
    (async () => {
      const res = await getWords(groupCount, currentPage);
      setWords(res.data);
    })();
  }, [groupCount, currentPage]);

  return (
    <BookContainer>
      <Title>Учебник</Title>
      <GamesWrapper>
        <GameLink to="/games/sprint">Спринт</GameLink>
        <GameLink to="/games/audio">Аудиовызов</GameLink>
      </GamesWrapper>
      <Wrapper>
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
        <div>
          <Group>
            <GroupTitle>Раздел</GroupTitle>
            {groupBtns.map(({ id, value }) => (
              <GroupBtn key={id} onClick={() => setGroupCount(value - 1)}>{value}</GroupBtn>
            ))}
          </Group>
        </div>
        <PaginationWrapper>
          <PaginationPrev
            onClick={() => (currentPage < 1
              ? ''
              : setCurrentPage(currentPage - 1))}
          />
          {pages.map(({ id, value }) => (
            <PaginationPageBtn
              key={id}
              onClick={() => setCurrentPage(value)}
              colors={
                currentPage === value
                  ? defaultTheme.colors.primaryColor
                  : defaultTheme.colors.grey
              }
            >
              {value + 1}
            </PaginationPageBtn>
          ))}
          <PaginationNext onClick={() => (currentPage === totalCountPages - 1
            ? ''
            : setCurrentPage(currentPage + 1))}
          />
        </PaginationWrapper>
      </Wrapper>
    </BookContainer>
  );
}

export default Book;
