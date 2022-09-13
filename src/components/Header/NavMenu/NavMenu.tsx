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
  setActive: SetState<boolean>,
}

function NavMenu(
  {
    isNavMenuOpen,
    setNavMenuOpen,
    active,
    setActive,
  }: NavMenuProps
) {
  const closeModal = () => {
    setActive(false);
    setNavMenuOpen(false);
  };

  return (
    <>
      <NavUl isOpen={isNavMenuOpen}>
        {navItems.map(({
          id, value, link, icon
        }) => (
          <NavLi key={id}>
            <Link
              to={link}
              onClick={closeModal}
            >
              {icon}
              <p>{value}</p>
            </Link>
          </NavLi>
        ))}
      </NavUl>
      <Shadow
        onClick={closeModal}
        active={active}
      />
    </>
  );
}

export default NavMenu;
