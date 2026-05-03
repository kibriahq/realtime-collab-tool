"use client"

import { Check, SquarePen, Trash, X } from "lucide-react";
import AddUser from "./AddUser";
import Avatars from "./ui/Avatars";
import { Permission } from "@/app/(auth)/docs/[id]/EditorWrapper";
import useEditorHeader from "@/hooks/useEditorHeader";


function Header({ title, docId, permissions }: { title: string, docId: string, permissions: Permission[] }) {
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
                            <button onClick={handleUpdateTitle} className="p-1 bg-green-700 hover:bg-green-800 text-white rounded cursor-pointer"><Check /></button>
                            <button onClick={() => setIsEdit(!isEdit)} className="p-1 bg-red-700 hover:bg-red-800 text-white rounded cursor-pointer"><X /></button>
                        </div>
                    )
                    }
                </h1 >
                <button onClick={handleDeleteDoc} className="text-red-300 hover:text-red-400 pb-2 cursor-pointer">
                    <Trash size={20} />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <Avatars permissions={perms} handleRemovePermission={handleRemovePermission} />
                <AddUser docId={docId} handleUpdatePermissions={handleUpdatePermissions} />
            </div>
        </div>
    )
}

export default Header