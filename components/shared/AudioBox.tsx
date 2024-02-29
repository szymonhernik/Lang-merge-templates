export default function AudioBox({ mat }) {
  return (
    <a href={mat.audioFile.asset.url} target="_blank">
      <div className="flex items-center text-sm gap-8">
        <SvgAudio />

        {mat.audioLabel && <p>{mat.audioLabel}</p>}
      </div>
    </a>
  )
}

function SvgAudio() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
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
