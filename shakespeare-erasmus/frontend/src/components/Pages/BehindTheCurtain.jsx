import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ProfessorItem = ({ name, role, avatar }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full flex-shrink-0 bg-[#1c0f1a] border border-[#ff00ff]/20 flex items-center justify-center overflow-hidden">
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="material-symbols-outlined text-white/30 text-lg">person</span>
      )}
    </div>
    <div>
      <h4 className="font-serif text-lg font-bold text-white">{name}</h4>
      <p className="font-sans text-xs text-[#dcbed4] mt-1">{role}</p>
    </div>
  </div>
);


const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Sanjana Singh',
    memberKey: 'sanjana',
    countryKey: 'india',
    flag: 'https://flagcdn.com/w40/in.png',
    avatar: '/assets/team-profiles-real/sanjana-singh.webp'
  },
  {
    id: 2,
    name: 'Kevin Kiprop Mutai',
    memberKey: 'kevin',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/kevin-kiprop-mutai.webp'
  },
  {
    id: 3,
    name: 'Drina Musili',
    memberKey: 'drina',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/drina-musili.webp'
  },
  {
    id: 4,
    name: 'Nzanzu Kataka',
    memberKey: 'nzanzu',
    countryKey: 'drc',
    flag: 'https://flagcdn.com/w40/cd.png',
    avatar: '/assets/team-profiles-real/nzanzu-kataka.webp'
  },
  {
    id: 5,
    name: 'Sharon E. Chepkemoi',
    memberKey: 'sharon',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/sharon-e-chepkemoi.webp'
  },
  {
    id: 6,
    name: 'Gloria Wanja',
    memberKey: 'gloria',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/gloria-wanja.webp'
  },
  {
    id: 7,
    name: 'Isaac Mudave',
    memberKey: 'isaac',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/isaac-mudave.webp'
  },
  {
    id: 8,
    name: 'Aksanti Bahizire Actif',
    memberKey: 'aksanti',
    countryKey: 'drc',
    flag: 'https://flagcdn.com/w40/cd.png',
    avatar: '/assets/team-profiles-real/aksanti-bahizire-actif.webp'
  },
  {
    id: 9,
    name: 'Sandra Mkanyi',
    memberKey: 'sandra',
    countryKey: 'kenya',
    flag: 'https://flagcdn.com/w40/ke.png',
    avatar: '/assets/team-profiles-real/sandra-mkanyi.webp'
  }
];

export default function BehindTheCurtain() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center pb-24"
      style={{ background: 'linear-gradient(to bottom, #1c0f1a 0%, #000000 100%)', color: '#f4dcec' }}>

      {/* Background Ambience: Cinematic Nocturne */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Stage Lights (Neon Magenta) */}
        <div className="absolute -top-32 right-[-10%] w-[800px] h-[800px] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        {/* Soft Glow (Muted Gold) */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', filter: 'blur(120px)' }} />

        {/* Stardust Particles */}
        <div className="absolute inset-0 opacity-[0.2]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 1px, transparent 1px)', backgroundSize: '48px 48px', backgroundPosition: '0 0' }} />
        <div className="absolute inset-0 opacity-[0.1]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #ffabf3 1.5px, transparent 1.5px)', backgroundSize: '76px 76px', backgroundPosition: '24px 24px' }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 pt-24 md:pt-32 flex flex-col items-center">

        {/* Hero Section */}
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#ffabf3' }}>
            {t('teamShowcase.eyebrow')}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {t('teamShowcase.title')}
          </h1>
          <p className="font-sans text-base md:text-lg max-w-4xl mx-auto leading-relaxed" style={{ color: '#dcbed4' }}>
            {t('teamShowcase.description')}
          </p>
        </header>

        {/* Team Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map(member => (
            <div key={member.id}
              onClick={() => setSelectedDeveloper(member)}
              className="relative group overflow-hidden rounded-2xl p-5 md:p-6 flex items-center gap-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,0,255,0.15)]"
              style={{
                background: 'rgba(28, 15, 26, 0.65)',
                backdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(255,171,243,0.35)',
                borderLeft: '1px solid rgba(255,171,243,0.15)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                borderRight: '1px solid rgba(255,255,255,0.05)',
              }}>

              {/* Avatar with Inner Glow */}
              <div className="sh-team-card-avatar w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 relative border border-transparent group-hover:border-[#ff00ff]/60 transition-colors duration-300 bg-[#1c0f1a] flex items-center justify-center">
                <div className="absolute inset-0 shadow-[inset_0_0_12px_rgba(255,0,255,0.4)] z-10 rounded-2xl mix-blend-screen pointer-events-none" />
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="material-symbols-outlined text-white/30 text-2xl group-hover:text-[#ffabf3]/60 transition-colors">person</span>
                )}
              </div>

              {/* Details (Pre-Click) */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#ffabf3] transition-colors duration-300">{member.name}</h3>
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] mt-2 truncate flex items-center gap-2" style={{ color: '#d4af37' }}>
                  <img src={member.flag} alt={`${t('teamShowcase.countries.' + member.countryKey)} flag`} className="w-5 h-auto rounded-sm object-cover" />
                  {t('teamShowcase.countries.' + member.countryKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Guidance Divider */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-12">
          <div className="flex items-center w-full gap-4 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffabf3]/30"></div>
            <div className="w-12 h-12 rounded-full border border-[#ffabf3]/30 flex items-center justify-center bg-[#1c0f1a]/80">
              <span className="material-symbols-outlined text-[#ffabf3]">school</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffabf3]/30"></div>
          </div>
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#ffabf3] mb-3">
            {t('teamShowcase.academicGuidance.title')}
          </h2>
          <p className="font-sans text-sm text-[#dcbed4] text-center max-w-2xl">
            {t('teamShowcase.academicGuidance.subtitle')}
          </p>
        </div>

        {/* University of Craiova Card */}
        <div className="w-full max-w-4xl mx-auto mb-10">
          <div className="relative group overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-around text-center transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,0,255,0.15)] gap-8"
            style={{
              background: 'rgba(28, 15, 26, 0.65)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(255,171,243,0.35)',
              borderLeft: '1px solid rgba(255,171,243,0.15)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
            
            <div className="flex-1">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Dr. Sorin Cazacu</h3>
              <p className="font-sans text-sm md:text-base font-medium mb-1" style={{ color: '#ffabf3' }}>{t('teamShowcase.academicGuidance.roles.sorin')}</p>
              <p className="font-sans text-xs mt-2 text-white/60">{t('teamShowcase.academicGuidance.universities.craiova')}</p>
            </div>

            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="flex-1">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Prof. Claudiu-Ionuț Popîrlan</h3>
              <p className="font-sans text-sm md:text-base font-medium mb-1" style={{ color: '#ffabf3' }}>{t('teamShowcase.academicGuidance.roles.claudiu')}</p>
              <p className="font-sans text-xs mt-2 text-white/60">{t('teamShowcase.academicGuidance.universities.craiova')}</p>
            </div>

          </div>
        </div>

        {/* Country Sections */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-24 max-w-5xl mx-auto">
          {/* INDIA */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,0,255,0.15)] group"
            style={{
              background: 'rgba(28, 15, 26, 0.65)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(255,171,243,0.35)',
              borderLeft: '1px solid rgba(255,171,243,0.15)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
            {/* Map Background */}
            <div className="absolute inset-0 opacity-[0.10] pointer-events-none group-hover:opacity-[0.18] transition-opacity duration-500"
                 style={{ backgroundImage: 'url("/india%20map.png")', backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />
            
            <div className="relative z-10 flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <img src="/India.png" alt="India flag" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
              <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[0.15em] text-white">{t('teamShowcase.academicGuidance.countries.india')}</h2>
            </div>

            <div className="relative z-10 flex flex-col gap-6">
               <ProfessorItem name="Dr. Vikas Kumar Sabata" role={t('teamShowcase.academicGuidance.roles.vikas')} />
               <ProfessorItem name="Ms. Aparupa Patnaik" role={t('teamShowcase.academicGuidance.roles.aparupa')} />
               <ProfessorItem name="Dr. Samuel Rout" role={t('teamShowcase.academicGuidance.roles.samuel')} />
               <ProfessorItem name="Ms. Melanie Waser" role={t('teamShowcase.academicGuidance.roles.melanie')} />
               <ProfessorItem name="Dr. Kadey Soren" role={t('teamShowcase.academicGuidance.roles.kadey')} />
               <ProfessorItem name="Dr. Prasanna Kumar Samanta" role={t('teamShowcase.academicGuidance.roles.prasanna')} />
               
               {/* Art of Giving Component */}
               <a href="https://artofgiving.in.net/" target="_blank" rel="noopener noreferrer" 
                  className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-[#ff00ff]/40 bg-[#1c0f1a]/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,0,255,0.15)]">
                 <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#ff00ff]/20 group-hover:border-[#ff00ff]/60 transition-colors bg-white">
                   <img src="/AOG.jpeg" alt="Art of Giving Logo" className="w-full h-full object-cover" />
                 </div>
                 <div className="text-center sm:text-left flex-1">
                   <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#ffabf3] transition-colors">{t('teamShowcase.academicGuidance.aogTitle')}</h4>
                   <p className="font-sans text-xs text-[#dcbed4] mt-2 leading-relaxed">
                     {t('teamShowcase.academicGuidance.aogDescription')}
                   </p>
                 </div>
               </a>
            </div>
          </div>

          {/* KENYA */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,0,255,0.15)] group"
            style={{
              background: 'rgba(28, 15, 26, 0.65)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(255,171,243,0.35)',
              borderLeft: '1px solid rgba(255,171,243,0.15)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
            {/* Map Background */}
            <div className="absolute inset-0 opacity-[0.10] pointer-events-none group-hover:opacity-[0.18] transition-opacity duration-500"
                 style={{ backgroundImage: 'url("/kenya%20map.png")', backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }} />
            
            <div className="relative z-10 flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
              <img src="/Kenya.png" alt="Kenya flag" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
              <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[0.15em] text-white">{t('teamShowcase.academicGuidance.countries.kenya')}</h2>
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <ProfessorItem name="Dr. Maranga Jared" role={t('teamShowcase.academicGuidance.roles.maranga')} />
              <ProfessorItem name="Ms. Virginia" role={t('teamShowcase.academicGuidance.roles.virginia')} />
            </div>
          </div>
        </div>

        {/* Return Navigation */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          style={{
            background: 'rgba(28, 15, 26, 0.8)',
            border: '1px solid rgba(255,171,243,0.5)',
            color: '#ffabf3',
            boxShadow: '0 0 25px rgba(255,0,255,0.15)'
          }}>
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          {t('teamShowcase.returnToStage')}
        </button>

      </main>

      {/* Developer Details Modal */}
      {selectedDeveloper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedDeveloper(null)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl p-8 sm:p-10 overflow-hidden animate-slide-up"
            style={{
              background: 'rgba(28, 15, 26, 0.85)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,171,243,0.4)',
              borderLeft: '1px solid rgba(255,171,243,0.2)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 80px rgba(255,0,255,0.2)'
            }}>

            {/* Ambient Modal Glow */}
            <div className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-[#ff00ff]/10 rounded-full blur-[80px] pointer-events-none" />

            <button
              onClick={() => setSelectedDeveloper(null)}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex flex-col items-center text-center relative z-10">
              {/* Modal Avatar */}
              <div className="sh-team-modal-avatar w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-[#ff00ff]/40 shadow-[0_0_25px_rgba(255,0,255,0.2)] bg-[#1c0f1a] flex items-center justify-center relative">
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,0,255,0.4)] z-10 rounded-2xl pointer-events-none mix-blend-screen" />
                {selectedDeveloper.avatar ? (
                  <img src={selectedDeveloper.avatar} alt={selectedDeveloper.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-white/20 text-5xl">person</span>
                )}
              </div>

              {/* Identity */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">{selectedDeveloper.name}</h2>
              <div className="flex flex-col items-center gap-2 mb-8">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#ffabf3' }}>
                  {t('teamShowcase.roles.' + selectedDeveloper.memberKey)}
                </p>
                <div className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: '#d4af37' }}>
                  <img src={selectedDeveloper.flag} alt={`${t('teamShowcase.countries.' + selectedDeveloper.countryKey)} flag`} className="w-4 h-auto rounded-sm object-cover opacity-80" />
                  <span>{t('teamShowcase.countries.' + selectedDeveloper.countryKey)}</span>
                </div>
              </div>

              <div className="w-16 h-px bg-white/20 mb-8" />

              {/* Thought / Quote */}
              <div className="relative px-6">
                <span className="absolute -top-4 -left-2 text-5xl opacity-20 font-serif" style={{ color: '#d4af37' }}>&ldquo;</span>
                <p className="font-serif italic text-lg sm:text-xl leading-relaxed relative z-10 whitespace-pre-wrap" style={{ color: '#dcbed4' }}>
                  {t('teamShowcase.thoughts.' + selectedDeveloper.memberKey)}
                </p>
                <span className="absolute -bottom-8 -right-2 text-5xl opacity-20 font-serif" style={{ color: '#d4af37' }}>&rdquo;</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
