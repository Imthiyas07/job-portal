import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enUS from './locales/en-US/common.json';
import es from './locales/es/common.json';
import zh from './locales/zh/common.json';
import vi from './locales/vi/common.json';
import fr from './locales/fr/common.json';
import pt from './locales/pt/common.json';
import fil from './locales/fil/common.json';
import hi from './locales/hi/common.json';
import ar from './locales/ar/common.json';
import ta from './locales/ta/common.json';
import ko from './locales/ko/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    supportedLngs: ['en-US', 'es', 'zh', 'vi', 'fr', 'pt', 'fil', 'hi', 'ar', 'ta', 'ko'],
    resources: {
      'en-US': { common: enUS },
      es: { common: es },
      zh: { common: zh },
      vi: { common: vi },
      fr: { common: fr },
      pt: { common: pt },
      fil: { common: fil },
      hi: { common: hi },
      ar: { common: ar },
      ta: { common: ta },
      ko: { common: ko },
    },
    ns: ['common'],
    defaultNS: 'common',
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
      cookieMinutes: 525600,
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
