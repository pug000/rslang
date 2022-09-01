import React from 'react';
import {
  Outlet,
  useLocation
} from 'react-router';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '@/styles/theme';
import Global from '@/styles/Global';

import Footer from '@/Footer';
import Header from '@/Header';

function AppLayout() {
  const location = useLocation();

  const isGameLocation = location.pathname !== ('/games/audio') && location.pathname !== ('/games/sprint');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      {isGameLocation && <Header />}
      <main>
        <Outlet />
      </main>
      {isGameLocation && <Footer />}
    </ThemeProvider>
  );
}

export default AppLayout;
