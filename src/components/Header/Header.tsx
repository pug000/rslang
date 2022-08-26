import React, { useContext, useState } from 'react';
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderContext from '@/contexts/HeaderContext';
import {
  HeaderContainer, HeaderBtn, HeaderLink, LoginBtn, iconStyles, menuIconStyle
} from './Header.style';
import LogoSvg from './LogoSvg';
import LogInIcon from './LogInIcon';

function Header() {
  const {
    isLoggedIn,
    isGameStarted,
    setIsLoggedIn,
    setIsGameStarted,
  } = useContext(HeaderContext);
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
        <MenuIcon sx={menuIconStyle} />
      </HeaderBtn>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderBtn>
        {isLoggedIn
          ? <LogoutIcon sx={iconStyles} onClick={() => setModalActive(!modalActive)} />
          : <LoginBtn onClick={() => setModalActive(!modalActive)}><LogInIcon /></LoginBtn>}
      </HeaderBtn>
      <NavMenu
        isNavMenuOpen={isNavMenuOpen}
        isGameStarted={isGameStarted}
        setNavMenuOpen={setNavMenuOpen}
        active={menuActive}
        setActive={setMenuActive}
        setIsGameStarted={setIsGameStarted}
      />
      <SignInModal
        active={modalActive}
        isLoggedIn={isLoggedIn}
        setActive={setModalActive}
        changeLoggedInState={changeLoggedInState}
      />
    </HeaderContainer>
  );
}

export default Header;
