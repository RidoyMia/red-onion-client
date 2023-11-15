"use client"
import { useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import Loading from "../../../../components/Loading/Loading";
import { useRouter } from "next/navigation";
const page = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [orderPage,setOrderPage] = useState(1)
    const [products,setProducts] = useState([])
    const [total ,setTotal] = useState([])
    useEffect(()=>{
        setLoading(true)
        fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/all?page=${orderPage}`).then(res => res.json()).then(data =>{
            setProducts(data?.result?.result)
            const page = Math.ceil(parseInt(data?.result?.total) / 10) ;
            setTotal(page)
            console.log(data);
            setLoading(false)
        })
    },[orderPage])
    let page = []
    for (let i = 0; i < total; i++) {
        page.push(i)
   };
   const deleteted = (id)=>{
    setLoading(true)
    fetch(`https://red-onion-server-delta.vercel.app/api/v1/foods/${id}`,{
        method : 'DELETE'
    }).then(res => res.json()).then(result =>{
        console.log(result);
        if(result?.action){
            const remaining = products?.filter(p => p?.id !==id)
            setProducts(remaining)
            toast.success('iteam deleted successfully')
        }
        else{
            toast.error(`${result?.message}`)
        }
        setLoading(false)
    })
    console.log(id);
   }
   if(loading){
    return <Loading></Loading>
   }
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
        
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
   
      {
        products?.map(o => <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={o?.picture} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{o?.name}</div>
                  <div className="text-sm opacity-50">{o?.category?.name}</div>
                </div>
              </div>
            </td>
            <td>
              
              <span className="badge badge-ghost badge-sm">${parseInt(o?.price)}</span>
            </td>
            
            <th>
              <button className="btn btn-ghost btn-xs" onClick={()=>router.push(`/dashboard/update/${o?.id}`)}>Update</button>
              <button className="btn btn-ghost btn-xs" onClick={()=>deleteted(o?.id)}>Delete</button>
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