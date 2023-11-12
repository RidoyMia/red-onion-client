"use client"
import React, { useEffect, useState } from 'react';
import Loading from '../../../../../components/Loading/Loading';

const page = ({params}) => {
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(true)
    const {id} = params;
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/${id}`).then(res => res.json()).then(data =>{
            console.log(data,'single');
            setProduct(data?.result)
            setLoading(false)
        })
    },[id]);
    if(loading){
        return <Loading></Loading>
    }
    console.log(product,'product');
    return (
        <div className='text-black'>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src={product?.product?.picture} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-2xl font-bold">{product?.product?.name}</h1>
      <p className="py-6">{product?.product?.descriptions?.slice(0,140)}</p>
      <div className='flex justify-start items-center align-middle'>
        <p>Quantity : {product?.needQuantity}</p>
        <p className='pl-10'>Total_Amount : ${parseInt(product?.product?.price) * product?.needQuantity}</p>
      </div>
      <h1 className='pt-10 pb-2 text-xl'>UserInfo</h1>
      <div className='flex justify-start items-center align-middle'>
      <p>Name : {product?.user?.name}</p>
      <p className='pl-10'>Email : {product?.user?.email}</p>
      <p className='pl-5'>Address : {product?.address}</p>
       
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default page;