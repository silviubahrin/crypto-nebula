import { motion } from 'framer-motion';
import { Home, PieChart, Settings, Search, Bell, Menu } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Market' },
    { icon: PieChart, label: 'Portfolio' },
    { icon: Bell, label: 'Alerts' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-20 lg:w-64 h-[90vh] glass-panel rounded-3xl m-6 z-50 overflow-hidden"
    >
      {/* Logo Area */}
      <div className="p-8 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nebula-purple to-nebula-blue animate-pulse" />
        <span className="hidden lg:block font-bold text-xl tracking-tighter">NEBULA</span>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-4 px-4 py-8">
        {menuItems.map((item, i) => (
          <button 
            key={i}
            className={`
              flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl
              transition-all duration-300 group relative overflow-hidden
              ${i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}
            `}
          >
            <item.icon size={24} />
            <span className="hidden lg:block font-medium">{item.label}</span>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* User / Bottom */}
      <div className="p-6 mt-auto">
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="hidden lg:block">
            <div className="text-sm font-bold">Admin</div>
            <div className="text-xs text-white/50">Pro Plan</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
