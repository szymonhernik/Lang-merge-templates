export default function AudioBox({ mat }) {
  return (
    <a href={mat.audioFile.asset.url} target="_blank">
      <div className="flex items-center text-sm gap-2 py-2 pr-2">
        <div className="w-12">
          <SvgAudio />
        </div>

        {mat.audioLabel && <p className="text-left">{mat.audioLabel}</p>}
      </div>
    </a>
  )
}

function SvgAudio() {
  return (
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
  )
}
