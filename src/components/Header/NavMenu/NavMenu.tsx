import { NavItem } from '@/ts/interfaces';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import SetState from '@/ts/types';
import {
  Shadow, NavLi, Link, NavUl
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
    setActive
  }: NavMenuProps
) {
  const navItems: NavItem[] = [
    {
      id: 1, value: 'Главная', link: '/', icon: <HomeIcon />
    },
    {
      id: 2, value: 'Учебник', link: '/book', icon: <AutoStoriesIcon />
    },
    {
      id: 3, value: 'Сложные слова', link: '/difficult-words', icon: <StarIcon />
    },
    {
      id: 4, value: 'Игры', link: '/games', icon: <SportsEsportsIcon />
    },
    {
      id: 5, value: 'Статистика', link: '/statistics', icon: <TrendingUpIcon />
    },
    {
      id: 6, value: 'О проекте', link: '/about-project', icon: <InfoIcon />
    },
    {
      id: 7, value: 'О команде', link: '/about-team', icon: <GroupsIcon />
    },
  ];

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
