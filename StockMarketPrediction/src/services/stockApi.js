const API_BASE_URL = 'https://api.twelvedata.com';
const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

// 🔹 YOUR ML MODEL ENDPOINT
const ML_API_URL =
  'https://danielthatu12-stockbuddy-prediction-model.hf.space/predict';

/**
 * 🔹 Search stocks
 */
export const searchStocks = async (keywords) => {
  const url = `${API_BASE_URL}/symbol_search?symbol=${encodeURIComponent(
    keywords
  )}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to search stocks');

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    if (!Array.isArray(data.data)) return [];

    return data.data.map((match) => ({
      symbol: match.symbol,
      name: match.instrument_name,
      currency: match.currency,
      exchange: match.exchange,
      type: match.type,
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

/**
 * 🔹 Fetch real-time quote
 */
export const fetchGlobalQuote = async (symbol) => {
  const url = `${API_BASE_URL}/quote?symbol=${encodeURIComponent(
    symbol
  )}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch quote');

    const data = await response.json();

    if (data.status === 'error') throw new Error(data.message);

    return {
      symbol: data.symbol,
      open: +data.open,
      high: +data.high,
      low: +data.low,
      price: +data.close,
      volume: +data.volume,
      change: +data.change,
      percentChange: data.percent_change,
    };
  } catch (error) {
    console.error('Quote error:', error);
    throw error;
  }
};

/**
 * 🔹 Fetch company info
 */
export const fetchCompanyOverview = async (symbol) => {
  const url = `${API_BASE_URL}/profile?symbol=${encodeURIComponent(
    symbol
  )}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch profile');

    const data = await response.json();

    if (data.status === 'error') throw new Error(data.message);

    return data;
  } catch (error) {
    console.error('Profile error:', error);
    throw error;
  }
};

/**
 * 🔹 🔥 ML Prediction API
 */
export const fetchStockPrediction = async (symbol) => {
  try {
    const response = await fetch(ML_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Adjust payload based on your model input
      body: JSON.stringify({
        symbol: symbol,
      }),
    });

    if (!response.ok) {
      throw new Error('Prediction API failed');
    }

    const data = await response.json();

    return data; // expected: { predictions: [...] }
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};