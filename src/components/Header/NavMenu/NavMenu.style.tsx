import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const UlStart = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 70px;
  padding-top: 3.5rem;
  z-index: 16;
  background-color: ${defaultTheme.colors.bgWhite};
  span {
    display: none
  }
`;

const LiStart = styled.li`
  width: 100%;
  display: flex;
  padding: 15px 10px;
  text-align: center;
  margin-left: 5px;
  height: 58px;
`;

interface UlProps {
  isOpen: boolean,
}

const Ul = styled.ul<UlProps>`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: fixed;
  transition: ${({ theme }) => theme.effects.transition};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  padding-top: 3.5rem;
  z-index: 15;
  background-color: rgba(255,255,255, 0.7);
  margin-left: 70px;
`;

const Li = styled.li`
  width: 100%;
  display: flex;
  padding: 15px 10px;
`;

const Link = styled(NavLink)`
  color: ${defaultTheme.colors.textBold};
  font-size: ${defaultTheme.fontSizes.h4};
  text-decoration: none;
  width: 100%;
  transition: ${defaultTheme.effects.transition};

  &:hover {
    color: ${defaultTheme.colors.primaryColor};
  }

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }

  svg {
    transition: ${defaultTheme.effects.transition};
  }

  svg:hover {
    transform: ${defaultTheme.effects.hoverTransform};
  }
`;

export {
  UlStart, LiStart, Ul, Li, Link
};
