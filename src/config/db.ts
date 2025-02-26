require('dotenv').config();
const { Pool } = require('pg');
import env from "../config/env";

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = env;

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
});

module.exports = pool;