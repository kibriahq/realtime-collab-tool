import Doc from "../db/repositories/Doc.js";
import Permission from "../db/repositories/Permission.js";

export const getDocsByUser = async (userId: string) => {
    const docs = await Doc.findByUserId(userId);
    return docs;
}

export const getDocsByPermission = async (userId: string) => {
    const docs = await Permission.findByUserId(userId);
    return docs;
}

export const createDoc = async (name?: string, body?: string, userId?: string | number) => {

    const doc = await Doc.create(name??'New Document', body, userId || '');

    return doc;
}

export const updateDoc = async (id: string, name?: string) => {
    const doc = await Doc.update(id, name??'');
    return doc;
}

export const getDocById = async (id: string) => {
    const doc = await Doc.findById(id);
    const permissions = await Permission.getPermissions(id);
    
    return { ...doc, permissions };
}

export const deleteDocById = async (id: string) => {
    const doc = await Doc.delete(id);
    return doc;
}