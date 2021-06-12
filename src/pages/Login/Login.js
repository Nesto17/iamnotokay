import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Eye, EyeOff } from 'react-feather';

import './Login.scss';
import FirebaseContext from '../../utils/firebaseContext';
import * as ROUTE from '../../constants/routes';
import { Text } from '../../components';

function Login() {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  });
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      history.push(ROUTE.PROFILE);
    } catch (error) {
      const errorPrompt = error.code.split('/')[1];

      if (errorPrompt === 'user-not-found') {
        setError({
          ...error,
          emailError: `We don't found a user with this email.`,
        });
      }
      if (errorPrompt === 'wrong-password') {
        setError({
          ...error,
          passwordError: 'Wrong password bitch!',
        });
      }
    }
  };

  const emailValidation = ({ target }) => {
    setEmail(target.value);
    if (target.value.length == 0) {
      setError({ ...error, emailError: 'Please Enter Your Email.' });
    } else if (!emailRegex.test(String(target.value).toLowerCase())) {
      setError({ ...error, emailError: 'Please Enter a Valid Email.' });
    } else {
      setError({ ...error, emailError: '' });
    }
  };

  const passwordValidation = ({ target }) => {
    setPassword(target.value);
    if (target.value.length == 0) {
      setError({ ...error, passwordError: 'Please Enter Your Password.' });
    } else {
      setError({ ...error, passwordError: '' });
    }
  };

  return (
    <form onSubmit={handleLogin} className='login__wrapper' autoComplete={false}>
      <div className='login__container'>
        <Text
          textSize='lg'
          textType='basic'
          textColor='#000'
          textAlign='center'
          otherStyles={{marginBottom: '30px'}}
        >
          Lorem ipsum dolor
        </Text>
        <Text
          textSize='sm'
          textType='basic'
          textColor='#000'
          textAlign='center'
          otherStyles={{marginBottom: '40px'}}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          porta, libero vel porttitor accumsan
        </Text>
        <div className='login__input'>
          <input
            type='text'
            value={email}
            onChange={emailValidation}
            placeholder='Email'
          />
        </div>
        <Text
          textSize='sm'
          textType='basic'
          textColor='#FF2727'
          otherStyles={{alignSelf: 'flex-start', marginBottom: '20px'}}
        >
          {error.emailError}
        </Text>
        <div className='login__input'>
          <input
            type={isPasswordHidden ? 'password' : 'text'}
            value={password}
            onChange={passwordValidation}
            placeholder='Password'
          />
          <div
            className='login__input--icon'
            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            {isPasswordHidden ? <Eye strokeWidth={1} /> : <EyeOff strokeWidth={1} />}
          </div>
        </div>
        <Text
          textSize='sm'
          textType='basic'
          textColor='#FF2727'
          otherStyles={{alignSelf: 'flex-start', marginBottom: '20px'}}
        >
          {error.passwordError}
        </Text>

        <button className='login__submit' type='submit'>Log In</button>
      </div>
    </form>
  );
}

export default Login;
