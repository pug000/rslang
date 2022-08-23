import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';
import SetState from '@/ts/types';
import React from 'react';
import { Outlet } from 'react-router';
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
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default AppLayout;
