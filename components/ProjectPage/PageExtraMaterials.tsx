import AudioBox from '../shared/AudioBox'
import PDFAsset from '../shared/PDFAsset'
import VideoPlayer from '../shared/VideoPlayer'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function PageExtraMaterials({ materials, filterType }) {
  return (
    <div className="py-4 flex flex-col gap-4 justify-center items-center lg:items-start w-full ">
      {materials.map((mat) => {
        switch (mat._type) {
          case 'audio':
            return (
              <div className="" key={mat._key}>
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
          default:
            return null
        }
      })}
    </div>
  )
}
