import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Narges Mohammadi | Home',
}

import localFont from 'next/font/local'

const tonka = localFont({
  src: [
    {
      path: '../../Tonka-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../Tonka-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
})
const tonka_italic = localFont({
  src: '../../Tonka_Beta_02VF.woff2',
  display: 'swap',
  variable: '--font-tonka',
})

import '@/styles/globals.css'

import { draftMode } from 'next/headers'

import { COMMON_PARAMS } from '@/lib/constants'

import VisualEditing from '@/components/VisualEditing'
import { LanguageProvider } from '@/contexts/LangContext'
import Header from '@/components/Header'

export default async function RootLayout(props) {
  const queryParams = { ...COMMON_PARAMS, language: props.params.language }
  const { isEnabled } = draftMode()

  return (
    <LanguageProvider>
      <html
        lang={props.params.language}
        className={`${tonka.className} ${tonka_italic.variable}`}
      >
        <head></head>
        <body className="font-sans bg-white text-gray-900">
          <Header />
          {props.children}

          {draftMode().isEnabled && <VisualEditing />}
        </body>
      </html>
    </LanguageProvider>
  )
}
