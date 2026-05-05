'use client'

import { getDoc } from "@/api/doc";
import { Doc } from "@/lib/types/doc";
import dynamic from "next/dynamic";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";

const Editor = dynamic(() => import('@/components/editor/Editor'), {
    ssr: false,
    loading: () => <Loader />,
});

export default function EditorWrapper({ roomName }: { roomName: string }) {
    const [doc, setDoc] = useState<Doc | null>(null);
    const router = useRouter();

    const fetchDoc = async () => {
        try {
            const doc = await getDoc(roomName);
            setDoc(doc);
        } catch (error: any) {
            toast.error(error?.response.data.msg);

            if (error?.response.status === 403) {
                router.push('/')
            } else if (error?.response.status === 404) {
                router.replace(`/404?msg=${error?.response.data.msg}`)
            } else {
                throw new Error(error instanceof Error ? error.message : "Failed to fetch document")
            }
        }
    }

    useEffect(() => {
        fetchDoc();
    }, [roomName]);


    return <Editor roomName={roomName} doc={doc!} />
}