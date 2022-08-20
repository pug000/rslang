import styled from 'styled-components';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

interface ColorsProps {
  colors: string,
}

const stylesBtn = {
  cursor: 'pointer',
  transition: `${defaultTheme.effects.transition}`,
};

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

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  color: ${({ theme }) => theme.colors.purple};
`;

const Wrapper = styled.div`
  width: 100%;
  gap: 30px;
  display: grid;
  grid-template-columns: 1fr 77px;
  grid-template-areas: "words group" "pagination pagination";
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: pagination;
  gap: 3px;
  flex-wrap: wrap;
`;

const PaginationPrev = styled(NavigateBeforeIcon).attrs({
  style: {
    ...stylesBtn,
    width: '35px',
    height: '35px',
  }
})`

`;

const PaginationNext = styled(NavigateNextIcon).attrs({
  style: {
    ...stylesBtn,
    width: '35px',
    height: '35px',
  }
})`
`;

const PaginationPageBtn = styled.button<ColorsProps>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.bgWhite};
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ colors }) => colors};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
    background-color: ${({ theme }) => theme.colors.primaryColor};
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

const GroupBtn = styled.button`
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: ${(props) => props.theme.effects.transition};
  background-color: ${(props) => props.theme.colors.purple};
  color: ${(props) => props.theme.colors.bgWhite};

  &:hover {
    opacity: ${(props) => props.theme.effects.hoverOpacity};
  }
`;

export {
  BookContainer, Title, Wrapper, GamesWrapper, GameLink, Group, GroupBtn, GroupTitle,
  PaginationWrapper, PaginationPrev, PaginationNext, PaginationPageBtn,
};
