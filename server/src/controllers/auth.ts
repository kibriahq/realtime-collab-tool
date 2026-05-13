import type { Request, Response } from "express";
import { loginUser, registerUser, type LoginInput, type RegisterInput } from "../services/auth.js";


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as unknown as RegisterInput;

    const user = registerUser(name, email, password)

    return res.status(201).json({ ...user });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as unknown as LoginInput;
    
    const data = await loginUser(email, password);

    return res.status(200).json(data);
};