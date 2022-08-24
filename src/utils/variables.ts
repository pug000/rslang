import defaultTheme from '@/styles/theme';
import { GroupButton } from '@/ts/interfaces';

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

const totalCountPages = 30;

export { groupBtns, totalCountPages };
