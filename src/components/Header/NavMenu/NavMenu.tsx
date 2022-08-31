import React from 'react';

import { navItems } from '@/utils/variables';

import SetState from '@/ts/types';

import {
  Shadow,
  NavLi,
  Link,
  NavUl
} from './NavMenu.style';

interface NavMenuProps {
  isNavMenuOpen: boolean,
  setNavMenuOpen: SetState<boolean>,
  active: boolean,
  setActive: (arg0: boolean) => void,
}

function NavMenu(
  {
    isNavMenuOpen,
    setNavMenuOpen,
    active,
    setActive,
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
