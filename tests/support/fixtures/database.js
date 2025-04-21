require('dotenv').config()
const { Pool } = require('pg')


const DbCongif = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbCongif)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)

    } catch (error) {
        console.log('Erro ao executar SQL' + error)
    }

}