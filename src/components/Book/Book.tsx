import { GroupBtn } from '@/ts/interfaces';
import React from 'react';
import {
  BookContainer,
  BookGroup,
  BookGroupBtn,
  BookGroupTitle,
  BookItemsContainer,
  BookTitle,
  BookWrapper,
} from './styled';

function Book() {
  const groupBtns: GroupBtn[] = [
    { id: 1, text: '1' },
    { id: 2, text: '2' },
    { id: 3, text: '3' },
    { id: 4, text: '4' },
    { id: 5, text: '5' },
    { id: 6, text: '6' }
  ];

  return (
    <BookContainer>
      <BookTitle>Учебник</BookTitle>
      <BookWrapper>
        <BookItemsContainer />
        <BookGroup>
          <BookGroupTitle>Раздел</BookGroupTitle>
          {groupBtns.map(({ id, text }) => (
            <BookGroupBtn key={id}>{text}</BookGroupBtn>
          ))}
        </BookGroup>
      </BookWrapper>
    </BookContainer>
  );
}

export default Book;
