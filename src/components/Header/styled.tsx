import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 60px;
  background-color: ${defaultTheme.colors.bgWhite};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 5px;
  gap: 10px;
`;

const HeaderBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  z-index: 20;
  width: 60px;
  height: 60px;
`;

const HeaderLink = styled(NavLink)`
  svg {
    cursor: pointer;
    color: ${defaultTheme.colors.primaryColor};
    height: 100%;
    max-width: 150px;
    width: 100%;
    user-select: none;
  }
`;

const iconStyles = {
  color: `${defaultTheme.colors.primaryColor}`,
  transition: `${defaultTheme.effects.transition}`,
  '&:hover': {
    opacity: `${defaultTheme.effects.hoverOpacity}`,
  }
};

const LoginBtn = styled.button`
  width: 60px;
  height: 60px;
  background-color: transparent;
  background-image: url(../assets/icon/signin.svg);
  background-size: cover;
  transform: scale(-1, 1);
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(-1.1, 1.1);
    transition: ${defaultTheme.effects.transition};
  }
`;

export {
  HeaderContainer, HeaderBtn, HeaderLink, iconStyles, LoginBtn
};
