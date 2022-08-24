import { WordData } from '@/ts/interfaces';
import React from 'react';

interface AudioGameProps {
  words: WordData[],
  isLoadingGame: boolean,
}

function AudioGame(
  {
    words,
    isLoadingGame,
  }: AudioGameProps
) {
  if (isLoadingGame) {
    return (<div>Загрузка...</div>);
  }

  return (
    <>
      {words.map((item) => (
        <div key={item.id}>{item.word}</div>
      ))}
    </>
  );
}

export default AudioGame;
