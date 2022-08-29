import React from 'react';
import SetState from '@/ts/types';
import { navItems } from '@/utils/variables';
import {
  Shadow, NavLi, Link, NavUl
} from './NavMenu.style';

interface NavMenuProps {
  isNavMenuOpen: boolean,
  isGameStarted: boolean,
  setNavMenuOpen: SetState<boolean>,
  active: boolean,
  setActive: (arg0: boolean) => void,
  setIsGameStarted: SetState<boolean>,
}

function NavMenu(
  {
    isNavMenuOpen,
    isGameStarted,
    setNavMenuOpen,
    active,
    setActive,
    setIsGameStarted,
  }: NavMenuProps
) {
  return (
    <>
      <NavUl isOpen={isNavMenuOpen}>
        {navItems.map(({
          id, value, link, icon
        }) => (
          <NavLi key={id}>
            <Link
              to={link}
              onClick={() => {
                setActive(false);
                setNavMenuOpen(false);

                if (isGameStarted) {
                  setIsGameStarted(false);
                }
              }}
            >
              {icon}
              <p>{value}</p>
            </Link>
          </NavLi>
        ))}
      </NavUl>
      <Shadow
        onClick={() => {
          setActive(false);
          setNavMenuOpen(false);
        }}
        active={active}
      />
    </>
  );
}

export default NavMenu;
