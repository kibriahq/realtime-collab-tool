"use client"

import { Check, SquarePen, Trash, X } from "lucide-react";
import AddUser from "./AddUser";
import Avatars from "./ui/Avatars";
import useEditorHeader from "@/hooks/useEditorHeader";
import { DocAuthor, Permission } from "@/lib/types/doc";


function Header({ title, docId, permissions, isAuthor, author }: { title: string, docId: string, permissions: Permission[], isAuthor: boolean, author: DocAuthor }) {
    const {
        isEdit,
        setIsEdit,
        input,
        setInput,
        perms,
        handleUpdateTitle,
        handleDeleteDoc,
        handleRemovePermission,
        handleUpdatePermissions,
    } = useEditorHeader(title, docId, permissions);

    return (
        <div className="flex flex-col min-[450px]:flex-row justify-between items-start">
            <div className="flex items-center gap-2 justify-center">
                <h1 className="text-3xl font-medium mb-2">
                    {isAuthor ? (
                        isEdit === false ? (
                            <span className="flex items-center gap-3">
                                {input}
                                <span onClick={() => setIsEdit(!isEdit)} className="inline text-slate-400 hover:text-slate-500 cursor-pointer"><SquarePen size={20} /></span>
                            </span>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input onChange={(e) => setInput(e.target.value)} type="text" value={input} className="border border-slate-400 rounded w-[200px] sm:w-[300px]" />
                                <button onClick={handleUpdateTitle} className="p-1 bg-gray-500 hover:bg-green-800 text-white rounded cursor-pointer"><Check /></button>
                                <button onClick={() => setIsEdit(!isEdit)} className="p-1 bg-gray-500 hover:bg-red-800 text-white rounded cursor-pointer"><X /></button>
                            </div>
                        )
                    ) : (
                        <span className="flex items-center gap-3">
                            {input}
                        </span>
                    )}

                </h1 >
                {isAuthor && (
                    <button onClick={handleDeleteDoc} className="text-red-300 hover:text-red-400 pb-2 cursor-pointer">
                        <Trash size={20} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Avatars permissions={perms} handleRemovePermission={handleRemovePermission} isAuthor={isAuthor} author={author} />
                {isAuthor && (
                    <AddUser docId={docId} handleUpdatePermissions={handleUpdatePermissions} />
                )}
            </div>
        </div >
    )
}

export default Header