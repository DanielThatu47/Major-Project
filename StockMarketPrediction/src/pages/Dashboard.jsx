import { useEffect, useState } from 'react';
import { fetchWatchlist } from "../utils/api.js"; // Ensure this path is correct
import TradingViewWidget from '../components/TradingViewWidget.jsx';

const Dashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedWatchStock, setSelectedWatchStock] = useState(null);
 
  const [error, setError] = useState('');

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const data = await fetchWatchlist();
        setWatchlist(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getWatchlist();
  }, []);

  const handleSelectWatchStock = async (stock) => {
    setSelectedWatchStock(stock);
    setError('');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
          {watchlist.length === 0 ? (
            <p>No stocks in your watchlist.</p>
          ) : (
            <ul className="space-y-2">
              {watchlist.map(stock => (
                <li
                  key={stock.stockSymbol} // Assuming stockSymbol is unique
                  onClick={() => handleSelectWatchStock(stock)}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span>{stock.name} ({stock.stockSymbol})</span>
                  {/* Display additional info if available */}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedWatchStock && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedWatchStock.name} ({selectedWatchStock.stockSymbol})
            </h2>
            <TradingViewWidget symbol={`${selectedWatchStock.exchange}:${selectedWatchStock.stockSymbol}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
