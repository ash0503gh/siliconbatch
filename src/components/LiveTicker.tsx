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
    <div className="w-full bg-[#080d16] border-b border-[#1b2540] overflow-hidden py-2 text-xs select-none relative z-20">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-3 py-0.5 bg-[#131a28] border-r border-[#1b2540] flex items-center gap-2 z-10 text-[10px] uppercase tracking-wider font-mono text-[#06b6d4] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
          LIVE RADAR
        </div>
        
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-8 pl-4">
            {displayItems.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={`/programs/${item.id}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-[#b4c0d4] hover:text-[#e6ecf4] transition-colors font-mono text-[11px]"
              >
                <span className="text-[#3b82f6] font-bold">[{item.ticker}]</span>
                <span className="text-[#e6ecf4] font-semibold">{item.name}</span>
                <span className="text-[#556580]">·</span>
                <span className="text-[#06b6d4]">{item.city}, {item.country}</span>
                <span className="text-[#556580]">·</span>
                <span className="text-[#fbbf24] font-semibold">{item.check}</span>
                <span className="text-[#556580]">·</span>
                {item.isRolling ? (
                  <span className="text-[#22c55e] font-semibold bg-[#22c55e]/10 px-1.5 py-0.5 rounded border border-[#22c55e]/30">ROLLING</span>
                ) : (
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${
                    item.daysLeft <= 7 
                      ? 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30' 
                      : 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30'
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
