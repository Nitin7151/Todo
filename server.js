import express from 'express';
import winston from 'winston';
import { body, validationResult } from 'express-validator';
import { Pool } from 'pg';

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

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
app.post(
  '/book-ticket',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('event').notEmpty().withMessage('Event is required'),
    body('date').isISO8601().withMessage('Date must be in ISO8601 format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, event, date } = req.body;

  try {
    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO bookings (name, event, date) VALUES ($1, $2, $3) RETURNING *',
      [name, event, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
