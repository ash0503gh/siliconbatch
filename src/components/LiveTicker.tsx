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
    <div className="w-full bg-black text-white border-y-2 border-black overflow-hidden py-2 select-none relative z-20">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-3.5 py-1 bg-[#FFE600] text-black border-r-2 border-black flex items-center gap-2 z-10 text-[10px] uppercase tracking-wider font-mono font-black">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          LIVE RADAR
        </div>
        
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-6 pl-4">
            {displayItems.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={`/programs/${item.id}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-white hover:text-[#FFE600] transition-colors font-mono text-xs group"
              >
                <span className="text-[#FFE600] font-bold text-xs select-none">✦</span>
                <span className="text-[#FFE600] font-black group-hover:underline">
                  ${item.ticker}
                </span>
                <span className="text-white font-bold">{item.name}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-slate-300">{item.city}, {item.country}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-[#10B981] font-black tracking-wide">
                  ▲ {item.check}
                </span>
                <span className="text-neutral-600">·</span>
                {item.isRolling ? (
                  <span className="text-black font-black bg-[#10B981] px-2 py-0.5 rounded text-[10px] border border-black shadow-[1px_1px_0px_#fff]">
                    ROLLING
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black tabular-nums border border-black shadow-[1px_1px_0px_#fff] ${
                    item.daysLeft <= 7 
                      ? 'text-black bg-[#FF5E7E]' 
                      : 'text-black bg-[#FFE600]'
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
