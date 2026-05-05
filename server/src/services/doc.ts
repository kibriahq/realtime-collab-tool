import Doc from "../db/repositories/Doc.js";
import Permission from "../db/repositories/Permission.js";
import User from "../db/repositories/User.js";
import error from "../utils/error.js";

export const getDocsByUser = async (userId: string) => {
    const docs = await Doc.findByUserId(userId);
    return docs;
}

export const getDocsByPermission = async (userId: string) => {
    const docs = await Permission.findByUserId(userId);
    return docs;
}

export const createDoc = async (name?: string, body?: string, userId?: string | number) => {

    const doc = await Doc.create(name ?? 'New Document', body, userId || '');

    return doc;
}

export const updateDoc = async (id: string, name?: string, userId?: string) => {
    const doc = await Doc.findById(id);
    if (doc?.user_id != userId) {
        throw error('You do not have permission to update this document')
    }

    const updatedDoc = await Doc.update(id, name ?? '');
    return updatedDoc;
}

export const getDocById = async (id: string, userId: string) => {
    try {
        const doc = await Doc.findById(id);
        const permissions = await Permission.getPermissions(id);
        const author = await User.findUserById(doc.user_id);
        
        return { ...doc, permissions, author, isAuthor: doc.user_id == userId };
    } catch (err: any) {
        throw error(err.message, 404)
    }
}

export const deleteDocById = async (id: string, userId: string) => {
    const doc = await Doc.findById(id);
    if (doc?.user_id != userId) {
        throw error('You do not have permission to delete this document')
    }
    const deletedDoc = await Doc.delete(id);
    return deletedDoc;
}