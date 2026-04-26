import { useState, useCallback, useEffect, useRef } from 'react';
import { searchStocks } from '../services/stockApi';
import TradingViewWidget from '../components/TradingViewWidget';
import debounce from 'lodash.debounce';

const StockSearch = () => {
  const [keywords, setKeywords] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const widgetRef = useRef(null);

  // 🔹 Exchange mapping (important)
  const mapExchange = (exchange) => {
    const map = {
      NSE: 'NSE',
      BSE: 'BSE',
      NASDAQ: 'NASDAQ',
      NYSE: 'NYSE',
    };
    return map[exchange] || exchange;
  };

  // 🔹 Debounced search
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchStocks(query);

        // ✅ O(n) deduplication
        const uniqueResults = Array.from(
          new Map(
            results.map((item) => [`${item.symbol}-${item.exchange}`, item])
          ).values()
        );

        setError('');
        setSearchResults(uniqueResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // 🔹 Cleanup debounce
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

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

  // 🔹 TradingView ticker (FIXED)
  useEffect(() => {
    if (!widgetRef.current) return;

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [
        { description: 'TCS', proName: 'BSE:TCS' },
        { description: 'Tech Mahindra', proName: 'BSE:TECHM' },
        { description: 'Apple', proName: 'NASDAQ:AAPL' },
        { description: 'Tesla', proName: 'NASDAQ:TSLA' },
        { description: 'Nvidia', proName: 'NASDAQ:NVDA' },
        { description: 'Microsoft', proName: 'NASDAQ:MSFT' },
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'compact',
      locale: 'en',
    });

    widgetRef.current.innerHTML = '';
    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="space-y-6 p-0">
      {/* 🔹 TradingView ticker */}
      <div className="tradingview-widget-container mb-6">
        <div
          className="tradingview-widget-container__widget p-7"
          ref={widgetRef}
        ></div>
      </div>

      <h1 className="text-3xl font-bold text-center">Search Stocks</h1>

      {/* 🔹 Search input */}
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

      {/* 🔹 Results */}
      {searchResults.length > 0 && (
        <ul className="border border-gray-300 rounded p-2 max-h-60 overflow-y-auto">
          {searchResults.map((stock, index) => (
            <li
              key={`${stock.symbol}-${stock.exchange}-${index}`}
              onClick={() => handleSelectStock(stock)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <span>
                {stock.name} ({stock.symbol})
              </span>
              <span className="text-gray-500">{stock.exchange}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Selected Stock */}
      {selectedStock && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            {selectedStock.name} ({selectedStock.symbol})
          </h2>

          <TradingViewWidget
            symbol={`${mapExchange(selectedStock.exchange)}:${selectedStock.symbol}`}
          />
        </div>
      )}
    </div>
  );
};

export default StockSearch;