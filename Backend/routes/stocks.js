import express from 'express';
import stockController from '../controllers/stockController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

// Route to search for stocks
router.get('/search', authMiddleware, stockController.searchStocks);

// Route to get time series data
router.get('/timeseries', authMiddleware, stockController.getTimeSeries);

export default router;
