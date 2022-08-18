import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLogo
} from './styled';
import LogoSvg from './LogoSvg';

function Header() {
  return (
    <HeaderContainer>
      <HeaderBtn>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLogo>
        <LogoSvg />
      </HeaderLogo>
      <HeaderBtn>
        <LoginIcon sx={iconStyles} />
      </HeaderBtn>
    </HeaderContainer>
  );
}

export default Header;
