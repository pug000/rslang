import defaultTheme from '@/styles/theme';
import React from 'react';
import BgContainerIcon from './GameContainerBg';
import GameElement from './GameElement';
import BgElement from './GameElementBg';
import {
  BgDiv, BgContainer, GamesMainContainer, GamesTitle, GamesWrapper, LinkGame
} from './Games.style';

function GamesContainer() {
  return (
    <GamesMainContainer>
      <GamesTitle>Игры</GamesTitle>
      <BgContainer>
        <BgContainerIcon />
      </BgContainer>
      <GamesWrapper>
        <LinkGame to="/games/sprint">
          <GameElement title="Спринт">
            <BgDiv>
              <BgElement color={`${defaultTheme.colors.bgBlue}`} />
            </BgDiv>
          </GameElement>
        </LinkGame>
        <LinkGame to="/games/audio">
          <GameElement title="Аудиовызов">
            <BgDiv>
              <BgElement color={`${defaultTheme.colors.bgPink}`} />
            </BgDiv>
          </GameElement>
        </LinkGame>
      </GamesWrapper>
    </GamesMainContainer>
  );
}

export default GamesContainer;
