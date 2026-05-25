import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../data/translations/en.json';
import roTranslations from '../data/translations/ro.json';
import frTranslations from '../data/translations/fr.json';
import esTranslations from '../data/translations/es.json';

const translationsMap = {
  en: enTranslations,
  ro: roTranslations,
  fr: frTranslations,
  es: esTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. Initialize language from localStorage with fallback to 'en'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved && translationsMap[saved] ? saved : 'en';
  });

  // 2. Wrap setLanguage to store state, persist to localStorage, and broadcast global event
  const setLanguage = (lang) => {
    if (translationsMap[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      // Dispatch global window event for futuristic vanilla JS, Three.js, and external compatibility
      window.dispatchEvent(new CustomEvent('language-changed', { detail: lang }));
    }
  };

  const translations = translationsMap[language] || translationsMap['en'];
  const fallbackTranslations = translationsMap['en'];

  // 3. Ultra-resilient t() translator with nested key resolving and English fallback
  const t = (key, section) => {
    const resolvePath = (obj, path) => {
      if (!obj) return undefined;
      const parts = path.split('.');
      let current = obj;
      for (const part of parts) {
        if (current && current[part] !== undefined) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return typeof current === 'string' ? current : undefined;
    };

    // Try selected language
    const selectedSection = section ? translations[section] : translations;
    let result = resolvePath(selectedSection, key);
    if (result !== undefined) return result;

    // Fallback to English
    const englishSection = section ? fallbackTranslations[section] : fallbackTranslations;
    result = resolvePath(englishSection, key);
    if (result !== undefined) return result;

    // Last resort fallback: return key
    return key;
  };

  // 4. Synchronize HTML lang attribute for SEO and accessibility
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
