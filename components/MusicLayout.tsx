import Image from 'next/image'
import Prose from './Prose'
import ImageBox from './shared/ImageBox'
import { MusicPagePayload } from '@/types'
import { CustomPortableText } from './CustomPortableText'
import VideoSpace from './VideoSpace'
import VideoBanner from './VideoBanner'
import { Suspense } from 'react'

type MusicLayoutProps = {
  data: MusicPagePayload | null
}

export async function MusicLayout({ data }: MusicLayoutProps) {
  const { _id, title, slug, summary, content, language, videoBanner, link } =
    data ?? {}

  return (
    <div className="bg-black">
      <div className="sticky top-0 left-0 z-[0] h-[70vh] w-full overflow-hidden">
        {videoBanner && <VideoBanner videoBanner={videoBanner} />}
      </div>
      <div className="z-[10] bg-black py-header  text-xl text-white relative">
        <div className="about flex flex-row gap-8 container mx-auto">
          <div className="w-full flex flex-col gap-16">
            {content && <CustomPortableText value={content} />}
            {link && (
              <a href={link.href} className="underline">
                {link.linkTitle}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
