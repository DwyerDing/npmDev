import React, { Component } from 'react';
import Loadable from 'react-loadable';

const loading = props => {
  return <div className="ball-pulse-loading" />;
};

const routes = [
  {
    path: '/',
    exact: true
    // component: Loadable({loader:()=>import(url),loading});
    // url is the page component directory, demand loading
  }
];

export default routes;
