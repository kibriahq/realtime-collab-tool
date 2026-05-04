"use client";
import "./Editor.css";
import useEditor from "@/hooks/useEditor";
import { EditorContent } from "@tiptap/react";
import Controls from "./Controls";
import Header from "./Header";


export default function Editor({ roomName }: {roomName: string}) {

    const { editor, provider, doc } = useEditor({ roomName });

    if (!provider || !editor) return <div>Connecting...</div>;

    return (
        <div className="editor-container lg:mx-0 mx-4 mt-5 mb-2">
            <Header title={doc?.name!} docId={roomName} permissions={doc?.permissions!} />
            <Controls editor={editor} />
            <div className="h-[calc(100vh-180px)] overflow-y-auto editor-content-wrapper">
                <EditorContent editor={editor} className="editor-content" />
            </div>
        </div>
    );
}