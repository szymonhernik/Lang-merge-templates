import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileNavLinks({ pathname, langSelected }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {pathname == `/${langSelected}` ? (
        <>
          <Link
            href={'/' + langSelected + '/works'}
            className={clsx(' pr-4 text-white', {
              '': pathname.startsWith(`/${langSelected}/works`),
            })}
          >
            {langSelected === 'en' ? 'Works' : 'Werken'}
          </Link>

          <Link
            href={'/' + langSelected + '/about'}
            className={clsx(' pr-4 text-white', {
              '': pathname === `/${langSelected}/about`,
            })}
          >
            {langSelected === 'en' ? 'About' : 'Over'}
          </Link>

          <Link
            href={'/' + langSelected + '/music'}
            className={clsx(' pr-4 text-white', {
              '': pathname === `/${langSelected}/music`,
            })}
          >
            {langSelected === 'en' ? 'Music' : 'Muziek'}
          </Link>
        </>
      ) : (
        <>
          <div className="z-[10]">
            <a onClick={toggleMenu}>{isMenuOpen ? 'CLOSE' : 'MENU'}</a>
          </div>

          {isMenuOpen && (
            <div className="fixed top-0 left-0 bg-pink-200 opacity-100 w-screen h-dvh">
              <ul>
                <li>
                  <Link
                    href={'/' + langSelected + '/works'}
                    className={clsx(' pr-4 text-white', {
                      '': pathname.startsWith(`/${langSelected}/works`),
                    })}
                  >
                    {langSelected === 'en' ? 'Works' : 'Werken'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/' + langSelected + '/about'}
                    className={clsx(' pr-4 text-white', {
                      '': pathname === `/${langSelected}/about`,
                    })}
                  >
                    {langSelected === 'en' ? 'About' : 'Over'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/' + langSelected + '/music'}
                    className={clsx(' pr-4 text-white', {
                      '': pathname === `/${langSelected}/music`,
                    })}
                  >
                    {langSelected === 'en' ? 'Music' : 'Muziek'}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  )
}
