import React from 'react';
import defaultTheme from '@/styles/theme';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';

import {
  Games,
  GroupButton,
  NavItem,
  ProjectDescription,
  Statistics
} from '@/ts/interfaces';

const defaultUser = { email: '', password: '' };
const defaultToken = '';
const defaultUserID = '';
const defaultErrMessage = {
  text: '',
  activeErr: false,
};

const todayDate = new Date()
  .toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });

const defaultStatistics: Statistics = {
  learnedWords: 0,
  optional: {
    date: todayDate,
    games: {
      audio: {
        gameLearnedWords: 0,
        percentCorrectWord: 0,
        countCorrectAnswers: 0,
        maxCountCorrectAnswers: 0,
      },
      sprint: {
        gameLearnedWords: 0,
        percentCorrectWord: 0,
        countCorrectAnswers: 0,
        maxCountCorrectAnswers: 0,
      }
    }
  }
};

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
    backgroundColor: `${defaultTheme.colors.backgroundPink}`,
    buttonColor: `${defaultTheme.colors.pink}`,
    icon: <VolumeUpIcon />,
    note: '*не забудьте включить звук',
  },
  sprint: {
    name: 'Спринт',
    description: 'Спринт - это тренировка на скорость. Вам будет предложено слово и его перевод. Цель игры - выбрать как можно больше правильных переводов за 1 минуту.',
    backgroundColor: `${defaultTheme.colors.backgroundBlue}`,
    buttonColor: `${defaultTheme.colors.blue}`,
    icon: <SpeedIcon />,
    note: '*будьте внимательны',
  }
};

const groupButtons: GroupButton[] = [
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

const projectDescription: ProjectDescription[] = [
  {
    descriptionId: 'd1',
    title: 'Эффективность RS Lang',
    text: 'Наша миссия — сделать обучение английскому языку доступным для всех. Начать учиться с RS Lang может каждый вне зависимости от его подготовки.'
  },
  {
    descriptionId: 'd2',
    title: 'Обучение в игре',
    text: 'Игровая механика доказала свою эффективность для всех возрастов. В RS Lang вам будет предложено две игры на понимание английских слов на слух и чтение.'
  },
  {
    descriptionId: 'd3',
    title: 'Оценка эффективности',
    text: 'Мы постоянно контролируем качество и прогресс обучения. Один из таких инструментов — статистика, где зарегистрированные пользователи могут отслеживать количество изученных слов, результаты игр и многое другое.'
  },
];

const filterDifficultWords = encodeURIComponent('{"userWord.optional.isDifficultWord":"true"}');
const filterLearnedWords = encodeURIComponent('{"userWord.optional.isDifficultWord":"false"}');

export {
  navItems,
  games,
  groupButtons,
  totalCountPages,
  regex,
  strikeMessages,
  defaultToken,
  defaultUser,
  defaultUserID,
  defaultErrMessage,
  filterDifficultWords,
  filterLearnedWords,
  projectDescription,
  defaultStatistics,
  todayDate,
};
