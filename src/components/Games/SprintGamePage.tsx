import { WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import { shuffleArray } from '@/utils/randomize';
import { getWords } from '@/api';
import { games } from '@/utils/variables';
import Loader from '@/Loader';
import GameStart from '@/GameStart';
import SprintGame from '@/SprintGame';
import { GamePageWrapper } from './GamePage.style';
import GamePageBg from './GamePageBg';

interface GamePageProps {
  isGameStarted: boolean,
  changeGameState: (value: boolean) => void,
  defaultPage: number,
  defaultGroupNumber: number,
  defaultWords: WordData[],
}

function SprintGamePage(
  {
    isGameStarted,
    changeGameState,
    defaultPage,
    defaultGroupNumber,
    defaultWords
  }: GamePageProps,
) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentGroupNumber, setCurrentGroupNumber] = useState(defaultGroupNumber);
  const [words, setWords] = useState<WordData[]>(defaultWords);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      window.addEventListener('popstate', () => changeGameState(false));
    }

    return () => (
      window.removeEventListener('popstate', () => changeGameState(false))
    );
  }, [isGameStarted]);

  useEffect(() => {
    if (isLoadingGame) {
      (async () => {
        const data = await getWords(currentGroupNumber, currentPage);
        setTimeout(() => {
          setWords(shuffleArray(data));
          setIsLoadingGame(false);
        }, 500);
      })();
    }
  }, [isLoadingGame]);

  if (isLoadingGame) {
    return (
      <GamePageWrapper>
        <GamePageBg color={games.sprint.bgColor} />
        <Loader />
      </GamePageWrapper>
    );
  }

  if (!isGameStarted) {
    return (
      <GameStart
        bgColor={games.sprint.bgColor}
        elementColor={games.sprint.btnColor}
        gameTitle={games.sprint.name}
        description={games.sprint.description}
        icon={games.sprint.icon}
        note={games.sprint.note}
        currentGroupNumber={currentGroupNumber}
        setCurrentGroupNumber={setCurrentGroupNumber}
        setCurrentPage={setCurrentPage}
        setIsLoadingGame={setIsLoadingGame}
        changeGameState={changeGameState}
      />
    );
  }

  return (
    <GamePageWrapper>
      <GamePageBg color={games.sprint.bgColor} />
      <SprintGame
        words={words}
        changeGameState={changeGameState}
        mainColor={games.sprint.btnColor}
        isGameStarted={isGameStarted}
      />
    </GamePageWrapper>
  );
}

export default SprintGamePage;