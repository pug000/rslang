import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

import GameContext from '@/contexts/GameContext';

import Button from '@/Button';

import { generateRandomNumber } from '@/utils/randomize';
import { totalCountPages } from '@/utils/variables';

import SetState from '@/ts/types';

import {
  GameControlButtons,
  GamePageText,
} from '../GamePage.style';

interface GameNotificationProps {
  elementColor: string,
  setLoadingGame: SetState<boolean>,
  setCurrentPage: SetState<number>,
}

function GameNotification(
  {
    elementColor,
    setLoadingGame,
    setCurrentPage,
  }: GameNotificationProps
) {
  const { clearGameState } = useContext(GameContext);

  return (
    <>
      <GamePageText $fontSize={defaultTheme.fontSizes.h3}>
        Извините, на этой странице недостаточно слов для игры.
        Но мы можем выбрать для вас другую страницу.
      </GamePageText>
      <GameControlButtons>
        <NavLink to="/games">
          <Button
            id="exit"
            title="Выйти"
            callback={clearGameState}
            color={elementColor}
          />
        </NavLink>
        <Button
          id="start"
          title="Играть"
          callback={() => {
            setCurrentPage(generateRandomNumber(totalCountPages - 1));
            setLoadingGame(true);
          }}
          color={elementColor}
        />
      </GameControlButtons>
    </>
  );
}

export default GameNotification;
