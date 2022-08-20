import { getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { Btn, WordData } from '@/ts/interfaces';
import React, { useEffect, useMemo, useState } from 'react';
import getPages from '@/utils';
import WordList from '@/WordList';
import {
  BookContainer, Group, GroupBtn, GroupTitle, Title, Wrapper, PaginationWrapper, PaginationPrev,
  PaginationNext, PaginationPageBtn, GamesWrapper, GameLink,
} from './Book.style';

function Book() {
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
        <WordList words={words} />
        <div>
          <Group>
            <GroupTitle>Раздел</GroupTitle>
            {groupBtns.map(({ id, value }) => (
              <GroupBtn
                key={id}
                colors={
                  groupCount === value - 1
                    ? defaultTheme.colors.primaryColor
                    : defaultTheme.colors.grey
                }
                onClick={() => setGroupCount(value - 1)}
              >
                {value}
              </GroupBtn>
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
