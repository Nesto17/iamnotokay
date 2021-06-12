import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Profile.scss';
import { Text } from '../../components';
import * as ROUTE from '../../constants/routes';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';

function Profile() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const history = useHistory();

  console.log(user);

  const handleClick = () => {
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

  // useEffect(() => {
  //   const joseph = JSON.parse(localStorage.getItem('authUser'));
  //   console.log('user', joseph);

  //   console.log('UserContext', user.email);
  // }, []);

  return (
    <div className='profile__wrapper'>
      <button onClick={handleClick}>
        <Text textSize='md' textColor='#000'>
          LOG OUT
        </Text>
      </button>
    </div>
  );
}

export default Profile;
