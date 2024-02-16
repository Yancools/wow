import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import './i18next/i18next'
import { UserProvider } from './providers/UserProvider';
import { ThemeProvider } from './providers/ThemeProvider';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Нет такого элемента как "root"');

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ThemeProvider>
        </React.Suspense>
  </React.StrictMode>
);