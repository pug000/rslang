import React from 'react';
import Button from '@/Button';
import { NavLink } from 'react-router-dom';
import { groupBtns } from '@/utils/variables';
import GamePageBg from './GamePageBg';
import {
  GamePageWrapper, GamePageTitle, GamePageText, Group, GroupBtn,
  GameControlBtns, IconWrapper, Note
} from './GamePage.style';

interface GameStartPageProps {
  bgColor: string,
  elementColor: string,
  gameTitle: string,
  description: string,
  icon: JSX.Element,
  note: string,
  currentGroupNumber: number,
  setCurrentGroupNumber: React.Dispatch<React.SetStateAction<number>>,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function GameStartPage({
  bgColor, elementColor, gameTitle, description, icon, note,
  currentGroupNumber, setCurrentGroupNumber, setGameStarted
}: GameStartPageProps) {
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
      <GameControlBtns btnColor={elementColor}>
        <NavLink to="/games">
          <Button id="exit" title="Выйти" callback={() => { }} />
        </NavLink>
        <Button id="start" title="Играть" callback={() => setGameStarted(true)} />
      </GameControlBtns>
      <IconWrapper iconColor={elementColor}>
        {icon}
      </IconWrapper>
      <Note>{note}</Note>
    </GamePageWrapper>
  );
}

export default GameStartPage;
