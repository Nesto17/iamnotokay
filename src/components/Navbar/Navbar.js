import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FiBook } from 'react-icons/fi';

import './Navbar.scss';
import * as ROUTE from '../../constants/routes';
import { Text } from '..';
import useScreenSize from '../../hooks/useScreenSize';

function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const screenSize = useScreenSize();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(location);
    return null;
  };

  return (
    <div className='navbar__container'>
      <Link to={ROUTE.HOMEPAGE}>
        <Text textSize='lg' textType='handwriting'>
          {`I am not okay`}
        </Text>
      </Link>
      {location.pathname[1] === ROUTE.STORY[1] && (
        <form className='navbar__searchbar' onSubmit={handleSubmit}>
          <input
            type='text'
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
            placeholder='Search by tag'
          />
        </form>
      )}
      <IconContext.Provider
        value={{ color: 'white', size: '30px', className: 'navbar__profile' }}
      >
        <FiBook />
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
