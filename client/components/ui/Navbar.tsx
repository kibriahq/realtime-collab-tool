'use client'

import { removeToken } from '@/utils/token'
import { useStoreActions } from 'easy-peasy'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const logout = useStoreActions((state: any) => state.auth.logout);
    const router = useRouter();
    const handleLogout = () => {
        logout();
        removeToken();
        router.push('/login');
    }
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Collab Tool
                </h1>
                <nav className="flex items-center gap-4">
                    <button onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar