import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// POST endpoint for ticket bookings
app.post('/book-ticket', async (req, res) => {
  const { name, event, date } = req.body;

  // Validate request data
  if (!name || !event || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO bookings (name, event, date) VALUES ($1, $2, $3) RETURNING *',
      [name, event, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
