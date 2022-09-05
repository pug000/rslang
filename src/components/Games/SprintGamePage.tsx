import React, {
  useEffect,
  useState
} from 'react';

import Loader from '@/Loader';
import GameStart from '@/GameStart';
import GameNotification from '@/GameNotification';
import SprintGame from '@/SprintGame';

import { shuffleArray } from '@/utils/randomize';
import { games } from '@/utils/variables';
import { getWords } from '@/api';

import { WordData } from '@/ts/interfaces';

import { GamePageWrapper } from './GamePage.style';
import GamePageBackground from './GamePageBackground';

interface GamePageProps {
  isGameStarted: boolean,
  defaultPage: number,
  defaultGroupNumber: number,
  defaultWords: WordData[],
}

function SprintGamePage(
  {
    isGameStarted,
    defaultPage,
    defaultGroupNumber,
    defaultWords
  }: GamePageProps,
) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentGroupNumber, setCurrentGroupNumber] = useState(defaultGroupNumber);
  const [words, setWords] = useState<WordData[]>(defaultWords);
  const [isLoadingGame, setLoadingGame] = useState(false);

  useEffect(() => {
    if (isLoadingGame) {
      (async () => {
        const data = await getWords(currentGroupNumber, currentPage);
        setWords(shuffleArray(data));
        setLoadingGame(false);
      })();
    }
  }, [isLoadingGame]);

  if (isLoadingGame) {
    return (
      <GamePageWrapper>
        <GamePageBackground $color={games.sprint.backgroundColor} />
        <Loader />
      </GamePageWrapper>
    );
  }

  if (!isGameStarted) {
    return (
      <GameStart
        backgroundColor={games.sprint.backgroundColor}
        elementColor={games.sprint.buttonColor}
        gameTitle={games.sprint.name}
        description={games.sprint.description}
        icon={games.sprint.icon}
        note={games.sprint.note}
        currentGroupNumber={currentGroupNumber}
        setCurrentGroupNumber={setCurrentGroupNumber}
        setCurrentPage={setCurrentPage}
        setLoadingGame={setLoadingGame}
      />
    );
  }

  return (
    <GamePageWrapper>
      <GamePageBackground $color={games.sprint.backgroundColor} />
      {words.length < 10
        ? (
          <GameNotification
            elementColor={games.sprint.buttonColor}
            setLoadingGame={setLoadingGame}
            setCurrentPage={setCurrentPage}
          />
        )
        : (
          <SprintGame
            words={words}
            mainColor={games.sprint.buttonColor}
          />
        )}
    </GamePageWrapper>
  );
}

export default SprintGamePage;
