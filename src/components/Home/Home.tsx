import React from 'react';
import Button from '@/Button';
import { Link } from 'react-router-dom';
import {
  HomeContainer, Bg, BgLeft, BgRight, HomeTextContainer, HomeTitle, HomeText, HomeBtns
} from './Home.style';
import { BgLeftIcon, BgRightIcon } from './HomeBg';

function Home() {
  return (
    <HomeContainer>
      <Bg>
        <BgLeft>
          <BgLeftIcon />
        </BgLeft>
        <BgRight>
          <BgRightIcon />
        </BgRight>
      </Bg>
      <HomeTextContainer>
        <HomeTitle>Английский - это легко!</HomeTitle>
        <HomeText>
          RS Lang — это эффективный сервис для увлекательной практики английского языка.
          Учиться здесь весело и интересно.
        </HomeText>
        <HomeBtns>
          <Link to="/book">
            <Button id="toBook" title="Учебник" callback={() => { }} />
          </Link>
          <Link to="/games">
            <Button id="toGames" title="Игры" callback={() => { }} />
          </Link>
        </HomeBtns>
      </HomeTextContainer>
    </HomeContainer>
  );
}

export default Home;
