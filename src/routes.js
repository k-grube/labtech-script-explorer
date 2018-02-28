import React from 'react';
import {Route, Switch} from 'react-router';

import HomePage from './containers/HomePage/HomePage';
import NotFound from './components/NotFound';
import ScriptExplorer from './containers/ScriptExplorer/ScriptExplorer';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={ScriptExplorer}/>
      <Route path="" component={NotFound}/>
    </Switch>
  );
};

export default Routes;
