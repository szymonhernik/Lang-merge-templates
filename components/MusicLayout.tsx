import Image from 'next/image'
import Prose from './Prose'
import ImageBox from './shared/ImageBox'
import { MusicPagePayload } from '@/types'
import { CustomPortableText } from './CustomPortableText'
import VideoSpace from './VideoSpace'
import VideoBanner from './VideoBanner'
import { Suspense } from 'react'
import PageTitle from './PageTitle'

type MusicLayoutProps = {
  data: MusicPagePayload | null
  currentLanguage: string
}

export async function MusicLayout({ data, currentLanguage }: MusicLayoutProps) {
  const { _id, title, slug, summary, content, language, videoBanner, link } =
    data ?? {}

  return (
    <section className="bg-black flex lg:flex-col flex-col-reverse pt-mobileSpace lg:pt-0 ">
      <div className="lg:sticky top-0 left-0 z-[0] h-[70vh] w-full overflow-hidden">
        {videoBanner && (
          <Suspense
            fallback={
              <div className="w-full h-full bg-gradient-to-r from-amber-900">
                <p className="animate-pulse text-white text-sm">
                  Loading video
                </p>
              </div>
            }
          >
            <VideoBanner videoBanner={videoBanner} />
          </Suspense>
        )}
      </div>
      <div className="z-[10] bg-black    text-white relative">
        <PageTitle currentLanguage={currentLanguage} currentPage={'Music'} />

        <div className=" p-6 about flex flex-row gap-8 container mx-auto text-lg lg:text-xl">
          <div className="w-full flex flex-col gap-16 py-header">
            {content && <CustomPortableText value={content} />}
            {link && (
              <a href={link.href} className="underline">
                {link.linkTitle}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
