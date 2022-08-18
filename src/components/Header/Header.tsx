import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NavMenu from '@/NavMenu';
import {
  HeaderContainer, HeaderBtn, HeaderLogoTitle, iconStyles
} from './styled';

function Header() {
  return (
    <HeaderContainer>
      <HeaderBtn>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLogoTitle>RSLang</HeaderLogoTitle>
      <HeaderBtn>
        <LoginIcon sx={iconStyles} />
      </HeaderBtn>
      <NavMenu />
    </HeaderContainer>
  );
}

export default Header;
