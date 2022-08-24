import { getWords } from '@/api';
import { WordData } from '@/ts/interfaces';
import SetState from '@/ts/types';
import { groupBtns, totalCountPages } from '@/utils/variables';
import React, { useEffect, useState } from 'react';
import generateRandomNumber from '@/utils/randomize';
import AudioGame from './AudioGame/AudioGame';

interface AudioGameProps {
  isGameStarted: boolean,
  defaultPage: number,
  defaultGroupNumber: number,
  setIsGameStarted: SetState<boolean>,
}

function AudioGamePage(
  {
    isGameStarted,
    defaultPage,
    defaultGroupNumber,
    setIsGameStarted,
  }: AudioGameProps,
) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [currentGroupNumber, setCurrentGroupNumber] = useState(defaultGroupNumber);
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    (async () => {
      if (isGameStarted) {
        const res = await getWords(currentGroupNumber, currentPage);
        setWords(res);
      }
    })();
  }, [isGameStarted]);

  if (!isGameStarted) {
    return (
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
            setIsGameStarted(true);
          }}
        >
          Start Game

        </button>
      </div>
    );
  }

  return (
    <AudioGame words={words} />
  );
}

export default AudioGamePage;
