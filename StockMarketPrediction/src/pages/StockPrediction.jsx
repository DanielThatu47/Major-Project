import { useState } from 'react';
import axios from 'axios';

const StockPrediction = () => {
    const [symbol, setSymbol] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        if (!symbol) {
            setError('Please enter a stock symbol.');
            return;
        }

        setLoading(true);
        setError('');
        setPrediction(null);

        try {
            const response = await axios.post('http://localhost:5001/predict', { symbol });
            if (response.data.success) {
                setPrediction(response.data.predicted_price);
            } else {
                setError(response.data.message || 'Prediction failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Stock Price Prediction</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Stock Symbol:</label>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="e.g., AAPL"
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button
                onClick={handlePredict}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? 'Predicting...' : 'Predict'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {prediction && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                    <p className="text-green-700">Predicted Closing Price: ₹{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default StockPrediction;
