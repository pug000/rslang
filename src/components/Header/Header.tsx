import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NavMenu from '@/NavMenu';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLink
} from './styled';
import LogoSvg from './LogoSvg';

interface HeaderProps {
  isLoggedIn: boolean | null,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>,
}

function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);

  const handleLoggedChange = () => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true")
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn")
    }
  }

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(!isNavMenuOpen)}>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn onClick={handleLoggedChange}>
        {isLoggedIn ? <LogoutIcon sx={iconStyles} /> : <LoginIcon sx={iconStyles} />}
      </HeaderBtn>
      <NavMenu isNavMenuOpen={isNavMenuOpen} />
    </HeaderContainer>
  );
}

export default Header;
