
import React from 'react';
import Details from '../../../../components/Details/Details';

const page = ({params}) => {
    return (
        <div>
           <Details id={params.id}></Details> 
        </div>
    );
};

export default page;