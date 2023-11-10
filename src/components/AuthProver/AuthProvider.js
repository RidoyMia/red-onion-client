"use client"
import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext()
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from '../../../firebase.config';
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider()
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(provider)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
           setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])
    const LogOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const info = {user,setUser,loading,setLoading,createUser,loginUser,googleLogin,LogOut}
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;