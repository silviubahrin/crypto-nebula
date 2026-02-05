import { motion } from 'framer-motion';
import { Home, PieChart, Settings, Bell, Orbit } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'market', icon: Home, label: 'Market' },
    { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-20 lg:w-64 h-[90vh] glass-panel rounded-3xl m-6 z-50 overflow-hidden shrink-0"
    >
      {/* Logo Area */}
      <div className="p-8 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nebula-orange to-nebula-amber flex items-center justify-center shadow-lg shadow-orange-500/20 group">
          <Orbit size={22} className="text-white group-hover:rotate-180 transition-transform duration-700 ease-in-out" strokeWidth={2.5} />
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-tighter">NEBULA</span>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-4 px-4 py-8">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl
              transition-all duration-300 group relative overflow-hidden
              ${activeTab === item.id ? 'bg-white/10 text-white shadow-lg shadow-orange-500/10' : 'text-white/40 hover:text-white hover:bg-white/5'}
            `}
          >
            <item.icon size={24} />
            <span className="hidden lg:block font-medium">{item.label}</span>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 transition-opacity ${activeTab === item.id ? 'opacity-100' : 'group-hover:opacity-100'}`} />
          </button>
        ))}
      </div>

      {/* User / Bottom */}
      <div className="p-6 mt-auto">
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
          <div className="hidden lg:block text-left">
            <div className="text-sm font-bold">Admin</div>
            <div className="text-xs text-white/50">Pro Plan</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
