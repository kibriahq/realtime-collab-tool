import pool from "../db.js";
import type { UserType } from "../../types/user.js";
import error from "../../utils/error.js";

class User {

    findAllUsers = async () => {
        const { rows } = await pool.query<UserType>("SELECT * FROM users");
        return rows;
    };

    findUserById = async (id: number): Promise<UserType | null> => {
        const { rows } = await pool.query<UserType>("SELECT * FROM users WHERE id = $1", [id]);
        return rows[0] || null;
    };

    findUserByEmail = async (email: string): Promise<UserType | null> => {
        const { rows } = await pool.query<UserType>("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        return rows[0] || null;
    };

    findByProperty = async (property: string, value: string): Promise<UserType | null> => {
        const allowedFields = ["id", "email", "name"];

        if (!allowedFields.includes(property)) {
            throw error("Invalid property", 400);
        }

        const { rows } = await pool.query<UserType>(`SELECT * FROM users WHERE ${property} = $1`, [
            value,
        ]);
        return rows[0] || null;
    };

    createUser = async (data: UserType): Promise<UserType | null> => {
        const { rows } = await pool.query<UserType>(
            "INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
            [data.name, data.email, data.password, data.avatar || null]
        );
        return rows[0] || null;
    };

    updateUser = async (id: number, data: Partial<UserType>): Promise<UserType | null> => {
        const fields: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (data.name !== undefined) {
            fields.push(`name = $${paramIndex++}`);
            values.push(data.name);
        }
        if (data.email !== undefined) {
            fields.push(`email = $${paramIndex++}`);
            values.push(data.email);
        }
        if (data.password !== undefined) {
            fields.push(`password = $${paramIndex++}`);
            values.push(data.password);
        }
        if (data.avatar !== undefined) {
            fields.push(`avatar = $${paramIndex++}`);
            values.push(data.avatar);
        }

        if (fields.length === 0) return null;

        values.push(id);
        const { rows } = await pool.query<UserType>(
            `UPDATE users SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
            values
        );
        return rows[0] || null;
    };

    deleteUser = async (id: number): Promise<UserType | null> => {
        const { rows } = await pool.query<UserType>(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        );
        return rows[0] || null;
    };
}

export default new User();