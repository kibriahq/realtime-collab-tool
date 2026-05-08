export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: Role;
    color: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum Role {
    user,
    admin
}