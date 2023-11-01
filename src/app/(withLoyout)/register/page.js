import React from 'react';
import logo from "../../../components/images/logo2.png"
import Image from 'next/image';

const page = () => {
    return (
        <div className=''>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3'>
                <div></div>
                <div>
                   <div className='flex justify-center '>
                     <Image src={logo} width={200} alt='logo'></Image>
                   </div>
                   <div>
                     <form>
                        <input type='text' placeholder='Email'></input>
                     </form>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default page;