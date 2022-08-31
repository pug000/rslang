import defaultTheme from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

const HomeContainer = styled.div`
  position: relative;
  height: 50vh;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  gap: 10%;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const animationLeft = keyframes`
  0% { 
    transform: translateX(-50px);
    opacity: 0 
  };
  100% { 
    transform: translateX(0);
    opacity: 1;
  }
`;

const animationRight = keyframes`
  0% { 
    transform: translateX(50px);
    opacity: 0 
  };
  100% { 
    transform: translateX(0);
    opacity: 1;
  }
`;

const BackgroundLeft = styled.div`
  width: 35%;
  animation: ${animationLeft} 1s;

  svg {
    width: 100%;
    height: 100%
  }
`;

const BackgroundRight = styled.div`
  width: 35%;
  animation: ${animationRight} 1s;

  svg {
    width: 100%;
    height: 100%
  }
`;

const HomeTextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const HomeTitle = styled.h1`
  margin: 0 auto;
  text-align: center;
  max-width: 500px;
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h2};
  padding: 0 30px;
`;

const HomeText = styled.p`
  max-width: 300px; 
  text-align: justify;
  margin: 50px auto;
`;

const HomeButtons = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  gap: 10px;
`;

export {
  HomeContainer, Background, BackgroundLeft, BackgroundRight, HomeTextContainer,
  HomeTitle, HomeText, HomeButtons
};
