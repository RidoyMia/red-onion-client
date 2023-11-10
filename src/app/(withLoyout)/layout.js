



import React from 'react';
import Header from '../../components/shared/Header/Header';
import AuthProvider from '../../components/AuthProver/AuthProvider';

const layout = ({children}) => {
    return (
        <>
           <AuthProvider>
            <Header></Header>
            {children}
            </AuthProvider>
        </>
    );
};

export default layout;