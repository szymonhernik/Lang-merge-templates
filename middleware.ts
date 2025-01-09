import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from './languages'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Define your supported languages
const supportedLanguages = ['en', 'nl']
const defaultLanguage = 'en'

// Modify the getLocale function to be more robust
function getLocale(request: NextRequest): string {
  try {
    // Get accept-language header
    const acceptLanguage = request.headers.get('accept-language')

    // If no accept-language header, return default
    if (!acceptLanguage) return defaultLanguage

    // Create headers object for Negotiator
    const headers = { 'accept-language': acceptLanguage }

    const negotiator = new Negotiator({ headers })

    // Get languages from negotiator
    let languages = negotiator.languages()

    // Ensure we have valid languages array
    languages = languages.map((lang) => lang.split('-')[0])

    // Use intl-localematcher
    return matchLocale(languages, supportedLanguages, defaultLanguage)
  } catch (e) {
    console.error('Locale matching error:', e)
    return defaultLanguage
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclude /studio path from locale application
  if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      // Your other files in `public`
    ].includes(pathname)
  )
    return

  try {
    // Handle root path
    if (pathname === '/') {
      const locale = getLocale(request)
      return NextResponse.redirect(new URL(`/${locale}`, request.url), {
        status: 307,
      })
    }

    // Check if pathname missing locale
    const pathnameIsMissingLocale = supportedLanguages.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    )

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url),
        { status: 307 },
      )
    }
  } catch (e) {
    console.error('Middleware error:', e)
    // In case of any error, redirect to default language
    return NextResponse.redirect(new URL(`/${defaultLanguage}`, request.url), {
      status: 307,
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
