import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../../context/JourneyContext';
import { useLanguage } from '../../../context/LanguageContext';
import lavenderImg from '../../../assets/lavender.png';

const FLOWERS = [
  { id: 'rose',      name: 'Rose',      meaning: 'Love & Passion',     borderColor: '#a0238e', titleColor: '#fface8',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAplRnPrvLwUMueXZldzpvAjnsNQHdt_W9069xeBAlCzERjEZm3sXoVLK4iKQQ9eD7dsMWJzKVVDTihW_WGJZhJ7KvJCPPRTMxG5Ecc-lun1q_z8T5RkAb6uqPd1rU2txj4xnpbKy3zjUzJaMhz0uJEo-3N51TPetVAVTJGCEHuQi5SaBPu8EYYWwJRaPlgBrwNNrSBc2iXh-0LbEY4fn5PvEd-15VDz7AOdUmhJ9l_B9ARczCD9VX6zNeBehtsncdlV_w-9kcZAXPC' },
  { id: 'lily',      name: 'Lily',      meaning: 'Purity & Rebirth',   borderColor: '#6ed7d7', titleColor: '#6ed7d7',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuqocbcDuuv3MdfiGUDwi5CHKQslrRiBgewwZZ8DsbJB1UERhdIElU-EPYIKCuIlDiPhn3UVtN0ogMcD0NLC7zcX8aBk69DNHo5Qwb_XRo0UZMjIWFwH7wGnrYxM9llNOThdzlzooRXWN26EcDS-TR_rjP7iaLKYe7OQpebPLHgIwofHaeWnGdUAwKH40aoTSGqYcFVPISJaOV_aOLzFvrtXBJbkH8lQJPm0mfKZizGopsuhD2wCgwIS8wshpGKx4iyWK10bxELfYl' },
  { id: 'sunflower', name: 'Sunflower', meaning: 'Loyalty & Adoration',borderColor: '#ffb4a2', titleColor: '#ffb4a2',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU2NKd-Nrj892dxYAKQaA2E8UdDOl9CEMZmS8Z-AeErIt-fNpITvYajVH3u8CipG-gFl2HlyG9MEextdr9kjs-uHgmd1_of1hU6U24PRNolwBzy8WzaG3fwGEujyVZPR1NDVBlpum_wGaN_-Jp_49h0RzBLFpUZDf4VMz5U1X7g27d8cB3GnDWovvkuR_vTmuFrO4UkHwWxVp-PLw0De_25gznlIbYs9ZrxBOXpdsyau-6FmdSisQNgnxhibu81y7dWBABn6aaRkAz' },
  { id: 'lotus',     name: 'Lotus',     meaning: 'Enlightenment',      borderColor: '#fface8', titleColor: '#fface8',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVpR_WPd0jK5Mj0QRVrWiHOriCPbmtJCOPHsNG6XpUykUmbZC3VqGWqFRPHWEpDo5csyLiQV5cMuECR_xq1PITZqngBdcPxuRCFq-dAzA0gJxcculPsqdOZ0tBct4ZnVPSLZPWOzr_rj-tN_bpWKHu_f-_9vPBvcVjmSnBJwayxy7htpe5Nw-Roh6iAyS_Uqc7H4SMexo5CjCYFiXxkZPnYbp2IYwfNfr17K33JdYGQhXdRQVt0Q3nGq7Rz2Q39aXwa-tUfoHtWw4x' },
  { id: 'tulip',     name: 'Tulip',     meaning: 'Deep Love',          borderColor: '#cf2e00', titleColor: '#ffb4a2',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAfmq6e80rpThvcwkYgpiNwV1j_xjidYA4pd1P2BnBa2Nc0ZfcACpUF9TBzEZzQyxKVeve7sGaG2rIGVwC9X7cWDG1OSztix-aOsMDtM97kU8ooRfntF-S89RXrNP5uJXMXH-RVCh1F-36Bb-SR7QuDKvNakmFqzzRwXt09z-LhYacQSzIKOw8TSnJWbXZqsbNwucHijqeHX7MZG4Pc7xbuUGMK2qocW8QhhQnCk-nVBBZhyY1SlPKGLtl9dHuGRaMD8Y-R6ALwX4G' },
  { id: 'iris',      name: 'Iris',      meaning: 'Wisdom & Hope',      borderColor: '#006768', titleColor: '#6ed7d7',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHrrHSA4KgAsGO7LEEK53a7uFrolSoP0bWN9VoIlDn34-DMErXCehDEmy_zNc1MAFS_VzkqcCXGVkskNGqQdIMXuWaYoPe2IjIwunbdulfDHJuPORKSwxWVoIar07mPSPLDVthW-OMf4RC3cyVG8QCBm_0UdHsfYcqucNjAkwcadoIDVCckmdfuQumkAZCCbx0NvG8MqESHDh40I8Xtyo9pyUvMhnCUH_YbynoZyluvvCczJsIsIKGFtMTClR0wVFsJlWvnCIxdmO' },
  { id: 'daisy',     name: 'Daisy',     meaning: 'Innocence',          borderColor: '#a08b98', titleColor: '#d8c0ce',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnFCV_wYkmVth4lCRvmHOflYVTSV2Il8Y1Jorak-zj7XWiJZPLu0S2C-OSHjNOefMbcuWrQ_090bWJCgT0xNwRwfdeeLK1_7rWvAbj_gHeSUC15uDJdbwz4e8dEbe25j4e2MEpEGDFx0yWgYSs-GxuaTW11FIRADTKiSuIiCXKFbRVE59-_czagkCVevQUbX0uGNnYR9DCEIQQs8Cgg1GeIKKp3ctJf55bbLhE_lDgwqR_Q-XkTfQ_GWx2tHK1X2SdKI5fqwpHSsJE' },
  { id: 'orchid',    name: 'Orchid',    meaning: 'Exotic Beauty',      borderColor: '#fface8', titleColor: '#fface8',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlfky25MMMiOKteKonU018fZVg4ghoZn5ERG5t6bwvrQpCQRPrqkDoi-uKuMeUkZA1DGFPEWBwXFdHZii4v3dU6wsmxnPrzollzhflfdGd6rRRCIeYBpEkiSZT1CODI94ppkeZlbiA8JpI2yS8fkJTb5EjJ7JxWs63L2zx94WVLMogkQMIgddhMkFbFKx8oxfd8Lyky0akyYYz-aXwQ4obbzT-eet5MAM7NSmNJbdoM32K-4AbVCmnDPwB2pYQJzkjl8HNWCuifipf' },
  { id: 'peony',     name: 'Peony',     meaning: 'Prosperity',         borderColor: '#ffb4ab', titleColor: '#ffb4ab',   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqIT8vzGL6IH1LSnnZR28rXVWM0a3hSoJtvW7BX9mGWpn74fO-vNzzDL5Uqeeb4bqiAW4zQI-QNr4ldYljTFEuv4JROstLYdsV3wNIX4p_HeFYYW4EvOEILeUniS_PjBJJa-RZDMhOATldkUnAmx3NfYsJv1jwfSpQgvsc_q0Sue20i8CxPBD4gQaFf8Oo08LXEQIi4chXYW5FpSHnv3RGEnBn3crl-Vb8XcFJPjf28HuLDMPJ6JhSUDfWI6sf8auDMvA5pciWeibc' },
  { id: 'lavender',  name: 'Lavender',  meaning: 'Serenity & Grace',   borderColor: '#8bf3f4', titleColor: '#8bf3f4',   img: lavenderImg },
];

function FlowerCard({ flower, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isActive = selected || hovered;
  const { t } = useLanguage();

  return (
    <div
      onClick={() => onSelect(flower.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer p-5 rounded-2xl transition-all duration-500 group"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: isActive ? `1.5px solid ${flower.borderColor}` : '1.5px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        transform: isActive ? 'translateY(-8px)' : 'none',
        boxShadow: selected ? `0 0 20px ${flower.borderColor}55` : 'none',
      }}
    >
      <div className="aspect-square mb-5 overflow-hidden rounded-xl relative">
        <img
          src={flower.img}
          alt={t('plantYourLegacy.flowers.' + flower.id + '.name')}
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: isActive ? 'grayscale(0)' : 'grayscale(1)' }}
          loading="lazy"
        />
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: flower.borderColor }}>
            <span className="material-symbols-outlined text-white" style={{ fontSize: '14px' }}>check</span>
          </div>
        )}
      </div>
      <h3 className="font-serif text-lg font-semibold mb-1 transition-colors duration-500" style={{ color: isActive ? flower.titleColor : '#e4e1e7' }}>
        {t('plantYourLegacy.flowers.' + flower.id + '.name')}
      </h3>
      <p className="text-sm italic" style={{ color: '#d8c0ce' }}>{t('plantYourLegacy.flowers.' + flower.id + '.meaning')}</p>
    </div>
  );
}

export default function Step2_FlowerChoice() {
  const navigate = useNavigate();
  const { journey, setJourney } = useJourney();
  const { t } = useLanguage();
  const [selected, setSelected] = useState(journey.experiences.plantYourLegacy.flowerData.flowerType || '');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selected) { setError(t('plantYourLegacy.errors.selectFlowerError') || 'Please choose a flower before continuing.'); return; }
    setJourney(prev => ({
      ...prev,
      experiences: {
        ...prev.experiences,
        plantYourLegacy: {
          ...prev.experiences.plantYourLegacy,
          flowerData: { ...prev.experiences.plantYourLegacy.flowerData, flowerType: selected }
        }
      }
    }));
    navigate('/plant/step3');
  };

  return (
    <div className="min-h-screen relative" style={{ background: '#131317', color: '#e4e1e7' }}>
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] opacity-50 rounded-full animate-drift-legacy-one" style={{ background: 'radial-gradient(circle at center, rgba(160,35,142,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-30 rounded-full animate-drift-legacy-two" style={{ background: 'radial-gradient(circle at center, rgba(160,35,142,0.1) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Main content */}
      <main className="relative z-10 pt-12 pb-28 px-8 max-w-7xl mx-auto">
        <section className="text-center mb-12 space-y-3">
          {/* Step bar */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {[1,2,3].map(n => (
              <React.Fragment key={n}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors`}
                  style={{ border: `1px solid ${n <= 2 ? '#fface8' : 'rgba(255,255,255,0.2)'}`, color: n <= 2 ? '#fface8' : 'rgba(255,255,255,0.3)', background: n === 2 ? 'rgba(160,35,142,0.3)' : 'transparent' }}>
                  {String(n).padStart(2,'0')}
                </span>
                {n < 3 && <div className="h-px w-10" style={{ background: n < 2 ? '#fface8' : 'rgba(255,255,255,0.15)' }} />}
              </React.Fragment>
            ))}
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold italic tracking-tight" style={{ color: '#e4e1e7' }}>{t('plantYourLegacy.chooseFlower')}</h1>
          <p className="text-lg italic max-w-2xl mx-auto" style={{ color: '#d8c0ce' }}>{t('plantYourLegacy.everyFlower')}</p>
          {error && <p className="text-sm mt-2" style={{ color: '#ff6b6b' }}>{error}</p>}
        </section>

        {/* Flower grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-16">
          {FLOWERS.map(f => (
            <FlowerCard key={f.id} flower={f} selected={selected === f.id} onSelect={id => { setSelected(id); setError(''); }} />
          ))}
        </div>

        {/* Action bar */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/plant')}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:bg-white/5 active:scale-95"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1' }}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> {t('chatbot.back')}
          </button>

          {/* Step dots */}
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div className="w-8 h-2 rounded-full" style={{ background: '#fface8' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-10 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #a0238e 0%, #e43d12 100%)', boxShadow: '0 0 20px rgba(160,35,142,0.3)', color: '#fff' }}
          >
            {t('chatbot.next')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
