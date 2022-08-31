import defaultTheme from '@/styles/theme';
import React from 'react';
import BgContainerIcon from './GameContainerBackground';
import GameElement from './GameElement';
import BackgroundElement from './GameElementBackground';
import {
  BackgroundDiv, BackgroundContainer, GamesMainContainer, GamesTitle, GamesWrapper, LinkGame
} from './Games.style';

function GamesContainer() {
  return (
    <GamesMainContainer>
      <GamesTitle>Игры</GamesTitle>
      <BackgroundContainer>
        <BgContainerIcon />
      </BackgroundContainer>
      <GamesWrapper>
        <LinkGame to="/games/sprint">
          <GameElement title="Спринт">
            <BackgroundDiv>
              <BackgroundElement $color={`${defaultTheme.colors.backgroundBlue}`} />
            </BackgroundDiv>
          </GameElement>
        </LinkGame>
        <LinkGame to="/games/audio">
          <GameElement title="Аудиовызов">
            <BackgroundDiv>
              <BackgroundElement $color={`${defaultTheme.colors.backgroundPink}`} />
            </BackgroundDiv>
          </GameElement>
        </LinkGame>
      </GamesWrapper>
    </GamesMainContainer>
  );
}

export default GamesContainer;
