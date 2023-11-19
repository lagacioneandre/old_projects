const { Client } = require('pg');

module.exports = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'elecctro_todo_list',
    password: 'docker',
    port: 5432,
});