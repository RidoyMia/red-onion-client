"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const Banner = () => {
  const router = useRouter()
  const searchHandler = e =>{
    e.preventDefault();
    router.push(`/search/${e.target.search.value}`)
    e.target.reset()

  }
    return (
        <div>
            <div className='banner-container'>
      <div className='py-20 lg:py-48 px-10'>
        <h1 className='text-xl pb-5 md:text-2xl lg:4xl xl:text-5xl text-center'>Best food waitting for your belly</h1>
        <div>
          <form onSubmit={searchHandler}>
            <div className='flex justify-center items-center align-middle'>
              <input type='text' name='search' placeholder='search-food' className='w-96 py-2 px-5 outline-none search-input'></input>
              <button className='search-btn py-2 px-10'>Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Banner;