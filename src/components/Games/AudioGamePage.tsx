import React, {
  useEffect,
  useState
} from 'react';

import AudioGame from '@/AudioGame';
import GameStart from '@/GameStart';

import { shuffleArray } from '@/utils/randomize';
import { games } from '@/utils/variables';
import { getWords } from '@/api';

import { WordData } from '@/ts/interfaces';

import Loader from '../Loader/Loader';
import GamePageBackground from './GamePageBackground';

import { GamePageWrapper } from './GamePage.style';

interface GamePageProps {
  isGameStarted: boolean,
  defaultPage: number,
  defaultGroupNumber: number,
  defaultWords: WordData[],
}

function AudioGamePage(
  {
    isGameStarted,
    defaultPage,
    defaultGroupNumber,
    defaultWords,
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
        setTimeout(() => {
          setWords(shuffleArray(data));
          setLoadingGame(false);
        }, 500);
      })();
    }
  }, [isLoadingGame]);

  if (isLoadingGame) {
    return (
      <GamePageWrapper>
        <GamePageBackground $color={games.audio.backgroundColor} />
        <Loader />
      </GamePageWrapper>
    );
  }

  if (!isGameStarted) {
    return (
      <GameStart
        backgroundColor={games.audio.backgroundColor}
        elementColor={games.audio.buttonColor}
        gameTitle={games.audio.name}
        description={games.audio.description}
        icon={games.audio.icon}
        note={games.audio.note}
        currentGroupNumber={currentGroupNumber}
        setCurrentGroupNumber={setCurrentGroupNumber}
        setCurrentPage={setCurrentPage}
        setLoadingGame={setLoadingGame}
      />
    );
  }

  return (
    <GamePageWrapper>
      <GamePageBackground $color={games.audio.backgroundColor} />
      <AudioGame
        words={words}
        mainColor={games.audio.buttonColor}
      />
    </GamePageWrapper>
  );
}

export default AudioGamePage;
