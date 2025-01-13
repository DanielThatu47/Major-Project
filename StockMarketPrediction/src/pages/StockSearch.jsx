import { useState, useCallback, useEffect } from 'react';
import { searchStocks } from '../services/stockApi';
import TradingViewWidget from '../components/TradingViewWidget';
import debounce from 'lodash.debounce';

const StockSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const results = await searchStocks(query);
        const uniqueResults = results.reduce((acc, current) => {
          const key = `${current.symbol}-${current.exchange}`;
          if (!acc.find(item => `${item.symbol}-${item.exchange}` === key)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setSearchResults(uniqueResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeywords(value);
    setError('');
    debouncedSearch(value);
  };

  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
    setSearchResults([]);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
      
        { "description": "TCS", "proName": "BSE:TCS" },
        { "description": "Tech Mahindra", "proName": "BSE:TECHM" },
        { "description": "Apple Inc", "proName": "NASDAQ:AAPL" },
        { "description": "Tesla", "proName": "NASDAQ:TSLA" },
        { "description": "Nvidia", "proName": "NASDAQ:NVDA" },
        { "description": "Microsoft", "proName": "NASDAQ:MSFT" },
        { "description": "Advanced Micro Devices", "proName": "NASDAQ:AMD" },
        { "description": "Meta", "proName": "NASDAQ:META" },
        { "description": "Netflix", "proName": "NASDAQ:NFLX" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "compact",
      "locale": "en"
    });
    
    document.querySelector('.tradingview-widget-container__widget').appendChild(script);
    return () => {
      // Clean up script if component unmounts
      script.remove();
    };
  }, []);

  return (
    <div className="space-y-6 p-0">
      <div className="tradingview-widget-container mb-6">
        <div className="tradingview-widget-container__widget p-7"></div>
      </div>
      <h1 className="text-3xl font-bold text-center">Search Stocks</h1>
      
      {/* TradingView Ticker */}
      

      {/* Search UI */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={keywords}
          onChange={handleInputChange}
          placeholder="Enter stock symbol or name... (e.g., AAPL)"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading && <p className="text-center text-gray-600">Loading...</p>}

      {searchResults.length > 0 && (
        <ul className="border border-gray-300 rounded p-2 max-h-60 overflow-y-auto">
          {searchResults.map((stock, index) => (
            <li
              key={`${stock.symbol}-${stock.exchange}-${index}`}
              onClick={() => handleSelectStock(stock)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <span>{stock.name} ({stock.symbol})</span>
              <span className="text-gray-500">{stock.exchange}</span>
            </li>
          ))}
        </ul>
      )}

      {selectedStock && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {selectedStock.name} ({selectedStock.symbol})
            </h2>
            <span className="text-gray-500">{selectedStock.exchange}</span>
          </div>
          <TradingViewWidget symbol={`${selectedStock.exchange}:${selectedStock.symbol}`} />
        </div>
      )}
    </div>
  );
};

export default StockSearch;
