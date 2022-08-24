import React from 'react';
import { Outlet } from 'react-router';
import Footer from '@/Footer';
import Header from '@/Header';

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
