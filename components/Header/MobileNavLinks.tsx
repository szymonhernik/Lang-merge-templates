import clsx from 'clsx'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function MobileNavLinks({
  pathname,
  langSelected,
  isMenuOpen,
  toggleMenu,
}) {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isHomePage = pathname === `/${langSelected}`

  const links = useMemo(
    () => [
      { href: '/works', en: 'Works', nl: 'Werken' },
      { href: '/about', en: 'About', nl: 'Over' },
      { href: '/music', en: 'Music', nl: 'Muziek' },
    ],
    [],
  )

  const renderLink = ({ href, en, nl }) => (
    <Link
      key={href}
      href={`/${langSelected}${href}`}
      className={clsx('pr-4 ', {
        '': pathname.startsWith(`/${langSelected}${href}`),
        'text-white': isHomePage,
        'text-black': !isHomePage,
      })}
      onClick={(e) => {
        if (!isHomePage || isMenuOpen) {
          setTimeout(toggleMenu, 1000)
        }
      }}
    >
      {langSelected === 'en' ? en : nl}
    </Link>
  )

  return (
    <>
      {isHomePage ? (
        links.map(renderLink)
      ) : (
        <>
          <div className="z-[10]">
            <button onClick={toggleMenu}>
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>

          {isMenuOpen && (
            <div className="z-[-1] fixed top-headerSmall left-0 w-screen h-dvh bg-white flex flex-col justify-start items-center pt-24 text-xl gap-4">
              {links.map(renderLink)}
            </div>
          )}
        </>
      )}
    </>
  )
}
