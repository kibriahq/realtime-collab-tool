"use client"

import { Check, SquarePen, Trash, X } from "lucide-react";
import { useState } from "react";
import { deleteDoc, updateDocName } from "../../api/doc";
import { useRouter } from "next/navigation";
import AddUser from "./AddUser";
import Avatars from "./ui/Avatars";
import { getAllPermissions, removePermission } from "@/api/docPermission";

function Title({ title, docId, permissions }: { title: string, docId: string, permissions: any[] }) {
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState(title);
    const [perms, setPerms] = useState(permissions);
    
    const router = useRouter();

    const handleSubmit = async () => {
        await updateDocName(docId, input);
        setIsEdit(false);
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this document?')) {
            await deleteDoc(docId);
            router.push('/');
        }
    }

    const handleRemovePermission = async (id: string,) => {
        if (confirm("Are you sure you want to remove this permission?")) {
            await removePermission(id);
            setPerms(perms.filter((p: any) => p.id !== id));
        }
    }

    const handleUpdatePermissions = async () => {
        setPerms(await getAllPermissions(docId));
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
                <Avatars permissions={perms} handleRemovePermission={handleRemovePermission} />
                <AddUser docId={docId} handleUpdatePermissions={handleUpdatePermissions} />
            </div>
        </div>
    )
}

export default Title