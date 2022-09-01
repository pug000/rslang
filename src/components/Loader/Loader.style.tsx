import styled, { keyframes } from 'styled-components';
import defaultTheme from '@/styles/theme';

const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.blue};
  }
  25% {
    transform: rotate(90deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.textHighlighted};
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.orange};
  }
  75% {
    transform: rotate(270deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.pink};
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px ${defaultTheme.colors.blue};
  }
`;

const LoadingRing = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 70px;

  &:before {
    position: absolute;
    content: '';
    left: 70;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255,255,255,0.3);
    animation: ${ringAnimation} 2s linear infinite;
  }
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.textBold};
  font-size: ${({ theme }) => theme.fontSizes.text};
`;

export {
  LoadingRing,
  LoadingText
};
