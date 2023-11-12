"use client"
import React, { useContext, useEffect, useState } from 'react';
import logo from "../../../components/images/logo2.png"
import Image from 'next/image';
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useRouter } from 'next/navigation';
import Loading from '../../../components/Loading/Loading';
import { AuthContext } from '../../../components/AuthProver/AuthProvider';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
const page = () => {
  
    const [totalOrder,setTotalOrders] = useState(0)
    const [token,setToken] = useState(null)
    const [totalProduct,setTotalProducts] = useState(0)
    const [loading,setLoading] = useState(true)
    const {user} = useContext(AuthContext)
    const [product,setProduct] = useState([])
    const router = useRouter()
    useEffect(()=>{
        setLoading(true)
        const accesstoken = localStorage.getItem('accesstoken')
        setToken(accesstoken)
           fetch(`https://red-onion-server-delta.vercel.app/api/v1/user/${user?.email}`, {
            method: 'POST'
          }).then(res =>res.json()).then(data =>{
            console.log(data,accesstoken,'from cors');
            if(data?.result?.role !=='admin'){
               
               
               return router.push('/')
                
            }
            else{
              fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/chart/${user?.email}`,{
                headers : {
                    accesstoken 
                }
               }).then(res =>res.json()).then(data =>{
                setProduct(data?.result)
                console.log(data,'products');
            if(data?.result){
              fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/all`).then(res=>res.json()).then(data=>{
                // setTotalOrders(data?.result)
                setTotalProducts(data?.result?.total);
                setLoading(false)
               })
            }
                
               })
            }
          })
          setLoading(false)
    },[user])

 
   fetch(`https://red-onion-server-delta.vercel.app/api/v1/order/all/count`).then(res=>res.json()).then(data=>{
    setTotalOrders(data?.result)
   })
   
   
    if(loading){
        return <Loading></Loading>
    }
   
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-5 gap-y-7'>
                <div className='bg-gray-200 shadow-lg py-12'>
                    <div className='flex justify-center items-center align-middle'>
                        <div>
                            <h1 className='text-center text-black text-3xl mb-2'>{totalOrder}</h1>
                            <h1 className='text-black'>Total-Order</h1>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 shadow-lg py-12'>
                    <div className='flex justify-center items-center align-middle'>
                        <div>
                            <h1 className='text-center text-black text-3xl mb-2'>{totalProduct}</h1>
                            <h1 className='text-black'>Total-Products</h1>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='py-20'>
            <BarChart
      width={1000}
      height={400}
      data={product}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis  dataKey={entry => `${entry['year']} - ${entry['month']} -${entry['day']}`}/>
      <YAxis />
      <Bar dataKey="total_quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {product?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
            </div>
        </div>
    );
};

export default page;