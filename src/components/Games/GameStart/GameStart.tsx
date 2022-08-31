import React, { useContext } from 'react';
import Button from '@/Button';
import { NavLink } from 'react-router-dom';
import { groupBtns, totalCountPages } from '@/utils/variables';
import SetState from '@/ts/types';
import { generateRandomNumber } from '@/utils/randomize';
import GameContext from '@/contexts/GameContext';
import GamePageBg from '../GamePageBg';
import {
  GamePageWrapper, GamePageTitle, GamePageText, Group, GroupBtn,
  GameControlBtns, IconWrapper, Note
} from '../GamePage.style';

interface GameStartPageProps {
  bgColor: string,
  elementColor: string,
  gameTitle: string,
  description: string,
  icon: JSX.Element,
  note: string,
  currentGroupNumber: number,
  setCurrentGroupNumber: SetState<number>,
  setCurrentPage: SetState<number>,
  setIsLoadingGame: SetState<boolean>,
}

function GameStartPage({
  bgColor,
  elementColor,
  gameTitle,
  description,
  icon,
  note,
  currentGroupNumber,
  setCurrentGroupNumber,
  setCurrentPage,
  setIsLoadingGame,
}: GameStartPageProps) {
  const { setIsGameStarted } = useContext(GameContext);
  return (
    <GamePageWrapper>
      <GamePageBg color={bgColor} />
      <GamePageTitle>{gameTitle}</GamePageTitle>
      <GamePageText>{description}</GamePageText>
      <Group>
        {groupBtns.map((
          {
            id,
            value,
            text,
            color
          }
        ) => (
          <GroupBtn
            key={id}
            colors={color}
            active={currentGroupNumber === value}
            onClick={() => setCurrentGroupNumber(value)}
          >
            {text}
          </GroupBtn>
        ))}
      </Group>
      <GameControlBtns>
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
            setIsLoadingGame(true);
            setIsGameStarted(true);
          }}
          color={elementColor}
        />
      </GameControlBtns>
      <IconWrapper iconColor={elementColor}>
        {icon}
      </IconWrapper>
      <Note>{note}</Note>
    </GamePageWrapper>
  );
}

export default GameStartPage;
