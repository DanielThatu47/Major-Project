import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  exchange: { type: String, required: true },
  currency: { type: String, required: true },
  type: { type: String }, // e.g., 'Stock', 'ETF', etc.
  // Add other relevant fields as needed
});

const Stock = mongoose.model('Stock', StockSchema);

export default Stock;
