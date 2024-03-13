import MuxPlayer from '@mux/mux-player-react'
import '@mux/mux-player/themes/minimal'

export default function VideoPlayer({ videoProps }) {
  const aspectRatio = videoProps.asset.data.aspect_ratio
  // replace : with / to get the aspect ratio
  const aspectRatioFormatted = aspectRatio.replace(':', '/')
  console.log('aspectRatio', aspectRatio)
  return (
    <MuxPlayer
      theme="minimal"
      playbackId={videoProps.asset.playbackId}
      placeholder={`https://image.mux.com/${videoProps.asset.playbackId}/thumbnail.webp?width=4`}
      style={{ aspectRatio: aspectRatioFormatted }}
    />
  )
}
