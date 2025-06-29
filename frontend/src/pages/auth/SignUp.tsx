import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import type { AuthFormData } from './../../types';
import { Link } from 'react-router-dom';

export const SignUp : React.FC = () => {
  const [FormData,setFormData] = useState<AuthFormData>({
    email:"",
    password:"",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value,
    }))
  }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log(FormData.email)

      console.log(FormData.password)
    };
    
  
  return (
    <Layout>
        <div className='flex items-center justify-center p-4 w-full'>
        <div className='w-full max-w-md bg-white rounded-xl shadow-md p-6'>
        <h1 className='text-4xl font-bold text-center text-gray-700 mb-7 capitalize'>JOIN US TODAY </h1>
        <form  className='space-y-8 ' onSubmit={handleSubmit}>
            <div>
            <label className='block text-sm font-medium text-gray-500'> 
                    Email
            </label>
            <input value={FormData.email} className='mt-1 block w-full px-4 py-3  rounded-md shadow-md focus:border-gray-800 sm:text-sm mb-5' type='email' name='email' placeholder='Enter Email' required onChange={handleChange}/>

            <label className='block text-sm font-medium text-gray-500'> 
                Password
            </label>
            <input value={FormData.password}className='mt-1 block w-full px-4 py-3  rounded-md shadow-md focus:border-gray-800 sm:text-sm ' type='password' name='password' placeholder='Enter Password' required onChange={handleChange}/>
            </div>
            <button type='submit' className='w-full py-3 px-4 bg-green-500 
  hover:bg-green-700 text-white font-bold rounded-md shadow-sm 
  transition duration-100 disabled:bg-green-600 disabled:cursor-not-allowed 
  flex items-center justify-center capitalize'>
                signup
            </button>
        </form>
        <div className='mt-4 text-center'>
          Already Have A Account?<br/>
  <Link to='/sign-in' className='text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300'>
     SignIn Here!!
  </Link>
  </div>
        </div>
        </div>
    </Layout>
  )
}
