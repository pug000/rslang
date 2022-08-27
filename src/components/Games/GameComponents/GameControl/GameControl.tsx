import React, { useEffect, useState } from 'react';
import {
  CloseIconSvg, FullscreenExitIconSvg, FullscreenIconSvg, GameControlBtn,
  GameControls, Link
} from './GameControl.style';

interface GameControlProps {
  changeGameState: (value: boolean) => void,
  color: string,
}

function GameControl(
  {
    changeGameState,
    color,
  }: GameControlProps
) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen();
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <GameControls>
      <GameControlBtn
        tabIndex={-1}
      >
        <Link
          to="/games"
          tabIndex={-1}
          onClick={() => changeGameState(false)}
        >
          <CloseIconSvg $color={color} />
        </Link>
      </GameControlBtn>
      <GameControlBtn
        tabIndex={-1}
        onClick={() => setIsFullscreen((prev) => !prev)}
      >
        {!isFullscreen
          ? <FullscreenIconSvg $color={color} />
          : <FullscreenExitIconSvg $color={color} />}
      </GameControlBtn>
    </GameControls>
  );
}

export default GameControl;
