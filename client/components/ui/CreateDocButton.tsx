"use client"

import { createDoc } from '@/lib/api/doc';
import handleError from '@/lib/utils/error';
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

const CreateDocButton = () => {
    const router = useRouter();

    const handleCreateDoc = async () => {
        try {
            const d = await createDoc();
            router.push(`/docs/${d.id}`);
            toast.success("Document created successfully");
        } catch (error: unknown) {
            handleError(error);
        }
    }

    return (
        <button
            onClick={handleCreateDoc}
            className="group w-full sm:w-fit flex items-center gap-3 bg-white text-indigo-600 px-5 py-3 rounded-2xl border border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
            <div className="p-2 bg-indigo-600/20 rounded-xl">
                <Plus size={24} />
            </div>
            <span className="text-lg font-semibold">Create New</span>
        </button>
    )
}

export default CreateDocButton