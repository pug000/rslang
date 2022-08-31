import React, { useContext, useState } from 'react';
import NavMenu from '@/NavMenu';
import SignInModal from '@/SignIn';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderContext from '@/contexts/HeaderContext';
import {
  HeaderContainer, HeaderButton, HeaderLink, LoginButton, iconStyles, menuIconStyle
} from './Header.style';
import LogoSvg from './LogoSvg';
import LogInIcon from './LogInIcon';

function Header() {
  const { isLoggedIn, setLoggedIn } = useContext(HeaderContext);
  const [isNavMenuOpen, setNavMenuOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const changeLoggedInState = () => setLoggedIn(((prev) => !prev));

  return (
    <HeaderContainer>
      <HeaderButton onClick={() => {
        setNavMenuOpen(modalActive ? false : !isNavMenuOpen);
        setMenuActive(!menuActive);
      }}
      >
        <MenuIcon sx={menuIconStyle} />
      </HeaderButton>
      <HeaderLink to="/"><LogoSvg /></HeaderLink>
      <HeaderButton>
        {isLoggedIn
          ? <LogoutIcon sx={iconStyles} onClick={() => setModalActive(!modalActive)} />
          : <LoginButton onClick={() => setModalActive(!modalActive)}><LogInIcon /></LoginButton>}
      </HeaderButton>
      <NavMenu
        isNavMenuOpen={isNavMenuOpen}
        setNavMenuOpen={setNavMenuOpen}
        active={menuActive}
        setActive={setMenuActive}
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
