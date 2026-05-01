import pool from './db.js';
import fs from 'fs';
import path from 'path';

const migrations = fs.readdirSync('./src/db/migrations').sort();

for (const file of migrations) {
    const sql = fs.readFileSync(path.join('./src/db/migrations', file), 'utf8');
    await pool.query(sql);
    console.log(`Ran: ${file}`);
}