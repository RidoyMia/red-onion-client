"use client"
import React, { useContext } from 'react';
import logo from "../../../components/images/logo2.png"
import Image from 'next/image';

import { updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { AuthContext } from '../../../components/AuthProver/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const {user,loading,createUser} = useContext(AuthContext);
 
  const handleSubmit = (e)=>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    if(password !=confirm){
      alert('password does not match')
    }else{
     createUser(email,password).then(res => {
     
      if(res?.user){
        updateProfile(res.user, {
           displayName:name, photoURL:"/"
         }).then(() => {
           
           const userData = {
            name : res?.user?.displayName,
            email : res?.user?.email,
            role : 'user'
           }
           fetch(`https://red-onion-server-15q1er7lp-ridoymia.vercel.app/api/v1/user/create`,{
            method : 'POST',
            headers : {
              'CONTENT-TYPE' : 'application/json'
            },
            body : JSON.stringify(userData)
           }).then(res =>{
              if(res?.ok){
                toast.success('user registration successfully')
                router.push('/')
              }
           }).catch(e =>{
            console.log(e);
           })
         }).catch((error) => {
           
         });
     }
     }).catch(e=>{
      console.log(e);
     })
    }
    form.reset()
  }
    return (
        <div className=''>
          <Toaster></Toaster>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3'>
                <div></div>
                <div>
                   <div className='flex justify-center '>
                     <Image src={logo} width={200} alt='logo'></Image>
                   </div>
                   <div className='px-10 bg-gray-50 py-10 '>
                     <form onSubmit={handleSubmit}>
                        <div >
                           <input type='text' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' name='name' placeholder='Name'></input>
                           <input type='email' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' name='email' placeholder='Email'></input>
                           <input type='password' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' name='password' placeholder='Password'></input>
                           <input type='password' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' name='confirm' placeholder='confirm-password'></input>
                        </div>

                        <button type='submit' className='bg-red-600 w-full text-white py-3 mt-2 rounded-md'>Submit</button>
                        <h1 className='text-red-500 text-center py-3 underline'><Link href="/login">Have your account? Login</Link></h1>
                     </form>
                   </div>
                </div>
               
      
            </div>
        </div>
    );
};

export default page;