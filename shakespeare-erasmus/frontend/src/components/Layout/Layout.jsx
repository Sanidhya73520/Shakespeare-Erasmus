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
      <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[90rem] 
                       flex justify-between items-center px-6 md:px-8 py-3 rounded-full 
                       bg-shakespeare-dark/45 backdrop-blur-xl border border-white/10 
                       shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(160,35,142,0.15)]">
        
        {/* Top Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-festival-yellow/40 transition">
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
        <nav className="flex items-center gap-2 md:gap-4 font-serif font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 group border ${
                  isActive 
                    ? 'bg-festival-purple/20 border-festival-purple/30 text-white shadow-[0_0_15px_rgba(160,35,142,0.25)]' 
                    : 'bg-transparent border-transparent text-white/70 hover:bg-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-lg md:text-xl transition-all duration-300 ${
                  isActive ? 'text-festival-yellow animate-pulse' : 'text-white/60 group-hover:text-festival-yellow'
                }`}>
                  {link.icon}
                </span>
                <span className="text-xs font-bold tracking-wider uppercase font-body hidden md:inline">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Top Right: Language Selector */}
        <div className="flex items-center gap-2 text-white/80">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 md:px-3 md:py-1.5">
            <span className="material-symbols-outlined text-xs md:text-sm text-white/50 hidden xs:inline">language</span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-1 md:gap-1.5">
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
                  {idx < 3 && <span className="text-white/10 select-none">|</span>}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>

      </header>

      <main className={`flex-1 flex flex-col ${location.pathname === '/' ? '' : 'pt-32 pb-12'}`}>
        <div key={location.pathname} className="page-fade-in flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
