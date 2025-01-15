import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import ENUM_LOCALES from "@/enums/locales";

const SUPPORTED_LANGAUGES = Array.from(Object.values(ENUM_LOCALES));
const FALLBACK_LANGUAGE = ENUM_LOCALES.EN;
const LOCALES_DEFAULT_NAMESPACE = "translations";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // debug flag throws useful console warnings for missing local. keys
    returnEmptyString: false, // Flag to render missing keys on the UI
    fallbackLng: FALLBACK_LANGUAGE, // Set fallbacklanguage to `en`
    supportedLngs: SUPPORTED_LANGAUGES, // Define supported languages (ISO code).
    ns: [LOCALES_DEFAULT_NAMESPACE], // Define default namespace.
  });

export default i18n;
