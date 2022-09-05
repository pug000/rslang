import styled from 'styled-components';

import { ColorProps } from '@/ts/interfaces';

interface GroupButtonProps extends ColorProps {
  active: boolean,
}

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
  margin-bottom: 40px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  gap: 35px;
  display: grid;
  grid-template-columns: 1fr 77px;
  user-select: none;
  grid-template-areas: 
  "paginationTop paginationTop"
  "words group" 
  "paginationBottom paginationBottom";
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.title};
  margin-top: 20px;
`;

const Note = styled.p`
  font-size: 14px;
  color: rgba(0,0,0,0.4);
  font-style: italic;
  text-align: center;
  max-width: 350px;
`;

const WordsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  grid-area: words;
  align-items: center;
  justify-content: center;

  @media (max-width: 950px) {
    align-items: center;
  }
`;

const GamesWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 20px;
  gap: 20px;

  Button {
    width: 150px;
  }
`;

const GroupContainer = styled.div``;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  gap: 10px;
  position: sticky;
  top: 15px;
  grid-area: group;
`;

const GroupButton = styled.button<GroupButtonProps>`
  width: 55px;
  height: 55px;
  border: 3px solid;
  border-radius: 15%;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.backgroundWhite};
  border-color: ${({ $color }) => $color};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  ${(props) => props.active && `
    background-color: transparent;
    color: ${props.$color};
  `}
`;

const Message = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  font-weight: ${({ theme }) => theme.fontSizes.smallText};
  color: ${({ theme }) => theme.colors.primaryColor};
  position: absolute;
  top: 45px;
  left: 30%;
`;

export {
  BookContainer,
  Title,
  Wrapper,
  GamesWrapper,
  GroupContainer,
  Group,
  GroupButton,
  WordsContainer,
  Note,
  Message
};
