import type { CoinData } from '../api';
import { motion } from 'framer-motion';

interface BubbleMapProps {
  coins: CoinData[];
  onSelect: (coin: CoinData) => void;
}

export const BubbleMap = ({ coins, onSelect }: BubbleMapProps) => {
  // Simple layout logic: scatter them randomly but keep centered
  // In a real physics engine, we'd use Matter.js, but for visual "float" Framer Motion is enough
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {coins.map((coin, i) => {
        // Size based on market cap rank (approximated by index here for demo)
        // or performance for impact
        const size = Math.max(80, 200 - i * 10 + Math.abs(coin.price_change_percentage_24h) * 5);
        const isPositive = coin.price_change_percentage_24h >= 0;
        
        // Random drift constraints
        const xOffset = (Math.random() - 0.5) * 40; 
        const yOffset = (Math.random() - 0.5) * 40;

        return (
          <motion.div
            key={coin.id}
            layoutId={`bubble-${coin.id}`}
            onClick={() => onSelect(coin)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: [0, xOffset, 0],
              y: [0, yOffset, 0],
            }}
            transition={{ 
              duration: 0.5,
              x: { duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              y: { duration: 5 + Math.random() * 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
            className={`
              absolute rounded-full flex flex-col items-center justify-center cursor-pointer
              transition-all duration-300 hover:scale-110 hover:z-50
              ${isPositive ? 'bubble-gradient-up' : 'bubble-gradient-down'}
            `}
            style={{
              width: size,
              height: size,
              // Simple grid-like distribution to avoid total overlap without physics engine
              // This is a "fake physics" distribution strategy
              left: `calc(50% + ${(Math.random() - 0.5) * 80}vw)`,
              top: `calc(50% + ${(Math.random() - 0.5) * 80}vh)`,
              // For a better demo, let's use fixed percentages based on index to spread them out
              // Overriding random for stability in this layout:
              marginLeft: (i % 4 - 1.5) * 200 + (Math.random() * 50),
              marginTop: (Math.floor(i / 4) - 1) * 200 + (Math.random() * 50),
            }}
          >
            <img src={coin.image} alt={coin.name} className="w-1/3 h-1/3 object-contain mb-1 opacity-90 drop-shadow-lg" />
            <span className="font-bold text-white tracking-wider text-sm drop-shadow-md">{coin.symbol.toUpperCase()}</span>
            <span className={`text-xs font-mono font-bold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
              {isPositive ? '+' : ''}{coin.price_change_percentage_24h}%
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
