import { WordData } from '@/ts/interfaces';
import React, { useEffect, useState } from 'react';
import { shuffleArray } from '@/utils/randomize';
import AudioGame from '@/components/Games/AudioGame/AudioGame';
import { getWords } from '@/api';
import { games } from '@/utils/variables';
import Loader from '@/Loader';
import GameStart from '@/GameStart';
import { GamePageWrapper } from './GamePage.style';
import GamePageBg from './GamePageBg';

interface GamePageProps {
  isGameStarted: boolean,
  changeGameState: (value: boolean) => void,
  defaultPage: number,
  defaultGroupNumber: number,
  defaultWords: WordData[],
}

function AudioGamePage(
  {
    isGameStarted,
    changeGameState,
    defaultPage,
    defaultGroupNumber,
    defaultWords,
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
        <GamePageBg color={games.audio.bgColor} />
        <Loader />
      </GamePageWrapper>
    );
  }

  if (!isGameStarted) {
    return (
      <GameStart
        bgColor={games.audio.bgColor}
        elementColor={games.audio.btnColor}
        gameTitle={games.audio.name}
        description={games.audio.description}
        icon={games.audio.icon}
        note={games.audio.note}
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
      <GamePageBg color={games.audio.bgColor} />
      <AudioGame
        words={words}
        changeGameState={changeGameState}
      />
    </GamePageWrapper>
  );
}

export default AudioGamePage;
