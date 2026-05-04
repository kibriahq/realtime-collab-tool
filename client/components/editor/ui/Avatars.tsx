import { DocAuthor } from '@/lib/types/doc';
import { Trash } from 'lucide-react'
import { useState } from 'react'

const Avatars = ({ permissions, handleRemovePermission, isAuthor, author }: { permissions: any[], handleRemovePermission: (id: string) => void, isAuthor: boolean, author: DocAuthor }) => {
    const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({});

    const handleMenuOpen = (id: string | number) => {
        setMenuOpen((prev) => ({
            [id]: !prev[id]
        }));
    }

    return (
        <>
            {!isAuthor && (
                <div className="relative">
                    <div onClick={() => handleMenuOpen(author.id)} className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer">
                        <span className="text-orange-500 font-semibold text-xl">{author.name.charAt(0)}</span>
                    </div>

                    {menuOpen[author.id] && (
                        <div className="flex items-center justify-between gap-2 absolute bg-slate-200 border-slate-500 z-40 top-11 -right-10 h-[70px] rounded p-2 px-3">
                            <div className="flex items-start flex-col">
                                <p className="text-slate-500 font-semibold text-md">{author.name}</p>
                                <span className="text-slate-500 font-body text-xs inline-block">(Owner)</span>
                                <p className="text-slate-500 font-body text-sm">{author.email}</p>
                            </div>
                        </div>
                    )}
                </div>)}

            {permissions.map((permission: any) => (
                <div key={permission.id} className="relative">
                    <div onClick={() => handleMenuOpen(permission.id)} className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer">
                        <span className="text-orange-500 font-semibold text-xl">{permission.name.charAt(0)}</span>
                    </div>

                    {menuOpen[permission.id] && (
                        <div className="flex items-center justify-between gap-2 absolute bg-slate-200 border-slate-500 z-40 top-11 -right-10 h-[50px] rounded p-2 px-3">
                            <div className="flex items-start flex-col">
                                <p className="text-slate-500 font-semibold text-md">{permission.name}</p>
                                <p className="text-slate-500 font-body text-sm">{permission.email}</p>
                            </div>
                            {isAuthor && (
                                <button onClick={() => handleRemovePermission(permission.id)} className="bg-red-200 text-red-500 hover:bg-red-300 p-1.5 rounded cursor-pointer">
                                    <Trash size={18} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))
            }
        </>
    )
}
{/* <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer">
            <span className="text-orange-500 font-semibold text-xl">J</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center cursor-pointer">
            <span className="text-blue-500 font-semibold text-xl">M</span>
        </div> 
        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center cursor-pointer">
            <span className="text-green-500 font-semibold text-xl">K</span>
        </div>
        */}

export default Avatars