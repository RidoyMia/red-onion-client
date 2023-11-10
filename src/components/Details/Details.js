"use client"
import React, { useContext, useEffect, useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { AuthContext } from '../AuthProver/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Details = ({id}) => {
    const {user} = useContext(AuthContext)
    const router = useRouter()
    const [quantity,setQuantity] = useState(1)
    const [food,setFood] = useState({})
    useEffect(()=>{
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/${id}`).then(res => res.json()).then(data =>{
            console.log(data?.result[0],'from details');
            setFood(data?.result[0])
        })
    },[id]);
    const decrementQuantity = ()=>{
        if(quantity > 1){
            setQuantity(quantity -1)
        }
    }
    const incrementQuantity = ()=>{
        setQuantity(quantity + 1)
    }
    const addToCart = ()=>{
        if(!user){
         toast.error('Please login')
        }
        console.log('ami',{...food});
    }
    const handleOrder = e =>{
        
        e.preventDefault()
        if(!user){
            toast.error('please login')
            return router.push('/login')
        }
        else{
            const form = e.target
        const number = parseInt(form.number.value);
        const address = form.address.value;
        const needQuantity = quantity
        const email = user?.email
       
        const orderData = {
            email,number,address,needQuantity,productId : parseInt(id)
        }
        console.log(orderData,'dddd');
        console.log(orderData,'order');
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/create`,{
            method : 'POST',
            headers : {
                'CONTENT-TYPE' : 'application/json'
            },
            body : JSON.stringify(orderData)
        }).then(res =>res.json()).then(data =>{
            console.log(data,'order');
            if(data?.result){
                toast.success('order press successfully')

               router.push('/cart')
            }
        })
        }
    }
    return (
        <div className='lg:container my-10 px-5'>
            <div className='flex justify-end'>
                <Toaster></Toaster>
            </div>
            <div className='grid lg:container grid-cols-1 lg:grid-cols-2 md:grid-cols-2 md:flex-col-reverse'>
                <div className=' order-2 lg:order-1 md:order-1 py-10 lg:px-20'>
                   <h1 className='text-4xl lg:text-5xl py-2'>{food?.name}</h1>
                   <p className='text-md py-5'>{food?.descriptions?.slice(0,300)}</p>
                   <div className='flex justify-arround items-center align-middle py-5'>
                     <h1 className='text-5xl'>${food?.price * parseInt(quantity)}</h1>
                     <div className='flex justify-start align-middle mx-10 py-2 rounded-3xl border shadow-2xl'>
                        <button className='text-3xl px-5' onClick={decrementQuantity}>-</button>
                        <h1 className='text-3xl px-5'>{quantity}</h1>
                        <button className='text-3xl px-5' onClick={incrementQuantity} >+</button>
                     </div>
                   </div>
                    <button onClick={()=>document.getElementById(id).showModal()}  className={`flex justify-start items-center align-middle  bg-red-600 py-2 px-7 text-white text-lg rounded-full mt-5  `} >
                        <BsCart2></BsCart2>
                        <h1 className='px-2'>addToCart</h1>
                    </button> 
                    
                </div>
                
{/* modal of order */}
                    <dialog id={id} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello  {user?.displayName}</h3>
                        <div className='py-5 px-10'>
                            <form onSubmit={handleOrder}>
                                <input type='email' placeholder='email' value={user?.email} className='w-full py-2 px-5 rounded-md border'></input>
                                <input type='number' placeholder='type your number' name='number' className='w-full my-3 py-2 px-5 rounded-md border'></input>
                                <input type='text' placeholder='type your address' name='address' className='w-full py-2 px-5 rounded-md border'></input>
                               <div className='flex justify-center items-center align-middle'>
                                  <button type='submit' className='bg-red-600 py-1 px-7 my-5 rounded-md text-white'>Confirm</button>
                               </div>
                            </form>
                        </div>
                    </div>
                    </dialog>
{/* modal of order */}                    
                <div className=' order-1 lg:order-2 md:order-2 sm:order-1 lg:px-20'>
                    <div>
                        <img src={food?.picture} className='w-full'></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;