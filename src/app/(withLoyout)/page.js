



import React from 'react';
import Blog from '../../components/Blog/Blog';
import Services from '../../components/Services/Services';
import Banner from '../../components/Banner/Banner';

const page = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <Blog></Blog>
      
    </div>
  );
};

export default page;