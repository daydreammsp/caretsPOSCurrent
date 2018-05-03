import React from 'react';
import { Link } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu'

const Nav = () => (
  <div className="navbar">
    <div>
    <MainMenu></MainMenu>
      {/* <ul>
        <li>
          <Link to="/user">
            Home
          </Link>
        </li>
        <li>
          <Link to="/AddProduct">
           Add Product
          </Link>
        </li>
        <li>
          <Link to="/AddLocation">
           Add Location
          </Link>
        </li> */}
        {/* <li>
          <Link to="/CreateMarketDay">
           Create Market Day
          </Link>
        </li> */}
      {/* </ul> */}
    </div>
  </div>
);

export default Nav;
