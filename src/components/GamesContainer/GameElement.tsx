import React from 'react';
import { GameContainer, TitleGame } from './Games.style';

interface GameElementProps {
  title: string,
  children: JSX.Element,
}

function GameElement({ title, children }: GameElementProps) {
  return (
    <GameContainer>
      <TitleGame>{title}</TitleGame>
      {children}
    </GameContainer>
  );
}

export default GameElement;
