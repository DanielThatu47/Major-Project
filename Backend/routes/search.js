import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure authentication if required

dotenv.config();

const router = express.Router();

// Search Stocks Endpoint
router.get('/', authMiddleware, async (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';

    if (!query) {
        return res.status(400).json({ success: false, message: 'Query parameter "q" is required.' });
    }

    try {
        // Proxy the search request to Model_Backend's /predict (assuming it can handle search)
        // Alternatively, implement direct search logic here using an external API

        // Example using Twelve Data API
        const apiKey = process.env.TWELVE_DATA_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: 'Twelve Data API key not configured.' });
        }

        const searchUrl = 'https://api.twelvedata.com/symbol_search';
        const response = await axios.get(searchUrl, {
            params: {
                symbol: query,
                exchange: 'NSE,BSE',
                type: 'stock',
                apikey: apiKey
            }
        });

        const stocks = response.data.data.map(stock => ({
            symbol: stock.symbol,
            name: stock.instrument_name,
            exchange: stock.exchange,
            currency: stock.currency,
            type: stock.type,
        }));

        res.json({ success: true, results: stocks });
    } catch (error) {
        console.error('Error searching stocks:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
