import React from 'react';
import { NavLink } from 'react-router-dom';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import Button from '@/Button';

import defaultTheme from '@/styles/theme';

import NotFoundPage from './NotFound.style';

function NotFound() {
  return (
    <NotFoundPage>
      <WarningAmberIcon />
      <h1>Что-то пошло не так. Страница не найдена.</h1>
      <NavLink to="/">
        <Button
          id="home"
          title="На главную"
          callback={() => { }}
          color={defaultTheme.colors.primaryColor}
        />
      </NavLink>
    </NotFoundPage>
  );
}

export default NotFound;
