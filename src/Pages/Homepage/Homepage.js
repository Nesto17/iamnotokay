import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.css';
import FirebaseContext from '../../utils/firebaseContext';
import { Text } from '../../components';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';

const Homepage = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    const goToWrite = () => {
        if (!user) {
            history.push({
                pathname: ROUTE.LOG_IN,
                state: { intendedPage: '/w/new' },
            });
        } else {
            history.push('/w/new');
        }
    };

    const goToRead = () => {
        if (!user) {
            history.push({
                pathname: ROUTE.LOG_IN,
                state: { intendedPage: '/r/collections' },
            });
        } else {
            history.push('/r/collections');
        }
    };

    return (
        <div className="homepage__wrapper">
            <div className="homepage__hero">
                <Text textType="handwriting" textSize="hero">
                    Your pain is temporary
                </Text>
            </div>
            <div className="homepage__buttons">
                <button
                    type="button"
                    className="homepage__button"
                    onClick={goToWrite}
                >
                    I want to tell my stories
                </button>
                <button
                    type="button"
                    className="homepage__button"
                    onClick={goToRead}
                >
                    I want read people's stories
                </button>
            </div>
        </div>
    );
};

export default Homepage;
