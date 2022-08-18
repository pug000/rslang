import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLink
} from './styled';
import LogoSvg from './LogoSvg';

function Header() {
  return (
    <HeaderContainer>
      <HeaderBtn>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        <LoginIcon sx={iconStyles} />
      </HeaderBtn>
    </HeaderContainer>
  );
}

export default Header;
