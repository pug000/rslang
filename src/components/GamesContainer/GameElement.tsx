import React from 'react';
import { GameContainer, TitleGame } from './Games.style';

interface GameElementProps {
  title: string;
}

function GameElement({ title }: GameElementProps) {
  return (
    <GameContainer>
      <TitleGame>{title}</TitleGame>
    </GameContainer>
  );
}

export default GameElement;
