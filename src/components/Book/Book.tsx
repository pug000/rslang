import { baseUrl, getWords } from '@/api';
import defaultTheme from '@/styles/theme';
import { GroupBtn, WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
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
} from './styled';

function Book() {
  const [words, setWords] = useState<WordData[]>([]);
  const groupBtns: GroupBtn[] = [
    { id: 1, text: '1' },
    { id: 2, text: '2' },
    { id: 3, text: '3' },
    { id: 4, text: '4' },
    { id: 5, text: '5' },
    { id: 6, text: '6' }
  ];

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
                <BookItemInfoWrapper>
                  <BookItemTitle>
                    {`${item.word} - ${item.transcription}`}
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
              </BookItemInfoContainer>
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
