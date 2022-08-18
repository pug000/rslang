import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NavMenu from '@/NavMenu';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLink
} from './styled';
import LogoSvg from './LogoSvg';

function Header() {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(!isNavMenuOpen)}>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        <LoginIcon sx={iconStyles} />
      </HeaderBtn>
      <NavMenu isNavMenuOpen={isNavMenuOpen} />
    </HeaderContainer>
  );
}

export default Header;
