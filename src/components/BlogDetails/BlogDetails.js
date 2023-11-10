"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const BlogDetails = ({id}) => {
    const [blog,setBlog] = useState({});
    useEffect(()=>{
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/blogs/${id}`).then(res => res.json()).then(data =>{
            console.log(data,'from details');
            setBlog(data?.result)
        })
    },[id])
    return (
        <div className='px-5 md:container xl:container lg:container'>
            <div className='flex justify-center items-center align-middle pt-10 pb-16'>
              <img src={blog?.picture} className='w-full h-80'></img>
            </div>
            <div>
                <h1 className='text-xl font-bold py-2'>{blog?.name}</h1>
                <p>{blog?.descriptions}</p>
            </div>
        </div>
    );
};

export default BlogDetails;