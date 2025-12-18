import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; role: number };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No Authorization header");
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  console.log("TOKEN RECEIVED:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: number;
    };
    console.log("DECODED:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ JWT ERROR:", err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
