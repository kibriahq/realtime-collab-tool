'use client'

import { useStoreState } from "easy-peasy";
import dynamic from "next/dynamic";
import { getDoc } from "@/api/doc";
import { useEffect, useState } from "react";
import { Store } from "@/store";

const Editor = dynamic(() => import('@/components/editor/Editor'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export type Permission = {
    id: string | number,
    user_id: string | number;
    name: string,
    email: string,
    role: string
}

type Doc = {
    id: string;
    name: string;
    body: string;
    permissions: Permission[];
    user_id: string | number;
    created_at: string;
    updated_at: string;
}

export default function EditorWrapper({ roomName }: { roomName: string }) {
    const [doc, setDoc] = useState<Doc | null>(null);

    useEffect(() => {
        const fetchDoc = async () => {
            const doc = await getDoc(roomName);
            setDoc(doc);
        }
        fetchDoc();
    }, [roomName]);

    const { user } = useStoreState((state: Store) => state.auth);

    if (!doc) return <p>Loading document...</p>;

    return <Editor roomName={roomName} user={{ ...user, name: user.name }} doc={doc} />
}