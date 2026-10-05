import React, { useState, useMemo } from 'react';

export interface InnovationItem {
  id: string;
  ticker: string;
  title: string;
  tagline: string;
  domain:
    | 'Physical AI & Robotics'
    | 'Hardware & Frontier Silicon'
    | 'Autonomous Systems & Aerospace'
    | 'AI Foundation Models'
    | string;
  organization: string;
  releaseDate: string;
  impactMetric: string;
  status:
    | 'Live Production'
    | 'Open Weights'
    | 'Commercial Pilot'
    | 'Research Breakthrough'
    | string;
  badge?: string;
  specs: Record<string, string>;
  tags: string[];
  links: {
    website?: string;
    paperUrl?: string;
    githubUrl?: string;
    demoUrl?: string;
  };
  image?: string;
  bannerImage?: string;
}

const DOMAIN_OPTIONS = [
  'All',
  'Physical AI & Robotics',
  'Hardware & Frontier Silicon',
  'Autonomous Systems & Aerospace',
  'AI Foundation Models',
];

const STATUS_OPTIONS = [
  'All',
  'Live Production',
  'Open Weights',
  'Commercial Pilot',
  'Research Breakthrough',
];

export default function InnovationsDashboard({
  initialInnovations = [],
}: {
  initialInnovations: InnovationItem[];
}) {
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Dynamic KPI Stats
  const activeDomainsCount = useMemo(() => {
    const uniqueDomains = new Set(initialInnovations.map((i) => i.domain));
    return uniqueDomains.size;
  }, [initialInnovations]);

  const openWeightsStats = useMemo(() => {
    if (initialInnovations.length === 0) return { count: 0, rate: 0 };
    const count = initialInnovations.filter(
      (i) =>
        i.status === 'Open Weights' ||
        i.status.toLowerCase().includes('open') ||
        Boolean(i.links?.githubUrl)
    ).length;
    const rate = Math.round((count / initialInnovations.length) * 100);
    return { count, rate };
  }, [initialInnovations]);

  const commercialDeploymentsCount = useMemo(() => {
    return initialInnovations.filter(
      (i) =>
        i.status === 'Live Production' ||
        i.status === 'Commercial Pilot' ||
        i.status.toLowerCase().includes('production') ||
        i.status.toLowerCase().includes('commercial')
    ).length;
  }, [initialInnovations]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialInnovations.forEach((item) => {
      item.tags?.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }, [initialInnovations]);

  // Filtered Items
  const filtered = useMemo(() => {
    return initialInnovations.filter((item) => {
      // Domain filter
      if (selectedDomain !== 'All') {
        if (item.domain !== selectedDomain) return false;
      }

      // Status filter
      if (selectedStatus !== 'All') {
        if (item.status !== selectedStatus) return false;
      }

      // Tag filter
      if (selectedTag !== 'All') {
        if (!item.tags?.includes(selectedTag)) return false;
      }

      // Text search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchTicker = item.ticker.toLowerCase().includes(query);
        const matchOrg = item.organization.toLowerCase().includes(query);
        const matchTagline = item.tagline.toLowerCase().includes(query);
        const matchDomain = item.domain.toLowerCase().includes(query);
        const matchImpact = item.impactMetric.toLowerCase().includes(query);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        const matchSpecs = Object.entries(item.specs || {}).some(
          ([k, v]) => k.toLowerCase().includes(query) || String(v).toLowerCase().includes(query)
        );

        if (
          !matchTitle &&
          !matchTicker &&
          !matchOrg &&
          !matchTagline &&
          !matchDomain &&
          !matchImpact &&
          !matchTags &&
          !matchSpecs
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialInnovations, search, selectedDomain, selectedStatus, selectedTag]);

  // Helper for status badge colors
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Live Production':
        return 'bg-[#34D399] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000]';
      case 'Open Weights':
        return 'bg-[#FFE600] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] font-black';
      case 'Commercial Pilot':
        return 'bg-[#FF5E7E] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000]';
      case 'Research Breakthrough':
      default:
        return 'bg-[#DDD6FE] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000]';
    }
  };

  // Helper for domain badge colors
  const getDomainBadgeStyle = (domain: string) => {
    switch (domain) {
      case 'Physical AI & Robotics':
        return 'bg-[#FFE600] text-black border border-black shadow-[1px_1px_0px_#000]';
      case 'Hardware & Frontier Silicon':
        return 'bg-[#93C5FD] text-black border border-black shadow-[1px_1px_0px_#000]';
      case 'Autonomous Systems & Aerospace':
        return 'bg-[#FF8DA1] text-black border border-black shadow-[1px_1px_0px_#000]';
      case 'AI Foundation Models':
      default:
        return 'bg-[#C7D2FE] text-black border border-black shadow-[1px_1px_0px_#000]';
    }
  };

  return (
    <div className="w-full text-black">
      {/* ── 4 Pop Color KPI Cards (Cadmium Yellow, Cobalt Blue, Mint Green, Coral Pink) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Card 1: Cadmium Yellow */}
        <div className="bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
              Total Innovations Tracked
            </span>
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">
            {initialInnovations.length}
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">
            ⚡ Frontier Breakthroughs
          </div>
        </div>

        {/* Card 2: Cobalt Blue */}
        <div className="bg-[#2563EB] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-white flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5 text-white">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
              Active Domains
            </span>
            <span className="text-xs sm:text-sm">🔬</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">
            {activeDomainsCount || 4}
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-white/90 truncate">
            Physical AI · Silicon · Aero · Models
          </div>
        </div>

        {/* Card 3: Mint Green */}
        <div className="bg-[#34D399] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
              Open Weights Rate
            </span>
            <span className="text-xs sm:text-sm">🔓</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">
            {openWeightsStats.rate}%
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">
            {openWeightsStats.count} Open Source / Weights
          </div>
        </div>

        {/* Card 4: Coral Pink */}
        <div className="bg-[#FF5E7E] border-2 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] p-3.5 sm:p-4 rounded-xl text-black flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
            <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
              Commercial Deployments
            </span>
            <span className="text-xs sm:text-sm">🏭</span>
          </div>
          <div className="text-2xl sm:text-4xl font-black font-mono tracking-tight">
            {commercialDeploymentsCount}
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold mt-1 text-black/90 truncate">
            Live Production & Pilots
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls (Neo-Brutal White Card) ── */}
      <div className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#000] mb-8 space-y-4 sm:space-y-5">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black text-sm sm:text-base">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search innovations, specs (VLA, Latency, ASIC), organization, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black placeholder:text-slate-500 font-mono rounded-xl pl-10 sm:pl-11 pr-16 sm:pr-20 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_#000] transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-mono font-bold bg-slate-200 hover:bg-slate-300 text-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-black shadow-[1px_1px_0px_#000]"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Action Scroll */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('innovations-grid-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-[#FFE600] hover:bg-[#FACC15] border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-black font-bold uppercase rounded-xl hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-mono text-xs sm:text-sm whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>FILTER RADAR →</span>
          </button>

          {/* View Toggle */}
          <div className="w-full sm:w-auto flex items-center justify-center bg-[#F4EFE6] border-2 border-black rounded-xl p-1 shadow-[2px_2px_0px_#000]">
            <button
              type="button"
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
              type="button"
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

        {/* Filter Tabs: Domains */}
        <div>
          <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🔬 DOMAIN FILTER TABS:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
            {DOMAIN_OPTIONS.map((domain) => {
              const active = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                    active
                      ? 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold'
                      : 'bg-white text-black border-2 border-black hover:bg-yellow-200 shadow-[1.5px_1.5px_0px_#000] font-medium'
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Pills: Status & Tags & Counter */}
        <div className="pt-2 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">STATUS:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`px-2.5 py-1 rounded-lg border border-black font-bold text-[11px] transition-all ${
                      selectedStatus === status
                        ? 'bg-black text-white shadow-[1px_1px_0px_#000]'
                        : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tag Filter if available */}
            {allTags.length > 0 && (
              <div className="hidden xl:flex items-center gap-1.5">
                <span className="font-bold text-slate-700">TAG:</span>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="bg-white border border-black rounded-lg px-2 py-1 text-[11px] font-mono font-bold shadow-[1px_1px_0px_#000] focus:outline-none"
                >
                  <option value="All">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Showing counter */}
          <div className="font-bold text-black bg-[#FFE600] border-2 border-black px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#000] text-[11px] sm:text-xs">
            Showing <strong>{filtered.length}</strong> of {initialInnovations.length} breakthroughs
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white border-[2.5px] border-black rounded-2xl p-12 text-center my-6 shadow-[5px_5px_0px_#000]">
          <div className="text-5xl mb-3">🔬</div>
          <h3 className="text-xl font-black text-black mb-2">No Matching Innovations Found</h3>
          <p className="text-sm font-medium text-slate-700 max-w-md mx-auto mb-5">
            Try adjusting your search query, or clear active domain, status, or tag filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedDomain('All');
              setSelectedStatus('All');
              setSelectedTag('All');
            }}
            className="px-5 py-2.5 bg-[#FFE600] text-black border-2 border-black shadow-[3px_3px_0px_#000] rounded-xl text-xs font-mono font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all uppercase"
          >
            Reset All Filters ↺
          </button>
        </div>
      )}

      {/* ── View 1: Bento Cards Grid ── */}
      <div id="innovations-grid-section">
        {viewMode === 'cards' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((item) => {
              const specEntries = Object.entries(item.specs || {});
              return (
                <div
                  key={item.id}
                  className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Bar: Ticker badge, Domain sticker pill, Status badge */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Ticker Badge */}
                        <span className="bg-slate-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs">
                          ${item.ticker}
                        </span>

                        {/* Domain Sticker Pill */}
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono font-bold text-[10px] ${getDomainBadgeStyle(
                            item.domain
                          )}`}
                        >
                          {item.domain}
                        </span>

                        {item.badge && (
                          <span className="bg-[#FF5E7E] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono font-bold text-[10px] inline-flex items-center gap-1 ${getStatusBadgeStyle(
                            item.status
                          )}`}
                        >
                          {item.status === 'Live Production' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                          )}
                          <span>{item.status}</span>
                        </span>
                      </div>
                    </div>

                    {/* Impact Metric Pill in Cadmium Yellow */}
                    <div className="mb-3">
                      <span className="bg-[#FFE600] text-black border-2 border-black font-mono font-black text-xs px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#000] inline-flex items-center gap-1">
                        <span>⚡</span>
                        <span>{item.impactMetric}</span>
                      </span>
                    </div>

                    {/* Organization and Title */}
                    <div className="mb-2.5">
                      <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-600 mb-0.5">
                        {item.organization}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-black group-hover:text-[#2563EB] transition-colors leading-tight">
                        <a href={`/innovations/${item.id}`}>{item.title}</a>
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm text-slate-800 font-medium mb-3.5 leading-snug line-clamp-2">
                      {item.tagline}
                    </p>

                    {/* Specs Pill Box */}
                    {specEntries.length > 0 && (
                      <div className="mb-3.5 space-y-1">
                        <div className="text-[10px] font-mono font-extrabold text-slate-600 uppercase tracking-wider mb-1">
                          SPECS & ARCHITECTURE:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {specEntries.slice(0, 4).map(([k, v]) => (
                            <span
                              key={k}
                              className="bg-[#F7F2E8] text-black border border-black/80 font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#000] truncate max-w-[200px]"
                              title={`${k}: ${v}`}
                            >
                              <strong className="font-bold">{k}:</strong> {v}
                            </span>
                          ))}
                          {specEntries.length > 4 && (
                            <span className="bg-slate-200 text-black border border-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                              +{specEntries.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags Stickers */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="bg-yellow-100 text-black border border-black text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Area */}
                  <div>
                    {/* Direct Links (Paper, GitHub, Demo) */}
                    <div className="flex flex-wrap gap-1.5 mb-2 pt-2 border-t border-black/10">
                      {item.links?.paperUrl && (
                        <a
                          href={item.links.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-yellow-50 text-black border border-black px-2 py-1 rounded-lg font-mono text-[11px] font-bold shadow-[1px_1px_0px_#000] inline-flex items-center gap-1 hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all"
                        >
                          <span>📄 Paper</span>
                          <span className="text-[9px]">↗</span>
                        </a>
                      )}
                      {item.links?.githubUrl && (
                        <a
                          href={item.links.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-yellow-50 text-black border border-black px-2 py-1 rounded-lg font-mono text-[11px] font-bold shadow-[1px_1px_0px_#000] inline-flex items-center gap-1 hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all"
                        >
                          <span>💻 Code</span>
                          <span className="text-[9px]">↗</span>
                        </a>
                      )}
                      {item.links?.demoUrl && (
                        <a
                          href={item.links.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-yellow-50 text-black border border-black px-2 py-1 rounded-lg font-mono text-[11px] font-bold shadow-[1px_1px_0px_#000] inline-flex items-center gap-1 hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all"
                        >
                          <span>🎬 Demo</span>
                          <span className="text-[9px]">↗</span>
                        </a>
                      )}
                      {item.links?.website && !item.links?.paperUrl && !item.links?.githubUrl && (
                        <a
                          href={item.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-yellow-50 text-black border border-black px-2 py-1 rounded-lg font-mono text-[11px] font-bold shadow-[1px_1px_0px_#000] inline-flex items-center gap-1 hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all"
                        >
                          <span>🌐 Site</span>
                          <span className="text-[9px]">↗</span>
                        </a>
                      )}
                    </div>

                    {/* Cadmium Yellow Primary Button: View Breakthrough Dossier */}
                    <a
                      href={`/innovations/${item.id}`}
                      className="w-full py-2.5 px-4 bg-[#FFE600] hover:bg-[#FACC15] text-black border-2 border-black shadow-[3px_3px_0px_#000] font-mono font-black uppercase text-xs sm:text-sm rounded-xl text-center block hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                      View Breakthrough Dossier →
                    </a>
                  </div>
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
                    <th className="py-3 px-4">Breakthrough & Org</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4">Impact Metric</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Key Specs</th>
                    <th className="py-3 px-4">Links</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3 px-4 font-bold">
                        <span className="bg-[#FFE600] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          ${item.ticker}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-sm text-black">
                        <a
                          href={`/innovations/${item.id}`}
                          className="hover:text-[#2563EB] hover:underline"
                        >
                          {item.title}
                        </a>
                        <div className="text-[10px] text-slate-600 font-bold uppercase">
                          {item.organization}
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal truncate max-w-xs">
                          {item.tagline}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${getDomainBadgeStyle(
                            item.domain
                          )}`}
                        >
                          {item.domain}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-black">
                        <span className="bg-yellow-100 border border-black px-1.5 py-0.5 rounded">
                          ⚡ {item.impactMetric}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${getStatusBadgeStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {Object.entries(item.specs || {})
                            .slice(0, 2)
                            .map(([k, v]) => (
                              <span
                                key={k}
                                className="bg-slate-100 text-black px-1.5 py-0.5 rounded border border-black text-[9px]"
                              >
                                {k}: {v}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {item.links?.paperUrl && (
                            <a
                              href={item.links.paperUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] underline font-bold hover:text-blue-600"
                              title="Paper"
                            >
                              Paper ↗
                            </a>
                          )}
                          {item.links?.githubUrl && (
                            <a
                              href={item.links.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] underline font-bold hover:text-blue-600"
                              title="Code"
                            >
                              Code ↗
                            </a>
                          )}
                          {item.links?.demoUrl && (
                            <a
                              href={item.links.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] underline font-bold hover:text-blue-600"
                              title="Demo"
                            >
                              Demo ↗
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`/innovations/${item.id}`}
                          className="inline-block bg-[#FFE600] hover:bg-yellow-400 text-black font-black px-3 py-1 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000] text-[11px] uppercase"
                        >
                          Dossier →
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
