import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import * as ROUTE from './constants/routes';
import useAuth from './hooks/useAuth';
import UserContext from './utils/userContext';

import { Homepage, Profile, Login, Register, Write, Collection } from './pages';
import { Navbar } from './components';

function App() {
  const { user } = useAuth();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className='wrapper'>
          <Navbar />
          <Switch>
            <Route path={ROUTE.HOMEPAGE} exact component={Homepage} />
            <Route path={ROUTE.PROFILE} exact component={Profile} />
            <Route path={ROUTE.LOG_IN} exact component={Login} />
            <Route path={ROUTE.REGISTER} exact component={Register} />
            <Route path={ROUTE.WRITE} exact component={Write} />
            <Route path={ROUTE.COLLECTION} exact component={Collection} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
