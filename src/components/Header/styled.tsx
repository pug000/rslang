import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 60px;
  background-color: ${defaultTheme.colors.bgWhite};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 25px;
  gap: 10px;
`;

export const HeaderBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  z-index: 20;
`;

export const HeaderLogoTitle = styled.div`
  font-family: ${defaultTheme.fonts.title};
  font-size: ${defaultTheme.fontSizes.h3};
  font-weight: 700;
  color: ${defaultTheme.colors.pink};
  cursor: pointer;
  user-select: none;
`;

export const iconStyles = {
  color: `${defaultTheme.colors.pink}`,
  transition: 'all 0.2s ease-out',
  '&:hover': {
    opacity: '65%',
  }
};
