import React, { useState } from 'react';
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import SetState from '@/ts/types';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  HeaderContainer, HeaderBtn, HeaderLink, LoginBtn, iconStyles
} from './Header.style';
import LogoSvg from './LogoSvg';
import LogInIcon from './LogInIcon';

interface HeaderProps {
  isLoggedIn: boolean,
  setIsLoggedIn: SetState<boolean>,
}

function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const changeLoggedInState = () => setIsLoggedIn(((prev) => !prev));

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => {
        setNavMenuOpen(modalActive ? false : !isNavMenuOpen);
        setMenuActive(!menuActive);
      }}
      >
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        {isLoggedIn
          ? <LogoutIcon sx={iconStyles} onClick={changeLoggedInState} />
          : <LoginBtn onClick={() => setModalActive(!modalActive)}><LogInIcon /></LoginBtn>}
      </HeaderBtn>
      <NavMenu
        isNavMenuOpen={isNavMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
        active={menuActive}
        setActive={setMenuActive}
      />
      <SignInModal
        active={modalActive}
        setActive={setModalActive}
        changeLoggedInState={changeLoggedInState}
      />
    </HeaderContainer>
  );
}

export default Header;
