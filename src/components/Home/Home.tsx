import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@/Button';

import {
  BackgroundLeftIcon,
  BackgroundRightIcon
} from './HomeBackground';

import {
  HomeContainer,
  Background,
  BackgroundLeft,
  BackgroundRight,
  HomeTextContainer,
  HomeTitle,
  HomeText,
  HomeButtons
} from './Home.style';

function Home() {
  return (
    <HomeContainer>
      <Background>
        <BackgroundLeft>
          <BackgroundLeftIcon />
        </BackgroundLeft>
        <BackgroundRight>
          <BackgroundRightIcon />
        </BackgroundRight>
      </Background>
      <HomeTextContainer>
        <HomeTitle>Английский - это легко!</HomeTitle>
        <HomeText>
          RS Lang — это эффективный сервис для увлекательной практики английского языка.
          Учиться здесь весело и интересно.
        </HomeText>
        <HomeButtons>
          <Link to="/book">
            <Button id="toBook" title="Учебник" callback={() => { }} />
          </Link>
          <Link to="/games">
            <Button id="toGames" title="Игры" callback={() => { }} />
          </Link>
        </HomeButtons>
      </HomeTextContainer>
    </HomeContainer>
  );
}

export default Home;
