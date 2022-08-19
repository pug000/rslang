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

interface HeaderProps {
  isLoggedIn: boolean | null,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>,
}

function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const changeLoggedInState = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isLoggedIn
      ? localStorage.setItem('isLoggedIn', 'true')
      : localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <HeaderContainer>
      <HeaderBtn onClick={() => setNavMenuOpen(modalActive ? false : !isNavMenuOpen)}>
        <MenuIcon sx={iconStyles} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        {isLoggedIn
          ? <LogoutIcon sx={iconStyles} onClick={changeLoggedInState} />
          : <LoginBtn onClick={() => setModalActive(!modalActive)} />}
      </HeaderBtn>
      <NavMenu isNavMenuOpen={isNavMenuOpen} />
      <SignInModal
        changeLoggedInState={changeLoggedInState}
        active={modalActive}
        setActive={setModalActive}
      />
    </HeaderContainer>
  );
}

export default Header;
