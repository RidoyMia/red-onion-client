import React, { useContext } from 'react';
import dashboardLayout from "../../app/(useDashboard)/layout/dashboardLayout"
import AuthProvider, { AuthContext } from '../AuthProver/AuthProvider';

const DashboardProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    console.log(user,'form providerrrrrrrr');
    return (
        <AuthProvider>
           
            <dashboardLayout>
                {children}
                
            </dashboardLayout>
        </AuthProvider>
    );
};

export default DashboardProvider;