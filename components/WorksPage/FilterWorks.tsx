import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function FilterWorks({ currentLanguage }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const showCategory = searchParams.get('show')

  return (
    <div className="w-full flex justify-center md:w-1/4 mx-auto z-[100] text-sm md:fixed md:top-8 inset-x-0 mt-4 md:mt-0">
      <div className="w-auto space-x-2">
        <Link
          className={`lowercase ${showCategory === null ? 'underline hover:cursor-default' : ''}`}
          href={`${pathname}`}
        >
          {currentLanguage === 'en' ? <>Artworks</> : <>Kunstwerken</>}
        </Link>
        <Link
          className={`lowercase ${showCategory === 'workshops' ? 'underline hover:cursor-default' : ''}`}
          href={`${pathname}?show=workshops`}
        >
          {currentLanguage === 'en' ? <>Workshops</> : <>Workshop</>}
        </Link>
      </div>
    </div>
  )
}
