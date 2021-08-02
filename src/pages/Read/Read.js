import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { Maximize2, Heart, Share, Flag } from 'react-feather';

import './Read.css';
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
  const [tempStories, setTempStories] = useState([]);

  const randomizeArray = () => {
    const array = tempStories;

    let currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const shuffleArray = () => {
    let array = tempStories;

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const getTenData = () => {
    // .where(firebase.firestore.FieldPath.documentId(), 'not-in', listOfDocumentId)
    return new Promise((resolve) => {
      db.collection('stories')
        .where('timestamp', '>=', new Date(2020, 6, 26))
        .orderBy('timestamp', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            let temp = {
              id: doc.id,
              data: doc.data(),
            };
            setTempStories(tempStories?.push(temp));
          });
        });
      resolve('');
    });
  };

  const parseData = () => {
    getTenData().then(() => {
      const tempArray = randomizeArray();
      console.log('tempArray ONE', tempArray);

      //   setTimeout(
      //     getTenData(tempArray).then(() => {
      //       const tempArrayTwo = randomizeArray();
      //       console.log('tempArray TWO', tempArrayTwo);
      //     }),
      //     5000
      //   );

      //   const storiesssss = stories.concat(tempArray);
      //   console.log(storiesssss, 'TAJSDJASJDAJSDASJ');
      //   setStories(storiesssss);
      //   console.log(stories, 'THIS IS STORIES');
    });
  };

  useEffect(() => {
    parseData();
  }, []);

  return (
    <div className='story__wrapper'>
      <div className='story__container'>
        <div className='story__container--upper'>
          <Text textSize='lg' textType='basic'>
            {'INI JUDUL PAGE OKE JOSEPH'}
          </Text>
          <div className='story__icons'>
            <Maximize2
              className='story__icons--item'
              onClick={() => console.log('THIS IS EXPAND ICON')}
              color='#FFF'
              strokeWidth={1}
            />
            <Heart
              className='story__icons--item'
              onClick={() => console.log('THIS IS LIKE ICON')}
              color='#FFF'
              strokeWidth={1}
            />
            <Share
              className='story__icons--item'
              onClick={() => console.log('THIS IS SHARE ICON')}
              color='#FFF'
              strokeWidth={1}
            />
            <Flag
              className='story__icons--item'
              onClick={() => console.log('THIS IS FLAG ICON')}
              color='#FFF'
              strokeWidth={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
