import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

interface ColorsProps {
  colors: string,
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
  width: 100%;
  gap: 35px;
  display: grid;
  grid-template-columns: 1fr 77px;
  grid-template-areas: 
  "paginationTop paginationTop"
  "words group" 
  "paginationBottom paginationBottom";
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  color: ${({ theme }) => theme.colors.purple};
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
  justify-content: space-evenly;
  padding: 20px;
  gap: 20px;
`;

const GameLink = styled(NavLink)`
  max-width: 200px;
  width: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.bgWhite};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  transition: ${({ theme }) => theme.effects.transition};

  &:link{
    text-decoration: none;
  }

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

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
  box-shadow: 0px 3px 3px 0px rgb(0 0 0 / 20%),
  0px 3px 4px 0px rgb(0 0 0 / 14%),
  0px 1px 8px 0px rgb(0 0 0 / 12%);
  grid-area: group;
`;

const GroupTitle = styled.h4`
  color: ${({ theme }) => theme.colors.purple};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const GroupBtn = styled.button<ColorsProps>`
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ colors }) => colors};
  color: ${({ theme }) => theme.colors.bgWhite};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.blue};
  }
  25% {
    transform: rotate(90deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.textHighlighted};
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.orange};
  }
  75% {
    transform: rotate(270deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.pink};
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.blue};
  }
`;

const LoadingRing = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255,255,255,0.3);
    animation: ${ringAnimation} 2s linear infinite;
  }
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.textBold};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

export {
  BookContainer, Title, Wrapper, GamesWrapper, GameLink, Group, GroupBtn, GroupTitle,
  WordsContainer, LoadingRing, LoadingText,
};
