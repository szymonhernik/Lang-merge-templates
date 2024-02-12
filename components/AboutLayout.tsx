import Image from 'next/image'
import Prose from './Prose'
import ImageBox from './shared/ImageBox'

type AboutLayoutProps = {
  data?: any
}

export async function AboutLayout({ data }: AboutLayoutProps) {
  const {
    _id,
    title,
    slug,
    summary,
    content,
    language,
    profilePicture,
    highlightedContent,
    pageBuilder,
  } = data ?? {}

  return (
    <div className="pt-header container mx-auto font-medium">
      <div className="about w-full flex flex-row gap-8">
        <div className="w-1/3 space-y-8">
          {highlightedContent && (
            <p className="text-2xl">{highlightedContent}</p>
          )}
          {content && <Prose value={content} />}
        </div>
        {profilePicture && (
          <ImageBox
            size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 33vw"
            classesWrapper={`w-1/3 `}
            // width={profilePicture.asset.width / 2}
            // height={profilePicture.asset.height / 2}
            classesImage={`object-cover h-full w-full`}
            image={profilePicture}
            alt={`${profilePicture?.alt ?? ''}`}
          />
        )}
      </div>
    </div>
  )
}
