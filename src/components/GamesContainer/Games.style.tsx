import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

const GamesMainContainer = styled.div`
  padding: 20px 25px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const GamesTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 700;
  margin-bottom: 3rem;
`;

const GamesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 4rem;
  @media (max-width: 980px) {
    flex-wrap: wrap;
  }
`;

const LinkGame = styled(NavLink)`
  &:visited, &:link, &:active, &:hover, &:focus{
    text-decoration: none;
  }
`;

const bgAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(2, 2);
  };
  20% {
    transform: rotate(72deg) scale(1.9, 1.7);
  };
  40% {
    transform: rotate(144deg) scale(2.1, 2);
  };
  60% {
    transform: rotate(216deg) scale(2, 1.85);
  };
  80% {
    transform: rotate(288deg) scale(1.75, 1.95);
  };
  100% {
    transform: rotate(360deg) scale(2, 2);
  }
`;

const GameContainer = styled.div`
  width: 25rem;
  min-height: 15rem;
  color: ${(props) => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: solid 0.2rem ${(props) => props.theme.colors.grey};
  cursor: pointer;
  text-decoration: none;
  transition: ${(props) => props.theme.effects.transition};
  position: relative;

  &:hover{
    border: solid 0.2rem ${(props) => props.theme.colors.primaryColor};
    box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
    transform: scale(1.05);
  }

  &:hover svg {
    transition: ${(props) => props.theme.effects.transition};
    transform: scale(2);
    animation: ${bgAnimation} 8s infinite 0.2s linear
  }
`;

const TitleGame = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h3};
  text-decoration: none;
  transition: ${(props) => props.theme.effects.transition};
`;

const BgDiv = styled.div`
  position: absolute;
  top: 4rem;
  left: 5rem;
  z-index: -1;
`;

const BgContainer = styled.div`
  position: absolute;
  top: -17%;
  left: 50%;
  transform: scale(0.6);
  z-index: 5;

  @media (max-width: 980px) {
    top: -10%;
  }
`;

export {
  GamesMainContainer, GamesTitle, GamesWrapper, LinkGame,
  GameContainer, TitleGame, BgDiv, BgContainer
};
