

"use client"

import React, { useEffect } from 'react';
import {analytics} from "../../../firebase.config"
import Blog from '../../components/Blog/Blog';
import Services from '../../components/Services/Services';
import Banner from '../../components/Banner/Banner';

const page = () => {
  useEffect(() => {
    // Example: Track a page view with Firebase Analytics
    analytics.logEvent('page_view', { page_path: '/' });
  }, []);
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <Blog></Blog>
      
    </div>
  );
};

export default page;