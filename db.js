const {Pool} = require('pg');

const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LostandFound',
    password: 'asaf12k9',
    port: 5432
});

module.exports = client;