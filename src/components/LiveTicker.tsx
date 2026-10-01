import React from 'react';

interface TickerItem {
  id: string;
  ticker: string;
  name: string;
  check: string;
  daysLeft: number;
  isRolling: boolean;
  city: string;
  country: string;
}

export default function LiveTicker({ items }: { items: TickerItem[] }) {
  if (!items || items.length === 0) return null;

  // Duplicate items for continuous seamless loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-[#07090E]/90 border-b border-white/5 backdrop-blur-md overflow-hidden py-2 select-none relative z-20">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-3.5 py-1 bg-white/[0.03] border-r border-white/10 flex items-center gap-2 z-10 text-[10px] uppercase tracking-widest font-mono text-indigo-400 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          LIVE RADAR
        </div>
        
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-8 pl-4">
            {displayItems.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={`/programs/${item.id}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-slate-300 hover:text-white transition-colors font-mono text-xs group"
              >
                <span className="text-indigo-400 font-bold group-hover:text-indigo-300 transition-colors">
                  ${item.ticker}
                </span>
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-slate-600">·</span>
                <span className="text-sky-400">{item.city}, {item.country}</span>
                <span className="text-slate-600">·</span>
                <span className="text-amber-300 font-semibold">{item.check}</span>
                <span className="text-slate-600">·</span>
                {item.isRolling ? (
                  <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
                    ROLLING
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold tabular-nums ${
                    item.daysLeft <= 7 
                      ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' 
                      : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  }`}>
                    ⏳ {item.daysLeft}d left
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
