"use client"
import React from 'react';
import AuthProvider from '../AuthProver/AuthProvider';

const wrapProvider = ({children}) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default wrapProvider;