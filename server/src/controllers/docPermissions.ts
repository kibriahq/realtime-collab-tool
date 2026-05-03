import type { Request, Response } from 'express';
import { searchUser, addDocPermission, removeDocPermission, getDocPermissions } from "../services/permission.js";

export const userSearch = async (req: Request, res: Response) => {
    try {
        const { search, docId } = req.body;
        const users = await searchUser(search, docId);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addPermission = async (req: Request, res: Response) => {
    try {
        const { docId, userId } = req.body;
        const permission = await addDocPermission(docId, userId);
        res.json(permission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removePermission = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const permission = await removeDocPermission(id);
        res.json(permission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getPermissionsByDocId = async (req: Request, res: Response) => {
    try {
        const { docId } = req.params;
        const permissions = await getDocPermissions(docId as string);
        res.json(permissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}