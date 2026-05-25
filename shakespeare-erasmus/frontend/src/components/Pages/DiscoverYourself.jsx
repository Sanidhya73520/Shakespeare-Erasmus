import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { pickQuestions, computeResult } from '../../data/chatbotData';
import { useLanguage } from '../../context/LanguageContext';

const TOTAL = 8;

export default function DiscoverYourself() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Pick 8 random questions once per mount
  const [questions] = useState(() => pickQuestions(TOTAL));
  const [step, setStep] = useState(0);       // 0-indexed current question
  const [answers, setAnswers] = useState([]);      // [{ questionId, optionId }]
  const [selected, setSelected] = useState(null);    // currently highlighted option
  const [animIn, setAnimIn] = useState(true);    // card entrance animation

  const current = questions[step];
  const progress = ((step) / TOTAL) * 100;

  // Animate in when question changes
  useEffect(() => { setAnimIn(false); const t = setTimeout(() => setAnimIn(true), 50); return () => clearTimeout(t); }, [step]);

  const handleSelect = (optionId) => setSelected(optionId);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, { questionId: current.id, optionId: selected }];
    setAnswers(newAnswers);

    if (step + 1 >= TOTAL) {
      // All questions answered — compute result and navigate
      const result = computeResult(newAnswers, questions);
      // ── INTEGRATION POINT ──
      // If using async API: computeResult returns a Promise, handle accordingly
      navigate('/discover/result', { state: { result, answers: newAnswers } });
      return;
    }
    setSelected(null);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step === 0) { navigate('/main-hub'); return; }
    // Restore previous answer selection
    const prevAnswer = answers[answers.length - 1];
    setSelected(prevAnswer?.optionId || null);
    setAnswers(a => a.slice(0, -1));
    setStep(s => s - 1);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: 'linear-gradient(to bottom, #05020a 0%, #0a0616 40%, #110a1f 100%)', color: '#e4e1e7' }}>

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
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(110,215,215,0.25) 0%, transparent 60%)', 
            filter: 'blur(100px)', 
            animation: 'aurora-1 25s infinite linear' 
          }} />
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[70vh] rounded-[100%] opacity-30 mix-blend-screen"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(160,35,142,0.2) 0%, transparent 60%)', 
            filter: 'blur(120px)', 
            animation: 'aurora-2 30s infinite linear' 
          }} />
        <div className="absolute bottom-[-20%] left-[10%] w-[80vw] h-[60vh] rounded-[100%] opacity-25 mix-blend-screen"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(40,110,230,0.25) 0%, transparent 60%)', 
            filter: 'blur(130px)', 
            animation: 'aurora-3 35s infinite linear' 
          }} />

        {/* Left Side: Faded Astrological Chart */}
        <div className="absolute top-0 -left-64 w-[900px] h-[900px] opacity-[0.08] mix-blend-screen"
             style={{ transform: 'rotate(-15deg)' }}>
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
        <div className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', 
            backgroundSize: '80px 80px', 
            animation: 'drift-stars-1 120s linear infinite, twinkle 4s ease-in-out infinite alternate' 
          }} />
        <div className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.9) 1.5px, transparent 1.5px)', 
            backgroundSize: '150px 150px', 
            backgroundPosition: '40px 40px',
            animation: 'drift-stars-2 180s linear infinite, twinkle 7s ease-in-out infinite alternate-reverse' 
          }} />
        <div className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(160,200,255,0.7) 2px, transparent 2px)', 
            backgroundSize: '250px 250px', 
            backgroundPosition: '100px 100px',
            animation: 'drift-stars-1 240s linear infinite, twinkle 10s ease-in-out infinite' 
          }} />
      </div>

      {/* Main — top aligned with padding to keep nav bar in top black area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-32 md:pt-40 pb-16 px-6">
        <div className="w-full max-w-2xl">

          {/* Glass card */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'opacity 0.3s',
              opacity: animIn ? 1 : 0,
            }}>

            {/* Particle overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Progress bar */}
            <div className="w-full h-1 relative" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="absolute top-0 left-0 h-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #6ed7d7, #fface8)',
                  boxShadow: '0 0 10px #6ed7d7',
                }} />
            </div>

            <div className="p-6 md:p-8 flex flex-col">

              {/* Step label */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#d8c0ce' }}>
                  {t('chatbot.stepOf').replace('{step}', step + 1).replace('{total}', TOTAL)}
                </span>
                <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#6ed7d7' }}>
                  {t('chatbot.selfDiscovery')}
                </span>
              </div>

              {/* Chatbot avatar + intro bubble */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border flex-shrink-0 shadow-xl"
                  style={{ background: 'linear-gradient(to br, #1f1f23, #0e0e12)', borderColor: 'rgba(255,255,255,0.15)' }}>
                  <span className="material-symbols-outlined text-xl" style={{ color: '#6ed7d7', fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                </div>
                <div className="max-w-md">
                  <div className="p-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                    style={{ background: 'rgba(0,103,104,0.2)', border: '1px solid rgba(110,215,215,0.2)', boxShadow: '0 0 30px rgba(0,103,104,0.1)' }}>
                    <p className="text-base leading-relaxed" style={{ color: '#7de6e6' }}>
                      {step === 0
                        ? t('chatbot.avatarIntro')
                        : t('chatbot.avatarSuccess')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="ml-0 md:ml-16 mb-6">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-5 leading-tight">
                  {t('chatbot.questions.' + current.id + '.text')}
                </h2>

                {/* Answer options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {current.options.map((opt, i) => {
                    const isSelected = selected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className="text-left p-4 rounded-2xl flex items-center gap-3 transition-all duration-300"
                        style={{
                          background: isSelected ? 'rgba(110,215,215,0.15)' : 'rgba(255,255,255,0.05)',
                          border: isSelected ? '1.5px solid rgba(110,215,215,0.5)' : '1px solid rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(12px)',
                          transform: isSelected ? 'translateY(-2px)' : 'none',
                          boxShadow: isSelected ? '0 0 20px rgba(110,215,215,0.15)' : 'none',
                        }}
                      >
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                          style={{
                            border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            background: isSelected ? '#6ed7d7' : 'transparent',
                            color: isSelected ? '#003737' : '#e4e1e7',
                          }}>
                          {optionLabels[i]}
                        </span>
                        <span className="text-base leading-snug" style={{ color: isSelected ? '#8bf3f4' : '#e4e1e7' }}>
                          {t('chatbot.questions.' + current.id + '.options.' + opt.id)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={handleBack}
                  className="flex items-center gap-2 transition-colors group"
                  style={{ color: '#d8c0ce' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#d8c0ce'}>
                  <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                  <span className="text-xs font-bold tracking-widest uppercase">{t('chatbot.back')}</span>
                </button>

                <button onClick={handleNext}
                  disabled={!selected}
                  className="flex items-center gap-2 px-8 py-3 rounded-full transition-all group"
                  style={{
                    background: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border: selected ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
                    cursor: selected ? 'pointer' : 'not-allowed',
                    opacity: selected ? 1 : 0.5,
                  }}>
                  <span className="text-xs font-bold tracking-widest text-white uppercase">
                    {step + 1 === TOTAL ? t('chatbot.meetCharacter') : t('chatbot.next')}
                  </span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    {step + 1 === TOTAL ? 'auto_awesome' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
