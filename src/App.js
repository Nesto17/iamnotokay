import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import * as ROUTE from './constants/routes';
import FirebaseContext from './utils/firebaseContext';

import Homepage from './pages/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';

function App() {
  const firebase = useContext(FirebaseContext);

  return (
    <Router>
      <div className='wrapper'>
        <Navbar />
        <Switch>
          <Route to={ROUTE.HOMEPAGE} exact component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
