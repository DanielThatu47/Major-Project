import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import watchlistRoutes from './routes/watchlist.js';
import stockRoutes from './routes/stocks.js';
import authRoutes from './routes/auth.js';
import predictionsRoutes from './routes/predictions.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['https://stockbuddysem8.vercel.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/predictions', predictionsRoutes);
app.use('/api/search', searchRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Stock Market Prediction API is running.');
});

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
