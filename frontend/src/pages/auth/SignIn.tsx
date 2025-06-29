import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import type { AuthFormData } from '../../types';

export const SignIn : React.FC = () => {
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
            console.log("log From signIn PAge")
          };
          
  return (
    <Layout>
        <div className='flex items-center justify-center p-4 w-full'>
        <div className='w-full max-w-md bg-white rounded-xl shadow-md p-6'>
        <h1 className='text-4xl font-bold text-center text-gray-700 mb-7'>Login!! </h1>
        <form  className='space-y-8 ' onSubmit={handleSubmit}>
            <div>
            <label className='block text-sm font-medium text-gray-500'> 
                    Email
            </label>
            <input value={FormData.email} onChange={handleChange} className='mt-1 block w-full px-4 py-3  rounded-md shadow-md focus:border-gray-800 sm:text-sm mb-5' type='email' name='email' placeholder='Enter Email' required/>

            <label className='block text-sm font-medium text-gray-500'> 
                Password
            </label>
            <input value={FormData.password} onChange={handleChange} className='mt-1 block w-full px-4 py-3  rounded-md shadow-md focus:border-gray-800 sm:text-sm ' type='password' name='password' placeholder='Enter Password' required/>
            </div>
            <button type='submit' className='w-full mb-5 py-4 px-4 bg-green-500 
            hover:bg-green-700 text-white font-bold rounded-md shadow-sm transition duration-100 disabled:bg-green-600 disabled:cursor-not-allowedflex items-center justify-center capitalize'>
                Login
            </button>
        </form>
        <div className='mt-4 text-center'>
          Dont Have Accounct?<br/>
  <Link to='/sign-up' className='text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all duration-300'>
     Sign up for Free
  </Link>
        </div>
        </div>
        </div>
    </Layout>
  )
}
