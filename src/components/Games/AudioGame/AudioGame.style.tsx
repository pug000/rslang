import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavLink } from 'react-router-dom';
import { Color } from '@/ts/interfaces';
import defaultTheme from '@/styles/theme';

const AudioGameContainer = styled.div`
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const AudioBtn = styled.button`
  border: 3px solid ${({ theme }) => theme.colors.textButton};
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
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

const AudioIcon = styled(VolumeUpIcon).attrs({ className: 'AudioIcon' })`
  &.AudioIcon {
    width: 100%;
    height: 100%;
    color: ${defaultTheme.colors.textButton};
    padding: 20px;
  }
`;

const AudioGameControls = styled.div`
  width: 100%;
  top: 3%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;

const AudioGameControlBtn = styled.button`
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

const AudioGameBtn = styled.button<Color>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 3px solid;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${(props) => props.$color || props.theme.colors.textButton};
  background-color: transparent;
  transition: ${({ theme }) => theme.effects.transition};
  user-select: none;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  AudioGameWrapper, AudioBtn, AudioIcon, AudioGameOptions, AudioGameBtn,
  AudioGameControls, AudioGameControlBtn, Link, AudioGameContainer, GameBlock
};
