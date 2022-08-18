import defaultTheme from '@/styles/theme';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 60px;
  background-color: ${defaultTheme.colors.bgWhite};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px 0;
  gap: 10px;
`;

export const HeaderBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
`;

export const HeaderLink = styled(NavLink)`
  svg {
    cursor: pointer;
    color: ${defaultTheme.colors.pink};
    height: 100%;
    max-width: 150px;
    width: 100%;
    user-select: none;
  }
`;

export const iconStyles = {
  color: `${defaultTheme.colors.pink}`,
  transition: 'all 0.2s ease-out',
  '&:hover': {
    opacity: '65%',
  }
};
