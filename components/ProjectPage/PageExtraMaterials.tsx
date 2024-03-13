import AudioBox from '../shared/AudioBox'
import PDFAsset from '../shared/PDFAsset'
import VideoPlayer from '../shared/VideoPlayer'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function PageExtraMaterials({ materials, filterType }) {
  return (
    <div className="py-4 flex flex-col gap-4 justify-center items-center lg:items-start w-full ">
      {materials
        .filter((mat) => {
          // Decide whether to include the material based on filterType
          if (filterType === 'non-video') {
            return mat._type !== 'video'
          } else if (filterType === 'video') {
            return mat._type === 'video'
          }
          return true // No filtering, include all materials
        })
        .map((mat) => {
          switch (mat._type) {
            case 'audio':
              return (
                <div className="hover:bg-stone-100" key={mat._key}>
                  {mat.audioFile && <AudioBox mat={mat} />}
                </div>
              )
            case 'file':
              return (
                <div className="w-full max-w-sm lg:w-fit" key={mat._key}>
                  {mat.asset && (
                    <PDFAsset
                      classWrapper={'w-full'}
                      classItem={'w-full max-w-xs mx-auto lg:w-fit'}
                      file={mat}
                    />
                  )}
                </div>
              )
            case 'video':
              const videoProps = mat.video

              return (
                <div key={mat._key}>
                  <AspectRatio
                    ratio={videoProps.asset.data.aspect_ratio.replace(':', '/')}
                    className="bg-muted"
                  >
                    {videoProps && <VideoPlayer videoProps={videoProps} />}
                  </AspectRatio>

                  <caption className="block pt-2">{mat.videoLabel}</caption>
                </div>
              )
            default:
              return null
          }
        })}
    </div>
  )
}
