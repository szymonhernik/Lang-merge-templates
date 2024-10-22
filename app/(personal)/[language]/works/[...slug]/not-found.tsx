'use client'

import Link from 'next/link'

import UpdateLangContext from '@/components/UpdateLangContext'

export default function NotFound() {
  return (
    <div>
      <UpdateLangContext currentLanguage={''} translations={[]} />

      <p>Could not find the page</p>
      <Link href="/">Home</Link>
    </div>
  )
}
