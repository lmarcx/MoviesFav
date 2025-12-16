import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/init';
import { query } from './db';
import authRouter from './routes/auth';
import auth from './middleware/auth';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/api/auth', authRouter);

app.get('/api/users', auth, async (req, res) => {
  try {
    // The password hash should not be sent to the client
    const { rows } = await query('SELECT id, username, role_id FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(errorHandler);

const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
};

startServer();
