import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = registerSchema.parse(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRoleResult = await query('SELECT id FROM roles WHERE name = $1', ['user']);
    if (userRoleResult.rows.length === 0) {
      return res.status(500).json({ message: 'Default user role not found' });
    }
    const roleId = userRoleResult.rows[0].id;

    const newUser = await query(
      'INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3) RETURNING id, username',
      [username, hashedPassword, roleId]
    );

    res.status(201).json({
      message: 'User created successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') { // unique_violation
        return res.status(409).json({ message: 'Username already exists' });
    }
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const userResult = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
