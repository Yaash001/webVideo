import React, { useState } from 'react'
import { SideBar } from '../../components/SideBar'

export const UserProfile:React.FC = () => {
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [edit,setEdit] = useState<boolean>(false);
   return (
    <div className='flex w-full pr-2 h-screen'>
        <SideBar/>
        <main className='flex-1 ml-5 lg:ml-7 pr-2 z-10'>
            <section className='p-4 bg-white shadow-md rounded-lg w-full border border-black mt-7'>
                <h1 className='text-center font-bold text-xl text-gray-800 mb-6'>USER DETAILS</h1>
                <div className='container flex flex-col gap-4'>

                    <div className='flex items-center'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="name" className='font-medium text-gray-400'>
                                Name
                            </label>
                            <div className='relative'>
                                <input type="text" name='name' placeholder='Enter Your Name' value={name} disabled={!edit}
                                onChange={(e) => setName(e.target.value)}className={`w-full p-3 border rounded-md ${edit ? "border-green-500":"border-gray-600"} focus:ring-2 focus:ring-blue-50 bg-gray`}/>
                            </div>
                            
                        </div>
                    </div>

                    
                    <div className='flex items-center'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="email" className='font-medium text-gray-400'>
                                Name
                            </label>
                            <div className='relative'>
                                <input type="text" name='email' placeholder='Enter Your Email' value={email} disabled={!edit}
                                onChange={(e) => setEmail(e.target.value)}className={`w-full p-3 border rounded-md ${edit ? "border-green-500":"border-gray-600"} focus:ring-2 focus:ring-blue-50 bg-gray`}/>
                            </div>
                        </div>
                    </div>
                    <div 
                    onClick={()=>setEdit(!edit)}
                    className='flex justify-end'><button type='button' className='bg-blue-400 text-white py-3 px-4 rounded-sm hover:bg-blue-700'>
                        {edit ? "Save" : "Edit Profile "} 
                        </button></div>
                </div>
            </section>
        </main>
    </div>
  )
}
