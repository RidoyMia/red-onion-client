"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
const Blog = () => {
    const router = useRouter()
    const [blog,setBlog] = useState([])
    fetch(`https://red-onion-server-delta.vercel.app/api/v1/blogs/all`).then(res => res.json()).then(data =>{
        setBlog(data?.result)
       
    })
    return (
        <div className='xl:container px-5'>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 py-10'>
                <div>
                    <h1 className='text-2xl'>Why Choose Us</h1>
                    <p className='text-sm py-2'>We offer high-quality food crafted by experienced chefs using the freshest ingredients.</p>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-x-5 gap-y-8'>
                {
                    blog?.map((b,index)=><div key={index}>
                        <div className='flex justify-center items-center align-middle'>
                            <img src={b?.picture} className='w-full'></img>
                        </div>
                        <div className=' pl-5 flex justify-start'>
                            <div className='icon-container mx-2 mt-3'>
                                <img className='icon p-1' src={b?.icon}></img>
                            </div>
                            <div>
                                <h1 className='py-2 text-lg'>{b?.name}</h1>
                                <p>{b?.descriptions.slice(0,80)}</p>
                                <button className='text-green-500 font-semibold text-lg' onClick={()=> router.push(`/blog/${b?.id}`)}><div className='flex justify-center items-center align-middle'><h1>See more</h1><BsArrowRight></BsArrowRight></div></button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blog;