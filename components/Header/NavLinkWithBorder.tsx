import clsx from 'clsx'
import Link from 'next/link'
import AnimatedBorder from './AnimatedLines'

export default function NavLinkWithBorder({
  href,
  isCurrentPath,
  children,
  pathname,
  langSelected,
  isHomePage,
  isMusicPage,
}) {
  console.log(pathname)

  return (
    <>
      <Link
        href={`/${langSelected}${href}`}
        className={clsx(
          'pr-4',
          { 'text-white hover:text-white': isHomePage },
          {
            'opacity-50 hover:text-black':
              !isHomePage && !isCurrentPath && !isMusicPage,
          },
          {
            'opacity-50 ': !isCurrentPath && isMusicPage,
          },
          { 'text-black': isCurrentPath && !isMusicPage },
          { 'text-white': isCurrentPath && isMusicPage },
        )}
      >
        {children}
      </Link>
      <AnimatedBorder isCurrentPath={isCurrentPath} isMusicPage={isMusicPage} />
    </>
  )
}
