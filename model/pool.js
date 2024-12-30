import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT 
})

export default pool