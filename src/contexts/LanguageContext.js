import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const LanguageContext = createContext();

const translations = { en, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguageState(storedLanguage);
    setLoading(false);
  }, []);

  const setLanguage = (lang) => {
    localStorage.setItem("language", lang);
    setLanguageState(lang);
  };

  const t = (key) => translations[language]?.[key] || key;

  if (loading) return null; // Wait until language is loaded

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
