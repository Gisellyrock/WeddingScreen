import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import Main from './pages/main.js';
import NotFound from './pages/notfound.js';

const Routes = () => {
  return (
    <TransitionGroup>
      <BrowserRouter>
        <Switch>
          <Route exact path="/:uid" component={Main} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </TransitionGroup>
  );
};

export default Routes;
