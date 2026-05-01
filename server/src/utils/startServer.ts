import pool from "../db/db.js";
import type { Server } from 'http';

async function startServer(server: Server, PORT: number) {
    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Database connected!');

        server.listen(PORT, () => {
            console.log(`🚀 Server is running on PORT ${PORT}`);
        });

    } catch (err) {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    }
}

export default startServer;