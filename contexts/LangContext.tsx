'use client'
import { i18n } from '@/languages'
import React, { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext({
  currentLanguage: i18n.base,
  translations: [],
  setLanguageData: (currentLanguage: string, translations: any) => {},
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [languageData, setLanguageDataState] = useState({
    currentLanguage: i18n.base,
    translations: [],
  })

  const setLanguageData = (newCurrentLanguage, newTranslations) => {
    // Only update state if there are actual changes
    if (
      languageData.currentLanguage !== newCurrentLanguage ||
      languageData.translations !== newTranslations
    ) {
      console.log('Updating context with:', newCurrentLanguage, newTranslations)
      setLanguageDataState({
        currentLanguage: newCurrentLanguage,
        translations: newTranslations,
      })
    }
  }

  return (
    <LanguageContext.Provider value={{ ...languageData, setLanguageData }}>
      {children}
    </LanguageContext.Provider>
  )
}
