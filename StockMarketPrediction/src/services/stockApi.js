const API_BASE_URL = 'https://api.twelvedata.com';
const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

/**
 * Searches for stocks based on provided keywords.
 * @param {string} keywords - The search keywords (e.g., "Apple").
 * @returns {Promise<Array>} - An array of matching stock objects.
 */
export const searchStocks = async (keywords) => {
  console.log('Searching stocks with keywords:', keywords);
  
  const url = `${API_BASE_URL}/symbol_search?symbol=${encodeURIComponent(keywords)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to search stocks');
    }
    
    const data = await response.json();
    console.log('API Response:', data);

    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to search stocks');
    }

    if (!data.data || !Array.isArray(data.data)) {
      console.log('No matches found or invalid response format');
      return [];
    }

    const transformedResults = data.data.map((match) => ({
      symbol: match.symbol,
      name: match.instrument_name,
      currency: match.currency,
      exchange: match.exchange,
      type: match.type,
    }));

    console.log('Transformed results:', transformedResults);
    return transformedResults;
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

/**
 * Fetches real-time stock data based on the symbol.
 * @param {string} symbol - The stock symbol (e.g., "AAPL").
 * @returns {Promise<Object>} - An object containing real-time stock data.
 */
export const fetchGlobalQuote = async (symbol) => {
  const url = `${API_BASE_URL}/quote?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return {
      symbol: data.symbol,
      open: parseFloat(data.open),
      high: parseFloat(data.high),
      low: parseFloat(data.low),
      price: parseFloat(data.close),
      volume: parseInt(data.volume, 10),
      previousClose: parseFloat(data.previous_close),
      change: parseFloat(data.change),
      percentChange: data.percent_change,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};


/**
 * Fetches company information based on the symbol.
 * @param {string} symbol - The stock symbol (e.g., "AAPL").
 * @returns {Promise<Object>} - An object containing company information.
 */
export const fetchCompanyOverview = async (symbol) => {
  const url = `${API_BASE_URL}/profile?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch company overview');
    }
    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return {
      symbol: data.symbol,
      name: data.name,
      description: data.description,
      industry: data.industry,
      sector: data.sector,
      marketCap: data.market_cap,
      employees: data.employees,
      website: data.website,
      exchange: data.exchange,
      currency: data.currency,
    };
  } catch (error) {
    console.error('Error fetching company overview:', error);
    throw error;
  }
};
