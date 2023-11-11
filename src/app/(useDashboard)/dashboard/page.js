"use client"
import React, { useContext, useEffect, useState } from 'react';
import logo from "../../../components/images/logo2.png"
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../components/AuthProver/AuthProvider';


const page = () => {
    const [loading,setLoading] = useState(true)
    const {user} = useContext(AuthContext)
    const router = useRouter()
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/user/${user?.email}`, {
            method: 'POST'
          }).then(res =>res.json()).then(data =>{
           
            if(data?.result?.role !=='admin'){
               
                console.log(data,'from dsa ');
               return router.push('/')
                
            }
            else{
                console.log(data,'from dashboard');
            }
          })
          setLoading(false)
    },[user])
    if(loading){
        return <Loading></Loading>
    }
 
    return (
        <div>
            <h1>Hridoy</h1>
        </div>
    );
};

export default page;