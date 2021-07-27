import React from 'react';
import { Text } from '..';

import './Modal.scss';

function Modal({ title, description, buttons }) {
  return (
    <div className='modal__wrapper'>
      <div className='modal__container'>
        <Text textSize='md' textColor='#000000'>
          {title}
        </Text>
        {description !== '' && (
          <Text textSize='sm' textColor='#000000'>
            {description}
          </Text>
        )}
        <div className='modal__buttons'>
          {buttons.map((button, index) => (
            <button key={index} onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
