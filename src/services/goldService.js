const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/INR';
const CACHE_KEY = 'goldPrice_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Fallback data in case API fails or limit is reached
const fallbackData = {
  price_gram_24k: 6245.82,
  price_gram_22k: 5725.33,
  prev_close_gram_24k: 6200.45,
  open_price: 6190.75,
  high_price: 6250.90,
  low_price: 6180.20,
  timestamp: Date.now(),
  isFallback: true
};

const getCachedData = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > CACHE_DURATION;

  return isExpired ? null : data;
};

const setCachedData = (data) => {
  const cacheData = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const fetchGoldPrice = async () => {
  try {
    const cachedData = getCachedData();
    if (cachedData) {
      return { ...cachedData, isCache: true };
    }

    const headers = new Headers({
      'x-access-token': import.meta.env.VITE_GOLD_API_KEY,
      'Content-Type': 'application/json'
    });

    const response = await fetch(GOLD_API_URL, {
      method: 'GET',
      headers,
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gold price');
    }

    const data = await response.json();
    setCachedData(data);
    return { ...data, isCache: false };

  } catch (error) {
    console.error('Error fetching gold price:', error);
    
    const expiredCache = localStorage.getItem(CACHE_KEY);
    if (expiredCache) {
      const { data } = JSON.parse(expiredCache);
      return { ...data, isCache: true, isStale: true };
    }

    return fallbackData;
  }
};
