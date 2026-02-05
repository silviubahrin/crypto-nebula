export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
}

// Simulating API data to avoid rate limits during dev, but structured for easy swap
export const fetchCoins = async (): Promise<CoinData[]> => {
  // In a real app, use:
  // const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true');
  // return res.json();

  // Mock data with realistic structure
  return [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 96420, price_change_percentage_24h: 2.5, market_cap: 1900000000000, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3450, price_change_percentage_24h: -1.2, market_cap: 400000000000, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
    { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 185, price_change_percentage_24h: 5.8, market_cap: 85000000000, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
    { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 2.10, price_change_percentage_24h: 12.4, market_cap: 110000000000, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 620, price_change_percentage_24h: 0.5, market_cap: 95000000000, image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.85, price_change_percentage_24h: -3.4, market_cap: 30000000000, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png' },
    { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', current_price: 45.2, price_change_percentage_24h: 8.9, market_cap: 18000000000, image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png' },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.18, price_change_percentage_24h: 1.1, market_cap: 25000000000, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png' },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 7.50, price_change_percentage_24h: -0.8, market_cap: 11000000000, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png' },
    { id: 'chainlink', symbol: 'link', name: 'Chainlink', current_price: 22.40, price_change_percentage_24h: 4.2, market_cap: 13000000000, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png' },
    { id: 'near', symbol: 'near', name: 'NEAR Protocol', current_price: 8.90, price_change_percentage_24h: 15.6, market_cap: 9000000000, image: 'https://assets.coingecko.com/coins/images/10365/large/near.png' },
    { id: 'kaspa', symbol: 'kas', name: 'Kaspa', current_price: 0.15, price_change_percentage_24h: -5.5, market_cap: 3500000000, image: 'https://assets.coingecko.com/coins/images/25751/large/kaspa-icon.png' },
  ];
};
