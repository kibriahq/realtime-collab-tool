import { UserRole } from "../../generated/prisma/client.js";

export type UserType = {
    id?: number;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: UserRole;
    color: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export { UserRole };