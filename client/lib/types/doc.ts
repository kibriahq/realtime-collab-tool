export type Permission = {
    id: string | number,
    user_id: string | number;
    name: string,
    email: string,
    role: string
}

export type Doc = {
    id: string;
    name: string;
    body: string;
    permissions: Permission[];
    user_id: string | number;
    created_at: string;
    updated_at: string;
}