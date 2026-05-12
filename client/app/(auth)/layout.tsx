"use client";

import useCheckAuth from "@/hooks/useCheckAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { rehydrated, isAuth } = useCheckAuth();

    if (!rehydrated) {
        return null;
    }

    if (!isAuth) {
        return null;
    }

    return children;
};

export default Layout;