"use client"
import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useRouter } from 'next/navigation';

const page = ({params}) => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const {search} = params;
    const [foods,setFoods] = useState([])
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/all?searchText=${search}`).then(res => res.json()).then(data =>{
            console.log(data,'search');
            if(data?.result?.result.length){
                setFoods(data?.result?.result)
                setLoading(false)
                console.log(data);
            }
            setLoading(false)
        })
    },[search]);
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className='py-20'>
           {
            foods?.length ? <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-x-2 xl:gap-x-10 md:gap-x-10 gap-x-2 gap-y-20 py-20'>
            {
             foods?.map((p,index) => <div onClick={()=>router.push(`/details/${p?.id}`)} key={index} className='   rounded-md  hover:shadow-xl mx-1 md:px-5  lg:mx-10 py-1 lg:py-10 cursor-pointer'>
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
         </div>: <div className='flex justify-center align-middle items-center'>
            <h1 className='text-red-700 text-center text-3xl uppercase'>Foods does not Match</h1>
         </div>
           }
        </div>
    );
};

export default page;