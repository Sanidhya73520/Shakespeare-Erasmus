import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../../context/JourneyContext';
import { useLanguage } from '../../../context/LanguageContext';
import { addEntry } from '../../../data/gardenStore';

const FLOWER_ICONS = {
  rose: 'local_florist', lily: 'local_florist', sunflower: 'local_florist',
  lotus: 'local_florist', tulip: 'filter_vintage', iris: 'filter_vintage',
  daisy: 'filter_vintage', orchid: 'local_florist', peony: 'local_florist', lavender: 'grass'
};

const BLANK_FLOWER_DATA = { name: '', message: '', flowerType: '', plantedAt: null };

export default function Step3_Confirmation() {
  const navigate = useNavigate();
  const { journey, setJourney } = useJourney();
  const { t, language } = useLanguage();

  // ── Snapshot current user's data into refs at FIRST render ──
  // This way the summary card always shows the correct details
  // even after the journey context is reset for the next user.
  const sessionRef = useRef({
    name:       journey.experiences.plantYourLegacy.flowerData.name,
    message:    journey.experiences.plantYourLegacy.flowerData.message,
    flowerType: journey.experiences.plantYourLegacy.flowerData.flowerType,
    plantedAt:  new Date().toISOString(),
  });
  const savedRef = useRef(false);

  const { name, message, flowerType, plantedAt } = sessionRef.current;

  useEffect(() => {
    if (savedRef.current) return;
    if (!name || !flowerType) return;

    savedRef.current = true;

    // ── Persist to garden store ───────────────────────────────────
    addEntry({ name, message, flowerType, plantedAt });
    // API integration point:
    // fetch('/api/legacy', { method: 'POST', headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({ name, message, flowerType, plantedAt }) });
  }, []); // run once on mount — NO reset here so the card displays correctly

  // ── Session reset: clears journey for the NEXT user ─────────────
  // Only triggered when the user explicitly leaves this page.
  const resetAndGo = (path) => {
    setJourney(prev => ({
      ...prev,
      experiences: {
        ...prev.experiences,
        plantYourLegacy: {
          completed:   true,
          completedAt: plantedAt,
          flowerData:  BLANK_FLOWER_DATA,
        }
      }
    }));
    navigate(path);
  };

  const localeMap = { en: 'en-US', ro: 'ro-RO', fr: 'fr-FR', es: 'es-ES' };
  const formattedDate = new Date(plantedAt).toLocaleString(localeMap[language] || 'en-US', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  const flowerLabel = flowerType ? t('plantYourLegacy.flowers.' + flowerType + '.name') : '—';
  const icon = FLOWER_ICONS[flowerType] || 'local_florist';

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-8 py-20" style={{ background: '#131317', color: '#e4e1e7' }}>
      {/* Atmospheric BG */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfTKRhEevMJUlV9kv4mA_3ikgyGe1Bbc-fjJ4xhFM9ICglTQ4PnEAZS0sVI56_pZAeXBUF_ILPj3Q1xeTDO4GlGa_fT4h_GfPOV_5e-hE2O1joFDe9uYokIhM4y1JTGap5-0IOep9YslMsJXEYARWmH9imX0isp2vyzPBBjGNRVuzTTlEEJx5vpo0HUCQowaZo52p7i1aevfU-faHcJM3M2pL-Fvs50qtH-bP07SB9mFw4gVT9V9mCdi91hOH1-4f5d7Flabp-v44m"
          alt="Garden"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3)' }}
        />
      </div>
      <div className="fixed top-1/4 -left-20 w-[500px] h-[500px] rounded-full z-0 animate-drift-legacy-one" style={{ background: '#a0238e', filter: 'blur(100px)', opacity: 0.4 }} />
      <div className="fixed bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full z-0 animate-drift-legacy-two" style={{ background: '#cf2e00', filter: 'blur(100px)', opacity: 0.3 }} />

      <section className="relative z-10 w-full max-w-[800px] flex flex-col items-center text-center gap-12">
        {/* Celebratory header */}
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A0238E 0%, #E43D12 100%)', boxShadow: '0 0 40px rgba(160,35,142,0.6)' }}>
              <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>local_florist</span>
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white">
            {t('plantYourLegacy.flowerPlanted')}
          </h1>
          <p className="text-lg italic max-w-xl mx-auto" style={{ color: '#d8c0ce' }}>
            {t('plantYourLegacy.step3Quote')}
          </p>
        </div>

        {/* Summary card */}
        <div className="w-full p-10 rounded-2xl text-left relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {/* Left */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#fface8' }}>{t('plantYourLegacy.yourName')}</span>
                <p className="font-serif text-3xl font-semibold text-white">{name || '—'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#fface8' }}>{t('plantYourLegacy.yourMessage')}</span>
                <p className="text-base leading-relaxed" style={{ color: '#d8c0ce' }}>{message || '—'}</p>
              </div>
            </div>
            {/* Right */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#fface8' }}>{t('plantYourLegacy.yourFlower')}</span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="p-2 rounded-full" style={{ background: 'rgba(110,215,215,0.2)', border: '1px solid rgba(110,215,215,0.3)' }}>
                    <span className="material-symbols-outlined" style={{ color: '#6ed7d7' }}>{icon}</span>
                  </div>
                  <p className="font-serif text-2xl font-semibold text-white">{flowerLabel}</p>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#fface8' }}>{t('plantYourLegacy.plantedOn')}</span>
                <div className="flex items-center gap-2" style={{ color: '#d8c0ce' }}>
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  <p className="text-sm">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center">
          {/* VIEW GARDEN — resets session for next user then navigates */}
          <button
            onClick={() => resetAndGo('/garden')}
            className="w-full md:w-auto px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #A0238E 0%, #E43D12 100%)', boxShadow: '0 0 30px rgba(160,35,142,0.4)', color: '#fff' }}
          >
            {t('plantYourLegacy.viewGarden')}
          </button>
          {/* CONTINUE JOURNEY — also resets session */}
          <button
            onClick={() => resetAndGo('/main-hub')}
            className="w-full md:w-auto px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/10 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.2)', color: '#e4e1e7', backdropFilter: 'blur(8px)' }}
          >
            {t('chatbot.continueJourney')}
          </button>
        </div>
      </section>
    </div>
  );
}
