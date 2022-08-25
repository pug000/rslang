import React, { useState } from 'react';
import Loader from '@/Loader';
import GamePageBg from './GamePageBg';
import GameStartPage from './GameStartPage';
import { Main } from './GamePage.style';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingGame, setLoadingGame] = useState(false);

  if (isLoadingGame) {
    return (
      <Main>
        <Loader />
      </Main>
    );
  }

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
