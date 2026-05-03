"use client";

import { Store } from "@/store";
import { isTokenExpired } from "@/utils/auth";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isAuth, token } = useStoreState((state: Store) => state.auth);
    const { logout } = useStoreActions((state: any) => state.auth);
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (!isAuth || isTokenExpired(token!)) {
            logout();
            router.replace("/login");
        } else {
            setChecked(true);
        }
    }, [isAuth, token, router]);

    if (!checked) {
        return null;
    }

    return children;
};

export default Layout;
