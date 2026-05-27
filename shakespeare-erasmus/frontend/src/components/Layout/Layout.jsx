import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/Craiova fest logo.png';

export default function Layout() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/main-hub', icon: 'hub', label: t('layout.mainHub') },
    { to: '/behind-curtain', icon: 'theater_comedy', label: t('layout.behindCurtain') },
    { to: '/garden', icon: 'local_florist', label: t('layout.garden') },
    { to: '/globe', icon: 'public', label: t('layout.globe') }
  ];

  return (
    <div className="min-h-screen bg-shakespeare-dark text-white font-body selection:bg-festival-purple selection:text-white flex flex-col">
      {/* Immersive Fixed Floating Navbar */}
      <div className="fixed top-4 sm:top-6 inset-x-2 sm:inset-x-4 lg:inset-x-8 z-50 max-w-[90rem] mx-auto rounded-full bg-shakespeare-dark/45 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(160,35,142,0.15)] overflow-hidden">
        <header className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex justify-between items-center w-full min-w-max px-3 sm:px-6 md:px-8 py-2 sm:py-3 gap-4 sm:gap-8">
            
            {/* Top Left: Logo & Title */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-festival-yellow/40 transition shrink-0">
                  <img
                    alt="Craiova International Shakespeare Festival Logo"
                    className="w-full h-full object-contain mix-blend-screen opacity-90"
                    src={logo}
                  />
                </div>
                <div className="text-left hidden sm:block">
                  <span className="font-display font-bold text-base md:text-xl text-white group-hover:text-festival-yellow transition tracking-tight">
                    Shakespeare Erasmus
                  </span>
                </div>
              </Link>
            </div>

            {/* Top Center: Action Icons/Links */}
            <nav className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4 font-serif font-medium tracking-wide shrink-0">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-1.5 xl:px-4 xl:py-2 rounded-full transition-all duration-300 group border shrink-0 ${
                      isActive 
                        ? 'bg-festival-purple/20 border-festival-purple/30 text-white shadow-[0_0_15px_rgba(160,35,142,0.25)]' 
                        : 'bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[16px] sm:text-lg xl:text-xl transition-all duration-300 ${
                      isActive ? 'text-festival-yellow animate-pulse' : 'text-white/60 group-hover:text-festival-yellow'
                    }`}>
                      {link.icon}
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase font-body hidden xl:inline">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Top Right: Language Selector */}
            <div className="flex items-center gap-1 sm:gap-2 text-white/80 shrink-0">
              <div className="flex items-center gap-0.5 sm:gap-1 bg-white/5 border border-white/10 rounded-full px-2 sm:px-2.5 py-1 md:px-3 md:py-1.5">
                <span className="material-symbols-outlined text-[10px] sm:text-xs md:text-sm text-white/50 hidden md:inline">language</span>
                
                {/* Mobile: Cycle language on click */}
                <button 
                  onClick={() => {
                    const langs = ['en', 'ro', 'fr', 'es'];
                    setLanguage(langs[(langs.indexOf(language) + 1) % langs.length]);
                  }}
                  className="sm:hidden text-[10px] xs:text-xs font-bold uppercase text-festival-yellow focus:outline-none"
                >
                  {language}
                </button>

                {/* Desktop: Show all inline */}
                <span className="hidden sm:flex text-[9px] xs:text-[10px] md:text-xs font-bold tracking-[0.05em] xs:tracking-widest uppercase items-center gap-0.5 xs:gap-1 md:gap-1.5">
                  {['en', 'ro', 'fr', 'es'].map((lang, idx) => (
                    <React.Fragment key={lang}>
                      <button
                        onClick={() => setLanguage(lang)}
                        className={`hover:text-festival-yellow transition-colors focus:outline-none cursor-pointer ${
                          language === lang ? 'text-festival-yellow font-black scale-105' : 'text-white/40'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                      {idx < 3 && <span className="text-white/10 select-none mx-[1px] xs:mx-0">|</span>}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>

          </div>
        </header>
      </div>

      <main className={`flex-1 flex flex-col ${location.pathname === '/' ? '' : 'pt-32 pb-12'}`}>
        <div key={location.pathname} className="page-fade-in flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
