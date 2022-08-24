import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';
import React from 'react';
import { Outlet } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Footer from '@/Footer';
import Header from '@/Header';

function AppLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default AppLayout;
