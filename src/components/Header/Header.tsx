import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  HeaderContainer, HeaderAuthBtn, HeaderLogoTitle, HeaderNavBtn, StyledHeader
} from './styled';

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderNavBtn>
          <MenuIcon />
        </HeaderNavBtn>
        <HeaderLogoTitle>RSLang</HeaderLogoTitle>
        <HeaderAuthBtn>
          <LoginIcon />
        </HeaderAuthBtn>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
