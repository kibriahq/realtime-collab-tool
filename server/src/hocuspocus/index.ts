import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import Doc from "../db/repositories/Doc.js";


const hocuspocus = new Server({
    port: 1234,
    async onLoadDocument({ documentName }: { documentName: string }) {
        // load state
        const data = await Doc.selectDocBody(documentName);

        // Guard: skip if null, undefined, or empty buffer
        if (!data || data.length === 0) {
            return null;
        }

        const ydoc = new Y.Doc();
        Y.applyUpdate(ydoc, new Uint8Array(data)); // Buffer → Uint8Array
        return ydoc;
    },

    async onStoreDocument({ documentName, document }: { documentName: string, document: Y.Doc }) {
        // document is Y.Doc instance
        const state = Y.encodeStateAsUpdate(document);

        Doc.updateDocHP(documentName, Buffer.from(state));
    },
});

export default hocuspocus;