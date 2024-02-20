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
            <button onClick={toggleMenu}>
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>

          {isMenuOpen && (
            // ISOLATE THIS DIV FROM BLEND MODE OF THE PARENT A FEW LEVELS UP
            <div className="fixed top-16 left-0 w-screen h-dvh bg-white flex flex-col justify-start items-center pt-24 text-xl gap-4">
              <Link
                href={'/' + langSelected + '/works'}
                className={clsx(' pr-4', {
                  '': pathname.startsWith(`/${langSelected}/works`),
                })}
              >
                {langSelected === 'en' ? 'Works' : 'Werken'}
              </Link>

              <Link
                href={'/' + langSelected + '/about'}
                className={clsx(' pr-4', {
                  '': pathname === `/${langSelected}/about`,
                })}
              >
                {langSelected === 'en' ? 'About' : 'Over'}
              </Link>

              <Link
                href={'/' + langSelected + '/music'}
                className={clsx(' pr-4', {
                  '': pathname === `/${langSelected}/music`,
                })}
              >
                {langSelected === 'en' ? 'Music' : 'Muziek'}
              </Link>
            </div>
          )}
        </>
      )}
    </>
  )
}
