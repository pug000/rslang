import React from 'react';
import GameElement from './GameElement';
import {
  GamesMainContainer, GamesTitle, GamesWrapper, LinkGame
} from './Games.style';

function GamesContainer() {
  return (
    <GamesMainContainer>
      <GamesTitle>Игры</GamesTitle>
      <GamesWrapper>
        <LinkGame to="/sprint">
          <GameElement
            title="Спринт"
          />
        </LinkGame>
        <LinkGame to="/audio">
          <GameElement
            title="Аудиовызов"
          />
        </LinkGame>
      </GamesWrapper>
    </GamesMainContainer>
  );
}

export default GamesContainer;
