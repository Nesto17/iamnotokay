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
    const [idList, setIdList] = useState([]);

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

    const getTenData = () => {
        return new Promise((resolve, reject) => {
            let chance = getRandomInt(0, 1);
            let operator = '<=';
            console.log(chance);
            if (chance == 0) {
                operator = '>=';
            }
            console.log(operator, 'operator');
            let date = getRandomInt(1, 31);
            let month = getRandomInt(6, 7);
            let newDate = new Date(2021, month, date);
            console.log(newDate, 'New date');
            db.collection('stories')
                .where('timestamp', operator, newDate)
                .orderBy('timestamp', 'desc')
                .limit(5)
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        if (!idList.includes(doc.id)) {
                            let temp = {
                                id: doc.id,
                                data: doc.data(),
                            };
                            setTempStories(tempStories?.push(temp));
                            setIdList(idList?.push(doc.id));
                        }
                    });
                });
            console.log(tempStories, 'Get Ten Data');
            resolve('');
        });
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /*
        Cara 1:
            1. pake timestamp untuk query berdasarkan date random. variable bisa, tinggal random date berdasarkan range
            2. filter di client side yang sama ga dipake. (bisa berapapa pun) (makin banyak data makin berat websitenya)
            3. pasti kalo ada yang sama data < 10 (contoh unique data ada 5)  
            4. query lagi sampe datanya ini ada 10 yang unique. per fetch ada (10 data yang baru)

            downsight: 
            - ngabisin read. 
        Cara 2:
            - langsung banyak ambil documentnya, randomize di client side

            downsight: 
            - ngabisin read. 
    */

    const parseData = () => {
        getTenData().then(() => {
            // console.log(idList, 'idList ONE');
            // console.log(tempStories, 'okaodkfjakdjfalksdj');
            // const tempArray = randomizeArray();
            // console.log('tempArray ONE', tempArray);
        });

        setTimeout(() => {
            console.log('ini kedua');
            getTenData(6, 30);
        }, 2000);

        setTimeout(() => {
            console.log('ini Ketiga');
            getTenData(7, 15);
        }, 4000);
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
