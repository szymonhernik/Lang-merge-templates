import 'server-only'

import VideoSpace from './VideoSpace'
import muxBlurHash from '@mux/blurhash'

interface Props {
  videoBanner: any
  classesImage: string
}

const getBlurHash = async (playbackId: string) => {
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(
    playbackId,
    { time: 0 },
  )
  return { blurHashBase64, sourceWidth, sourceHeight }
}

export default async function VideoBanner({
  videoBanner,
  classesImage,
}: Props) {
  const playbackId = videoBanner.asset.playbackId
  // generate a blurHash placeholder and passe to VideoSpace for rendering
  const blurHashBase64 = await getBlurHash(playbackId)

  return (
    <VideoSpace
      playbackId={playbackId}
      classesImage={classesImage}
      blurHashBase64={blurHashBase64.blurHashBase64}
      sourceWidth={blurHashBase64.sourceWidth}
      sourceHeight={blurHashBase64.sourceHeight}
    />
  )
}
