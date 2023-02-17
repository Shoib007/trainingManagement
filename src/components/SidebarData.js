import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Trainer Detail',
    path: '/trainer',
    icon: <AiIcons.AiOutlineDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'School Details',
    path: '/school',
    icon: <IoIcons.IoMdBook />,
    cName: 'nav-text'
  },
  {
    title: 'Testing',
    path: '/demo',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
