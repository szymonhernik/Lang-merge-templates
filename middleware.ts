import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from './languages'
const supportedLanguages = i18n.languages.map((l) => l.id)

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages =
    new Negotiator({ headers: negotiatorHeaders }).languages() ?? []

  // @ts-ignore locales are readonly
  const locales: string[] = supportedLanguages
  return matchLocale(languages, locales, i18n.base)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Exclude /studio path from locale application
  if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Handle .html pages and non-existent pages
  if (pathname.includes('.html') || !isValidPath(pathname)) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}/`, request.url))
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = supportedLanguages.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

// Add this function to check if the path is valid
function isValidPath(pathname: string): boolean {
  const validPaths = ['/', '/works', '/about', '/contact', '/music']
  return validPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

export const config = {
  // Matcher including all paths except /studio, api, _next, and static files
  matcher: ['/((?!studio|api|_next|.*\\..*).*)'],
}
