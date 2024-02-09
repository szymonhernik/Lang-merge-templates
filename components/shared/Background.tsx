import Image from 'next/image'

interface BackgroundProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  classesImage?: string
  'data-sanity'?: string
}

export default function Background({
  image,
  alt = 'Cover image',
  width = 1600,
  height = 1200,
  size = '100vw',
  classesWrapper,
  classesImage,
  ...props
}: BackgroundProps) {
  // Assuming image.asset.url is the base URL you're starting with
  const imageUrl2 =
    image &&
    image.asset.url &&
    `${image.asset.url}?w=${width}&h=${height}&fit=crop&fm=webp`
  const imageUrlMobile =
    image &&
    image.asset.url &&
    `${image.asset.url}?w=${height / 2}&h=${width / 2}&fit=crop&fm=webp`

  // Directly using LQIP provided by Sanity for blurDataURL
  const blurDataURL = image?.asset?.lqip

  return (
    <div className={`${classesWrapper}`} data-sanity={props['data-sanity']}>
      <picture className="object-cover object-center h-screen w-auto">
        <source media="(max-width: 768px)" srcSet={imageUrlMobile} />
        <source media="(min-width: 769px)" srcSet={imageUrl2} />
        {/* Fallback img tag for browsers that do not support picture element */}
        <img
          src={imageUrl2}
          alt={alt}
          sizes={size} // Add sizes attribute here
          className="object-cover object-center h-screen w-screen"
        />
      </picture>
    </div>
  )
}
