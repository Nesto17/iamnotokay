import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { Maximize2, Heart, Share, Flag } from 'react-feather';

import './Read.css';
import FirebaseContext from '../../utils/firebaseContext';
import UserContext from '../../utils/userContext';
import * as ROUTE from '../../constants/routes';
import { Text, Modal } from '../../components';

const Read = () => {
    const { firebase, FieldValue, FieldPath } = useContext(FirebaseContext);
    const user = useContext(UserContext);
    const history = useHistory();
    const db = firebase.firestore();
    const { id } = useParams();
    const [stories, setStories] = useState([]);
    const [tempStories, setTempStories] = useState([]);
    const [idList, setIdList] = useState(['ok']);

    const randomizeArray = () => {
        const array = tempStories;

        let currentIndex = array.length,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    const getTenData = (ok) => {
        return new Promise((resolve, reject) => {
            console.log(ok, 'db Ok');
            db.collection('stories')
                .where(FieldPath.documentId(), 'not-in', ok)
                // .where('timestamp', '>=', new Date(2020, 6, 26))
                // .orderBy('timestamp', 'desc')
                .limit(5)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        let temp = {
                            id: doc.id,
                            data: doc.data(),
                        };
                        setTempStories(tempStories?.push(temp));
                        setIdList(idList?.push(doc.id));
                    });
                });
            resolve('');
        });
    };

    const parseData = () => {
        getTenData(['ok']).then(() => {
            console.log(idList, 'idList ONE');
            // console.log(tempStories, 'okaodkfjakdjfalksdj');
            // const tempArray = randomizeArray();
            // console.log('tempArray ONE', tempArray);
        });

        setTimeout(
            getTenData([
                '0OHMX7WK5UpyGJ3Irdkn',
                '0pWrehgOJUHynMOlmWc7',
                '5YqV04ZIPDrHuKFC3HsZ',
                '78g0fCScbgUbk9WZ22GT',
                'AK4FrNvvBulaqCIySQvE',
            ]).then(() => {
                // const tempArrayTwo = randomizeArray();
                console.log(idList, 'idList TWO');
                // console.log(tempStories, 'okaodkfjakdjfalksdj');
            }),
            6000
        );

        setTimeout(() => {
            console.log('ok');
        }, 2000);
    };

    useEffect(() => {
        parseData();
    }, []);

    return (
        <div className='story__wrapper'>
            <div className='story__container'>
                <div className='story__container--upper'>
                    <Text textSize='lg' textType='basic'>
                        {'INI JUDUL PAGE OKE JOSEPH'}
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
            </div>
        </div>
    );
};

export default Read;
