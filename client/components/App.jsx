import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainLoginSignup from './MainLoginSignup';
import Nav from './Nav';
import Login from './Login';

import SignUp from './SignUp';
import UserMainView from './UserMainView';
export default () => {
  return (
    <HashRouter>
      <Route component={Nav} />
      <Switch>
        <Route component={MainLoginSignup} path="/" exact />
        <Route component={UserMainView} path="/home" exact />
      </Switch>
    </HashRouter>
  );
};
