const testtable = require('../models/models')
const pool=require('../db')
async function Table(req,res){
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM customers');
        const customers = result.rows;
        client.release();
        res.json(customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
module.exports={Table};