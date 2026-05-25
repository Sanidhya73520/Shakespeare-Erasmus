import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function MainHub() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cards = [
    {
      id: 'discoverYourself',
      route: '/discover',
      icon: 'chat',
      textClass: 'text-festival-purple',
      bgClass: 'bg-festival-purple/10',
      borderClass: 'border-festival-purple/30',
      hoverBorderClass: 'hover:border-festival-purple',
      shadowClass: 'hover:shadow-glow-purple'
    },
    {
      id: 'meetTheCharacter',
      route: '/meet',
      icon: 'theater_comedy',
      textClass: 'text-festival-orange',
      bgClass: 'bg-festival-orange/10',
      borderClass: 'border-festival-orange/30',
      hoverBorderClass: 'hover:border-festival-orange',
      shadowClass: 'hover:shadow-glow-pink'
    },
    {
      id: 'plantYourLegacy',
      route: '/plant',
      icon: 'local_florist',
      textClass: 'text-festival-teal',
      bgClass: 'bg-festival-teal/10',
      borderClass: 'border-festival-teal/30',
      hoverBorderClass: 'hover:border-festival-teal',
      shadowClass: 'hover:shadow-glow-teal'
    },
    {
      id: 'exploreWorld',
      route: '/globe',
      icon: 'public',
      textClass: 'text-festival-blue',
      bgClass: 'bg-festival-blue/10',
      borderClass: 'border-festival-blue/30',
      hoverBorderClass: 'hover:border-festival-blue',
      shadowClass: 'hover:shadow-glow-teal'
    },
  ];

  return (
    <div className="flex-1 w-full relative overflow-hidden bg-gradient-to-br from-[#05050A] to-[#0A0A1A] p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Background Layer 1: Corner Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#4A0E17] blur-[180px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0D1B2A] blur-[180px] opacity-30 pointer-events-none" />

      {/* Background Layer 2: Manuscript Texture (SVG Data URI) */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 150 Q 80 120 120 160 T 180 140 T 220 180 T 280 150 T 320 190' stroke='white' stroke-width='1.5' fill='none' stroke-dasharray='5,5' opacity='0.3'/%3E%3Cpath d='M100 250 Q 130 220 170 260 T 230 240 T 270 280 T 330 250' stroke='white' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`, backgroundSize: '400px 400px' }} />

      {/* Background Layer 3: Stage Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[radial-gradient(ellipse_at_top,_rgba(20,20,35,0.4)_0%,_transparent_70%)] blur-2xl pointer-events-none" />

      {/* Background Layer 4: Cinematic Fog (Now more visible) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-100">
        {/* Layered large blurred shapes for realistic drifting fog */}
        <div className="absolute top-[10%] left-[-20%] w-[140%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(160,35,142,0.4)_0%,_rgba(255,255,255,0.25)_40%,_transparent_70%)] blur-[120px] animate-cinematic-fog" />
        <div className="absolute top-[30%] right-[-10%] w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_center,_rgba(200,200,250,0.3)_0%,_transparent_60%)] blur-[100px] animate-cinematic-fog" style={{ animationDelay: '-12s', animationDuration: '30s' }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[100%] h-[60%] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_50%)] blur-[90px] animate-cinematic-fog" style={{ animationDelay: '-5s', animationDuration: '20s' }} />
      </div>

      {/* Background Layer 5: Floating Dust Particles (Illuminated stage particles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div key={`dust-${i}`} className="absolute w-1.5 h-1.5 bg-[#FFD700] rounded-full blur-[1px] animate-theater-dust" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.4, boxShadow: '0 0 8px 2px rgba(255, 215, 0, 0.4)', animationDelay: `${Math.random() * 10}s`, animationDuration: `${12 + Math.random() * 10}s` }} />
        ))}
      </div>

      {/* Background Layer 6: Velvet Curtains (Left & Right framing elements with dark burgundy tones) */}
      <div className="absolute top-0 left-0 w-[12vw] max-w-[250px] h-full pointer-events-none z-0 mix-blend-screen" style={{ background: 'linear-gradient(to right, rgba(90, 16, 42, 0.8) 0%, rgba(90, 16, 42, 0.3) 50%, transparent 100%)' }} />
      <div className="absolute top-0 right-0 w-[12vw] max-w-[250px] h-full pointer-events-none z-0 mix-blend-screen" style={{ background: 'linear-gradient(to left, rgba(90, 16, 42, 0.8) 0%, rgba(90, 16, 42, 0.3) 50%, transparent 100%)' }} />

      {/* Audio Ambient (Removed: Pixabay CDN blocks direct hotlinking causing 403 errors) */}

      {/* Main Content Container */}
      <div className="relative z-10 w-full mx-auto max-w-[1400px] animate-slide-up mt-2 xl:mt-4">
        <header className="relative mb-8 xl:mb-12 text-center flex flex-col items-center">
          {/* Title Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-100/5 blur-[100px] rounded-full pointer-events-none" />

          <svg className="w-8 h-8 xl:w-10 xl:h-10 text-festival-pink mb-4 xl:mb-6 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20" />
            <path d="M4 20L5.5 8 9 12 12 4l3 8 3.5-4L20 20" />
          </svg>
          <h1 className="relative z-10 font-display text-3xl md:text-4xl xl:text-5xl font-bold mb-2 xl:mb-4 uppercase tracking-wide text-white" style={{ textShadow: '0 4px 24px rgba(255,255,255,0.1)' }}>{t('heading', 'mainHub')}</h1>
          <p className="relative z-10 text-gray-400 text-sm xl:text-base max-w-2xl mx-auto">{t('subtitle', 'mainHub')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => navigate(card.route)}
              className={`glass-effect relative flex h-[300px] xl:h-[380px] cursor-pointer flex-col items-center justify-start py-8 xl:py-10 rounded-3xl border border-white/5 bg-[#0a0a0f]/40 transition-all duration-500 hover:-translate-y-3 group overflow-hidden ${card.hoverBorderClass}`}
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              {/* Refined Card Hover Effects: Glow, Border Illumination, Spotlight Sweep */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${card.shadowClass.replace('hover:', '')}`} />
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:animate-spotlight-sweep pointer-events-none" />

              <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${card.bgClass} ${card.textClass} group-hover:scale-110 group-hover:bg-opacity-20 group-hover:shadow-[0_0_20px_currentColor]`}>
                <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">{card.icon}</span>
              </div>

              <h2 className="relative z-10 text-center font-display text-lg font-bold px-4 mb-6 uppercase leading-snug tracking-wider text-gray-200 group-hover:text-white transition-colors duration-300">
                {t(`cards.${card.id}.title`, 'mainHub')}
              </h2>

              <p className="relative z-10 text-center text-sm text-gray-400 px-6 leading-relaxed mb-auto group-hover:text-gray-300 transition-colors duration-300">
                {t(`cards.${card.id}.description`, 'mainHub')}
              </p>

              <span className={`absolute bottom-8 z-10 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${card.textClass} opacity-70 group-hover:opacity-100 group-hover:tracking-[0.25em]`}>
                {t(`cards.${card.id}.tagline`, 'mainHub')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
