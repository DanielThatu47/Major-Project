import Stock from '../models/Stock.js'; // Ensure you have a Stock model
import axios from 'axios'; // For external API calls if needed
import dotenv from 'dotenv';

dotenv.config();

/**
 * Searches for stocks based on a query.
 */
const searchStocks = async (req, res) => {
  const { q } = req.query;
    
  if (!q || q.trim() === '') {
    return res.status(400).json({ success: false, message: 'Query parameter is required.' });
  }

  try {
    // Using Twelve Data API for stock search
    const apiKey = process.env.TWELVE_DATA_API_KEY; // Ensure this is set in your .env file
    const response = await axios.get(`https://api.twelvedata.com/symbol_search`, {
      params: { symbol: q, exchange: 'NASDAQ', type: 'stock' }, // Adjust parameters as needed
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Failed to search stocks.');
    }

    const results = response.data.data.map(stock => ({
      symbol: stock.symbol,
      name: stock.instrument_name,
      exchange: stock.exchange,
      currency: stock.currency,
      type: stock.type,
    }));

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error searching stocks:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Fetches time series data for a given stock symbol.
 */
const getTimeSeries = async (req, res) => {
  const { symbol, interval } = req.query;

  if (!symbol || symbol.trim() === '') {
    return res.status(400).json({ success: false, message: 'Symbol parameter is required.' });
  }

  if (!interval) {
    return res.status(400).json({ success: false, message: 'Interval parameter is required.' });
  }

  try {
    // Using Twelve Data API for time series data
    const apiKey = process.env.TWELVE_DATA_API_KEY; // Ensure this is set in your .env file
    const response = await axios.get(`https://api.twelvedata.com/time_series`, {
      params: { symbol, interval, outputsize: 30 }, // Adjust parameters as needed
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Failed to fetch time series data.');
    }

    const timeSeries = response.data.values.map(entry => ({
      date: entry.datetime,
      open: parseFloat(entry.open),
      high: parseFloat(entry.high),
      low: parseFloat(entry.low),
      close: parseFloat(entry.close),
      volume: parseInt(entry.volume, 10),
    }));

    res.json({ success: true, timeSeries });
  } catch (error) {
    console.error('Error fetching time series data:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default { searchStocks, getTimeSeries };
