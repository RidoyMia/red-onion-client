import React, { createContext, useState } from 'react';
export const AuthContext = createContext()

const AuthProvider = () => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;