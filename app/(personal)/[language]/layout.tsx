import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

import '@/styles/globals.css'

import { draftMode } from 'next/headers'
import { SanityDocument } from 'next-sanity'

import { COMMON_PARAMS } from '@/lib/constants'
import { loadQuery } from '@/sanity/lib/store'

import VisualEditing from '@/components/VisualEditing'
import { LanguageProvider } from '@/contexts/LangContext'
import Header from '@/components/Header'

export default async function RootLayout(props) {
  const queryParams = { ...COMMON_PARAMS, language: props.params.language }
  const { isEnabled } = draftMode()

  return (
    <LanguageProvider>
      <html lang={props.params.language}>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/ogy2uky.css" />
        </head>
        <body className="font-sans bg-white text-gray-900">
          <Header />
          {props.children}

          {draftMode().isEnabled && <VisualEditing />}
        </body>
      </html>
    </LanguageProvider>
  )
}
