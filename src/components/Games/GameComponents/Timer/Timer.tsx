import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import GameContext from '@/contexts/GameContext';

import BackgroundElement from '@/components/GamesContainer/GameElementBackground';

import {
  Time,
  BackgroundDiv,
  TimerWrap
} from './Timer.style';

interface TimerProps {
  mainColor: string,
}

function Timer(
  {
    mainColor,
  }: TimerProps
) {
  const { isGameStarted, setShowResult } = useContext(GameContext);
  const [timeLeft, setTimeLeft] = useState(60);

  const addZero = (time: number) => time.toString().padStart(2, '0');
  const seconds = addZero(timeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isGameStarted) {
        setTimeLeft(timeLeft >= 1 ? timeLeft - 1 : 0);
      }
    }, 1000);
    if (timeLeft === 0) setShowResult(true);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, isGameStarted]);

  return (
    <TimerWrap>
      <Time>{seconds}</Time>
      <BackgroundDiv>
        <BackgroundElement $color={mainColor} />
      </BackgroundDiv>
    </TimerWrap>
  );
}

export default Timer;
