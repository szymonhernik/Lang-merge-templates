'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Header from '@/components/Header'
import { i18n } from '@/languages'
import UpdateLangContext from '@/components/UpdateLangContext'

export default function NotFound() {
  const pathname = usePathname()
  const data = {
    title: {
      [i18n.base]: 'Not Found',
    },
  }

  return (
    <div>
      <UpdateLangContext currentLanguage={''} translations={[]} />

      <p>Could not find the page</p>
      <Link href="/">Home</Link>
    </div>
  )
}
