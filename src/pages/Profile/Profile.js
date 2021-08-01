/* eslint-disable prettier/prettier */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        <div className="profile__wrapper">
            <button onClick={logOut} type="button">
                <Text textSize="md" textColor="#000">
                    LOG OUT
                </Text>
            </button>
        </div>
    );
}

export default Profile;
