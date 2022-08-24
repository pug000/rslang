import { WordData } from '@/ts/interfaces';
import React, { useState } from 'react';
import {
  AudioBtn, AudioGameBtn, AudioIcon, AudioGameOptions,
  AudioGameContolBtn, AudioGameWrapper, Link, AudioGameControls, CloseIconSvg,
  FullscreenIconSvg, FullscreenExitIconSvg, AudioGameContainer,
} from './AudioGame.style';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isLoadingGame) {
    return (<div>Загрузка...</div>);
  }

  return (
    <AudioGameContainer>
      <AudioGameControls>
        <AudioGameContolBtn>
          <Link to="/games"><CloseIconSvg /></Link>
        </AudioGameContolBtn>
        <AudioGameContolBtn>
          {!isFullscreen ? <FullscreenIconSvg /> : <FullscreenExitIconSvg />}
        </AudioGameContolBtn>
      </AudioGameControls>
      <AudioGameWrapper>
        <AudioBtn>
          <AudioIcon />
        </AudioBtn>
        <AudioGameOptions>
          {words.slice(0, 5).map(({ id, word }) => (
            <AudioGameBtn key={id}>{word}</AudioGameBtn>
          ))}
        </AudioGameOptions>
      </AudioGameWrapper>
      <AudioGameWrapper>
        <AudioGameBtn>Не знаю</AudioGameBtn>
      </AudioGameWrapper>
    </AudioGameContainer>
  );
}

export default AudioGame;
