import defaultTheme from '@/styles/theme';
import { ColorProps } from '@/ts/interfaces';
import styled from 'styled-components';

interface GroupButtonProps extends ColorProps {
  active: boolean,
}

interface GameControlBtnsProps {
  btnColor: string,
}

const GamePageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  padding-right: 70px;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: -5;
  height: 80%;
`;

const BackgroundGamePageDiv = styled.div<ColorProps>`
  background-color: ${({ $color }) => $color};
  margin-top: -5px;
  height: 100%;
`;

const BackgroundBorderWrapper = styled.div`
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GamePageTitle = styled.h1`
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h1};
  font-family: ${defaultTheme.fonts.title};
`;

const GamePageText = styled.p`
  font-size: ${defaultTheme.fontSizes.text};
  max-width: 630px;
  text-align: center;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  gap: 20px;
`;

const GroupButton = styled.button<GroupButtonProps>`
  width: 55px;
  height: 55px;
  border: 3px solid;
  border-radius: 15%;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.backgroundWhite};
  border-color: ${({ $color }) => $color};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};  
  }

  ${(props) => props.active && `
    background-color: rgba(255,255,255,0.5);
    color: ${props.$color};
  `}
`;

const GameControlButtons = styled.div<GameControlBtnsProps>`
  display: flex;
  gap: 40px;

  Button {
    background-color: ${(props) => props.btnColor};
  }
`;

const IconWrapper = styled.div<ColorProps>`

  svg {
    font-size: 120px;
    color: ${({ $color }) => $color};
    opacity: 0.2;
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.2);
  font-style: italic;
`;

export {
  GamePageWrapper, BackgroundWrapper, BackgroundGamePageDiv, BackgroundBorderWrapper, GamePageTitle,
  GamePageText, Group, GroupButton, GameControlButtons, IconWrapper, Note
};
