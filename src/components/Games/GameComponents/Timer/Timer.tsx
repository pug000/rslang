import React, { useState, useEffect } from 'react';
import BgElement from '@/components/GamesContainer/GameElementBg';
import { Time, BgDiv, TimerWrap } from './Timer.style';

interface TimerProps {
  mainColor: string,
  isCounting: boolean,
  setIsCounting: (value: boolean) => void
}

function Timer({ mainColor, isCounting, setIsCounting }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(60);

  const addZero = (time: number) => time.toString().padStart(2, '0');
  const seconds = addZero(timeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isCounting) {
        setTimeLeft(timeLeft >= 1 ? timeLeft - 1 : 0);
      }
    }, 1000);
    if (timeLeft === 0) setIsCounting(false);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft, isCounting]);

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
