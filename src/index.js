import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { firebase, FieldValue } from './utils/firebase';
import FirebaseContext from './utils/firebaseContext';
import App from './App';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
