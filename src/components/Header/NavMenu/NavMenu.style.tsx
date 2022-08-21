import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface ShadowProps {
  active: boolean,
}

const Shadow = styled.div<ShadowProps>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 277px;
  background-color: transparent;
  display: none;
  z-index: 26;

  ${({ active }) => active && `
    display: block;
  `}
`;
interface UlProps {
  isOpen: boolean,
}

const NavUl = styled.ul<UlProps>`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  padding-top: 3.5rem;
  z-index: 22;
  margin-left: 17px;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ isOpen }) => (isOpen ? 'rgba(255,255,255, 0.7)' : '')};
  
  p {
    position: absolute;
    top: 13px;
    transition: ${({ theme }) => theme.effects.transition};
    left: ${({ isOpen }) => (isOpen ? '70px' : '-500px')};
  }

  li {
    width: ${({ isOpen }) => (isOpen ? '250px' : '70px')};
  }
`;

const NavLi = styled.li`
  width: 100%;
  display: flex;
  padding: 15px 10px;
  height: 58px;
  position: relative;
  
  svg {
    margin-right: 15px;
  }
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
  Shadow, NavUl, NavLi, Link
};
