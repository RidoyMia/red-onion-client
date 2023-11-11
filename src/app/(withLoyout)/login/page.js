"use client"
import React, { useContext, useState } from 'react';
import logo from "../../../components/images/logo2.png"
import Image from 'next/image';
import Loading from '../../../components/Loading/Loading';
import { updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { AuthContext } from '../../../components/AuthProver/AuthProvider';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { user, loading, createUser, loginUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  console.log(user);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        if (res?.user) {
          setLoading(true);
          fetch(`https://red-onion-server-delta.vercel.app/api/v1/user/${res?.user?.email}`, {
            method: 'POST'
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.action) {
                console.log(data, 'user');
                localStorage.setItem('accesstoken', data?.accesstoken);
                if (data?.result.role === 'admin') {
                  router.push('/dashboard');
                }
                else{
                  router.push('/')
                }
              }
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3'>
        <div></div>
        <div>
          <div className='flex justify-center '>
            <Image src={logo} width={200} alt='logo'></Image>
          </div>
          <div className='px-10 bg-gray-50 py-10 '>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type='email'
                  autoComplete='false'
                  className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md'
                  name='email'
                  placeholder='Email'
                ></input>
                <input
                  type='password'
                  autoComplete='false'
                  className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md'
                  name='password'
                  placeholder='Password'
                ></input>
              </div>

              <button type='submit' className='bg-red-600 w-full text-white py-3 mt-2 rounded-md'>
                Submit
              </button>
              <h1 className='text-red-500 text-center py-3 underline'>
                <Link href='/register'>Are You new? Register</Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
