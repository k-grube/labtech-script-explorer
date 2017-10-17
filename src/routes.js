import React from 'react';
import {Route, Switch} from 'react-router';

import HomePage from './containers/HomePage/HomePage';
import NotFound from './components/NotFound';
import ScriptExplorer from './containers/ScriptExplorer/ScriptExplorer';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="/test" component={() => <div>test</div>}/>
      <Route path="/explorer" component={ScriptExplorer}/>
      <Route path="" component={NotFound}/>
    </Switch>
  );
};

export default Routes;
