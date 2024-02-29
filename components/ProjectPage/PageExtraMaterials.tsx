import AudioBox from '../shared/AudioBox'
import VideoPlayer from '../shared/VideoPlayer'

export default function PageExtraMaterials({ materials, filterType }) {
  return (
    <div className="py-4 flex flex-col gap-4">
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
                <div className="w-fit" key={mat._key}>
                  {mat.asset && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      href={`${mat.asset.url}?dl=${mat.asset.originalFilename}`}
                    >
                      <div className="border-black border-[0.5px] px-2 py-[2px] hover:bg-stone-200">
                        PDF
                      </div>
                    </a>
                  )}
                </div>
              )
            case 'video':
              const videoProps = mat.video
              return (
                <div key={mat._key}>
                  {videoProps && <VideoPlayer videoProps={videoProps} />}
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
