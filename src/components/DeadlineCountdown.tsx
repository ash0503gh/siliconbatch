import React, { useState, useEffect } from 'react';

interface CountdownProps {
  closingDate: string;
  isRolling?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function DeadlineCountdown({
  closingDate,
  isRolling = false,
  size = 'md',
  showDetails = true,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    if (isRolling) return;

    function calculate() {
      const target = new Date(closingDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [closingDate, isRolling]);

  if (isRolling) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-mono text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
        <span>Rolling Applications Active</span>
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] font-mono text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
        <span>Applications Closed</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days <= 7;
  const colorStyles = isUrgent
    ? {
        bg: 'bg-[#ef4444]/10',
        border: 'border-[#ef4444]/30',
        text: 'text-[#ef4444]',
        label: 'text-[#ef4444]/80',
        badge: 'bg-[#ef4444]/20 text-[#ef4444]',
      }
    : {
        bg: 'bg-[#06b6d4]/10',
        border: 'border-[#06b6d4]/30',
        text: 'text-[#06b6d4]',
        label: 'text-[#06b6d4]/80',
        badge: 'bg-[#06b6d4]/20 text-[#06b6d4]',
      };

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs font-bold ${colorStyles.bg} ${colorStyles.border} border ${colorStyles.text}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
        <span>
          {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m left
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 p-3 rounded-lg border font-mono ${colorStyles.bg} ${colorStyles.border}`}>
      <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase mb-1">
        <span className="flex items-center gap-1.5 text-[#b4c0d4]">
          <span className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-[#ef4444]' : 'bg-[#06b6d4]'} animate-pulse`}></span>
          Application Deadline
        </span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${colorStyles.badge}`}>
          {isUrgent ? '⚡ CLOSING SOON' : '🟢 OPEN'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-[#0c1018]/80 rounded p-1.5 border border-[#1b2540]">
          <div className={`text-xl font-black ${colorStyles.text}`}>{timeLeft.days}</div>
          <div className="text-[9px] uppercase tracking-wider text-[#556580]">Days</div>
        </div>
        <div className="bg-[#0c1018]/80 rounded p-1.5 border border-[#1b2540]">
          <div className={`text-xl font-black ${colorStyles.text}`}>{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-wider text-[#556580]">Hours</div>
        </div>
        <div className="bg-[#0c1018]/80 rounded p-1.5 border border-[#1b2540]">
          <div className={`text-xl font-black ${colorStyles.text}`}>{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-wider text-[#556580]">Mins</div>
        </div>
        <div className="bg-[#0c1018]/80 rounded p-1.5 border border-[#1b2540]">
          <div className={`text-xl font-black ${colorStyles.text}`}>{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-wider text-[#556580]">Secs</div>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-1 text-[11px] text-[#556580] text-center">
          Closes {new Date(closingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  );
}
