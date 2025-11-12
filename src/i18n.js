import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ARfile from "./language/ar.json";
import ENfile from "./language/en.json";

const resources = {
    en: { translation: ENfile },
    ar: { translation: ARfile },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: ["ar", "en"],
        fallbackLng: "ar",
        nonExplicitSupportedLngs: true,
        detection: {
            order: ["localStorage", "htmlTag"],
            caches: ["localStorage"],
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

i18n.on("languageChanged", (lng) => {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
});

const currentLang = i18n.language || localStorage.getItem("i18nextLng") || "ar";
document.documentElement.dir = currentLang.startsWith("ar") ? "rtl" : "ltr";
document.documentElement.lang = currentLang;

export default i18n;
