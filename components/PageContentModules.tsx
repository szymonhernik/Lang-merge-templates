import {
  ImageInlineModule,
  LocalizedProject,
  PDFEmbedModule,
  TextBoxModule,
  VideoModule,
} from '@/types'
import { CustomPortableText } from './CustomPortableText'
import { AspectRatio } from './ui/aspect-ratio'
import VideoPlayer from './shared/VideoPlayer'
import ImageBox from './shared/ImageBox'

type PageContentsProps = {
  pageContent: LocalizedProject['pageContent']
}

export default function PageContentModules(props: PageContentsProps) {
  const { pageContent } = props

  return pageContent?.map((module) => {
    return (
      <div key={module._key}>
        <Module module={module} />
      </div>
    )
  })
}

const Module = ({
  module,
}: {
  module: PDFEmbedModule | TextBoxModule | ImageInlineModule | VideoModule
}) => {
  switch (module._type) {
    case 'textBox':
      return <TextBox module={module} />
    case 'pdfEmbed':
      return <PdfEmbed module={module} />
    case 'video':
      return <VideoBlock module={module} />
    case 'imageInline':
      return <RenderImage module={module} />
    default:
      return <p>Module not found </p>
  }
}

const TextBox = ({ module }: { module: TextBoxModule }) => {
  if (!module.contents) {
    return null
  }

  return (
    <div className="font-medium   md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-2 space-y-4 ">
      {module.headline && (
        <p className="opacity-50 lg:text-sm uppercase">{module.headline}</p>
      )}
      <CustomPortableText value={module.contents} />
    </div>
  )
}
const PdfEmbed = ({ module }: { module: PDFEmbedModule }) => {
  if (!module.pdfFile || !module.pdfFile.asset) {
    return null
  }
  return (
    <>
      <iframe
        src={module.pdfFile.asset.url}
        width="100%"
        height="600px"
        className="border-b-[1px]"
      ></iframe>
      <p className="text-center mt-4 ">
        {module.pdfFile.asset.originalFilename}
      </p>
    </>
  )
}

const VideoBlock = ({ module }: { module: VideoModule }) => {
  const videoProps = module.video
  if (!videoProps || !videoProps.asset) {
    return null
  }
  const aspectRatio = videoProps.asset.data.aspect_ratio || '16:9'

  const [width, height] = aspectRatio.split(':').map(Number)

  return (
    <div className="w-full mx-auto h-auto max-w-lg lg:max-w-screen-md">
      <AspectRatio
        ratio={videoProps.asset.data.aspect_ratio ? width / height : 16 / 9}
        className="bg-muted"
      >
        {videoProps && <VideoPlayer videoProps={videoProps} />}
      </AspectRatio>

      <caption className="block mt-2">{module.videoLabel}</caption>
    </div>
  )
}
const RenderImage = ({ module }: { module: ImageInlineModule }) => {
  if (!module.asset) {
    return null
  }
  const image = module
  return (
    <>
      <ImageBox
        classesWrapper={`mx-auto w-full max-w-lg lg:max-w-xl h-auto max-h-screen overflow-hidden `}
        size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
        width={image.asset.width}
        height={image.asset.height}
        classesImage="object-cover  object-center h-full w-auto "
        image={image}
        alt={image.alt || 'Project image'}
      />

      {image.caption && <p className="text-center mt-4">{image.caption}</p>}
    </>
  )
}
