import GameContext from '@/contexts/GameContext';
import React, { useContext, useEffect, useState } from 'react';
import {
  CloseIconSvg, FullscreenExitIconSvg, FullscreenIconSvg, GameControlBtn,
  GameControls, Link
} from './GameControl.style';

interface GameControlProps {
  color: string,
}

function GameControl(
  {
    color,
  }: GameControlProps
) {
  const { clearGameState } = useContext(GameContext);
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

    return () => (
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    );
  }, []);

  return (
    <GameControls>
      <GameControlBtn
        tabIndex={-1}
      >
        <Link
          to="/games"
          tabIndex={-1}
          onClick={clearGameState}
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
