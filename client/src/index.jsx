import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18next/i18next'
import { UserProvider } from './providers/UserProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import Layout from './components/Layout/Layout';
import { CommunicationProvider } from './providers/CommunicationProvider';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Нет такого элемента как "root"');

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <React.Suspense>
      <ThemeProvider>
        <UserProvider>
          <CommunicationProvider>
            <Layout>
              <App />
            </Layout>
          </CommunicationProvider>
        </UserProvider>
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>
);