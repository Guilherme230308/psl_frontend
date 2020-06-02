import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewsDashboard from './pages/NewsDashboard';
import New from './pages/New';
import News from './pages/News';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
        <Route path="/news" component={News} />
        <Route path="/newsDashboard" component={NewsDashboard} />
      </Switch>
    </BrowserRouter>
  );
}