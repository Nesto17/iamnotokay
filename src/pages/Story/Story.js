import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';
import { Heart, Share, Flag } from 'react-feather';
import moment from 'moment';

import './Story.css';
import { FirebaseContext } from '../../contexts';
import { ToxicityModelContext } from '../../contexts';
import * as ROUTE from '../../constants/routes';
import { Text, Modal, PageShader } from '../../components';

const Story = () => {
    const toxicityModel = useContext(ToxicityModelContext);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const history = useHistory();
    const location = useLocation();
    const { data: storyData } = location?.state || {};
    const [isReplying, setIsReplying] = useState(false);
    const [replyValue, setReplyValue] = useState('');

    const triggerReply = () => {
        setIsReplying(!isReplying);
    };

    const classifyToxicity = () => {
        if (Object.keys(toxicityModel).length > 0) {
            toxicityModel.classify(replyValue).then((predictions) => {
                console.log(predictions);
            });
        } else {
            // MAKE LOGIC HERE LATER
            return null;
        }
    };

    return (
        <div className="story__wrapper">
            <div className="story__container">
                <div className="story__container--inner">
                    <h2 className="story__title">{storyData?.title}</h2>
                    <div className="story__info">
                        <p type="button" className="story__owner">
                            {storyData?.anonymous ? 'Anonymous' : storyData?.owner?.fullname}
                        </p>
                        <p className="story__date">{`• ${moment(storyData?.timestamp).format(
                            'MMMM d, YYYY'
                        )}`}</p>
                    </div>
                    <p className="story__desc">{storyData?.story}</p>
                </div>
                <div className="story__spacer"></div>
            </div>
            <div
                className="story__reply"
                style={{
                    width: isReplying ? 'clamp(450px, 40%, 600px)' : '0',
                    opacity: isReplying ? 1 : 0,
                }}
            >
                <h3>Thank you for your kind effort!</h3>
                <textarea
                    value={replyValue}
                    onChange={({ target }) => setReplyValue(target.value)}
                    placeholder="Feel free to write your support right here..."
                    data-gramm_editor={false}
                />
                <div className="story__reply--buttons">
                    <div onClick={classifyToxicity}>Send my support</div>
                    <div onClick={triggerReply}>X</div>
                </div>
            </div>
            <div
                className="story__buttons"
                style={{ transform: isReplying ? 'translateX(300%)' : 'translateX(0)' }}
            >
                <div onClick={triggerReply} className="story__reply--trigger">
                    Write my support
                </div>
                <div className="story__icons">
                    <Heart
                        className="story__icons--item"
                        onClick={() => console.log('THIS IS LIKE ICON')}
                        color="#FFF"
                        strokeWidth={1}
                    />
                    <Share
                        className="story__icons--item"
                        onClick={() => console.log('THIS IS SHARE ICON')}
                        color="#FFF"
                        strokeWidth={1}
                    />
                    <Flag
                        className="story__icons--item"
                        onClick={() => console.log('THIS IS FLAG ICON')}
                        color="#FFF"
                        strokeWidth={1}
                    />
                </div>
            </div>
            {/* <PageShader height="30%" /> */}
        </div>
    );
};

export default Story;
