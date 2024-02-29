import MuxPlayer from '@mux/mux-player-react'
import '@mux/mux-player/themes/minimal'

export default function VideoPlayer({ videoProps }) {
  return <MuxPlayer theme="minimal" playbackId={videoProps.asset.playbackId} />
}
