"use client"
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../components/AuthProver/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import banner from "../../../assets/hungry-handsome-man-holds-hamburger-his-hand-yellow-background.jpg"
import Link from 'next/link';
import Order from "../../../components/Order/Order"


const page = () => {
    const {user,LogOut} = useContext(AuthContext)
    const[orders,setOrders] = useState([])
    const router = useRouter()
   const [accesstoken,setAccesstoken] = useState(null)
  
    useEffect(()=>{
        const token = localStorage.getItem('accesstoken')
        
        if(!token){
           router.push('/login')
        }
        else{
            console.log('ami');
            fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/user/${user?.email}`,{
                method : 'GET',
                headers : {
                    accesstoken : token
                }
            }).then(res => res.json()).then(data =>{
                if(data?.message){
                    localStorage.removeItem('accesstoken')
                    LogOut().then(res => {
                        console.log(res);
                    }).catch(e=>{
                        console.log(e);
                    
                    })
                }
                else{
                    setOrders(data?.result)
                    
                    toast.success('order getting successfully')
                }
            })
        }
       
    },[user]);
    console.log(accesstoken);
   console.log(accesstoken,'hmm');
    
  
   
    return (
        <div>
            <Toaster></Toaster>
            <div className='order-banner-container flex justify-center items-center align-middle py-16 lg:py-44'>
            <div className="text-sm breadcrumbs">
               <ul>
    <li>
      <Link href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </Link>
    </li> 
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Cart
      </a>
    </li> 
    
               </ul>
             </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-y-16 my-20'>
                
                {
                   orders?.map(o =><Order key={o?._id} order={o}></Order> )
                }
         </div>
        </div>
    );
};

export default page;