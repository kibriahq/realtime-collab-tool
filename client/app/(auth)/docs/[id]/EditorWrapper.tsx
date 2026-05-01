'use client'

import { useStoreState } from "easy-peasy";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/editor/Editor'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export default function EditorWrapper({ roomName }: { roomName: string }) {
    const { user } = useStoreState((state: any) => state.auth);
    return <Editor roomName={roomName} user={user} />
}