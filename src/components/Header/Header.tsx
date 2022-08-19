import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
// import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import {
  HeaderContainer, HeaderBtn, iconStyles, HeaderLink, LoginBtn
} from './styled';
import LogoSvg from './LogoSvg';

function Header() {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [isSignedIn, setSignIn] = useState(true);

  return (
    <>
      <HeaderContainer>
        <HeaderBtn onClick={() => setNavMenuOpen(modalActive ? false : !isNavMenuOpen)}>
          <MenuIcon sx={iconStyles} />
        </HeaderBtn>
        <HeaderLink to="/"><LogoSvg /></HeaderLink>
        <HeaderBtn>
          {isSignedIn
            ? <LogoutIcon sx={iconStyles} onClick={() => setSignIn(false)} />
            : (
              <LoginBtn onClick={() => setModalActive(!modalActive)} />)}
        </HeaderBtn>
        <NavMenu isNavMenuOpen={isNavMenuOpen} />
      </HeaderContainer>

      <SignInModal active={modalActive} setActive={setModalActive} />
    </>
  );
}

export default Header;
