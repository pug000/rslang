import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { HashRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
