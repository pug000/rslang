import { NavItem } from '@/ts/interfaces';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import {
  UlStart, Li, Link, Ul, LiStart
} from './NavMenu.style';

interface NavMenuProps {
  isNavMenuOpen: boolean,
}

function NavMenu(
  {
    isNavMenuOpen,
  }: NavMenuProps
) {
  const navItems: NavItem[] = [
    { id: 1, value: 'Главная', link: '/' },
    { id: 2, value: 'Учебник', link: '/book' },
    { id: 3, value: 'Сложные слова', link: '/difficult-words' },
    { id: 4, value: 'Игры', link: '/games' },
    { id: 5, value: 'Статистика', link: '/statistics' },
    { id: 6, value: 'О проекте', link: '/about-project' },
    { id: 7, value: 'О команде', link: '/about-team' },
  ];

  return (
    <>
      <UlStart>
        <LiStart>
          <Link to="/">
            <HomeIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/book">
            <AutoStoriesIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/difficult-words">
            <StarIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/games">
            <SportsEsportsIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/statistics">
            <TrendingUpIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/about-project">
            <InfoIcon />
          </Link>
        </LiStart>
        <LiStart>
          <Link to="/about-team">
            <GroupsIcon />
          </Link>
        </LiStart>
      </UlStart>
      <Ul isOpen={isNavMenuOpen}>
        {navItems.map(({ id, value, link }) => (
          <Li key={id}>
            <Link to={link}>{value}</Link>
          </Li>
        ))}
      </Ul>
    </>
  );
}

export default NavMenu;
