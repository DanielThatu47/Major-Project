import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import { useEffect, useState } from 'react';

const TWELVE_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
const ML_API_URL = "https://danielthatu12-stockbuddy-prediction-model.hf.space/predict";

const Prediction = () => {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch history (unchanged but safer)
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:5000/api/predictions',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setPredictionHistory(res.data.predictions);
        }
      } catch (err) {
        console.error('History error:', err);
      }
    };

    fetchPredictions();
  }, []);

  // 🔥 MAIN LOGIC
  const handlePredict = async () => {
    if (!symbol.trim()) {
      setError('Enter stock symbol');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);
    setChartData([]);

    try {
      // 🔹 1. Fetch historical data
      const historyRes = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${TWELVE_API_KEY}`
      );

      const values = historyRes.data.values?.reverse() || [];

      const formattedHistory = values.map(item => ({
        date: item.datetime,
        actual: parseFloat(item.close)
      }));

      // 🔹 2. Call ML API
      const mlRes = await axios.post(ML_API_URL, { symbol });

      if (!mlRes.data) throw new Error("Prediction failed");

      const predictedPrice = mlRes.data.predicted_price || mlRes.data.prediction;

      setPrediction(predictedPrice);

      // 🔹 3. Merge data
      const lastDate = formattedHistory[formattedHistory.length - 1]?.date;

      const futurePoint = {
        date: "Next",
        predicted: predictedPrice
      };

      const merged = formattedHistory.map(d => ({
        ...d,
        predicted: null
      }));

      merged.push({
        date: lastDate,
        actual: formattedHistory.at(-1).actual,
        predicted: predictedPrice
      });

      merged.push(futurePoint);

      setChartData(merged);

      // 🔹 4. Update history
      setPredictionHistory(prev => [
        ...prev,
        {
          symbol,
          predicted_price: predictedPrice,
          date: new Date().toLocaleDateString(),
        }
      ]);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Calculate trend
  const getTrend = () => {
    if (!chartData.length) return null;

    const lastActual = chartData.at(-2)?.actual;
    const predicted = chartData.at(-1)?.predicted;

    if (!lastActual || !predicted) return null;

    return ((predicted - lastActual) / lastActual) * 100;
  };

  const trend = getTrend();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stock Price Prediction</h1>

      {/* 🔹 Prediction Input */}
      <Card>
        <CardHeader>
          <CardTitle>Make a Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="e.g., AAPL / TCS"
              className="w-full px-3 py-2 border rounded"
            />

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>

            {error && <p className="text-red-500">{error}</p>}

            {prediction && (
              <div className="p-4 bg-green-100 rounded">
                Predicted Price: ₹{prediction}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔥 Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prediction Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="actual" name="Actual" />
                  <Line type="monotone" dataKey="predicted" name="Predicted" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 🔹 Insights */}
      {trend !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              {trend > 0 ? (
                <TrendingUp className="text-green-500" />
              ) : (
                <TrendingDown className="text-red-500" />
              )}
              <span>{trend.toFixed(2)}% expected movement</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 🔹 History */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          {predictionHistory.length ? (
            <ScrollArea className="h-64">
              {predictionHistory.map((p, i) => (
                <div key={i} className="p-2 bg-gray-100 rounded mb-2">
                  {p.symbol} → ₹{p.predicted_price} ({p.date})
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p>No history</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Prediction;