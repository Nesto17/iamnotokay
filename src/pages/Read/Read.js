import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';

import './Read.scss';
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
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection('stories')
      .doc('bPFJmhIOma8ndjcNNDx4')
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setStories(doc.data());
          console.log(stories);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  return (
    <div className='wrapper'>
      <div className='story__container'>
        <div className='story__container--upper'>
          <Text textSize='lg' textType='basic'>
            {stories?.title}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Read;
