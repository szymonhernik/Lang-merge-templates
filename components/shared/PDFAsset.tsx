interface FileAbout {
  _type: 'file'
  asset: {
    url: string
    originalFilename?: string
  }
}
export default function PDFAsset({
  file,
  classItem = '',
  classWrapper,
}: {
  file: FileAbout
  classItem?: string
  classWrapper: string
}) {
  const filename = file.asset.originalFilename || 'Download PDF'
  return (
    <div className={`${classWrapper}`}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit"
        download
        href={`${file.asset.url}?dl=${filename}`}
      >
        <div
          className={` border-black border-[0.5px] px-2 py-2 lg:py-2 lg:px-4 hover:bg-stone-200 ${classItem}`}
        >
          PDF{' '}
          <span className=" text-gray-500 text-sm ">
            {filename.length > 16
              ? `${filename.slice(0, 14)}(...)`
              : filename.slice(0, -4)}
          </span>
        </div>
      </a>
    </div>
  )
}
