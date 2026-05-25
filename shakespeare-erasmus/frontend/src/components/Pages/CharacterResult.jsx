import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CHARACTERS } from '../../data/chatbotData';
import { useLanguage } from '../../context/LanguageContext';

const COLOR_MAP = {
  primary:   '#fface8',
  secondary: '#ffb4a2',
  tertiary:  '#6ed7d7',
};

export default function CharacterResult() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { t } = useLanguage();

  // result is passed via navigate state; fallback to hamlet for direct URL access
  const result = location.state?.result || CHARACTERS.hamlet;

  const archetypeColors = result.archetypes.map((_, i) => {
    const keys = result.archetypeColors || ['primary', 'secondary', 'tertiary'];
    return COLOR_MAP[keys[i]] || '#fface8';
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #05020a 0%, #0a0616 40%, #110a1f 100%)', color: '#e4e1e7' }}>

      <style>
        {`
          @keyframes aurora-1 {
            0% { transform: translate(-10%, -10%) rotate(0deg) scale(1); }
            50% { transform: translate(10%, 10%) rotate(180deg) scale(1.2); }
            100% { transform: translate(-10%, -10%) rotate(360deg) scale(1); }
          }
          @keyframes aurora-2 {
            0% { transform: translate(10%, -10%) rotate(0deg) scale(1.1); }
            50% { transform: translate(-10%, 20%) rotate(-180deg) scale(1); }
            100% { transform: translate(10%, -10%) rotate(-360deg) scale(1.1); }
          }
          @keyframes aurora-3 {
            0% { transform: translate(0%, 20%) rotate(0deg) scale(1); }
            50% { transform: translate(20%, -10%) rotate(180deg) scale(1.3); }
            100% { transform: translate(0%, 20%) rotate(360deg) scale(1); }
          }
          @keyframes drift-stars-1 {
            from { background-position: 0 0; }
            to { background-position: -1000px 500px; }
          }
          @keyframes drift-stars-2 {
            from { background-position: 0 0; }
            to { background-position: 800px -400px; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      {/* Ambient cinematic background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Animated Aurora Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[60vh] rounded-[100%] opacity-40 mix-blend-screen"
          style={{ background: 'radial-gradient(ellipse at center, rgba(110,215,215,0.25) 0%, transparent 60%)', filter: 'blur(100px)', animation: 'aurora-1 25s infinite linear' }} />
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[70vh] rounded-[100%] opacity-30 mix-blend-screen"
          style={{ background: 'radial-gradient(ellipse at center, rgba(160,35,142,0.2) 0%, transparent 60%)', filter: 'blur(120px)', animation: 'aurora-2 30s infinite linear' }} />
        <div className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[60vh] rounded-[100%] opacity-25 mix-blend-screen"
          style={{ background: 'radial-gradient(ellipse at center, rgba(40,110,230,0.25) 0%, transparent 60%)', filter: 'blur(130px)', animation: 'aurora-3 35s infinite linear' }} />

        {/* Left Side: Faded Astrological Chart */}
        <div className="absolute top-0 -left-64 w-[900px] h-[900px] opacity-[0.08] mix-blend-screen" style={{ transform: 'rotate(-15deg)' }}>
          <svg className="w-full h-full stroke-[0.5] fill-none" style={{ stroke: '#d4af37' }} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="160" />
            <circle cx="200" cy="200" r="130" strokeDasharray="1 6" strokeWidth="2" />
            <circle cx="200" cy="200" r="80" />
            <line x1="200" y1="10" x2="200" y2="390" />
            <line x1="10" y1="200" x2="390" y2="200" />
            <line x1="65" y1="65" x2="335" y2="335" />
            <line x1="65" y1="335" x2="335" y2="65" />
            <line x1="130" y1="20" x2="270" y2="380" />
            <line x1="270" y1="20" x2="130" y2="380" />
            <line x1="20" y1="130" x2="380" y2="270" />
            <line x1="20" y1="270" x2="380" y2="130" />
            <polygon points="200,40 220,180 360,200 220,220 200,360 180,220 40,200 180,180" opacity="0.3" />
          </svg>
        </div>

        {/* Animated Twinkling & Drifting Starry Particles */}
        <div className="absolute inset-0 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '80px 80px', animation: 'drift-stars-1 120s linear infinite, twinkle 4s ease-in-out infinite alternate' }} />
        <div className="absolute inset-0 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.9) 1.5px, transparent 1.5px)', backgroundSize: '150px 150px', backgroundPosition: '40px 40px', animation: 'drift-stars-2 180s linear infinite, twinkle 7s ease-in-out infinite alternate-reverse' }} />
        <div className="absolute inset-0 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(160,200,255,0.7) 2px, transparent 2px)', backgroundSize: '250px 250px', backgroundPosition: '100px 100px', animation: 'drift-stars-1 240s linear infinite, twinkle 10s ease-in-out infinite' }} />
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 min-h-screen flex items-center py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full items-center">

          {/* ── LEFT: Result Content ── */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center space-y-12">

            {/* Character reveal */}
            <div className="space-y-4">
              <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#fface8' }}>
                {t('chatbot.behold')}
              </p>
              <h1 className="font-serif font-bold leading-none text-white"
                style={{ fontSize: 'clamp(56px, 8vw, 96px)', letterSpacing: '-0.02em' }}>
                {t('chatbot.characters.' + result.id + '.name')}
              </h1>
              <p className="text-lg italic leading-relaxed max-w-lg" style={{ color: '#d8c0ce' }}>
                {t('chatbot.characters.' + result.id + '.description')}
              </p>

              {/* Archetype badges */}
              <div className="flex flex-wrap gap-3 mt-4">
                {result.archetypes.map((arch, i) => (
                  <span key={arch}
                    className="text-xs font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full"
                    style={{
                      color: archetypeColors[i],
                      border: `1px solid ${archetypeColors[i]}44`,
                      background: `${archetypeColors[i]}18`,
                    }}>
                    {t('chatbot.characters.' + result.id + '.archetypes.' + i)}
                  </span>
                ))}
              </div>
            </div>

            {/* Defining Virtues */}
            <div className="p-8 rounded-2xl space-y-5"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#d8c0ce' }}>{t('chatbot.definingVirtues')}</p>
              <div className="grid grid-cols-2 gap-5">
                {result.strengths.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl" style={{ color: s.color }}>{s.icon}</span>
                    <span className="text-lg" style={{ color: '#e4e1e7' }}>{t('chatbot.characters.' + result.id + '.strengths.' + i)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Famous quote */}
            <div className="relative pl-8" style={{ borderLeft: '2px solid rgba(255,172,232,0.3)' }}>
              <div className="absolute -left-4 top-0"
                style={{ color: '#a0238e', background: '#131317', padding: '0 4px' }}>
                <span className="material-symbols-outlined text-3xl">format_quote</span>
              </div>
              <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
                {t('chatbot.characters.' + result.id + '.quote')}
              </p>
              <p className="mt-3 text-sm tracking-widest uppercase" style={{ color: '#a08b98' }}>
                — {t('chatbot.characters.' + result.id + '.name')}, {t('chatbot.characters.' + result.id + '.play')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-start gap-4 pt-6 border-t border-white/5">
              <button
                onClick={() => navigate('/main-hub')}
                className="flex items-center justify-center gap-3 px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-2xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, rgba(110,215,215,0.15) 0%, rgba(255,255,255,0.05) 100%)', border: '1px solid rgba(110,215,215,0.4)', color: '#6ed7d7', backdropFilter: 'blur(12px)' }}>
                <span className="material-symbols-outlined">auto_awesome</span>
                {t('chatbot.continueJourney')}
              </button>
              <button onClick={() => navigate('/discover')}
                className="sh-retake-quiz-link text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer pl-6"
                style={{ color: '#a08b98' }}
                onMouseEnter={e => e.currentTarget.style.color='#d8c0ce'}
                onMouseLeave={e => e.currentTarget.style.color='#a08b98'}>
                ↩ {t('chatbot.retakeQuiz')}
              </button>
            </div>
          </div>

          {/* ── RIGHT: Portrait ── */}
          <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center pt-16 lg:pt-0">
            <div className="relative w-full max-w-sm" style={{ aspectRatio: '4/5' }}>

              {/* Glow frame */}
              <div className="absolute inset-0 rounded-2xl blur-xl transform rotate-3 opacity-20"
                style={{ background: 'linear-gradient(to top right, #a0238e, #cf2e00, transparent)' }} />

              {/* Portrait */}
              <div className="relative w-full h-full p-4 rounded-2xl overflow-hidden transition-transform duration-700 hover:rotate-0"
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', transform: 'rotate(-1deg)' }}>
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={result.portraitUrl}
                    alt={result.name}
                    className="w-full h-full object-cover object-center transition-all duration-1000 scale-110 hover:scale-100 grayscale hover:grayscale-0"
                  />
                  {/* Bottom overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {result.act}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: '#6ed7d7', filter: 'blur(60px)', opacity: 0.1 }} />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full" style={{ background: '#fface8', filter: 'blur(60px)', opacity: 0.1 }} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
