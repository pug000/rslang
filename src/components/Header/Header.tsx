import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout'; //раскомментируйте, когда понадобится
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLink
} from './styled';
import LogoSvg from './LogoSvg';

function Header() {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderBtn onClick={() => setNavMenuOpen(modalActive ? false : !isNavMenuOpen)}>
          <MenuIcon sx={iconStyles} />
        </HeaderBtn>
        <HeaderLink to="/"><LogoSvg /></HeaderLink>
        <HeaderBtn onClick={() => setModalActive(!modalActive)}>
          <LoginIcon sx={iconStyles} />
        </HeaderBtn>
        <NavMenu isNavMenuOpen={isNavMenuOpen} />
      </HeaderContainer>

      <SignInModal active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default Header;
