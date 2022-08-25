import styled from 'styled-components';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface SvgStyles {
  color: string,
  width: string,
  height: string,
}

interface Color {
  colors?: string,
}

const svgStyles: SvgStyles = {
  color: `${defaultTheme.colors.textButton}`,
  width: '100%',
  height: '100%',
};

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

const AudioBtn = styled.button`
  border: 3px solid ${({ theme }) => theme.colors.textButton};
  border-radius: 50%;
  cursor: pointer;
  background-color: transparent;
  transition: ${({ theme }) => theme.effects.transition};
  max-width: 150px;
  width: 100%;
  height: 100%;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const AudioIcon = styled(VolumeUpIcon).attrs({
  style: {
    ...svgStyles,
    padding: '20px',
  },
})``;

const AudioGameControls = styled.div`
  width: 100%;
  top: 3%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;

const AudioGameContolBtn = styled.button`
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

const CloseIconSvg = styled(CloseIcon).attrs({
  style: svgStyles
})``;

const FullscreenIconSvg = styled(FullscreenIcon).attrs({
  style: svgStyles
})``;

const FullscreenExitIconSvg = styled(FullscreenExitIcon).attrs({
  style: svgStyles
})``;

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
  color: ${(props) => props.colors || props.theme.colors.textButton};
  background-color: transparent;
  transition: ${({ theme }) => theme.effects.transition};
  user-select: none;

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  AudioGameWrapper, AudioBtn, AudioIcon, AudioGameOptions, AudioGameBtn,
  AudioGameControls, AudioGameContolBtn, CloseIconSvg, Link, FullscreenIconSvg,
  FullscreenExitIconSvg, AudioGameContainer,
};
