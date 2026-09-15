import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';



const PORT = 4000;
const app = express();


// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

//DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Api Working!');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


