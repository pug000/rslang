import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NavMenu from '@/NavMenu';
import {
  HeaderContainer, HeaderBtn, HeaderLogoTitle, iconStyles
} from './styled';

function Header() {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(!isNavMenuOpen)}>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLogoTitle>RSLang</HeaderLogoTitle>
      <HeaderBtn>
        <LoginIcon sx={iconStyles} />
      </HeaderBtn>
      <NavMenu isNavMenuOpen={isNavMenuOpen} />
    </HeaderContainer>
  );
}

export default Header;
