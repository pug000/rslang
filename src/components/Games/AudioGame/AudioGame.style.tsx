import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

interface AudioIconProps {
  $active: boolean,
}

const AudioGameContainer = styled.div`
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const AudioGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const GameBlock = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: space-evenly;
`;

const AudioButton = styled.button`
  border: 3px solid ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(255,255,255, 0.4);
  transition: ${({ theme }) => theme.effects.transition};
  max-width: 150px;
  width: 100%;
  height: 100%;

  :disabled {
    cursor: default;
  }

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const AudioIcon = styled(VolumeUpIcon).attrs({ className: 'AudioIcon' }) <AudioIconProps>`
  &.AudioIcon {
    width: 100%;
    height: 100%;
    color: ${defaultTheme.colors.text};
    padding: 20px;
    transition: ${({ theme }) => theme.effects.transition};

    ${({ $active }) => $active && `
    color: ${defaultTheme.colors.pink};
    opacity: ${defaultTheme.effects.hoverOpacity};
  `}
  }
`;

const AudioGameControls = styled.div`
  width: 100%;
  top: 3%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;

const AudioGameControlButton = styled.button`
  background-color: transparent;
  width: 50px;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const Link = styled(NavLink)`
  &:link {
    text-decoration: none;
  }
`;

const AudioGameOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const AudioGameButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 3px solid;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(255,255,255, 0.4);
  transition: ${({ theme }) => theme.effects.transition};
  user-select: none;

  &.CorrectAnswer {
    color: ${({ theme }) => theme.colors.blue}
  }

  &.IncorrectAnswer {
    color: ${({ theme }) => theme.colors.pink}
  }

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.2);
  font-style: italic;
`;

export {
  AudioGameWrapper, AudioButton, AudioIcon, AudioGameOptions, AudioGameButton,
  AudioGameControls, AudioGameControlButton, Link, AudioGameContainer, Note, GameBlock
};
