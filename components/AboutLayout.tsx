import Image from 'next/image'
import Prose from './Prose'
import ImageBox from './shared/ImageBox'
import { AboutPagePayload } from '@/types'
import { CustomPortableText } from './CustomPortableText'
import { i18n } from '@/languages'
import PageTitle from './PageTitle'

type AboutLayoutProps = {
  data: AboutPagePayload | null
  currentLanguage: string
}

export async function AboutLayout({ data, currentLanguage }: AboutLayoutProps) {
  const {
    _id,
    title,
    slug,
    content,
    language,
    profilePicture,
    highlightedContent,
    pageBuilder,
  } = data ?? {}

  return (
    <div className="py-mobileSpace max-w-screen-3xl mx-auto">
      <PageTitle currentLanguage={currentLanguage} currentPage={'About'} />

      <div className="pt-mobileSpace md:pt-0 p-4 about w-full flex flex-col md:flex-row gap-8 font-medium">
        <div className="lg:w-1/3 space-y-8">
          {highlightedContent && (
            <p className="text-2xl">{highlightedContent}</p>
          )}
          {profilePicture && (
            <div className="w-full flex flex-col lg:hidden justify-center items-center gap-4">
              <ImageBox
                size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 33vw"
                classesWrapper={`w-full max-w-sm`}
                // width={profilePicture.asset.width / 2}
                // height={profilePicture.asset.height / 2}
                classesImage={`object-cover h-full w-full`}
                image={profilePicture}
                alt={`${profilePicture?.alt ?? ''}`}
              />
              <p className="text-center">
                Photo by <a className="underline">Lizzy Schwultz</a>
              </p>
            </div>
          )}
          {content && <CustomPortableText value={content} />}
          <article className="space-y-8">
            <div>
              <p className="">CV</p>
              <p className="underline ">Download PDF</p>
            </div>
            <div>
              <p className="">Press</p>
              <p className="underline ">Download PDF</p>
            </div>
            <div>
              <p>Colophon</p>
              <p>
                Website by <a className="underline">Szymon Eda Hernik</a>
              </p>
            </div>
          </article>
        </div>
        {profilePicture && (
          <div className="w-1/3 hidden lg:flex justify-start flex-col gap-4">
            <ImageBox
              size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 33vw"
              classesWrapper={`w-full mx-auto h-fit max-w-lg   `}
              // width={profilePicture.asset.width / 2}
              // height={profilePicture.asset.height / 2}
              classesImage={`object-cover h-full w-full`}
              image={profilePicture}
              alt={`${profilePicture?.alt ?? ''}`}
            />
            <p className="text-center">
              Photo by <a className="underline">Lizzy Schwultz</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
