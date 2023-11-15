"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../../../../../components/Loading/Loading";
const page = ({params}) => {
    const {id} = params
    const router = useRouter()
    const [category,setCategory] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/category/all`).then(res => res.json()).then(data=>{
        setCategory(data?.result)
        console.log(data?.result);
        setLoading(false)
    })
    },[])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        setLoading(true)
        const image = data?.image[0]
        const formData = new FormData()
        formData.append('image',image)
        const keyis =`bd0f22832703db189e737da27b90a211`
        const url = `https://api.imgbb.com/1/upload?key=${keyis}`
        fetch(url,{
            method : "POST",
            body : formData
                }).then(res => res.json()).then(result => {
                    console.log(result?.data?.url);
                    if(result?.data?.url){
                        const iteamData = {
                            categoryID : parseInt(data?.Category),
                            name : data?.name,
                            descriptions : data?.descriptions,
                            picture :result?.data?.url,
                            price : parseInt(data?.price),
                            

                        }
                        fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/${id}`,{
                            method : 'PATCH',
                            headers : {
                                'CONTENT-TYPE' : 'application/json'
                            },
                            body : JSON.stringify(iteamData)
                        }).then(res => res.json()).then(data =>{
                            console.log(data,'insertData');
                            if(data?.action){
                                toast.success('Iteam updated completed')
                                router.push('/dashboard/product')
                            }
                            if(data?.message){
                                toast.error(`${data?.message}`)
                            }
                        })
                        console.log(iteamData);
                       setLoading(false) 
                    }
                    else{
                        toast.error('something went wrong')
                    }
                })
    }
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-12 mg:grid-cols-12'>
                <Toaster></Toaster>
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
                        <button className="py-2 px-10 bg-red-600 text-white rounded-lg mt-6" type="submit">Add-iteam</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default page;