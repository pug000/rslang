import React, { useState, useEffect } from 'react';
import { Time, BgDiv, TimerWrap } from './Timer.style';
import BgElement from '../GameElementBg';

interface TimerProps {
  mainColor: string,
}

function Timer({ mainColor }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(60);

  // перенести выше и передавать как пропсы
  const [isCounting, setIsCounting] = useState(true);

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
