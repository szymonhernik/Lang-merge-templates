'use client'
import { useContext, useEffect } from 'react'

import { LanguageContext } from '@/contexts/LangContext'

export default function UpdateLangContext({ currentLanguage, translations }) {
  const { setLanguageData } = useContext(LanguageContext)

  useEffect(() => {
    setLanguageData(currentLanguage, translations)
  }, [currentLanguage, translations, setLanguageData])

  return null
}
