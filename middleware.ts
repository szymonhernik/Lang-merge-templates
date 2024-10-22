import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './languages'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const supportedLanguages = i18n.languages.map((l) => l.id)

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages =
    new Negotiator({ headers: negotiatorHeaders }).languages() ?? []
  const locales: string[] = supportedLanguages

  return matchLocale(languages, locales, i18n.base)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclude /studio path from locale application
  if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Ignore certain paths (/_next/, /api/, etc.)
  if (['/manifest.json', '/favicon.ico'].includes(pathname)) return

  // Remove .html extensions
  if (pathname.endsWith('.html')) {
    const cleanPath = pathname.replace('.html', '')
    return NextResponse.redirect(new URL(cleanPath, request.url))
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = supportedLanguages.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }

  // Catch-all: Redirect unknown paths to home page with the preferred locale
  if (!isValidPath(pathname)) {
    const locale = getLocale(request) || i18n.base
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.next()
}

// Utility function to check valid paths
function isValidPath(pathname: string): boolean {
  // List your valid paths here, or use dynamic checks based on your routing
  const validPaths = [
    '/en',
    '/nl',
    '/en/works',
    '/nl/works',
    '/en/about',
    '/nl/about',
    '/en/contact',
    '/nl/contact',
    '/en/music',
    '/nl/music',
    // Add more valid paths
  ]

  return validPaths.some((path) => pathname.startsWith(path))
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
