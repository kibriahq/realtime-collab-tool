import pool from "../db.js";

type DocType = {
    id: string;
    name: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

class Doc {
    async create(name?: string, body?: string, userId?: string | number) {
        const query = `INSERT INTO docs (name, body, user_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, body, userId]);
        return result.rows[0];
    }

    async findById(id: string) {
        const query = `SELECT * FROM docs WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async findByUserId(userId: string) {
        const query = `SELECT * FROM docs WHERE user_id = $1`;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    async update(id: string, name: string, body: string) {
        const query = `UPDATE docs SET name = $1, body = $2 WHERE id = $3 RETURNING *`;
        const result = await pool.query(query, [name, body, id]);
        return result.rows[0];
    }

    async delete(id: string) {
        const query = `DELETE FROM docs WHERE id = $1`;
        await pool.query(query, [id]);
    }

    async selectDocBody(documentName: string) {
        const query = `SELECT body FROM docs WHERE id = $1`;
        const result = await pool.query(query, [documentName]);
        return result.rows[0]?.body;
    }

    async updateDocHP(documentName: string, state: Buffer<ArrayBuffer>) {
        await pool.query(
            `INSERT INTO docs (id, body, updated_at)
               VALUES ($1, $2, NOW())
               ON CONFLICT (id) DO UPDATE
               SET body = $2, updated_at = NOW()`,
            [documentName, state]
        );
    }
}

export default new Doc();