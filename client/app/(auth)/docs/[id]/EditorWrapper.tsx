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
    const [content, setContent] = useState({ name: '', body: '' });

    useEffect(() => {
        const fetchDoc = async () => {
            const doc = await getDoc(roomName);
            setContent({ name: doc.name, body: doc.body });
        }
        fetchDoc();
    }, [roomName]);

    const { user } = useStoreState((state: any) => state.auth);
    return <Editor roomName={roomName} user={user} initialContent={content} />
}