import { Trash } from 'lucide-react'
import { useState } from 'react'

const Avatars = ({ permissions, handleRemovePermission }: { permissions: any[], handleRemovePermission: (id: string) => void }) => {
    const [menuOpen, setMenuOpen] = useState<Record<string, boolean>>({});

    const handleMenuOpen = (id: string) => {
        setMenuOpen((prev) => ({
            [id]: !prev[id]
        }));
    }

    return (
        <>
            {
                permissions.map((permission: any) => (
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
                                <button onClick={() => handleRemovePermission(permission.id)} className="bg-red-200 text-red-500 hover:bg-red-300 p-1.5 rounded cursor-pointer">
                                    <Trash size={18} />
                                </button>
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