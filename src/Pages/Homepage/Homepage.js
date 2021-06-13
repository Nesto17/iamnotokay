import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.scss';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';

function Homepage() {
  const user = useContext(UserContext);
  const history = useHistory();

  const goToWrite = () => {
    if (!user) {
      history.push({
        pathname: ROUTE.LOG_IN,
        state: { intendedPage: ROUTE.WRITE },
      });
    } else {
      history.push(ROUTE.WRITE);
    }
  };

  const goToRead = () => {
    if (!user) {
      history.push({
        pathname: ROUTE.LOG_IN,
        state: { intendedPage: ROUTE.STORY },
      });
    } else {
      history.push(ROUTE.STORY);
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
