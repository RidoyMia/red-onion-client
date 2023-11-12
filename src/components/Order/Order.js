import React, { useState } from 'react';
import Loading from  "../../components/Loading/Loading"

const Order = ({order}) => {
    const[loading,setLoading] = useState(false)
    const handleSubmit = ()=>{
        setLoading(true)
      
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/${order?.id}`,{
            method : 'PATCH',
            headers : {
                'CONTENT-TYPE' : 'application/json'
            }
        }).then(res => res.json()).then(data =>{
            setLoading(false)
            
        })
        setLoading(false)
    }
    if(loading){
        
        return <Loading></Loading>
    }
    return (
        <div className='grid grid-cols-3 gap-x-5 px-2 lg:px-10 md:px-10 border rounded-md shadow-xl py-5 px-5 '>
           <div className=''>
             <img src={order?.product.picture} className='h-48 w-48'></img>
           </div>
           <div className='col-span-2'>
               <h1 className='text-xl py-2 font-semibold'>{order?.product.name}</h1>
               <p>{order?.product?.descriptions.slice(0,130)}</p>
               <p>Quantity : {order?.needQuantity} </p>
               <p>Price : ${parseInt(order?.needQuantity) * order?.product.price}</p>
               {
                order?.payment===false? <button className='py-2 px-10 bg-yellow-500 rounded-md text-white font-semibold my-5' onClick={handleSubmit}>Payment</button> : <button className='py-2 px-10 bg-yellow-500 rounded-md text-white font-semibold my-5'>Completed</button>
               }
           </div>
        </div>
    );
};

export default Order;