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
}) {
  return (
    <>
      <Link
        href={`/${langSelected}${href}`}
        className={clsx(
          'pr-4',
          { 'text-white hover:text-white': isHomePage },
          { 'text-gray-500 hover:text-black': !isHomePage && !isCurrentPath },
          { 'text-black': isCurrentPath },
        )}
      >
        {children}
      </Link>
      <AnimatedBorder isCurrentPath={isCurrentPath} />
    </>
  )
}
