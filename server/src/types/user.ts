export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum Role {
    user,
    admin
}