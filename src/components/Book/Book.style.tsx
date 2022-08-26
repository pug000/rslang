import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface GroupButtonProps {
  colors: string,
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
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

const GroupBtn = styled.button<GroupButtonProps>`
  width: 55px;
  height: 55px;
  border: 3px solid;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ colors }) => colors};
  color: ${({ theme }) => theme.colors.bgWhite};
  border-color: ${({ colors }) => colors};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  ${(props) => props.active && `
    background-color: transparent;
    color: ${props.colors};
  `}
`;

export {
  BookContainer, Title, Wrapper, GamesWrapper, GameLink, Group, GroupBtn, GroupTitle,
  WordsContainer
};
