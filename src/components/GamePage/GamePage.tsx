import { WordData } from '@/ts/interfaces';
import { SetState } from '@/ts/types';
import { groupBtns, totalCountPages } from '@/utils/variables';
import React, { useEffect, useState } from 'react';
import { generateRandomNumber, shuffleArray } from '@/utils/randomize';
import AudioGame from '@/AudioGame';
import { getWords } from '@/api';
import Main from './GamePage.style';

interface AudioGameProps {
  isGameStarted: boolean,
  defaultPage: number,
  defaultGroupNumber: number,
  defaultWords: WordData[],
  setIsGameStarted: SetState<boolean>,
}

function AudioGamePage(
  {
    isGameStarted,
    defaultPage,
    defaultGroupNumber,
    defaultWords,
    setIsGameStarted,
  }: AudioGameProps,
) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentGroupNumber, setCurrentGroupNumber] = useState(defaultGroupNumber);
  const [words, setWords] = useState<WordData[]>(defaultWords);
  const [isLoadingGame, setIsLoadingGame] = useState(false);

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
      <Main>
        <div>Загрузка...</div>
      </Main>
    );
  }

  if (!isGameStarted) {
    return (
      <Main>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {groupBtns.map((
            {
              id,
              value,
              color,
              text
            }
          ) => (
            <button
              type="button"
              key={id}
              style={currentGroupNumber === value
                ? { backgroundColor: '#000' }
                : { color }}
              onClick={() => setCurrentGroupNumber(value)}
            >
              {text}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setCurrentPage(generateRandomNumber(totalCountPages - 1));
              setIsLoadingGame(true);
              setIsGameStarted(true);
            }}
          >
            Start Game
          </button>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <AudioGame
        words={words}
        setIsGameStarted={setIsGameStarted}
      />
    </Main>
  );
}

export default AudioGamePage;
