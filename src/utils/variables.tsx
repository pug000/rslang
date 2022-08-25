import React from 'react';
import defaultTheme from '@/styles/theme';
import { Games, GroupButton } from '@/ts/interfaces';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';

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

export {
  games, groupBtns
};
