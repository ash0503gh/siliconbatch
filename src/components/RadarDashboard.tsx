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
  }, [initialPrograms, search, selectedSector, selectedFormat, selectedTerm]);

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

  return (
    <div className="w-full">
      {/* ── Metric KPIs (Stockdash Style) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#556580] text-xs font-mono mb-1">
            <span>ACTIVE OPEN BATCHES</span>
            <span>🟢</span>
          </div>
          <div className="text-2xl font-black text-[#e6ecf4] font-mono">{initialPrograms.length}</div>
          <div className="text-[11px] text-[#22c55e] font-semibold mt-1">Verified Open Today</div>
        </div>

        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#556580] text-xs font-mono mb-1">
            <span>CAPITAL PIPELINE</span>
            <span>💰</span>
          </div>
          <div className="text-2xl font-black text-[#fbbf24] font-mono">{totalFundingPipeline}</div>
          <div className="text-[11px] text-[#b4c0d4] mt-1">Total Upfront Checks</div>
        </div>

        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#556580] text-xs font-mono mb-1">
            <span>NEXT CLOSING DEADLINE</span>
            <span>⏳</span>
          </div>
          <div className="text-2xl font-black text-[#ef4444] font-mono">{shortestDeadline}</div>
          <div className="text-[11px] text-[#b4c0d4] mt-1">Expiring first</div>
        </div>

        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#556580] text-xs font-mono mb-1">
            <span>DOMAIN FOCUS</span>
            <span>⚡</span>
          </div>
          <div className="text-2xl font-black text-[#06b6d4] font-mono">Physical AI</div>
          <div className="text-[11px] text-[#a78bfa] mt-1">Robotics · Silicon · Electronics</div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-4 mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#556580] text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by program, city, country, or hardware (e.g. SMT, CNC, GPU)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#131a28] border border-[#1b2540] focus:border-[#3b82f6] text-[#e6ecf4] pl-10 pr-4 py-2.5 rounded-lg text-sm placeholder-[#556580] outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#556580] hover:text-[#e6ecf4] text-xs bg-[#1b2540] px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#131a28] border border-[#1b2540] rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-[#b4c0d4] hover:text-[#e6ecf4]'
              }`}
            >
              ⊞ Bento Cards
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors ${
                viewMode === 'terminal'
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-[#b4c0d4] hover:text-[#e6ecf4]'
              }`}
            >
              ☰ Terminal Table
            </button>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sectors.map((sector) => {
            const active = selectedSector === sector;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#3b82f6] text-white shadow'
                    : 'bg-[#131a28] text-[#b4c0d4] hover:bg-[#182238] border border-[#1b2540]'
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Residency & Terms */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1b2540]/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#556580] font-mono">Residency:</span>
            {(['All', 'In-Person', 'Remote'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40 font-bold'
                    : 'text-[#b4c0d4] hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#556580] font-mono">Instrument:</span>
            {(['All', 'SAFE', 'Equity', 'Grant'] as const).map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  selectedTerm === term
                    ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40 font-bold'
                    : 'text-[#b4c0d4] hover:text-white'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          <div className="text-[#556580] font-mono text-[11px]">
            Showing <span className="text-[#e6ecf4] font-bold">{filtered.length}</span> of{' '}
            {initialPrograms.length} verified programs
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl p-12 text-center my-6">
          <div className="text-4xl mb-3">📡</div>
          <h3 className="text-lg font-bold text-[#e6ecf4] mb-1">No Matching Open Programs</h3>
          <p className="text-sm text-[#556580] max-w-md mx-auto mb-4">
            Try adjusting your search terms or clearing the sector and terms filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedSector('All');
              setSelectedFormat('All');
              setSelectedTerm('All');
            }}
            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg text-xs font-mono font-bold hover:bg-[#2563eb] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* ── View 1: Bento Cards View ── */}
      {viewMode === 'cards' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const isUrgent = p.daysLeft <= 7 && !p.isRolling;
            return (
              <div
                key={p.id}
                className="bg-[#0c1018] border border-[#1b2540] hover:border-[#2a3a5c] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#06b6d4]/5 group"
              >
                <div>
                  {/* Top Bar: Ticker & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#131a28] text-[#3b82f6] border border-[#1b2540]">
                        ${p.ticker}
                      </span>
                      {p.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/30 font-bold">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-[#ef4444]' : 'bg-[#22c55e]'} animate-pulse`}></span>
                      <span className={isUrgent ? 'text-[#ef4444] font-bold' : 'text-[#22c55e]'}>
                        {p.isRolling ? 'Rolling' : isUrgent ? 'Closing Soon' : 'Open'}
                      </span>
                    </div>
                  </div>

                  {/* Program Title & Host */}
                  <div className="mb-3">
                    <h3 className="text-xl font-black text-[#e6ecf4] group-hover:text-[#3b82f6] transition-colors leading-tight">
                      <a href={`/programs/${p.id}`}>{p.name}</a>
                    </h3>
                    <div className="text-xs text-[#556580] font-medium mt-0.5">by {p.organizer}</div>
                  </div>

                  {/* Location & Format */}
                  <div className="flex items-center gap-2 text-xs text-[#b4c0d4] mb-4 font-mono">
                    <span className="text-[#06b6d4]">📍 {p.location.city}, {p.location.country}</span>
                    <span className="text-[#556580]">·</span>
                    <span className="text-[#b4c0d4]">{p.location.inPerson ? 'In-Person Residency' : 'Hybrid / Remote'}</span>
                  </div>

                  {/* Terms & Valuation Strip */}
                  <div className="bg-[#131a28] border border-[#1b2540] rounded-lg p-3 mb-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#556580]">Check</div>
                      <div className="text-sm font-bold text-[#fbbf24] font-mono">{p.terms.checkDisplay}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#556580]">Equity</div>
                      <div className="text-sm font-bold text-[#e6ecf4] font-mono">
                        {p.terms.equityPercent !== null ? `${p.terms.equityPercent}%` : '0% (Grant)'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#556580]">Duration</div>
                      <div className="text-sm font-bold text-[#06b6d4] font-mono">{p.durationWeeks} Wks</div>
                    </div>
                  </div>

                  {/* Hardware Facility Chips */}
                  <div className="mb-4">
                    <div className="text-[10px] uppercase font-mono text-[#556580] mb-1.5 flex items-center gap-1">
                      <span>🛠️ LABS & FACILITIES</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.hardwareFacilities.slice(0, 3).map((facility, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#131a28] text-[#b4c0d4] border border-[#1b2540]"
                        >
                          {facility}
                        </span>
                      ))}
                      {p.hardwareFacilities.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#131a28] text-[#556580]">
                          +{p.hardwareFacilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sectors */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {p.sectors.map((sec) => (
                      <span
                        key={sec}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 font-medium"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Banner Closing Date — Click takes to Experience Page */}
                <div>
                  <a
                    href={`/programs/${p.id}`}
                    title="Click to view full Experience Page & Terms"
                    className="block hover:opacity-95 transition-opacity"
                  >
                    <DeadlineCountdown
                      closingDate={p.closingDate}
                      isRolling={p.isRolling}
                      size="md"
                      showDetails={true}
                    />
                  </a>

                  {/* Action Link */}
                  <div className="mt-3 pt-3 border-t border-[#1b2540] flex items-center justify-between text-xs">
                    <a
                      href={`/programs/${p.id}`}
                      className="text-[#3b82f6] group-hover:text-[#60a5fa] font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Experience Page</span>
                      <span>→</span>
                    </a>
                    <a
                      href={p.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#556580] hover:text-[#fbbf24] text-[11px] font-mono transition-colors"
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

      {/* ── View 2: Terminal Table View (Stockdash Classic) ── */}
      {viewMode === 'terminal' && filtered.length > 0 && (
        <div className="bg-[#0c1018] border border-[#1b2540] rounded-xl overflow-hidden font-mono text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#131a28] text-[#556580] border-b border-[#1b2540] text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Ticker</th>
                  <th className="py-3 px-4 font-bold">Program & Host</th>
                  <th className="py-3 px-4 font-bold">City / Country</th>
                  <th className="py-3 px-4 font-bold">Check / Terms</th>
                  <th className="py-3 px-4 font-bold">Key Hardware</th>
                  <th className="py-3 px-4 font-bold">Closing Countdown</th>
                  <th className="py-3 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b2540]">
                {filtered.map((p) => {
                  const isUrgent = p.daysLeft <= 7 && !p.isRolling;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#131a28]/60 transition-colors group cursor-pointer"
                      onClick={() => (window.location.href = `/programs/${p.id}`)}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#3b82f6]">
                        ${p.ticker}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#e6ecf4] group-hover:text-[#3b82f6] transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-[#556580]">{p.organizer}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#06b6d4]">
                        {p.location.city}, {p.location.country}
                        <div className="text-[10px] text-[#556580]">
                          {p.location.inPerson ? 'In-Person' : 'Hybrid'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[#fbbf24] font-bold">{p.terms.checkDisplay}</span>
                        <div className="text-[10px] text-[#556580]">
                          {p.terms.instrument} · {p.terms.equityPercent !== null ? `${p.terms.equityPercent}%` : '0%'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#b4c0d4] max-w-[200px] truncate">
                        {p.hardwareFacilities.slice(0, 2).join(', ')}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.isRolling ? (
                          <span className="text-[#22c55e] font-semibold bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/30">
                            ROLLING
                          </span>
                        ) : (
                          <span
                            className={`px-2 py-0.5 rounded border font-semibold ${
                              isUrgent
                                ? 'text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30'
                                : 'text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/30'
                            }`}
                          >
                            ⏳ {p.daysLeft}d left
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`/programs/${p.id}`}
                          className="inline-block px-3 py-1 bg-[#1b2540] hover:bg-[#3b82f6] text-[#e6ecf4] hover:text-white rounded font-bold transition-colors"
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
