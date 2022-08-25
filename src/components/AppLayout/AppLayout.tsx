import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';
import SetState from '@/ts/types';
import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Footer from '@/Footer';
import Header from '@/Header';

interface AppLayoutProps {
  isLoggedIn: boolean,
  setIsLoggedIn: SetState<boolean>,
}

function AppLayout(
  {
    isLoggedIn,
    setIsLoggedIn,
  }: AppLayoutProps,
) {
  const location = useLocation();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      {location.pathname !== ('/games/audio') && location.pathname !== ('/games/sprint') && (
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <main>
        <Outlet />
      </main>
      {location.pathname !== ('/games/audio') && location.pathname !== ('/games/sprint') && <Footer />}
    </ThemeProvider>
  );
}

export default AppLayout;
