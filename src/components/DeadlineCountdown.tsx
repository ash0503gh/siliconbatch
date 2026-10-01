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
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[11px] font-semibold tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Rolling Applications Open</span>
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 font-mono text-[11px] font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        <span>Applications Closed</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days <= 7;

  // Option 1: Frontier Foundry Inline Pill for Bento Cards
  if (size === 'inline' || size === 'sm' || size === 'md') {
    return (
      <div
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border font-mono text-xs transition-all ${
          isUrgent
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 hover:bg-rose-500/15'
            : 'bg-indigo-500/10 border-indigo-500/25 text-indigo-200 hover:bg-indigo-500/15'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isUrgent ? 'bg-rose-400' : 'bg-indigo-400'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isUrgent ? 'bg-rose-500' : 'bg-indigo-500'
              }`}
            ></span>
          </span>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            {isUrgent ? 'Closing Soon' : 'Application Window'}
          </span>
        </div>

        <div className="flex items-center gap-1 font-bold tabular-nums">
          <span className={isUrgent ? 'text-rose-400' : 'text-white'}>
            {timeLeft.days}d
          </span>
          <span className="text-slate-500">:</span>
          <span className={isUrgent ? 'text-rose-400' : 'text-slate-300'}>
            {String(timeLeft.hours).padStart(2, '0')}h
          </span>
          <span className="text-slate-500">:</span>
          <span className={isUrgent ? 'text-rose-400' : 'text-slate-300'}>
            {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
        </div>
      </div>
    );
  }

  // Full Hero Glass Countdown (for Experience Page)
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-2xl border font-mono backdrop-blur-xl ${
        isUrgent
          ? 'bg-rose-950/20 border-rose-500/30 text-rose-300 shadow-glow-rose'
          : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200 shadow-glow'
      }`}
    >
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1">
        <span className="flex items-center gap-2 text-slate-300">
          <span
            className={`w-2 h-2 rounded-full ${
              isUrgent ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'
            }`}
          ></span>
          <span>Application Countdown</span>
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            isUrgent ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}
        >
          {isUrgent ? '⚡ Urgent Closing' : '🟢 Accepting Cohort'}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center my-1">
        <div className="bg-slate-900/80 rounded-xl p-2.5 border border-white/10">
          <div className="text-2xl font-black tracking-tight text-white tabular-nums">
            {timeLeft.days}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">Days</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-2.5 border border-white/10">
          <div className="text-2xl font-black tracking-tight text-white tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">Hours</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-2.5 border border-white/10">
          <div className="text-2xl font-black tracking-tight text-white tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">Mins</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-2.5 border border-white/10">
          <div className="text-2xl font-black tracking-tight text-white tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">Secs</div>
        </div>
      </div>

      {showDetails && (
        <div className="text-[11px] text-slate-400 text-center mt-1">
          Final deadline:{' '}
          <strong className="text-white font-semibold">
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
