import React, { useState, useMemo } from 'react';

export interface CompanyItem {
  id: string;
  ticker: string;
  name: string;
  batch: string;
  tagline: string;
  logo: string;
  bannerImage?: string;
  website: string;
  careersUrl?: string;
  demoUrl?: string;
  stage: string;
  totalRaised: string;
  sectors: string[];
  location: {
    city: string;
    state?: string;
    country: string;
  };
  founders: string[];
  hiring: boolean;
  openRolesCount: number;
  techStack: string[];
  badge?: string;
}

function parseFunding(str: string): number {
  if (!str) return 0;
  const numMatch = str.match(/[\d.]+/);
  if (!numMatch) return 0;
  const val = parseFloat(numMatch[0]);
  const upper = str.toUpperCase();
  if (upper.includes('B')) return val * 1_000_000_000;
  if (upper.includes('M')) return val * 1_000_000;
  if (upper.includes('K')) return val * 1_000;
  return val;
}

function formatTotalFunding(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B+`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)}M+`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K+`;
  }
  return `$${amount}`;
}

export default function CompaniesDashboard({ initialCompanies }: { initialCompanies: CompanyItem[] }) {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedBatch, setSelectedBatch] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [hiringOnly, setHiringOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const sectorOptions = [
    'All',
    'AI',
    'Robotics & Hardware',
    'DevTools',
    'B2B SaaS',
    'Biotech',
    'FinTech',
  ];

  const batchOptions = ['All', 'W24', 'S24', 'W25', 'Earlier'];
  const stageOptions = ['All', 'Seed', 'Series A', 'Series B+'];

  // Metrics calculations
  const totalFundingRaised = useMemo(() => {
    const sum = initialCompanies.reduce((acc, c) => acc + parseFunding(c.totalRaised), 0);
    return formatTotalFunding(sum);
  }, [initialCompanies]);

  const hiringStats = useMemo(() => {
    const hiringCompanies = initialCompanies.filter((c) => c.hiring || c.openRolesCount > 0);
    const count = hiringCompanies.length;
    const rate = initialCompanies.length > 0 ? Math.round((count / initialCompanies.length) * 100) : 0;
    return { count, rate };
  }, [initialCompanies]);

  const topSectors = useMemo(() => {
    const counts: Record<string, number> = {};
    initialCompanies.forEach((c) => {
      c.sectors.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length >= 2) {
      return `${sorted[0][0]} & ${sorted[1][0]}`;
    }
    return sorted[0]?.[0] || 'AI & Robotics';
  }, [initialCompanies]);

  // Filtering
  const filtered = useMemo(() => {
    return initialCompanies.filter((c) => {
      // Sector filter
      if (selectedSector !== 'All') {
        const sList = c.sectors.map((s) => s.toLowerCase());
        if (selectedSector === 'AI') {
          const match = sList.some((s) => s.includes('ai') || s.includes('intelligence') || s.includes('machine learning'));
          if (!match) return false;
        } else if (selectedSector === 'Robotics & Hardware') {
          const match = sList.some((s) =>
            s.includes('robot') ||
            s.includes('hardware') ||
            s.includes('semiconductor') ||
            s.includes('aerospace') ||
            s.includes('sensor') ||
            s.includes('chip')
          );
          if (!match) return false;
        } else if (selectedSector === 'DevTools') {
          const match = sList.some((s) => s.includes('devtool') || s.includes('developer') || s.includes('infra'));
          if (!match) return false;
        } else if (selectedSector === 'B2B SaaS') {
          const match = sList.some((s) => s.includes('b2b') || s.includes('saas') || s.includes('enterprise'));
          if (!match) return false;
        } else if (selectedSector === 'Biotech') {
          const match = sList.some((s) => s.includes('bio') || s.includes('health') || s.includes('medical') || s.includes('life'));
          if (!match) return false;
        } else if (selectedSector === 'FinTech') {
          const match = sList.some((s) => s.includes('fintech') || s.includes('finance') || s.includes('crypto') || s.includes('pay'));
          if (!match) return false;
        } else {
          const match = sList.some((s) => s.includes(selectedSector.toLowerCase()));
          if (!match) return false;
        }
      }

      // Batch filter
      if (selectedBatch !== 'All') {
        const b = c.batch.toUpperCase();
        if (selectedBatch === 'W24' && !b.includes('W24')) return false;
        if (selectedBatch === 'S24' && !b.includes('S24')) return false;
        if (selectedBatch === 'W25' && !b.includes('W25')) return false;
        if (selectedBatch === 'Earlier' && (b.includes('W24') || b.includes('S24') || b.includes('W25'))) return false;
      }

      // Stage filter
      if (selectedStage !== 'All') {
        const st = c.stage.toLowerCase();
        if (selectedStage === 'Seed' && !st.includes('seed')) return false;
        if (selectedStage === 'Series A' && !st.includes('series a')) return false;
        if (
          selectedStage === 'Series B+' &&
          !st.includes('series b') &&
          !st.includes('series c') &&
          !st.includes('series d') &&
          !st.includes('growth')
        ) {
          return false;
        }
      }

      // Hiring toggle
      if (hiringOnly && !c.hiring && c.openRolesCount <= 0) {
        return false;
      }

      // Text search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchName = c.name.toLowerCase().includes(query);
        const matchTicker = c.ticker.toLowerCase().includes(query);
        const matchTagline = c.tagline.toLowerCase().includes(query);
        const matchFounders = c.founders.some((f) => f.toLowerCase().includes(query));
        const matchTech = c.techStack.some((t) => t.toLowerCase().includes(query));
        const matchSectors = c.sectors.some((s) => s.toLowerCase().includes(query));
        const matchCity = c.location.city.toLowerCase().includes(query);
        const matchCountry = c.location.country.toLowerCase().includes(query);
        const matchBatch = c.batch.toLowerCase().includes(query);

        if (
          !matchName &&
          !matchTicker &&
          !matchTagline &&
          !matchFounders &&
          !matchTech &&
          !matchSectors &&
          !matchCity &&
          !matchCountry &&
          !matchBatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialCompanies, search, selectedSector, selectedBatch, selectedStage, hiringOnly]);

  return (
    <div className="w-full text-black">
      {/* ── 4 Pop Color KPI Cards (Cadmium Yellow, Cobalt Blue, Mint Green, Coral Pink) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Card 1: Cadmium Yellow */}
        <div className="bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Total Startups</span>
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">{initialCompanies.length}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">⚡ Top YC Innovators</div>
        </div>

        {/* Card 2: Cobalt Blue */}
        <div className="bg-[#2563EB] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-white flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5 text-white">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Total Capital Raised</span>
            <span className="text-xs sm:text-sm">💰</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">{totalFundingRaised}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-white/90 truncate">Venture & Seed Backed</div>
        </div>

        {/* Card 3: Mint Green */}
        <div className="bg-[#34D399] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Hiring Rate</span>
            <span className="text-xs sm:text-sm">🔥</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">{hiringStats.rate}%</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">
            {hiringStats.count} Companies Hiring
          </div>
        </div>

        {/* Card 4: Coral Pink */}
        <div className="bg-[#FF5E7E] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">Top Sectors</span>
            <span className="text-xs sm:text-sm">🦾</span>
          </div>
          <div className="text-lg sm:text-2xl font-black font-mono tracking-tight truncate">{topSectors}</div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">Frontier & Applied AI</div>
        </div>
      </div>

      {/* ── Search & Filter Controls (Neo-Brutal White Card) ── */}
      <div className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#000] mb-8 space-y-4 sm:space-y-5">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm sm:text-base">🔍</span>
            <input
              type="text"
              placeholder="Search companies, tech (PyTorch, ASIC, CUDA, Rust), founders, or sectors..."
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

          {/* Quick Search Action */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('companies-grid-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-[#FFE600] hover:bg-[#FACC15] border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-mono text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>FILTER STARTUPS →</span>
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
              onClick={() => setViewMode('table')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all text-center ${
                viewMode === 'table'
                  ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                  : 'text-black hover:bg-yellow-200'
              }`}
            >
              ☰ Table View
            </button>
          </div>
        </div>

        {/* Filter Tabs (Sector Pills) */}
        <div>
          <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🚀 SECTOR FILTER TABS:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
            {sectorOptions.map((sector) => {
              const active = selectedSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                    active
                      ? 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold'
                      : 'bg-white text-black border-2 border-black hover:bg-yellow-200 shadow-[1.5px_1.5px_0px_#000] font-medium'
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Pills: Batch, Stage, and Hiring Toggle */}
        <div className="pt-2 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            {/* Batch Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">BATCH:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {batchOptions.map((batch) => (
                  <button
                    key={batch}
                    onClick={() => setSelectedBatch(batch)}
                    className={`px-2 py-1 rounded-lg border border-black font-bold text-[11px] transition-all ${
                      selectedBatch === batch
                        ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
                    }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">STAGE:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {stageOptions.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-2 py-1 rounded-lg border border-black font-bold text-[11px] transition-all ${
                      selectedStage === stage
                        ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Hiring Toggle Pill */}
            <button
              onClick={() => setHiringOnly(!hiringOnly)}
              className={`px-3 py-1 rounded-lg border-2 border-black font-bold text-[11px] transition-all flex items-center gap-1.5 ${
                hiringOnly
                  ? 'bg-[#FF5E7E] text-black shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-black hover:bg-yellow-200 shadow-[1.5px_1.5px_0px_#000]'
              }`}
            >
              <span>🔥</span>
              <span>Actively Hiring</span>
              {hiringOnly && <span className="ml-1 text-[10px]">✕</span>}
            </button>
          </div>

          {/* Showing counter */}
          <div className="font-bold text-black bg-[#FFE600] border-2 border-black px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#000] text-[11px] sm:text-xs">
            Showing <strong>{filtered.length}</strong> of {initialCompanies.length} startups
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white border-[2.5px] border-black rounded-2xl p-12 text-center my-6 shadow-[5px_5px_0px_#000]">
          <div className="text-5xl mb-3">🚀</div>
          <h3 className="text-xl font-black text-black mb-2">No Matching Startups Found</h3>
          <p className="text-sm font-medium text-slate-700 max-w-md mx-auto mb-5">
            Try adjusting your search query, or clear active sector, batch, stage, or hiring filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedSector('All');
              setSelectedBatch('All');
              setSelectedStage('All');
              setHiringOnly(false);
            }}
            className="px-5 py-2.5 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-xl text-xs font-mono font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all uppercase"
          >
            Reset All Filters ↺
          </button>
        </div>
      )}

      {/* ── View 1: Company Bento Cards Grid ── */}
      <div id="companies-grid-section">
        {viewMode === 'cards' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((company) => {
              return (
                <div
                  key={company.id}
                  className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar: Ticker badge, YC Batch badge, Hiring badge */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Ticker Badge */}
                        <span className="bg-slate-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs">
                          ${company.ticker}
                        </span>

                        {/* YC Batch Badge */}
                        <span className="bg-[#FFE600] text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-0.5 rounded-lg font-mono font-black text-xs">
                          YC {company.batch}
                        </span>

                        {company.badge && (
                          <span className="bg-[#FF5E7E] text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase">
                            {company.badge}
                          </span>
                        )}
                      </div>

                      {/* Hiring Badge */}
                      <div>
                        {company.hiring ? (
                          <span className="bg-[#34D399] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] px-2 py-0.5 rounded-md font-mono font-bold text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                            <span>● Hiring</span>
                            {company.openRolesCount > 0 && <span>({company.openRolesCount})</span>}
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-600 border border-black px-2 py-0.5 rounded-md font-mono font-semibold text-[10px]">
                            Hiring Paused
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Company Identity Header: Logo + Name + Stage & Funding */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-black shadow-[2px_2px_0px_#000] bg-white flex-shrink-0"
                        onError={(e) => {
                          // Fallback avatar if external image fails
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-black text-black group-hover:text-[#2563EB] transition-colors leading-tight truncate">
                          <a href={`/companies/${company.id}`}>{company.name}</a>
                        </h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="bg-[#93C5FD] text-black border border-black shadow-[1px_1px_0px_#000] font-mono font-bold text-[11px] px-2 py-0.5 rounded">
                            {company.stage}
                          </span>
                          <span className="bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000] font-mono font-black text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                            <span>💰</span>
                            <span>{company.totalRaised}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-slate-800 font-medium mb-3.5 leading-snug line-clamp-2">
                      {company.tagline}
                    </p>

                    {/* Location & Founders */}
                    <div className="space-y-1.5 text-xs font-mono font-bold text-slate-800 mb-4 bg-[#F7F2E8] p-2.5 rounded-xl border border-black/80">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm">📍</span>
                        <span className="truncate">
                          {company.location.city}
                          {company.location.state ? `, ${company.location.state}` : ''}, {company.location.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate text-slate-700">
                        <span className="text-sm">👥</span>
                        <span className="truncate">{company.founders.join(', ')}</span>
                      </div>
                    </div>

                    {/* Sector Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {company.sectors.map((sec) => (
                        <span
                          key={sec}
                          className="bg-yellow-100 text-black border border-black text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    {company.techStack && company.techStack.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] font-mono font-extrabold text-slate-600 uppercase tracking-wider mb-1.5">
                          CORE TECH STACK:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {company.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="bg-slate-50 text-black border border-black text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]"
                            >
                              {tech}
                            </span>
                          ))}
                          {company.techStack.length > 5 && (
                            <span className="bg-slate-200 text-black border border-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                              +{company.techStack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button: View Company Profile */}
                  <a
                    href={`/companies/${company.id}`}
                    className="w-full mt-2 py-2.5 px-4 bg-[#FFE600] hover:bg-[#FACC15] text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-black uppercase text-xs sm:text-sm rounded-xl text-center block hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    View Company Profile →
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* ── View 2: Terminal Table View ── */}
        {viewMode === 'table' && filtered.length > 0 && (
          <div className="bg-white border-[2.5px] border-black rounded-2xl shadow-[5px_5px_0px_#000] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-black uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-4">Ticker</th>
                    <th className="py-3 px-4">Startup</th>
                    <th className="py-3 px-4">YC Batch</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Funding</th>
                    <th className="py-3 px-4">Hiring</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Tech Stack</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10">
                  {filtered.map((company) => (
                    <tr key={company.id} className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3 px-4 font-bold">
                        <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          ${company.ticker}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-sm text-black">
                        <a href={`/companies/${company.id}`} className="hover:text-[#2563EB] hover:underline">
                          {company.name}
                        </a>
                        <div className="text-[10px] text-slate-600 font-normal truncate max-w-xs">{company.tagline}</div>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <span className="bg-yellow-200 px-2 py-0.5 rounded border border-black">YC {company.batch}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{company.stage}</td>
                      <td className="py-3 px-4 font-black">{company.totalRaised}</td>
                      <td className="py-3 px-4">
                        {company.hiring ? (
                          <span className="bg-[#34D399] text-black px-2 py-0.5 rounded font-bold text-[10px] border border-black">
                            ● Hiring
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[10px]">Paused</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {company.location.city}, {company.location.country}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {company.techStack.slice(0, 3).map((t) => (
                            <span key={t} className="bg-slate-100 text-black px-1.5 py-0.5 rounded border border-black text-[9px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`/companies/${company.id}`}
                          className="inline-block bg-[#FFE600] hover:bg-yellow-400 text-black font-black px-3 py-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] text-[11px] uppercase"
                        >
                          View →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
