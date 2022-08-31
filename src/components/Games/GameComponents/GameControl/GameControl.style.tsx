import styled from 'styled-components';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import { ColorProps, SvgStyles } from '@/ts/interfaces';
import defaultTheme from '@/styles/theme';

const svgStyles: SvgStyles = {
  width: '100%',
  height: '100%',
  transition: defaultTheme.effects.transition,
};

const GameControls = styled.div`
  width: 100%;
  top: 3%;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;

const GameControlButton = styled.button`
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

const CloseIconSvg = styled(CloseIcon).attrs<ColorProps>((props) => ({
  style: {
    ...svgStyles,
    color: props.$color,
  }
})) <ColorProps>`
  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const FullscreenIconSvg = styled(FullscreenIcon).attrs<ColorProps>((props) => ({
  style: {
    ...svgStyles,
    color: props.$color,
  }
})) <ColorProps>`
  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

const FullscreenExitIconSvg = styled(FullscreenExitIcon).attrs<ColorProps>((props) => ({
  style: {
    ...svgStyles,
    color: props.$color,
  }
})) <ColorProps>`
  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};
  }
`;

export {
  GameControls, GameControlButton, Link, CloseIconSvg, FullscreenIconSvg, FullscreenExitIconSvg
};
