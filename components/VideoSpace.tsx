'use client'
import MuxVideo from '@mux/mux-video-react'

interface Props {
  playbackId: string
  blurHashBase64: string
  sourceWidth: number
  sourceHeight: number
  classesImage: string
}

export default function VideoSpace({
  playbackId,
  blurHashBase64,
  sourceWidth,
  sourceHeight,
  classesImage,
}: Props) {
  return (
    <MuxVideo
      playsInline={true}
      className={`w-full  ${classesImage}`}
      playbackId={playbackId}
      placeholder={''}
      poster={blurHashBase64}
      autoPlay
      controls
      muted
      loop={true}
      style={{ aspectRatio: `${sourceWidth} / ${sourceHeight}` }}
    />
  )
}
