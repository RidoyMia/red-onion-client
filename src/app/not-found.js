import React from 'react';
import img from '../components/images/Na_June_69.jpg';
import Image from 'next/image';

const page = () => {
    return (
        <div>
            <Image src={img} width={1200} height={200} alt='not found'></Image>
        </div>
    );
};

export default page;