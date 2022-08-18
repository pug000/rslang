import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LinkGame = styled(NavLink)`
  &:visited, &:link, &:active, &:hover, &:focus{
    text-decoration: none;
  }
`

const GamesContainer = () => {
  return (
    <div>
      <h2>Игры</h2>
      <div>
        <LinkGame to="/sprint">
          <div
            title='Спринт'
          />
        </LinkGame>
        <LinkGame to="/audio" >
          <div
            title='Аудиовызов'
          />
        </LinkGame>
      </div>
    </div>
  )
}

export default GamesContainer
