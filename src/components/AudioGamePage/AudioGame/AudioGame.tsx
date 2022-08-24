import { WordData } from '@/ts/interfaces';
import React from 'react';

interface AudioGameProps {
  words: WordData[],
}

function AudioGame(
  {
    words,
  }: AudioGameProps
) {
  return (
    <>
      {words.map((item) => (
        <div key={item.id}>{item.word}</div>
      ))}
    </>
  );
}

export default AudioGame;
