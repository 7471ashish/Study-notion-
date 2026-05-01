import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { matchPath } from 'react-router-dom';
const SideBarLink = ({link,iconName}) => {
   const Icon = Icons[iconName] || Icons.VscCircle;
    const location=useLocation();
    const dispatch=useDispatch();
    console.log(iconName, Icons[iconName]);

    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <div>
      <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-400":"bg-opacity-0"}`}
      >
        <span className={`absolute left-0 top-0 h-full w-0.2rem bg-yellow-300 
          ${matchRoute(link.path)?"opacity-100":"opacity-0"}
          `}>
        </span>


        <div className='flex items-center gap-x-2'>
          <Icon className='text-lg'></Icon>
          <span>{link.name}</span>

        </div>
      </NavLink>
    </div>
  )
}

export default SideBarLink
