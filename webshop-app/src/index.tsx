import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scripts/Global';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.body.classList.add('no_scroll_lock');
root.render(
  <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </React.StrictMode>
);