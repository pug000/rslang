import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  HeaderContainer, HeaderBtn, HeaderLogoTitle, StyledHeader, iconStyles
} from './styled';

function Header() {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderBtn>
          <MenuIcon sx={iconStyles} />
        </HeaderBtn>
        <HeaderLogoTitle>RSLang</HeaderLogoTitle>
        <HeaderBtn>
          <LoginIcon sx={iconStyles} />
        </HeaderBtn>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
