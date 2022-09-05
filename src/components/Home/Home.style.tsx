import styled, { keyframes } from 'styled-components';
import defaultTheme from '@/styles/theme';

const HomeContainer = styled.div`
  position: relative;
  height: 50vh;

  @media (max-width: 360px) {
    max-width: 300px;
  }

  @media (max-width: 350px) {
    max-width: 240px;
  }

  @media (max-width: 333px) {
    max-width: 215px;
  }
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  gap: 10%;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;

  @media (max-width: 430px) {
    top: 45%;
  }

  @media (max-width: 360px) {
    display: none;
  }
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
    height: 100%;
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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 546px) {
    gap: 0px;
  }
`;

const HomeTitle = styled.h1`
  margin: 0 auto;
  text-align: center;
  max-width: 500px;
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h2};
  padding: 0 30px;

  @media (max-width: 1000px) {
    margin-top: -80px;
  }

  @media (max-width: 546px) {
    font-size: ${defaultTheme.fontSizes.h3};
  }
`;

const HomeText = styled.p`
  max-width: 300px; 
  text-align: justify;
  margin: 50px auto;

  @media (max-width: 1000px) {
    font-size: ${(props) => props.theme.fontSizes.smallText};
    max-width: 250px; 
  }

  @media (max-width: 768px) {
    max-width: 170px; 
  }

  @media (max-width: 546px) {
    max-width: 120px; 
  }

  @media (max-width: 430px) {
    max-width: 200px;
  }
`;

const HomeButtons = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  gap: 10px;

  @media (max-width: 360px) {
    flex-direction: column;
  }
`;

export {
  HomeContainer,
  Background,
  BackgroundLeft,
  BackgroundRight,
  HomeTextContainer,
  HomeTitle,
  HomeText,
  HomeButtons
};
