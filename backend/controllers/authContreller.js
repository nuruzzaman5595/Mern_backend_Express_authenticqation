import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) => {
     const secret = process.env.JWT_SECRET;

     if (!secret) {
          throw new Error('JWT_SECRET is not configured');
     }

     return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export async function registerUser(req, res) {
     try {
          const { name, email, password } = req.body;

          if (!name || !email || !password) {
               return res.status(400).json({ message: 'Name, email, and password are required' });
          }

          if (password.length < 6) {
               return res.status(400).json({ message: 'Password must be at least 6 characters' });
          }

          const normalizedEmail = email.trim().toLowerCase();
          const existingUser = await User.findOne({ email: normalizedEmail });

          if (existingUser) {
               return res.status(409).json({ message: 'Email is already registered' });
          }

          const user = await User.create({
               name: name.trim(),
               email: normalizedEmail,
               password: await bcrypt.hash(password, 10)
          });

          return res.status(201).json({
               user: { id: user._id, name: user.name, email: user.email },
               token: createToken(user._id.toString())
          });
     } catch (error) {
          return res.status(500).json({ message: error.message });
     }
}

export async function loginUser(req, res) {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               return res.status(400).json({ message: 'Email and password are required' });
          }

          const user = await User.findOne({ email: email.trim().toLowerCase() });
          const passwordMatches = user && await bcrypt.compare(password, user.password);

          if (!passwordMatches) {
               return res.status(401).json({ message: 'Invalid email or password' });
          }

          return res.status(200).json({
               user: { id: user._id, name: user.name, email: user.email },
               token: createToken(user._id.toString())
          });
     } catch (error) {
          return res.status(500).json({ message: error.message });
     }
}
