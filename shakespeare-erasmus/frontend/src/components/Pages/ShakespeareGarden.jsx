import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntries, getStats, listenForUpdates, fetchEntriesFromDB } from '../../data/gardenStore';
import { useLanguage } from '../../context/LanguageContext';

/* ─────────────────────────────────────────────────────────────
   FLOWER COLOUR MAP
───────────────────────────────────────────────────────────── */
const FLOWER_COLORS = {
  rose:'#fface8', lily:'#6ed7d7', sunflower:'#ffb4a2', lotus:'#fface8',
  tulip:'#cf4040', iris:'#6ed7d7', daisy:'#d8c0ce', orchid:'#e8a0ff',
  peony:'#ffb4ab', lavender:'#8bf3f4'
};

/* ─────────────────────────────────────────────────────────────
   VIRTUAL LIST — renders only visible rows, handles 3000+ entries
───────────────────────────────────────────────────────────── */
const ROW_HEIGHT = 112;
const OVERSCAN   = 6;

function VirtualList({ items, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = useCallback(e => setScrollTop(e.currentTarget.scrollTop), []);

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const visible = Math.ceil(containerHeight / ROW_HEIGHT);
    const end = Math.min(items.length - 1, start + visible + OVERSCAN * 2);
    return { startIndex: start, endIndex: end, offsetY: start * ROW_HEIGHT };
  }, [scrollTop, containerHeight, items.length]);

  if (items.length === 0) return null;

  return (
    <div onScroll={onScroll} style={{ height: containerHeight, overflowY: 'auto' }} className="scrollbar-thin">
      <div style={{ height: items.length * ROW_HEIGHT, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {items.slice(startIndex, endIndex + 1).map(item => (
            <EntryCard key={item.id} entry={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ENTRY CARD
───────────────────────────────────────────────────────────── */
function EntryCard({ entry }) {
  const { t, language } = useLanguage();
  const color = FLOWER_COLORS[entry.flowerType] || '#fface8';
  const localeMap = { en: 'en-US', ro: 'ro-RO', fr: 'fr-FR', es: 'es-ES' };
  const date  = new Date(entry.plantedAt).toLocaleString(localeMap[language] || 'en-US', {
    month:'short', day:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit', hour12:true
  });

  return (
    <div className="mx-3 mb-3 p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:scale-[1.01]"
      style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)', backdropFilter:'blur(12px)', height: ROW_HEIGHT - 12 }}>
      {/* Flower dot */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1"
        style={{ background:`${color}20`, boxShadow:`0 0 14px ${color}40` }}>
        <span className="material-symbols-outlined text-sm" style={{ color, fontVariationSettings:"'FILL' 1" }}>local_florist</span>
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
          <span className="font-serif font-semibold text-white text-base truncate">{entry.name}</span>
          <span className="text-xs flex-shrink-0 flex items-center gap-1" style={{ color:'#a08b98' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'12px' }}>schedule</span>
            {date}
          </span>
        </div>
        <p className="text-sm italic line-clamp-2" style={{ color:'#d8c0ce' }}>{entry.message}</p>
      </div>
      {/* Flower badge */}
      <span className="flex-shrink-0 self-start text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
        style={{ background:`${color}18`, color, border:`1px solid ${color}40` }}>
        {t('plantYourLegacy.flowers.' + entry.flowerType + '.name') || entry.flowerType}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED STAT
   Smoothly counts up whenever the value changes
───────────────────────────────────────────────────────────── */
function AnimatedStat({ value }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    const diff  = value - prev.current;
    const steps = Math.min(Math.abs(diff), 20);
    let step    = 0;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.round(prev.current + (diff * step) / steps));
      if (step >= steps) { clearInterval(timer); prev.current = value; }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function ShakespeareGarden() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  /* ── real-time entries from store ── */
  const [entries, setEntries] = useState(() => getEntries());

  useEffect(() => {
    // Fetch initial fresh entries from MongoDB
    const fetchAndSet = async () => {
      const dbEntries = await fetchEntriesFromDB();
      setEntries(dbEntries);
    };
    
    fetchAndSet();

    // Set up polling interval to keep UI in sync with MongoDB changes (e.g., from Atlas UI)
    const pollInterval = setInterval(fetchAndSet, 10000); // every 10 seconds

    // Re-fetch whenever any tab/component writes a new entry locally
    // Crucial fix: DO NOT call fetchAndSet here, or it creates an infinite network loop!
    const unsub = listenForUpdates(() => {
      setEntries(getEntries());
    });
    
    return () => {
      clearInterval(pollInterval);
      unsub();
    };
  }, []);

  /* ── search ── */
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter(e =>
      e.name.toLowerCase().includes(q) || e.message.toLowerCase().includes(q)
    );
  }, [search, entries]);

  /* ── stats ── */
  const stats = useMemo(() => getStats(entries), [entries]);

  /* ── featured = newest entry ── */
  const featured = entries[0] || null;

  /* ── virtualised list height ── */
  const listWrapRef     = useRef(null);
  const [listH, setListH] = useState(480);

  useEffect(() => {
    const update = () => { if (listWrapRef.current) setListH(listWrapRef.current.clientHeight); };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── Empty state helper ── */
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <span className="material-symbols-outlined text-5xl" style={{ color:'#53424d' }}>local_florist</span>
      <p className="font-serif text-lg text-white opacity-60">
        {search ? t('garden.noResults').replace('{search}', search) : t('garden.emptyState')}
      </p>
      {!search && (
        <button onClick={() => navigate('/plant')}
          className="mt-2 px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105"
          style={{ background:'linear-gradient(135deg,#A0238E,#E43D12)', color:'#fff' }}>
          {t('garden.beFirstToPlant')}
        </button>
      )}
    </div>
  );

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background:'#131317', color:'#e4e1e7' }}>

      {/* ── Immersive background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, #0e0e12, #131317)' }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background:'rgba(160,35,142,0.08)', filter:'blur(120px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background:'rgba(207,46,0,0.06)', filter:'blur(100px)' }} />
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNquBcYFQqVv95CqVGskjEjJ7Gw3fZg4wTQEbaJQ4osB6b5IOHIVzrc7PMeg6nvAqIzIqUyfWgu5DOBvCrv8P534_NqEnb057uHsqFLqKe03I6P-Xkyrm1KeK61m7MYcyUQMoC3IO7IE3Xlv3tQjRrmvB1KxlJhO2pEKsDtFGzk9bwITT-Ms9-_3_6zpbg6Z1yUHxwMbr77LbidZG_L6j03y_5JmfUwJrfZshpK5pqxt78rg5LxAeDPAK-gQvEExeG1MzSGjxdYrZ"
          alt="" className="w-full h-full object-cover opacity-20" style={{ mixBlendMode:'overlay' }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />
      </div>

      {/* ── Main ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col pt-4">

        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">{t('garden.title')}</h1>
          <p className="italic" style={{ color:'#d8c0ce' }}>{t('garden.subtitle')}</p>
          {/* Live pulse indicator */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#6ed7d7' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color:'#6ed7d7' }}>{t('garden.liveUpdating')}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 flex-1">

          {/* ── LEFT: list ── */}
          <div className="flex-1 flex flex-col">

            {/* Search */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined" style={{ color:'#a08b98' }}>search</span>
              </div>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={t('garden.searchPlaceholder')}
                className="w-full rounded-full py-4 pl-14 pr-28 outline-none transition-all"
                style={{ background:'rgba(14,14,18,0.85)', backdropFilter:'blur(16px)',
                         border:'1px solid rgba(255,255,255,0.1)', color:'#e4e1e7' }}
                onFocus={e => e.target.style.borderColor='rgba(160,35,142,0.6)'}
                onBlur={e  => e.target.style.borderColor='rgba(255,255,255,0.1)'} />
              {search && (
                <button onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs px-4 py-1.5 rounded-full"
                  style={{ background:'rgba(160,35,142,0.2)', color:'#fface8' }}>{t('garden.clear')}</button>
              )}
            </div>

            {/* Count label */}
            <p className="text-xs mb-2 pl-1" style={{ color:'#a08b98' }}>
              {filtered.length === entries.length
                ? (entries.length === 1
                    ? t('garden.legacyPlantedCount')
                    : t('garden.legaciesPlantedCount').replace('{count}', entries.length.toLocaleString()))
                : (filtered.length === 1
                    ? t('garden.resultFound')
                    : t('garden.resultsFound').replace('{count}', filtered.length))
              }
            </p>

            {/* Virtualised list or empty state */}
            <div ref={listWrapRef} className="flex-1" style={{ minHeight:'400px', maxHeight:'calc(100vh - 360px)' }}>
              {filtered.length === 0
                ? <EmptyState />
                : <VirtualList items={filtered} containerHeight={listH} />}
            </div>
          </div>

          {/* ── RIGHT: stats + featured ── */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">

            {/* Real-time stats */}
            <div className="p-7 rounded-2xl space-y-5"
              style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(12px)' }}>
              {[
                { label: t('garden.totalFlowers'), value: stats.total,  color:'#fface8' },
                { label: t('garden.flowersToday'), value: stats.today,  color:'#6ed7d7' },
                { label: t('garden.peopleParticipated'), value: stats.people, color:'#ffb4a2' },
              ].map((s, i) => (
                <div key={i} className={i > 0 ? 'pt-4 border-t' : ''} style={{ borderColor:'rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color:'#d8c0ce' }}>{s.label}</p>
                  <p className="font-serif text-3xl font-semibold" style={{ color: s.color }}>
                    <AnimatedStat value={s.value} />
                  </p>
                </div>
              ))}
            </div>

            {/* Featured bloom (newest entry) */}
            {featured && (
              <div className="p-7 rounded-2xl text-center relative overflow-hidden"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(12px)' }}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background:'rgba(160,35,142,0.1)', filter:'blur(30px)' }} />
                <div className="flex justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl" style={{ color:'#fface8', fontVariationSettings:"'FILL' 1" }}>
                    local_florist
                  </span>
                </div>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color:'#a08b98' }}>{t('garden.latestBloom')}</p>
                <h4 className="font-serif text-lg font-semibold text-white mb-3 truncate">{featured.name}</h4>
                <p className="text-sm italic leading-relaxed mb-4 line-clamp-3" style={{ color:'#d8c0ce' }}>
                  {featured.message}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-8" style={{ background:'#53424d' }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color:`${FLOWER_COLORS[featured.flowerType] || '#fface8'}` }}>
                    {t('plantYourLegacy.flowers.' + featured.flowerType + '.name') || featured.flowerType}
                  </span>
                  <div className="h-px w-8" style={{ background:'#53424d' }} />
                </div>
              </div>
            )}

            {/* CTA */}
            <button onClick={() => navigate('/plant')}
              className="w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              style={{ background:'linear-gradient(135deg,#A0238E,#E43D12)', boxShadow:'0 0 24px rgba(160,35,142,0.35)', color:'#fff' }}>
              {t('garden.plantYourFlower')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar       { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(160,35,142,0.4); border-radius: 2px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
