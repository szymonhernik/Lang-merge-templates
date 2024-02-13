import VideoSpace from './VideoSpace'
import muxBlurHash from '@mux/blurhash'

interface Props {
  videoBanner: any
}

const getBlurHash = async (playbackId: string) => {
  const { blurHashBase64, sourceWidth, sourceHeight } = await muxBlurHash(
    playbackId,
    { time: 0 },
  )
  return { blurHashBase64, sourceWidth, sourceHeight }
}

export default async function VideoBanner({ videoBanner }: Props) {
  const playbackId = videoBanner.video.asset.playbackId
  const blurHashBase64 = await getBlurHash(playbackId)

  return (
    <VideoSpace
      playbackId={playbackId}
      blurHashBase64={blurHashBase64.blurHashBase64}
      sourceWidth={blurHashBase64.sourceWidth}
      sourceHeight={blurHashBase64.sourceHeight}
    />
  )
}
