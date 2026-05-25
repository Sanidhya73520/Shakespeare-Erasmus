import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function JourneySummary() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="font-display text-4xl mb-4 text-gradient-gold">{t('journeySummary.heading')}</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          {t('journeySummary.subtitle')}
        </p>
      </div>
    </div>
  );
}
