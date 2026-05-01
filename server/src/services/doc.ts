import Doc from "../db/repositories/Doc.js";

export const getDocsByUser = async (userId: string) => {
    const docs = await Doc.findByUserId(userId);
    return docs;
}

export const createDoc = async (name?: string, body?: string, userId?: string | number) => {

    const doc = await Doc.create(name??'New Document', body, userId || '');

    return doc;
}

export const updateDoc = async (id: string, name?: string, body?: string) => {
    const doc = await Doc.update(id, name??'', body??'');
    return doc;
}

export const getDocById = async (id: string) => {
    const doc = await Doc.findById(id);
    return doc;
}