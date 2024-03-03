
const { Pool } = require('pg');

// Configure the PostgreSQL connection
module.exports = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'sundar.123',
    port: 5432, // Default PostgreSQL port
  });
