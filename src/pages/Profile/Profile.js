/* eslint-disable prettier/prettier */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
  Heart,
} from 'react-feather';

import './Profile.css';
import { Text } from '../../components';
import * as ROUTE from '../../constants/routes';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';

function Profile() {
  const { firebase } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const history = useHistory();
  const db = firebase.firestore();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStoriesId();
  }, []);

  const getStoriesId = () => {
    db.collection('account')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.data().post_created.forEach((storyId) => {
            getStoriesData(storyId);
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  const getStoriesData = (id) => {
    db.collection('stories')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const tempObj = { ...doc.data(), id };
          setStories((prev) => {
            return [...prev, tempObj];
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push(ROUTE.HOMEPAGE);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const renderStories = () => {
  //   console.log('stories', stories);
  //   stories.map((story, index) => {
  //     console.log('story', story);
  //     return (
  //       <div
  //         key={story?.id}
  //         className='story__container'
  //         style={{ background: '#FFFFFF' }}
  //       >
  //         <p className='story__title'>{story?.title}</p>
  //         <button onClick={() => history.push(`/w/${story?.id}`)}>edit</button>
  //       </div>
  //     );
  //   });
  // };

  return (
    // <div className="profile__wrapper">
    //     <button onClick={logOut} type="button">
    //         <Text textSize="md" textColor="#000">
    //             LOG OUT
    //         </Text>
    //     </button>
    // </div>
    <main>
      <section className='profile__left'>
        <div className='profile-left__container'>
          <h1>John Doe</h1>
          <h2 className='profile__email'>johndoe@email.com</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            porta, libero vel porttitor accumsan, nibh ex luctus metus, non
            aliquam quam quam quis arcu. Phasellus sit. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Vivamus porta, libero vel
            porttitor accumsan, nibh ex luctus metus, non
          </p>

          <div className='profile__social'>
            <h2 className='profile__label'>Social Media Links</h2>
            <div className='profile__social--link'>
              <Twitter strokeWidth={1} className='icons' />
              Twitter
            </div>
            <div className='profile__social--link'>
              <Instagram strokeWidth={2} className='icons icon--white' />
              Instagram
            </div>
            <div className='profile__social--link'>
              <Facebook strokeWidth={1} className='icons' />
              Messenger
            </div>
          </div>

          <h2 className='profile__label'>Joined at</h2>
          <h3>28 April 2021</h3>
        </div>

        <div className='profile__edit'>Edit your profile</div>
      </section>
      <section className='profile__middle'>
        <div className='profile-middle__header'>
          <h2>Stories</h2>
        </div>
        <section className='story-list'>
          <div className='story-list__card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social story--links'>
              <div className='profile__social--link story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
          <div className='story-list__card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social story--links'>
              <div className='profile__social--link story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
          <div className='story-list__card'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h3>May 3, 2021</h3>
            <div className='profile__social story--links'>
              <div className='profile__social--link story--link'>
                <MessageCircle strokeWidth={1} className='icons icon--small' />8
              </div>
              <div className='profile__social--link story--link'>
                <Heart strokeWidth={1} className='icons icon--small' />
                32
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className='profile__right'>Ini section kanan</section>
    </main>
  );
}

export default Profile;
