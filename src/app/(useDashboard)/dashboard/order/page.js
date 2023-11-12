"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const router = useRouter()
    const [orders,setOrder] = useState([]);
    const [orderPage,setOrderPage] = useState(1)
    const [total ,setTotal] = useState([])
    useEffect(()=>{
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/all?page=${orderPage}`).then(res => res.json()).then(data =>{
            setOrder(data?.result?.result);
            console.log(data,'original');
            const page = Math.ceil(parseInt(data?.result?.total) / 10) ;
            setTotal(page)
            console.log(page,'page');
            
            
        })
    },[orderPage])
    let page = []
    for (let i = 0; i < total; i++) {
        page.push(i)
   }
    console.log(page,'total');
    return (
        <div>
            <div className="overflow-x-auto text-black">
  <table className="table">
 
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Total</th>
        <th>Quantity</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
   
      {
        orders?.map(o => <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={o?.product?.picture} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{o?.product?.name}</div>
                  <div className="text-sm opacity-50">{o?.product?.category?.name}</div>
                </div>
              </div>
            </td>
            <td>
              
              <span className="badge badge-ghost badge-sm">${parseInt(o?.product?.price) * o?.needQuantity}</span>
            </td>
            <td>{o?.needQuantity}</td>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={()=>router.push(`/dashboard/details/${o?.id}`)}>details</button>
            </th>
          </tr>)
      }
     
     
    </tbody>
    
    
    
  </table>
             </div>
             <div className='flex justify-center items-center align-middle'>
                <h1>Hridoy</h1>
                {
                page?.map((p,index) => <button onClick={()=> setOrderPage(p + 1)} className={`py-1 px-2 mx-1 bg-blue-800 text-black ${orderPage  == p + 1 ? 'text-white' : ''}`} key={index}>{p + 1}</button>)
             }
             </div>


             
        </div>
    );
};

export default page;