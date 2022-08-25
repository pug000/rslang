import React from 'react';
import defaultTheme from '@/styles/theme';
import { GroupButton } from '@/ts/interfaces';
import Button from '@/Button';
import { NavLink } from 'react-router-dom';
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
  // нужно перенести в variables
  const groupBtns: GroupButton[] = [
    {
      id: 1, value: 0, text: 'A1', color: `${defaultTheme.colors.beige}`
    },
    {
      id: 2, value: 1, text: 'A2', color: `${defaultTheme.colors.beige}`
    },
    {
      id: 3, value: 2, text: 'B1', color: `${defaultTheme.colors.blue}`
    },
    {
      id: 4, value: 3, text: 'B2', color: `${defaultTheme.colors.blue}`
    },
    {
      id: 5, value: 4, text: 'C1', color: `${defaultTheme.colors.pink}`
    },
    {
      id: 6, value: 5, text: 'C2', color: `${defaultTheme.colors.pink}`
    }
  ];
  // нужно перенести в variables
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
