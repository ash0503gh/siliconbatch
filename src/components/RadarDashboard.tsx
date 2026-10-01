import React, { useState, useMemo } from 'react';
import DeadlineCountdown from './DeadlineCountdown';

export interface ProgramItem {
  id: string;
  ticker: string;
  name: string;
  organizer: string;
  tagline: string;
  logo: string;
  bannerImage?: string;
  website: string;
  applyUrl: string;
  closingDate: string;
  isRolling: boolean;
  durationWeeks: number;
  cohortStart: string;
  location: {
    city: string;
    state?: string;
    country: string;
    inPerson: boolean;
    residencyDetails: string;
  };
  sectors: string[];
  stage: string;
  terms: {
    checkSizeUsd: number;
    checkDisplay: string;
    instrument: string;
    equityPercent: number | null;
    valuationCapDisplay: string;
    stipend?: string;
    ipOwnership: string;
  };
  hardwareFacilities: string[];
  perks: string[];
  notableAlumni: string[];
  badge?: string;
  daysLeft: number;
  isUrgent: boolean;
}

export default function RadarDashboard({ initialPrograms }: { initialPrograms: ProgramItem[] }) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Europe' | 'North America'>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'In-Person' | 'Remote'>('All');
  const [selectedTerm, setSelectedTerm] = useState<'All' | 'SAFE' | 'Equity' | 'Grant'>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'terminal'>('cards');

  const sectors = [
    'All',
    'Physical AI',
    'Robotics',
    'Silicon & Semiconductors',
    'Advanced Electronics',
    'Frontier AI',
  ];

  // Filter programs based on user controls
  const filtered = useMemo(() => {
    return initialPrograms.filter((p) => {
      // Region filter
      if (selectedRegion === 'Europe') {
        const euCountries = ['Germany', 'France', 'Switzerland', 'UK', 'United Kingdom', 'Sweden', 'Netherlands', 'Estonia'];
        if (!euCountries.includes(p.location.country)) return false;
      }
      if (selectedRegion === 'North America') {
        const naCountries = ['USA', 'United States', 'Canada'];
        if (!naCountries.includes(p.location.country)) return false;
      }

      // Sector filter
      if (selectedSector !== 'All' && !p.sectors.includes(selectedSector)) {
        return false;
      }

      // Format filter
      if (selectedFormat === 'In-Person' && !p.location.inPerson) return false;
      if (selectedFormat === 'Remote' && p.location.inPerson) return false;

      // Terms filter
      if (selectedTerm === 'SAFE' && p.terms.instrument !== 'SAFE') return false;
      if (selectedTerm === 'Equity' && p.terms.instrument !== 'Priced Equity') return false;
      if (selectedTerm === 'Grant' && p.terms.instrument !== 'Non-dilutive Grant') return false;

      // Text search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchOrg = p.organizer.toLowerCase().includes(query);
        const matchTicker = p.ticker.toLowerCase().includes(query);
        const matchCity = p.location.city.toLowerCase().includes(query);
        const matchCountry = p.location.country.toLowerCase().includes(query);
        const matchSectors = p.sectors.some((s) => s.toLowerCase().includes(query));
        const matchHardware = p.hardwareFacilities.some((h) => h.toLowerCase().includes(query));
        if (
          !matchName &&
          !matchOrg &&
          !matchTicker &&
          !matchCity &&
          !matchCountry &&
          !matchSectors &&
          !matchHardware
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialPrograms, search, selectedRegion, selectedSector, selectedFormat, selectedTerm]);

  // Aggregate metrics
  const totalFundingPipeline = useMemo(() => {
    const sum = initialPrograms.reduce((acc, p) => acc + p.terms.checkSizeUsd, 0);
    return `$${(sum / 1_000_000).toFixed(2)}M`;
  }, [initialPrograms]);

  const shortestDeadline = useMemo(() => {
    const timed = initialPrograms.filter((p) => !p.isRolling && p.daysLeft >= 0);
    if (!timed.length) return 'Rolling';
    const sorted = [...timed].sort((a, b) => a.daysLeft - b.daysLeft);
    return `${sorted[0].daysLeft} Days (${sorted[0].ticker})`;
  }, [initialPrograms]);

  // Counts for region pills
  const euCount = useMemo(() => {
    const eu = ['Germany', 'France', 'Switzerland', 'UK', 'United Kingdom', 'Sweden', 'Netherlands', 'Estonia'];
    return initialPrograms.filter(p => eu.includes(p.location.country)).length;
  }, [initialPrograms]);

  const naCount = useMemo(() => {
    const na = ['USA', 'United States', 'Canada'];
    return initialPrograms.filter(p => na.includes(p.location.country)).length;
  }, [initialPrograms]);

  return (
    <div className="w-full">
      {/* ── Metric KPIs (Frontier Foundry Glass) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-7">
        <div className="foundry-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1.5">
            <span className="tracking-wider uppercase text-[10px]">Verified Open Batches</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono tracking-tight">{initialPrograms.length}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">Accepting Applications</div>
        </div>

        <div className="foundry-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1.5">
            <span className="tracking-wider uppercase text-[10px]">Deployable Capital</span>
            <span className="text-amber-400 text-sm">💰</span>
          </div>
          <div className="text-3xl font-black text-amber-300 font-mono tracking-tight">{totalFundingPipeline}</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct Upfront Checks</div>
        </div>

        <div className="foundry-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1.5">
            <span className="tracking-wider uppercase text-[10px]">Next Cohort Deadline</span>
            <span className="text-rose-400 text-sm">⏳</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono tracking-tight">{shortestDeadline}</div>
          <div className="text-[11px] text-slate-400 mt-1">Application Closing Soon</div>
        </div>

        <div className="foundry-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1.5">
            <span className="tracking-wider uppercase text-[10px]">Hardware Focus</span>
            <span className="text-sky-400 text-sm">⚡</span>
          </div>
          <div className="text-3xl font-black text-sky-400 font-mono tracking-tight">Physical AI</div>
          <div className="text-[11px] text-indigo-300 mt-1">Robotics · Silicon · Micro-Fab</div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="foundry-card p-4 mb-7 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar with Linear focus glow */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search programs, cities, or hardware (e.g. SMT, CNC, Cleanroom, H100, SAFE)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white pl-10 pr-20 py-2.5 rounded-xl text-sm placeholder-slate-500 outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-white/10 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⊞ Bento Cards
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                viewMode === 'terminal'
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ☰ Terminal Table
            </button>
          </div>
        </div>

        {/* Sector Tabs with frosted pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sectors.map((sector) => {
            const active = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-glow'
                    : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] border border-white/5'
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Region, Residency & Terms with count badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/5 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Region Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Region:</span>
              <button
                onClick={() => setSelectedRegion('All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedRegion === 'All'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 All ({initialPrograms.length})
              </button>
              <button
                onClick={() => setSelectedRegion('Europe')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedRegion === 'Europe'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇪🇺 Europe ({euCount})
              </button>
              <button
                onClick={() => setSelectedRegion('North America')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                  selectedRegion === 'North America'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇺🇸 N. America ({naCount})
              </button>
            </div>

            {/* Residency Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Format:</span>
              {(['All', 'In-Person', 'Remote'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    selectedFormat === fmt
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Instrument Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Instrument:</span>
              {(['All', 'SAFE', 'Equity', 'Grant'] as const).map((term) => (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                    selectedTerm === term
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            Showing <strong className="text-white">{filtered.length}</strong> of{' '}
            {initialPrograms.length} verified programs
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="foundry-card p-12 text-center my-6">
          <div className="text-4xl mb-3">📡</div>
          <h3 className="text-lg font-bold text-white mb-1">No Matching Open Programs</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
            Try adjusting your search terms or clearing the sector, region, and terms filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedRegion('All');
              setSelectedSector('All');
              setSelectedFormat('All');
              setSelectedTerm('All');
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-mono font-bold hover:bg-indigo-500 transition-colors shadow-glow"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* ── View 1: Bento Cards View (Frontier Foundry Minimalist) ── */}
      {viewMode === 'cards' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const isUrgent = p.daysLeft <= 7 && !p.isRolling;
            return (
              <div
                key={p.id}
                className="foundry-card p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Ticker, Region Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/[0.05] text-indigo-400 border border-white/10">
                        ${p.ticker}
                      </span>
                      {p.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 font-medium">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full ${isUrgent ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
                      <span className={isUrgent ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-medium'}>
                        {p.isRolling ? 'Rolling' : isUrgent ? 'Closing Soon' : 'Verified Open'}
                      </span>
                    </div>
                  </div>

                  {/* Program Title & Host */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                      <a href={`/programs/${p.id}`}>{p.name}</a>
                    </h3>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">by {p.organizer}</div>
                  </div>

                  {/* Location & Format */}
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-4 font-mono">
                    <span className="text-sky-400">📍 {p.location.city}, {p.location.country}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{p.location.inPerson ? 'In-Person Residency' : 'Hybrid / Remote'}</span>
                  </div>

                  {/* Streamlined Financial Strip (Frontier Foundry) */}
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3 mb-4 grid grid-cols-4 gap-2 text-center font-mono">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">Check</div>
                      <div className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">{p.terms.checkDisplay}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">Equity</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {p.terms.equityPercent !== null ? `${p.terms.equityPercent}%` : '0%'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">Duration</div>
                      <div className="text-xs sm:text-sm font-bold text-sky-400 mt-0.5">{p.durationWeeks}w</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500">IP Rights</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">100%</div>
                    </div>
                  </div>

                  {/* Hardware Facility Chips */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                      <span>🛠️ IN-HOUSE HARDWARE LABS</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.hardwareFacilities.slice(0, 3).map((facility, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.03] text-slate-300 border border-white/5"
                        >
                          {facility}
                        </span>
                      ))}
                      {p.hardwareFacilities.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-white/[0.03] text-slate-500">
                          +{p.hardwareFacilities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sector Tags */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {p.sectors.map((sec) => (
                      <span
                        key={sec}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sleek Inline Countdown Banner — Clicking takes to Experience Page */}
                <div>
                  <a
                    href={`/programs/${p.id}`}
                    title="Click to view full Experience Page & Terms"
                    className="block group/clock"
                  >
                    <DeadlineCountdown
                      closingDate={p.closingDate}
                      isRolling={p.isRolling}
                      size="inline"
                      showDetails={false}
                    />
                  </a>

                  {/* Action Link Footer */}
                  <div className="mt-3.5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <a
                      href={`/programs/${p.id}`}
                      className="text-indigo-400 group-hover:text-indigo-300 font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Experience Page</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                    <a
                      href={p.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-amber-300 text-[11px] font-mono transition-colors"
                    >
                      Direct Apply ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── View 2: Terminal Table View ── */}
      {viewMode === 'terminal' && filtered.length > 0 && (
        <div className="foundry-card overflow-hidden font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.03] text-slate-400 border-b border-white/10 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Ticker</th>
                  <th className="py-3 px-4 font-bold">Program & Host</th>
                  <th className="py-3 px-4 font-bold">City / Country</th>
                  <th className="py-3 px-4 font-bold">Check / Instrument</th>
                  <th className="py-3 px-4 font-bold">In-House Labs</th>
                  <th className="py-3 px-4 font-bold">Closing Window</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p) => {
                  const isUrgent = p.daysLeft <= 7 && !p.isRolling;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                      onClick={() => (window.location.href = `/programs/${p.id}`)}
                    >
                      <td className="py-3.5 px-4 font-bold text-indigo-400">
                        ${p.ticker}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{p.organizer}</div>
                      </td>
                      <td className="py-3.5 px-4 text-sky-400">
                        {p.location.city}, {p.location.country}
                        <div className="text-[10px] text-slate-500">
                          {p.location.inPerson ? 'In-Person Residency' : 'Hybrid / Remote'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-amber-300 font-bold">{p.terms.checkDisplay}</span>
                        <div className="text-[10px] text-slate-500">
                          {p.terms.instrument} · {p.terms.equityPercent !== null ? `${p.terms.equityPercent}%` : '0% (Grant)'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">
                        {p.hardwareFacilities.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.isRolling ? (
                          <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
                            ROLLING
                          </span>
                        ) : (
                          <span
                            className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold tabular-nums ${
                              isUrgent
                                ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                                : 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20'
                            }`}
                          >
                            ⏳ {p.daysLeft}d left
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`/programs/${p.id}`}
                          className="inline-block px-3 py-1 bg-white/[0.05] hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg font-bold transition-all shadow-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View →
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
