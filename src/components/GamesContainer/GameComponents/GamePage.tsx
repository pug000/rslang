import React, { useState } from 'react';
import GamePageBg from './GamePageBg';
import GameStartPage from './GameStartPage';

interface GamePageProps {
  bgColor: string,
  elementColor: string,
  gameTitle: string,
  description: string,
  icon: JSX.Element,
  note: string,
  isGameStarted: boolean,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function GamePage({
  bgColor, elementColor, gameTitle, description, icon, note,
  isGameStarted, setGameStarted
}: GamePageProps) {
  const [currentGroupNumber, setCurrentGroupNumber] = useState(0);

  if (!isGameStarted) {
    return (
      <GameStartPage
        bgColor={bgColor}
        elementColor={elementColor}
        gameTitle={gameTitle}
        description={description}
        icon={icon}
        note={note}
        currentGroupNumber={currentGroupNumber}
        setCurrentGroupNumber={setCurrentGroupNumber}
        setGameStarted={setGameStarted}
      />
    );
  }

  return (
    <div>
      <GamePageBg color={bgColor} />
    </div>
  );
}

export default GamePage;
