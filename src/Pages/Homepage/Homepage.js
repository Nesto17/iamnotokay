import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.scss';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';

const Homepage = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  const goToWrite = () => {
    if (!user) {
      history.push({
        pathname: ROUTE.LOG_IN,
        state: { intendedPage: '/w/new' },
      });
    } else {
      history.push('/w/new');
    }
  };

  const goToRead = () => {
    if (!user) {
      history.push({
        pathname: ROUTE.LOG_IN,
        state: { intendedPage: '/r/collections' },
      });
    } else {
      history.push('/r/collections');
    }
  };

  return (
    <div className='homepage__wrapper'>
      <button onClick={goToWrite}>I WANNA WRITEEEE</button>
      <button onClick={goToRead}>I WANT TO READ</button>
    </div>
  );
}

export default Homepage;
