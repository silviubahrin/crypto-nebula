import type { CoinData } from '../api';
import { motion } from 'framer-motion';
import { X, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface CoinDetailsProps {
  coin: CoinData;
  onClose: () => void;
}

export const CoinDetails = ({ coin, onClose }: CoinDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <motion.div
        layoutId={`bubble-${coin.id}`}
        className="glass-panel p-8 rounded-3xl w-full max-w-md m-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        {/* Background glow blob */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -z-10 opacity-30 
          ${coin.price_change_percentage_24h >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
        />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img src={coin.image} alt={coin.name} className="w-16 h-16 drop-shadow-2xl" />
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{coin.name}</h2>
            <span className="text-white/50 font-mono text-sm">{coin.symbol.toUpperCase()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <DollarSign size={14} /> Price
            </div>
            <div className="text-2xl font-mono font-bold">
              ${coin.current_price.toLocaleString()}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <TrendingUp size={14} /> 24h Change
            </div>
            <div className={`text-2xl font-mono font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h}%
            </div>
          </div>

          <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <Activity size={14} /> Market Cap
            </div>
            <div className="text-xl font-mono text-white/90">
              ${(coin.market_cap / 1_000_000_000).toFixed(2)} Billion
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/40 font-mono">
          <span>RANK #{Math.floor(Math.random() * 100)}</span>
          <span>UPDATED: JUST NOW</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
