"use client"


import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Services = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [foods,setFoods] = useState([])
    const [selected,setSelected] = useState(1)
    const [category,setCategory] = useState([])
    fetch(`https://red-onion-server-delta.vercel.app/api/v1/category/all`).then(res => res.json()).then(data=>{
        setCategory(data?.result)
    })
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/category/${selected}`).then(res => res.json()).then(data =>{
            setFoods(data?.result)
            console.log(data);
        })
        setLoading(false)
    },[selected]);
    const handleSelect = id =>{
        setLoading(true)
        setSelected(id)
        setLoading(false)
    }
if(loading){
    return <h1>Loading .............</h1>
}
    return (
        <div className='lg:container md:container px-10'>
            <div className='flex justify-center items-center align-middle pt-20'>
               {
                category?.map((p,index) =>  <button key={index} className={`px-2 lg:px-10 md:px-8 text-xl ${selected == index + 1 ? 'underline text-red-600' : ''}`} onClick={()=>handleSelect(index + 1)}>{p?.name}</button>)
               }
                
            </div>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-x-2 xl:gap-x-10 md:gap-x-10 gap-x-2 gap-y-20 py-20'>
                   {
                    foods?.map((p,index) => <div onClick={()=>router.push(`/details/${p?.id}`)} key={index} className='   rounded-md  hover:shadow-xl mx-1 md:px-5  lg:mx-10 py-1 lg:py-10'>
                        <div className='flex justify-center items-center align-middle'>
                            <img src={p?.picture} width={200}></img>
                        </div>
                        <div className=' text-center py-5'>
                            <h1 className='text-md font-semibold'>{p?.name}</h1>
                            <p className='py-2 text-sm'>{p?.descriptions.slice(0,50)}</p>
                            <h1 className='text-2xl font-bold'>${p?.price}</h1>
                        </div>
                    </div>)
                   }
                </div>
            </div>
        </div>
    );
};

export default Services;

