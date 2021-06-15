import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import './Write.scss';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';
import { Text } from '../../components';
import useScreenSize from '../../hooks/useScreenSize';

function Write() {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const history = useHistory();
  const db = firebase.firestore();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({
    titleError: '',
    storyError: '',
  });
  const screenSize = useScreenSize();
  const spaceRegex = /\w+/g;


  const updatePostCreated = (id) => {
    return db
      .collection('account')
      .doc(user.uid)
      .set(
        {
          post_created: [id],
        },
        { merge: true }
      )
      .then(() => {
        setSuccess('Your story is published');
        setTitle('');
        setStory('');
        setIsAnonymous(false);
        history.push(ROUTE.PROFILE);
      });
  };

  // const currentDate = Date.now();
  // const currentDate2 = new Date();
  // console.log(currentDate / 1000);
  // console.log(currentDate2);

  const handlePublish = (event) => {
    event.preventDefault();

    try {
      db.collection('stories')
        .add({
          title: title,
          story: story,
          anonymous: isAnonymous,
          owner: user.uid,
          timestamp: FieldValue.serverTimestamp()
        })
        .then((docRef) => {
          // console.log('Document written with ID: ', docRef.id);
          updatePostCreated(docRef.id);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkTitleLength();
  }, [title]);

  const checkTitleLength = () => {
    const words = title.match(spaceRegex);
    if (words != null && words.length == 0) {
      setError({
        ...error,
        titleError: `Please enter a title.`,
      });
    } else if (words != null && words.length > 15) {
      setError({
        ...error,
        titleError: `The maximum words for the title is 15 words.`,
      });
    } else {
      setError({
        ...error,
        titleError: ``,
      });
    }
  };

  useEffect(() => {
    checkStoryLength();
  }, [story]);

  const checkStoryLength = () => {
    const words = story.match(spaceRegex);
    if (words != null && words.length == 0) {
      setError({
        ...error,
        storyError: `Please enter your story.`,
      });
    } else if (words != null && words.length > 500) {
      setError({
        ...error,
        storyError: `The maximum words for the story is 500 words.`,
      });
    } else {
      setError({
        ...error,
        storyError: ``,
      });
    }
  };

  return (
    <form className='write__wrapper' autoComplete='off'>
      <div className='write__container'>
        <Text
          textSize='sm'
          textType='basic'
          textColor='#FF2727'
          otherStyles={{ alignSelf: 'flex-start' }}
        >
          {error.titleError}
        </Text>
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Title'
          autoFocus={true}
        />
        <Text
          textSize='sm'
          textType='basic'
          textColor='#FF2727'
          otherStyles={{ alignSelf: 'flex-start' }}
        >
          {error.storyError}
        </Text>
        <textarea
          value={story}
          onChange={({ target }) => setStory(target.value)}
          placeholder={`Write down your thoughts right here bud... Remember, don't go beyond 500 words`}
          data-gramm_editor={false}
        ></textarea>
      </div>
      <div className={`write__buttons-${screenSize}`}>
        <button
          onClick={(event) => {
            event.preventDefault();
            setIsAnonymous(!isAnonymous);
          }}
          className={`write__anonymous-${isAnonymous && 'active'}`}
        >
          Keep it anonymous
        </button>
        <button
          onClick={handlePublish}
          type='submit'
          className='write__submit'
          disabled={
            !title ||
            !story ||
            ((error?.titleError || error?.storyError) && true)
          }
        >
          Publish my story
        </button>
      </div>
    </form>
  );
}

export default Write;
