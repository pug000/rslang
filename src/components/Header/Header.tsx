import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout'; //раскомментируйте, когда понадобится
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

  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(!isNavMenuOpen)}>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      {
        isLoggedIn
          ? <HeaderBtn onClick={logOut}>
            <LogoutIcon sx={iconStyles} />
          </HeaderBtn>
          : <HeaderBtn onClick={logIn}>
            <LoginIcon sx={iconStyles} />
          </HeaderBtn>
      }

      <NavMenu isNavMenuOpen={isNavMenuOpen} />
    </HeaderContainer>
  );
}

export default Header;
