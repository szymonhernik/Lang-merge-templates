import MuxAudio from '@mux/mux-audio-react'

export default function MuxPlayerAudio({ playbackId }) {
  return (
    <MuxAudio
      style={{
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
        maxWidth: '100%',
      }}
      playbackId={playbackId}
      streamType="on-demand"
      controls
      autoPlay={true}
      muted
    />
  )
}
