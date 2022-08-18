import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface UlProps {
  isOpen: boolean,
}

export const Ul = styled.ul<UlProps>`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: fixed;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  border: 2px solid;
  border-color: ${defaultTheme.colors.text};
  padding-top: 3.5rem;
`;

export const Li = styled.li`
  width: 100%;
  display: flex;
  padding: 15px 10px;
  justify-content: center;
`;

export const Link = styled(NavLink)`
  color: ${defaultTheme.colors.textBold};
  font-size: ${defaultTheme.fontSizes.h4};
  text-decoration: none;

  &:hover {
    color: ${defaultTheme.colors.pink}
  }

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;
