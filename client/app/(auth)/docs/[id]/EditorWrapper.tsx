'use client'

import { useStoreState } from "easy-peasy";
import dynamic from "next/dynamic";
import { getDoc } from "@/api/doc";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import('@/components/editor/Editor'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export default function EditorWrapper({ roomName }: { roomName: string }) {
    const [doc, setDoc] = useState<{ name: string; body: string; permissions: any[] } | null>(null);

    useEffect(() => {
        const fetchDoc = async () => {
            const doc = await getDoc(roomName);
            setDoc(doc);
        }
        fetchDoc();
    }, [roomName]);

    const { user } = useStoreState((state: any) => state.auth);

    if (!doc) return <p>Loading document...</p>;

    return <Editor roomName={roomName} user={user} doc={doc} />
}