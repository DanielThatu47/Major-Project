import express from 'express';
import Prediction from '../models/Prediction.js'; // Ensure this path is correct
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to save a prediction
router.post('/add', authMiddleware, async (req, res) => {
    const { symbol, predictedPrice } = req.body;
    const userId = req.user.id;

    if (!symbol || !predictedPrice) {
        return res.status(400).json({ success: false, message: 'Symbol and predictedPrice are required.' });
    }

    try {
        const newPrediction = new Prediction({
            user: userId,
            symbol: symbol.toUpperCase(),
            predictedPrice,
            createdAt: new Date()
        });
        await newPrediction.save();
        res.json({ success: true, message: 'Prediction saved successfully.' });
    } catch (error) {
        console.error('Error saving prediction:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
