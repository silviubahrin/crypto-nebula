export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  rank: number;
}

// Using CoinCap API (Free, no key required for basic usage)
export const fetchCoins = async (): Promise<CoinData[]> => {
  try {
    const res = await fetch('https://api.coincap.io/v2/assets?limit=50');
    const json = await res.json();
    
    // Map CoinCap data to our interface
    // Note: CoinCap doesn't provide images directly, so we use a generic icon service or map manually.
    // We'll use CoinGecko's image CDN by ID match (best effort) or a placeholder.
    
    return json.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      current_price: parseFloat(coin.priceUsd),
      price_change_percentage_24h: parseFloat(coin.changePercent24Hr),
      market_cap: parseFloat(coin.marketCapUsd),
      rank: parseInt(coin.rank),
      // Fallback to a reliable icon source
      image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
    }));
  } catch (err) {
    console.error("API Fetch Failed", err);
    return []; 
  }
};
