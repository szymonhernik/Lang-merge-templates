import Image from 'next/image'

interface BackgroundProps {
  image?: { asset?: any }[]
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
  classesWrapper,
  classesImage,
  ...props
}: BackgroundProps) {
  // Assuming image.asset.url is the base URL you're starting with
  const imageUrl =
    image &&
    image[0].asset.url &&
    `${image[0].asset.url}?w=${width}&h=${height}&fit=crop`

  const imageUrl2 =
    image &&
    image[1]?.asset.url &&
    `${image[1]?.asset.url}?w=${width}&h=${height}&fit=crop`

  // Directly using LQIP provided by Sanity for blurDataURL
  const blurDataURL = image && image[0]?.asset?.lqip
  const blurDataURL2 = image && image[1]?.asset?.lqip

  return (
    <div className={`${classesWrapper}`} data-sanity={props['data-sanity']}>
      {imageUrl && !imageUrl2 ? (
        <div className="flex">
          <Image
            className={`w-${imageUrl2 ? '1/2' : 'full'} ${classesImage}`}
            alt={alt[0]}
            fill
            sizes={size}
            src={imageUrl}
            placeholder="blur"
            blurDataURL={blurDataURL} // Use the extracted LQIP as the blurDataURL
          />
        </div>
      ) : (
        imageUrl &&
        imageUrl2 && (
          <div className="flex h-full w-screen">
            <Image
              className={`w-full md:w-1/2 flex-1 ${classesImage}`}
              alt={alt[0]}
              width={width}
              height={height}
              sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
              src={imageUrl}
              placeholder="blur"
              blurDataURL={blurDataURL} // Use the extracted LQIP as the blurDataURL
            />
            <Image
              className={`hidden md:block w-full md:w-1/2 ${classesImage}`}
              alt={alt[1]}
              width={width}
              height={height}
              sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
              src={imageUrl2}
              placeholder="blur"
              blurDataURL={blurDataURL2} // Use the extracted LQIP as the blurDataURL
            />
          </div>
        )
      )}
    </div>
  )
}
