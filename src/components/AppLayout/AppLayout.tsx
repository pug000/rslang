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
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      {location.pathname !== ('/games/audio') && location.pathname !== ('/games/sprint') && (
        <Header />
      )}
      <main>
        <Outlet />
      </main>
      {location.pathname !== ('/games/audio') && location.pathname !== ('/games/sprint') && <Footer />}
    </ThemeProvider>
  );
}

export default AppLayout;
