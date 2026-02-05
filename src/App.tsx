import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { fetchCoins, CoinData } from './api';
import { BubbleMap } from './components/BubbleMap';
import { CoinDetails } from './components/CoinDetails';
import { RefreshCw } from 'lucide-react';

function App() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    // Simulate network delay for effect
    setTimeout(async () => {
      const data = await fetchCoins();
      setCoins(data);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-deep-space overflow-hidden font-sans selection:bg-nebula-purple selection:text-white">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-nebula-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-nebula-blue/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header UI */}
      <header className="absolute top-0 left-0 w-full p-6 z-40 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 drop-shadow-lg">
            CRYPTO NEBULA
          </h1>
          <p className="text-xs font-mono text-white/40 tracking-[0.2em] mt-1">REALTIME MARKET VISUALIZER</p>
        </div>
        
        <button 
          onClick={loadData}
          className={`pointer-events-auto glass-panel p-3 rounded-full text-white/70 hover:text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full h-full relative z-10">
        {loading && coins.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-2xl font-mono animate-pulse text-white/50 tracking-widest">INITIALIZING...</div>
          </div>
        ) : (
          <BubbleMap coins={coins} onSelect={setSelectedCoin} />
        )}
      </main>

      {/* Overlay */}
      <AnimatePresence>
        {selectedCoin && (
          <CoinDetails coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
        )}
      </AnimatePresence>
      
      {/* Footer / Status */}
      <div className="absolute bottom-6 left-6 text-xs font-mono text-white/20 pointer-events-none">
        v2.0.26 // BLEEDING_EDGE_BUILD
      </div>
    </div>
  );
}

export default App;
