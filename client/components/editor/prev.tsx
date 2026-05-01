"use client";
import "./Editor.css";
import { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
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
import { WebsocketProvider } from "y-websocket";
import Controls from "./Controls";
import Title from "./Title";

type Props = {
    roomName: string;
    user: { name: string; color: string };
};

export default function Editor({ roomName, user }: Props) {
    const { ydoc, provider } = useMemo(() => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(
            "ws://localhost:1234",
            roomName,
            ydoc
        );
        return { ydoc, provider };
    }, [roomName]);

    useEffect(() => {
        return () => {
            provider.destroy();
            ydoc.destroy();
        };
    }, [provider, ydoc]);

    const editor = useEditor(
        {
            extensions: [
                StarterKit,
                Collaboration.configure({
                    document: ydoc,
                }),
                // CollaborationCursor.configure({
                //     provider,
                //     user: {
                //         name: user?.name || "Anonymous",
                //         color: user?.color || "#f783ac",
                //     },
                // }),
                Highlight.configure({ multicolor: true }),
                TaskList,
                TaskItem.configure({ nested: true }),
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
        [ydoc, provider]
    );

    if (!editor) return null;

    return (
        <div className="editor-container lg:mx-0 mx-4 mt-5 mb-2">
            <Title title={"New Document"} />
            <Controls editor={editor} />
            <div className="h-[calc(100vh-180px)] overflow-y-auto editor-content-wrapper">
                <EditorContent editor={editor} className="editor-content" />
            </div>
        </div>
    );
}