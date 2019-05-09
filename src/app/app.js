import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './styles';
import Login from './pages/login/login';
import Main from './pages/main/main';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} /> <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById('app')
);
