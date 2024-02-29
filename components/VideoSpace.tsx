'use client'
import MuxPlayer from '@mux/mux-player-react'
import MuxVideo from '@mux/mux-video-react'
import '@mux/mux-player/themes/minimal'
import styles from '@/components/media.module.css'

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
    <MuxPlayer
      // className="w-full h-full object-cover object-center"
      className={`w-full  ${classesImage} ${styles.muxPlayer}`}
      playbackId={playbackId}
      placeholder={blurHashBase64}
      autoPlay
      theme="minimal"
      muted
      loop
      style={{ aspectRatio: `${sourceWidth} / ${sourceHeight}` }}
    />
  )
}
