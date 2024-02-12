'use client'
import { useContext, useEffect } from 'react'

import { LanguageContext, useLanguage } from '@/contexts/LangContext'

export default function UpdateLangContext({ currentLanguage, translations }) {
  const { setLanguageData } = useContext(LanguageContext)

  useEffect(() => {
    setLanguageData(currentLanguage, translations)
    // console.log('In UpdateLangContext: ', currentLanguage, translations)
  }, [currentLanguage, translations, setLanguageData])

  return null // This component doesn't render anything
}
