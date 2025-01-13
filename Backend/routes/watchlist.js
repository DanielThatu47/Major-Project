import express from 'express';
import watchlistController from '../controllers/watchlistController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

// Route to get the user's watchlist
router.get('/', authMiddleware, watchlistController.getWatchlist);

// Route to add a stock to the watchlist
router.post('/add', authMiddleware, watchlistController.addToWatchlist);

// Route to delete a stock from the watchlist
router.delete('/delete', authMiddleware, watchlistController.deleteFromWatchlist);

export default router;

