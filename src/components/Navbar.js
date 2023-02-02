import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: 'white' }}>       {/* Hamburger icon color */}
        <div className='Mainnavbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <div className="d-flex justify-content-end align-item-center container">
            <a className="navbar-brand" href="/#">
              <img src="./EduvatePortalLogo.png" height="50" className="d-inline-block" alt="" />
            </a>


            <ul className='navbar-nav d-flex align-item-center mx-4'>
              <li className="list-group-item dropdown">
                <a className="dropdown-toggle" href="/#" data-bs-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                  <img src="./profile.png" width="40" height="40" alt='profile' />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/#">Action</a>
                  <a className="dropdown-item" href="/#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/#">Something else here</a>
                </div>
              </li>
            </ul>


          </div>


        </div>


        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars z-index-1'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
