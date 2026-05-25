import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../../context/JourneyContext';
import { useLanguage } from '../../../context/LanguageContext';

export default function Step1_Details() {
  const navigate = useNavigate();
  const { journey, setJourney } = useJourney();
  const { t } = useLanguage();
  const [name, setName] = useState(journey.experiences.plantYourLegacy.flowerData.name || '');
  const [message, setMessage] = useState(journey.experiences.plantYourLegacy.flowerData.message || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'plantYourLegacy.errors.nameRequired';
    if (!message.trim()) e.message = 'plantYourLegacy.errors.messageRequired';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setJourney(prev => ({
      ...prev,
      experiences: {
        ...prev.experiences,
        plantYourLegacy: {
          ...prev.experiences.plantYourLegacy,
          flowerData: { ...prev.experiences.plantYourLegacy.flowerData, name: name.trim(), message: message.trim() }
        }
      }
    }));
    navigate('/plant/step2');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#131317', color: '#e4e1e7' }}>
      {/* Left decorative panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden" style={{ background: '#0e0e12' }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCkxG_uMmlCU-BUTuXbhxZU61ey7ZixhNje-lQ85z0r6cgHxvHXCoqo0C5iq23pFHbXRKdSPNwWBol_9ocRP6T693GsOvMe9MJSHBvLtcga-4_kKAB3xbnMBCbG-Ov1WPcAACRYwsQ94D-xLDHxaqsM4-svFGkKXfABuUFiaQtoFNOpVB5C0lgY1Xh1Mz1djWv2RWzoTWYIRXiHndPjt_Znf7VPU75268QvinPwDSGXg84VrqaxAR-KAZGUL0ZYzJ2ElMXMRgY-kax"
          alt="Garden Path"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ mixBlendMode: 'luminosity' }}
        />
        {/* Spotlight overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(160,35,142,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-full h-1/2" style={{ background: 'linear-gradient(to top, #131317, transparent)' }} />
        {/* Text overlay */}
        <div className="relative z-10 flex flex-col justify-end p-10 pb-16 space-y-4 max-w-xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#fface8' }}>{t('plantYourLegacy.title')}</span>
          <h1 className="font-serif text-5xl font-bold italic leading-tight text-white">
            {t('plantYourLegacy.quote')}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#d8c0ce' }}>
            {t('plantYourLegacy.joinGarden')}
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full opacity-35 animate-drift-legacy-one" style={{ background: 'radial-gradient(circle, rgba(160,35,142,0.25) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full opacity-25 animate-drift-legacy-two" style={{ background: 'radial-gradient(circle, rgba(228,61,18,0.2) 0%, transparent 70%)' }} />

        <div className="w-full max-w-md relative z-10 p-8 md:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ border: '1px solid #fface8', color: '#fface8' }}>01</span>
            <div className="h-px flex-1" style={{ background: 'rgba(83,66,77,0.4)' }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: '#d8c0ce' }}>{t('plantYourLegacy.step1')}</span>
          </div>

          <h2 className="font-serif text-3xl font-semibold text-white mb-2">{t('plantYourLegacy.title')}</h2>
          <p className="text-sm mb-10" style={{ color: '#d8c0ce' }}>
            {t('plantYourLegacy.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Name field */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: '#d8c0ce' }} htmlFor="legacy-name">{t('plantYourLegacy.yourName')}</label>
              <div className="relative group">
                <input
                  id="legacy-name"
                  type="text"
                  value={name}
                  maxLength={80}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                  placeholder={t('plantYourLegacy.enterName')}
                  className="w-full rounded-full px-6 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300"
                  style={{ background: '#0e0e12', border: errors.name ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => !errors.name && (e.target.style.borderColor = 'rgba(160,35,142,0.6)')}
                  onBlur={e => !errors.name && (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                {errors.name && <p className="text-xs mt-1 pl-2" style={{ color: '#ff6b6b' }}>{t(errors.name)}</p>}
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-[0.1em] uppercase" style={{ color: '#d8c0ce' }} htmlFor="legacy-message">{t('plantYourLegacy.yourMessage')}</label>
                <span className="text-xs" style={{ color: 'rgba(216,192,206,0.5)' }}>{message.length}/200</span>
              </div>
              <div className="relative group">
                <textarea
                  id="legacy-message"
                  value={message}
                  maxLength={200}
                  onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                  placeholder={t('plantYourLegacy.writeMessage')}
                  rows={4}
                  className="w-full rounded-2xl px-6 py-4 text-white placeholder-gray-500 outline-none resize-none transition-all duration-300"
                  style={{ background: '#0e0e12', border: errors.message ? '1px solid #ff4d4d' : '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => !errors.message && (e.target.style.borderColor = 'rgba(160,35,142,0.6)')}
                  onBlur={e => !errors.message && (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                {errors.message && <p className="text-xs mt-1 pl-2" style={{ color: '#ff6b6b' }}>{t(errors.message)}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 rounded-full text-white font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ background: 'linear-gradient(135deg, #A0238E 0%, #E43D12 100%)', boxShadow: '0 0 24px rgba(160,35,142,0.45)' }}
            >
              {t('plantYourLegacy.continueToPlant')}
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-1 opacity-40">
            {[0,1,2].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
