import React from 'react';
import { NavLink } from 'react-router-dom';
import defaultTheme from '@/styles/theme';

import Button from '@/Button';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
          color={defaultTheme.colors.primaryColor}
        />
      </NavLink>
    </NotFoundPage>
  );
}

export default NotFound;
