import React, { useState, useEffect, useContext } from 'react';
import BgElement from '@/components/GamesContainer/GameElementBg';
import GameContext from '@/contexts/GameContext';
import { Time, BgDiv, TimerWrap } from './Timer.style';

interface TimerProps {
  mainColor: string,
}

function Timer(
  {
    mainColor,
  }: TimerProps
) {
  const { isGameStarted, setIsShowResult } = useContext(GameContext);
  const [timeLeft, setTimeLeft] = useState(60);

  const addZero = (time: number) => time.toString().padStart(2, '0');
  const seconds = addZero(timeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isGameStarted) {
        setTimeLeft(timeLeft >= 1 ? timeLeft - 1 : 0);
      }
    }, 1000);
    if (timeLeft === 0) setIsShowResult(true);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, isGameStarted]);

  return (
    <TimerWrap>
      <Time>{seconds}</Time>
      <BgDiv>
        <BgElement color={mainColor} />
      </BgDiv>
    </TimerWrap>
  );
}

export default Timer;
