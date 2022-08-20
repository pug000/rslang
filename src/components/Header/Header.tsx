import React, { useState } from 'react';
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import SetState from '@/ts/types';
import {
  HeaderContainer, HeaderBtn, LogoutBtn, HeaderLink, LoginBtn, Menu
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

  const changeLoggedInState = () => setIsLoggedIn(!isLoggedIn);

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(modalActive ? false : !isNavMenuOpen)}>
        <Menu />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        {isLoggedIn
          ? <LogoutBtn onClick={changeLoggedInState} />
          : <LoginBtn onClick={() => setModalActive(!modalActive)}><LogInIcon /></LoginBtn>}
      </HeaderBtn>
      <NavMenu isNavMenuOpen={isNavMenuOpen} />
      <SignInModal
        active={modalActive}
        setActive={setModalActive}
        changeLoggedInState={changeLoggedInState}
      />
    </HeaderContainer>
  );
}

export default Header;
