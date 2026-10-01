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
  const [activeTab, setActiveTab] = useState<'All' | 'US/Canada' | 'Europe' | 'Rolling' | 'Urgent'>('All');
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

  const euCountries = useMemo(
    () => ['Germany', 'France', 'Switzerland', 'UK', 'United Kingdom', 'Sweden', 'Netherlands', 'Estonia'],
    []
  );

  const naCountries = useMemo(
    () => ['USA', 'United States', 'Canada'],
    []
  );

  // Filter programs based on user controls
  const filtered = useMemo(() => {
    return initialPrograms.filter((p) => {
      // Primary Tab Filter (All, US/Canada, Europe, Rolling, Urgent)
      if (activeTab === 'US/Canada' && !naCountries.includes(p.location.country)) {
        return false;
      }
      if (activeTab === 'Europe' && !euCountries.includes(p.location.country)) {
        return false;
      }
      if (activeTab === 'Rolling' && !p.isRolling) {
        return false;
      }
      if (activeTab === 'Urgent' && (p.isRolling || p.daysLeft > 7 || p.daysLeft < 0)) {
        return false;
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
  }, [initialPrograms, search, activeTab, selectedSector, selectedFormat, selectedTerm, naCountries, euCountries]);

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

  // Counts for pills
  const euCount = useMemo(() => {
    return initialPrograms.filter((p) => euCountries.includes(p.location.country)).length;
  }, [initialPrograms, euCountries]);

  const naCount = useMemo(() => {
    return initialPrograms.filter((p) => naCountries.includes(p.location.country)).length;
  }, [initialPrograms, naCountries]);

  const rollingCount = useMemo(() => {
    return initialPrograms.filter((p) => p.isRolling).length;
  }, [initialPrograms]);

  const urgentCount = useMemo(() => {
    return initialPrograms.filter((p) => !p.isRolling && p.daysLeft <= 7 && p.daysLeft >= 0).length;
  }, [initialPrograms]);

  return (
    <div className="w-full text-black">
      {/* ── KPI Summary Cards (4 pop color-blocked cards: Yellow, Blue, Mint, Coral) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Card 1: Yellow */}
        <div className="bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Open Batches</span>
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">{initialPrograms.length}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">⚡ Accepting Apps</div>
        </div>

        {/* Card 2: Cobalt Blue */}
        <div className="bg-[#3B82F6] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3 sm:p-4 rounded-xl text-white flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5 text-white">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Funding Pipeline</span>
            <span className="text-xs sm:text-sm">💰</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">{totalFundingPipeline}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-white/90 truncate">Direct Checks</div>
        </div>

        {/* Card 3: Mint Green */}
        <div className="bg-[#34D399] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Next Deadline</span>
            <span className="text-xs sm:text-sm">⏳</span>
          </div>
          <div className="text-xl sm:text-3xl font-black font-mono tracking-tight truncate">{shortestDeadline}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">Closing Soon</div>
        </div>

        {/* Card 4: Coral Pink */}
        <div className="bg-[#FF5E7E] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Hardware Focus</span>
            <span className="text-xs sm:text-sm">🦾</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight truncate">Physical AI</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">Robotics · Cleanroom</div>
        </div>
      </div>

      {/* ── Search & Filter Controls (Neo-Brutal Card) ── */}
      <div className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#000] mb-8 space-y-4 sm:space-y-5">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm sm:text-base">🔍</span>
            <input
              type="text"
              placeholder="Search programs, cities, or hardware (SMT, CNC, Cleanroom, SAFE)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black placeholder:text-slate-500 font-mono rounded-xl pl-10 sm:pl-11 pr-16 sm:pr-20 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_#000] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-mono font-bold bg-slate-200 hover:bg-slate-300 text-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-black shadow-[1px_1px_0px_#000]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('programs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-[#FF5E7E] hover:bg-[#FB7185] border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-mono text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>FIND PROGRAMS →</span>
          </button>

          {/* View Toggle */}
          <div className="w-full sm:w-auto flex items-center justify-center bg-[#F4EFE6] border-2 border-black rounded-xl p-1 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all text-center ${
                viewMode === 'cards'
                  ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                  : 'text-black hover:bg-yellow-200'
              }`}
            >
              ⊞ Bento Cards
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all text-center ${
                viewMode === 'terminal'
                  ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                  : 'text-black hover:bg-yellow-200'
              }`}
            >
              ☰ Terminal Table
            </button>
          </div>
        </div>

        {/* Filter Tabs (All, US/Canada, Europe, Rolling, Urgent) */}
        <div>
          <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>⚡ PIPELINE FILTER TABS:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
            {(['All', 'US/Canada', 'Europe', 'Rolling', 'Urgent'] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                    active
                      ? 'bg-black text-white border-2 border-black shadow-[3px_3px_0px_#000] font-bold'
                      : 'bg-white text-black border-2 border-black hover:bg-yellow-200 shadow-[2px_2px_0px_#000] font-medium'
                  }`}
                >
                  {tab === 'All' && `🌐 All (${initialPrograms.length})`}
                  {tab === 'US/Canada' && `🇺🇸 US / Canada (${naCount})`}
                  {tab === 'Europe' && `🇪🇺 Europe (${euCount})`}
                  {tab === 'Rolling' && `🔄 Rolling (${rollingCount})`}
                  {tab === 'Urgent' && `⚡ Urgent (${urgentCount})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="text-xs font-mono font-bold text-black uppercase tracking-wider whitespace-nowrap">
            Domain:
          </span>
          {sectors.map((sector) => {
            const active = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  active
                    ? 'bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-bold'
                    : 'bg-white text-black border border-black hover:bg-slate-100 shadow-[1px_1px_0px_#000] font-medium'
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Format, Instrument & Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t-2 border-black/10 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Format:</span>
              {(['All', 'In-Person', 'Remote'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all ${
                    selectedFormat === fmt
                      ? 'bg-[#2563EB] text-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold'
                      : 'bg-white text-black border border-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Terms:</span>
              {(['All', 'SAFE', 'Equity', 'Grant'] as const).map((term) => (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono transition-all ${
                    selectedTerm === term
                      ? 'bg-[#34D399] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-bold'
                      : 'bg-white text-black border border-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="font-bold text-black bg-yellow-200 border border-black px-2.5 py-1 rounded-lg shadow-[1px_1px_0px_#000] text-[11px] sm:text-xs text-center sm:text-left self-start sm:self-auto">
            Showing <strong>{filtered.length}</strong> of {initialPrograms.length} verified cohorts
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white border-[2.5px] border-black rounded-2xl p-12 text-center my-6 shadow-[5px_5px_0px_#000]">
          <div className="text-5xl mb-3">📡</div>
          <h3 className="text-xl font-black text-black mb-2">No Matching Open Programs Found</h3>
          <p className="text-sm font-medium text-slate-700 max-w-md mx-auto mb-5">
            Try adjusting your search query, or clear the active region, sector, or deal instrument filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveTab('All');
              setSelectedSector('All');
              setSelectedFormat('All');
              setSelectedTerm('All');
            }}
            className="px-5 py-2.5 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-xl text-xs font-mono font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all uppercase"
          >
            Reset All Filters ↺
          </button>
        </div>
      )}

      {/* ── View 1: Program Bento Cards ── */}
      <div id="programs-section">
        {viewMode === 'cards' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((p) => {
              const isUrgent = p.daysLeft <= 7 && !p.isRolling && p.daysLeft >= 0;
              return (
                <div
                  key={p.id}
                  className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar: Ticker Pill, Badge & Urgency Status */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs">
                          ${p.ticker}
                        </span>
                        {p.badge && (
                          <span className="bg-[#FF5E7E] text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold">
                            {p.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-black ${
                            isUrgent ? 'bg-[#FF5E7E] animate-ping' : 'bg-[#34D399]'
                          }`}
                        ></span>
                        <span
                          className={`px-2 py-0.5 rounded-md border border-black font-bold text-[10px] uppercase ${
                            p.isRolling
                              ? 'bg-[#34D399] text-black'
                              : isUrgent
                              ? 'bg-[#FF5E7E] text-black animate-pulse'
                              : 'bg-slate-100 text-black'
                          }`}
                        >
                          {p.isRolling ? 'Rolling' : isUrgent ? 'Closing Soon' : 'Verified Open'}
                        </span>
                      </div>
                    </div>

                    {/* Program Title & Host */}
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-black text-black group-hover:text-[#2563EB] transition-colors leading-tight break-words">
                        <a href={`/programs/${p.id}`}>{p.name}</a>
                      </h3>
                      <div className="text-[11px] sm:text-xs font-mono font-bold text-slate-600 mt-1 uppercase tracking-wider">
                        by {p.organizer}
                      </div>
                    </div>

                    {/* Location & Format */}
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 mb-4">
                      <span className="bg-[#93C5FD] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                        📍 {p.location.city}, {p.location.country}
                      </span>
                      <span>·</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                        {p.location.inPerson ? 'In-Person Residency' : 'Hybrid / Remote'}
                      </span>
                    </div>

                    {/* Large Bold Check Size Financial Strip */}
                    <div className="bg-[#F7F2E8] border-2 border-black rounded-xl p-3.5 mb-4 shadow-[2px_2px_0px_#000]">
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="text-lg sm:text-xl font-black text-black font-mono">
                          {p.terms.checkDisplay}
                        </div>
                        <div className="text-xs font-mono font-black text-black bg-[#FFE600] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          {p.terms.equityPercent !== null ? `${p.terms.equityPercent}% Equity` : '0% (Grant)'}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/15 text-center font-mono">
                        <div>
                          <div className="text-[9px] uppercase font-bold text-slate-600">Instrument</div>
                          <div className="text-xs font-black text-black mt-0.5 truncate">{p.terms.instrument}</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase font-bold text-slate-600">Duration</div>
                          <div className="text-xs font-black text-[#2563EB] mt-0.5">{p.durationWeeks} Weeks</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase font-bold text-slate-600">Founder IP</div>
                          <div className="text-xs font-black text-[#10B981] mt-0.5">100% Retained</div>
                        </div>
                      </div>
                    </div>

                    {/* Hardware Facilities Tags: Clean rounded sticker tags */}
                    <div className="mb-4">
                      <div className="text-[11px] font-mono font-black tracking-wider text-black mb-2 flex items-center gap-1.5 uppercase">
                        <span>🛠️ In-House Hardware Labs:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.hardwareFacilities.slice(0, 3).map((facility, idx) => (
                          <span
                            key={idx}
                            className="border border-black bg-slate-100 font-mono text-[11px] text-black font-medium px-2.5 py-1 rounded-lg shadow-[1px_1px_0px_#000]"
                          >
                            {facility}
                          </span>
                        ))}
                        {p.hardwareFacilities.length > 3 && (
                          <span className="border border-black bg-yellow-200 font-mono text-[10px] text-black font-bold px-2 py-1 rounded-lg shadow-[1px_1px_0px_#000]">
                            +{p.hardwareFacilities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Sector Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.sectors.map((sec) => (
                        <span
                          key={sec}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-black border border-black shadow-[1px_1px_0px_#000]"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Countdown & Action Buttons */}
                  <div className="pt-2">
                    <a
                      href={`/programs/${p.id}`}
                      title="Click to view full Experience Page & Terms"
                      className="block group/clock mb-3"
                    >
                      <DeadlineCountdown
                        closingDate={p.closingDate}
                        isRolling={p.isRolling}
                        size="inline"
                        showDetails={false}
                      />
                    </a>

                    {/* Action button "View Terms & Hardware →" in Cobalt Blue or Yellow with border-2 border-black shadow-[3px_3px_0px_#000] font-bold text-black */}
                    <div className="space-y-2">
                      <a
                        href={`/programs/${p.id}`}
                        className="w-full py-3 px-4 bg-[#FFE600] hover:bg-[#FACC15] text-black font-mono font-bold text-xs text-center rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-1.5 uppercase"
                      >
                        <span>View Terms & Hardware →</span>
                      </a>

                      <div className="flex items-center justify-between text-[11px] font-mono px-1">
                        <span className="text-slate-600 font-bold">Residency: {p.location.city}</span>
                        <a
                          href={p.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black font-bold underline hover:text-[#2563EB] transition-colors"
                        >
                          Direct Apply ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── View 2: Terminal Table View ── */}
      {viewMode === 'terminal' && filtered.length > 0 && (
        <div className="bg-white border-[2.5px] border-black rounded-2xl overflow-hidden shadow-[5px_5px_0px_#000] font-mono text-xs text-black">
          <div className="sm:hidden px-3.5 py-2 bg-[#FFE600] text-black text-[10px] font-black uppercase tracking-wider border-b-2 border-black flex items-center justify-between">
            <span>← Swipe horizontally to view full metrics →</span>
            <span>📊</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFE600] text-black border-b-2 border-black text-[11px] uppercase font-black tracking-wider">
                  <th className="py-3.5 px-4 font-black">Ticker</th>
                  <th className="py-3.5 px-4 font-black">Program & Host</th>
                  <th className="py-3.5 px-4 font-black">Location</th>
                  <th className="py-3.5 px-4 font-black">Check / Instrument</th>
                  <th className="py-3.5 px-4 font-black">In-House Labs</th>
                  <th className="py-3.5 px-4 font-black">Closing Window</th>
                  <th className="py-3.5 px-4 font-black text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y border-black">
                {filtered.map((p) => {
                  const isUrgent = p.daysLeft <= 7 && !p.isRolling && p.daysLeft >= 0;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-yellow-50 transition-colors group cursor-pointer border-b border-black/10"
                      onClick={() => (window.location.href = `/programs/${p.id}`)}
                    >
                      <td className="py-3.5 px-4 font-black">
                        <span className="bg-[#F4EFE6] border border-black shadow-[1px_1px_0px_#000] px-2 py-0.5 rounded text-xs font-bold text-black inline-block">
                          ${p.ticker}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-black text-black group-hover:text-[#2563EB] transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-600 font-bold uppercase">{p.organizer}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-black">
                        📍 {p.location.city}, {p.location.country}
                        <div className="text-[10px] text-slate-600 font-normal">
                          {p.location.inPerson ? 'In-Person Residency' : 'Hybrid / Remote'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-black text-black">{p.terms.checkDisplay}</span>
                        <div className="text-[10px] text-slate-600 font-bold">
                          {p.terms.instrument} · {p.terms.equityPercent !== null ? `${p.terms.equityPercent}%` : '0%'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 max-w-[200px] truncate font-medium">
                        {p.hardwareFacilities.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.isRolling ? (
                          <span className="bg-[#34D399] text-black font-bold px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] text-[10px]">
                            ROLLING
                          </span>
                        ) : (
                          <span
                            className={`px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] text-[10px] font-bold tabular-nums ${
                              isUrgent ? 'bg-[#FF5E7E] text-black animate-pulse' : 'bg-[#93C5FD] text-black'
                            }`}
                          >
                            ⏳ {p.daysLeft}d left
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`/programs/${p.id}`}
                          className="inline-block px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all text-xs"
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
