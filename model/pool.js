import dotenv from 'dotenv'
import pg from 'pg';
const { Pool } = pg;


dotenv.config()

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
})

export default pool