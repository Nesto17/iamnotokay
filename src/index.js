import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import './index.scss';
import firebase from './utils/firebase';
import App from './App';

const FirebaseContext = createContext();

ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
