import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

const HeaderContainer = styled.header`
  height: 60px;
  background-color: ${defaultTheme.colors.backgroundWhite};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px 5px 10px;
  gap: 10px;

  @media (max-width: 360px) {
    margin-left: -40px;
  }
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  z-index: 30;
  width: 60px;
  height: 60px;
`;

const HeaderLink = styled(NavLink)`
  svg {
    cursor: pointer;
    color: ${defaultTheme.colors.primaryColor};
    height: 100%;
    max-width: 230px;
    width: 100%;
    user-select: none;
    padding-left: 80px;
  }
`;

const iconStyles = {
  color: `${defaultTheme.colors.primaryColor}`,
  transition: `${defaultTheme.effects.transition}`,
  top: '25px',
  left: '28px',
  '&:hover': {
    opacity: `${defaultTheme.effects.hoverOpacity}`,
    transform: `${defaultTheme.effects.hoverTransform}`
  }
};

const menuIconStyle = {
  position: 'fixed',
  color: `${defaultTheme.colors.primaryColor}`,
  transition: `${defaultTheme.effects.transition}`,
  top: '25px',
  left: '28px',
  '&:hover': {
    opacity: `${defaultTheme.effects.hoverOpacity}`,
    transform: `${defaultTheme.effects.hoverTransform}`
  }
};

const LoginButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: transparent;
  transform: scale(-1, 1);
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(-1.1, 1.1);
    transition: ${defaultTheme.effects.transition};
  }
`;

export {
  HeaderContainer,
  HeaderButton,
  HeaderLink,
  LoginButton,
  iconStyles,
  menuIconStyle
};
