import pool from "../db.js";


class Permissions {
    async searchUser(search: string) {
        const result = await pool.query('SELECT id, name, email FROM users WHERE name LIKE $1 OR email LIKE $1', [`%${search}%`]);
        return result.rows;
    }

    async addPermission(docId: string, userId: string, role: string) {
        const result = await pool.query('INSERT INTO doc_permissions (doc_id, user_id, role) VALUES ($1, $2, $3) RETURNING *', [docId, userId, role]);
        return result.rows[0];
    }

    async removePermission(id: string) {
        const result = await pool.query('DELETE FROM doc_permissions WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    async updatePermission(docId: string, userId: string, role: string) {
        const result = await pool.query('UPDATE doc_permissions SET role = $1 WHERE doc_id = $2 AND user_id = $3 RETURNING *', [role, docId, userId]);
        return result.rows[0];
    }

    async getPermissions(docId: string) {
        // const result = await pool.query('SELECT * FROM doc_permissions WHERE doc_id = $1', [docId]);
        const result = await pool.query(
            `SELECT 
                dp.id,
                u.id as user_id,
                u.name,
                u.email,
                dp.role,
                u.color
            FROM doc_permissions dp
            JOIN users u ON dp.user_id = u.id
            WHERE dp.doc_id = $1`,
            [docId]
        );

        return result.rows;
    }

    async getPermission(docId: string, userId: string) {
        const result = await pool.query('SELECT * FROM doc_permissions WHERE doc_id = $1 AND user_id = $2', [docId, userId]);
        return result.rows[0];
    }

    async findByUserId(userId: string) {
        const result = await pool.query(
            `SELECT 
                d.id,
                d.name,
                d.body,
                d.created_at,
                d.updated_at,
                dp.role,
                u.id as user_id
            FROM doc_permissions dp
            JOIN docs d ON dp.doc_id = d.id
            JOIN users u ON dp.user_id = u.id
            WHERE dp.user_id = $1`,
            [userId]
        );

        return result.rows;
    }
}

export default new Permissions();