export default function PDFAsset({
  file,
  classItem = '',
  classWrapper,
}: {
  file: any
  classItem?: string
  classWrapper: string
}) {
  return (
    <div className={`${classWrapper}`}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit"
        download
        href={`${file.asset.url}?dl=${file.asset.originalFilename}`}
      >
        <div
          className={` border-black border-[0.5px] px-2 py-2 lg:py-2 lg:px-4 hover:bg-stone-200 ${classItem}`}
        >
          PDF{' '}
          <span className=" text-gray-500 text-sm ">
            {file.asset.originalFilename.length > 16
              ? `${file.asset.originalFilename.slice(0, 14)}(...)`
              : file.asset.originalFilename.slice(0, -4)}
          </span>
        </div>
      </a>
    </div>
  )
}
