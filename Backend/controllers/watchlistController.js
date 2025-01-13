import Watchlist from '../models/Watchlist.js';
import Stock from '../models/Stock.js'; // Ensure you have a Stock model

/**
 * Fetches the user's watchlist.
 */
const getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const watchlistData = await Watchlist.find({ user: userId }).populate('stockSymbol'); // Assuming stockSymbol is a reference
    // Transform the data to include exchange information
    const transformedWatchlist = watchlistData.map(item => ({
      stockSymbol: item.stockSymbol.symbol, // Adjust based on your schema
      name: item.stockSymbol.name,
      exchange: item.stockSymbol.exchange, // Ensure exchange info is available
    }));
    res.json({ success: true, watchlist: transformedWatchlist });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Adds a new stock to the watchlist.
 */
const addToWatchlist = async (req, res) => {
  const { stockSymbol } = req.body;
  const userId = req.user.id;

  try {
    // Check if the stock exists in your database
    const stock = await Stock.findOne({ symbol: stockSymbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ success: false, message: 'Stock not found.' });
    }

    // Check if already in watchlist
    const existing = await Watchlist.findOne({ user: userId, stockSymbol: stock._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Stock already in watchlist.' });
    }

    const newWatchlistItem = new Watchlist({ user: userId, stockSymbol: stock._id });
    await newWatchlistItem.save();
    res.json({ success: true, message: 'Stock added to watchlist.' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Deletes a stock from the watchlist.
 */
const deleteFromWatchlist = async (req, res) => {
  const { stockSymbol } = req.body;
  const userId = req.user.id;

  try {
    // Find the stock in the database
    const stock = await Stock.findOne({ symbol: stockSymbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ success: false, message: 'Stock not found.' });
    }

    // Check if the stock is in the user's watchlist
    const watchlistItem = await Watchlist.findOne({ user: userId, stockSymbol: stock._id });
    if (!watchlistItem) {
      return res.status(404).json({ success: false, message: 'Stock not found in your watchlist.' });
    }

    // Remove the stock from the watchlist
    await Watchlist.deleteOne({ _id: watchlistItem._id });
    res.json({ success: true, message: 'Stock removed from watchlist.' });
  } catch (error) {
    console.error('Error deleting from watchlist:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default { getWatchlist, addToWatchlist, deleteFromWatchlist };
