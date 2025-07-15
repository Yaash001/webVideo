import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
//import type { Dispatch } from '../reducer/store';
import { IoMdHome } from 'react-icons/io';
import { BiSolidVideos } from 'react-icons/bi';
import { MdFileUpload } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { FaBarsStaggered } from 'react-icons/fa6';
import { IoLogOutSharp, IoClose } from 'react-icons/io5';
import { PiFinnTheHumanFill } from 'react-icons/pi';
import { toast } from 'sonner';

export const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
//  const dispatch = useDispatch<Dispatch>();

  const toggleSide = () => {
    setIsOpen(prev => !prev);
  };

const handleLogout = () => {
  toast.success("User logged out");
  localStorage.clear();
  setTimeout(() => {
    navigate("/sign-in");
  }, 1 );
};

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen 
          bg-black text-white 
          lg:bg-slate-200 lg:text-gray-800 
          transition-all duration-200 ease-in-out 
          shadow-md 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static`}
      >
        <div className='p-4 text-2xl font-bold border-b border-gray-400 hidden md:block'>
          webVideo
        </div>

        <nav className='mt-7 md:mt-5'>
          <ul className='space-y-2'>

            <li>
              <NavLink
                to={"/"}
                onClick={toggleSide}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm"
              >
                <IoMdHome size={20} className='mr-3' />
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/user-profile"}
                onClick={toggleSide}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm"
              >
                <RiDashboardFill size={20} className='mr-3' />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/user/videos"}
                onClick={toggleSide}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm"
              >
                <BiSolidVideos size={20} className='mr-3' />
                <span>My Videos</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/user/upload"}
                onClick={toggleSide}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm"
              >
                <MdFileUpload size={20} className='mr-3' />
                <span>Upload</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/user-profile"}
                onClick={toggleSide}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm"
              >
                <PiFinnTheHumanFill size={20} className='mr-3' />
                <span>Profile</span>
              </NavLink>
            </li>

            <li>
              <div
                onClick={handleLogout}
                className="flex items-center p-3 hover:bg-slate-400 hover:text-gray-800 rounded-sm cursor-pointer"
              >
                <IoLogOutSharp size={20} className='mr-3' />
                <span>Logout</span>
              </div>
            </li>

          </ul>
        </nav>
      </div>

      {/* Top Navbar for Mobile */}
      <div className='fixed top-0 left-0 right-0 bg-black lg:hidden text-white h-12 flex items-center px-4 shadow-md z-40'>
        <button onClick={toggleSide} className='text-white text-2xl'>
          {isOpen ? <IoClose /> : <FaBarsStaggered />}
        </button>
        <div className='w-full flex items-center justify-center'>
          <NavLink to={"/"} className='text-md font-bold'>
            webVideo
          </NavLink>
        </div>
      </div>
    </>
  );
};
