import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import GameElement from './GameElement';

const GameContainer = styled.div`
  /* min-height: 40rem;
  max-width: 80rem; */
  padding: 20px 25px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px red;
`
const GameContainerTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-weight: 700;
  margin-bottom: 1.5rem;
`
const GamesWrapper = styled.div`
  /* width: 80%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 1.5rem;
`
const LinkGame = styled(NavLink)`
  &:visited, &:link, &:active, &:hover, &:focus{
    text-decoration: none;
  }
`

const GamesContainer = () => {
  return (
    <GameContainer>
      <GameContainerTitle>Игры</GameContainerTitle>
      <GamesWrapper>
        <LinkGame to="/sprint">
          <GameElement
            title='Спринт'
          />
        </LinkGame>
        <LinkGame to="/audio" >
          <GameElement
            title='Аудиовызов'
          />
        </LinkGame>
      </GamesWrapper>
    </GameContainer>
  )
}

export default GamesContainer
