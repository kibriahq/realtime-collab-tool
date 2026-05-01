import type { Response } from "express"
import { createDoc, getDocsByUser } from "../services/doc.js";
import type { AuthRequest } from "../middlewares/auth.js";

export const myDocs = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const docs = await getDocsByUser(userId.toString());
    return res.status(200).json(docs);
}

export const create = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    let name = 'New Document';

    if(req.body) {
        const { name:docName } = req.body as { name?: string };
        name = docName as string;
    }

    const doc = await createDoc(name, '', userId);

    return res.status(201).json(doc);
}