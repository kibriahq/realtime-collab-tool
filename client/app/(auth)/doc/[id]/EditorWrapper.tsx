'use client'

import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/editor/Editor'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export default function EditorWrapper({ roomName, user }: { roomName: string, user: { name: string, color: string } }) {
    return <Editor roomName={roomName} user={user} />
}