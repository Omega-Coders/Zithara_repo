const pool=require("../db");
async function createCustomersTable() {
    const queryText = `
      CREATE TABLE IF NOT EXISTS customers (
        sno SERIAL PRIMARY KEY,
        customer_name VARCHAR(255),
        age INT,
        phone VARCHAR(20),
        location VARCHAR(100),
        created_at TIMESTAMP
      )
    `;
    try {
      const client = await pool.connect();
      await client.query(queryText);
      console.log('Customers table created successfully.');
    } catch (error) {
      console.error('Error creating customers table:', error);
    } 
    
  }
  
  createCustomersTable();