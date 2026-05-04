import { deleteDoc, updateDocName } from "@/api/doc";
import { getAllPermissions, removePermission } from "@/api/docPermission";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Permission } from "@/hooks/useEditor";

const useEditorHeader = (title: string, docId: string, permissions: Permission[]) => {
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState(title);
    const [perms, setPerms] = useState(permissions);
    
    const router = useRouter();

    const handleUpdateTitle = async () => {
        await updateDocName(docId, input);
        setIsEdit(false);
    }

    const handleDeleteDoc = async () => {
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

    return {
        isEdit,
        setIsEdit,
        input,
        setInput,
        perms,
        title,
        docId,
        permissions,
        handleUpdateTitle,
        handleDeleteDoc,
        handleRemovePermission,
        handleUpdatePermissions,
    }
}

export default useEditorHeader