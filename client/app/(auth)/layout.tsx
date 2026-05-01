"use client";

import { useStoreState } from 'easy-peasy'
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useStoreState((state: any) => state.auth.isAuth)
    const router = useRouter()
    
    useEffect(() => {
        if (!isAuth) {
            router.replace('/login')
        }
    }, [isAuth])

    if(!isAuth) {
        return null;
    }
    return children;
}

export default Layout