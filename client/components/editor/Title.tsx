"use client"

import { ArrowBigLeftDash, Check, Plus, SquarePen, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteDoc, updateDocName } from "../../api/doc";
import { useRouter } from "next/navigation";

function Title({ title, id }: { title: string, id: string }) {
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState(title);

    const router = useRouter();

    const handleSubmit = async () => {
        await updateDocName(id, input);
        setIsEdit(false);
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this document?')) {
            await deleteDoc(id);
            router.push('/');
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 justify-center">
                <h1 className="text-3xl font-medium mb-2">
                    {isEdit === false ? (
                        <span className="flex items-center gap-3">
                            {input}
                            <span onClick={() => setIsEdit(!isEdit)} className="inline text-slate-400 hover:text-slate-500 cursor-pointer"><SquarePen size={20} /></span>
                        </span>
                    ) : (
                        <div className="flex items-center gap-2">
                            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} className="border border-slate-400 rounded" />
                            <button onClick={handleSubmit} className="p-1 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer"><Check /></button>
                            <button onClick={() => setIsEdit(!isEdit)} className="p-1 bg-red-700 hover:bg-red-800 text-white rounded cursor-pointer"><X /></button>
                        </div>
                    )
                    }
                </h1 >
                <button onClick={handleDelete} className="text-red-300 hover:text-red-400 pb-2 cursor-pointer">
                    <Trash size={20} />
                </button>
            </div>

            <div className="flex items-center gap-2">
                {/* User avatar */}
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer">
                    <span className="text-orange-500 font-semibold text-xl">J</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center cursor-pointer">
                    <span className="text-blue-500 font-semibold text-xl">M</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center cursor-pointer">
                    <span className="text-green-500 font-semibold text-xl">K</span>
                </div>

                <div className="relative group">
                    <div className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center cursor-pointer border-dashed border-2 border-slate-400">
                        <span className="text-slate-500 hover:text-slate-600 font-semibold text-xl">
                            <Plus />
                        </span>
                    </div>
                    <div className="absolute top-11 right-0 w-[250px] h-[300px] bg-slate-100 rounded-full z-40 border border-slate-300 p-2 hidden group-hover:flex">
                        <div className="flex flex-col items-center justify-start h-full">
                            <input type="text" className="border border-slate-200 rounded p-2 mt-2" placeholder="Search email..." />

                            <div className="flex flex-col items-center justify-center mt-4 gap-2 w-full px-4">
                                {/* user items */}
                                {/* <div className="flex items-center justify-between gap-2 w-full">
                                    <div className="flex items-start flex-col">
                                        <p className="text-slate-500 font-semibold text-md">John Doe</p>
                                        <p className="text-slate-500 font-body text-sm">john@test.com</p>
                                    </div>
                                    <button className="bg-purple-200 text-purple-500 hover:bg-purple-300 p-1 rounded">
                                        <Plus size={20} />
                                    </button>
                                </div> */}

                                {/* No user found */}
                                <div className="flex items-center justify-center gap-2 w-full">
                                    <p className="text-slate-500 font-semibold text-md">No user found</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title