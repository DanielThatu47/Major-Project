import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stockSymbol: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
  addedAt: { type: Date, default: Date.now },
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

export default Watchlist;

