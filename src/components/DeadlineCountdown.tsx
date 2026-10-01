import React, { useState, useEffect } from 'react';

interface CountdownProps {
  closingDate: string;
  isRolling?: boolean;
  size?: 'inline' | 'sm' | 'md' | 'lg';
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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10B981] border-2 border-black text-black font-mono text-[11px] font-black shadow-[2px_2px_0px_#000] tracking-wide">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
        <span>Rolling Applications Open</span>
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-200 border-2 border-black text-slate-800 font-mono text-[11px] font-black shadow-[2px_2px_0px_#000]">
        <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
        <span>Applications Closed</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days <= 7;

  // Neo-Brutal Inline Pill for Bento Cards
  if (size === 'inline' || size === 'sm' || size === 'md') {
    return (
      <div
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 border-black font-mono text-xs shadow-[2px_2px_0px_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] ${
          isUrgent
            ? 'bg-[#FF5E7E] text-black'
            : 'bg-white text-black'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isUrgent ? 'bg-black' : 'bg-emerald-500'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-black ${
                isUrgent ? 'bg-black' : 'bg-emerald-500'
              }`}
            ></span>
          </span>
          <span className="text-[11px] font-black tracking-wider uppercase">
            {isUrgent ? '⚡ Urgent Closing' : '⏳ Application Window'}
          </span>
        </div>

        <div className="flex items-center gap-1 font-black tabular-nums bg-white/70 px-2 py-0.5 rounded-md border border-black text-black">
          <span>{timeLeft.days}d</span>
          <span className="text-black/50">:</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span className="text-black/50">:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        </div>
      </div>
    );
  }

  // Full Hero Neo-Brutal Countdown (for Experience Page)
  return (
    <div
      className={`flex flex-col gap-3 p-4 sm:p-5 rounded-2xl border-[2.5px] border-black font-mono shadow-[4px_4px_0px_#000] ${
        isUrgent ? 'bg-[#FFF1F2]' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider mb-1">
        <span className="flex items-center gap-2 text-black">
          <span
            className={`w-2.5 h-2.5 rounded-full border border-black ${
              isUrgent ? 'bg-[#FF5E7E] animate-ping' : 'bg-[#10B981] animate-pulse'
            }`}
          ></span>
          <span>Application Countdown</span>
        </span>
        <span
          className={`text-[11px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] ${
            isUrgent ? 'bg-[#FF5E7E] text-black' : 'bg-[#FFE600] text-black'
          }`}
        >
          {isUrgent ? '⚡ Urgent Closing' : '🟢 Accepting Cohort'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center my-1">
        <div className="bg-[#F7F2E8] rounded-xl p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
          <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-black tabular-nums">
            {timeLeft.days}
          </div>
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest font-black text-slate-800 mt-0.5 sm:mt-1">Days</div>
        </div>
        <div className="bg-[#F7F2E8] rounded-xl p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
          <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-black tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest font-black text-slate-800 mt-0.5 sm:mt-1">Hours</div>
        </div>
        <div className="bg-[#F7F2E8] rounded-xl p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
          <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-black tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest font-black text-slate-800 mt-0.5 sm:mt-1">Mins</div>
        </div>
        <div className="bg-[#F7F2E8] rounded-xl p-2 sm:p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
          <div className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-black tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest font-black text-slate-800 mt-0.5 sm:mt-1">Secs</div>
        </div>
      </div>

      {showDetails && (
        <div className="text-xs font-bold text-slate-700 text-center mt-1 border-t-2 border-black/10 pt-2.5">
          Final deadline:{' '}
          <strong className="text-black font-black underline decoration-[#FFE600] decoration-4">
            {new Date(closingDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </strong>
        </div>
      )}
    </div>
  );
}
