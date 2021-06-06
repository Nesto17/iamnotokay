import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';

import * as ROUTE from '../../constants/routes';


function Navbar() {
  const location = useLocation();

  return (
    <div className='navbar__container'>
      <Link to={ROUTE.HOMEPAGE}>
        <div className='navbar__logo'></div>
      </Link>

    </div>
  );
}

export default Navbar;
