'use client'

import { removeToken } from '@/utils/token'
import { useStoreActions } from 'easy-peasy'
import { LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Navbar = () => {
    const logout = useStoreActions((state: any) => state.auth.logout);
    const router = useRouter();
    const handleLogout = () => {
        logout();
        removeToken();
        toast.success("Logout successful");
        router.push('/login');
    }
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/">
                    <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Collab Tool
                    </h1>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/profile"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700"
                    >
                        <User size={18} />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>
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