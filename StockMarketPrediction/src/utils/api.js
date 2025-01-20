import axios from 'axios';

const API_BASE_URL = 'https://stockbuddybackend.vercel.app/api'; // Adjust based on your backend configuration

/**
 * Fetches the user's watchlist.
 */
export const fetchWatchlist = async () => {
  const token = localStorage.getItem('token'); // Ensure token is stored correctly
  if (!token) {
    throw new Error('No authentication token found.');
  }

  const response = await axios.get(`${API_BASE_URL}/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Adds a stock to the user's watchlist.
 * @param {string} stockSymbol
 */
export const addWatchlistStock = async (stockSymbol) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }

  const response = await axios.post(`${API_BASE_URL}/watchlist/add`, { stockSymbol }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Deletes a stock from the user's watchlist.
 * @param {string} stockSymbol
 */
export const deleteWatchlistStock = async (stockSymbol) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }

  const response = await axios.delete(`${API_BASE_URL}/watchlist/delete`, {
    data: { stockSymbol }, // DELETE requests with a body need to use `data`
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Searches for stocks based on a query.
 * @param {string} query
 */
export const searchStocks = async (query) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found.');
  }

  const response = await axios.get(`${API_BASE_URL}/stocks/search`, {
    params: { q: query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.results; // Adjust based on your API response structure
};

/**
 * Fetches time series data for a given stock symbol.
 * @param {string} symbol
 * @param {string} interval
 */
export const fetchTimeSeries = async (symbol, interval) => {
  const response = await axios.get(`${API_BASE_URL}/stocks/timeseries`, {
    params: { symbol, interval },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.timeSeries; // Adjust based on your API response structure
};

// StockMarketPrediction/src/utils/api.js



const API_URL = 'https://stockbuddybackend.vercel.app/api';

export const fetchUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/auth/user`, config);
  return response.data;
};
