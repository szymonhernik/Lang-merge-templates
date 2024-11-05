import Image from 'next/image'

interface ImageAsset {
  url: string
  aspectRatio?: number
  lqip?: string
}

interface BackgroundProps {
  image?: { asset?: ImageAsset }[]
  alt?: string[]
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  classesImage?: string
  'data-sanity'?: string
}

export default function Background({
  image,
  alt = ['Cover image'],
  width = 1950,
  height = 2600,
  size = '100vw',
  classesWrapper = '',
  classesImage = '',
  ...props
}: BackgroundProps) {
  // Early return if no image
  if (!image?.[0]?.asset?.url) return null

  const firstAsset = image[0].asset
  const secondAsset = image[1]?.asset

  // URL construction
  const createImageUrl = (url: string, w: number, h: number) =>
    `${url}?w=${w}&h=${h}&fit=crop`

  const horizontalUrl =
    firstAsset.aspectRatio && firstAsset.aspectRatio > 1
      ? createImageUrl(firstAsset.url, height, width)
      : null

  const imageUrl = createImageUrl(firstAsset.url, width, height)
  const imageUrl2 = secondAsset?.url
    ? createImageUrl(secondAsset.url, width, height)
    : null

  const commonImageProps = {
    placeholder: 'blur' as const,
    className: classesImage.trim(),
  }

  // Single image render
  if (!imageUrl2) {
    return (
      <div className={classesWrapper} data-sanity={props['data-sanity']}>
        <div className="flex">
          <Image
            {...commonImageProps}
            alt={alt[0]}
            fill
            sizes={size}
            src={horizontalUrl || imageUrl}
            blurDataURL={firstAsset.lqip}
          />
        </div>
      </div>
    )
  }

  // Dual image render
  return (
    <div className={classesWrapper} data-sanity={props['data-sanity']}>
      <div className="flex h-full w-screen">
        <Image
          {...commonImageProps}
          className={`w-full md:w-1/2 flex-1 ${classesImage}`.trim()}
          alt={alt[0]}
          width={width}
          height={height}
          sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
          src={imageUrl}
          blurDataURL={firstAsset.lqip}
        />
        <Image
          {...commonImageProps}
          className={`hidden md:block w-full md:w-1/2 ${classesImage}`.trim()}
          alt={alt[1] || alt[0]}
          width={width}
          height={height}
          sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
          src={imageUrl2}
          blurDataURL={secondAsset?.lqip}
        />
      </div>
    </div>
  )
}
