import { NavItem } from '@/ts/interfaces';
import React from 'react';
import { Li, Link, Ul } from './NavMenu.style';

function NavMenu() {
  const navItems: NavItem[] = [
    { id: 1, value: 'Главная', link: '/' },
    { id: 2, value: 'Учебник', link: '/book' },
    { id: 3, value: 'Игры', link: '/games' },
    { id: 4, value: 'Статистика', link: '/statistics' },
    { id: 5, value: 'О проекте', link: '/about-project' },
    { id: 6, value: 'О команде', link: '/about-team' },
  ];

  return (
    <Ul>
      {navItems.map(({ id, value, link }) => (
        <Li key={id}>
          <Link to={link}>{value}</Link>
        </Li>
      ))}
    </Ul>
  );
}

export default NavMenu;
