
import React, { useContext } from 'react';
import logo from "../../components/images/logo2.png"
import Image from 'next/image';
import Link from 'next/link';
import AuthProvider, { AuthContext } from '../../components/AuthProver/AuthProvider';


const dashboardLayout = ({children}) => {
    
  
    
    return (
        <AuthProvider>
           <div>
           <div className='py-2 '>
            <Image src={logo} className='h-16 w-52' alt='logo'></Image>

           <div className='grid grid-cols-3 lg:grid-cols-10  bg-gray-200 text-white'>
              <div className='col-span-0 lg:col-span-1 '>
                 <div className='py-5 ' style={{height : '100vh'}}>
                    <Link className='py-1 my-2 lg:px-5  px-2 bg-gray-50   shadow-lg border text-black font-semibold rounded-md ' href="/dashboard">Dashboard</Link><br></br><br></br>
                    <Link className='py-1 my-2 lg:px-12 px-9  bg-gray-50   shadow-lg border text-black font-semibold rounded-md' href="/cart">Cart</Link><br></br><br></br>
                    <Link className='py-1 my-2 lg:px-5  px-20 bg-gray-50   shadow-lg border text-black font-semibold rounded-md' href="/order">order</Link><br></br><br></br>
                   
                 </div>
              </div>
              <div className=' col-span-2 lg:col-span-9 bg-red-300'>
              {children}
              </div>
            </div> 
        </div>
            </div> 
           
        </AuthProvider>
    );
};

export default dashboardLayout;