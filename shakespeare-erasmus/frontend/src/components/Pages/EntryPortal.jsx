import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/Craiova fest logo.png';

export default function EntryPortal() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white font-body overflow-x-hidden">

      {/* ══════════════════════════════════════════
          SECTION 1 — Hero (full viewport)
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background portrait */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Portrait of Shakespeare integrated with colorful energy explosion"
            className="absolute bottom-0 right-0 md:right-[5%] h-[calc(100%-5rem)] md:h-[calc(100%-7rem)] w-full md:w-[65%] object-contain object-center md:object-right-bottom opacity-90 mix-blend-screen grayscale contrast-125"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Ev-xrmGQxkFOMM0Zxg1Z-XtBYOGGmSrrQsrR4wIHcWTicKNf8iHuC_FzNwQT3oRcriJS8BKGLCKfe7JvPlnSv67mi5os5H7kbpNdWPH7-mbCn9jZUFoJOunfozQTzGkjxAWNbwq7mQWk4ILgbifTEAywu3DI7yeIP9CmIOivSNmIyl7CgGUhZHpgtwfpshaU2jBT9gULOYqOvwtsqOfKVuBUkRMcKWCy0UaKiFAefxSPAbZ6Y40_SDCWHesu1VepO_dqXIS5qZTf"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
          {/* Subtle colour-wash matching original artistic-bg */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(160,35,142,0.18) 0%, transparent 60%)' }} />
          {/* Bottom theatre SVG lines */}
          <div className="absolute bottom-12 left-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
            <svg className="w-full h-full fill-none stroke-[0.5]" style={{ stroke: '#a0238e' }} viewBox="0 0 400 300">
              <ellipse cx="200" cy="200" rx="150" ry="60" />
              <ellipse cx="200" cy="180" rx="130" ry="50" />
              <path d="M50 200 L50 100 Q200 50 350 100 L350 200" />
              <path d="M100 180 L100 120" /><path d="M150 180 L150 110" />
              <path d="M250 180 L250 110" /><path d="M300 180 L300 120" />
            </svg>
          </div>
        </div>

        {/* Spacer to clear the global fixed navbar */}
        <div className="h-28 flex-shrink-0" />

        {/* ── Hero copy + CTA ─────────────────────── */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-10 md:px-20">
          <div className="max-w-xl">
            <p className="font-script text-4xl mb-2 text-[#A0238E]">{t('heading', 'entryPortal')}</p>
            <h1
              className="font-display text-white text-6xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('title', 'entryPortal').replace(' OF ', ' OF<br/>') }}
            />
            <p className="text-[#fface8]/90 text-xl font-display italic mb-12">
              <span dangerouslySetInnerHTML={{ __html: t('subtitle', 'entryPortal').split(' Yours ')[0] + ' ' }} />
              <span className="text-white/80 font-body not-italic text-lg block sm:inline">
                {t('subtitle', 'entryPortal').includes(' Yours ')
                  ? 'Yours ' + t('subtitle', 'entryPortal').split(' Yours ')[1]
                  : ''}
              </span>
            </p>

            {/* CTA button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate('/main-hub')}
                className="gradient-border-button px-12 py-5 rounded-full text-white font-medium tracking-[0.2em] text-lg hover:scale-105 transition-transform duration-300"
              >
                {t('touchToBegin', 'entryPortal')}
              </button>
              {/* Ripple rings */}
              <div className="mt-8 flex flex-col items-center">
                <div className="ripple-container mb-4">
                  <div className="ripple" />
                  <div className="ripple" style={{ animationDelay: '0.7s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 flex flex-col items-center pb-8 gap-2 opacity-40">
          <span className="text-[10px] tracking-widest uppercase text-white">{t('scrollToExplore', 'entryPortal')}</span>
          <span className="material-symbols-outlined text-white animate-bounce text-lg">expand_more</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — Shakespeare Quote (Shifted Down)
      ══════════════════════════════════════════ */}
      <section className="relative px-6 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #000 0%, #0e0a14 50%, #0a0812 100%)',
          paddingTop: '13rem', // Shifted down by ~1.5 inches / ~4cm to fit perfectly in the middle of scroll
          paddingBottom: '11rem'
        }}>
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[40rem] h-[20rem] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(160,35,142,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[15rem] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,103,104,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <blockquote className="relative z-10 flex flex-col items-center max-w-3xl">
          <div className="relative">
            {/* Big opening quote mark */}
            <div className="absolute -top-16 -left-12 md:-left-20 text-[#7a1a60] font-serif select-none pointer-events-none"
              style={{ fontSize: '8rem', lineHeight: 1, opacity: 0.6 }}>
              ”
            </div>
            <p className="relative z-10 font-serif text-3xl md:text-5xl italic text-white leading-relaxed mb-8 text-center"
              style={{ textShadow: '0 0 40px rgba(160,35,142,0.3)' }}>
              {t('quoteAct', 'entryPortal')}
            </p>
          </div>
          <cite className="not-italic text-sm md:text-base tracking-[0.25em] uppercase font-medium"
            style={{ color: '#c8a020' }}>
            {t('quoteAuthor', 'entryPortal')}
          </cite>
        </blockquote>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — Choose Your Act
      ══════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden"
        style={{ background: '#0a0812' }}>
        {/* Theatre curtain background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNquBcYFQqVv95CqVGskjEjJ7Gw3fZg4wTQEbaJQ4osB6b5IOHIVzrc7PMeg6nvAqIzIqUyfWgu5DOBvCrv8P534_NqEnb057uHsqFLqKe03I6P-Xkyrm1KeK61m7MYcyUQMoC3IO7IE3Xlv3tQjRrmvB1KxlJhO2pEKsDtFGzk9bwITT-Ms9-_3_6zpbg6Z1yUHxwMbr77LbidZG_L6j03y_5JmfUwJrfZshpK5pqxt78rg5LxAeDPAK-gQvEExeG1MzSGjxdYrZ"
            alt="Theatre"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0a0812 0%, transparent 30%, transparent 70%, #0a0812 100%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style={{ color: '#a08b98' }}>{t('act2', 'entryPortal')}</p>
          <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-white mb-16">
            {t('chooseNextAct', 'entryPortal')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* ── Behind the Curtain ── */}
            <ActCard
              onClick={() => navigate('/behind-curtain')}
              iconName="theater_comedy"
              iconBg="linear-gradient(135deg, #7a1a60 0%, #a0238e 100%)"
              glowColor="rgba(160,35,142,0.4)"
              accentColor="#fface8"
              label={t('behindCurtainTitle', 'entryPortal')}
              description={t('behindCurtainDesc', 'entryPortal')}
              exploreText={t('exploreBtn', 'entryPortal')}
            />

            {/* ── Visit Garden ── */}
            <ActCard
              onClick={() => navigate('/garden')}
              iconName="local_florist"
              iconBg="linear-gradient(135deg, #006768 0%, #6ed7d7 100%)"
              glowColor="rgba(110,215,215,0.35)"
              accentColor="#6ed7d7"
              label={t('visitGardenTitle', 'entryPortal')}
              description={t('visitGardenDesc', 'entryPortal')}
              exploreText={t('exploreBtn', 'entryPortal')}
            />

            {/* ── Explore World ── */}
            <ActCard
              onClick={() => navigate('/globe')}
              iconName="public"
              iconBg="linear-gradient(135deg, #8a1c00 0%, #ffb4a2 100%)"
              glowColor="rgba(255,180,162,0.35)"
              accentColor="#ffb4a2"
              label={t('exploreWorldTitle', 'entryPortal')}
              description={t('exploreWorldDesc', 'entryPortal')}
              exploreText={t('exploreBtn', 'entryPortal')}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — Footer
      ══════════════════════════════════════════ */}
      <footer className="relative py-16 px-6 text-center"
        style={{ background: 'rgba(0,0,0,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain opacity-70 mix-blend-screen" />
            <p className="text-xs tracking-widest uppercase text-white">
              {t('footerTitle', 'entryPortal')}
            </p>
          </div>
          <p className="text-xs tracking-widest uppercase text-white">
            {t('footerCopyright', 'entryPortal')}
          </p>
        </div>
      </footer>

      {/* Film-grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-50
        bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}

/* ─── Reusable Act Card ──────────────────────────────────── */
function ActCard({ onClick, iconName, iconBg, glowColor, accentColor, label, description, exploreText }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center text-center gap-6 p-8 rounded-2xl transition-all duration-500 w-full relative"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.border = `1px solid ${accentColor}44`;
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 24px 50px ${glowColor}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Premium Glassmorphic Layered Icon Container */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        {/* Deep ambient glow layer behind */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-500 group-hover:scale-125 group-hover:opacity-75"
          style={{ background: iconBg }}
        />

        {/* Nested orbital thin ring with gold rotation on hover */}
        <div
          className="absolute w-[115%] h-[115%] rounded-full border border-dashed opacity-25 transition-all duration-700 group-hover:rotate-180 group-hover:opacity-60"
          style={{ borderColor: accentColor }}
        />

        {/* Main solid glass container */}
        <div
          className="absolute inset-0 rounded-full border flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 4px 12px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Centered glowing color disc */}
        <div
          className="absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{
            background: iconBg,
            boxShadow: `0 4px 20px ${glowColor}`,
          }}
        />

        {/* Glowing Material Symbol */}
        <span
          className="material-symbols-outlined relative z-10 text-4xl text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{
            fontVariationSettings: "'FILL' 1, 'wght' 400",
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {iconName}
        </span>
      </div>

      {/* Label and description */}
      <div className="relative z-10">
        <h3
          className="font-serif text-2xl font-semibold mb-3 transition-colors duration-300"
          style={{ color: '#ffffff' }}
        >
          {label}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>
          {description}
        </p>
      </div>

      {/* Explore indicator at bottom */}
      <div
        className="flex items-center gap-2 mt-2 transition-all duration-300 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        style={{ color: accentColor }}
      >
        <span className="text-xs font-bold tracking-widest uppercase">{exploreText || 'Explore'}</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </div>
    </button>
  );
}
