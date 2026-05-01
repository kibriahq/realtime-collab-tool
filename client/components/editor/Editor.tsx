"use client";
import "./Editor.css";
import { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import Controls from "./Controls";
import Title from "./Title";

type Props = {
    roomName: string;
    user: { name: string; color: string };
};

export default function Editor({ roomName, user }: Props) {
    const ydoc = useMemo(() => new Y.Doc(), []);
    const [provider, setProvider] = useState<HocuspocusProvider | null>(null);

    useEffect(() => {
        const hocusProvider = new HocuspocusProvider({
            url: "ws://localhost:1234",
            name: roomName,
            document: ydoc,
            onSynced() {
                // awareness is guaranteed to be ready after synced
                setProvider(hocusProvider);
            },
        });

        return () => {
            setProvider(null);
            hocusProvider.destroy();
        };
    }, [roomName, ydoc]);

    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Collaboration.configure({ document: ydoc }),
                ...(provider
                    ? [
                        CollaborationCursor.configure({
                            provider,
                            user: {
                                name: user.name,
                                color: user.color,
                            },
                        }),
                    ]
                    : []),
                Highlight.configure({ multicolor: true }),
                TaskItem.configure({ nested: true }),
                TaskList,
                Table.configure({ resizable: true }),
                TableRow,
                TableCell,
                TableHeader,
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Underline,
                Color,
                TextStyle,
                Link.configure({ openOnClick: false }),
                Image,
            ],
            content: "",
            immediatelyRender: false,
        },
        [provider]
    );

    if (!provider || !editor) return <div>Connecting...</div>;

    return (
        <div className="editor-container lg:mx-0 mx-4 mt-5 mb-2">
            <Title title={"New Document"} />
            <Controls editor={editor} />
            {/* <div className="h-[calc(100vh-180px)] overflow-y-auto editor-content-wrapper"> */}
            <div className="h-[calc(100vh-180px)] overflow-y-auto editor-content-wrapper">
                <EditorContent editor={editor} className="editor-content" />
            </div>
        </div>
    );
}