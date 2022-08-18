import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const GamesMainContainer = styled.div`
  padding: 20px 25px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GamesTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
const GamesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 1.5rem;
`;
const LinkGame = styled(NavLink)`
  &:visited, &:link, &:active, &:hover, &:focus{
    text-decoration: none;
  }
`;

const GameContainer = styled.div`
  width: 20rem;
  min-height: 35rem;
  color: ${(props) => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: solid 0.2rem ${(props) => props.theme.colors.grey};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-out;

  &:hover{
    border: solid 0.2rem ${(props) => props.theme.colors.pink};
    box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
    transform: scale(1.05);
  }
  &:hover h3{
    color: ${(props) => props.theme.colors.pink};
  }
`;
const TitleGame = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h3};
  text-decoration: none;
  transition: all 0.2s ease-out;
`;

export {
  GamesMainContainer, GamesTitle, GamesWrapper, LinkGame, GameContainer, TitleGame,
};
