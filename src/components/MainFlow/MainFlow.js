import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import NoMatchPage from 'pages/NoMatchPage';
import SettingsPage from 'pages/SettingsPage';

const MainFlow = () => (
  <Switch>
    <Route path="/" exact>
      <HomePage />
    </Route>
    <Route path="/settings" exact>
      <SettingsPage />
    </Route>
    <Route>
      <NoMatchPage />
    </Route>
  </Switch>
);

export default MainFlow;
