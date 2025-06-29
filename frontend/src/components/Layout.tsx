import React, { type ReactNode } from 'react'
import { FaGithubSquare,FaLinkedin,FaInstagramSquare   } from "react-icons/fa";
import { Link } from 'react-router-dom';

interface LProps{
  children : ReactNode;
}
export const Layout : React.FC<LProps>= ({ children }) => {
  return (
    <div className='min-h-screen bg-bgTwo flex flex-col'>
      <nav className='flex items-center bg-bgFive p-4 justify-end md:text-lg border-b-black border-b-[1px] fixed top-0 z-50 w-full text-white'>
        <div className=' flex items-center gap-4 md:gap-5 lg:gap-7 capitalize'>
          <Link to={"/"}>Home</Link>
          <Link to={"/all-videos"}>videos</Link>
          <Link to={"/sign-in"}>signIn</Link>
        </div>
      </nav>
      <main className='flex-1 flwx flex-col items-center w-full mt-16'>
        {children}
      </main>
      <footer className='bg-black text-center py-6 border-t-[1px] border-t-black z-40'>
        <div className='flex justify-center gap-6 mb-4 text-white'>
          <a href='https://github.com/Yaash001' target='_blank' rel='noopener noreferrer' aria-label='GITHUB' ><FaGithubSquare size={20} /></a>
          <a href='https://www.linkedin.com/in/yash-lahane-8a25a82a9/'  target='_blank' rel='noopener noreferrer' aria-label='LINKEDIN'><FaLinkedin size={20}/></a>
          <a href='https://www.instagram.com/yaash_201'  target='_blank' rel='noopener noreferrer' aria-label='INSTAGRAM'><FaInstagramSquare size={20}/></a>
        </div>
              <p className='text-sm text-gray-200 mb-2'>
        Sharing VIdeo To World
      </p>
      <p className='text-sm text-gray-200 mb-2'> &copy;2025</p>

      </footer>
    </div>
  )
}
