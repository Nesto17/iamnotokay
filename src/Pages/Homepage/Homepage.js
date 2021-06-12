import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.scss';
import FirebaseContext from '../../utils/firebaseContext';
import * as ROUTE from '../../constants/routes';

function Homepage() {

  return (
    <div className='homepage__wrapper'>
      JOSEPH GANTENG BGT
    </div>
  );
}

export default Homepage;
