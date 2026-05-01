import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "../types/user.js";
import { createUser, findUserByEmail } from "./user.js";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as unknown as RegisterInput;

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

    return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as unknown as LoginInput;

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

    return res.status(200).json({ token, user: userInfo });
};