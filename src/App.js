import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import * as ROUTE from './constants/routes';
import Homepage from './pages/Homepage/Homepage';

function App() {
  return (
    <Router>
      <Switch>
        <Route to={ROUTE.HOMEPAGE} exact component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
