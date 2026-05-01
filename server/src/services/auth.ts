import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "../types/user.js";
import { createUser, findUserByEmail } from "./user.js";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
}

export type LoginInput = {
    email: string;
    password: string;
}

export const registerUser = async (name: string, email: string, password: string) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser({
        id: 0,
        name: name,
        email: email,
        password: hashedPassword,
        role: Role.user,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    if (!newUser) {
        throw new Error("Failed to create user");
    }

    return newUser;
};

export const loginUser = async (email: string, password: string) => {

    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid credentials");
    }

    const userInfo = { id: user.id, name: user.name, email: user.email, role: user.role }
    const token = jwt.sign(
        userInfo,
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { token, user: userInfo }
};