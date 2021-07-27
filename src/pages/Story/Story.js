import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';

import './Story.scss';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';
import { Text, Modal } from '../../components';

const Read = () => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const history = useHistory();
  const db = firebase.firestore();
  const { id } = useParams();

  return <div className='wrapper'></div>;
};

export default Read;
