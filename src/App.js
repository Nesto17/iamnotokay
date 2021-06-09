import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import * as ROUTE from './constants/routes';
import useAuthListener from './hooks/useAuthListener';
import UserContext from './utils/userContext';

import Homepage from './pages/Homepage/Homepage';
import Profile from './pages/Profile/Profile';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={ user }>
      <Router>
        <div className='wrapper'>
          <Navbar />
          <Switch>
            <Route path={ROUTE.HOMEPAGE} exact component={Homepage} />
            <Route path={ROUTE.PROFILE} exact component={Profile} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
