import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { Maximize2, Heart, Share, Flag } from 'react-feather';

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
  const [tempStories, setTempStories] = useState([]);

  useEffect(() => {
    getTenData();

    const tempArray = randomizeArray(tempStories);

    setStories([...stories, ...tempArray]);
  }, []);

  const getData = () => {
    db.collection('stories')
      .doc('bPFJmhIOma8ndjcNNDx4')
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setTempStories(doc.data());
          console.log('tempStories', tempStories);
          // console.log(stories);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  const getTenData = () => {
    // console.log(tempTimeStamp, 'TIME');
    // db.collection('stories')
    //   .where('timestamp', '>=', tempTimeStamp)
    //   .orderBy('timestamp', 'desc')
    //   .limit(5)
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, ' => ', doc.data());
    //       setTempStories((prev) => [...prev, doc.data()]);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('Error getting documents: ', error);
    //   });

    db.collection('stories')
      .where('timestamp', '>=', new Date(2021, 6, 26))
      .orderBy('timestamp', 'desc')
      .limit(5)
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        snapshot.forEach((doc) => {
          // processItem(doc);
          console.log(doc.id, ' => ', doc.data());
          setTempStories((prev) => {
            console.log('tempStories', prev);
            return [...prev, doc.data()];
          });
        });
      });
  };

  const randomizeArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className='wrapper'>
      <div className='story__container'>
        <div className='story__container--upper'>
          <Text textSize='lg' textType='basic'>
            {id}
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
        <Text textSize='sm' otherStyles={{ margin: '10px 0' }}>{` • `}</Text>
        {stories.map((story, index) => (
          <Text textType='lg'>{story?.title}</Text>
        ))}
        {/* <div className='story__buttons'>
          <button className='story__previous'>Previous Story</button>
          <button className='story__expand'>Expand as a page</button>
          <button className='story__next'>Next Story</button>
        </div> */}
      </div>
    </div>
  );
};

export default Read;
