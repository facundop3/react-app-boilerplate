import React, { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import flatten from 'flat';

import icons from 'assets/icons';
import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'components/Loading';
import { useAuthentication } from 'hooks/auth';
import { useLocale } from 'hooks/locale';
import AppLocale from 'locales';

import './App.module.scss';

const AuthFlow = lazy(() => import('../AuthFlow'));
const MainFlow = lazy(() => import(/* webpackPrefetch: true */ '../MainFlow'));

library.add(icons);

const App = () => {
  const locale = useLocale();
  const isAuthenticated = useAuthentication();
  const appLocale = AppLocale[locale] || AppLocale.en;

  return (
    <IntlProvider locale={locale} messages={flatten(appLocale.messages)}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {isAuthenticated ? <MainFlow /> : <AuthFlow />}
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
