import Permissions from "../db/repositories/Permission.js";
import Doc from "../db/repositories/Doc.js";

export const searchUser = async (search: string, docId: string) => {
    const users = await Permissions.searchUser(search);
    const permissions = await Permissions.getPermissions(docId);
    const doc = await Doc.findById(docId);

    const filterUser = users.filter((user: any) => user.id !== doc.user_id);

    const usersWithPermission = filterUser.map((user: any) => {
        const u = { ...user, isAdded: false, permission: null };
        permissions.forEach((permission: any) => {
            if (permission.user_id === user.id) {
                u.isAdded = true;
                u.permission = permission;
            }
        });
        return u;
    });


    return usersWithPermission;
}

export const addDocPermission = async (docId: string, userId: string, role?: string) => {
    const permission = await Permissions.addPermission(docId, userId, role || 'edit');
    return permission;
}

export const removeDocPermission = async (id: string) => {
    const permission = await Permissions.removePermission(id);
    return permission;
}

export const updateDocPermission = async (docId: string, userId: string, role: string) => {
    const permission = await Permissions.updatePermission(docId, userId, role);
    return permission;
}

export const getDocPermissions = async (docId: string) => {
    const permissions = await Permissions.getPermissions(docId);
    return permissions;
}

export const getDocPermission = async (docId: string, userId: string) => {
    const permission = await Permissions.getPermission(docId, userId);
    return permission;
}