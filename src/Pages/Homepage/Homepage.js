import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.scss';
import FirebaseContext from '../../utils/firebaseContext';
import * as ROUTE from '../../constants/routes';

function Homepage() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    console.log('user', user);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(firebase);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // localStorage.setItem('authUser', 'hello');

      history.push(ROUTE.PROFILE);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('errorMessage', errorMessage);
      // setEmail('');
      // setPassword('');
    }
  };

  return (
    <form onSubmit={handleLogin} className='homepage__wrapper'>
      <input
        type='text'
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        placeholder='email'
      />
      <input
        type='text'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder='password'
      />
      <button type='submit'>SUBMIT ANJ</button>
    </form>
  );
}

export default Homepage;
