import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Prediction = () => {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch prediction history from the backend
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure token is stored correctly
        const response = await axios.get('http://localhost:5000/api/predictions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setPredictionHistory(response.data.predictions);
        }
      } catch (error) {
        console.error('Error fetching prediction history:', error);
      }
    };

    fetchPredictions();
  }, []);

  // Example data for the LineChart
  const chartData = [
    { date: '2023-07', actual: 170, predicted: 172 },
    { date: '2023-08', actual: 175, predicted: 178 },
    { date: '2023-09', actual: 180, predicted: 182 },
    { date: '2023-10', predicted: 185 },
    { date: '2023-11', predicted: 188 },
    { date: '2023-12', predicted: 192 },
  ];

  const handlePredict = async () => {
    if (!symbol) {
      setError('Please enter a stock symbol or name.');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axios.post('http://localhost:5001/predict', { symbol });
      if (response.data.success) {
        setPrediction(response.data.predicted_price);
        // Optionally, update the prediction history locally
        setPredictionHistory([...predictionHistory, {
          symbol: response.data.symbol,
          predicted_price: response.data.predicted_price,
          date: new Date().toLocaleDateString(),
        }]);
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Stock Price Prediction</h1>
      
      {/* Prediction UI */}
      <Card>
        <CardHeader>
          <CardTitle>Make a Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
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
        </CardContent>
      </Card>

      {/* Prediction History */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
        </CardHeader>
        <CardContent>
          {predictionHistory.length > 0 ? (
            <ScrollArea className="h-64">
              <ul className="space-y-2">
                {predictionHistory.map((predictionItem, index) => (
                  <li key={index} className="p-2 bg-gray-100 rounded">
                    <span className="font-semibold">{predictionItem.symbol}</span> - ₹{predictionItem.predicted_price} on {predictionItem.date}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700">You have no prediction history.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Predicted to rise by 6.67% in the next 6 months</span>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>Confidence Level: Medium</span>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Factors Influencing Prediction */}
      <Card className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Factors Influencing Prediction</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <span>Strong quarterly earnings report</span>
          </li>
          <li className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <span>Positive market sentiment towards tech sector</span>
          </li>
          <li className="flex items-center">
            <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
            <span>Potential supply chain disruptions</span>
          </li>
          <li className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
            <span>Upcoming product launches</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Prediction;
