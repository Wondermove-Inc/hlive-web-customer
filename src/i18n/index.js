import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  compatibilityJSON: "v3",
  lng: "en",
  debug: true,
});

export default i18n;
