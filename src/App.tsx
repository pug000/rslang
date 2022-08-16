import React from 'react';
import { ThemeProvider } from 'styled-components';

import Global from '@/styles/Global';
import defaultTheme from '@/styles/theme';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <Header />
      <div>RsLang</div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
