"use client";

import { useStoreState } from 'easy-peasy'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useStoreState((state: any) => state.auth.isAuth)
    console.log(isAuth);

    if (!isAuth) {
        redirect('/login')
    }

    return children;
}

export default Layout