"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
const page = () => {
    const [category,setCategory] = useState([])
    useEffect(()=>{
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/category/all`).then(res => res.json()).then(data=>{
        setCategory(data?.result)
        console.log(data?.result);
    })
    },[])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const image = data?.image[0]
        const formData = new FormData()
        formData.append('image',image)
        const keyis =`bd0f22832703db189e737da27b90a211`
        const url = `https://api.imgbb.com/1/upload?key=${keyis}`
        fetch(url,{
            method : "POST",
            body : formData
                }).then(res => res.json()).then(data => {
                    console.log(data?.data?.url);
                    if(data?.data?.url){
                        
                    }
                })
    }
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-12 mg:grid-cols-12'>
                <div className='col-span-0 lg:col-span-1 '></div>
                <div className='col-span-0 lg:col-span-10 md:col-span-11  '>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="text-black" >
                            <input type='text' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' {...register("name")} placeholder='Name'></input>
                            <input type='number' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' {...register("price")} placeholder='price'></input>
                            <select className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' {...register("Category")}>
                                {
                                    category?.map(p => <option value={p?.id}>{p?.name}</option>)
                                }
                               
                            </select>

                            <textarea type='text' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' {...register("descriptions")} placeholder='descriptions'></textarea>
                            <input type='file' autoComplete='false' className='w-full py-3 my-3 shadow-inner outline-none bg-gray-300 px-5 rounded-md' {...register("image")} placeholder='confirm-password'></input>
                        </div>
                        <button className="py-2 px-10 bg-red-600 text-white" type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default page;