import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import GameContext from '@/contexts/GameContext';

import Button from '@/Button';

import {
  groupButtons,
  totalCountPages
} from '@/utils/variables';
import { generateRandomNumber } from '@/utils/randomize';

import SetState from '@/ts/types';

import GamePageBackground from '../GamePageBackground';

import {
  GamePageWrapper,
  GamePageTitle,
  GamePageText,
  Group,
  GroupButton,
  GameControlButtons,
  IconWrapper,
  Note
} from '../GamePage.style';

interface GameStartPageProps {
  backgroundColor: string,
  elementColor: string,
  gameTitle: string,
  description: string,
  icon: JSX.Element,
  note: string,
  currentGroupNumber: number,
  setCurrentGroupNumber: SetState<number>,
  setCurrentPage: SetState<number>,
  setLoadingGame: SetState<boolean>,
}

function GameStartPage({
  backgroundColor,
  elementColor,
  gameTitle,
  description,
  icon,
  note,
  currentGroupNumber,
  setCurrentGroupNumber,
  setCurrentPage,
  setLoadingGame,
}: GameStartPageProps) {
  const { setGameStarted } = useContext(GameContext);
  return (
    <GamePageWrapper>
      <GamePageBackground $color={backgroundColor} />
      <GamePageTitle>{gameTitle}</GamePageTitle>
      <GamePageText>{description}</GamePageText>
      <Group>
        {groupButtons.map((
          {
            id,
            value,
            text,
            color
          }
        ) => (
          <GroupButton
            key={id}
            $color={color}
            active={currentGroupNumber === value}
            onClick={() => setCurrentGroupNumber(value)}
          >
            {text}
          </GroupButton>
        ))}
      </Group>
      <GameControlButtons>
        <NavLink to="/games">
          <Button
            id="exit"
            title="Выйти"
            callback={() => { }}
            color={elementColor}
          />
        </NavLink>
        <Button
          id="start"
          title="Играть"
          callback={() => {
            setCurrentPage(generateRandomNumber(totalCountPages - 1));
            setLoadingGame(true);
            setGameStarted(true);
          }}
          color={elementColor}
        />
      </GameControlButtons>
      <IconWrapper $color={elementColor}>
        {icon}
      </IconWrapper>
      <Note>{note}</Note>
    </GamePageWrapper>
  );
}

export default GameStartPage;
