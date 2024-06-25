import { useState } from 'react'
import MuxPlayerAudio from './MuxPlayerAudio'

export default function AudioBox({ mat }) {
  const [playerInView, setPlayerInView] = useState(false)

  return (
    <>
      <div className="has-tooltip">
        <div
          className="flex items-center text-sm gap-2 py-2 pl-2 pr-4 hover:bg-stone-100 hover:cursor-pointer"
          onClick={() => {
            setPlayerInView(true)
          }}
        >
          <div className="w-12">
            <SvgAudio />
          </div>

          {mat.audioLabel && <p className="text-left">{mat.audioLabel}</p>}
          {/* <span className="tooltip cursor-pointer whitespace-nowrap rounded shadow-lg p-1 bg-white text-neutral-800 -mb-20 ml-32">
            open player
          </span> */}
        </div>
      </div>
      {playerInView && (
        <div className="w-screen fixed bottom-0 left-0 h-16 bg-white shadow-inner m-0 py-2 flex items-center justify-between">
          {/* Player */}
          <MuxPlayerAudio playbackId={mat.audioFile.asset.playbackId} />
          <div
            onClick={() => {
              setPlayerInView(false)
            }}
            className="pr-8 cursor-pointer whitespace-nowrap"
          >
            close player
          </div>
        </div>
      )}
    </>
  )
}

function SvgAudio() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M10.3994 21.6923L10.3994 4.30753L19.0918 12.9999L10.3994 21.6923Z"
          stroke="black"
        />
      </svg>
    </div>
  )
}
