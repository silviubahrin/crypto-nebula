import { useMemo } from 'react';
import type { CoinData } from '../api';
import { motion } from 'framer-motion';

interface BubbleMapProps {
  coins: CoinData[];
  onSelect: (coin: CoinData) => void;
}

export const BubbleMap = ({ coins, onSelect }: BubbleMapProps) => {
  // Generate stable positions based on coins data
  const bubbles = useMemo(() => {
    return coins.map((coin, i) => {
      // Deterministic pseudo-random based on char codes of ID to keep it consistent across renders
      const seed = coin.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const rand = (seed % 100) / 100;

      // Spiral distribution to ensure they stay centered but spread out
      const angle = i * 137.5 * (Math.PI / 180); // Golden angle
      const radius = 60 + (i * 40); // Increasing radius
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const size = Math.max(100, 180 - i * 8 + Math.abs(coin.price_change_percentage_24h) * 4);
      
      return {
        ...coin,
        x,
        y,
        size,
        delay: i * 0.1,
        floatDuration: 3 + rand * 4,
        floatOffset: 10 + rand * 20
      };
    });
  }, [coins]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {bubbles.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <motion.div
            key={coin.id}
            layoutId={`bubble-${coin.id}`}
            onClick={() => onSelect(coin)}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: coin.x, // Move to spiral position
              y: coin.y,
            }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            transition={{ 
              duration: 0.8,
              delay: coin.delay,
              type: "spring",
              stiffness: 50
            }}
            className={`
              absolute rounded-full flex flex-col items-center justify-center cursor-pointer
              shadow-lg backdrop-blur-sm
              ${isPositive ? 'bubble-gradient-up' : 'bubble-gradient-down'}
            `}
            style={{
              width: coin.size,
              height: coin.size,
              zIndex: 10,
            }}
          >
            {/* Floating content inside the positioned bubble */}
            <motion.div
              animate={{ y: [0, -coin.floatOffset, 0] }}
              transition={{ 
                duration: coin.floatDuration, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <img 
                src={coin.image} 
                alt={coin.name} 
                className="w-1/3 h-1/3 object-contain mb-2 drop-shadow-md" 
                draggable={false}
              />
              <span className="font-bold text-white tracking-wider text-sm drop-shadow-md">
                {coin.symbol.toUpperCase()}
              </span>
              <span className={`text-xs font-mono font-bold ${isPositive ? 'text-green-100' : 'text-red-100'}`}>
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h}%
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
