import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

export const StyledHeader = styled.header`
`;

export const HeaderContainer = styled.div`
  height: 60px;
  background-color: ${defaultTheme.colors.bgWhite};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 25px;
`;

export const HeaderNavBtn = styled.button`

`;

export const HeaderLogoTitle = styled.div`
  font-family: ${defaultTheme.fonts.title};
  font-size: ${defaultTheme.fontSizes.h3};
  font-weight: 700;
  color: ${defaultTheme.colors.pink};
`;

export const HeaderAuthBtn = styled.button`

`;
