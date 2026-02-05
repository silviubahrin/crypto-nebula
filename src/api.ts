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

const FALLBACK_COINS: CoinData[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 96420, price_change_percentage_24h: 2.5, market_cap: 1900000000000, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', rank: 1 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3450, price_change_percentage_24h: -1.2, market_cap: 400000000000, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', rank: 2 },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 185, price_change_percentage_24h: 5.8, market_cap: 85000000000, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', rank: 3 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 2.10, price_change_percentage_24h: 12.4, market_cap: 110000000000, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', rank: 4 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 620, price_change_percentage_24h: 0.5, market_cap: 95000000000, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', rank: 5 },
];

export const fetchCoins = async (): Promise<CoinData[]> => {
  try {
    const res = await fetch('https://api.coincap.io/v2/assets?limit=50');
    if (!res.ok) throw new Error("API Response not OK");
    const json = await res.json();
    
    return json.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      current_price: parseFloat(coin.priceUsd),
      price_change_percentage_24h: parseFloat(coin.changePercent24Hr),
      market_cap: parseFloat(coin.marketCapUsd),
      rank: parseInt(coin.rank),
      // Use fallback image logic or generic service if CoinCap icons fail
      image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`
    }));
  } catch (err) {
    console.warn("API Fetch Failed, using fallback data", err);
    return FALLBACK_COINS; 
  }
};
