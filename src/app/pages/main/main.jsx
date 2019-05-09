import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { appConst } from '@core';
import { PageRoute } from '@components';
import routes from './main.route';

@withRouter
class Main extends Component {
  render () {
    return (
      <div className="layout">
        <Switch>
          {routes.map(route => {
            return <PageRoute key={route.path} exact={route.exact} path={route.path} component={route.component} />;
          })}
          <Route
            render={() => {
              window.location = appConst.link.LOGIN;
              // TODO change default link
              return null;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
