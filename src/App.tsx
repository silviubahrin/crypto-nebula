import { useState, useEffect } from 'react';
import type { CoinData } from './api';
import { fetchCoins } from './api';
import { BubbleMap } from './components/BubbleMap';
import { CoinDetails } from './components/CoinDetails';
import { Sidebar } from './components/Sidebar';
import { AnimatePresence } from 'framer-motion';
import { RefreshCw, Search } from 'lucide-react';
import { APP_VERSION, BUILD_ID } from './version';

function App() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCoins();
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative w-screen h-screen bg-deep-space overflow-hidden font-sans selection:bg-nebula-purple selection:text-white flex">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-nebula-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-nebula-blue/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Sidebar Dashboard */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col h-full">
        {/* Header UI */}
        <header className="w-full p-8 z-40 flex justify-between items-center">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 w-full max-w-md">
             <Search size={18} className="text-white/40" />
             <input 
               type="text" 
               placeholder="Search assets..." 
               className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full font-mono text-sm"
             />
          </div>
          
          <button 
            onClick={loadData}
            className={`glass-panel p-3 rounded-full text-white/70 hover:text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
        </header>

        {/* Bubble Map Area */}
        <main className="flex-1 relative z-10">
          {loading && coins.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-2xl font-mono animate-pulse text-white/50 tracking-widest">INITIALIZING LINK...</div>
            </div>
          ) : (
            <BubbleMap coins={coins} onSelect={setSelectedCoin} />
          )}
        </main>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {selectedCoin && (
          <CoinDetails coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
        )}
      </AnimatePresence>
      
      {/* Footer / Status */}
      <div className="absolute bottom-6 right-6 text-xs font-mono text-white/20 pointer-events-none">
        v{APP_VERSION} [{BUILD_ID}]
      </div>
    </div>
  );
}

export default App;
