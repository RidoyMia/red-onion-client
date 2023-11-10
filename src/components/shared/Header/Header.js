"use client"
import Link from 'next/link';
import React, { useContext } from 'react';
import logo from "../../images/logo2.png"
import Image from 'next/image';
import { AuthContext } from '../../AuthProver/AuthProvider';




const Header = () => {
  const {user,LogOut} = useContext(AuthContext);

 const logout = ()=>{
  localStorage.removeItem('accesstoken')
  LogOut().then(res => {
    console.log(res);
  }).catch(e=>{
    console.log(e);
  })
 }
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <Link className='link' href="/">Home</Link>
      
      <Link className='link' href="/cart">Cart</Link>
     {
      user? <button className='px-5 py-1 bg-gray-600 text-white' onClick={logout}>LogOut</button> :  <Link className='link' href="/login">Login</Link>
     }
      </ul>
    </div>
    <Image src={logo} alt='logo' height={60} width={200}></Image>
  </div>
  <div className="navbar-end hidden lg:flex md:flex">
    <ul className="menu menu-horizontal px-1">
      <Link className='link' href="/">Home</Link>
      
      <Link className='link' href="/cart">Cart</Link>
     
     {
      user?   <Link className='link' href="/dashboard">Dashboard</Link> : ''
     }

{
      user? <button className='px-3 rounded-md py-1 bg-gray-600 text-white' onClick={logout}>LogOut</button> :  <Link className='link' href="/login">Login</Link>
     }
      
    </ul>
  </div>
  
</div>
        </div>
    );
};

export default Header;