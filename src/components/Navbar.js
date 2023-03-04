// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link, useHistory } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import './Navbar.css';
// import { IconContext } from 'react-icons';
// import { GoPerson, GoSignOut } from 'react-icons/go';
// import { AuthContext } from './authFolder/AuthContext';
// import { useContext } from 'react';
// import axios from 'axios';

// function Navbar() {
//   const auth = useContext(AuthContext)
//   const redirect = useHistory()
//   const [sidebar, setSidebar] = useState(false);
//   const showSidebar = () => setSidebar(!sidebar);


//   return (
//     <>
//       <IconContext.Provider value={{ color: 'white' }}>       {/* Hamburger icon color */}
//         <div className='Mainnavbar'>
//           <span className='menu-bars'>
//             <FaIcons.FaBars onClick={showSidebar} />
//           </span>

//           <div className="d-flex justify-content-end align-item-center container">
//             <Link to="/Dashboard" className="navbar-brand">
//               <img src="./EduvatePortalLogo.png" height="50" className="d-inline-block" alt="" />
//             </Link>


//             <ul className='navbar-nav d-flex align-item-center mx-4'>
//               <li className="list-group-item dropdown">
//                 <Link className="dropdown-toggle" to="/#" data-bs-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
//                   <img src="./profile.png" width="40" height="40" alt='profile' />
//                 </Link>
//                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <Link className="dropdown-item" to="/profile">{<GoPerson className='mx-2' style={{ color: '#eb4a0a', fontSize: '1.2rem' }} />} Profile </Link>
//                   <span className="dropdown-item" onClick={Logout}>{<GoSignOut className='mx-2' style={{ color: '#eb4a0a', fontSize: '1.2rem' }} />} Logout </span>
//                 </div>
//               </li>
//             </ul>


//           </div>


//         </div>


//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             <li className='navbar-toggle'>
//               <Link to='#' className='menu-bars z-index-1'>
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }
// export default Navbar;









import React, { useContext } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './authFolder/AuthContext';

export default function Sidebar() {
  const auth = useContext(AuthContext);
  const redirect = useNavigate();
  const Logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userDetail');
    axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:8000/logout',
    }).then((res) => {
      auth.updateAuth();
      redirect("/");
    }).catch((error) => {
      console.log(error.response.status)
    })
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#235">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <h1>Eduvate</h1>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/trainer" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">Trainer</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/school" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">School</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/demo" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Testing Pages</CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenuItem><button className='btn text-bg-info' onClick={Logout}>Logout</button></CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};