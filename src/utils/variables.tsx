import React from 'react';
import defaultTheme from '@/styles/theme';
import { Games, GroupButton, NavItem } from '@/ts/interfaces';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';

const defaultUser = { email: '', password: '' };
const defaultSingInData = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
};
const defaultToken = '';
const defaultUserID = '';

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
    id: 6, value: 'О нас', link: '/about', icon: <InfoIcon />
  },
];

const totalCountPages = 30;

const games: Games = {
  audio: {
    name: 'Аудиовызов',
    description: 'Вы слышите слово на английском языке и видите 5 вариантов перевода. Цель игры - выбрать правильный перевод озвученного слова.',
    bgColor: `${defaultTheme.colors.bgPink}`,
    btnColor: `${defaultTheme.colors.pink}`,
    icon: <VolumeUpIcon />,
    note: '*не забудьте включить звук',
  },
  sprint: {
    name: 'Спринт',
    description: 'Спринт - это тренировка на скорость. Вам будет предложено слово и его перевод. Цель игры - выбрать как можно больше правильных переводов за 1 минуту.',
    bgColor: `${defaultTheme.colors.bgBlue}`,
    btnColor: `${defaultTheme.colors.blue}`,
    icon: <SpeedIcon />,
    note: '*будьте внимательны',
  }
};

const groupBtns: GroupButton[] = [
  {
    id: 1, value: 0, text: 'A1', color: `${defaultTheme.colors.beige}`
  },
  {
    id: 2, value: 1, text: 'A2', color: `${defaultTheme.colors.beige}`
  },
  {
    id: 3, value: 2, text: 'B1', color: `${defaultTheme.colors.blue}`
  },
  {
    id: 4, value: 3, text: 'B2', color: `${defaultTheme.colors.blue}`
  },
  {
    id: 5, value: 4, text: 'C1', color: `${defaultTheme.colors.pink}`
  },
  {
    id: 6, value: 5, text: 'C2', color: `${defaultTheme.colors.pink}`
  }
];

const strikeMessages: string[] = [
  'Ты просто молодец!',
  'Отлично! Так держать!',
  'У тебя все прекрасно получается.',
  'Здорово! Опять все правильно!',
  'И снова без ошибок!'
];

const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export {
  navItems, games, groupBtns, totalCountPages, regex, strikeMessages,
  defaultSingInData, defaultToken, defaultUser, defaultUserID
};
