



import React from 'react';
import Header from '../../components/shared/Header/Header';
import AuthProvider from '../../components/AuthProver/AuthProvider';
import Footer from "../../components/Footer/Footer"

const layout = ({children}) => {
    return (
        <>
           <AuthProvider>
            <Header></Header>
            {children}
           <Footer></Footer>
            </AuthProvider>
        </>
    );
};

export default layout;