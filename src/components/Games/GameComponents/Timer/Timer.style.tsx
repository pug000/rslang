import styled, { keyframes } from 'styled-components';
import defaultTheme from '@/styles/theme';

const Time = styled.div`
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h3};
  font-weight: bold;
  font-family: ${defaultTheme.fonts.title};
`;

const TimerWrap = styled.div`
  position: relative;
`;

const backgroundAnimation = keyframes`
  0% {
    transform: rotate(0deg) scale(2, 2);
  };
  20% {
    transform: rotate(72deg) scale(1.6, 1.6);
  };
  40% {
    transform: rotate(144deg) scale(1.2, 1.2);
  };
  60% {
    transform: rotate(216deg) scale(0.8, 0.8);
  };
  80% {
    transform: rotate(288deg) scale(0.4, 0.4);
  };
  100% {
    transform: rotate(360deg) scale(0, 0);
  }
`;

const BackgroundDiv = styled.div`
  position: absolute;
  top: -35px;
  left: -35px;
  z-index: -1;

  svg {
    animation: ${backgroundAnimation} 60s linear;
    transform: rotate(0deg) scale(0, 0);
  }
`;

export {
  Time,
  TimerWrap,
  BackgroundDiv
};
