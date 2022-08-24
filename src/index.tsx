import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import Global from './styles/Global';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={defaultTheme}>
        <Global />
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
);
